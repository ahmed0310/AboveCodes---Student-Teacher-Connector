import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/api';
import { Button } from '../../components/ui/button';
import { BookOpen, GraduationCap, User, Mail, Lock, Phone, Github, Linkedin, Clock, FileText, Camera, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [experienceYears, setExperienceYears] = useState('');
  const [bio, setBio] = useState('');
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const isStudent = role === 'student';
  const accentColor = isStudent ? 'emerald' : 'violet';

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('role', role);
      if (profilePhoto) formData.append('profile_photo', profilePhoto);

      if (role === 'student') {
        formData.append('age', age);
      } else {
        formData.append('phone', phone);
        formData.append('github_url', githubUrl);
        formData.append('linkedin_url', linkedinUrl);
        formData.append('experience_years', experienceYears);
        formData.append('bio', bio);
        if (cvFile) formData.append('cv', cvFile);
      }

      await api.post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSuccess(
        role === 'teacher'
          ? 'Registration successful! Your teacher account is pending admin approval.'
          : 'Registration successful! You can login now.'
      );
      const loginPath = `/login?role=${role}`;
      setTimeout(() => navigate(loginPath), 1500);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = `input-enhanced w-full pl-10 pr-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 ${
    isStudent ? 'focus:ring-emerald-500 focus:border-emerald-500' : 'focus:ring-violet-500 focus:border-violet-500'
  }`;

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center bg-slate-50 px-4 py-12">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="bg-orb animate-blob" style={{ width: 400, height: 400, top: '-8%', right: '-8%', background: isStudent ? 'rgba(16,185,129,0.1)' : 'rgba(124,58,237,0.1)' }} />
        <div className="bg-orb animate-blob delay-500" style={{ width: 350, height: 350, bottom: '-8%', left: '-8%', background: isStudent ? 'rgba(16,185,129,0.07)' : 'rgba(124,58,237,0.07)' }} />
        <svg className="absolute inset-0 h-full w-full opacity-[0.02]">
          <defs>
            <pattern id="reg-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#reg-grid)" />
        </svg>
      </div>

      <div className="relative w-full max-w-lg">
        {/* Back */}
        <Link to="/signin" className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors group">
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to sign in
        </Link>

        <div className="glass-strong rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-white/60 animate-scale-in">
          {/* Header */}
          <div className="text-center flex flex-col items-center">
            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${isStudent ? 'from-emerald-500 to-teal-600' : 'from-violet-500 to-purple-600'} flex items-center justify-center mb-5 shadow-lg transition-all duration-500`}
              style={{ boxShadow: `0 10px 30px ${isStudent ? 'rgba(16,185,129,0.2)' : 'rgba(124,58,237,0.2)'}` }}>
              {isStudent ? <GraduationCap className="w-7 h-7 text-white" /> : <BookOpen className="w-7 h-7 text-white" />}
            </div>
            <h2 className="text-3xl font-bold text-slate-900 font-clash">Create Account</h2>
            <p className="mt-2 text-sm text-slate-500">Students and teachers only. Admin accounts are created by your instructor.</p>
          </div>

          <form className="mt-8 space-y-5" onSubmit={handleRegister}>
            {error && (
              <div className="animate-fade-in rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 text-center">{error}</div>
            )}
            {success && (
              <div className="animate-fade-in rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-sm text-emerald-700 text-center flex items-center justify-center gap-2">
                <CheckCircle2 className="h-4 w-4" />
                {success}
              </div>
            )}

            <div className="space-y-4">
              {/* Role toggle */}
              <div className="flex rounded-xl border border-slate-200 bg-slate-100/60 p-1">
                {(['student', 'teacher'] as const).map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`flex-1 flex items-center justify-center gap-2 rounded-lg py-2.5 text-sm font-semibold transition-all duration-300 ${
                      role === r
                        ? r === 'student'
                          ? 'bg-white text-emerald-700 shadow-sm'
                          : 'bg-white text-violet-700 shadow-sm'
                        : 'text-slate-500 hover:text-slate-700'
                    }`}
                  >
                    {r === 'student' ? <GraduationCap className="h-4 w-4" /> : <BookOpen className="h-4 w-4" />}
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>

              {/* Common fields */}
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="text" required className={inputClass} placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="email" required className={inputClass} placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input type="password" required className={inputClass} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>

              {/* Profile photo */}
              <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 p-3 hover:border-slate-300 transition-colors">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <Camera className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-600">Profile Photo</p>
                  <input type="file" accept="image/*" onChange={(e) => setProfilePhoto(e.target.files?.[0] || null)} className="mt-1 block w-full text-xs text-slate-500 file:mr-2 file:rounded-lg file:border-0 file:bg-blue-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-blue-700 hover:file:bg-blue-100" />
                </div>
              </div>

              {/* Student fields */}
              {role === 'student' && (
                <div className="animate-fade-in relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input type="number" required min={5} max={100} className={inputClass} placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                </div>
              )}

              {/* Teacher fields */}
              {role === 'teacher' && (
                <div className="animate-fade-in space-y-4">
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="text" required className={inputClass} placeholder="Phone number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  </div>
                  <div className="relative">
                    <Github className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="url" required className={inputClass} placeholder="GitHub profile URL" value={githubUrl} onChange={(e) => setGithubUrl(e.target.value)} />
                  </div>
                  <div className="relative">
                    <Linkedin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="url" required className={inputClass} placeholder="LinkedIn profile URL" value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} />
                  </div>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <input type="number" required min={0} className={inputClass} placeholder="Experience (years)" value={experienceYears} onChange={(e) => setExperienceYears(e.target.value)} />
                  </div>
                  <textarea
                    rows={3}
                    className={`input-enhanced w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-400 ${
                      isStudent ? 'focus:ring-emerald-500 focus:border-emerald-500' : 'focus:ring-violet-500 focus:border-violet-500'
                    }`}
                    placeholder="Short bio — tell students about yourself"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                  />
                  <div className="flex items-center gap-3 rounded-xl border-2 border-dashed border-slate-200 p-3 hover:border-slate-300 transition-colors">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-100 text-violet-600">
                      <FileText className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-600">CV / Resume (PDF)</p>
                      <input type="file" required accept="application/pdf" onChange={(e) => setCvFile(e.target.files?.[0] || null)} className="mt-1 block w-full text-xs text-slate-500 file:mr-2 file:rounded-lg file:border-0 file:bg-violet-50 file:px-3 file:py-1 file:text-xs file:font-medium file:text-violet-700 hover:file:bg-violet-100" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <Button
              type="submit"
              disabled={loading}
              className={`w-full h-12 text-white rounded-xl shadow-lg transition-all text-base font-semibold ${
                isStudent
                  ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/20'
                  : 'bg-violet-600 hover:bg-violet-700 shadow-violet-500/20'
              } ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" /></svg>
                  Creating account…
                </span>
              ) : (
                `Register as ${role}`
              )}
            </Button>

            <p className="text-center text-sm text-slate-500">
              Already have an account?{' '}
              <Link to="/signin" className="font-semibold text-blue-600 hover:text-blue-500 transition-colors">
                Sign in
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
