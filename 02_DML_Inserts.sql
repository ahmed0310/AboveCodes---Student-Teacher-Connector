USE study_buddy;

-- ╔════════════════════════════════════════════════════════════════╗
-- ║  Sample Data — adapted from INSERT Queries.sql                ║
-- ║  Run this file in MySQL after running DDL Queries.sql         ║
-- ╚════════════════════════════════════════════════════════════════╝

-- ─── User Credentials ───────────────────────────────────────────
-- All user passwords: pass123
-- Users 1-15  → Students
-- Users 16-22 → Teachers (20, 22 pending approval)
-- User  23    → Admin (super_admin)
-- Users 24-25 → Extra users (students)

-- ─── Users ──────────────────────────────────────────────────────
INSERT INTO users (full_name, email, password_hash, role) VALUES
('Ali Khan',        'ali.khan@gmail.com',       'pass123', 'student'),
('Sara Ahmed',      'sara.ahmed@gmail.com',      'pass123', 'student'),
('Usman Tariq',     'usman.tariq@gmail.com',     'pass123', 'student'),
('Ayesha Noor',     'ayesha.noor@gmail.com',     'pass123', 'student'),
('Bilal Hussain',   'bilal.h@gmail.com',         'pass123', 'student'),
('Fatima Zahra',    'fatima.z@gmail.com',         'pass123', 'student'),
('Hassan Raza',     'hassan.r@gmail.com',         'pass123', 'student'),
('Zain Ali',        'zain.ali@gmail.com',         'pass123', 'student'),
('Noor Fatima',     'noor.f@gmail.com',           'pass123', 'student'),
('Omar Sheikh',     'omar.s@gmail.com',           'pass123', 'student'),
('Ahmed Raza',      'ahmed.r@gmail.com',          'pass123', 'student'),
('Mahnoor Khan',    'mahnoor.k@gmail.com',        'pass123', 'student'),
('Hamza Ali',       'hamza.a@gmail.com',           'pass123', 'student'),
('Iqra Khan',       'iqra.k@gmail.com',            'pass123', 'student'),
('Danish Malik',    'danish.m@gmail.com',          'pass123', 'student'),
('Sana Iqbal',      'sana.i@gmail.com',            'pass123', 'teacher'),
('Taha Javed',      'taha.j@gmail.com',            'pass123', 'teacher'),
('Laiba Noor',      'laiba.n@gmail.com',           'pass123', 'teacher'),
('Saad Ahmed',      'saad.a@gmail.com',            'pass123', 'teacher'),
('Hira Ali',        'hira.a@gmail.com',            'pass123', 'teacher'),
('Faisal Khan',     'faisal.k@gmail.com',          'pass123', 'teacher'),
('Mariam Raza',     'mariam.r@gmail.com',          'pass123', 'teacher'),
('Usama Siddique',  'usama.s@gmail.com',           'pass123', 'admin'),
('Kiran Malik',     'kiran.m@gmail.com',           'pass123', 'student'),
('Adnan Shah',      'adnan.s@gmail.com',           'pass123', 'student');

-- ─── Students (IDs 1-15, 24-25) ────────────────────────────────
INSERT INTO students (student_id, age) VALUES
(1,  18),
(2,  19),
(3,  20),
(4,  17),
(5,  21),
(6,  18),
(7,  19),
(8,  22),
(9,  20),
(10, 17),
(11, 19),
(12, 18),
(13, 21),
(14, 16),
(15, 20),
(24, 18),
(25, 19);

-- ─── Admin (ID 23) ─────────────────────────────────────────────
INSERT INTO admins (admin_id, title) VALUES
(23, 'super_admin');

