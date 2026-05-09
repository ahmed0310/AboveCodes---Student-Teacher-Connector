import express from 'express';
import pool from '../config/db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole(['admin']));

router.get('/teachers', async (req, res) => {
  try {
    const [teachers] = await pool.execute(`
      SELECT t.teacher_id, t.phone, t.cv_path, t.github_url, t.linkedin_url, t.experience_years,
             t.bio, t.approval_status, u.full_name, u.email, u.profile_photo_path, u.created_at
      FROM teachers t
      JOIN users u ON t.teacher_id = u.user_id
      ORDER BY u.created_at DESC
    `);
    res.json(teachers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch teachers' });
  }
});

router.put('/approve-teacher', async (req, res) => {
  const { teacher_id, decision, reason } = req.body;
  if (!['approved', 'rejected'].includes(decision)) {
    return res.status(400).json({ error: 'decision must be approved or rejected' });
  }
  
  try {
    await pool.execute(
      'UPDATE teachers SET approval_status = ?, approved_by = ?, approved_at = NOW() WHERE teacher_id = ?',
      [decision, req.user.userId, teacher_id]
    );
    await pool.execute(
      'INSERT INTO teacher_approval_logs (teacher_id, admin_id, decision, reason) VALUES (?, ?, ?, ?)',
      [teacher_id, req.user.userId, decision, reason || null]
    );
    res.json({ message: `Teacher ${decision} successfully` });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update teacher approval status' });
  }
});

router.get('/complaints', async (req, res) => {
  try {
    const [complaints] = await pool.execute(`
      SELECT c.complaint_id, c.student_id, c.teacher_id, c.course_id, c.description, c.status, c.created_at,
             c.resolved_at, c.resolution_note, su.full_name as student_name, tu.full_name as teacher_name,
             co.title as course_title
      FROM complaints c
      JOIN users su ON c.student_id = su.user_id
      JOIN users tu ON c.teacher_id = tu.user_id
      JOIN courses co ON c.course_id = co.course_id
      ORDER BY c.created_at DESC
    `);
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch complaints' });
  }
});

router.put('/resolve-complaint', async (req, res) => {
  const { complaint_id, resolution_note } = req.body;
  
  try {
    await pool.execute(
      `UPDATE complaints
       SET status = 'resolved', resolved_by = ?, resolved_at = NOW(), resolution_note = ?
       WHERE complaint_id = ?`,
      [req.user.userId, resolution_note || null, complaint_id]
    );
    res.json({ message: 'Complaint resolved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to resolve complaint' });
  }
});

router.get('/dashboard-stats', async (req, res) => {
  try {
    const [studentCount] = await pool.execute('SELECT COUNT(*) as count FROM students');
    const [teacherCount] = await pool.execute('SELECT COUNT(*) as count FROM teachers');
    const [pendingTeacherCount] = await pool.execute(`SELECT COUNT(*) as count FROM teachers WHERE approval_status = 'pending'`);
    const [courseCount] = await pool.execute('SELECT COUNT(*) as count FROM courses');
    const [pendingComplaints] = await pool.execute('SELECT COUNT(*) as count FROM complaints WHERE status = "pending"');

    res.json({
      students: studentCount[0].count,
      teachers: teacherCount[0].count,
      pendingTeachers: pendingTeacherCount[0].count,
      courses: courseCount[0].count,
      pendingComplaints: pendingComplaints[0].count
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

export default router;
