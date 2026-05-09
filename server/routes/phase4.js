import express from 'express';
import pool from '../config/db.js';

const router = express.Router();

// ============================================================
// Phase 4: PL/SQL Feature Endpoints
// ============================================================

// 1. Dashboard Statistics (Stored Procedure: sp_get_dashboard_statistics)
router.get('/dashboard-stats', async (req, res) => {
  try {
    const [stats] = await pool.execute('CALL sp_get_dashboard_statistics()');
    const formattedStats = {};
    stats[0].forEach(row => {
      formattedStats[row.metric] = row.value;
    });
    res.json(formattedStats);
  } catch (error) {
    console.error('Error fetching dashboard statistics:', error);
    res.status(500).json({ error: 'Failed to fetch statistics' });
  }
});

// 2. Enrollment Statistics (Stored Procedure: sp_generate_enrollment_stats)
router.get('/enrollment-stats', async (req, res) => {
  try {
    const [stats] = await pool.execute('CALL sp_generate_enrollment_stats()');
    res.json(stats[0]);
  } catch (error) {
    console.error('Error fetching enrollment stats:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment statistics' });
  }
});

// 3. Teacher Course Completion Rate (Function: fn_teacher_course_completion_rate)
router.get('/teacher-completion-rate/:teacherId', async (req, res) => {
  try {
    const { teacherId } = req.params;
    const [result] = await pool.execute(
      'SELECT fn_teacher_course_completion_rate(?) as completion_rate',
      [teacherId]
    );
    res.json({ 
      teacher_id: teacherId,
      completion_rate: result[0].completion_rate || 0
    });
  } catch (error) {
    console.error('Error calculating completion rate:', error);
    res.status(500).json({ error: 'Failed to calculate completion rate' });
  }
});

// 4. Student Enrollment Count (Function: fn_get_student_enrollment_count)
router.get('/student-enrollment-count/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const [result] = await pool.execute(
      'SELECT fn_get_student_enrollment_count(?) as enrollment_count',
      [studentId]
    );
    res.json({
      student_id: studentId,
      enrollment_count: result[0].enrollment_count || 0
    });
  } catch (error) {
    console.error('Error fetching enrollment count:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment count' });
  }
});

// 5. Auto-reject Old Applications (Procedure with Cursor: sp_auto_reject_old_applications)
router.post('/auto-reject-applications', async (req, res) => {
  try {
    const { days = 30 } = req.body;
    
    if (days < 1 || days > 365) {
      return res.status(400).json({ error: 'Days must be between 1 and 365' });
    }
    
    await pool.execute('CALL sp_auto_reject_old_applications(?)', [days]);
    
    res.json({ 
      message: `Auto-rejection process completed for applications pending ${days}+ days`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error in auto-reject procedure:', error);
    res.status(500).json({ error: 'Failed to process auto-rejection' });
  }
});

// 6. Detailed Student Report (Procedure with Cursor: sp_generate_detailed_student_report)
router.get('/student-detailed-report/:studentId', async (req, res) => {
  try {
    const { studentId } = req.params;
    const [report] = await pool.execute(
      'CALL sp_generate_detailed_student_report(?)',
      [studentId]
    );
    res.json(report[0]);
  } catch (error) {
    console.error('Error generating student report:', error);
    res.status(500).json({ error: 'Failed to generate student report' });
  }
});

// 7. Approve Teacher (Package Procedure: pkg_admin_approve_teacher)
router.post('/approve-teacher', async (req, res) => {
  try {
    const { teacherId, adminId, decision, reason } = req.body;
    
    if (!['approved', 'rejected'].includes(decision)) {
      return res.status(400).json({ error: 'Invalid decision' });
    }
    
    await pool.execute(
      'CALL pkg_admin_approve_teacher(?, ?, ?, ?)',
      [teacherId, adminId, decision, reason || '']
    );
    
    res.json({ 
      message: `Teacher ${teacherId} has been ${decision}`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error approving teacher:', error);
    res.status(500).json({ error: error.message || 'Failed to approve teacher' });
  }
});

// 8. Resolve Complaint (Package Procedure: pkg_admin_resolve_complaint)
router.post('/resolve-complaint', async (req, res) => {
  try {
    const { complaintId, adminId, resolutionNote } = req.body;
    
    await pool.execute(
      'CALL pkg_admin_resolve_complaint(?, ?, ?)',
      [complaintId, adminId, resolutionNote || '']
    );
    
    res.json({
      message: `Complaint ${complaintId} has been resolved`,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error resolving complaint:', error);
    res.status(500).json({ error: error.message || 'Failed to resolve complaint' });
  }
});

// 9. Enrollment Report (Package Procedure: pkg_admin_get_enrollment_report)
router.get('/enrollment-report', async (req, res) => {
  try {
    const [report] = await pool.execute('CALL pkg_admin_get_enrollment_report()');
    res.json(report[0]);
  } catch (error) {
    console.error('Error fetching enrollment report:', error);
    res.status(500).json({ error: 'Failed to fetch enrollment report' });
  }
});

// 10. System Statistics Snapshot (Anonymous Block: sp_anonymous_block_1)
router.post('/system-statistics-snapshot', async (req, res) => {
  try {
    const [result] = await pool.execute('CALL sp_anonymous_block_1()');
    res.json({
      message: result[0][0].result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error creating statistics snapshot:', error);
    res.status(500).json({ error: 'Failed to create statistics snapshot' });
  }
});

// 11. Compliance Report (Anonymous Block: sp_anonymous_block_2)
router.get('/compliance-report', async (req, res) => {
  try {
    const [result] = await pool.execute('CALL sp_anonymous_block_2()');
    res.json({
      message: result[0][0].result,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error generating compliance report:', error);
    res.status(500).json({ error: 'Failed to generate compliance report' });
  }
});

// 12. Get Audit Logs
router.get('/audit-logs', async (req, res) => {
  try {
    const [logs] = await pool.execute(
      `SELECT audit_id, entity_type, entity_id, action, old_value, new_value, 
              description, timestamp FROM audit_logs ORDER BY timestamp DESC LIMIT 100`
    );
    res.json(logs);
  } catch (error) {
    console.error('Error fetching audit logs:', error);
    res.status(500).json({ error: 'Failed to fetch audit logs' });
  }
});

// 13. Get User Notifications
router.get('/notifications/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const [notifications] = await pool.execute(
      `SELECT notification_id, message, type, is_read, created_at 
       FROM notifications WHERE target_user_id = ? 
       ORDER BY created_at DESC LIMIT 50`,
      [userId]
    );
    res.json(notifications);
  } catch (error) {
    console.error('Error fetching notifications:', error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// 14. Mark Notification as Read
router.put('/notifications/:notificationId/read', async (req, res) => {
  try {
    const { notificationId } = req.params;
    await pool.execute(
      'UPDATE notifications SET is_read = TRUE WHERE notification_id = ?',
      [notificationId]
    );
    res.json({ message: 'Notification marked as read' });
  } catch (error) {
    console.error('Error updating notification:', error);
    res.status(500).json({ error: 'Failed to update notification' });
  }
});

export default router;
