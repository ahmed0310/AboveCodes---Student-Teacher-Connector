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

router.put('/request/status', async (req, res) => {
  const { application_id, status } = req.body;
  
  if (!['approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status' });
  }

  try {
    const [requests] = await pool.execute(`
      SELECT * FROM course_applications
      WHERE application_id = ? AND teacher_id = ?
    `, [application_id, req.user.userId]);

    if (requests.length === 0) {
      return res.status(403).json({ error: 'Not authorized for this request' });
    }

    await pool.execute(
      'UPDATE course_applications SET status = ?, responded_at = NOW() WHERE application_id = ?',
      [status, application_id]
    );

    if (status === 'approved') {
      const app = requests[0];
      await pool.execute(
        `INSERT INTO enrollments (student_id, course_id, teacher_id, approved_application_id)
         VALUES (?, ?, ?, ?)
         ON DUPLICATE KEY UPDATE enrolled_at = enrolled_at`,
        [app.student_id, app.course_id, app.teacher_id, app.application_id]
      );
    }

    if (status === 'approved') {
      await pool.execute(
        `UPDATE course_applications
         SET status = 'rejected', responded_at = NOW()
         WHERE student_id = ? AND course_id = ? AND application_id <> ? AND status = 'pending'`,
        [requests[0].student_id, requests[0].course_id, application_id]
      );
    }

    res.json({ message: `Request ${status} successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update request status' });
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
