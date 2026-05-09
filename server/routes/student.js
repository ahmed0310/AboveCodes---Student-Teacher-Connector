import express from 'express';
import pool from '../config/db.js';
import { authenticateToken, requireRole } from '../middleware/auth.js';
import { pdfUpload } from '../middleware/upload.js';

const router = express.Router();

router.use(authenticateToken);
router.use(requireRole(['student']));

router.get('/courses', async (req, res) => {
  try {
    const [courses] = await pool.execute(`
      SELECT c.course_id, c.title, c.description, c.teacher_id, c.category_id,
             cu.full_name as teacher_name, cat.name as category_name
      FROM courses c
      JOIN teachers t ON c.teacher_id = t.teacher_id AND t.approval_status = 'approved'
      JOIN users cu ON cu.user_id = t.teacher_id
      LEFT JOIN categories cat ON c.category_id = cat.category_id
      WHERE c.is_active = TRUE
    `);
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch courses' });
  }
});

router.post('/apply', async (req, res) => {
  const { course_id, message } = req.body;
  const student_id = req.user.userId;

  try {
    const [courseRows] = await pool.execute(
      'SELECT course_id, teacher_id FROM courses WHERE course_id = ? AND is_active = TRUE',
      [course_id]
    );
    if (!courseRows.length) return res.status(404).json({ error: 'Course not found' });

    const teacher_id = courseRows[0].teacher_id;
    const [existing] = await pool.execute(
      `SELECT application_id FROM course_applications
       WHERE student_id = ? AND course_id = ? AND status IN ('pending', 'approved')`,
      [student_id, course_id]
    );
    if (existing.length > 0) {
      return res.status(400).json({ error: 'Already applied for this course' });
    }

    await pool.execute(
      'INSERT INTO course_applications (student_id, course_id, teacher_id, message) VALUES (?, ?, ?, ?)',
      [student_id, course_id, teacher_id, message || '']
    );

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to apply for course' });
  }
});

router.get('/applications', async (req, res) => {
  try {
    const [applications] = await pool.execute(`
      SELECT ca.application_id, ca.status, ca.message, ca.created_at, ca.responded_at,
             c.course_id, c.title as course_title, u.full_name as teacher_name
      FROM course_applications ca
      JOIN courses c ON ca.course_id = c.course_id
      JOIN users u ON ca.teacher_id = u.user_id
      WHERE ca.student_id = ?
      ORDER BY ca.created_at DESC
    `, [req.user.userId]);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

router.get('/notes', async (req, res) => {
  try {
    const [notes] = await pool.execute(`
      SELECT n.note_id, n.file_name, n.file_path, n.uploaded_at, c.title as course_title
      FROM student_notes n
      JOIN enrollments e ON n.enrollment_id = e.enrollment_id
      JOIN courses c ON e.course_id = c.course_id
      WHERE n.student_id = ?
      ORDER BY n.uploaded_at DESC
    `, [req.user.userId]);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch notes' });
  }
});

router.post('/notes', pdfUpload.single('note'), async (req, res) => {
  const { enrollment_id } = req.body;
  const student_id = req.user.userId;

  try {
    if (!enrollment_id || !req.file) {
      return res.status(400).json({ error: 'enrollment_id and PDF note are required' });
    }

    const [enrollment] = await pool.execute(
      'SELECT enrollment_id FROM enrollments WHERE enrollment_id = ? AND student_id = ?',
      [enrollment_id, student_id]
    );
    if (!enrollment.length) {
      return res.status(403).json({ error: 'Invalid enrollment selected' });
    }

    await pool.execute(
      `INSERT INTO student_notes
       (enrollment_id, student_id, file_name, file_path, mime_type, file_size_bytes)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [
        enrollment_id,
        student_id,
        req.file.originalname,
        req.file.path.replace(/\\/g, '/'),
        req.file.mimetype,
        req.file.size
      ]
    );
    res.status(201).json({ message: 'Note saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save note' });
  }
});

router.post('/complaint', async (req, res) => {
  const { course_id, description } = req.body;
  const student_id = req.user.userId;

  try {
    if (!course_id || !description) {
      return res.status(400).json({ error: 'course_id and description are required' });
    }
    const [enrollment] = await pool.execute(
      'SELECT teacher_id FROM enrollments WHERE student_id = ? AND course_id = ?',
      [student_id, course_id]
    );
    if (!enrollment.length) {
      return res.status(400).json({ error: 'You must be enrolled in this course to file a complaint' });
    }

    await pool.execute(
      'INSERT INTO complaints (student_id, teacher_id, course_id, description) VALUES (?, ?, ?, ?)',
      [student_id, enrollment[0].teacher_id, course_id, description]
    );
    res.status(201).json({ message: 'Complaint filed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to file complaint' });
  }
});

router.get('/enrollments', async (req, res) => {
  try {
    const [rows] = await pool.execute(`
      SELECT e.enrollment_id, e.course_id, c.title as course_title, u.full_name as teacher_name, e.enrolled_at
      FROM enrollments e
      JOIN courses c ON e.course_id = c.course_id
      JOIN users u ON e.teacher_id = u.user_id
      WHERE e.student_id = ?
      ORDER BY e.enrolled_at DESC
    `, [req.user.userId]);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch enrollments' });
  }
});

export default router;
