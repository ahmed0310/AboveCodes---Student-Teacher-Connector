import pool from './config/db.js';

/*
  setup-procedures.js — Creates all stored procedures, functions,
  triggers, and the audit_log table in MySQL.
  Run: node setup-procedures.js
*/

const statements = [];

// ── Audit log table ──
statements.push(`CREATE TABLE IF NOT EXISTS audit_log (
  log_id INT AUTO_INCREMENT PRIMARY KEY,
  table_name VARCHAR(100) NOT NULL,
  action VARCHAR(20) NOT NULL,
  record_id INT,
  old_data TEXT,
  performed_at DATETIME DEFAULT CURRENT_TIMESTAMP
)`);

// ── Procedures ──
statements.push(`DROP PROCEDURE IF EXISTS proc_approve_teacher`);
statements.push(`CREATE PROCEDURE proc_approve_teacher(
  IN p_teacher_id INT, IN p_admin_id INT,
  IN p_decision VARCHAR(20), IN p_reason VARCHAR(255),
  OUT p_result VARCHAR(255)
)
BEGIN
  DECLARE v_exists INT DEFAULT 0;
  DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN SET p_result = 'ERROR: Database exception occurred'; END;
  SELECT COUNT(*) INTO v_exists FROM teachers WHERE teacher_id = p_teacher_id;
  IF v_exists = 0 THEN SET p_result = 'ERROR: Teacher not found';
  ELSE
    UPDATE teachers SET approval_status = p_decision, approved_by = p_admin_id, approved_at = NOW() WHERE teacher_id = p_teacher_id;
    INSERT INTO teacher_approval_logs (teacher_id, admin_id, decision, reason) VALUES (p_teacher_id, p_admin_id, p_decision, p_reason);
    SET p_result = CONCAT('SUCCESS: Teacher ', p_teacher_id, ' ', p_decision);
  END IF;
END`);

statements.push(`DROP PROCEDURE IF EXISTS proc_enroll_student`);
statements.push(`CREATE PROCEDURE proc_enroll_student(
  IN p_student_id INT, IN p_course_id INT, IN p_teacher_id INT, IN p_app_id INT,
  OUT p_enrollment_id INT
)
BEGIN
  DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN SET p_enrollment_id = -1; END;
  INSERT INTO enrollments (student_id, course_id, teacher_id, approved_application_id) VALUES (p_student_id, p_course_id, p_teacher_id, p_app_id);
  SET p_enrollment_id = LAST_INSERT_ID();
END`);

statements.push(`DROP PROCEDURE IF EXISTS proc_process_application`);
statements.push(`CREATE PROCEDURE proc_process_application(
  IN p_application_id INT, IN p_status VARCHAR(20), OUT p_result VARCHAR(255)
)
BEGIN
  DECLARE v_student_id INT; DECLARE v_course_id INT; DECLARE v_teacher_id INT;
  DECLARE v_enroll_id INT; DECLARE v_exists INT DEFAULT 0;
  DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN SET p_result = 'ERROR: Database exception during application processing'; END;
  SELECT COUNT(*) INTO v_exists FROM course_applications WHERE application_id = p_application_id;
  IF v_exists = 0 THEN SET p_result = 'ERROR: Application not found';
  ELSE
    UPDATE course_applications SET status = p_status, responded_at = NOW() WHERE application_id = p_application_id;
    IF p_status = 'approved' THEN
      SELECT student_id, course_id, teacher_id INTO v_student_id, v_course_id, v_teacher_id FROM course_applications WHERE application_id = p_application_id;
      CALL proc_enroll_student(v_student_id, v_course_id, v_teacher_id, p_application_id, v_enroll_id);
      IF v_enroll_id > 0 THEN SET p_result = CONCAT('SUCCESS: Approved and enrolled (ID: ', v_enroll_id, ')');
      ELSE SET p_result = 'SUCCESS: Approved but enrollment may already exist';
      END IF;
    ELSE SET p_result = CONCAT('SUCCESS: Application ', p_status);
    END IF;
  END IF;
END`);

statements.push(`DROP PROCEDURE IF EXISTS proc_resolve_complaint`);
statements.push(`CREATE PROCEDURE proc_resolve_complaint(
  IN p_complaint_id INT, IN p_admin_id INT, IN p_resolution_note VARCHAR(255),
  OUT p_result VARCHAR(255)
)
BEGIN
  DECLARE v_exists INT DEFAULT 0;
  DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN SET p_result = 'ERROR: Database exception resolving complaint'; END;
  SELECT COUNT(*) INTO v_exists FROM complaints WHERE complaint_id = p_complaint_id AND status = 'pending';
  IF v_exists = 0 THEN SET p_result = 'ERROR: Complaint not found or already resolved';
  ELSE
    UPDATE complaints SET status = 'resolved', resolved_by = p_admin_id, resolved_at = NOW(), resolution_note = p_resolution_note WHERE complaint_id = p_complaint_id;
    SET p_result = CONCAT('SUCCESS: Complaint ', p_complaint_id, ' resolved');
  END IF;
END`);

