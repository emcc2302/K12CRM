import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, Send, CheckCircle2, AlertCircle, ChevronDown, Loader2 } from 'lucide-react';
import { submitInquiry } from '../services/api';

const USER_TYPES = ['Parent', 'Student', 'School'];
const CATEGORIES = ['Scholarship', 'Concert', 'Admission', 'General Query'];

export default function InquiryForm({ onSubmitted, initialCategory }) {
  const [formData, setFormData] = useState({
    user_type: 'Parent',
    category: initialCategory || 'Scholarship',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  useEffect(() => {
    if (initialCategory && CATEGORIES.includes(initialCategory)) {
      setFormData((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMessage) setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }

    try {
      setLoading(true);
      const res = await submitInquiry(formData);
      setSuccessMessage(res.message || 'Inquiry submitted successfully! Our team will contact you soon.');
      
      // Reset form
      setFormData({
        user_type: 'Parent',
        category: 'Scholarship',
        name: '',
        email: '',
        phone: '',
        message: ''
      });

      if (onSubmitted) {
        onSubmitted(res.inquiry);
      }
    } catch (err) {
      setErrorMessage(err.message || 'Something went wrong while submitting. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="scroll-mt-8">
      <div id="inquiry-form" className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 pt-4">
      
      {/* Container Card */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xl shadow-slate-200/50 p-6 sm:p-10 lg:p-12 transition-all">
        
        {/* Card Header */}
        <div className="mb-8 text-left">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Submit Your Inquiry
          </h2>
          <p className="mt-1.5 text-sm sm:text-base text-slate-500 font-normal">
            Fill out the form below and our team will get back to you soon.
          </p>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3.5 text-emerald-800 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Inquiry Received!</p>
              <p className="text-xs text-emerald-700 mt-0.5">{successMessage}</p>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 flex items-start gap-3.5 text-rose-800 animate-fadeIn">
            <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold">Submission Error</p>
              <p className="text-xs text-rose-700 mt-0.5">{errorMessage}</p>
            </div>
          </div>
        )}

        {/* The Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Row 1: User Type & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* User Type */}
            <div>
              <label htmlFor="user_type" className="block text-sm font-semibold text-slate-700 mb-2">
                User Type <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="user_type"
                  name="user_type"
                  value={formData.user_type}
                  onChange={handleChange}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all cursor-pointer"
                  required
                >
                  {USER_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category" className="block text-sm font-semibold text-slate-700 mb-2">
                Category <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 font-medium focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all cursor-pointer"
                  required
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>

          </div>

          {/* Row 2: Name & Email */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            
            {/* Full Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
                Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                Email <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                  required
                />
              </div>
            </div>

          </div>

          {/* Row 3: Phone Number */}
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">
              Phone Number <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Phone className="w-4 h-4" />
              </div>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all"
                required
              />
            </div>
          </div>

          {/* Row 4: Message / Query */}
          <div>
            <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">
              Message / Query <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              placeholder="Write your message or query here..."
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all resize-y"
              required
            />
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-bold text-white bg-brand-700 hover:bg-brand-800 focus:ring-4 focus:ring-brand-500/30 shadow-lg shadow-brand-700/25 transition-all transform active:scale-[0.99] disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
    </section>
  );
}

