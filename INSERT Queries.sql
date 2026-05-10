INSERT INTO Users (name, email, password) VALUES
('Ali Khan','ali.khan@gmail.com','pass123'),
('Sara Ahmed','sara.ahmed@gmail.com','pass123'),
('Usman Tariq','usman.tariq@gmail.com','pass123'),
('Ayesha Noor','ayesha.noor@gmail.com','pass123'),
('Bilal Hussain','bilal.h@gmail.com','pass123'),
('Fatima Zahra','fatima.z@gmail.com','pass123'),
('Hassan Raza','hassan.r@gmail.com','pass123'),
('Zain Ali','zain.ali@gmail.com','pass123'),
('Noor Fatima','noor.f@gmail.com','pass123'),
('Omar Sheikh','omar.s@gmail.com','pass123'),
('Ahmed Raza','ahmed.r@gmail.com','pass123'),
('Mahnoor Khan','mahnoor.k@gmail.com','pass123'),
('Hamza Ali','hamza.a@gmail.com','pass123'),
('Iqra Khan','iqra.k@gmail.com','pass123'),
('Danish Malik','danish.m@gmail.com','pass123'),
('Sana Iqbal','sana.i@gmail.com','pass123'),
('Taha Javed','taha.j@gmail.com','pass123'),
('Laiba Noor','laiba.n@gmail.com','pass123'),
('Saad Ahmed','saad.a@gmail.com','pass123'),
('Hira Ali','hira.a@gmail.com','pass123'),
('Faisal Khan','faisal.k@gmail.com','pass123'),
('Mariam Raza','mariam.r@gmail.com','pass123'),
('Usama Siddique','usama.s@gmail.com','pass123'),
('Kiran Malik','kiran.m@gmail.com','pass123'),
('Adnan Shah','adnan.s@gmail.com','pass123');




INSERT INTO Student VALUES
(1),(2),(3),(4),(5),(6),(7),(8),(9),(10),
(11),(12),(13),(14),(15);


INSERT INTO Teacher VALUES
(16,'Y'),
(17,'Y'),
(18,'Y'),
(19,'Y'),
(20,'N'),
(21,'Y'),
(22,'N');

INSERT INTO Admin VALUES
(23,'super_admin');


INSERT INTO Category (name, description, age_group) VALUES
('Programming','Coding and software development','15+'),
('Mathematics','Algebra, Calculus, Statistics','14+'),
('Science','Physics, Chemistry, Biology','14+'),
('Languages','English, Urdu, Arabic','10+'),
('Business','Finance, Marketing','16+'),
('Design','UI/UX, Graphic Design','15+'),
('Data Science','AI, ML, Data Analysis','18+'),
('Cyber Security','Ethical Hacking, Security','18+'),
('Web Development','Frontend and Backend','16+'),
('School Basics','Basic subjects','8-14');



INSERT INTO Course (title, description, teacher_id, category_id) VALUES
('Intro to Programming','Basics of coding',16,1),
('Advanced Java','OOP and frameworks',17,1),
('Calculus I','Limits and derivatives',18,2),
('Physics Basics','Fundamental physics',19,3),
('English Speaking','Improve communication',16,4),
('Marketing 101','Basics of marketing',17,5),
('UI Design','Design principles',18,6),
('Machine Learning','ML concepts',19,7),
('Ethical Hacking','Cyber security basics',21,8),
('React Development','Frontend framework',16,9),
('HTML & CSS','Web basics',17,9),
('Linear Algebra','Matrices and vectors',18,2),
('Biology Intro','Basic biology',19,3),
('Urdu Writing','Language course',21,4),
('Finance Basics','Money management',17,5),
('Graphic Design','Photoshop basics',18,6),
('Data Analysis','Using Python',19,7),
('Network Security','Advanced security',21,8),
('NextJS Course','Modern web dev',16,9),
('School Math','Basic math skills',17,10);



INSERT INTO Enrollment_Request (student_id, course_id, status, message) VALUES
(1,1,'pending','Interested in programming'),
(2,2,'accepted','Want to learn Java'),
(3,3,'rejected','Need calculus help'),
(4,4,'pending','Physics beginner'),
(5,5,'accepted','Improve English'),
(6,6,'pending','Marketing interest'),
(7,7,'pending','UI skills'),
(8,8,'accepted','ML passion'),
(9,9,'pending','Security basics'),
(10,10,'pending','React learning'),
(11,11,'accepted','Web basics'),
(12,12,'pending','Math help'),
(13,13,'rejected','Biology doubts'),
(14,14,'pending','Urdu course'),
(15,15,'accepted','Finance interest'),
(1,16,'pending','Design learning'),
(2,17,'accepted','Data skills'),
(3,18,'pending','Networking'),
(4,19,'pending','NextJS'),
(5,20,'accepted','Basic math');



INSERT INTO Complaint (student_id, teacher_id, description, status, resolved_by) VALUES
(1,16,'Late responses','pending',NULL),
(2,17,'Unclear teaching','resolved',23),
(3,18,'Missed class','pending',NULL),
(4,19,'Rude behavior','resolved',23),
(5,16,'No feedback','pending',NULL),
(6,17,'Too fast teaching','resolved',23),
(7,18,'Scheduling issues','pending',NULL),
(8,19,'Unprofessional','resolved',23),
(9,21,'Late class','pending',NULL),
(10,16,'No materials','pending',NULL),
(11,17,'Confusing lectures','resolved',23),
(12,18,'Lack of clarity','pending',NULL),
(13,19,'Too difficult','pending',NULL),
(14,21,'No support','resolved',23),
(15,17,'Slow response','pending',NULL),
(1,18,'Missed deadline','resolved',23),
(2,19,'Poor explanation','pending',NULL),
(3,21,'Class cancelled','resolved',23),
(4,16,'No communication','pending',NULL),
(5,17,'Late grading','pending',NULL);


INSERT INTO Notes (note_id, student_id, course_id, content) VALUES
(1,1,1,'Variables and loops'),
(2,2,2,'Java OOP concepts'),
(3,3,3,'Derivative rules'),
(4,4,4,'Newton laws'),
(5,5,5,'Grammar basics'),
(6,6,6,'Marketing mix'),
(7,7,7,'UI principles'),
(8,8,8,'ML models'),
(9,9,9,'Security basics'),
(10,10,10,'React hooks'),
(11,11,11,'HTML tags'),
(12,12,12,'Matrix operations'),
(13,13,13,'Cell structure'),
(14,14,14,'Urdu grammar'),
(15,15,15,'Budgeting'),
(16,1,16,'Photoshop tools'),
(17,2,17,'Data cleaning'),
(18,3,18,'Firewall concepts'),
(19,4,19,'NextJS routing'),
(20,5,20,'Basic arithmetic');


INSERT INTO Teacher_Approval (teacher_id, approved_by, status) VALUES
(16,23,'approved'),
(17,23,'approved'),
(18,23,'approved'),
(19,23,'approved'),
(21,23,'approved');