// ── Cursor-based report procedures ──
statements.push(`DROP PROCEDURE IF EXISTS proc_generate_teacher_report`);
statements.push(`CREATE PROCEDURE proc_generate_teacher_report()
BEGIN
  DECLARE v_tid INT; DECLARE v_name VARCHAR(120); DECLARE v_done INT DEFAULT 0;
  DECLARE cur_teachers CURSOR FOR SELECT t.teacher_id, u.full_name FROM teachers t JOIN users u ON t.teacher_id = u.user_id WHERE t.approval_status = 'approved';
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = 1;
  DROP TEMPORARY TABLE IF EXISTS tmp_teacher_report;
  CREATE TEMPORARY TABLE tmp_teacher_report (teacher_id INT, teacher_name VARCHAR(120), course_count INT, enrollment_count INT, complaint_count INT);
  OPEN cur_teachers;
  read_loop: LOOP
    FETCH cur_teachers INTO v_tid, v_name;
    IF v_done THEN LEAVE read_loop; END IF;
    INSERT INTO tmp_teacher_report VALUES (v_tid, v_name,
      (SELECT COUNT(*) FROM courses WHERE teacher_id = v_tid),
      (SELECT COUNT(*) FROM enrollments WHERE teacher_id = v_tid),
      (SELECT COUNT(*) FROM complaints WHERE teacher_id = v_tid));
  END LOOP;
  CLOSE cur_teachers;
  SELECT * FROM tmp_teacher_report;
  DROP TEMPORARY TABLE IF EXISTS tmp_teacher_report;
END`);

statements.push(`DROP PROCEDURE IF EXISTS proc_course_enrollment_report`);
statements.push(`CREATE PROCEDURE proc_course_enrollment_report(IN p_teacher_id INT)
BEGIN
  DECLARE v_cid INT; DECLARE v_title VARCHAR(120); DECLARE v_done INT DEFAULT 0;
  DECLARE cur_courses CURSOR FOR SELECT course_id, title FROM courses WHERE teacher_id = p_teacher_id;
  DECLARE CONTINUE HANDLER FOR NOT FOUND SET v_done = 1;
  DROP TEMPORARY TABLE IF EXISTS tmp_course_report;
  CREATE TEMPORARY TABLE tmp_course_report (course_id INT, course_title VARCHAR(120), enrolled_count INT, pending_apps INT);
  OPEN cur_courses;
  fetch_loop: LOOP
    FETCH cur_courses INTO v_cid, v_title;
    IF v_done THEN LEAVE fetch_loop; END IF;
    INSERT INTO tmp_course_report VALUES (v_cid, v_title,
      (SELECT COUNT(*) FROM enrollments WHERE course_id = v_cid),
      (SELECT COUNT(*) FROM course_applications WHERE course_id = v_cid AND status = 'pending'));
  END LOOP;
  CLOSE cur_courses;
  SELECT * FROM tmp_course_report;
  DROP TEMPORARY TABLE IF EXISTS tmp_course_report;
END`);

// ── Functions ──
statements.push(`DROP FUNCTION IF EXISTS fn_total_courses`);
statements.push(`CREATE FUNCTION fn_total_courses(p_teacher_id INT) RETURNS INT DETERMINISTIC
BEGIN DECLARE total INT; SELECT COUNT(*) INTO total FROM courses WHERE teacher_id = p_teacher_id; RETURN total; END`);

statements.push(`DROP FUNCTION IF EXISTS fn_enrollment_count`);
statements.push(`CREATE FUNCTION fn_enrollment_count(p_student_id INT) RETURNS INT DETERMINISTIC
BEGIN DECLARE total INT; SELECT COUNT(*) INTO total FROM enrollments WHERE student_id = p_student_id; RETURN total; END`);

statements.push(`DROP FUNCTION IF EXISTS fn_is_enrolled`);
statements.push(`CREATE FUNCTION fn_is_enrolled(p_student_id INT, p_course_id INT) RETURNS BOOLEAN DETERMINISTIC
BEGIN DECLARE enrolled INT; SELECT COUNT(*) INTO enrolled FROM enrollments WHERE student_id = p_student_id AND course_id = p_course_id; RETURN enrolled > 0; END`);

statements.push(`DROP FUNCTION IF EXISTS pkg_analytics_version`);
statements.push(`CREATE FUNCTION pkg_analytics_version() RETURNS VARCHAR(10) DETERMINISTIC RETURN '1.0.0'`);

statements.push(`DROP FUNCTION IF EXISTS pkg_analytics_active_courses`);
statements.push(`CREATE FUNCTION pkg_analytics_active_courses() RETURNS INT DETERMINISTIC
BEGIN DECLARE total INT; SELECT COUNT(*) INTO total FROM courses WHERE is_active = TRUE; RETURN total; END`);

