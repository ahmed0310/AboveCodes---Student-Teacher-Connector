import express from 'express';
import jwt from 'jsonwebtoken';
import path from 'path';
import pool from '../config/db.js';
import { profileUpload, pdfUpload } from '../middleware/upload.js';

const router = express.Router();

const registerUpload = (req, res, next) => {
  const role = String(req.body.role || '').toLowerCase();
  if (role === 'teacher') {
    return profileUpload.fields([{ name: 'profile_photo', maxCount: 1 }, { name: 'cv', maxCount: 1 }])(req, res, next);
  }
  return profileUpload.single('profile_photo')(req, res, next);
};

router.post('/register', registerUpload, async (req, res) => {
  const { name, email, password } = req.body;
  const role = String(req.body.role || '').toLowerCase();

  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    if (!['student', 'teacher'].includes(role)) {
      return res.status(400).json({ error: 'Invalid role' });
    }

    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
      // Check if user exists
      const [existingUsers] = await connection.execute('SELECT user_id FROM users WHERE email = ?', [email]);
      if (existingUsers.length > 0) {
        connection.release();
        return res.status(400).json({ error: 'Email already exists' });
      }

      // Store password as plain text
      const hashedPassword = password;

      const profilePhoto = req.file?.path || req.files?.profile_photo?.[0]?.path || null;
      const [userResult] = await connection.execute(
        'INSERT INTO users (full_name, email, password_hash, role, profile_photo_path) VALUES (?, ?, ?, ?, ?)',
        [name, email, hashedPassword, role, profilePhoto ? profilePhoto.replace(/\\/g, '/') : null]
      );

      const userId = userResult.insertId;

      if (role === 'student') {
        const age = Number(req.body.age);
        if (!Number.isInteger(age) || age < 5 || age > 100) {
          await connection.rollback();
          connection.release();
          return res.status(400).json({ error: 'Student age must be between 5 and 100' });
        }
        await connection.execute('INSERT INTO students (student_id, age) VALUES (?, ?)', [userId, age]);
      } else if (role === 'teacher') {
        const { phone, github_url, linkedin_url, experience_years, bio } = req.body;
        const cvFile = req.files?.cv?.[0];
        if (!phone || !github_url || !linkedin_url || !experience_years || !cvFile) {
          await connection.rollback();
          connection.release();
          return res.status(400).json({ error: 'Teacher fields (phone, GitHub, LinkedIn, experience, CV) are required' });
        }
        await connection.execute(
          `INSERT INTO teachers
           (teacher_id, phone, cv_path, github_url, linkedin_url, experience_years, bio)
           VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [
            userId,
            phone,
            cvFile.path.replace(/\\/g, '/'),
            github_url,
            linkedin_url,
            Number(experience_years),
            bio || null
          ]
        );
      }

      await connection.commit();
      connection.release();

      res.status(201).json({
        message: role === 'teacher' ? 'Registration submitted. Awaiting admin approval.' : 'User registered successfully',
        userId,
        role
      });
    } catch (err) {
      await connection.rollback();
      connection.release();
      throw err;
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const [users] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    
    if (users.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const user = users[0];
    const passwordMatch = (password === user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    if (user.role === 'teacher') {
      const [teacherRows] = await pool.execute('SELECT approval_status FROM teachers WHERE teacher_id = ?', [user.user_id]);
      if (!teacherRows.length || teacherRows[0].approval_status !== 'approved') {
        return res.status(403).json({ error: 'Teacher account is pending admin approval' });
      }
    }

    const token = jwt.sign(
      { userId: user.user_id, email: user.email, role: user.role, name: user.full_name },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: '24h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        userId: user.user_id,
        name: user.full_name,
        email: user.email,
        role: user.role,
        profilePhoto: user.profile_photo_path ? `/${user.profile_photo_path}`.replace('//', '/') : null
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.post('/upload-note', pdfUpload.single('note'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'PDF note is required' });
  res.json({ filePath: req.file.path.replace(/\\/g, '/') });
});

export default router;
