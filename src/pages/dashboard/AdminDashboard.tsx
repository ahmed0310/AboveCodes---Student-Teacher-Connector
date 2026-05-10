import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Button } from '../../components/ui/button';
import {
  ShieldCheck, LogOut, Users, BookOpen, Clock, AlertTriangle,
  CheckCircle2, XCircle, GraduationCap, TrendingUp, FileWarning, Gavel
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
    resolved: { bg: 'bg-emerald-100', text: 'text-emerald-700', icon: CheckCircle2 },
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

export function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>({});
  const [teachers, setTeachers] = useState([]);
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    const userData = localStorage.getItem('study_buddy_user');
    if (!userData) {
      navigate('/login');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'admin') {
      navigate('/login');
      return;
    }
    setUser(parsedUser);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [statsRes, teachersRes, complaintsRes] = await Promise.all([
        api.get('/admin/dashboard-stats'),
        api.get('/admin/teachers'),
        api.get('/admin/complaints')
      ]);
      setStats(statsRes.data);
      setTeachers(teachersRes.data);
      setComplaints(complaintsRes.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  const handleTeacherApproval = async (teacherId: number, decision: 'approved' | 'rejected') => {
    try {
      await api.put('/admin/approve-teacher', { teacher_id: teacherId, decision });
      fetchData();
    } catch (error) {
      alert('Error updating teacher status');
    }
  };

  const handleResolveComplaint = async (complaintId: number) => {
    try {
      await api.put('/admin/resolve-complaint', { complaint_id: complaintId });
      fetchData();
    } catch (error) {
      alert('Error resolving complaint');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('study_buddy_token');
    localStorage.removeItem('study_buddy_user');
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── HEADER ─── */}
      <header className="sticky top-0 z-40 glass-dark border-b border-slate-700/30 shadow-lg">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-slate-600 to-slate-800 text-white shadow-lg shadow-slate-800/30 ring-2 ring-slate-500/20">
              <ShieldCheck className="h-5 w-5" />
            </div>
            <div>
              <h1 className="font-clash text-lg font-bold text-white">Admin Panel</h1>
              <p className="text-xs text-slate-400">Platform Administration</p>
            </div>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2 rounded-xl border-slate-600 text-slate-300 hover:text-red-400 hover:border-red-400/50 transition-all">
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Accent bar */}
      <div className="h-1 bg-gradient-to-r from-slate-600 via-blue-600 to-slate-600" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
        {/* ─── STATS ─── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 animate-fade-in-up">
          {[
            { label: 'Total Students', value: stats.students || 0, icon: GraduationCap, color: 'stat-card-blue', iconBg: 'bg-blue-100 text-blue-600', valueCls: 'text-slate-900' },
            { label: 'Total Teachers', value: stats.teachers || 0, icon: Users, color: 'stat-card-violet', iconBg: 'bg-violet-100 text-violet-600', valueCls: 'text-slate-900' },
            { label: 'Pending Teachers', value: stats.pendingTeachers || 0, icon: Clock, color: 'stat-card-amber', iconBg: 'bg-amber-100 text-amber-600', valueCls: 'text-amber-600' },
            { label: 'Total Courses', value: stats.courses || 0, icon: BookOpen, color: 'stat-card-emerald', iconBg: 'bg-emerald-100 text-emerald-600', valueCls: 'text-slate-900' },
            { label: 'Open Complaints', value: stats.pendingComplaints || 0, icon: AlertTriangle, color: 'stat-card-red', iconBg: 'bg-red-100 text-red-600', valueCls: 'text-red-600' },
          ].map(s => (
            <div key={s.label} className={`stat-card ${s.color} card-hover bg-white rounded-2xl border border-slate-100 p-5 shadow-sm`}>
              <div className="flex items-center justify-between mb-3">
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${s.iconBg}`}>
                  <s.icon className="h-5 w-5" />
                </div>
                <TrendingUp className="h-4 w-4 text-slate-300" />
              </div>
              <p className={`text-2xl font-bold font-clash ${s.valueCls}`}>{s.value}</p>
              <p className="text-xs text-slate-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* ─── TEACHER APPROVALS ─── */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-fade-in-up delay-100">
          <SectionHeader icon={Users} title="Teacher Approvals" subtitle="Review and manage teacher registrations" accent="bg-slate-200 text-slate-700" />
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider rounded-tl-xl">Teacher</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">Email</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-right rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {teachers.map((t: any) => (
                  <tr key={t.teacher_id} className="table-row-hover">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-slate-600 to-slate-800 text-white text-xs font-bold shadow-sm">
                          {t.full_name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-900 text-sm">{t.full_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-500">{t.email}</td>
                    <td className="px-5 py-4"><StatusBadge status={t.approval_status} /></td>
                    <td className="px-5 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button size="sm" onClick={() => handleTeacherApproval(t.teacher_id, 'approved')} className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs shadow-sm">
                          <CheckCircle2 className="h-3.5 w-3.5 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" onClick={() => handleTeacherApproval(t.teacher_id, 'rejected')} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 rounded-lg text-xs">
                          <XCircle className="h-3.5 w-3.5 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {teachers.length === 0 && (
                  <tr>
                    <td colSpan={4} className="px-5 py-12 text-center text-slate-400">
                      <Users className="h-10 w-10 mx-auto mb-3 opacity-40" />
                      <p className="font-medium">No teacher registrations</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* ─── COMPLAINTS ─── */}
        <section className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm animate-fade-in-up delay-200">
          <SectionHeader icon={FileWarning} title="Student Complaints" subtitle="Manage and resolve platform issues" accent="bg-red-100 text-red-600" />
          <div className="overflow-x-auto rounded-xl border border-slate-100">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider rounded-tl-xl">Student</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">Against</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">Course</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Description</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider">Status</th>
                  <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-right rounded-tr-xl">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {complaints.map((c: any) => (
                  <tr key={c.complaint_id} className="table-row-hover">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 text-xs font-bold">
                          {c.student_name?.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-slate-900 text-sm">{c.student_name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-sm text-slate-600">{c.teacher_name || 'N/A'}</td>
                    <td className="px-5 py-4 text-sm text-slate-600">{c.course_title}</td>
                    <td className="px-5 py-4 text-sm text-slate-500 max-w-xs truncate hidden lg:table-cell">{c.description}</td>
                    <td className="px-5 py-4"><StatusBadge status={c.status} /></td>
                    <td className="px-5 py-4 text-right">
                      {c.status === 'pending' && (
                        <Button size="sm" onClick={() => handleResolveComplaint(c.complaint_id)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs shadow-sm flex items-center gap-1.5">
                          <Gavel className="h-3.5 w-3.5" />
                          Resolve
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
                {complaints.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-5 py-12 text-center text-slate-400">
                      <FileWarning className="h-10 w-10 mx-auto mb-3 opacity-40" />
                      <p className="font-medium">No complaints filed</p>
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
