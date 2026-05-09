import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, GraduationCap, Star } from 'lucide-react';
import { Button } from '../components/ui/button';

export function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4">
          <Link to="/" className="flex items-center gap-2 font-clash font-semibold text-xl text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white">
              <BookOpen className="h-5 w-5" />
            </span>
            Study Buddy
          </Link>
          <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 sm:flex">
            <a href="#overview" className="hover:text-blue-600">
              Overview
            </a>
            <a href="#offer" className="hover:text-blue-600">
              What we offer
            </a>
            <a href="#teachers" className="hover:text-blue-600">
              Teacher quality
            </a>
            <a href="#testimonials" className="hover:text-blue-600">Testimonials</a>
          </nav>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm" className="rounded-lg border-slate-300">
              <Link to="/signup">Sign up</Link>
            </Button>
            <Button asChild size="sm" className="rounded-lg bg-blue-600 hover:bg-blue-700">
              <Link to="/signin">Sign in</Link>
            </Button>
          </div>
        </div>
      </header>

      <main>
        <section id="overview" className="border-b border-slate-100 bg-white">
          <div className="mx-auto max-w-5xl px-4 py-16 sm:py-24">
            <p className="mb-4 text-sm font-medium uppercase tracking-wide text-blue-600">
              Student–teacher course connection
            </p>
            <h1 className="font-clash text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
              Study Buddy connects learners with instructors—simply and clearly.
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-600 leading-relaxed">
              Browse courses, request enrollment, and keep your learning organised. Teachers manage offerings
              and review requests; administrators keep accounts and complaints in check. Everyone sees the data
              that matters to their role after they sign in.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button asChild className="rounded-lg bg-blue-600 hover:bg-blue-700">
                <Link to="/signin">Sign in</Link>
              </Button>
              <Button asChild variant="outline" className="rounded-lg border-slate-300">
                <Link to="/signup">Create student or teacher account</Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="offer" className="border-b border-slate-100 py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                <GraduationCap className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-clash text-2xl font-bold text-slate-900 sm:text-3xl">
                  What we offer
                </h2>
                <ul className="mt-6 space-y-3 text-slate-600 leading-relaxed">
                  <li>
                    <span className="font-medium text-slate-800">Teacher-led courses</span> with clear descriptions and
                    transparent enrollment.
                  </li>
                  <li>
                    <span className="font-medium text-slate-800">Role-based workflows</span> for students, teachers, and
                    admin to keep the platform organized.
                  </li>
                  <li>
                    <span className="font-medium text-slate-800">Verified onboarding</span> for teachers through CV,
                    profile, and approval review.
                  </li>
                  <li>
                    <span className="font-medium text-slate-800">Quality and trust</span> through complaint tracking and
                    accountable resolution by admin.
                  </li>
                </ul>
                <p className="mt-6 text-sm text-slate-500">No public signup form is shown on landing - just clear sign in/sign up actions.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="teachers" className="py-16 sm:py-20">
          <div className="mx-auto max-w-5xl px-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h2 className="font-clash text-2xl font-bold text-slate-900 sm:text-3xl">
                  How good our teachers are
                </h2>
                <ul className="mt-6 space-y-3 text-slate-600 leading-relaxed">
                  <li>
                    <span className="font-medium text-slate-800">Professionally profiled</span> with phone, CV, GitHub,
                    LinkedIn, and experience captured at registration.
                  </li>
                  <li>
                    <span className="font-medium text-slate-800">Selected by approval</span> before they become visible to
                    students and can teach.
                  </li>
                  <li>
                    <span className="font-medium text-slate-800">Monitored by outcomes</span> via student applications and
                    complaint history handled by admin.
                  </li>
                </ul>
                <p className="mt-6 text-sm text-slate-500">
                  Sign in as a teacher once your account is approved to manage your courses and student requests.
                </p>
              </div>
            </div>

            <div id="testimonials" className="mt-16 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-clash text-lg font-semibold text-slate-900">Testimonials</h3>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    "I found the right teacher and got enrolled without confusion." - Student
                  </p>
                  <p className="mt-2 text-slate-600 leading-relaxed">
                    "The platform keeps my classroom organized and request handling simple." - Teacher
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-4 sm:flex-row">
          <p className="text-sm text-slate-500">
            Study Buddy · Database Lab project · Student–teacher connection platform
          </p>
          <div className="flex items-center gap-3">
            <Link to="/signup" className="text-sm font-medium text-slate-700 hover:text-slate-900">Sign up</Link>
            <Link to="/signin" className="text-sm font-medium text-blue-600 hover:text-blue-500">Sign in</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
