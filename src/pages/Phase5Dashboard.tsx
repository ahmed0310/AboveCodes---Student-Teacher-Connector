import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Button } from '../components/ui/button';
import { LogOut, RefreshCw, BarChart3, Users, BookOpen, Layers, Clock } from 'lucide-react';
import {
  BarChart, Bar, PieChart, Pie, LineChart, Line,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, Cell
} from 'recharts';

interface KPI {
  kpi: string;
  value: number;
  icon: string;
}

interface ChartData {
  title: string;
  data: any[];
  type: string;
}

interface SummaryData {
  title: string;
  columns: string[];
  data: any[];
}

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

export function Phase5Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [kpis, setKpis] = useState<KPI[]>([]);
  const [chartData1, setChartData1] = useState<any>(null);
  const [chartData2, setChartData2] = useState<any>(null);
  const [chartData3, setChartData3] = useState<any>(null);
  const [summaryData1, setSummaryData1] = useState<SummaryData | null>(null);
  const [summaryData2, setSummaryData2] = useState<SummaryData | null>(null);
  const [summaryData3, setSummaryData3] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('study_buddy_user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      navigate('/login');
    }
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load KPIs
      const kpi1 = await api.get('/dashboard/kpi/total-students');
      const kpi2 = await api.get('/dashboard/kpi/total-teachers');
      const kpi3 = await api.get('/dashboard/kpi/active-courses');
      const kpi4 = await api.get('/dashboard/kpi/pending-approvals');

      setKpis([
        { ...kpi1.data, icon: 'Users' },
        { ...kpi2.data, icon: 'BookOpen' },
        { ...kpi3.data, icon: 'Layers' },
        { ...kpi4.data, icon: 'Clock' }
      ]);

      // Load Charts
      const chart1 = await api.get('/dashboard/chart/enrollment-status');
      setChartData1(chart1.data);

      const chart2 = await api.get('/dashboard/chart/course-enrollments');
      setChartData2(chart2.data);

      const chart3 = await api.get('/dashboard/chart/teacher-performance');
      setChartData3(chart3.data);

      // Load Summary Tables
      const summary1 = await api.get('/dashboard/summary/top-students');
      setSummaryData1(summary1.data);

      const summary2 = await api.get('/dashboard/summary/recent-activity');
      setSummaryData2(summary2.data);

      const summary3 = await api.get('/dashboard/summary/course-statistics');
      setSummaryData3(summary3.data);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      alert('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('study_buddy_token');
    localStorage.removeItem('study_buddy_user');
    navigate('/');
  };

  const getKPIIcon = (iconName: string) => {
    switch (iconName) {
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'Layers':
        return <Layers className="w-6 h-6" />;
      case 'Clock':
        return <Clock className="w-6 h-6" />;
      default:
        return <BarChart3 className="w-6 h-6" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Phase 5 - Database Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">Real-time Analytics & System Metrics</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              onClick={loadDashboardData}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </Button>
            <Button onClick={handleLogout} variant="outline" className="flex items-center gap-2">
              <LogOut className="w-4 h-4" /> Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Section 1: KPI Cards (4+ KPI cards with live data) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Performance Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {kpis.map((kpi, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500 hover:shadow-lg transition"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{kpi.kpi}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{kpi.value}</p>
                  </div>
                  <div className="text-blue-500 bg-blue-50 p-3 rounded-lg">
                    {getKPIIcon(kpi.icon)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Charts (2+ charts/graphs from DB queries) */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Analytics Charts</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Chart 1: Enrollment Status Distribution */}
            {chartData1 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{chartData1.title}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={chartData1.data}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {chartData1.data.map((entry: any, index: number) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}

            {/* Chart 2: Course Enrollments */}
            {chartData2 && (
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{chartData2.title}</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData2.data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="enrollments" fill="#3B82F6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>

          {/* Chart 3: Teacher Performance */}
          {chartData3 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{chartData3.title}</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData3.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="courses" fill="#10B981" name="Courses" />
                  <Bar dataKey="students" fill="#F59E0B" name="Total Students" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </section>

        {/* Section 3: Summary Tables (with aggregated data) */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Summary Tables</h2>
          <div className="space-y-8">
            {/* Table 1: Top Students */}
            {summaryData1 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">{summaryData1.title}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {summaryData1.columns.map((col) => (
                          <th key={col} className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {summaryData1.data.map((row: any) => (
                        <tr key={row.rank} className="hover:bg-gray-50">
                          <td className="px-6 py-3 text-sm text-gray-900">{row.rank}</td>
                          <td className="px-6 py-3 text-sm text-gray-900">{row.name}</td>
                          <td className="px-6 py-3 text-sm text-gray-900 font-medium">{row.enrollments}</td>
                          <td className="px-6 py-3 text-sm text-gray-900">{row.courses}</td>
                          <td className="px-6 py-3 text-sm text-gray-600">{row.lastEnrolled}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Table 2: Recent Activity */}
            {summaryData2 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">{summaryData2.title}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {summaryData2.columns.map((col) => (
                          <th key={col} className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {summaryData2.data.map((row: any) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                          <td className="px-6 py-3 text-sm">
                            <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                              {row.type}
                            </span>
                          </td>
                          <td className="px-6 py-3 text-sm text-gray-900">{row.user}</td>
                          <td className="px-6 py-3 text-sm text-gray-600">{row.details}</td>
                          <td className="px-6 py-3 text-sm text-gray-600">{row.time}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* Table 3: Course Statistics */}
            {summaryData3 && (
              <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">{summaryData3.title}</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        {summaryData3.columns.map((col) => (
                          <th key={col} className="px-6 py-3 text-left text-sm font-semibold text-gray-900">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {summaryData3.data.map((row: any) => (
                        <tr key={row.rank} className="hover:bg-gray-50">
                          <td className="px-6 py-3 text-sm text-gray-900 font-medium">{row.rank}</td>
                          <td className="px-6 py-3 text-sm text-gray-900">{row.course}</td>
                          <td className="px-6 py-3 text-sm text-gray-900">{row.instructor}</td>
                          <td className="px-6 py-3 text-sm text-gray-900 font-medium">{row.total}</td>
                          <td className="px-6 py-3 text-sm text-gray-900 font-medium text-green-600">{row.approved}</td>
                          <td className="px-6 py-3 text-sm text-gray-600">{row.created}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">Dashboard updates automatically with real-time data from the database</p>
        </div>
      </main>
    </div>
  );
}
