USE study_buddy;

SET FOREIGN_KEY_CHECKS = 0;
DROP VIEW IF EXISTS view_pending_applications;
DROP VIEW IF EXISTS view_pending_teacher_applications;

DROP TABLE IF EXISTS student_notes;
DROP TABLE IF EXISTS complaints;
DROP TABLE IF EXISTS enrollments;
DROP TABLE IF EXISTS course_applications;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS teacher_approval_logs;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS teachers;
DROP TABLE IF EXISTS students;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(120) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('student','teacher','admin') NOT NULL,
    profile_photo_path VARCHAR(255) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE students (
    student_id INT PRIMARY KEY,
    age TINYINT UNSIGNED NOT NULL,
    FOREIGN KEY (student_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE teachers (
    teacher_id INT PRIMARY KEY,
    phone VARCHAR(30) NOT NULL,
    cv_path VARCHAR(255) NOT NULL,
    github_url VARCHAR(255) NOT NULL,
    linkedin_url VARCHAR(255) NOT NULL,
    experience_years INT UNSIGNED NOT NULL DEFAULT 0,
    bio TEXT,
    approval_status ENUM('pending','approved','rejected') DEFAULT 'pending',
    approved_at DATETIME NULL,
    approved_by INT NULL,
    FOREIGN KEY (teacher_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE admins (
    admin_id INT PRIMARY KEY,
    title VARCHAR(80) NOT NULL DEFAULT 'Admin',
    FOREIGN KEY (admin_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE teacher_approval_logs (
    approval_log_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    admin_id INT NOT NULL,
    decision ENUM('approved','rejected') NOT NULL,
    reason VARCHAR(255),
    decided_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (admin_id) REFERENCES admins(admin_id) ON DELETE CASCADE
);

ALTER TABLE teachers
ADD CONSTRAINT fk_teachers_admin
FOREIGN KEY (approved_by) REFERENCES admins(admin_id) ON DELETE SET NULL;

CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    age_group VARCHAR(50)
);

CREATE TABLE courses (
    course_id INT AUTO_INCREMENT PRIMARY KEY,
    teacher_id INT NOT NULL,
    category_id INT DEFAULT NULL,
    title VARCHAR(120) NOT NULL,
    description TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE SET NULL
);

CREATE TABLE course_applications (
    application_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    teacher_id INT NOT NULL,
    status ENUM('pending','approved','rejected') DEFAULT 'pending',
    message VARCHAR(255),
    responded_at DATETIME NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    UNIQUE KEY uq_student_course_pending (student_id, course_id, status)
);

CREATE TABLE enrollments (
    enrollment_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    course_id INT NOT NULL,
    teacher_id INT NOT NULL,
    approved_application_id INT NOT NULL UNIQUE,
    enrolled_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (approved_application_id) REFERENCES course_applications(application_id) ON DELETE CASCADE,
    UNIQUE KEY uq_enrollment_student_course (student_id, course_id, teacher_id)
);

CREATE TABLE student_notes (
    note_id INT AUTO_INCREMENT PRIMARY KEY,
    enrollment_id INT NOT NULL,
    student_id INT NOT NULL,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    mime_type VARCHAR(120) NOT NULL,
    file_size_bytes INT UNSIGNED NOT NULL,
    uploaded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (enrollment_id) REFERENCES enrollments(enrollment_id) ON DELETE CASCADE,
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE
);

CREATE TABLE complaints (
    complaint_id INT AUTO_INCREMENT PRIMARY KEY,
    student_id INT NOT NULL,
    teacher_id INT NOT NULL,
    course_id INT NOT NULL,
    description TEXT NOT NULL,
    status ENUM('pending','resolved') DEFAULT 'pending',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    resolved_at DATETIME NULL,
    resolved_by INT NULL,
    resolution_note VARCHAR(255),
    FOREIGN KEY (student_id) REFERENCES students(student_id) ON DELETE CASCADE,
    FOREIGN KEY (teacher_id) REFERENCES teachers(teacher_id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(course_id) ON DELETE CASCADE,
    FOREIGN KEY (resolved_by) REFERENCES admins(admin_id) ON DELETE SET NULL
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_teachers_status ON teachers(approval_status);
CREATE INDEX idx_courses_teacher ON courses(teacher_id);
CREATE INDEX idx_course_applications_status ON course_applications(status);
CREATE INDEX idx_complaints_status ON complaints(status);

CREATE VIEW view_pending_teacher_applications AS
SELECT t.teacher_id, u.full_name, u.email, t.phone, t.experience_years, t.approval_status
FROM teachers t
JOIN users u ON u.user_id = t.teacher_id
WHERE t.approval_status = 'pending';

CREATE VIEW view_pending_applications AS
SELECT ca.application_id, su.full_name AS student_name, cu.title AS course_title,
       tu.full_name AS teacher_name, ca.status, ca.created_at
FROM course_applications ca
JOIN users su ON su.user_id = ca.student_id
JOIN courses cu ON cu.course_id = ca.course_id
JOIN users tu ON tu.user_id = ca.teacher_id
WHERE ca.status = 'pending';