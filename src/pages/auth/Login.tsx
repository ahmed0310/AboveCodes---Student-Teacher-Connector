import React, { useMemo, useState } from 'react';
import { Link, Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import api from '../../api/api';
import { Button } from '../../components/ui/button';
import { BookOpen, ArrowLeft, GraduationCap, ShieldCheck, Lock, Mail } from 'lucide-react';

const VALID_ROLES = ['student', 'teacher', 'admin'] as const;
type ExpectedRole = (typeof VALID_ROLES)[number];

function isExpectedRole(value: string | null): value is ExpectedRole {
  return value !== null && (VALID_ROLES as readonly string[]).includes(value);
}

const ROLE_CONFIG = {
  student: {
    label: 'student',
    icon: GraduationCap,
    gradient: 'from-emerald-500 to-teal-600',
    iconBg: 'bg-emerald-100 text-emerald-700',
    accentColor: '#10b981',
    orbColor: 'rgba(16,185,129,0.12)',
    focusRing: 'focus:ring-emerald-500 focus:border-emerald-500',
    btnClass: 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20',
    tagClass: 'border-emerald-200 bg-emerald-50 text-emerald-700',
  },
  teacher: {
    label: 'teacher',
    icon: BookOpen,
    gradient: 'from-violet-500 to-purple-600',
    iconBg: 'bg-violet-100 text-violet-700',
    accentColor: '#7c3aed',
    orbColor: 'rgba(124,58,237,0.12)',
    focusRing: 'focus:ring-violet-500 focus:border-violet-500',
    btnClass: 'bg-violet-600 hover:bg-violet-700 shadow-violet-500/20',
    tagClass: 'border-violet-200 bg-violet-50 text-violet-700',
  },
  admin: {
    label: 'administrator',
    icon: ShieldCheck,
    gradient: 'from-slate-600 to-slate-800',
    iconBg: 'bg-slate-200 text-slate-700',
    accentColor: '#475569',
    orbColor: 'rgba(71,85,105,0.12)',
    focusRing: 'focus:ring-slate-500 focus:border-slate-500',
    btnClass: 'bg-slate-700 hover:bg-slate-800 shadow-slate-500/20',
    tagClass: 'border-slate-200 bg-slate-100 text-slate-700',
  },
} as const;

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
  const [loading, setLoading] = useState(false);

  if (!expectedRole) {
    return <Navigate to="/signin" replace />;
  }

  const cfg = ROLE_CONFIG[expectedRole];
  const RoleIcon = cfg.icon;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token, user } = response.data;

      if (String(user.role).toLowerCase() !== expectedRole) {
        setError(
          `This account is not registered as ${expectedRole}. Pick the correct sign-in option or use another account.`,
        );
        setLoading(false);
        return;
      }

      localStorage.setItem('study_buddy_token', token);
      localStorage.setItem('study_buddy_user', JSON.stringify(user));

      if (user.role === 'student') navigate('/student');
      else if (user.role === 'teacher') navigate('/teacher');
      else if (user.role === 'admin') navigate('/admin');
    } catch (err: any) {
      setError(err.response?.data?.error || 'Login failed');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-slate-50 px-4 py-12">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-orb animate-blob" style={{ width: 400, height: 400, top: '-10%', left: '-10%', background: cfg.orbColor }} />
        <div className="bg-orb animate-blob delay-500" style={{ width: 350, height: 350, bottom: '-10%', right: '-10%', background: cfg.orbColor }} />
        <svg className="absolute inset-0 h-full w-full opacity-[0.02]">
          <defs>
            <pattern id="login-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#login-grid)" />
        </svg>
      </div>

      {/* Back link */}
      <div className="relative mb-8 w-full max-w-md animate-fade-in">
        <Link
          to="/signin"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Choose another role
        </Link>
      </div>

      {/* Login card */}
      <div className="relative max-w-md w-full animate-scale-in">
        <div className="glass-strong rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-white/60">
          {/* Header */}
          <div className="text-center flex flex-col items-center">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cfg.gradient} flex items-center justify-center mb-5 shadow-lg`} style={{ boxShadow: `0 10px 30px ${cfg.orbColor}` }}>
              <RoleIcon className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 font-clash">Sign in</h2>
            <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${cfg.tagClass}`}>
              <RoleIcon className="h-3.5 w-3.5" />
              {cfg.label}
            </div>
            <p className="mt-3 text-sm text-slate-500 max-w-xs">
              Your personalized dashboard will load after a successful login.
            </p>
          </div>

          {/* Form */}
          <form className="mt-8 space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="animate-fade-in rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 text-center">
                {error}
              </div>
            )}
            <div className="space-y-4">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  className={`input-enhanced w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 ${cfg.focusRing}`}
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  className={`input-enhanced w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 ${cfg.focusRing}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            <Button
              type="submit"
              disabled={loading}
              className={`w-full h-12 text-white rounded-xl shadow-lg transition-all text-base font-semibold ${cfg.btnClass} ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                  Signing in…
                </span>
              ) : (
                'Sign in'
              )}
            </Button>
            <div className="text-center mt-4">
              <p className="text-sm text-slate-500">
                Don&apos;t have an account?{' '}
                <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                  Register
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
