import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Button } from '../../components/ui/button';
import {
  GraduationCap, BookOpen, LogOut, Search, Upload, FileText,
  AlertTriangle, CheckCircle2, Clock, XCircle, Send, Sparkles,
  BookMarked, ClipboardList, FolderOpen
} from 'lucide-react';

/* ── SVG wave for section header ── */
function SectionHeader({ icon: Icon, title, subtitle, accent }: { icon: any; title: string; subtitle?: string; accent: string }) {
  return (
    <div className="flex items-center gap-4 mb-6">
      <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${accent} transition-transform duration-300 hover:scale-110`}>
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="font-clash text-xl font-bold text-slate-900">{title}</h2>
        {subtitle && <p className="text-sm text-slate-500">{subtitle}</p>}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { bg: string; text: string; icon: any }> = {
    approved: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2 },
    rejected: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle },
    pending: { bg: 'bg-amber-100', text: 'text-amber-700', icon: Clock },
  };
  const c = config[status] || config.pending;
  const BadgeIcon = c.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${c.bg} ${c.text}`}>
      <BadgeIcon className="h-3 w-3" />
      <span className="capitalize">{status}</span>
    </span>
  );
}

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
  const [searchTerm, setSearchTerm] = useState('');

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

  const filteredCourses = courses.filter(c =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.teacher_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── SIDEBAR / HEADER BAR ─── */}
      <header className="sticky top-0 z-40 glass-strong border-b border-emerald-100/50 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/20">
              <GraduationCap className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-clash text-lg font-bold text-slate-900">Student Dashboard</h1>
              <p className="text-xs text-slate-500">Welcome, {user.name || user.email}</p>
            </div>
          </div>
          <Button onClick={logout} variant="outline" className="flex items-center gap-2 rounded-xl border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Decorative top gradient */}
      <div className="h-1 bg-gradient-to-r from-emerald-400 via-teal-500 to-emerald-600" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
        {/* ─── STATS ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 animate-fade-in-up">
          {[
            { label: 'Available Courses', value: courses.length, icon: BookOpen, color: 'stat-card-emerald', iconBg: 'bg-emerald-100 text-emerald-600' },
            { label: 'My Applications', value: applications.length, icon: ClipboardList, color: 'stat-card-blue', iconBg: 'bg-blue-100 text-blue-600' },
            { label: 'Enrolled', value: enrollments.length, icon: BookMarked, color: 'stat-card-violet', iconBg: 'bg-violet-100 text-violet-600' },
            { label: 'My Notes', value: notes.length, icon: FileText, color: 'stat-card-amber', iconBg: 'bg-amber-100 text-amber-600' },
          ].map(s => (
            <div key={s.label} className={`stat-card ${s.color} card-hover bg-white rounded-2xl border border-slate-100 p-5 shadow-sm`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.iconBg}`}>
                  <s.icon className="h-5 w-5" />
                </div>
              </div>
              <p className="text-2xl font-bold text-slate-900 font-clash">{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ─── AVAILABLE COURSES ─── */}
        <section className="card-hover bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-fade-in-up delay-100">
          <SectionHeader icon={BookOpen} title="Available Courses" subtitle="Browse and apply for courses" accent="bg-emerald-100 text-emerald-700" />
          {/* Search */}
          <div className="relative mb-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search courses or teachers…"
              className="input-enhanced w-full pl-10 pr-4 py-2.5 rounded-xl text-sm focus:ring-emerald-500 focus:border-emerald-500"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((c) => (
              <div key={c.course_id} className="card-hover card-glow-emerald group relative overflow-hidden rounded-xl border border-slate-100 p-5 bg-gradient-to-br from-white to-emerald-50/30">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-100/40 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{c.title}</h3>
                  <Sparkles className="h-4 w-4 text-emerald-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-xs font-medium text-emerald-600 mb-2">by {c.teacher_name}</p>
                <p className="text-sm text-slate-600 line-clamp-2">{c.description}</p>
                <Button size="sm" onClick={() => handleApply(c.course_id)} className="mt-4 w-full bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm shadow-emerald-500/10 transition-all">
                  Apply to Enroll
                </Button>
              </div>
            ))}
            {filteredCourses.length === 0 && (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-12 text-slate-400">
                <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No courses found</p>
              </div>
            )}
          </div>
        </section>

        {/* ─── APPLICATIONS ─── */}
        <section className="card-hover bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-fade-in-up delay-200">
          <SectionHeader icon={ClipboardList} title="My Applications" subtitle="Track your enrollment requests" accent="bg-blue-100 text-blue-700" />
          {applications.length > 0 ? (
            <div className="space-y-3">
              {applications.map((a) => (
                <div key={a.application_id} className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50/50 p-4 table-row-hover">
                  <div>
                    <p className="font-medium text-slate-900">{a.course_title}</p>
                    <p className="text-xs text-slate-500">Teacher: {a.teacher_name}</p>
                  </div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 text-slate-400">
              <ClipboardList className="h-10 w-10 mx-auto mb-3 opacity-40" />
              <p className="font-medium">No applications yet</p>
              <p className="text-xs mt-1">Apply to courses above to get started</p>
            </div>
          )}
        </section>

        {/* ─── NOTES ─── */}
        <section className="card-hover bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-fade-in-up delay-300">
          <SectionHeader icon={FolderOpen} title="Upload Notes" subtitle="Upload PDF notes for enrolled courses" accent="bg-amber-100 text-amber-700" />
          <form onSubmit={handleUploadNote} className="flex flex-col sm:flex-row gap-3 mb-6">
            <select
              className="input-enhanced flex-1 px-4 py-2.5 rounded-xl text-sm focus:ring-emerald-500 focus:border-emerald-500"
              value={enrollmentId}
              onChange={(e) => setEnrollmentId(e.target.value)}
              required
            >
              <option value="">Select enrollment</option>
              {enrollments.map((e) => <option key={e.enrollment_id} value={e.enrollment_id}>{e.course_title} - {e.teacher_name}</option>)}
            </select>
            <div className="flex items-center gap-2">
              <input type="file" accept="application/pdf" onChange={(e) => setNoteFile(e.target.files?.[0] || null)} required className="text-xs text-slate-500 file:mr-2 file:rounded-lg file:border-0 file:bg-emerald-50 file:px-3 file:py-2 file:text-xs file:font-medium file:text-emerald-700 hover:file:bg-emerald-100" />
              <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg shadow-sm flex items-center gap-2">
                <Upload className="h-4 w-4" />
                Upload
              </Button>
            </div>
          </form>
          {notes.length > 0 && (
            <div className="space-y-2">
              {notes.map((n) => (
                <a key={n.note_id} href={`http://localhost:5000/${n.file_path}`} className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3 text-sm text-slate-700 hover:border-emerald-200 hover:bg-emerald-50/50 transition-all group" target="_blank" rel="noreferrer">
                  <FileText className="h-5 w-5 text-emerald-500 group-hover:scale-110 transition-transform" />
                  <span className="flex-1">{n.course_title} — <span className="text-slate-500">{n.file_name}</span></span>
                </a>
              ))}
            </div>
          )}
        </section>

        {/* ─── COMPLAINT ─── */}
        <section className="card-hover bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-fade-in-up delay-400">
          <SectionHeader icon={AlertTriangle} title="File a Complaint" subtitle="Report issues with an enrolled course" accent="bg-red-100 text-red-600" />
          <form onSubmit={handleComplaint} className="space-y-4">
            <select
              className="input-enhanced w-full px-4 py-2.5 rounded-xl text-sm focus:ring-emerald-500 focus:border-emerald-500"
              value={complaintCourseId}
              onChange={(e) => setComplaintCourseId(e.target.value)}
              required
            >
              <option value="">Select enrolled course</option>
              {enrollments.map((e) => <option key={e.enrollment_id} value={e.course_id}>{e.course_title}</option>)}
            </select>
            <textarea
              className="input-enhanced w-full px-4 py-3 rounded-xl text-sm focus:ring-emerald-500 focus:border-emerald-500"
              rows={3}
              placeholder="Describe your complaint…"
              value={complaintText}
              onChange={(e) => setComplaintText(e.target.value)}
              required
            />
            <Button type="submit" className="bg-red-600 hover:bg-red-700 text-white rounded-lg shadow-sm flex items-center gap-2">
              <Send className="h-4 w-4" />
              Submit Complaint
            </Button>
          </form>
        </section>
      </div>
    </div>
  );
}
