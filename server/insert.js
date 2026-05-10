import pool from './config/db.js';

/*
  ╔═══════════════════════════════════════════════════════════════╗
  ║  insert.js — Inserts sample data (mirrors 02_DML_Inserts.sql)║
  ║  Data sourced from INSERT Queries.sql                        ║
  ║  Passwords stored as plain text — no hashing.                ║
  ║  Run:  node insert.js                                        ║
  ║  NOTE: Run reset.js first if you want a clean slate.         ║
  ╚═══════════════════════════════════════════════════════════════╝
*/

const SAMPLE_USERS = [
  // Students (IDs will be 1-15, 24-25)
  { name: 'Ali Khan',        email: 'ali.khan@gmail.com',       role: 'student', password: 'pass123' },
  { name: 'Sara Ahmed',      email: 'sara.ahmed@gmail.com',      role: 'student', password: 'pass123' },
  { name: 'Usman Tariq',     email: 'usman.tariq@gmail.com',     role: 'student', password: 'pass123' },
  { name: 'Ayesha Noor',     email: 'ayesha.noor@gmail.com',     role: 'student', password: 'pass123' },
  { name: 'Bilal Hussain',   email: 'bilal.h@gmail.com',         role: 'student', password: 'pass123' },
  { name: 'Fatima Zahra',    email: 'fatima.z@gmail.com',         role: 'student', password: 'pass123' },
  { name: 'Hassan Raza',     email: 'hassan.r@gmail.com',         role: 'student', password: 'pass123' },
  { name: 'Zain Ali',        email: 'zain.ali@gmail.com',         role: 'student', password: 'pass123' },
  { name: 'Noor Fatima',     email: 'noor.f@gmail.com',           role: 'student', password: 'pass123' },
  { name: 'Omar Sheikh',     email: 'omar.s@gmail.com',           role: 'student', password: 'pass123' },
  { name: 'Ahmed Raza',      email: 'ahmed.r@gmail.com',          role: 'student', password: 'pass123' },
  { name: 'Mahnoor Khan',    email: 'mahnoor.k@gmail.com',        role: 'student', password: 'pass123' },
  { name: 'Hamza Ali',       email: 'hamza.a@gmail.com',           role: 'student', password: 'pass123' },
  { name: 'Iqra Khan',       email: 'iqra.k@gmail.com',            role: 'student', password: 'pass123' },
  { name: 'Danish Malik',    email: 'danish.m@gmail.com',          role: 'student', password: 'pass123' },
  // Teachers (IDs will be 16-22)
  { name: 'Sana Iqbal',      email: 'sana.i@gmail.com',            role: 'teacher', password: 'pass123' },
  { name: 'Taha Javed',      email: 'taha.j@gmail.com',            role: 'teacher', password: 'pass123' },
  { name: 'Laiba Noor',      email: 'laiba.n@gmail.com',           role: 'teacher', password: 'pass123' },
  { name: 'Saad Ahmed',      email: 'saad.a@gmail.com',            role: 'teacher', password: 'pass123' },
  { name: 'Hira Ali',        email: 'hira.a@gmail.com',            role: 'teacher', password: 'pass123' },
  { name: 'Faisal Khan',     email: 'faisal.k@gmail.com',          role: 'teacher', password: 'pass123' },
  { name: 'Mariam Raza',     email: 'mariam.r@gmail.com',          role: 'teacher', password: 'pass123' },
  // Admin (ID will be 23)
  { name: 'Usama Siddique',  email: 'usama.s@gmail.com',           role: 'admin',   password: 'pass123' },
  // Extra Students (IDs 24-25)
  { name: 'Kiran Malik',     email: 'kiran.m@gmail.com',           role: 'student', password: 'pass123' },
  { name: 'Adnan Shah',      email: 'adnan.s@gmail.com',           role: 'student', password: 'pass123' },
];

