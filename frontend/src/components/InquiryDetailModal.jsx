import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  Tag, 
  GraduationCap, 
  Clock, 
  CheckCircle2, 
  Trash2, 
  MessageSquare,
  ExternalLink,
  Loader2
} from 'lucide-react';
import { updateInquiryStatus, deleteInquiry } from '../services/api';

export default function InquiryDetailModal({ inquiry, onClose, onUpdated, onDeleted }) {
  const [currentStatus, setCurrentStatus] = useState(inquiry?.status || 'New');
  const [loadingStatus, setLoadingStatus] = useState(false);
  const [deleting, setDeleting] = useState(false);

  if (!inquiry) return null;

  const handleStatusChange = async (newStatus) => {
    if (newStatus === currentStatus) return;
    try {
      setLoadingStatus(true);
      await updateInquiryStatus(inquiry.id, newStatus);
      setCurrentStatus(newStatus);
      if (onUpdated) {
        onUpdated({ ...inquiry, status: newStatus });
      }
    } catch (err) {
      alert(err.message || 'Failed to update status');
    } finally {
      setLoadingStatus(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete inquiry #${inquiry.id} from ${inquiry.name}?`)) {
      return;
    }
    try {
      setDeleting(true);
      await deleteInquiry(inquiry.id);
      if (onDeleted) {
        onDeleted(inquiry.id);
      }
      onClose();
    } catch (err) {
      alert(err.message || 'Failed to delete inquiry');
    } finally {
      setDeleting(false);
    }
  };

  const formattedDate = inquiry.created_at
    ? new Date(inquiry.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : 'N/A';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full border border-slate-100 shadow-2xl overflow-hidden transform transition-all text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-slate-200 text-slate-700">
              #{inquiry.id}
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Inquiry Details
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Status Bar */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs font-semibold text-slate-500 block">Current Status</span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mt-1 ${
                currentStatus === 'New' 
                  ? 'bg-blue-100 text-blue-800' 
                  : currentStatus === 'In Progress' 
                  ? 'bg-amber-100 text-amber-800' 
                  : 'bg-emerald-100 text-emerald-800'
              }`}>
                <span className={`w-2 h-2 rounded-full ${
                  currentStatus === 'New' 
                    ? 'bg-blue-600' 
                    : currentStatus === 'In Progress' 
                    ? 'bg-amber-600' 
                    : 'bg-emerald-600'
                }`} />
                {currentStatus}
              </span>
            </div>

            {/* Status change actions */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-slate-500 mr-1 hidden sm:inline">Set to:</span>
              <button
                type="button"
                disabled={loadingStatus || currentStatus === 'New'}
                onClick={() => handleStatusChange('New')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  currentStatus === 'New'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700'
                }`}
              >
                New
              </button>
              <button
                type="button"
                disabled={loadingStatus || currentStatus === 'In Progress'}
                onClick={() => handleStatusChange('In Progress')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  currentStatus === 'In Progress'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-amber-50 hover:text-amber-700'
                }`}
              >
                In Progress
              </button>
              <button
                type="button"
                disabled={loadingStatus || currentStatus === 'Resolved'}
                onClick={() => handleStatusChange('Resolved')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  currentStatus === 'Resolved'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              >
                Resolved
              </button>
            </div>
          </div>

          {/* Contact Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Name */}
            <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <User className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Applicant Name</span>
                <span className="text-sm font-bold text-slate-900 truncate block">{inquiry.name}</span>
              </div>
            </div>

            {/* Email */}
            <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</span>
                  <span className="text-sm font-semibold text-slate-900 truncate block">{inquiry.email}</span>
                </div>
              </div>
              <a
                href={`mailto:${inquiry.email}`}
                target="_blank"
                rel="noreferrer"
                className="p-1.5 rounded-lg text-slate-400 hover:text-brand-600 hover:bg-brand-50"
                title="Send Email"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Phone */}
            <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100 flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                  <Phone className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Phone Number</span>
                  <span className="text-sm font-semibold text-slate-900 truncate block">{inquiry.phone}</span>
                </div>
              </div>
              <a
                href={`tel:${inquiry.phone}`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-600 hover:bg-emerald-50"
                title="Call Phone"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* User Type & Category */}
            <div className="p-3.5 rounded-2xl bg-slate-50/60 border border-slate-100 flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">User Type & Category</span>
                <span className="text-sm font-semibold text-slate-900">
                  {inquiry.user_type} &bull; <span className="text-brand-700">{inquiry.category}</span>
                </span>
              </div>
            </div>

          </div>

          {/* Submission Date */}
          <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
            <Calendar className="w-4 h-4 text-slate-400" />
            <span>Submitted on: {formattedDate}</span>
          </div>

          {/* Message / Query Content */}
          <div>
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
              Message / Inquiry Query
            </span>
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-sm text-slate-800 leading-relaxed whitespace-pre-wrap">
              {inquiry.message}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            disabled={deleting}
            onClick={handleDelete}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-rose-700 hover:bg-rose-50 border border-rose-200 transition-colors"
          >
            {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            Delete Inquiry
          </button>

          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
