-- ============================================================
-- Project : Study Buddy
-- Script  : 03_Queries_and_Procedures.sql
-- Purpose : DML Queries, Stored Procedures, Functions,
--           Triggers, Cursors, Package-equivalent, Test Blocks
-- ============================================================

USE study_buddy;

-- ═════════════════════════════════════════════════════════════
-- SECTION 1: SELECT WITH WHERE (5)
-- ═════════════════════════════════════════════════════════════
SELECT u.full_name, u.email FROM users u WHERE u.role = 'teacher';
SELECT title, description FROM courses WHERE is_active = TRUE;
SELECT * FROM course_applications WHERE status = 'pending';
SELECT * FROM teachers WHERE approval_status = 'approved';
SELECT u.full_name, s.age FROM users u JOIN students s ON u.user_id = s.student_id WHERE s.age > 13;

-- ═════════════════════════════════════════════════════════════
-- SECTION 2: AGGREGATE WITH GROUP BY (3)
-- ═════════════════════════════════════════════════════════════
SELECT status, COUNT(*) AS total FROM course_applications GROUP BY status;
SELECT teacher_id, COUNT(*) AS course_count FROM courses GROUP BY teacher_id;
SELECT AVG(age) AS avg_age, MIN(age) AS youngest, MAX(age) AS oldest, COUNT(*) AS total FROM students;

-- ═════════════════════════════════════════════════════════════
-- SECTION 3: SUBQUERIES (3, including 1 correlated)
-- ═════════════════════════════════════════════════════════════
SELECT full_name FROM users WHERE user_id IN (SELECT DISTINCT student_id FROM complaints);
SELECT title FROM courses WHERE course_id NOT IN (SELECT course_id FROM course_applications WHERE status = 'pending');
-- Correlated subquery
SELECT u.full_name FROM users u WHERE u.role = 'teacher'
  AND (SELECT COUNT(*) FROM courses c WHERE c.teacher_id = u.user_id) > 0;

-- ═════════════════════════════════════════════════════════════
-- SECTION 4: JOIN QUERIES (4: INNER, LEFT, multi-table)
-- ═════════════════════════════════════════════════════════════
-- 4.1 INNER JOIN
SELECT c.title, u.full_name AS teacher FROM courses c INNER JOIN users u ON c.teacher_id = u.user_id;
-- 4.2 LEFT JOIN
SELECT c.title, ca.status FROM courses c LEFT JOIN course_applications ca ON c.course_id = ca.course_id;
-- 4.3 Multi-table (3 tables)
SELECT u.full_name AS student, c.title AS course, ca.status
FROM course_applications ca JOIN users u ON ca.student_id = u.user_id JOIN courses c ON ca.course_id = c.course_id;
-- 4.4 Multi-table (4 tables)
SELECT su.full_name AS student, co.title AS course, tu.full_name AS teacher, e.enrolled_at
FROM enrollments e JOIN users su ON e.student_id = su.user_id JOIN courses co ON e.course_id = co.course_id JOIN users tu ON e.teacher_id = tu.user_id;

-- ═════════════════════════════════════════════════════════════
-- SECTION 5: UPDATE (2) and DELETE (2)
-- ═════════════════════════════════════════════════════════════
UPDATE complaints SET status = 'resolved', resolved_at = NOW() WHERE complaint_id = 1;
UPDATE courses SET is_active = FALSE WHERE course_id = 3;
DELETE FROM student_notes WHERE note_id = 1 AND student_id = 5;
DELETE FROM course_applications WHERE status = 'rejected' AND application_id = 3;

-- ═════════════════════════════════════════════════════════════
-- SECTION 6: DCL — GRANT and REVOKE
-- ═════════════════════════════════════════════════════════════
-- (Uncomment to execute — requires root privileges)
-- CREATE USER IF NOT EXISTS 'sb_viewer'@'localhost' IDENTIFIED BY 'viewer123';
-- GRANT SELECT ON study_buddy.users TO 'sb_viewer'@'localhost';
-- GRANT SELECT ON study_buddy.courses TO 'sb_viewer'@'localhost';
-- GRANT SELECT ON study_buddy.enrollments TO 'sb_viewer'@'localhost';
-- REVOKE SELECT ON study_buddy.users FROM 'sb_viewer'@'localhost';
-- DROP USER IF EXISTS 'sb_viewer'@'localhost';