-- ─── Teachers (IDs 16-22) ───────────────────────────────────────
-- Teachers 16,17,18,19,21 → approved;  20,22 → pending
INSERT INTO teachers (teacher_id, phone, cv_path, github_url, linkedin_url, experience_years, bio, approval_status, approved_by, approved_at) VALUES
(16, '+92-300-1600000', 'uploads/cvs/teacher-16.pdf', 'https://github.com/sanaiqbal',    'https://linkedin.com/in/sanaiqbal',    5, 'Programming and English language instructor.',     'approved', 23, NOW()),
(17, '+92-300-1700000', 'uploads/cvs/teacher-17.pdf', 'https://github.com/tahajaved',    'https://linkedin.com/in/tahajaved',    4, 'Java, web development and marketing expert.',       'approved', 23, NOW()),
(18, '+92-300-1800000', 'uploads/cvs/teacher-18.pdf', 'https://github.com/laibanoor',    'https://linkedin.com/in/laibanoor',    6, 'Calculus, design and networking instructor.',        'approved', 23, NOW()),
(19, '+92-300-1900000', 'uploads/cvs/teacher-19.pdf', 'https://github.com/saadahmed',    'https://linkedin.com/in/saadahmed',    3, 'Physics, ML and data science teacher.',              'approved', 23, NOW()),
(20, '+92-300-2000000', 'uploads/cvs/teacher-20.pdf', 'https://github.com/hiraali',      'https://linkedin.com/in/hiraali',      1, 'Junior teacher pending approval.',                   'pending',  NULL, NULL),
(21, '+92-300-2100000', 'uploads/cvs/teacher-21.pdf', 'https://github.com/faisalkhan',   'https://linkedin.com/in/faisalkhan',   7, 'Cyber security and Urdu language specialist.',       'approved', 23, NOW()),
(22, '+92-300-2200000', 'uploads/cvs/teacher-22.pdf', 'https://github.com/mariamraza',   'https://linkedin.com/in/mariamraza',   2, 'New teacher awaiting review.',                       'pending',  NULL, NULL);

-- ─── Teacher Approval Logs ──────────────────────────────────────
INSERT INTO teacher_approval_logs (teacher_id, admin_id, decision, reason) VALUES
(16, 23, 'approved', 'Strong CV and relevant experience.'),
(17, 23, 'approved', 'Excellent portfolio and references.'),
(18, 23, 'approved', 'Great teaching background.'),
(19, 23, 'approved', 'Solid academic credentials.'),
(21, 23, 'approved', 'Impressive security certifications.');

-- ─── Categories ─────────────────────────────────────────────────
INSERT INTO categories (name, description, age_group) VALUES
('Programming',     'Coding and software development',   '15+'),
('Mathematics',     'Algebra, Calculus, Statistics',      '14+'),
('Science',         'Physics, Chemistry, Biology',       '14+'),
('Languages',       'English, Urdu, Arabic',             '10+'),
('Business',        'Finance, Marketing',                '16+'),
('Design',          'UI/UX, Graphic Design',             '15+'),
('Data Science',    'AI, ML, Data Analysis',             '18+'),
('Cyber Security',  'Ethical Hacking, Security',         '18+'),
('Web Development', 'Frontend and Backend',              '16+'),
('School Basics',   'Basic subjects',                    '8-14');

-- ─── Courses ────────────────────────────────────────────────────
INSERT INTO courses (teacher_id, category_id, title, description, is_active) VALUES
(16, 1,  'Intro to Programming',  'Basics of coding',             TRUE),
(17, 1,  'Advanced Java',         'OOP and frameworks',           TRUE),
(18, 2,  'Calculus I',            'Limits and derivatives',       TRUE),
(19, 3,  'Physics Basics',        'Fundamental physics',          TRUE),
(16, 4,  'English Speaking',      'Improve communication',        TRUE),
(17, 5,  'Marketing 101',         'Basics of marketing',          TRUE),
(18, 6,  'UI Design',             'Design principles',            TRUE),
(19, 7,  'Machine Learning',      'ML concepts',                  TRUE),
(21, 8,  'Ethical Hacking',       'Cyber security basics',        TRUE),
(16, 9,  'React Development',     'Frontend framework',           TRUE),
(17, 9,  'HTML & CSS',            'Web basics',                   TRUE),
(18, 2,  'Linear Algebra',        'Matrices and vectors',         TRUE),
(19, 3,  'Biology Intro',         'Basic biology',                TRUE),
(21, 4,  'Urdu Writing',          'Language course',              TRUE),
(17, 5,  'Finance Basics',        'Money management',             TRUE),
(18, 6,  'Graphic Design',        'Photoshop basics',             TRUE),
(19, 7,  'Data Analysis',         'Using Python',                 TRUE),
(21, 8,  'Network Security',      'Advanced security',            TRUE),
(16, 9,  'NextJS Course',         'Modern web dev',               TRUE),
(17, 10, 'School Math',           'Basic math skills',            TRUE);

