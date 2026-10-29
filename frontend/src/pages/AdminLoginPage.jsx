import React, { useState } from 'react';
import { 
  GraduationCap, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  CheckCircle2, 
  SlidersHorizontal, 
  Search, 
  Building2,
  AlertCircle,
  Loader2,
  ChevronLeft
} from 'lucide-react';
import { loginAdmin } from '../services/api';

export default function AdminLoginPage({ onLoginSuccess, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleFillDemo = () => {
    setEmail('admin@example.com');
    setPassword('admin123');
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!email.trim() || !password) {
      setErrorMessage('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      const data = await loginAdmin({ email, password });
      if (onLoginSuccess) {
        onLoginSuccess(data.admin);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Invalid email or password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-slate-50 font-sans">
      
      {/* Left Column: Navy Indigo Branding Hero (as shown in reference image) */}
      <div className="lg:w-1/2 bg-gradient-to-br from-[#0c1024] via-[#141a38] to-[#1e1b4b] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden">
        
        {/* Subtle Watermark Graduation Cap graphic in background */}
        <div className="absolute right-[-10%] top-[20%] text-white/[0.04] pointer-events-none -rotate-12 select-none">
          <GraduationCap className="w-[500px] h-[500px]" />
        </div>

        {/* Ambient Glows */}
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-600/20 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Logo & Public Link */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/30">
              <GraduationCap className="w-5 h-5" />
            </div>
            <span className="text-2xl font-black tracking-tight text-white">
              EduCRM
            </span>
          </div>

          <button
            onClick={() => onNavigate('public')}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Back to Public Site
          </button>
        </div>

        {/* Center: Headline & Feature List */}
        <div className="relative z-10 py-12 lg:py-0 max-w-lg">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            Welcome Back, <br />
            Admin
          </h1>
          <p className="mt-4 text-base text-slate-300 font-normal leading-relaxed">
            Sign in to manage inquiries and keep track of all submissions.
          </p>

          {/* 3 Benefit Pills from reference image */}
          <div className="mt-8 space-y-4">
            
            {/* 1. View all inquiries */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-brand-500/30 border border-brand-400/40 flex items-center justify-center text-brand-300 shrink-0">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-slate-200">
                View all inquiries
              </span>
            </div>

            {/* 2. Manage inquiry status */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-brand-500/30 border border-brand-400/40 flex items-center justify-center text-brand-300 shrink-0">
                <Building2 className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-slate-200">
                Manage inquiry status
              </span>
            </div>

            {/* 3. Filter and search easily */}
            <div className="flex items-center gap-3.5 p-3 rounded-2xl bg-white/[0.06] backdrop-blur-sm border border-white/10 shadow-sm">
              <div className="w-8 h-8 rounded-xl bg-brand-500/30 border border-brand-400/40 flex items-center justify-center text-brand-300 shrink-0">
                <Search className="w-4 h-4" />
              </div>
              <span className="text-sm font-medium text-slate-200">
                Filter and search easily
              </span>
            </div>

          </div>
        </div>

        {/* Footer Note */}
        <div className="relative z-10 text-xs text-slate-400">
          EduCRM Portal &copy; {new Date().getFullYear()} &bull; Built with Custom JWT Authentication
        </div>

      </div>

      {/* Right Column: Clean White Login Form Card */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 sm:p-12 lg:p-16 bg-white">
        <div className="w-full max-w-md space-y-8">
          
          {/* Form Header */}
          <div className="text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Admin Login
            </h2>
            <p className="mt-2 text-sm text-slate-500">
              Enter your credentials to continue
            </p>
          </div>

          {/* Quick Demo Autofill Pill */}
          <div className="p-3.5 rounded-2xl bg-brand-50 border border-brand-200 flex items-center justify-between text-xs">
            <div className="text-slate-600">
              <span className="font-bold text-brand-900">Demo Login:</span> admin@example.com / admin123
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="px-2.5 py-1 bg-brand-700 text-white rounded-lg font-semibold hover:bg-brand-800 transition-colors shrink-0"
            >
              Autofill
            </button>
          </div>

          {/* Error Alert */}
          {errorMessage && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3 text-rose-800 text-sm animate-fadeIn">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Field */}
            <div>
              <label htmlFor="admin_email" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="admin_email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="admin_password" className="block text-sm font-semibold text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="admin_password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-10 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 focus:outline-none"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Sign In Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-bold text-white bg-brand-700 hover:bg-brand-800 focus:ring-4 focus:ring-brand-500/30 shadow-lg shadow-brand-700/25 transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Signing in...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
}

