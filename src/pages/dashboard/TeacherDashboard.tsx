import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Button } from '../../components/ui/button';
import {
  BookOpen, LogOut, Plus, Users, CheckCircle2, Clock, XCircle,
  User, Mail, Phone, Award, Briefcase, FileText, Sparkles
} from 'lucide-react';

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

export function TeacherDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', category_id: '1' });
  const [profile, setProfile] = useState<any>(null);
  const [showCreateForm, setShowCreateForm] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('study_buddy_user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'teacher') {
      navigate('/login');
      return;
    }
    setUser(parsedUser);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [coursesRes, requestsRes, profileRes] = await Promise.all([
        api.get('/teacher/courses'),
        api.get('/teacher/requests'),
        api.get('/teacher/profile')
      ]);
      setCourses(coursesRes.data);
      setRequests(requestsRes.data);
      setProfile(profileRes.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/teacher/course', newCourse);
      setNewCourse({ title: '', description: '', category_id: '1' });
      setShowCreateForm(false);
      fetchData();
    } catch (error: any) {
      alert(error.response?.data?.error || 'Error creating course');
    }
  };

  const handleRequestStatus = async (requestId: number, status: string) => {
    try {
      await api.put('/teacher/request/status', { application_id: requestId, status });
      fetchData();
    } catch (error: any) {
      alert('Error updating status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('study_buddy_token');
    localStorage.removeItem('study_buddy_user');
    navigate('/');
  };

  if (!user) return null;

  const pendingCount = requests.filter((r: any) => r.status === 'pending').length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-40 glass-strong border-b border-violet-100/50 shadow-sm">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg shadow-violet-500/20">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-clash text-lg font-bold text-slate-900">Teacher Dashboard</h1>
              <p className="text-xs text-slate-500">{profile?.full_name || user.email}</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 rounded-xl border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Accent bar */}
      <div className="h-1 bg-gradient-to-r from-violet-400 via-purple-500 to-violet-600" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
        {/* ─── PROFILE CARD ─── */}
        {profile && (
          <div className="card-hover card-glow-violet relative overflow-hidden bg-white rounded-2xl border border-violet-100/60 p-6 shadow-sm animate-fade-in-up">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-100/40 blur-3xl" />
            <div className="relative flex flex-col sm:flex-row sm:items-center gap-5">
              {/* Avatar */}
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 text-white text-2xl font-bold shadow-lg shadow-violet-500/20">
                {profile.full_name?.charAt(0).toUpperCase() || 'T'}
              </div>
              <div className="flex-1 space-y-1">
                <h2 className="font-clash text-xl font-bold text-slate-900">{profile.full_name}</h2>
                <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5"><Mail className="h-3.5 w-3.5" />{profile.email}</span>
                  <span className="flex items-center gap-1.5"><Phone className="h-3.5 w-3.5" />{profile.phone}</span>
                  <span className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" />{profile.experience_years} yrs</span>
                </div>
              </div>
              <StatusBadge status={profile.approval_status} />
            </div>
          </div>
        )}

        {/* ─── STATS ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 animate-fade-in-up delay-100">
          {[
            { label: 'My Courses', value: courses.length, icon: BookOpen, color: 'stat-card-violet', iconBg: 'bg-violet-100 text-violet-600' },
            { label: 'Total Requests', value: requests.length, icon: Users, color: 'stat-card-blue', iconBg: 'bg-blue-100 text-blue-600' },
            { label: 'Pending', value: pendingCount, icon: Clock, color: 'stat-card-amber', iconBg: 'bg-amber-100 text-amber-600' },
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

        {/* ─── CREATE COURSE ─── */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-fade-in-up delay-200">
          <div className="flex items-center justify-between mb-6">
            <SectionHeader icon={Plus} title="Create Course" subtitle="Add a new course to your catalog" accent="bg-violet-100 text-violet-700" />
            <Button
              variant="outline"
              onClick={() => setShowCreateForm(!showCreateForm)}
              className={`rounded-xl border-violet-200 text-violet-600 hover:bg-violet-50 transition-all ${showCreateForm ? 'bg-violet-50' : ''}`}
            >
              {showCreateForm ? 'Cancel' : 'New Course'}
            </Button>
          </div>
          {showCreateForm && (
            <form onSubmit={handleCreateCourse} className="animate-fade-in space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  required
                  type="text"
                  value={newCourse.title}
                  onChange={e => setNewCourse({...newCourse, title: e.target.value})}
                  className="input-enhanced px-4 py-3 rounded-xl text-sm focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Course Title"
                />
                <input
                  required
                  type="text"
                  value={newCourse.category_id}
                  onChange={e => setNewCourse({...newCourse, category_id: e.target.value})}
                  className="input-enhanced px-4 py-3 rounded-xl text-sm focus:ring-violet-500 focus:border-violet-500"
                  placeholder="Category ID"
                />
              </div>
              <textarea
                required
                value={newCourse.description}
                onChange={e => setNewCourse({...newCourse, description: e.target.value})}
                className="input-enhanced w-full px-4 py-3 rounded-xl text-sm focus:ring-violet-500 focus:border-violet-500"
                rows={3}
                placeholder="Course description — what students will learn"
              />
              <Button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl shadow-lg shadow-violet-500/20 flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Publish Course
              </Button>
            </form>
          )}
        </section>

        {/* ─── MY COURSES ─── */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-fade-in-up delay-300">
          <SectionHeader icon={BookOpen} title="My Courses" subtitle="Courses you've created" accent="bg-violet-100 text-violet-700" />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course: any) => (
              <div key={course.course_id} className="card-hover card-glow-violet group relative overflow-hidden rounded-xl border border-slate-100 p-5 bg-gradient-to-br from-white to-violet-50/30">
                <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-violet-100/40 blur-2xl opacity-0 transition-opacity group-hover:opacity-100" />
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-slate-900 group-hover:text-violet-700 transition-colors">{course.title}</h3>
                  <BookOpen className="h-4 w-4 text-violet-300 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{course.description}</p>
                <div className="mt-4 h-1 w-10 rounded-full bg-gradient-to-r from-violet-400 to-purple-500 transition-all duration-500 group-hover:w-full" />
              </div>
            ))}
            {courses.length === 0 && (
              <div className="sm:col-span-2 lg:col-span-3 text-center py-12 text-slate-400">
                <BookOpen className="h-10 w-10 mx-auto mb-3 opacity-40" />
                <p className="font-medium">No courses yet</p>
                <p className="text-xs mt-1">Create your first course above</p>
              </div>
            )}
          </div>
        </section>

        {/* ─── ENROLLMENT REQUESTS ─── */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-fade-in-up delay-400">
          <SectionHeader icon={Users} title="Student Enrollment Requests" subtitle="Review and manage student applications" accent="bg-blue-100 text-blue-700" />
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-100">
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Student</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Course</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 hidden sm:table-cell">Message</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500">Status</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-slate-500 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {requests.map((req: any) => (
                  <tr key={req.application_id} className="table-row-hover">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-xs font-bold">
                          {req.student_name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-900 text-sm">{req.student_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{req.course_title}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 max-w-xs truncate hidden sm:table-cell">{req.message || '—'}</td>
                    <td className="px-5 py-4"><StatusBadge status={req.status} /></td>
                    <td className="px-5 py-4 text-right">
                      {req.status === 'pending' && (
                        <div className="flex items-center justify-end gap-2">
                          <Button size="sm" onClick={() => handleRequestStatus(req.application_id, 'approved')} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs shadow-sm">
                            <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" onClick={() => handleRequestStatus(req.application_id, 'rejected')} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 rounded-lg text-xs">
                            <XCircle className="h-3.5 w-3.5 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
                {requests.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-5 py-12 text-center text-slate-400">
                      <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
                      <p className="font-medium">No enrollment requests yet</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
