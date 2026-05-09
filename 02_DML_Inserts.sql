USE study_buddy;

-- password123
SET @hash = '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW';

INSERT INTO categories (name, description, age_group) VALUES
('Programming', 'Coding fundamentals to advanced development', '12+'),
('Mathematics', 'Core and applied mathematics', '8+'),
('Science', 'Physics, chemistry, and biology tracks', '10+'),
('Languages', 'Speaking and writing improvement', '8+'),
('Design', 'UI/UX and graphics for learners', '12+');

INSERT INTO users (full_name, email, password_hash, role) VALUES
('System Admin', 'admin@studybuddy.com', @hash, 'admin'),
('Ali Teacher', 'ali.teacher@studybuddy.com', @hash, 'teacher'),
('Sara Teacher', 'sara.teacher@studybuddy.com', @hash, 'teacher'),
('Pending Teacher', 'pending.teacher@studybuddy.com', @hash, 'teacher'),
('Bilal Student', 'bilal.student@studybuddy.com', @hash, 'student'),
('Ayesha Student', 'ayesha.student@studybuddy.com', @hash, 'student');

INSERT INTO admins (admin_id, title) VALUES
(1, 'Super Admin');

INSERT INTO teachers (teacher_id, phone, cv_path, github_url, linkedin_url, experience_years, bio, approval_status, approved_by, approved_at) VALUES
(2, '+92-300-1111111', 'uploads/cvs/teacher-2-sample.pdf', 'https://github.com/aliteacher', 'https://linkedin.com/in/aliteacher', 5, 'Backend and data instructor.', 'approved', 1, NOW()),
(3, '+92-300-2222222', 'uploads/cvs/teacher-3-sample.pdf', 'https://github.com/sarateacher', 'https://linkedin.com/in/sarateacher', 4, 'Frontend and UI specialist.', 'approved', 1, NOW()),
(4, '+92-300-3333333', 'uploads/cvs/teacher-4-sample.pdf', 'https://github.com/pendingteacher', 'https://linkedin.com/in/pendingteacher', 2, 'Junior instructor pending review.', 'pending', NULL, NULL);

INSERT INTO students (student_id, age) VALUES
(5, 14),
(6, 16);

INSERT INTO teacher_approval_logs (teacher_id, admin_id, decision, reason) VALUES
(2, 1, 'approved', 'Strong CV and relevant experience.'),
(3, 1, 'approved', 'Excellent portfolio and references.');

INSERT INTO courses (teacher_id, category_id, title, description, is_active) VALUES
(2, 1, 'Node.js Essentials', 'Build APIs using Express and MySQL.', TRUE),
(3, 1, 'React Foundations', 'Learn modern React from basics.', TRUE),
(2, 2, 'Discrete Math Basics', 'Math for programming and logic.', TRUE);

INSERT INTO course_applications (student_id, course_id, teacher_id, status, message, responded_at) VALUES
(5, 1, 2, 'approved', 'Interested in backend development.', NOW()),
(5, 2, 3, 'pending', 'Want to improve frontend skills.', NULL),
(6, 2, 3, 'rejected', 'Can join next month batch.', NOW());

INSERT INTO enrollments (student_id, course_id, teacher_id, approved_application_id) VALUES
(5, 1, 2, 1);

INSERT INTO student_notes (enrollment_id, student_id, file_name, file_path, mime_type, file_size_bytes) VALUES
(1, 5, 'intro-backend-notes.pdf', 'uploads/notes/intro-backend-notes.pdf', 'application/pdf', 123456);

INSERT INTO complaints (student_id, teacher_id, course_id, description, status) VALUES
(5, 2, 1, 'Lecture started late twice this week.', 'pending'),
(5, 2, 1, 'Issue was discussed and resolved.', 'resolved');

UPDATE complaints
SET resolved_at = NOW(), resolved_by = 1, resolution_note = 'Admin reviewed and closed.'
WHERE complaint_id = 2;