-- ═════════════════════════════════════════════════════════════
-- AUDIT LOG TABLE (for AFTER DELETE trigger)
-- ═════════════════════════════════════════════════════════════
CREATE TABLE IF NOT EXISTS audit_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    table_name VARCHAR(100) NOT NULL,
    action VARCHAR(20) NOT NULL,
    record_id INT,
    old_data TEXT,
    performed_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- ═════════════════════════════════════════════════════════════
-- SECTION 7: STORED PROCEDURES (5)
--   • IN and OUT parameters
--   • Exception handling (DECLARE HANDLER)
--   • Nested procedure calls
-- ═════════════════════════════════════════════════════════════

DELIMITER //

-- 7.1 proc_approve_teacher — IN/OUT + exception handling
DROP PROCEDURE IF EXISTS proc_approve_teacher //
CREATE PROCEDURE proc_approve_teacher(
    IN  p_teacher_id INT,
    IN  p_admin_id   INT,
    IN  p_decision   VARCHAR(20),
    IN  p_reason     VARCHAR(255),
    OUT p_result     VARCHAR(255)
)
BEGIN
    DECLARE v_exists INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_result = 'ERROR: Database exception occurred';
    END;

    SELECT COUNT(*) INTO v_exists FROM teachers WHERE teacher_id = p_teacher_id;
    IF v_exists = 0 THEN
        SET p_result = 'ERROR: Teacher not found';
    ELSE
        UPDATE teachers
        SET approval_status = p_decision, approved_by = p_admin_id, approved_at = NOW()
        WHERE teacher_id = p_teacher_id;

        INSERT INTO teacher_approval_logs (teacher_id, admin_id, decision, reason)
        VALUES (p_teacher_id, p_admin_id, p_decision, p_reason);

        SET p_result = CONCAT('SUCCESS: Teacher ', p_teacher_id, ' ', p_decision);
    END IF;
END //

