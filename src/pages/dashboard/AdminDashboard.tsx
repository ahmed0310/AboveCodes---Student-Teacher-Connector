import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Button } from '../../components/ui/button';
import { LogOut, FileText, Zap } from 'lucide-react';
import { ReportGenerator } from '../../components/ReportGenerator';

export function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState<any>({});
  const [teachers, setTeachers] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [teacherReportData, setTeacherReportData] = useState<any>(null);
  const [complaintReportData, setComplaintReportData] = useState<any>(null);
  const [enrollmentReportData, setEnrollmentReportData] = useState<any>(null);

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

  const loadTeacherReport = async () => {
    try {
      const response = await api.get('/admin/reports/teachers');
      setTeacherReportData({
        title: 'Teacher Approval Report',
        subtitle: `Generated on ${new Date().toLocaleDateString()}`,
        columns: response.data.columns,
        data: response.data.data,
        summary: response.data.summary
      });
    } catch (error) {
      console.error('Error loading teacher report:', error);
      alert('Failed to load teacher report');
    }
  };

  const loadComplaintReport = async () => {
    try {
      const response = await api.get('/admin/reports/complaints');
      setComplaintReportData({
        title: 'Complaints Resolution Report',
        subtitle: `Generated on ${new Date().toLocaleDateString()}`,
        columns: response.data.columns,
        data: response.data.data,
        summary: response.data.summary
      });
    } catch (error) {
      console.error('Error loading complaint report:', error);
      alert('Failed to load complaint report');
    }
  };

  const loadEnrollmentReport = async () => {
    try {
      const response = await api.get('/admin/reports/enrollments');
      setEnrollmentReportData({
        title: 'Student Enrollment Report',
        subtitle: `Generated on ${new Date().toLocaleDateString()}`,
        columns: response.data.columns,
        data: response.data.data,
        summary: response.data.summary
      });
    } catch (error) {
      console.error('Error loading enrollment report:', error);
      alert('Failed to load enrollment report');
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <div className="flex items-center gap-3">
            <Button onClick={() => navigate('/phase4')} className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white">
              <Zap className="w-4 h-4" /> Phase 4
            </Button>
            <Button onClick={() => navigate('/reports')} variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Reports
            </Button>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Students</p>
            <p className="text-3xl font-bold text-gray-900">{stats.students || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Teachers</p>
            <p className="text-3xl font-bold text-gray-900">{stats.teachers || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Pending Teachers</p>
            <p className="text-3xl font-bold text-amber-600">{stats.pendingTeachers || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Total Courses</p>
            <p className="text-3xl font-bold text-gray-900">{stats.courses || 0}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-gray-500 mb-1">Pending Complaints</p>
            <p className="text-3xl font-bold text-red-600">{stats.pendingComplaints || 0}</p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-blue-600" />
              <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
            </div>
            <Button onClick={() => navigate('/reports')} className="bg-blue-600 hover:bg-blue-700 text-white">
              View Full Reports Center
            </Button>
          </div>
          <p className="text-gray-600 mb-6">Generate detailed reports for export in PDF or CSV format with summary statistics and timestamps.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Teacher Approval Report</h3>
              <p className="text-sm text-gray-600 mb-4">Summary of all teacher applications and approval status.</p>
              {teacherReportData ? (
                <ReportGenerator reportData={teacherReportData} />
              ) : (
                <Button onClick={loadTeacherReport} variant="outline" className="w-full">
                  Generate Report
                </Button>
              )}
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Complaints Report</h3>
              <p className="text-sm text-gray-600 mb-4">Summary of all student complaints and resolution status.</p>
              {complaintReportData ? (
                <ReportGenerator reportData={complaintReportData} />
              ) : (
                <Button onClick={loadComplaintReport} variant="outline" className="w-full">
                  Generate Report
                </Button>
              )}
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-3">Enrollment Report</h3>
              <p className="text-sm text-gray-600 mb-4">Summary of all student enrollments and course applications.</p>
              {enrollmentReportData ? (
                <ReportGenerator reportData={enrollmentReportData} />
              ) : (
                <Button onClick={loadEnrollmentReport} variant="outline" className="w-full">
                  Generate Report
                </Button>
              )}
            </div>
          </div>
        </div>

        <h2 id="teachers" className="text-2xl font-bold font-clash text-gray-900 mb-6 mt-8">Teacher Approvals</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 font-medium text-gray-500">Teacher Name</th>
                <th className="px-6 py-4 font-medium text-gray-500">Email</th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {teachers.map((t: any) => (
                <tr key={t.teacher_id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{t.full_name}</td>
                  <td className="px-6 py-4 text-gray-500">{t.email}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${t.approval_status === 'approved' ? 'bg-green-100 text-green-800' : t.approval_status === 'rejected' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {t.approval_status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Button size="sm" onClick={() => handleTeacherApproval(t.teacher_id, 'approved')} className="bg-green-500 hover:bg-green-600 text-white">Approve</Button>
                    <Button size="sm" onClick={() => handleTeacherApproval(t.teacher_id, 'rejected')} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 id="complaints" className="text-2xl font-bold font-clash text-gray-900 mb-6">Student Complaints</h2>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden mb-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 font-medium text-gray-500">Student</th>
                <th className="px-6 py-4 font-medium text-gray-500">Against Teacher</th>
                <th className="px-6 py-4 font-medium text-gray-500">Course</th>
                <th className="px-6 py-4 font-medium text-gray-500">Description</th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {complaints.map((c: any) => (
                <tr key={c.complaint_id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{c.student_name}</td>
                  <td className="px-6 py-4 text-gray-600">{c.teacher_name || 'N/A'}</td>
                  <td className="px-6 py-4 text-gray-600">{c.course_title}</td>
                  <td className="px-6 py-4 text-gray-500 max-w-sm">{c.description}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${c.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {c.status === 'pending' && (
                      <Button size="sm" onClick={() => handleResolveComplaint(c.complaint_id)} className="bg-blue-600 hover:bg-blue-700 text-white">Mark Resolved</Button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}