async function insert() {
  const conn = await pool.getConnection();

  try {
    console.log('📦 Inserting sample data...\n');

    // ── 1. Insert all users ─────────────────────────────────────────
    const userIds = {};
    for (const u of SAMPLE_USERS) {
      const [existing] = await conn.execute('SELECT user_id FROM users WHERE email = ?', [u.email]);
      if (existing.length > 0) {
        userIds[u.email] = existing[0].user_id;
        console.log(`  ⏩ Skipped (exists): ${u.email}`);
        continue;
      }
      const [result] = await conn.execute(
        'INSERT INTO users (full_name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [u.name, u.email, u.password, u.role]
      );
      userIds[u.email] = result.insertId;
      console.log(`  ✅ Created ${u.role.padEnd(8)} │ ${u.email.padEnd(35)} │ password: ${u.password}`);
    }

    // ── 2. Admin profile ────────────────────────────────────────────
    const adminId = userIds['usama.s@gmail.com'];
    const [existingAdmin] = await conn.execute('SELECT admin_id FROM admins WHERE admin_id = ?', [adminId]);
    if (existingAdmin.length === 0) {
      await conn.execute('INSERT INTO admins (admin_id, title) VALUES (?, ?)', [adminId, 'super_admin']);
    }
    console.log('  ✅ Admin profile inserted');

    // ── 3. Teacher profiles ─────────────────────────────────────────
    const teacherProfiles = [
      { email: 'sana.i@gmail.com',    phone: '+92-300-1600000', cv: 'uploads/cvs/teacher-16.pdf', github: 'https://github.com/sanaiqbal',  linkedin: 'https://linkedin.com/in/sanaiqbal',  exp: 5, bio: 'Programming and English language instructor.',   status: 'approved' },
      { email: 'taha.j@gmail.com',    phone: '+92-300-1700000', cv: 'uploads/cvs/teacher-17.pdf', github: 'https://github.com/tahajaved',  linkedin: 'https://linkedin.com/in/tahajaved',  exp: 4, bio: 'Java, web development and marketing expert.',     status: 'approved' },
      { email: 'laiba.n@gmail.com',   phone: '+92-300-1800000', cv: 'uploads/cvs/teacher-18.pdf', github: 'https://github.com/laibanoor',  linkedin: 'https://linkedin.com/in/laibanoor',  exp: 6, bio: 'Calculus, design and networking instructor.',      status: 'approved' },
      { email: 'saad.a@gmail.com',    phone: '+92-300-1900000', cv: 'uploads/cvs/teacher-19.pdf', github: 'https://github.com/saadahmed',  linkedin: 'https://linkedin.com/in/saadahmed',  exp: 3, bio: 'Physics, ML and data science teacher.',            status: 'approved' },
      { email: 'hira.a@gmail.com',    phone: '+92-300-2000000', cv: 'uploads/cvs/teacher-20.pdf', github: 'https://github.com/hiraali',    linkedin: 'https://linkedin.com/in/hiraali',    exp: 1, bio: 'Junior teacher pending approval.',                 status: 'pending' },
      { email: 'faisal.k@gmail.com',  phone: '+92-300-2100000', cv: 'uploads/cvs/teacher-21.pdf', github: 'https://github.com/faisalkhan', linkedin: 'https://linkedin.com/in/faisalkhan', exp: 7, bio: 'Cyber security and Urdu language specialist.',     status: 'approved' },
      { email: 'mariam.r@gmail.com',  phone: '+92-300-2200000', cv: 'uploads/cvs/teacher-22.pdf', github: 'https://github.com/mariamraza', linkedin: 'https://linkedin.com/in/mariamraza', exp: 2, bio: 'New teacher awaiting review.',                     status: 'pending' },
    ];
    for (const t of teacherProfiles) {
      const tid = userIds[t.email];
      const [existing] = await conn.execute('SELECT teacher_id FROM teachers WHERE teacher_id = ?', [tid]);
      if (existing.length > 0) continue;
      const isApproved = t.status === 'approved';
      await conn.execute(
        `INSERT INTO teachers (teacher_id, phone, cv_path, github_url, linkedin_url, experience_years, bio, approval_status, approved_by, approved_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [tid, t.phone, t.cv, t.github, t.linkedin, t.exp, t.bio, t.status, isApproved ? adminId : null, isApproved ? new Date() : null]
      );
    }
    console.log('  ✅ Teacher profiles inserted');

    // ── 4. Student profiles ─────────────────────────────────────────
    const studentProfiles = [
      { email: 'ali.khan@gmail.com',    age: 18 },
      { email: 'sara.ahmed@gmail.com',   age: 19 },
      { email: 'usman.tariq@gmail.com',  age: 20 },
      { email: 'ayesha.noor@gmail.com',  age: 17 },
      { email: 'bilal.h@gmail.com',      age: 21 },
      { email: 'fatima.z@gmail.com',     age: 18 },
      { email: 'hassan.r@gmail.com',      age: 19 },
      { email: 'zain.ali@gmail.com',      age: 22 },
      { email: 'noor.f@gmail.com',        age: 20 },
      { email: 'omar.s@gmail.com',        age: 17 },
      { email: 'ahmed.r@gmail.com',       age: 19 },
      { email: 'mahnoor.k@gmail.com',     age: 18 },
      { email: 'hamza.a@gmail.com',        age: 21 },
      { email: 'iqra.k@gmail.com',         age: 16 },
      { email: 'danish.m@gmail.com',       age: 20 },
      { email: 'kiran.m@gmail.com',        age: 18 },
      { email: 'adnan.s@gmail.com',        age: 19 },
    ];
    for (const s of studentProfiles) {
      const sid = userIds[s.email];
      const [existing] = await conn.execute('SELECT student_id FROM students WHERE student_id = ?', [sid]);
      if (existing.length > 0) continue;
      await conn.execute('INSERT INTO students (student_id, age) VALUES (?, ?)', [sid, s.age]);
    }
    console.log('  ✅ Student profiles inserted');

    // ── 5. Teacher approval logs ────────────────────────────────────
    const approvedTeacherEmails = ['sana.i@gmail.com', 'taha.j@gmail.com', 'laiba.n@gmail.com', 'saad.a@gmail.com', 'faisal.k@gmail.com'];
    const approvalReasons = [
      'Strong CV and relevant experience.',
      'Excellent portfolio and references.',
      'Great teaching background.',
      'Solid academic credentials.',
      'Impressive security certifications.',
    ];
    for (let i = 0; i < approvedTeacherEmails.length; i++) {
      const tid = userIds[approvedTeacherEmails[i]];
      await conn.execute(
        `INSERT IGNORE INTO teacher_approval_logs (teacher_id, admin_id, decision, reason) VALUES (?, ?, 'approved', ?)`,
        [tid, adminId, approvalReasons[i]]
      );
    }
    console.log('  ✅ Approval logs inserted');

    // ── 6. Categories ───────────────────────────────────────────────
    await conn.execute(`
      INSERT IGNORE INTO categories (name, description, age_group) VALUES
      ('Programming',     'Coding and software development',   '15+'),
      ('Mathematics',     'Algebra, Calculus, Statistics',      '14+'),
      ('Science',         'Physics, Chemistry, Biology',       '14+'),
      ('Languages',       'English, Urdu, Arabic',             '10+'),
      ('Business',        'Finance, Marketing',                '16+'),
      ('Design',          'UI/UX, Graphic Design',             '15+'),
      ('Data Science',    'AI, ML, Data Analysis',             '18+'),
      ('Cyber Security',  'Ethical Hacking, Security',         '18+'),
      ('Web Development', 'Frontend and Backend',              '16+'),
      ('School Basics',   'Basic subjects',                    '8-14')
    `);
    console.log('  ✅ Categories inserted');

    // ── 7. Courses ──────────────────────────────────────────────────
    // Get category IDs
    const [catRows] = await conn.execute('SELECT category_id, name FROM categories ORDER BY category_id');
    const catMap = {};
    for (const c of catRows) catMap[c.name] = c.category_id;

    const t16 = userIds['sana.i@gmail.com'];
    const t17 = userIds['taha.j@gmail.com'];
    const t18 = userIds['laiba.n@gmail.com'];
    const t19 = userIds['saad.a@gmail.com'];
    const t21 = userIds['faisal.k@gmail.com'];

    const courses = [
      [t16, catMap['Programming'],     'Intro to Programming',  'Basics of coding'],
      [t17, catMap['Programming'],     'Advanced Java',         'OOP and frameworks'],
      [t18, catMap['Mathematics'],     'Calculus I',            'Limits and derivatives'],
      [t19, catMap['Science'],         'Physics Basics',        'Fundamental physics'],
      [t16, catMap['Languages'],       'English Speaking',      'Improve communication'],
      [t17, catMap['Business'],        'Marketing 101',         'Basics of marketing'],
      [t18, catMap['Design'],          'UI Design',             'Design principles'],
      [t19, catMap['Data Science'],    'Machine Learning',      'ML concepts'],
      [t21, catMap['Cyber Security'],  'Ethical Hacking',       'Cyber security basics'],
      [t16, catMap['Web Development'], 'React Development',     'Frontend framework'],
      [t17, catMap['Web Development'], 'HTML & CSS',            'Web basics'],
      [t18, catMap['Mathematics'],     'Linear Algebra',        'Matrices and vectors'],
      [t19, catMap['Science'],         'Biology Intro',         'Basic biology'],
      [t21, catMap['Languages'],       'Urdu Writing',          'Language course'],
      [t17, catMap['Business'],        'Finance Basics',        'Money management'],
      [t18, catMap['Design'],          'Graphic Design',        'Photoshop basics'],
      [t19, catMap['Data Science'],    'Data Analysis',         'Using Python'],
      [t21, catMap['Cyber Security'],  'Network Security',      'Advanced security'],
      [t16, catMap['Web Development'], 'NextJS Course',         'Modern web dev'],
      [t17, catMap['School Basics'],   'School Math',           'Basic math skills'],
    ];
    for (const c of courses) {
      await conn.execute(
        `INSERT IGNORE INTO courses (teacher_id, category_id, title, description, is_active) VALUES (?, ?, ?, ?, TRUE)`,
        c
      );
    }
    console.log('  ✅ Courses inserted');

    // ── 8. Course applications ──────────────────────────────────────
    // Get course IDs in order
    const [courseRows] = await conn.execute('SELECT course_id, teacher_id FROM courses ORDER BY course_id');

    const s1  = userIds['ali.khan@gmail.com'];
    const s2  = userIds['sara.ahmed@gmail.com'];
    const s3  = userIds['usman.tariq@gmail.com'];
    const s4  = userIds['ayesha.noor@gmail.com'];
    const s5  = userIds['bilal.h@gmail.com'];
    const s6  = userIds['fatima.z@gmail.com'];
    const s7  = userIds['hassan.r@gmail.com'];
    const s8  = userIds['zain.ali@gmail.com'];
    const s9  = userIds['noor.f@gmail.com'];
    const s10 = userIds['omar.s@gmail.com'];
    const s11 = userIds['ahmed.r@gmail.com'];
    const s12 = userIds['mahnoor.k@gmail.com'];
    const s13 = userIds['hamza.a@gmail.com'];
    const s14 = userIds['iqra.k@gmail.com'];
    const s15 = userIds['danish.m@gmail.com'];

    const applications = [
      [s1,  courseRows[0]?.course_id,  courseRows[0]?.teacher_id,  'pending',   'Interested in programming',  null],
      [s2,  courseRows[1]?.course_id,  courseRows[1]?.teacher_id,  'approved',  'Want to learn Java',         new Date()],
      [s3,  courseRows[2]?.course_id,  courseRows[2]?.teacher_id,  'rejected',  'Need calculus help',          new Date()],
      [s4,  courseRows[3]?.course_id,  courseRows[3]?.teacher_id,  'pending',   'Physics beginner',           null],
      [s5,  courseRows[4]?.course_id,  courseRows[4]?.teacher_id,  'approved',  'Improve English',            new Date()],
      [s6,  courseRows[5]?.course_id,  courseRows[5]?.teacher_id,  'pending',   'Marketing interest',         null],
      [s7,  courseRows[6]?.course_id,  courseRows[6]?.teacher_id,  'pending',   'UI skills',                  null],
      [s8,  courseRows[7]?.course_id,  courseRows[7]?.teacher_id,  'approved',  'ML passion',                 new Date()],
      [s9,  courseRows[8]?.course_id,  courseRows[8]?.teacher_id,  'pending',   'Security basics',            null],
      [s10, courseRows[9]?.course_id,  courseRows[9]?.teacher_id,  'pending',   'React learning',             null],
      [s11, courseRows[10]?.course_id, courseRows[10]?.teacher_id, 'approved',  'Web basics',                 new Date()],
      [s12, courseRows[11]?.course_id, courseRows[11]?.teacher_id, 'pending',   'Math help',                  null],
      [s13, courseRows[12]?.course_id, courseRows[12]?.teacher_id, 'rejected',  'Biology doubts',             new Date()],
      [s14, courseRows[13]?.course_id, courseRows[13]?.teacher_id, 'pending',   'Urdu course',                null],
      [s15, courseRows[14]?.course_id, courseRows[14]?.teacher_id, 'approved',  'Finance interest',           new Date()],
      [s1,  courseRows[15]?.course_id, courseRows[15]?.teacher_id, 'pending',   'Design learning',            null],
      [s2,  courseRows[16]?.course_id, courseRows[16]?.teacher_id, 'approved',  'Data skills',                new Date()],
      [s3,  courseRows[17]?.course_id, courseRows[17]?.teacher_id, 'pending',   'Networking',                 null],
      [s4,  courseRows[18]?.course_id, courseRows[18]?.teacher_id, 'pending',   'NextJS',                     null],
      [s5,  courseRows[19]?.course_id, courseRows[19]?.teacher_id, 'approved',  'Basic math',                 new Date()],
    ];
    for (const a of applications) {
      if (!a[1]) continue; // skip if course doesn't exist
      await conn.execute(
        `INSERT IGNORE INTO course_applications (student_id, course_id, teacher_id, status, message, responded_at) VALUES (?, ?, ?, ?, ?, ?)`,
        a
      );
    }
    console.log('  ✅ Course applications inserted');

    // ── 9. Enrollments (for approved applications) ──────────────────
    const [approvedApps] = await conn.execute(
      "SELECT application_id, student_id, course_id, teacher_id FROM course_applications WHERE status = 'approved' ORDER BY application_id"
    );
    for (const app of approvedApps) {
      const [existing] = await conn.execute(
        'SELECT enrollment_id FROM enrollments WHERE student_id = ? AND course_id = ?',
        [app.student_id, app.course_id]
      );
      if (existing.length > 0) continue;
      await conn.execute(
        'INSERT INTO enrollments (student_id, course_id, teacher_id, approved_application_id) VALUES (?, ?, ?, ?)',
        [app.student_id, app.course_id, app.teacher_id, app.application_id]
      );
    }
    console.log('  ✅ Enrollments inserted');

    // ── 10. Student Notes ───────────────────────────────────────────
    const [enrollRows] = await conn.execute('SELECT enrollment_id, student_id FROM enrollments ORDER BY enrollment_id');
    const noteFiles = [
      'java-oop-concepts.pdf',
      'grammar-basics.pdf',
      'ml-models-notes.pdf',
      'html-tags-guide.pdf',
      'budgeting-notes.pdf',
      'data-cleaning-notes.pdf',
      'basic-arithmetic.pdf',
    ];
    const noteSizes = [102400, 85120, 153600, 76800, 61440, 92160, 45056];
    for (let i = 0; i < Math.min(enrollRows.length, noteFiles.length); i++) {
      const e = enrollRows[i];
      await conn.execute(
        `INSERT IGNORE INTO student_notes (enrollment_id, student_id, file_name, file_path, mime_type, file_size_bytes) VALUES (?, ?, ?, ?, 'application/pdf', ?)`,
        [e.enrollment_id, e.student_id, noteFiles[i], `uploads/notes/${noteFiles[i]}`, noteSizes[i]]
      );
    }
    console.log('  ✅ Student notes inserted');

    // ── 11. Complaints ──────────────────────────────────────────────
    const complaints = [
      [s1,  t16, courseRows[0]?.course_id,  'Late responses',        'pending',  null,    null, null],
      [s2,  t17, courseRows[1]?.course_id,  'Unclear teaching',      'resolved', adminId, new Date(), 'Admin reviewed and resolved.'],
      [s3,  t18, courseRows[2]?.course_id,  'Missed class',          'pending',  null,    null, null],
      [s4,  t19, courseRows[3]?.course_id,  'Rude behavior',         'resolved', adminId, new Date(), 'Discussed with teacher.'],
      [s5,  t16, courseRows[4]?.course_id,  'No feedback',           'pending',  null,    null, null],
      [s6,  t17, courseRows[5]?.course_id,  'Too fast teaching',     'resolved', adminId, new Date(), 'Teacher counseled.'],
      [s7,  t18, courseRows[6]?.course_id,  'Scheduling issues',     'pending',  null,    null, null],
      [s8,  t19, courseRows[7]?.course_id,  'Unprofessional',        'resolved', adminId, new Date(), 'Warning issued.'],
      [s9,  t21, courseRows[8]?.course_id,  'Late class',            'pending',  null,    null, null],
      [s10, t16, courseRows[9]?.course_id,  'No materials',          'pending',  null,    null, null],
      [s11, t17, courseRows[10]?.course_id, 'Confusing lectures',    'resolved', adminId, new Date(), 'Additional support assigned.'],
      [s12, t18, courseRows[11]?.course_id, 'Lack of clarity',       'pending',  null,    null, null],
      [s13, t19, courseRows[12]?.course_id, 'Too difficult',         'pending',  null,    null, null],
      [s14, t21, courseRows[13]?.course_id, 'No support',            'resolved', adminId, new Date(), 'Support resources added.'],
      [s15, t17, courseRows[14]?.course_id, 'Slow response',         'pending',  null,    null, null],
      [s1,  t18, courseRows[2]?.course_id,  'Missed deadline',       'resolved', adminId, new Date(), 'Extension granted.'],
      [s2,  t19, courseRows[3]?.course_id,  'Poor explanation',      'pending',  null,    null, null],
      [s3,  t21, courseRows[8]?.course_id,  'Class cancelled',       'resolved', adminId, new Date(), 'Rescheduled.'],
      [s4,  t16, courseRows[0]?.course_id,  'No communication',      'pending',  null,    null, null],
      [s5,  t17, courseRows[5]?.course_id,  'Late grading',          'pending',  null,    null, null],
    ];
    for (const c of complaints) {
      if (!c[2]) continue; // skip if course doesn't exist
      await conn.execute(
        `INSERT IGNORE INTO complaints (student_id, teacher_id, course_id, description, status, resolved_by, resolved_at, resolution_note) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        c
      );
    }
    console.log('  ✅ Complaints inserted');

    // ── Summary ─────────────────────────────────────────────────────
    console.log('\n══════════════════════════════════════════════════════');
    console.log('📋 All user credentials (password: pass123):');
    console.log('══════════════════════════════════════════════════════');
    for (const u of SAMPLE_USERS) {
      console.log(`  ${u.role.padEnd(8)} │ ${u.email.padEnd(35)} │ ${u.password}`);
    }
    console.log('══════════════════════════════════════════════════════\n');
    console.log('✅ Sample data inserted successfully!\n');
  } catch (err) {
    console.error('❌ Error:', err.message);
    console.error(err);
  } finally {
    conn.release();
    process.exit(0);
  }
}

insert();
