const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Helper to get authentication token from localStorage
 */
export function getAuthToken() {
  return localStorage.getItem('educrm_admin_token');
}

/**
 * Helper to store authentication token and admin profile
 */
export function setAuthSession(token, admin) {
  localStorage.setItem('educrm_admin_token', token);
  localStorage.setItem('educrm_admin_profile', JSON.stringify(admin));
}

/**
 * Helper to clear authentication session
 */
export function clearAuthSession() {
  localStorage.removeItem('educrm_admin_token');
  localStorage.removeItem('educrm_admin_profile');
}

/**
 * Helper to retrieve stored admin profile
 */
export function getStoredAdmin() {
  const data = localStorage.getItem('educrm_admin_profile');
  try {
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

/**
 * Generic Fetch wrapper with error handling and Authorization headers
 */
async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  const token = getAuthToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      // Auto clear session if unauthorized or expired
      clearAuthSession();
    }
    const errorMessage = data.message || `Request failed with status ${response.status}`;
    throw new Error(errorMessage);
  }

  return data;
}

/**
 * Public: Submit Public Inquiry Form
 */
export async function submitInquiry(inquiryData) {
  return request('/inquiries', {
    method: 'POST',
    body: JSON.stringify(inquiryData)
  });
}

/**
 * Admin: Custom JWT Login
 */
export async function loginAdmin(credentials) {
  const result = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials)
  });

  if (result.token) {
    setAuthSession(result.token, result.admin);
  }

  return result;
}

/**
 * Admin: Get Current Admin Profile
 */
export async function getAdminProfile() {
  return request('/auth/me');
}

/**
 * Admin: Fetch Filtered & Searched Inquiries
 */
export async function fetchInquiries(params = {}) {
  const queryParams = new URLSearchParams();

  if (params.category && params.category !== 'All' && params.category !== 'All Categories') {
    queryParams.append('category', params.category);
  }
  if (params.user_type && params.user_type !== 'All' && params.user_type !== 'All User Types') {
    queryParams.append('user_type', params.user_type);
  }
  if (params.status && params.status !== 'All' && params.status !== 'All Statuses') {
    queryParams.append('status', params.status);
  }
  if (params.search && params.search.trim()) {
    queryParams.append('search', params.search.trim());
  }

  const queryString = queryParams.toString();
  return request(`/inquiries${queryString ? `?${queryString}` : ''}`);
}

/**
 * Admin: Update Inquiry Status ('New' | 'In Progress' | 'Resolved')
 */
export async function updateInquiryStatus(id, status) {
  return request(`/inquiries/${id}/status`, {
    method: 'PATCH',
    body: JSON.stringify({ status })
  });
}

/**
 * Admin: Delete Inquiry
 */
export async function deleteInquiry(id) {
  return request(`/inquiries/${id}`, {
    method: 'DELETE'
  });
}

/**
 * Admin: Get Aggregated Stats
 */
export async function fetchStats() {
  return request('/inquiries/stats');
}

