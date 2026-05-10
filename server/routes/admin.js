import express from 'express';
import pool from '../config/db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole(['admin']));

// ── Teachers list ────────────────────────────────────────────
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

// ── Approve/Reject teacher — uses STORED PROCEDURE ──────────
router.put('/approve-teacher', async (req, res) => {
  const { teacher_id, decision, reason } = req.body;
  if (!['approved', 'rejected'].includes(decision)) {
    return res.status(400).json({ error: 'decision must be approved or rejected' });
  }
  try {
    await pool.query('CALL proc_approve_teacher(?, ?, ?, ?, @result)', [
      teacher_id, req.user.userId, decision, reason || 'No reason provided'
    ]);
    const [rows] = await pool.query('SELECT @result AS message');
    const msg = rows[0]?.message || 'Done';
    if (msg.startsWith('ERROR')) return res.status(400).json({ error: msg });
    res.json({ message: msg });
  } catch (error) {
    console.error('approve-teacher error:', error);
    res.status(500).json({ error: 'Failed to update teacher approval status' });
  }
});

// ── Complaints list ──────────────────────────────────────────
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

// ── Resolve complaint — uses STORED PROCEDURE ────────────────
router.put('/resolve-complaint', async (req, res) => {
  const { complaint_id, resolution_note } = req.body;
  try {
    await pool.query('CALL proc_resolve_complaint(?, ?, ?, @result)', [
      complaint_id, req.user.userId, resolution_note || 'Resolved by admin'
    ]);
    const [rows] = await pool.query('SELECT @result AS message');
    const msg = rows[0]?.message || 'Done';
    if (msg.startsWith('ERROR')) return res.status(400).json({ error: msg });
    res.json({ message: msg });
  } catch (error) {
    console.error('resolve-complaint error:', error);
    res.status(500).json({ error: 'Failed to resolve complaint' });
  }
});

// ── Dashboard stats — uses PACKAGE PROCEDURE ─────────────────
router.get('/dashboard-stats', async (req, res) => {
  try {
    const [rows] = await pool.query('CALL pkg_analytics_platform_overview()');
    const stats = rows[0]?.[0] || {};
    res.json({
      students: stats.total_students || 0,
      teachers: stats.total_teachers || 0,
      pendingTeachers: stats.pending_teachers || 0,
      courses: stats.active_courses || 0,
      pendingComplaints: stats.open_complaints || 0,
      enrollments: stats.total_enrollments || 0,
      version: stats.version || '1.0.0'
    });
  } catch (error) {
    console.error('dashboard-stats error:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// ── Teacher report — uses CURSOR-BASED PROCEDURE ─────────────
router.get('/teacher-report', async (req, res) => {
  try {
    const [rows] = await pool.query('CALL proc_generate_teacher_report()');
    res.json(rows[0] || []);
  } catch (error) {
    console.error('teacher-report error:', error);
    res.status(500).json({ error: 'Failed to generate teacher report' });
  }
});

// ── Audit log ────────────────────────────────────────────────
router.get('/audit-log', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM audit_log ORDER BY performed_at DESC LIMIT 50');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch audit log' });
  }
});

export default router;
