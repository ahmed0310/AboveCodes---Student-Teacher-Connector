import express from 'express';
import pool from '../config/db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole(['teacher']));

router.post('/course', async (req, res) => {
  const { title, description, category_id } = req.body;
  const teacher_id = req.user.userId;

  try {
    await pool.execute(
      'INSERT INTO courses (title, description, teacher_id, category_id) VALUES (?, ?, ?, ?)',
      [title, description, teacher_id, category_id]
    );
    res.status(201).json({ message: 'Course created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create course.' });
  }
});

router.get('/courses', async (req, res) => {
  try {
    const [courses] = await pool.execute(
      'SELECT * FROM courses WHERE teacher_id = ? ORDER BY created_at DESC',
      [req.user.userId]
    );
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

router.get('/requests', async (req, res) => {
  try {
    const [requests] = await pool.execute(`
      SELECT ca.application_id, ca.student_id, ca.course_id, ca.status, ca.message, ca.created_at, ca.responded_at,
             c.title as course_title, u.full_name as student_name
      FROM course_applications ca
      JOIN courses c ON ca.course_id = c.course_id
      JOIN users u ON ca.student_id = u.user_id
      WHERE ca.teacher_id = ?
      ORDER BY ca.created_at DESC
    `, [req.user.userId]);
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// ── Accept/Reject — uses STORED PROCEDURE (nested call) ─────
router.put('/request/status', async (req, res) => {
  const { application_id, status } = req.body;
  
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    // Verify ownership
    const [requests] = await pool.execute(
      'SELECT * FROM course_applications WHERE application_id = ? AND teacher_id = ?',
      [application_id, req.user.userId]
    );
    if (requests.length === 0) {
      return res.status(403).json({ error: 'Not authorized for this request' });
    }

    // Call stored procedure (which internally calls proc_enroll_student if approved)
    await pool.query('CALL proc_process_application(?, ?, @result)', [application_id, status]);
    const [rows] = await pool.query('SELECT @result AS message');
    const msg = rows[0]?.message || 'Done';

    // Reject other pending apps for same student+course if approved
    if (status === 'approved') {
      await pool.execute(
        `UPDATE course_applications SET status = 'rejected', responded_at = NOW()
         WHERE student_id = ? AND course_id = ? AND application_id <> ? AND status = 'pending'`,
        [requests[0].student_id, requests[0].course_id, application_id]
      );
    }

    if (msg.startsWith('ERROR')) return res.status(400).json({ error: msg });
    res.json({ message: msg });
  } catch (error) {
    console.error('request/status error:', error);
    res.status(500).json({ error: 'Failed to update request status' });
  }
});

// ── Course enrollment report — uses CURSOR-BASED PROCEDURE ──
router.get('/course-report', async (req, res) => {
  try {
    const [rows] = await pool.query('CALL proc_course_enrollment_report(?)', [req.user.userId]);
    res.json(rows[0] || []);
  } catch (error) {
    console.error('course-report error:', error);
    res.status(500).json({ error: 'Failed to generate course report' });
  }
});

router.get('/profile', async (req, res) => {
  try {
    const [rows] = await pool.execute(
      `SELECT u.full_name, u.email, u.profile_photo_path, t.phone, t.cv_path, t.github_url, t.linkedin_url,
              t.experience_years, t.bio, t.approval_status
       FROM teachers t
       JOIN users u ON u.user_id = t.teacher_id
       WHERE t.teacher_id = ?`,
      [req.user.userId]
    );
    if (!rows.length) return res.status(404).json({ error: 'Profile not found' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

export default router;