-- 7.2 proc_enroll_student — called by proc_process_application (nesting target)
DROP PROCEDURE IF EXISTS proc_enroll_student //
CREATE PROCEDURE proc_enroll_student(
    IN  p_student_id INT,
    IN  p_course_id  INT,
    IN  p_teacher_id INT,
    IN  p_app_id     INT,
    OUT p_enrollment_id INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_enrollment_id = -1;
    END;

    INSERT INTO enrollments (student_id, course_id, teacher_id, approved_application_id)
    VALUES (p_student_id, p_course_id, p_teacher_id, p_app_id);

    SET p_enrollment_id = LAST_INSERT_ID();
END //

-- 7.3 proc_process_application — IN/OUT + nested call to proc_enroll_student
DROP PROCEDURE IF EXISTS proc_process_application //
CREATE PROCEDURE proc_process_application(
    IN  p_application_id INT,
    IN  p_status         VARCHAR(20),
    OUT p_result         VARCHAR(255)
)
BEGIN
    DECLARE v_student_id INT;
    DECLARE v_course_id  INT;
    DECLARE v_teacher_id INT;
    DECLARE v_enroll_id  INT;
    DECLARE v_exists     INT DEFAULT 0;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_result = 'ERROR: Database exception during application processing';
    END;

    SELECT COUNT(*) INTO v_exists FROM course_applications WHERE application_id = p_application_id;
    IF v_exists = 0 THEN
        SET p_result = 'ERROR: Application not found';
    ELSE
        UPDATE course_applications
        SET status = p_status, responded_at = NOW()
        WHERE application_id = p_application_id;

        IF p_status = 'approved' THEN
            SELECT student_id, course_id, teacher_id
            INTO v_student_id, v_course_id, v_teacher_id
            FROM course_applications WHERE application_id = p_application_id;

            -- Nested procedure call
            CALL proc_enroll_student(v_student_id, v_course_id, v_teacher_id, p_application_id, v_enroll_id);

            IF v_enroll_id > 0 THEN
                SET p_result = CONCAT('SUCCESS: Approved and enrolled (ID: ', v_enroll_id, ')');
            ELSE
                SET p_result = 'SUCCESS: Approved but enrollment may already exist';
            END IF;
        ELSE
            SET p_result = CONCAT('SUCCESS: Application ', p_status);
        END IF;
    END IF;
END //

-- 7.4 proc_resolve_complaint — IN/OUT + exception handling
DROP PROCEDURE IF EXISTS proc_resolve_complaint //
CREATE PROCEDURE proc_resolve_complaint(
    IN  p_complaint_id    INT,
    IN  p_admin_id        INT,
    IN  p_resolution_note VARCHAR(255),
    OUT p_result          VARCHAR(255)
)
BEGIN
    DECLARE v_exists INT DEFAULT 0;
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SET p_result = 'ERROR: Database exception resolving complaint';
    END;

    SELECT COUNT(*) INTO v_exists FROM complaints WHERE complaint_id = p_complaint_id AND status = 'pending';
    IF v_exists = 0 THEN
        SET p_result = 'ERROR: Complaint not found or already resolved';
    ELSE
        UPDATE complaints
        SET status = 'resolved', resolved_by = p_admin_id, resolved_at = NOW(), resolution_note = p_resolution_note
        WHERE complaint_id = p_complaint_id;
        SET p_result = CONCAT('SUCCESS: Complaint ', p_complaint_id, ' resolved');
    END IF;
END //

-- 7.5 proc_generate_teacher_report — uses EXPLICIT CURSOR (OPEN/FETCH/CLOSE)
DROP PROCEDURE IF EXISTS proc_generate_teacher_report //
CREATE PROCEDURE proc_generate_teacher_report()
BEGIN
    DECLARE v_tid   INT;
    DECLARE v_name  VARCHAR(120);
    DECLARE v_done  INT DEFAULT 0;

    DECLARE cur_teachers CURSOR FOR
        SELECT t.teacher_id, u.full_name
        FROM teachers t JOIN users u ON t.teacher_id = u.user_id
        WHERE t.approval_status = 'approved';

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = 1;

    DROP TEMPORARY TABLE IF EXISTS tmp_teacher_report;
    CREATE TEMPORARY TABLE tmp_teacher_report (
        teacher_id INT, teacher_name VARCHAR(120),
        course_count INT, enrollment_count INT, complaint_count INT
    );

    OPEN cur_teachers;
    read_loop: LOOP
        FETCH cur_teachers INTO v_tid, v_name;
        IF v_done THEN LEAVE read_loop; END IF;
        INSERT INTO tmp_teacher_report VALUES (
            v_tid, v_name,
            (SELECT COUNT(*) FROM courses WHERE teacher_id = v_tid),
            (SELECT COUNT(*) FROM enrollments WHERE teacher_id = v_tid),
            (SELECT COUNT(*) FROM complaints WHERE teacher_id = v_tid)
        );
    END LOOP;
    CLOSE cur_teachers;

    SELECT * FROM tmp_teacher_report;
    DROP TEMPORARY TABLE IF EXISTS tmp_teacher_report;
END //

-- ═════════════════════════════════════════════════════════════
-- SECTION 8: FUNCTIONS (3) — at least 1 used in SELECT
-- ═════════════════════════════════════════════════════════════

DROP FUNCTION IF EXISTS fn_total_courses //
CREATE FUNCTION fn_total_courses(p_teacher_id INT) RETURNS INT DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total FROM courses WHERE teacher_id = p_teacher_id;
    RETURN total;
END //

DROP FUNCTION IF EXISTS fn_enrollment_count //
CREATE FUNCTION fn_enrollment_count(p_student_id INT) RETURNS INT DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total FROM enrollments WHERE student_id = p_student_id;
    RETURN total;
END //

DROP FUNCTION IF EXISTS fn_is_enrolled //
CREATE FUNCTION fn_is_enrolled(p_student_id INT, p_course_id INT) RETURNS BOOLEAN DETERMINISTIC
BEGIN
    DECLARE enrolled INT;
    SELECT COUNT(*) INTO enrolled FROM enrollments WHERE student_id = p_student_id AND course_id = p_course_id;
    RETURN enrolled > 0;
END //

-- Using functions inside SELECT queries:
-- SELECT u.full_name, fn_total_courses(u.user_id) AS courses FROM users u WHERE u.role = 'teacher';
-- SELECT u.full_name, fn_enrollment_count(u.user_id) AS enrollments FROM users u WHERE u.role = 'student';

-- ═════════════════════════════════════════════════════════════
-- SECTION 9: TRIGGERS (3: BEFORE INSERT, AFTER UPDATE, AFTER DELETE)
-- ═════════════════════════════════════════════════════════════

DROP TRIGGER IF EXISTS trg_before_teacher_insert //
CREATE TRIGGER trg_before_teacher_insert
BEFORE INSERT ON teachers FOR EACH ROW
BEGIN
    SET NEW.approval_status = 'pending';
END //

DROP TRIGGER IF EXISTS trg_after_application_update //
CREATE TRIGGER trg_after_application_update
AFTER UPDATE ON course_applications FOR EACH ROW
BEGIN
    IF NEW.status = 'approved' AND OLD.status <> 'approved' THEN
        INSERT IGNORE INTO enrollments (student_id, course_id, teacher_id, approved_application_id)
        VALUES (NEW.student_id, NEW.course_id, NEW.teacher_id, NEW.application_id);
    END IF;
END //

DROP TRIGGER IF EXISTS trg_after_enrollment_delete //
CREATE TRIGGER trg_after_enrollment_delete
AFTER DELETE ON enrollments FOR EACH ROW
BEGIN
    INSERT INTO audit_log (table_name, action, record_id, old_data)
    VALUES ('enrollments', 'DELETE', OLD.enrollment_id,
        CONCAT('student_id=', OLD.student_id, ', course_id=', OLD.course_id, ', teacher_id=', OLD.teacher_id));
END //

-- ═════════════════════════════════════════════════════════════
-- SECTION 10: CURSORS (2 — explicit + parameterized)
-- (Cursor 1 is inside proc_generate_teacher_report above)
-- ═════════════════════════════════════════════════════════════

-- Cursor 2: Parameterized — course enrollments for a specific teacher
DROP PROCEDURE IF EXISTS proc_course_enrollment_report //
CREATE PROCEDURE proc_course_enrollment_report(IN p_teacher_id INT)
BEGIN
    DECLARE v_cid   INT;
    DECLARE v_title VARCHAR(120);
    DECLARE v_done  INT DEFAULT 0;

    DECLARE cur_courses CURSOR FOR
        SELECT course_id, title FROM courses WHERE teacher_id = p_teacher_id;

    DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = 1;

    DROP TEMPORARY TABLE IF EXISTS tmp_course_report;
    CREATE TEMPORARY TABLE tmp_course_report (
        course_id INT, course_title VARCHAR(120),
        enrolled_count INT, pending_apps INT
    );

    OPEN cur_courses;
    fetch_loop: LOOP
        FETCH cur_courses INTO v_cid, v_title;
        IF v_done THEN LEAVE fetch_loop; END IF;
        INSERT INTO tmp_course_report VALUES (
            v_cid, v_title,
            (SELECT COUNT(*) FROM enrollments WHERE course_id = v_cid),
            (SELECT COUNT(*) FROM course_applications WHERE course_id = v_cid AND status = 'pending')
        );
    END LOOP;
    CLOSE cur_courses;

    SELECT * FROM tmp_course_report;
    DROP TEMPORARY TABLE IF EXISTS tmp_course_report;
END //

-- ═════════════════════════════════════════════════════════════
-- SECTION 11: PACKAGE EQUIVALENT — pkg_analytics
-- (MySQL does not support packages; grouped by naming convention)
-- Contains: 2 procedures, 1 function, 1 constant
-- ═════════════════════════════════════════════════════════════

-- Package constant (simulated via deterministic function)
DROP FUNCTION IF EXISTS pkg_analytics_version //
CREATE FUNCTION pkg_analytics_version() RETURNS VARCHAR(10) DETERMINISTIC
RETURN '1.0.0' //

-- Package function: platform-wide active course count
DROP FUNCTION IF EXISTS pkg_analytics_active_courses //
CREATE FUNCTION pkg_analytics_active_courses() RETURNS INT DETERMINISTIC
BEGIN
    DECLARE total INT;
    SELECT COUNT(*) INTO total FROM courses WHERE is_active = TRUE;
    RETURN total;
END //

-- Package procedure 1: platform overview stats
DROP PROCEDURE IF EXISTS pkg_analytics_platform_overview //
CREATE PROCEDURE pkg_analytics_platform_overview()
BEGIN
    SELECT
        (SELECT COUNT(*) FROM users WHERE role = 'student') AS total_students,
        (SELECT COUNT(*) FROM users WHERE role = 'teacher') AS total_teachers,
        (SELECT COUNT(*) FROM teachers WHERE approval_status = 'pending') AS pending_teachers,
        pkg_analytics_active_courses() AS active_courses,
        (SELECT COUNT(*) FROM enrollments) AS total_enrollments,
        (SELECT COUNT(*) FROM complaints WHERE status = 'pending') AS open_complaints,
        pkg_analytics_version() AS version;
END //

-- Package procedure 2: student activity summary
DROP PROCEDURE IF EXISTS pkg_analytics_student_activity //
CREATE PROCEDURE pkg_analytics_student_activity(IN p_student_id INT)
BEGIN
    SELECT
        u.full_name,
        fn_enrollment_count(p_student_id) AS enrolled_courses,
        (SELECT COUNT(*) FROM course_applications WHERE student_id = p_student_id) AS total_applications,
        (SELECT COUNT(*) FROM student_notes WHERE student_id = p_student_id) AS total_notes,
        (SELECT COUNT(*) FROM complaints WHERE student_id = p_student_id) AS total_complaints;
    SELECT u.full_name FROM users u WHERE u.user_id = p_student_id;
END //

-- ═════════════════════════════════════════════════════════════
-- SECTION 12: ANONYMOUS BLOCK EQUIVALENTS (2)
-- (MySQL does not support true anonymous blocks like Oracle;
--  these are test procedures demonstrating IF/LOOP/EXCEPTION)
-- ═════════════════════════════════════════════════════════════

-- Block 1: IF-ELSEIF-ELSE, WHILE loop, exception handling
DROP PROCEDURE IF EXISTS test_block_if_loop_exception //
CREATE PROCEDURE test_block_if_loop_exception()
BEGIN
    DECLARE v_counter INT DEFAULT 0;
    DECLARE v_msg     VARCHAR(255) DEFAULT '';
    DECLARE v_total   INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SELECT 'EXCEPTION: An error occurred during test block execution' AS result;
    END;

    SELECT COUNT(*) INTO v_total FROM users;

    -- IF-ELSEIF-ELSE
    IF v_total > 10 THEN
        SET v_msg = 'Large dataset';
    ELSEIF v_total > 5 THEN
        SET v_msg = 'Medium dataset';
    ELSE
        SET v_msg = 'Small dataset';
    END IF;

    -- WHILE loop: count teachers
    SET v_counter = 0;
    count_loop: WHILE v_counter < v_total DO
        SET v_counter = v_counter + 1;
        IF v_counter > 100 THEN LEAVE count_loop; END IF;
    END WHILE;

    SELECT v_msg AS dataset_size, v_total AS user_count, v_counter AS loop_iterations;
END //

-- Block 2: Calls a stored procedure and displays output
DROP PROCEDURE IF EXISTS test_block_call_procedure //
CREATE PROCEDURE test_block_call_procedure()
BEGIN
    DECLARE v_result VARCHAR(255);
    DECLARE v_teacher_count INT;

    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        SELECT 'EXCEPTION: Error while calling procedures' AS result;
    END;

    -- Call the platform overview package procedure
    CALL pkg_analytics_platform_overview();

    -- Call approve teacher procedure and show result
    SELECT COUNT(*) INTO v_teacher_count FROM teachers WHERE approval_status = 'pending';

    IF v_teacher_count > 0 THEN
        SELECT CONCAT('Found ', v_teacher_count, ' pending teacher(s)') AS info;
    ELSE
        SELECT 'No pending teachers to process' AS info;
    END IF;
END //

DELIMITER ;

-- ═════════════════════════════════════════════════════════════
-- FUNCTION USAGE IN SELECT (demonstrating functions in queries)
-- ═════════════════════════════════════════════════════════════
SELECT u.full_name, fn_total_courses(u.user_id) AS courses
FROM users u WHERE u.role = 'teacher';

SELECT u.full_name, fn_enrollment_count(u.user_id) AS enrollments
FROM users u WHERE u.role = 'student';
