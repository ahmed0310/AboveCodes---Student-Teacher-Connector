import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Button } from '../../components/ui/button';

export function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [notes, setNotes] = useState<any[]>([]);
  const [noteFile, setNoteFile] = useState<File | null>(null);
  const [enrollmentId, setEnrollmentId] = useState('');
  const [complaintCourseId, setComplaintCourseId] = useState('');
  const [complaintText, setComplaintText] = useState('');

  useEffect(() => {
    const raw = localStorage.getItem('study_buddy_user');
    if (!raw) return navigate('/signin');
    const parsed = JSON.parse(raw);
    if (parsed.role !== 'student') return navigate('/signin');
    setUser(parsed);
    loadData();
  }, []);

  const loadData = async () => {
    const [coursesRes, appsRes, enrollmentsRes, notesRes] = await Promise.all([
      api.get('/student/courses'),
      api.get('/student/applications'),
      api.get('/student/enrollments'),
      api.get('/student/notes')
    ]);
    setCourses(coursesRes.data);
    setApplications(appsRes.data);
    setEnrollments(enrollmentsRes.data);
    setNotes(notesRes.data);
  };

  const handleApply = async (courseId: number) => {
    await api.post('/student/apply', { course_id: courseId, message: 'Please consider my application.' });
    await loadData();
  };

  const handleUploadNote = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!noteFile || !enrollmentId) return;
    const form = new FormData();
    form.append('note', noteFile);
    form.append('enrollment_id', enrollmentId);
    await api.post('/student/notes', form, { headers: { 'Content-Type': 'multipart/form-data' } });
    setNoteFile(null);
    setEnrollmentId('');
    await loadData();
  };

  const handleComplaint = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post('/student/complaint', { course_id: Number(complaintCourseId), description: complaintText });
    setComplaintCourseId('');
    setComplaintText('');
  };

  const logout = () => {
    localStorage.removeItem('study_buddy_token');
    localStorage.removeItem('study_buddy_user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Student Dashboard</h1>
          <Button variant="outline" onClick={logout}>Logout</Button>
        </div>
        <section className="rounded-xl border bg-white p-5">
          <h2 className="mb-3 text-xl font-semibold">Available Courses</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {courses.map((c) => (
              <div key={c.course_id} className="rounded-lg border p-4">
                <p className="font-semibold">{c.title}</p>
                <p className="text-sm text-slate-600">Teacher: {c.teacher_name}</p>
                <p className="text-sm text-slate-600">{c.description}</p>
                <Button className="mt-3" onClick={() => handleApply(c.course_id)}>Apply</Button>
              </div>
            ))}
          </div>
        </section>
        <section className="rounded-xl border bg-white p-5">
          <h2 className="mb-3 text-xl font-semibold">Applications</h2>
          {applications.map((a) => (
            <div key={a.application_id} className="border-b py-2 text-sm">
              {a.course_title} - {a.teacher_name} - <span className="capitalize">{a.status}</span>
            </div>
          ))}
        </section>
        <section className="rounded-xl border bg-white p-5">
          <h2 className="mb-3 text-xl font-semibold">Upload Notes (PDF)</h2>
          <form onSubmit={handleUploadNote} className="space-y-3">
            <select className="w-full rounded border px-3 py-2" value={enrollmentId} onChange={(e) => setEnrollmentId(e.target.value)} required>
              <option value="">Select enrollment</option>
              {enrollments.map((e) => <option key={e.enrollment_id} value={e.enrollment_id}>{e.course_title} - {e.teacher_name}</option>)}
            </select>
            <input type="file" accept="application/pdf" onChange={(e) => setNoteFile(e.target.files?.[0] || null)} required />
            <Button type="submit">Upload Note</Button>
          </form>
          <div className="mt-4 space-y-1 text-sm">
            {notes.map((n) => (
              <a key={n.note_id} href={`http://localhost:5000/${n.file_path}`} className="block text-blue-600" target="_blank" rel="noreferrer">
                {n.course_title} - {n.file_name}
              </a>
            ))}
          </div>
        </section>
        <section className="rounded-xl border bg-white p-5">
          <h2 className="mb-3 text-xl font-semibold">Complaint</h2>
          <form onSubmit={handleComplaint} className="space-y-3">
            <select className="w-full rounded border px-3 py-2" value={complaintCourseId} onChange={(e) => setComplaintCourseId(e.target.value)} required>
              <option value="">Select enrolled course</option>
              {enrollments.map((e) => <option key={e.enrollment_id} value={e.course_id}>{e.course_title}</option>)}
            </select>
            <textarea className="w-full rounded border px-3 py-2" rows={3} value={complaintText} onChange={(e) => setComplaintText(e.target.value)} required />
            <Button type="submit">Submit Complaint</Button>
          </form>
        </section>
      </div>
    </div>
  );
}
