import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, BookOpen, ShieldCheck, ArrowLeft, Sparkles } from 'lucide-react';
import { Button } from '../../components/ui/button';

const roles = [
  {
    role: 'student',
    title: 'Student',
    subtitle: 'Browse · Enroll · Learn',
    description: 'Browse courses, apply for enrollment, save notes, and file complaints.',
    icon: GraduationCap,
    gradient: 'from-emerald-500 to-teal-600',
    borderColor: 'border-emerald-200/60',
    bgColor: 'bg-emerald-50/50',
    iconBg: 'bg-emerald-100 text-emerald-700',
    hoverGlow: 'hover:shadow-emerald-500/10',
    orbColor: 'rgba(16,185,129,0.12)',
    accentBar: 'from-emerald-400 to-teal-500',
  },
  {
    role: 'teacher',
    title: 'Teacher',
    subtitle: 'Create · Manage · Teach',
    description: 'Create courses, review enrollment requests, and accept or reject applicants.',
    icon: BookOpen,
    gradient: 'from-violet-500 to-purple-600',
    borderColor: 'border-violet-200/60',
    bgColor: 'bg-violet-50/50',
    iconBg: 'bg-violet-100 text-violet-700',
    hoverGlow: 'hover:shadow-violet-500/10',
    orbColor: 'rgba(124,58,237,0.12)',
    accentBar: 'from-violet-400 to-purple-500',
  },
  {
    role: 'admin',
    title: 'Administrator',
    subtitle: 'Approve · Resolve · Oversee',
    description: 'Approve teachers, review complaints, and resolve issues on behalf of the platform.',
    icon: ShieldCheck,
    gradient: 'from-slate-600 to-slate-800',
    borderColor: 'border-slate-200/60',
    bgColor: 'bg-slate-50/50',
    iconBg: 'bg-slate-200 text-slate-700',
    hoverGlow: 'hover:shadow-slate-500/10',
    orbColor: 'rgba(71,85,105,0.12)',
    accentBar: 'from-slate-400 to-slate-600',
  },
] as const;

export function SignInRole() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-50">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-orb animate-blob" style={{ width: 400, height: 400, top: '-5%', right: '-5%', background: 'rgba(37,99,235,0.08)' }} />
        <div className="bg-orb animate-blob delay-500" style={{ width: 350, height: 350, bottom: '-5%', left: '-5%', background: 'rgba(124,58,237,0.06)' }} />
        <svg className="absolute inset-0 h-full w-full opacity-[0.02]">
          <defs>
            <pattern id="signin-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#signin-grid)" />
        </svg>
      </div>

      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Back link */}
        <Link
          to="/"
          className="mb-10 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors group"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Study Buddy
        </Link>

        {/* Header */}
        <div className="text-center animate-fade-in-up">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl gradient-blue text-white shadow-lg shadow-blue-500/20">
            <Sparkles className="h-7 w-7" />
          </div>
          <h1 className="font-clash text-4xl font-bold text-slate-900 sm:text-5xl">
            Welcome back
          </h1>
          <p className="mt-3 text-lg text-slate-500">Choose your role to continue</p>
        </div>

        {/* Role cards */}
        <div className="mt-12 grid gap-5 sm:grid-cols-3">
          {roles.map(({ role, title, subtitle, description, icon: Icon, gradient, borderColor, bgColor, iconBg, hoverGlow, orbColor, accentBar }, idx) => (
            <Link
              key={role}
              to={`/login?role=${encodeURIComponent(role)}`}
              className={`card-hover group relative overflow-hidden rounded-2xl border ${borderColor} ${bgColor} p-7 shadow-sm hover:shadow-xl ${hoverGlow} transition-all duration-500 animate-fade-in-up block`}
              style={{ animationDelay: `${idx * 120 + 200}ms` }}
            >
              {/* Corner orb */}
              <div
                className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-60"
                style={{ background: orbColor }}
              />

              {/* Icon */}
              <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${iconBg} transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
                <Icon className="h-7 w-7" />
              </div>

              {/* Content */}
              <h2 className="font-clash text-xl font-bold text-slate-900">{title}</h2>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">{subtitle}</p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{description}</p>

              {/* Accent bar */}
              <div className={`mt-6 h-1 w-12 rounded-full bg-gradient-to-r ${accentBar} transition-all duration-500 group-hover:w-full`} />

              {/* Arrow indicator */}
              <div className="absolute bottom-6 right-6 flex h-8 w-8 items-center justify-center rounded-lg bg-white/80 text-slate-400 opacity-0 shadow-sm transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 -translate-x-2">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          ))}
        </div>

        {/* Register link */}
        <p className="mt-12 text-center text-sm text-slate-500 animate-fade-in delay-700">
          New here?{' '}
          <Link to="/signup" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
            Register as a student or teacher
          </Link>
        </p>
      </div>
    </div>
  );
}
