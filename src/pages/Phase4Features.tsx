import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Button } from '../components/ui/button';
import { LogOut, Activity, TrendingUp, BarChart3, AlertCircle } from 'lucide-react';

export function Phase4Features() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('analytics');
  
  // Analytics State
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [enrollmentStats, setEnrollmentStats] = useState<any>(null);
  const [teacherCompletionRates, setTeacherCompletionRates] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [enrollmentReport, setEnrollmentReport] = useState<any[]>([]);
  
  useEffect(() => {
    const storedUser = localStorage.getItem('study_buddy_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('study_buddy_token');
    localStorage.removeItem('study_buddy_user');
    navigate('/');
  };

  const fetchDashboardStats = async () => {
    setLoading(true);
    try {
      const response = await api.get('/phase4/dashboard-stats');
      setDashboardStats(response.data);
    } catch (error) {
      console.error('Error fetching dashboard stats:', error);
      alert('Failed to fetch dashboard statistics');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollmentStats = async () => {
    setLoading(true);
    try {
      const response = await api.get('/phase4/enrollment-stats');
      setEnrollmentStats(response.data);
    } catch (error) {
      console.error('Error fetching enrollment stats:', error);
      alert('Failed to fetch enrollment statistics');
    } finally {
      setLoading(false);
    }
  };

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const response = await api.get('/phase4/audit-logs');
      setAuditLogs(response.data);
    } catch (error) {
      console.error('Error fetching audit logs:', error);
      alert('Failed to fetch audit logs');
    } finally {
      setLoading(false);
    }
  };

  const fetchEnrollmentReport = async () => {
    setLoading(true);
    try {
      const response = await api.get('/phase4/enrollment-report');
      setEnrollmentReport(response.data);
    } catch (error) {
      console.error('Error fetching enrollment report:', error);
      alert('Failed to fetch enrollment report');
    } finally {
      setLoading(false);
    }
  };

  const createSystemSnapshot = async () => {
    setLoading(true);
    try {
      const response = await api.post('/phase4/system-statistics-snapshot', {});
      alert(response.data.message);
      await fetchAuditLogs();
    } catch (error) {
      console.error('Error creating snapshot:', error);
      alert('Failed to create system snapshot');
    } finally {
      setLoading(false);
    }
  };

  const generateComplianceReport = async () => {
    setLoading(true);
    try {
      const response = await api.get('/phase4/compliance-report');
      alert(response.data.message);
    } catch (error) {
      console.error('Error generating compliance report:', error);
      alert('Failed to generate compliance report');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Phase 4: Advanced Features</h1>
            <p className="text-gray-600 mt-2">PL/SQL Procedures, Functions, Triggers & Analytics</p>
          </div>
          <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'analytics'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Activity className="w-4 h-4 inline mr-2" /> Analytics
          </button>
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'reports'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" /> Reports
          </button>
          <button
            onClick={() => setActiveTab('logs')}
            className={`px-6 py-3 font-medium ${
              activeTab === 'logs'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <AlertCircle className="w-4 h-4 inline mr-2" /> Audit Logs
          </button>
        </div>

        {/* Content */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            {/* Dashboard Statistics */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">System Statistics</h2>
                <Button onClick={fetchDashboardStats} disabled={loading}>
                  {loading ? 'Loading...' : 'Refresh Stats'}
                </Button>
              </div>
              {dashboardStats ? (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {Object.entries(dashboardStats).map(([key, value]) => (
                    <div key={key} className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                      <p className="text-gray-600 text-sm capitalize">{key.replace(/_/g, ' ')}</p>
                      <p className="text-2xl font-bold text-blue-600">{value}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-600">Click "Refresh Stats" to load dashboard statistics</p>
              )}
            </div>

            {/* System Snapshot */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">System Operations</h2>
              <div className="flex gap-3">
                <Button 
                  onClick={createSystemSnapshot} 
                  disabled={loading}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  Create Statistics Snapshot
                </Button>
                <Button 
                  onClick={generateComplianceReport} 
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Generate Compliance Report
                </Button>
              </div>
              <p className="text-gray-600 text-sm mt-3">
                These operations trigger Anonymous PL/SQL blocks that create system snapshots and generate compliance reports.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-6">
            {/* Enrollment Statistics */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Enrollment Statistics</h2>
                <Button onClick={fetchEnrollmentStats} disabled={loading}>
                  {loading ? 'Loading...' : 'Load Report'}
                </Button>
              </div>
              {enrollmentStats && enrollmentStats.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Course Title</th>
                        <th className="px-4 py-2 text-left">Teacher</th>
                        <th className="px-4 py-2 text-center">Pending</th>
                        <th className="px-4 py-2 text-center">Approved</th>
                        <th className="px-4 py-2 text-center">Rejected</th>
                        <th className="px-4 py-2 text-center">Total Enrolled</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollmentStats.map((stat: any, idx: number) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{stat.course_title}</td>
                          <td className="px-4 py-2">{stat.teacher_name}</td>
                          <td className="px-4 py-2 text-center text-orange-600 font-semibold">
                            {stat.pending_applications}
                          </td>
                          <td className="px-4 py-2 text-center text-green-600 font-semibold">
                            {stat.approved_enrollments}
                          </td>
                          <td className="px-4 py-2 text-center text-red-600 font-semibold">
                            {stat.rejected_applications}
                          </td>
                          <td className="px-4 py-2 text-center font-semibold">
                            {stat.total_enrolled_students}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">Click "Load Report" to view enrollment statistics</p>
              )}
            </div>

            {/* Enrollment Details Report */}
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900">Detailed Enrollment Report</h2>
                <Button onClick={fetchEnrollmentReport} disabled={loading}>
                  {loading ? 'Loading...' : 'Load Report'}
                </Button>
              </div>
              {enrollmentReport && enrollmentReport.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-2 text-left">Student Name</th>
                        <th className="px-4 py-2 text-left">Course</th>
                        <th className="px-4 py-2 text-left">Teacher</th>
                        <th className="px-4 py-2 text-left">Enrolled Date</th>
                        <th className="px-4 py-2 text-center">Days Enrolled</th>
                        <th className="px-4 py-2 text-center">Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {enrollmentReport.map((report: any, idx: number) => (
                        <tr key={idx} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2">{report.student_name}</td>
                          <td className="px-4 py-2">{report.course_title}</td>
                          <td className="px-4 py-2">{report.teacher_name}</td>
                          <td className="px-4 py-2">
                            {new Date(report.enrolled_at).toLocaleDateString()}
                          </td>
                          <td className="px-4 py-2 text-center font-semibold">
                            {report.days_enrolled}
                          </td>
                          <td className="px-4 py-2 text-center text-blue-600 font-semibold">
                            {report.notes_count}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600">Click "Load Report" to view detailed enrollment information</p>
              )}
            </div>
          </div>
        )}

        {activeTab === 'logs' && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">Audit Logs</h2>
              <Button onClick={fetchAuditLogs} disabled={loading}>
                {loading ? 'Loading...' : 'Refresh Logs'}
              </Button>
            </div>
            {auditLogs && auditLogs.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-4 py-2 text-left">Entity Type</th>
                      <th className="px-4 py-2 text-left">Entity ID</th>
                      <th className="px-4 py-2 text-left">Action</th>
                      <th className="px-4 py-2 text-left">Description</th>
                      <th className="px-4 py-2 text-left">Timestamp</th>
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.slice(0, 50).map((log: any, idx: number) => (
                      <tr key={idx} className="border-b hover:bg-gray-50">
                        <td className="px-4 py-2">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-semibold">
                            {log.entity_type}
                          </span>
                        </td>
                        <td className="px-4 py-2">{log.entity_id}</td>
                        <td className="px-4 py-2 font-medium">{log.action}</td>
                        <td className="px-4 py-2 text-gray-600">{log.description}</td>
                        <td className="px-4 py-2 text-xs text-gray-500">
                          {new Date(log.timestamp).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-600">Click "Refresh Logs" to view audit logs</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
