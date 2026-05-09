import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Button } from '../../components/ui/button';
import { LogOut, FileText, ArrowLeft } from 'lucide-react';
import { ReportGenerator } from '../../components/ReportGenerator';

export function ReportsPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [activeReport, setActiveReport] = useState<string | null>(null);
  const [teacherReportData, setTeacherReportData] = useState<any>(null);
  const [complaintReportData, setComplaintReportData] = useState<any>(null);
  const [enrollmentReportData, setEnrollmentReportData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

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
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('study_buddy_token');
    localStorage.removeItem('study_buddy_user');
    navigate('/');
  };

  const loadTeacherReport = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/reports/teachers');
      setTeacherReportData({
        title: 'Teacher Approval Report',
        subtitle: `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        columns: response.data.columns,
        data: response.data.data,
        summary: response.data.summary
      });
      setActiveReport('teachers');
    } catch (error) {
      console.error('Error loading teacher report:', error);
      alert('Failed to load teacher report');
    } finally {
      setLoading(false);
    }
  };

  const loadComplaintReport = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/reports/complaints');
      setComplaintReportData({
        title: 'Complaints Resolution Report',
        subtitle: `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        columns: response.data.columns,
        data: response.data.data,
        summary: response.data.summary
      });
      setActiveReport('complaints');
    } catch (error) {
      console.error('Error loading complaint report:', error);
      alert('Failed to load complaint report');
    } finally {
      setLoading(false);
    }
  };

  const loadEnrollmentReport = async () => {
    setLoading(true);
    try {
      const response = await api.get('/admin/reports/enrollments');
      setEnrollmentReportData({
        title: 'Student Enrollment Report',
        subtitle: `Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`,
        columns: response.data.columns,
        data: response.data.data,
        summary: response.data.summary
      });
      setActiveReport('enrollments');
    } catch (error) {
      console.error('Error loading enrollment report:', error);
      alert('Failed to load enrollment report');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  const reportsList = [
    {
      id: 'teachers',
      title: 'Teacher Approval Report',
      description: 'Comprehensive list of all teacher applications with approval status, experience level, and dates.',
      icon: '👨‍🏫',
      action: loadTeacherReport,
      data: teacherReportData
    },
    {
      id: 'complaints',
      title: 'Complaints Resolution Report',
      description: 'Complete history of student complaints with resolution status and timeline.',
      icon: '⚠️',
      action: loadComplaintReport,
      data: complaintReportData
    },
    {
      id: 'enrollments',
      title: 'Student Enrollment Report',
      description: 'Detailed enrollment information including course assignments and approval status.',
      icon: '👥',
      action: loadEnrollmentReport,
      data: enrollmentReportData
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <FileText className="w-8 h-8 text-blue-600" />
              Reports Center
            </h1>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>

        {!activeReport ? (
          <div className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h2 className="text-xl font-semibold mb-4">Available Reports</h2>
              <p className="text-gray-600 mb-6">Select a report to view detailed data with export options for PDF, CSV, and printing.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportsList.map((report) => (
                <div
                  key={report.id}
                  className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow"
                >
                  <div className="text-3xl mb-3">{report.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{report.title}</h3>
                  <p className="text-gray-600 text-sm mb-6">{report.description}</p>
                  <Button
                    onClick={report.action}
                    disabled={loading}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    {loading ? 'Loading...' : 'Generate Report'}
                  </Button>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <Button
              variant="outline"
              onClick={() => setActiveReport(null)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Reports
            </Button>

            {activeReport === 'teachers' && teacherReportData && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{teacherReportData.title}</h2>
                  <p className="text-gray-600">{teacherReportData.subtitle}</p>
                </div>

                {teacherReportData.summary && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Summary Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(teacherReportData.summary).map(([key, value]) => (
                        <div key={key} className="bg-white p-3 rounded border border-blue-100">
                          <p className="text-sm text-gray-600">{key}</p>
                          <p className="text-2xl font-bold text-blue-600">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  <ReportGenerator reportData={teacherReportData} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        {teacherReportData.columns.map((col: string) => (
                          <th key={col} className="px-4 py-3 text-left font-semibold text-gray-900">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {teacherReportData.data.map((row: any, idx: number) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          {teacherReportData.columns.map((col: string) => (
                            <td key={col} className="px-4 py-3 text-gray-700">
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeReport === 'complaints' && complaintReportData && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{complaintReportData.title}</h2>
                  <p className="text-gray-600">{complaintReportData.subtitle}</p>
                </div>

                {complaintReportData.summary && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Summary Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {Object.entries(complaintReportData.summary).map(([key, value]) => (
                        <div key={key} className="bg-white p-3 rounded border border-red-100">
                          <p className="text-sm text-gray-600">{key}</p>
                          <p className="text-2xl font-bold text-red-600">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  <ReportGenerator reportData={complaintReportData} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        {complaintReportData.columns.map((col: string) => (
                          <th key={col} className="px-4 py-3 text-left font-semibold text-gray-900">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {complaintReportData.data.map((row: any, idx: number) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          {complaintReportData.columns.map((col: string) => (
                            <td key={col} className="px-4 py-3 text-gray-700">
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeReport === 'enrollments' && enrollmentReportData && (
              <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">{enrollmentReportData.title}</h2>
                  <p className="text-gray-600">{enrollmentReportData.subtitle}</p>
                </div>

                {enrollmentReportData.summary && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Summary Statistics</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {Object.entries(enrollmentReportData.summary).map(([key, value]) => (
                        <div key={key} className="bg-white p-3 rounded border border-green-100">
                          <p className="text-sm text-gray-600">{key}</p>
                          <p className="text-2xl font-bold text-green-600">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-3 mb-6 p-4 bg-gray-50 rounded-lg">
                  <ReportGenerator reportData={enrollmentReportData} />
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-100 border-b">
                        {enrollmentReportData.columns.map((col: string) => (
                          <th key={col} className="px-4 py-3 text-left font-semibold text-gray-900">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {enrollmentReportData.data.map((row: any, idx: number) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          {enrollmentReportData.columns.map((col: string) => (
                            <td key={col} className="px-4 py-3 text-gray-700">
                              {row[col]}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
