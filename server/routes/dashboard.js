import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// KPI 1: Total Students Count
router.get('/kpi/total-students', async (req, res) => {
  try {
    const [result] = await pool.execute('SELECT COUNT(*) as count FROM students');
    res.json({ kpi: 'Total Students', value: result[0].count, icon: 'Users' });
  } catch (error) {
    console.error('Error fetching total students:', error);
    res.status(500).json({ error: 'Failed to fetch total students' });
  }
});

// KPI 2: Total Teachers Count
router.get('/kpi/total-teachers', async (req, res) => {
  try {
    const [result] = await pool.execute('SELECT COUNT(*) as count FROM teachers WHERE approval_status = "approved"');
    res.json({ kpi: 'Approved Teachers', value: result[0].count, icon: 'BookOpen' });
  } catch (error) {
    console.error('Error fetching total teachers:', error);
    res.status(500).json({ error: 'Failed to fetch total teachers' });
  }
});

// KPI 3: Active Courses Count
router.get('/kpi/active-courses', async (req, res) => {
  try {
    const [result] = await pool.execute('SELECT COUNT(*) as count FROM courses WHERE status = "active"');
    res.json({ kpi: 'Active Courses', value: result[0].count, icon: 'Layers' });
  } catch (error) {
    console.error('Error fetching active courses:', error);
    res.status(500).json({ error: 'Failed to fetch active courses' });
  }
});

// KPI 4: Pending Approvals Count
router.get('/kpi/pending-approvals', async (req, res) => {
  try {
    const [result] = await pool.execute(`
      SELECT COUNT(*) as count FROM teachers WHERE approval_status = 'pending'
    `);
    res.json({ kpi: 'Pending Approvals', value: result[0].count, icon: 'Clock' });
  } catch (error) {
    console.error('Error fetching pending approvals:', error);
    res.status(500).json({ error: 'Failed to fetch pending approvals' });
  }
});

// Chart 1: Enrollment Status Distribution (Pie/Bar Chart)
router.get('/chart/enrollment-status', async (req, res) => {
  try {
    const [data] = await pool.execute(`
      SELECT 
        status,
        COUNT(*) as count
      FROM enrollments
      GROUP BY status
      ORDER BY count DESC
    `);
    
    const chartData = data.map(row => ({
      name: row.status.charAt(0).toUpperCase() + row.status.slice(1),
      value: row.count
    }));
    
    res.json({ 
      title: 'Enrollment Status Distribution',
      data: chartData,
      type: 'pie'
    });
  } catch (error) {
    console.error('Error fetching enrollment status chart:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment status data' });
  }
});

// Chart 2: Course Enrollment Trends (Bar Chart)
router.get('/chart/course-enrollments', async (req, res) => {
  try {
    const [data] = await pool.execute(`
      SELECT 
        c.title,
        COUNT(e.enrollment_id) as enrollment_count
      FROM courses c
      LEFT JOIN enrollments e ON c.course_id = e.course_id
      GROUP BY c.course_id, c.title
      ORDER BY enrollment_count DESC
      LIMIT 10
    `);
    
    const chartData = data.map(row => ({
      name: row.title.substring(0, 20),
      enrollments: row.enrollment_count
    }));
    
    res.json({
      title: 'Top 10 Courses by Enrollment',
      data: chartData,
      type: 'bar'
    });
  } catch (error) {
    console.error('Error fetching course enrollments chart:', error);
    res.status(500).json({ error: 'Failed to fetch course enrollment data' });
  }
});

// Chart 3: Teacher Performance (Bar Chart)
router.get('/chart/teacher-performance', async (req, res) => {
  try {
    const [data] = await pool.execute(`
      SELECT 
        u.full_name,
        COUNT(c.course_id) as course_count,
        COUNT(e.enrollment_id) as total_students
      FROM teachers t
      JOIN users u ON t.teacher_id = u.user_id
      LEFT JOIN courses c ON t.teacher_id = c.teacher_id
      LEFT JOIN enrollments e ON c.course_id = e.course_id
      WHERE t.approval_status = 'approved'
      GROUP BY t.teacher_id, u.full_name
      ORDER BY course_count DESC
      LIMIT 8
    `);
    
    const chartData = data.map(row => ({
      name: row.full_name.substring(0, 15),
      courses: row.course_count,
      students: row.total_students
    }));
    
    res.json({
      title: 'Teacher Course & Enrollment Count',
      data: chartData,
      type: 'bar'
    });
  } catch (error) {
    console.error('Error fetching teacher performance chart:', error);
    res.status(500).json({ error: 'Failed to fetch teacher performance data' });
  }
});

