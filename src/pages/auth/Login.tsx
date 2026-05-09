import React, { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/api';
import { Button } from '../../components/ui/button';
import { BookOpen, ArrowLeft } from 'lucide-react';

const VALID_ROLES = ['student', 'teacher', 'admin'] as const;
type ExpectedRole = (typeof VALID_ROLES)[number];

function isExpectedRole(value: string | null): value is ExpectedRole {
  return value !== null && (VALID_ROLES as readonly string[]).includes(value);
}

export function Login() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const expectedRole = useMemo(() => {
    const raw = searchParams.get('role');
    if (!raw) return null;
    const trimmed = raw.trim();
    return isExpectedRole(trimmed) ? trimmed : null;
  }, [searchParams]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!expectedRole) {
    return <Navigate to="/signin" replace />;
  }

  const roleLabel = expectedRole === 'admin' ? 'administrator' : expectedRole;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      if (String(user.role).toLowerCase() !== expectedRole) {
        setError(
          `This account is not registered as ${expectedRole}. Pick the correct sign-in option or use another account.`,
        );
        return;
      }

      localStorage.setItem('study_buddy_token', token);
      localStorage.setItem('study_buddy_user', JSON.stringify(user));

      if (user.role === 'student') navigate('/student');
      else if (user.role === 'teacher') navigate('/teacher');
      else if (user.role === 'admin') navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4 py-12">
      <div className="mb-8 w-full max-w-md">
        <Link
          to="/signin"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Choose another role
        </Link>
      </div>
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg border border-slate-100">
        <div className="text-center flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
            <BookOpen className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-slate-900 font-clash">Sign in</h2>
          <p className="mt-2 text-sm text-slate-600">
            Signing in as a <span className="font-semibold text-slate-800">{roleLabel}</span>
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Your dashboard loads the data that matches this role after a successful login.
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          {error && <div className="text-red-600 text-sm text-center">{error}</div>}
          <div className="space-y-4">
            <input
              type="email"
              required
              autoComplete="email"
              className="appearance-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              required
              autoComplete="current-password"
              className="appearance-none relative block w-full px-3 py-2 border border-slate-300 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
            Sign in
          </Button>
          <div className="text-center mt-4">
            <p className="text-sm text-slate-600">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
