import React, { useState, useEffect, useMemo } from 'react';
import { 
  GraduationCap, 
  LayoutDashboard, 
  Inbox, 
  BarChart3, 
  UserCircle, 
  LogOut, 
  Menu, 
  X, 
  Search, 
  RotateCcw, 
  FileText, 
  Clock, 
  CheckCircle2, 
  MoreVertical, 
  ChevronDown, 
  Eye, 
  Trash2, 
  ExternalLink,
  ChevronRight,
  Filter,
  Loader2,
  Calendar,
  Layers
} from 'lucide-react';
import { fetchInquiries, updateInquiryStatus, deleteInquiry, clearAuthSession, getStoredAdmin } from '../services/api';
import InquiryDetailModal from '../components/InquiryDetailModal';

const CATEGORY_OPTIONS = ['All Categories', 'Scholarship', 'Concert', 'Admission', 'General Query'];
const USER_TYPE_OPTIONS = ['All User Types', 'Parent', 'Student', 'School'];
const STATUS_OPTIONS = ['All Statuses', 'New', 'In Progress', 'Resolved'];

export default function AdminDashboardPage({ onLogout, onNavigate }) {
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard' | 'all' | 'analytics' | 'profile'
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminUser] = useState(() => getStoredAdmin() || { email: 'admin@example.com', name: 'Admin' });

  // Data states
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters & Search
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedUserType, setSelectedUserType] = useState('All User Types');
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [searchQuery, setSearchQuery] = useState('');

  // Selected Inquiry for Detail Modal
  const [selectedInquiry, setSelectedInquiry] = useState(null);

  // Action Menu Open ID
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Load inquiries
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchInquiries({
        category: selectedCategory,
        user_type: selectedUserType,
        status: selectedStatus,
        search: searchQuery
      });
      setInquiries(data.inquiries || []);
      if (data.stats) {
        setStats(data.stats);
      }
    } catch (err) {
      setError(err.message || 'Failed to load inquiries.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [selectedCategory, selectedUserType, selectedStatus]);

  // Debounced search trigger
  useEffect(() => {
    const timer = setTimeout(() => {
      loadData();
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const handleResetFilters = () => {
    setSelectedCategory('All Categories');
    setSelectedUserType('All User Types');
    setSelectedStatus('All Statuses');
    setSearchQuery('');
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateInquiryStatus(id, newStatus);
      // Update local state
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
      // Reload stats
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Are you sure you want to delete inquiry #${id}?`)) return;
    try {
      await deleteInquiry(id);
      setInquiries((prev) => prev.filter((inq) => inq.id !== id));
      loadData();
    } catch (err) {
      alert(err.message || 'Failed to delete inquiry');
    }
  };

  const handleInquiryUpdated = (updated) => {
    setInquiries((prev) =>
      prev.map((i) => (i.id === updated.id ? updated : i))
    );
    loadData();
  };

  const handleInquiryDeleted = (deletedId) => {
    setInquiries((prev) => prev.filter((i) => i.id !== deletedId));
    loadData();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="h-screen bg-slate-50 flex overflow-hidden text-slate-900 font-sans">
      
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar (Permanently Fixed in place - does not scroll with page content) */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 flex flex-col justify-between transition-transform duration-200 ease-in-out md:translate-x-0 shrink-0 h-full ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div>
          {/* Logo Area */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-700 to-brand-500 flex items-center justify-center text-white shadow-md shadow-brand-500/20">
                <GraduationCap className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900">
                EduCRM
              </span>
            </div>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="md:hidden text-slate-400 hover:text-slate-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1.5 text-left">
            <button
              onClick={() => { setActiveTab('dashboard'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-200/60'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 shrink-0 text-brand-600" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => { setActiveTab('all'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'all'
                  ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-200/60'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Inbox className="w-4 h-4 shrink-0" />
              <span>All Inquiries</span>
            </button>

            <button
              onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'analytics'
                  ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-200/60'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <BarChart3 className="w-4 h-4 shrink-0" />
              <span>Analytics</span>
            </button>

            <button
              onClick={() => { setActiveTab('profile'); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                activeTab === 'profile'
                  ? 'bg-brand-50 text-brand-700 shadow-sm border border-brand-200/60'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <UserCircle className="w-4 h-4 shrink-0" />
              <span>Profile</span>
            </button>
          </nav>
        </div>

        {/* Bottom Sidebar: Logout */}
        <div className="p-4 border-t border-slate-100">
          <button
            onClick={() => {
              clearAuthSession();
              if (onLogout) onLogout();
            }}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0 text-rose-500" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area - Scrollable with permanent fixed sidebar offset */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto md:ml-64">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white border-b border-slate-200 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 md:hidden"
            >
              <Menu className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('public')}
              className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors hidden sm:inline-flex items-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Public Website
            </button>
          </div>

          {/* User Profile Pill in Top Header */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-brand-700 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-brand-700/20">
              A
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-900">Admin</div>
              <div className="text-[11px] text-slate-500">{adminUser.email}</div>
            </div>
          </div>
        </header>

        {/* Main Body */}
        <main className="p-4 sm:p-8 space-y-6 max-w-7xl w-full mx-auto">
          
          {/* TAB 1: EXECUTIVE DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              
              {/* Header Title */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-left">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                    Dashboard Overview
                  </h1>
                  <p className="text-sm text-slate-500 mt-1">
                    Real-time performance metrics, KPI summary, and latest inquiries
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('all')}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-white bg-brand-700 hover:bg-brand-800 transition-colors shadow-sm self-start sm:self-auto"
                >
                  <Inbox className="w-4 h-4" />
                  <span>Open Inquiry Workspace</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* 4 Stat KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
                
                {/* 1. Total Inquiries */}
                <div 
                  onClick={() => { setActiveTab('all'); setSelectedStatus('All Statuses'); }}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:border-slate-300 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 group-hover:bg-slate-200 flex items-center justify-center text-slate-700 shrink-0 transition-colors">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Total Inquiries</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stats.total}</h3>
                  </div>
                </div>

                {/* 2. New */}
                <div 
                  onClick={() => { setActiveTab('all'); setSelectedStatus('New'); }}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:border-blue-300 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-100 border border-blue-200/60 flex items-center justify-center text-blue-600 shrink-0 transition-colors">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-blue-600">New</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stats.new}</h3>
                  </div>
                </div>

                {/* 3. In Progress */}
                <div 
                  onClick={() => { setActiveTab('all'); setSelectedStatus('In Progress'); }}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:border-amber-300 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-amber-100 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0 transition-colors">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-amber-600">In Progress</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stats.inProgress}</h3>
                  </div>
                </div>

                {/* 4. Resolved */}
                <div 
                  onClick={() => { setActiveTab('all'); setSelectedStatus('Resolved'); }}
                  className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4 hover:border-emerald-300 transition-all cursor-pointer group"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shrink-0 transition-colors">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-600">Resolved</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stats.resolved}</h3>
                  </div>
                </div>

              </div>

              {/* Action Alert Banner */}
              {stats.new > 0 && (
                <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      <Inbox className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-blue-900">
                        {stats.new} New Inquiries Waiting for Response
                      </h4>
                      <p className="text-xs text-blue-700">
                        Process pending parent, student, and school submissions to maintain fast response times.
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedStatus('New');
                      setActiveTab('all');
                    }}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-colors shrink-0 self-start sm:self-auto"
                  >
                    View New Inquiries
                  </button>
                </div>
              )}

              {/* Mid-Row: Category & User Type Quick Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                
                {/* Category Distribution Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">Inquiry Categories</h3>
                    <span className="text-xs text-slate-400 font-medium">{stats.total} Total</span>
                  </div>
                  {['Scholarship', 'Admission', 'Concert', 'General Query'].map((cat) => {
                    const count = inquiries.filter((i) => i.category === cat).length;
                    const percent = inquiries.length > 0 ? Math.round((count / inquiries.length) * 100) : 0;
                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>{cat}</span>
                          <span>{count} ({percent}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-brand-600 transition-all duration-500" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* User Type Distribution Card */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-900">User Types</h3>
                    <span className="text-xs text-slate-400 font-medium">{stats.total} Total</span>
                  </div>
                  {['Student', 'Parent', 'School'].map((type) => {
                    const count = inquiries.filter((i) => i.user_type === type).length;
                    const percent = inquiries.length > 0 ? Math.round((count / inquiries.length) * 100) : 0;
                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>{type}</span>
                          <span>{count} ({percent}%)</span>
                        </div>
                        <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-indigo-500 transition-all duration-500" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>

              {/* Recent Inquiries Preview Table (Top 5) */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden text-left">
                <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">Recent Submissions</h3>
                    <p className="text-xs text-slate-500">Latest 5 inquiries received across all channels</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('all')}
                    className="text-xs font-bold text-brand-700 hover:text-brand-800 flex items-center gap-1"
                  >
                    <span>View All</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-3 px-4">Applicant</th>
                        <th className="py-3 px-4">User Type</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                      {inquiries.slice(0, 5).map((inq) => (
                        <tr 
                          key={inq.id} 
                          className="hover:bg-slate-50/80 transition-colors cursor-pointer"
                          onClick={() => setSelectedInquiry(inq)}
                        >
                          <td className="py-3 px-4 font-bold text-slate-900">
                            <div>{inq.name}</div>
                            <div className="text-[11px] font-normal text-slate-400">{inq.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                              {inq.user_type}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-semibold text-brand-800">
                            {inq.category}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                              inq.status === 'New'
                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                : inq.status === 'In Progress'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${
                                inq.status === 'New'
                                  ? 'bg-blue-600'
                                  : inq.status === 'In Progress'
                                  ? 'bg-amber-600'
                                  : 'bg-emerald-600'
                              }`} />
                              {inq.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-slate-500 text-xs">
                            {formatDate(inq.created_at)}
                          </td>
                          <td className="py-3 px-4 text-center" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => setSelectedInquiry(inq)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold text-brand-700 hover:bg-brand-50"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* TAB 2: ALL INQUIRIES WORKSPACE (Matching Bottom-Right Reference) */}
          {activeTab === 'all' && (
            <>
              {/* Header Title */}
              <div className="text-left">
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Inquiries
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                  Manage and track all submitted inquiries
                </p>
              </div>

              {/* Filter & Search Bar Row (as shown in reference image) */}
              <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm flex flex-col lg:flex-row items-stretch lg:items-center gap-3">
                
                {/* Category Dropdown Filter */}
                <div className="relative min-w-[180px]">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer transition-colors"
                  >
                    {CATEGORY_OPTIONS.map((cat) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* User Type Dropdown Filter */}
                <div className="relative min-w-[160px]">
                  <select
                    value={selectedUserType}
                    onChange={(e) => setSelectedUserType(e.target.value)}
                    className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer transition-colors"
                  >
                    {USER_TYPE_OPTIONS.map((type) => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Status Dropdown Filter */}
                <div className="relative min-w-[150px]">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-brand-500 cursor-pointer transition-colors"
                  >
                    {STATUS_OPTIONS.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>

                {/* Search Bar */}
                <div className="relative flex-1">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Search className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name or phone..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                  />
                </div>

                {/* Reset Button */}
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors shrink-0"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>

              </div>

              {/* 4 Stat KPI Cards (from reference image) */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 text-left">
                
                {/* 1. Total Inquiries */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700 shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500">Total Inquiries</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stats.total}</h3>
                  </div>
                </div>

                {/* 2. New */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200/60 flex items-center justify-center text-blue-600 shrink-0">
                    <Inbox className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-blue-600">New</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stats.new}</h3>
                  </div>
                </div>

                {/* 3. In Progress */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-amber-600 shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-amber-600">In Progress</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stats.inProgress}</h3>
                  </div>
                </div>

                {/* 4. Resolved */}
                <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200/60 flex items-center justify-center text-emerald-600 shrink-0">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-600">Resolved</span>
                    <h3 className="text-2xl font-black text-slate-900 mt-0.5">{stats.resolved}</h3>
                  </div>
                </div>

              </div>

              {/* Inquiries Table Card */}
              <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    
                    {/* Table Headers */}
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/70 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                        <th className="py-4 px-4 w-12 text-center">#</th>
                        <th className="py-4 px-4">Name</th>
                        <th className="py-4 px-4">Email</th>
                        <th className="py-4 px-4">Phone</th>
                        <th className="py-4 px-4">User Type</th>
                        <th className="py-4 px-4">Category</th>
                        <th className="py-4 px-4">Status</th>
                        <th className="py-4 px-4">Date</th>
                        <th className="py-4 px-4 text-center">Action</th>
                      </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                      {loading ? (
                        <tr>
                          <td colSpan="9" className="py-12 text-center text-slate-500">
                            <Loader2 className="w-6 h-6 animate-spin mx-auto text-brand-600 mb-2" />
                            <span>Loading inquiries...</span>
                          </td>
                        </tr>
                      ) : inquiries.length === 0 ? (
                        <tr>
                          <td colSpan="9" className="py-12 text-center text-slate-500">
                            <Inbox className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                            <p className="font-semibold text-slate-700">No inquiries found</p>
                            <p className="text-xs text-slate-400 mt-1">Try resetting filters or submit a new inquiry.</p>
                          </td>
                        </tr>
                      ) : (
                        inquiries.map((inq, idx) => (
                          <tr 
                            key={inq.id} 
                            className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                            onClick={() => setSelectedInquiry(inq)}
                          >
                            {/* # Index */}
                            <td className="py-3.5 px-4 text-center font-semibold text-slate-400 text-xs">
                              {idx + 1}
                            </td>

                            {/* Name */}
                            <td className="py-3.5 px-4 font-bold text-slate-900 whitespace-nowrap">
                              {inq.name}
                            </td>

                            {/* Email */}
                            <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                              {inq.email}
                            </td>

                            {/* Phone */}
                            <td className="py-3.5 px-4 text-slate-600 whitespace-nowrap">
                              {inq.phone}
                            </td>

                            {/* User Type */}
                            <td className="py-3.5 px-4 text-slate-700 font-medium whitespace-nowrap">
                              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 text-xs font-semibold">
                                {inq.user_type}
                              </span>
                            </td>

                            {/* Category */}
                            <td className="py-3.5 px-4 font-semibold text-brand-800 whitespace-nowrap">
                              {inq.category}
                            </td>

                            {/* Status Badge */}
                            <td className="py-3.5 px-4 whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                              <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold ${
                                inq.status === 'New'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : inq.status === 'In Progress'
                                  ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                  : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                  inq.status === 'New'
                                    ? 'bg-blue-600'
                                    : inq.status === 'In Progress'
                                    ? 'bg-amber-600'
                                    : 'bg-emerald-600'
                                }`} />
                                {inq.status}
                              </span>
                            </td>

                            {/* Date */}
                            <td className="py-3.5 px-4 text-slate-500 whitespace-nowrap text-xs">
                              {formatDate(inq.created_at)}
                            </td>

                            {/* Action Menu */}
                            <td className="py-3.5 px-4 text-center relative" onClick={(e) => e.stopPropagation()}>
                              <div className="inline-block text-left">
                                <button
                                  type="button"
                                  onClick={() => setActiveMenuId(activeMenuId === inq.id ? null : inq.id)}
                                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 focus:outline-none"
                                >
                                  <MoreVertical className="w-4 h-4" />
                                </button>

                                {/* Dropdown menu */}
                                {activeMenuId === inq.id && (
                                  <>
                                    <div 
                                      className="fixed inset-0 z-30" 
                                      onClick={() => setActiveMenuId(null)}
                                    />
                                    <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white border border-slate-200 shadow-xl z-40 py-1 text-left animate-fadeIn">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setSelectedInquiry(inq);
                                          setActiveMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                                      >
                                        <Eye className="w-3.5 h-3.5 text-brand-600" />
                                        View Details
                                      </button>

                                      <div className="border-t border-slate-100 my-1" />
                                      <div className="px-4 py-1 text-[10px] font-bold text-slate-400 uppercase">
                                        Update Status:
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleStatusUpdate(inq.id, 'New');
                                          setActiveMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-2 px-4 py-1.5 text-xs text-blue-700 hover:bg-blue-50 font-medium"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                                        Set as New
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleStatusUpdate(inq.id, 'In Progress');
                                          setActiveMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-2 px-4 py-1.5 text-xs text-amber-700 hover:bg-amber-50 font-medium"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                        Set as In Progress
                                      </button>
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleStatusUpdate(inq.id, 'Resolved');
                                          setActiveMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-2 px-4 py-1.5 text-xs text-emerald-700 hover:bg-emerald-50 font-medium"
                                      >
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                        Set as Resolved
                                      </button>

                                      <div className="border-t border-slate-100 my-1" />
                                      <button
                                        type="button"
                                        onClick={() => {
                                          handleDelete(inq.id);
                                          setActiveMenuId(null);
                                        }}
                                        className="w-full flex items-center gap-2 px-4 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50"
                                      >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        Delete Inquiry
                                      </button>
                                    </div>
                                  </>
                                )}
                              </div>
                            </td>

                          </tr>
                        ))
                      )}
                    </tbody>

                  </table>
                </div>

                {/* Table Footer */}
                <div className="px-6 py-4 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Showing {inquiries.length} inquiries</span>
                  <span>Click any inquiry row to view complete message</span>
                </div>

              </div>

            </>
          )}

          {/* Analytics View */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 text-left">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">Inquiry Analytics</h1>
                <p className="text-sm text-slate-500 mt-1">Breakdown and performance metrics across inquiries</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Category Breakdown */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Inquiries by Category</h3>
                  {['Scholarship', 'Admission', 'Concert', 'General Query'].map((cat) => {
                    const count = inquiries.filter((i) => i.category === cat).length;
                    const percent = inquiries.length > 0 ? Math.round((count / inquiries.length) * 100) : 0;
                    return (
                      <div key={cat} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>{cat}</span>
                          <span>{count} ({percent}%)</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-brand-600 transition-all duration-500" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* User Type Breakdown */}
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm space-y-4">
                  <h3 className="text-base font-bold text-slate-900">Inquiries by User Type</h3>
                  {['Student', 'Parent', 'School'].map((type) => {
                    const count = inquiries.filter((i) => i.user_type === type).length;
                    const percent = inquiries.length > 0 ? Math.round((count / inquiries.length) * 100) : 0;
                    return (
                      <div key={type} className="space-y-1">
                        <div className="flex justify-between text-xs font-semibold text-slate-700">
                          <span>{type}</span>
                          <span>{count} ({percent}%)</span>
                        </div>
                        <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-indigo-500 transition-all duration-500" 
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            </div>
          )}

          {/* Profile View */}
          {activeTab === 'profile' && (
            <div className="max-w-xl mx-auto bg-white p-8 rounded-3xl border border-slate-200 shadow-sm text-left space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-brand-700 text-white font-black text-2xl flex items-center justify-center shadow-lg shadow-brand-700/20">
                  A
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">{adminUser.name || 'Admin User'}</h2>
                  <p className="text-sm text-slate-500">{adminUser.email}</p>
                  <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-xs font-bold border border-brand-200">
                    Administrator
                  </span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-4 text-xs text-slate-600">
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-500">Authentication Method:</span>
                  <span className="font-bold text-slate-900">Custom Backend JWT</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-500">Session Status:</span>
                  <span className="font-bold text-emerald-600">Active (24h valid)</span>
                </div>
                <div className="flex justify-between py-2 border-b border-slate-100">
                  <span className="font-semibold text-slate-500">Security:</span>
                  <span className="font-bold text-slate-900">Bcrypt Salt 10 Rounds</span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  clearAuthSession();
                  if (onLogout) onLogout();
                }}
                className="w-full py-3 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 font-bold text-xs transition-colors"
              >
                Sign Out of Admin Console
              </button>
            </div>
          )}

        </main>

      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <InquiryDetailModal
          inquiry={selectedInquiry}
          onClose={() => setSelectedInquiry(null)}
          onUpdated={handleInquiryUpdated}
          onDeleted={handleInquiryDeleted}
        />
      )}

    </div>
  );
}

