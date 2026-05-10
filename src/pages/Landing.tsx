import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Star, ShieldCheck, ArrowRight, Sparkles, Users, CheckCircle2, ChevronDown } from 'lucide-react';
import { Button } from '../components/ui/button';

/* ── floating SVG shapes used in the hero background ── */
function FloatingShapes() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {/* Large gradient orbs */}
      <div className="bg-orb animate-blob" style={{ width: 500, height: 500, top: '-10%', left: '-5%', background: 'rgba(37,99,235,0.12)' }} />
      <div className="bg-orb animate-blob delay-300" style={{ width: 400, height: 400, top: '20%', right: '-8%', background: 'rgba(124,58,237,0.10)' }} />
      <div className="bg-orb animate-blob delay-700" style={{ width: 350, height: 350, bottom: '-5%', left: '30%', background: 'rgba(16,185,129,0.08)' }} />

      {/* Small decorative dots / circles */}
      <svg className="animate-float absolute top-[12%] left-[8%] opacity-20" width="64" height="64"><circle cx="32" cy="32" r="32" fill="#2563eb" /></svg>
      <svg className="animate-float-slow absolute top-[60%] right-[12%] opacity-15" width="40" height="40"><circle cx="20" cy="20" r="20" fill="#7c3aed" /></svg>
      <svg className="animate-float-reverse absolute bottom-[20%] left-[15%] opacity-10" width="28" height="28"><rect width="28" height="28" rx="6" fill="#10b981" /></svg>

      {/* Grid pattern */}
      <svg className="absolute inset-0 h-full w-full opacity-[0.025]">
        <defs>
          <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#hero-grid)" />
      </svg>
    </div>
  );
}

/* ── animated counter ── */
function Counter({ end, suffix = '' }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(end / (duration / 16));
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(start);
    }, 16);
    return () => clearInterval(timer);
  }, [end]);
  return <span>{count}{suffix}</span>;
}

