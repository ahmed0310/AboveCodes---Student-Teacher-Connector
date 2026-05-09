-- ============================================================
-- Project: Study Buddy
-- Script: 03_Queries_and_Procedures.sql
-- Purpose: SELECTs, JOINs, Procedures, Functions, Triggers
-- ============================================================

USE study_buddy;

-- Queries
SELECT * FROM users WHERE role = 'teacher';
SELECT title, description FROM courses WHERE is_active = TRUE;
SELECT * FROM course_applications WHERE status = 'pending';
SELECT * FROM teachers WHERE approval_status = 'approved';
SELECT * FROM complaints WHERE status = 'resolved';

SELECT status, COUNT(*) AS total_requests FROM course_applications GROUP BY status;
SELECT teacher_id, COUNT(*) AS total_courses FROM courses GROUP BY teacher_id;
SELECT course_id, COUNT(*) AS enrolled_count FROM enrollments GROUP BY course_id;

SELECT full_name FROM users WHERE user_id IN (SELECT student_id FROM complaints);
SELECT title FROM courses WHERE course_id NOT IN (SELECT course_id FROM course_applications WHERE status = 'pending');
SELECT u.full_name
FROM users u
WHERE u.role = 'teacher'
  AND (SELECT COUNT(*) FROM courses c WHERE c.teacher_id = u.user_id) > 1;

SELECT c.title, u.full_name AS teacher_name
FROM courses c
JOIN users u ON c.teacher_id = u.user_id;

SELECT c.title, ca.status
FROM courses c
LEFT JOIN course_applications ca ON c.course_id = ca.course_id;

SELECT s.student_id, u.full_name AS student_name, c.title AS course_title, ca.status
FROM course_applications ca
JOIN students s ON ca.student_id = s.student_id
JOIN users u ON s.student_id = u.user_id
JOIN courses c ON ca.course_id = c.course_id;

UPDATE complaints SET status = 'resolved' WHERE complaint_id = 1;
DELETE FROM student_notes WHERE note_id = 1;

DELIMITER //

DROP PROCEDURE IF EXISTS ApproveTeacher //
CREATE PROCEDURE ApproveTeacher(
    IN p_teacher_id INT,
    IN p_admin_id INT,
    IN p_decision ENUM('approved', 'rejected'),
    IN p_reason VARCHAR(255)
)
BEGIN
    UPDATE teachers
    SET approval_status = p_decision, approved_by = p_admin_id, approved_at = NOW()
    WHERE teacher_id = p_teacher_id;

    INSERT INTO teacher_approval_logs (teacher_id, admin_id, decision, reason)
    VALUES (p_teacher_id, p_admin_id, p_decision, p_reason);
END //

DROP PROCEDURE IF EXISTS DecideCourseApplication //
CREATE PROCEDURE DecideCourseApplication(
    IN p_application_id INT,
    IN p_status ENUM('approved', 'rejected')
)
BEGIN
    DECLARE v_student_id INT;
    DECLARE v_course_id INT;
    DECLARE v_teacher_id INT;

    UPDATE course_applications
    SET status = p_status, responded_at = NOW()
    WHERE application_id = p_application_id;

    IF p_status = 'approved' THEN
        SELECT student_id, course_id, teacher_id
        INTO v_student_id, v_course_id, v_teacher_id
        FROM course_applications
        WHERE application_id = p_application_id;

        INSERT IGNORE INTO enrollments (student_id, course_id, teacher_id, approved_application_id)
        VALUES (v_student_id, v_course_id, v_teacher_id, p_application_id);
    END IF;
END //

DROP PROCEDURE IF EXISTS ResolveComplaint //
CREATE PROCEDURE ResolveComplaint(IN p_complaint_id INT, IN p_admin_id INT, IN p_resolution_note VARCHAR(255))
BEGIN
    UPDATE complaints
    SET status = 'resolved', resolved_by = p_admin_id, resolved_at = NOW(), resolution_note = p_resolution_note
    WHERE complaint_id = p_complaint_id;
END //

DROP FUNCTION IF EXISTS GetTotalCourses //
CREATE FUNCTION GetTotalCourses(p_teacher_id INT) RETURNS INT DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total FROM courses WHERE teacher_id = p_teacher_id;
    RETURN total;
END //

DROP FUNCTION IF EXISTS IsStudentEnrolled //
CREATE FUNCTION IsStudentEnrolled(p_student_id INT, p_course_id INT) RETURNS BOOLEAN DETERMINISTIC
BEGIN
    DECLARE enrolled INT;
    SELECT COUNT(*) INTO enrolled FROM enrollments WHERE student_id = p_student_id AND course_id = p_course_id;
    RETURN enrolled > 0;
END //

DROP TRIGGER IF EXISTS trg_before_teacher_insert //
CREATE TRIGGER trg_before_teacher_insert
BEFORE INSERT ON teachers
FOR EACH ROW
BEGIN
    SET NEW.approval_status = 'pending';
END //

DROP TRIGGER IF EXISTS trg_after_application_approved //
CREATE TRIGGER trg_after_application_approved
AFTER UPDATE ON course_applications
FOR EACH ROW
BEGIN
    IF NEW.status = 'approved' AND OLD.status <> 'approved' THEN
        INSERT IGNORE INTO enrollments (student_id, course_id, teacher_id, approved_application_id)
        VALUES (NEW.student_id, NEW.course_id, NEW.teacher_id, NEW.application_id);
    END IF;
END //

DROP TRIGGER IF EXISTS trg_after_complaint_update //
CREATE TRIGGER trg_after_complaint_update
AFTER UPDATE ON complaints
FOR EACH ROW
BEGIN
    IF NEW.status = 'resolved' AND OLD.status = 'pending' THEN
        SET @last_resolved_complaint = NEW.complaint_id;
    END IF;
END //

DELIMITER ;