// ── Package-equivalent procedures ──
statements.push(`DROP PROCEDURE IF EXISTS pkg_analytics_platform_overview`);
statements.push(`CREATE PROCEDURE pkg_analytics_platform_overview()
BEGIN
  SELECT
    (SELECT COUNT(*) FROM users WHERE role = 'student') AS total_students,
    (SELECT COUNT(*) FROM users WHERE role = 'teacher') AS total_teachers,
    (SELECT COUNT(*) FROM teachers WHERE approval_status = 'pending') AS pending_teachers,
    pkg_analytics_active_courses() AS active_courses,
    (SELECT COUNT(*) FROM enrollments) AS total_enrollments,
    (SELECT COUNT(*) FROM complaints WHERE status = 'pending') AS open_complaints,
    pkg_analytics_version() AS version;
END`);

statements.push(`DROP PROCEDURE IF EXISTS pkg_analytics_student_activity`);
statements.push(`CREATE PROCEDURE pkg_analytics_student_activity(IN p_student_id INT)
BEGIN
  SELECT u.full_name, fn_enrollment_count(p_student_id) AS enrolled_courses,
    (SELECT COUNT(*) FROM course_applications WHERE student_id = p_student_id) AS total_applications,
    (SELECT COUNT(*) FROM student_notes WHERE student_id = p_student_id) AS total_notes,
    (SELECT COUNT(*) FROM complaints WHERE student_id = p_student_id) AS total_complaints
  FROM users u WHERE u.user_id = p_student_id;
END`);

// ── Triggers ──
statements.push(`DROP TRIGGER IF EXISTS trg_before_teacher_insert`);
statements.push(`CREATE TRIGGER trg_before_teacher_insert BEFORE INSERT ON teachers FOR EACH ROW SET NEW.approval_status = 'pending'`);

statements.push(`DROP TRIGGER IF EXISTS trg_after_application_update`);
statements.push(`CREATE TRIGGER trg_after_application_update AFTER UPDATE ON course_applications FOR EACH ROW
BEGIN
  IF NEW.status = 'approved' AND OLD.status <> 'approved' THEN
    INSERT IGNORE INTO enrollments (student_id, course_id, teacher_id, approved_application_id) VALUES (NEW.student_id, NEW.course_id, NEW.teacher_id, NEW.application_id);
  END IF;
END`);

statements.push(`DROP TRIGGER IF EXISTS trg_after_enrollment_delete`);
statements.push(`CREATE TRIGGER trg_after_enrollment_delete AFTER DELETE ON enrollments FOR EACH ROW
BEGIN
  INSERT INTO audit_log (table_name, action, record_id, old_data)
  VALUES ('enrollments', 'DELETE', OLD.enrollment_id, CONCAT('student_id=', OLD.student_id, ', course_id=', OLD.course_id, ', teacher_id=', OLD.teacher_id));
END`);

// ── Test blocks (anonymous block equivalents) ──
statements.push(`DROP PROCEDURE IF EXISTS test_block_if_loop_exception`);
statements.push(`CREATE PROCEDURE test_block_if_loop_exception()
BEGIN
  DECLARE v_counter INT DEFAULT 0; DECLARE v_msg VARCHAR(255) DEFAULT ''; DECLARE v_total INT;
  DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN SELECT 'EXCEPTION: An error occurred' AS result; END;
  SELECT COUNT(*) INTO v_total FROM users;
  IF v_total > 10 THEN SET v_msg = 'Large dataset';
  ELSEIF v_total > 5 THEN SET v_msg = 'Medium dataset';
  ELSE SET v_msg = 'Small dataset'; END IF;
  SET v_counter = 0;
  count_loop: WHILE v_counter < v_total DO SET v_counter = v_counter + 1;
    IF v_counter > 100 THEN LEAVE count_loop; END IF;
  END WHILE;
  SELECT v_msg AS dataset_size, v_total AS user_count, v_counter AS loop_iterations;
END`);

statements.push(`DROP PROCEDURE IF EXISTS test_block_call_procedure`);
statements.push(`CREATE PROCEDURE test_block_call_procedure()
BEGIN
  DECLARE v_teacher_count INT;
  DECLARE EXIT HANDLER FOR SQLEXCEPTION BEGIN SELECT 'EXCEPTION: Error while calling procedures' AS result; END;
  CALL pkg_analytics_platform_overview();
  SELECT COUNT(*) INTO v_teacher_count FROM teachers WHERE approval_status = 'pending';
  IF v_teacher_count > 0 THEN SELECT CONCAT('Found ', v_teacher_count, ' pending teacher(s)') AS info;
  ELSE SELECT 'No pending teachers to process' AS info; END IF;
END`);

// ── Execute all ──
async function setup() {
  console.log('🔧 Setting up procedures, functions, and triggers...\n');
  for (let i = 0; i < statements.length; i++) {
    try {
      await pool.query(statements[i]);
      const name = statements[i].match(/(?:PROCEDURE|FUNCTION|TRIGGER|TABLE)\s+(?:IF\s+(?:NOT\s+)?EXISTS\s+)?(\S+)/i);
      console.log(`  ✅ [${i + 1}/${statements.length}] ${name ? name[1] : 'executed'}`);
    } catch (err) {
      console.error(`  ❌ [${i + 1}/${statements.length}] ${err.message.substring(0, 80)}`);
    }
  }
  console.log('\n✅ Setup complete!\n');
  process.exit(0);
}

setup();
