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

// Report Generation Endpoints

// Teacher Approval Report
router.get('/reports/teachers', async (req, res) => {
  try {
    const [teacherStats] = await pool.execute(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN approval_status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN approval_status = 'rejected' THEN 1 ELSE 0 END) as rejected,
        SUM(CASE WHEN approval_status = 'pending' THEN 1 ELSE 0 END) as pending
      FROM teachers
    `);

    const [teachers] = await pool.execute(`
      SELECT t.teacher_id, u.full_name, u.email, t.experience_years, t.approval_status, 
             t.approved_at, u.created_at, t.bio, t.phone
      FROM teachers t
      JOIN users u ON t.teacher_id = u.user_id
      ORDER BY u.created_at DESC
    `);

    res.json({
      summary: {
        'Total Teachers': teacherStats[0].total || 0,
        'Approved': teacherStats[0].approved || 0,
        'Rejected': teacherStats[0].rejected || 0,
        'Pending': teacherStats[0].pending || 0
      },
      columns: ['Teacher ID', 'Full Name', 'Email', 'Experience (Years)', 'Status', 'Applied Date', 'Approved Date'],
      data: teachers.map(t => ({
        'Teacher ID': t.teacher_id,
        'Full Name': t.full_name,
        'Email': t.email,
        'Experience (Years)': t.experience_years || '-',
        'Status': t.approval_status,
        'Applied Date': new Date(t.created_at).toLocaleDateString(),
        'Approved Date': t.approved_at ? new Date(t.approved_at).toLocaleDateString() : '-'
      }))
    });
  } catch (error) {
    console.error('Error fetching teacher report:', error);
    res.status(500).json({ error: 'Failed to fetch teacher report' });
  }
});

// Complaints Report
router.get('/reports/complaints', async (req, res) => {
  try {
    const [complaintStats] = await pool.execute(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as resolved,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
      FROM complaints
    `);

    const [complaints] = await pool.execute(`
      SELECT c.complaint_id, c.student_id, su.full_name as student_name, 
             tu.full_name as teacher_name, c.description, c.status, c.created_at, c.resolved_at
      FROM complaints c
      JOIN users su ON c.student_id = su.user_id
      JOIN users tu ON c.teacher_id = tu.user_id
      ORDER BY c.created_at DESC
    `);

    res.json({
      summary: {
        'Total Complaints': complaintStats[0].total || 0,
        'Resolved': complaintStats[0].resolved || 0,
        'Pending': complaintStats[0].pending || 0
      },
      columns: ['Complaint ID', 'Student Name', 'Teacher Name', 'Status', 'Filed Date', 'Resolved Date'],
      data: complaints.map(c => ({
        'Complaint ID': c.complaint_id,
        'Student Name': c.student_name,
        'Teacher Name': c.teacher_name,
        'Status': c.status,
        'Filed Date': new Date(c.created_at).toLocaleDateString(),
        'Resolved Date': c.resolved_at ? new Date(c.resolved_at).toLocaleDateString() : '-'
      }))
    });
  } catch (error) {
    console.error('Error fetching complaints report:', error);
    res.status(500).json({ error: 'Failed to fetch complaints report' });
  }
});

// Course Enrollment Report
router.get('/reports/enrollments', async (req, res) => {
  try {
    const [enrollmentStats] = await pool.execute(`
      SELECT 
        COUNT(*) as total,
        SUM(CASE WHEN status = 'approved' THEN 1 ELSE 0 END) as approved,
        SUM(CASE WHEN status = 'rejected' THEN 1 ELSE 0 END) as rejected,
        SUM(CASE WHEN status = 'pending' THEN 1 ELSE 0 END) as pending
      FROM enrollments
    `);

    const [enrollments] = await pool.execute(`
      SELECT e.enrollment_id, s.student_id, u.full_name as student_name, c.title as course_title,
             t.teacher_id, tu.full_name as teacher_name, e.status, e.application_date, e.approved_at
      FROM enrollments e
      JOIN students s ON e.student_id = s.student_id
      JOIN users u ON s.student_id = u.user_id
      JOIN courses c ON e.course_id = c.course_id
      JOIN teachers t ON c.teacher_id = t.teacher_id
      JOIN users tu ON t.teacher_id = tu.user_id
      ORDER BY e.application_date DESC
    `);

    res.json({
      summary: {
        'Total Enrollments': enrollmentStats[0].total || 0,
        'Approved': enrollmentStats[0].approved || 0,
        'Rejected': enrollmentStats[0].rejected || 0,
        'Pending': enrollmentStats[0].pending || 0
      },
      columns: ['Student Name', 'Course Title', 'Teacher Name', 'Status', 'Applied Date', 'Approved Date'],
      data: enrollments.map(e => ({
        'Student Name': e.student_name,
        'Course Title': e.course_title,
        'Teacher Name': e.teacher_name,
        'Status': e.status,
        'Applied Date': new Date(e.application_date).toLocaleDateString(),
        'Approved Date': e.approved_at ? new Date(e.approved_at).toLocaleDateString() : '-'
      }))
    });
  } catch (error) {
    console.error('Error fetching enrollment report:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment report' });
  }
});

export default router;