-- ─── Course Applications ────────────────────────────────────────
INSERT INTO course_applications (student_id, course_id, teacher_id, status, message, responded_at) VALUES
(1,  1,  16, 'pending',   'Interested in programming',  NULL),
(2,  2,  17, 'approved',  'Want to learn Java',         NOW()),
(3,  3,  18, 'rejected',  'Need calculus help',          NOW()),
(4,  4,  19, 'pending',   'Physics beginner',           NULL),
(5,  5,  16, 'approved',  'Improve English',            NOW()),
(6,  6,  17, 'pending',   'Marketing interest',         NULL),
(7,  7,  18, 'pending',   'UI skills',                  NULL),
(8,  8,  19, 'approved',  'ML passion',                 NOW()),
(9,  9,  21, 'pending',   'Security basics',            NULL),
(10, 10, 16, 'pending',   'React learning',             NULL),
(11, 11, 17, 'approved',  'Web basics',                 NOW()),
(12, 12, 18, 'pending',   'Math help',                  NULL),
(13, 13, 19, 'rejected',  'Biology doubts',             NOW()),
(14, 14, 21, 'pending',   'Urdu course',                NULL),
(15, 15, 17, 'approved',  'Finance interest',           NOW()),
(1,  16, 18, 'pending',   'Design learning',            NULL),
(2,  17, 19, 'approved',  'Data skills',                NOW()),
(3,  18, 21, 'pending',   'Networking',                 NULL),
(4,  19, 16, 'pending',   'NextJS',                     NULL),
(5,  20, 17, 'approved',  'Basic math',                 NOW());

-- ─── Enrollments (for approved applications) ────────────────────
INSERT INTO enrollments (student_id, course_id, teacher_id, approved_application_id) VALUES
(2,  2,  17, 2),
(5,  5,  16, 5),
(8,  8,  19, 8),
(11, 11, 17, 11),
(15, 15, 17, 15),
(2,  17, 19, 17),
(5,  20, 17, 20);

-- ─── Student Notes ──────────────────────────────────────────────
INSERT INTO student_notes (enrollment_id, student_id, file_name, file_path, mime_type, file_size_bytes) VALUES
(1, 2,  'java-oop-concepts.pdf',    'uploads/notes/java-oop-concepts.pdf',    'application/pdf', 102400),
(2, 5,  'grammar-basics.pdf',       'uploads/notes/grammar-basics.pdf',       'application/pdf', 85120),
(3, 8,  'ml-models-notes.pdf',      'uploads/notes/ml-models-notes.pdf',      'application/pdf', 153600),
(4, 11, 'html-tags-guide.pdf',      'uploads/notes/html-tags-guide.pdf',      'application/pdf', 76800),
(5, 15, 'budgeting-notes.pdf',      'uploads/notes/budgeting-notes.pdf',      'application/pdf', 61440),
(6, 2,  'data-cleaning-notes.pdf',  'uploads/notes/data-cleaning-notes.pdf',  'application/pdf', 92160),
(7, 5,  'basic-arithmetic.pdf',     'uploads/notes/basic-arithmetic.pdf',     'application/pdf', 45056);

-- ─── Complaints ─────────────────────────────────────────────────
INSERT INTO complaints (student_id, teacher_id, course_id, description, status, resolved_by, resolved_at, resolution_note) VALUES
(1,  16, 1,  'Late responses',        'pending',  NULL, NULL, NULL),
(2,  17, 2,  'Unclear teaching',      'resolved', 23,   NOW(), 'Admin reviewed and resolved.'),
(3,  18, 3,  'Missed class',          'pending',  NULL, NULL, NULL),
(4,  19, 4,  'Rude behavior',         'resolved', 23,   NOW(), 'Discussed with teacher.'),
(5,  16, 5,  'No feedback',           'pending',  NULL, NULL, NULL),
(6,  17, 6,  'Too fast teaching',     'resolved', 23,   NOW(), 'Teacher counseled.'),
(7,  18, 7,  'Scheduling issues',     'pending',  NULL, NULL, NULL),
(8,  19, 8,  'Unprofessional',        'resolved', 23,   NOW(), 'Warning issued.'),
(9,  21, 9,  'Late class',            'pending',  NULL, NULL, NULL),
(10, 16, 10, 'No materials',          'pending',  NULL, NULL, NULL),
(11, 17, 11, 'Confusing lectures',    'resolved', 23,   NOW(), 'Additional support assigned.'),
(12, 18, 12, 'Lack of clarity',       'pending',  NULL, NULL, NULL),
(13, 19, 13, 'Too difficult',         'pending',  NULL, NULL, NULL),
(14, 21, 14, 'No support',            'resolved', 23,   NOW(), 'Support resources added.'),
(15, 17, 15, 'Slow response',         'pending',  NULL, NULL, NULL),
(1,  18, 3,  'Missed deadline',       'resolved', 23,   NOW(), 'Extension granted.'),
(2,  19, 4,  'Poor explanation',      'pending',  NULL, NULL, NULL),
(3,  21, 9,  'Class cancelled',       'resolved', 23,   NOW(), 'Rescheduled.'),
(4,  16, 1,  'No communication',      'pending',  NULL, NULL, NULL),
(5,  17, 6,  'Late grading',          'pending',  NULL, NULL, NULL);
