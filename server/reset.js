import pool from './config/db.js';

/*
  ╔═══════════════════════════════════════════════════════════╗
  ║  reset.js — Wipes ALL data and keeps only admin account  ║
  ║  Run:  node reset.js                                     ║
  ╚═══════════════════════════════════════════════════════════╝
*/

async function reset() {
  const conn = await pool.getConnection();

  try {
    console.log('🔄 Resetting database...\n');

    await conn.execute('SET FOREIGN_KEY_CHECKS = 0');

    const tables = [
      'student_notes',
      'complaints',
      'enrollments',
      'course_applications',
      'courses',
      'categories',
      'teacher_approval_logs',
      'teachers',
      'students',
      'admins',
      'users',
    ];

    for (const t of tables) {
      await conn.execute(`DELETE FROM ${t}`);
      await conn.execute(`ALTER TABLE ${t} AUTO_INCREMENT = 1`);
      console.log(`  🗑️  Cleared: ${t}`);
    }

    await conn.execute('SET FOREIGN_KEY_CHECKS = 1');
    console.log('\n  ✅ All tables cleared.');
    console.log('\n✅ Database reset complete. Run "node insert.js" to seed data.\n');
  } catch (err) {
    console.error('❌ Error:', err.message);
  } finally {
    conn.release();
    process.exit(0);
  }
}

reset();
