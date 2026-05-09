import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Button } from '../../components/ui/button';

export function TeacherDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [courses, setCourses] = useState([]);
  const [requests, setRequests] = useState([]);
  const [newCourse, setNewCourse] = useState({ title: '', description: '', category_id: '1' });
  const [profile, setProfile] = useState<any>(null);

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

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
          <Button onClick={handleLogout} variant="outline">Logout</Button>
        </div>
        {profile && (
          <section className="rounded-xl border bg-white p-5 text-sm">
            <p className="font-semibold">{profile.full_name}</p>
            <p>{profile.email}</p>
            <p>Phone: {profile.phone}</p>
            <p>Experience: {profile.experience_years} years</p>
            <p className="capitalize">Status: {profile.approval_status}</p>
          </section>
        )}
        <section className="rounded-xl border bg-white p-5">
          <h2 className="mb-3 text-xl font-semibold">Create Course</h2>
          <form onSubmit={handleCreateCourse} className="grid gap-3 md:grid-cols-2">
            <input required type="text" value={newCourse.title} onChange={e => setNewCourse({...newCourse, title: e.target.value})} className="rounded border px-3 py-2" placeholder="Title" />
            <input required type="text" value={newCourse.category_id} onChange={e => setNewCourse({...newCourse, category_id: e.target.value})} className="rounded border px-3 py-2" placeholder="Category ID" />
            <textarea required value={newCourse.description} onChange={e => setNewCourse({...newCourse, description: e.target.value})} className="rounded border px-3 py-2 md:col-span-2" rows={3} placeholder="Description"></textarea>
            <Button type="submit" className="md:col-span-2">Save Course</Button>
          </form>
        </section>
        <section className="rounded-xl border bg-white p-5">
          <h2 className="mb-3 text-xl font-semibold">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-2">
          {courses.map((course: any) => (
            <div key={course.course_id} className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h3>
              <p className="text-gray-600">{course.description}</p>
            </div>
          ))}
          </div>
        </section>
        <section className="rounded-xl border bg-white p-5">
        <h2 className="text-2xl font-bold font-clash text-gray-900 mb-6">Student Enrollment Requests</h2>
        <div className="overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-4 font-medium text-gray-500">Student Name</th>
                <th className="px-6 py-4 font-medium text-gray-500">Course</th>
                <th className="px-6 py-4 font-medium text-gray-500">Message</th>
                <th className="px-6 py-4 font-medium text-gray-500">Status</th>
                <th className="px-6 py-4 font-medium text-gray-500 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((req: any) => (
                <tr key={req.application_id}>
                  <td className="px-6 py-4 font-medium text-gray-900">{req.student_name}</td>
                  <td className="px-6 py-4 text-gray-600">{req.course_title}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm max-w-xs truncate">{req.message || '-'}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize
                      ${req.status === 'approved' ? 'bg-green-100 text-green-800' : 
                        req.status === 'rejected' ? 'bg-red-100 text-red-800' : 
                        'bg-yellow-100 text-yellow-800'}`}>
                      {req.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    {req.status === 'pending' && (
                      <>
                        <Button size="sm" onClick={() => handleRequestStatus(req.application_id, 'approved')} className="bg-green-500 hover:bg-green-600 text-white">Approve</Button>
                        <Button size="sm" onClick={() => handleRequestStatus(req.application_id, 'rejected')} variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">Reject</Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
              {requests.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No enrollment requests yet.</td>
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
