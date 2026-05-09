import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/button';

const roles = [
  {
    role: 'student',
    title: 'Sign in as a student',
    description: 'Browse courses, apply for enrollment, save notes, and file complaints.',
    icon: GraduationCap,
    accent: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    iconBg: 'bg-emerald-100 text-emerald-700',
  },
  {
    role: 'teacher',
    title: 'Sign in as a teacher',
    description: 'Create courses, review enrollment requests, and accept or reject applicants.',
    icon: BookOpen,
    accent: 'border-violet-200 bg-violet-50 text-violet-800',
    iconBg: 'bg-violet-100 text-violet-700',
  },
  {
    role: 'admin',
    title: 'Sign in as an admin',
    description: 'Approve teachers, review complaints, and resolve issues on behalf of the platform.',
    icon: ShieldCheck,
    accent: 'border-slate-200 bg-slate-50 text-slate-800',
    iconBg: 'bg-slate-200 text-slate-800',
  },
] as const;

export function SignInRole() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-blue-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Study Buddy
        </Link>

        <div className="text-center">
          <h1 className="font-clash text-3xl font-bold text-slate-900">Sign in</h1>
          <p className="mt-2 text-slate-600">Choose your role, then continue to login.</p>
        </div>

        <div className="mt-10 space-y-4">
          {roles.map(({ role, title, description, icon: Icon, accent, iconBg }) => (
            <div
              key={role}
              className={`flex flex-col gap-4 rounded-xl border p-6 sm:flex-row sm:items-center sm:justify-between ${accent}`}
            >
              <div className="flex gap-4">
                <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg}`}>
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="font-clash text-lg font-semibold">{title}</h2>
                  <p className="mt-1 text-sm opacity-90 leading-relaxed">{description}</p>
                </div>
              </div>
              <Button asChild className="shrink-0 rounded-lg bg-blue-600 hover:bg-blue-700 sm:min-w-[140px]">
                <Link to={`/login?role=${encodeURIComponent(role)}`}>Continue</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-slate-600">
          New here?{' '}
          <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-500">
            Register as a student or teacher
          </Link>
        </p>
      </div>
    </div>
  );
}