/* ── feature card ── */
function FeatureCard({ icon: Icon, title, text, accent, delay }: any) {
  return (
    <div className={`card-hover card-glow-blue group relative rounded-2xl border border-slate-200/60 bg-white p-7 shadow-sm animate-fade-in-up ${delay}`}>
      <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-xl ${accent} transition-transform duration-300 group-hover:scale-110`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="font-clash text-lg font-semibold text-slate-900">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-600">{text}</p>
    </div>
  );
}

export function Landing() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* ─── HEADER ─── */}
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'glass-strong shadow-lg shadow-slate-200/40' : 'bg-transparent'}`}>
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5 font-clash font-semibold text-xl text-slate-900 group">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg gradient-blue text-white shadow-md shadow-blue-500/20 transition-transform duration-300 group-hover:scale-110">
              <BookOpen className="h-5 w-5" />
            </span>
            Study Buddy
          </Link>
          <nav className="hidden items-center gap-7 text-sm font-medium text-slate-500 md:flex">
            {[{ href: '#overview', label: 'Overview' }, { href: '#features', label: 'Features' }, { href: '#roles', label: 'Roles' }, { href: '#testimonials', label: 'Testimonials' }].map(n => (
              <a key={n.href} href={n.href} className="relative py-1 transition-colors hover:text-blue-600 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-600 after:transition-all hover:after:w-full">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2.5">
            <Button asChild variant="outline" size="sm" className="rounded-lg border-slate-300 hover:border-blue-300 hover:text-blue-600 transition-all">
              <Link to="/signup">Sign up</Link>
            </Button>
            <Button asChild size="sm" className="rounded-lg gradient-blue text-white shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-blue-500/30 transition-all">
              <Link to="/signin">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* ─── HERO ─── */}
        <section id="overview" className="relative overflow-hidden bg-white">
          <FloatingShapes />
          <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="animate-fade-in-up mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700">
                <Sparkles className="h-4 w-4" />
                Student–Teacher Course Connection
              </div>
              <h1 className="animate-fade-in-up delay-100 font-clash text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Learn smarter with{' '}
                <span className="text-gradient-blue">Study Buddy</span>
              </h1>
              <p className="animate-fade-in-up delay-200 mt-6 text-lg leading-relaxed text-slate-600 sm:text-xl">
                Browse courses, request enrollment, and keep your learning organised.
                Teachers manage offerings; administrators keep everything running smoothly.
              </p>
              <div className="animate-fade-in-up delay-300 mt-10 flex flex-wrap items-center justify-center gap-4">
                <Button asChild className="h-12 rounded-xl gradient-blue px-8 text-white shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30 transition-all text-base">
                  <Link to="/signin" className="flex items-center gap-2">
                    Get started <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild variant="outline" className="h-12 rounded-xl border-slate-300 px-8 hover:border-blue-300 hover:text-blue-600 transition-all text-base">
                  <Link to="/signup">Create an account</Link>
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up delay-500 mx-auto mt-20 grid max-w-2xl grid-cols-3 gap-8">
              {[
                { value: 50, suffix: '+', label: 'Active courses' },
                { value: 200, suffix: '+', label: 'Students enrolled' },
                { value: 98, suffix: '%', label: 'Satisfaction rate' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="font-clash text-3xl font-bold text-slate-900 sm:text-4xl">
                    <Counter end={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-1 text-sm text-slate-500">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Scroll indicator */}
            <div className="mt-16 flex justify-center animate-fade-in delay-1000">
              <a href="#features" className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-500 transition-colors">
                <span className="text-xs font-medium">Scroll</span>
                <ChevronDown className="h-4 w-4 animate-bounce" />
              </a>
            </div>
          </div>
          <div className="section-divider" />
        </section>

        {/* ─── FEATURES ─── */}
        <section id="features" className="relative py-20 sm:py-28 gradient-mesh-blue">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
                Why Study Buddy
              </span>
              <h2 className="mt-5 font-clash text-3xl font-bold text-slate-900 sm:text-4xl">
                Everything you need to <span className="text-gradient-blue">succeed</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-600">
                A modern platform that connects students to quality teachers with transparency and simplicity.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <FeatureCard icon={BookOpen} title="Teacher-led courses" text="Clear descriptions and transparent enrollment for every course." accent="bg-blue-100 text-blue-700" delay="delay-100" />
              <FeatureCard icon={Users} title="Role-based workflows" text="Students, teachers, and admins each see data relevant to their role." accent="bg-emerald-100 text-emerald-700" delay="delay-200" />
              <FeatureCard icon={ShieldCheck} title="Verified onboarding" text="Teachers go through CV, profile, and admin approval before teaching." accent="bg-violet-100 text-violet-700" delay="delay-300" />
              <FeatureCard icon={Star} title="Quality & trust" text="Complaint tracking and accountable resolution by administrators." accent="bg-amber-100 text-amber-700" delay="delay-400" />
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── ROLES ─── */}
        <section id="roles" className="py-20 sm:py-28">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-clash text-3xl font-bold text-slate-900 sm:text-4xl">
                Built for <span className="text-gradient-violet">every role</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-600">
                Sign in with the role that matches you. Each dashboard is purpose-built.
              </p>
            </div>

            <div className="mt-14 grid gap-8 md:grid-cols-3">
              {[
                {
                  role: 'Student',
                  description: 'Browse courses, apply for enrollment, upload notes, and file complaints when needed.',
                  icon: GraduationCap,
                  gradient: 'from-emerald-500 to-teal-600',
                  bgAccent: 'bg-emerald-50',
                  borderAccent: 'border-emerald-200/60',
                  iconBg: 'bg-emerald-100 text-emerald-700',
                  glowClass: 'card-glow-emerald',
                  svgColor: '#10b981',
                },
                {
                  role: 'Teacher',
                  description: 'Create courses, review student enrollment requests, and manage your classroom.',
                  icon: BookOpen,
                  gradient: 'from-violet-500 to-purple-600',
                  bgAccent: 'bg-violet-50',
                  borderAccent: 'border-violet-200/60',
                  iconBg: 'bg-violet-100 text-violet-700',
                  glowClass: 'card-glow-violet',
                  svgColor: '#7c3aed',
                },
                {
                  role: 'Admin',
                  description: 'Approve teachers, resolve complaints, and oversee the entire platform.',
                  icon: ShieldCheck,
                  gradient: 'from-slate-600 to-slate-800',
                  bgAccent: 'bg-slate-50',
                  borderAccent: 'border-slate-200/60',
                  iconBg: 'bg-slate-200 text-slate-700',
                  glowClass: 'card-glow-slate',
                  svgColor: '#475569',
                },
              ].map((r, i) => {
                const Icon = r.icon;
                return (
                  <div key={r.role} className={`card-hover ${r.glowClass} group relative overflow-hidden rounded-2xl border ${r.borderAccent} ${r.bgAccent} p-8 animate-fade-in-up`} style={{ animationDelay: `${i * 150}ms` }}>
                    {/* subtle corner glow */}
                    <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40" style={{ background: r.svgColor }} />
                    <div className={`mb-5 flex h-14 w-14 items-center justify-center rounded-xl ${r.iconBg} transition-transform duration-300 group-hover:scale-110`}>
                      <Icon className="h-7 w-7" />
                    </div>
                    <h3 className="font-clash text-xl font-bold text-slate-900">{r.role}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-600">{r.description}</p>
                    <div className={`mt-6 h-1 w-16 rounded-full bg-gradient-to-r ${r.gradient} transition-all duration-500 group-hover:w-full`} />
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <div className="section-divider" />

        {/* ─── TESTIMONIALS ─── */}
        <section id="testimonials" className="py-20 sm:py-28 gradient-mesh-blue">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <div className="text-center">
              <h2 className="font-clash text-3xl font-bold text-slate-900 sm:text-4xl">
                Loved by <span className="text-gradient-blue">everyone</span>
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-slate-600">
                Real feedback from real users of the platform.
              </p>
            </div>

            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                { name: 'Sarah A.', role: 'Student', quote: 'I found the right teacher and got enrolled without any confusion. The process was seamless!', accent: 'border-emerald-200' },
                { name: 'Prof. Khan', role: 'Teacher', quote: 'The platform keeps my classroom organized and request handling simple. Love it!', accent: 'border-violet-200' },
                { name: 'Admin Office', role: 'Administrator', quote: 'Oversight is easy — teacher approvals and complaint tracking are all in one place.', accent: 'border-slate-200' },
              ].map((t, i) => (
                <div key={t.name} className={`card-hover relative rounded-2xl border ${t.accent} bg-white p-7 shadow-sm animate-fade-in-up`} style={{ animationDelay: `${i * 150}ms` }}>
                  <svg className="mb-4 h-8 w-8 text-blue-200" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983z" />
                  </svg>
                  <p className="text-slate-600 leading-relaxed italic">"{t.quote}"</p>
                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full gradient-blue text-white text-sm font-bold shadow-sm">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{t.name}</p>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ─── CTA ─── */}
        <section className="relative overflow-hidden bg-slate-900 py-20 sm:py-24">
          <div className="pointer-events-none absolute inset-0">
            <div className="bg-orb animate-blob" style={{ width: 300, height: 300, top: '10%', left: '5%', background: 'rgba(37,99,235,0.15)' }} />
            <div className="bg-orb animate-blob delay-500" style={{ width: 250, height: 250, bottom: '10%', right: '10%', background: 'rgba(124,58,237,0.12)' }} />
          </div>
          <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="font-clash text-3xl font-bold text-white sm:text-4xl">
              Ready to start learning?
            </h2>
            <p className="mt-4 text-lg text-slate-400">
              Join Study Buddy today and connect with quality instructors in seconds.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <Button asChild className="h-12 rounded-xl bg-white px-8 text-slate-900 shadow-lg hover:bg-slate-100 transition-all text-base font-semibold">
                <Link to="/signup" className="flex items-center gap-2">
                  Create account <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-12 rounded-xl border-slate-600 px-8 text-slate-300 hover:border-slate-400 hover:text-white transition-all text-base">
                <Link to="/signin">Sign in</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* ─── FOOTER ─── */}
      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:px-6">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <div className="flex h-6 w-6 items-center justify-center rounded gradient-blue text-white">
              <BookOpen className="h-3.5 w-3.5" />
            </div>
            Study Buddy · Database Lab project
          </div>
          <div className="flex items-center gap-4">
            <Link to="/signup" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Sign up</Link>
            <span className="text-slate-300">|</span>
            <Link to="/signin" className="text-sm font-medium text-blue-600 hover:text-blue-500 transition-colors">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
