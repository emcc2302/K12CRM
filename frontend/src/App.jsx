import React, { useState, useEffect } from 'react';
import HomePage from './pages/HomePage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import { getAuthToken } from './services/api';

export default function App() {
  // Read initial route from URL hash
  const getInitialView = () => {
    const hash = window.location.hash.toLowerCase();
    if (hash.includes('login')) return 'login';
    if (hash.includes('dashboard')) {
      return getAuthToken() ? 'dashboard' : 'login';
    }
    return 'public';
  };

  const [currentView, setCurrentView] = useState(getInitialView);

  // Sync hash changes from browser history (Back / Forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash.includes('login')) {
        setCurrentView('login');
      } else if (hash.includes('dashboard')) {
        if (getAuthToken()) {
          setCurrentView('dashboard');
        } else {
          setCurrentView('login');
          window.location.hash = '#login';
        }
      } else {
        setCurrentView('public');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (view, section = null) => {
    setCurrentView(view);
    if (view === 'login') {
      window.location.hash = '#login';
    } else if (view === 'dashboard') {
      window.location.hash = '#dashboard';
    } else {
      const currentHash = window.location.hash.toLowerCase();
      if (section) {
        window.location.hash = `#${section}`;
      } else if (!['#home', '#about', '#programs', '#contact'].includes(currentHash)) {
        window.location.hash = '#home';
      }
    }
    if (view === 'login' || view === 'dashboard') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleLoginSuccess = () => {
    navigateTo('dashboard');
  };

  const handleLogout = () => {
    navigateTo('login');
  };

  if (currentView === 'login') {
    return (
      <AdminLoginPage
        onLoginSuccess={handleLoginSuccess}
        onNavigate={navigateTo}
      />
    );
  }

  if (currentView === 'dashboard') {
    // Protected route check
    if (!getAuthToken()) {
      return (
        <AdminLoginPage
          onLoginSuccess={handleLoginSuccess}
          onNavigate={navigateTo}
        />
      );
    }

    return (
      <AdminDashboardPage
        onLogout={handleLogout}
        onNavigate={navigateTo}
      />
    );
  }

  return <HomePage onNavigate={navigateTo} />;
}