// Summary Table: Top Students by Enrollment
router.get('/summary/top-students', async (req, res) => {
  try {
    const [data] = await pool.execute(`
      SELECT 
        u.full_name,
        COUNT(e.enrollment_id) as enrollment_count,
        COUNT(DISTINCT e.course_id) as unique_courses,
        MAX(e.application_date) as last_enrolled
      FROM students s
      JOIN users u ON s.student_id = u.user_id
      LEFT JOIN enrollments e ON s.student_id = e.student_id AND e.status = 'approved'
      GROUP BY s.student_id, u.full_name
      ORDER BY enrollment_count DESC
      LIMIT 15
    `);
    
    const summary = data.map((row, index) => ({
      rank: index + 1,
      name: row.full_name,
      enrollments: row.enrollment_count || 0,
      courses: row.unique_courses || 0,
      lastEnrolled: row.last_enrolled ? new Date(row.last_enrolled).toLocaleDateString() : '-'
    }));
    
    res.json({
      title: 'Top Students by Enrollments',
      columns: ['Rank', 'Name', 'Total Enrollments', 'Unique Courses', 'Last Enrolled'],
      data: summary
    });
  } catch (error) {
    console.error('Error fetching top students summary:', error);
    res.status(500).json({ error: 'Failed to fetch top students summary' });
  }
});

// Summary Table: Recent Activity Log
router.get('/summary/recent-activity', async (req, res) => {
  try {
    const [data] = await pool.execute(`
      SELECT 
        'Enrollment' as activity_type,
        u.full_name as user_name,
        c.title as details,
        e.application_date as timestamp
      FROM enrollments e
      JOIN users u ON e.student_id = u.user_id
      JOIN courses c ON e.course_id = c.course_id
      
      UNION ALL
      
      SELECT 
        'Teacher Approved' as activity_type,
        u.full_name as user_name,
        CONCAT('Approved by Admin') as details,
        t.approved_at as timestamp
      FROM teachers t
      JOIN users u ON t.teacher_id = u.user_id
      WHERE t.approved_at IS NOT NULL
      
      ORDER BY timestamp DESC
      LIMIT 20
    `);
    
    const activity = data.map((row, index) => ({
      id: index + 1,
      type: row.activity_type,
      user: row.user_name,
      details: row.details,
      time: row.timestamp ? new Date(row.timestamp).toLocaleString() : 'N/A'
    }));
    
    res.json({
      title: 'Recent System Activity',
      columns: ['Type', 'User', 'Details', 'Timestamp'],
      data: activity
    });
  } catch (error) {
    console.error('Error fetching recent activity:', error);
    res.status(500).json({ error: 'Failed to fetch recent activity' });
  }
});

// Summary Table: Course Statistics
router.get('/summary/course-statistics', async (req, res) => {
  try {
    const [data] = await pool.execute(`
      SELECT 
        c.course_id,
        c.title,
        u.full_name as instructor,
        COUNT(e.enrollment_id) as total_enrollments,
        SUM(CASE WHEN e.status = 'approved' THEN 1 ELSE 0 END) as approved_enrollments,
        c.created_at
      FROM courses c
      LEFT JOIN enrollments e ON c.course_id = e.course_id
      LEFT JOIN teachers t ON c.teacher_id = t.teacher_id
      LEFT JOIN users u ON t.teacher_id = u.user_id
      GROUP BY c.course_id, c.title, u.full_name, c.created_at
      ORDER BY total_enrollments DESC
      LIMIT 15
    `);
    
    const stats = data.map((row, index) => ({
      rank: index + 1,
      course: row.title.substring(0, 25),
      instructor: row.instructor || 'Unassigned',
      total: row.total_enrollments || 0,
      approved: row.approved_enrollments || 0,
      created: new Date(row.created_at).toLocaleDateString()
    }));
    
    res.json({
      title: 'Course Statistics Summary',
      columns: ['Rank', 'Course Title', 'Instructor', 'Total Applications', 'Approved', 'Created'],
      data: stats
    });
  } catch (error) {
    console.error('Error fetching course statistics:', error);
    res.status(500).json({ error: 'Failed to fetch course statistics' });
  }
});

export default router;
