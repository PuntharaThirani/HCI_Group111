import React, { useEffect, useRef, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const AdminNavbar = () => {
  const [showProfile, setShowProfile] = useState(false);
  const [adminName, setAdminName] = useState('Designer');
  const [role, setRole] = useState('Admin');
  const [loadingProfile, setLoadingProfile] = useState(true);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    const fetchAdminProfile = async () => {
      setLoadingProfile(true);

      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session?.user) {
        setLoadingProfile(false);
        navigate('/designer-login');
        return;
      }

      const user = session.user;

      const { data: profile, error } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('id', user.id)
        .single();

      if (error || !profile) {
        setAdminName(user.email?.split('@')[0] || 'Designer');
        setRole('Admin');
      } else {
        setAdminName(profile.full_name || user.email?.split('@')[0] || 'Designer');
        setRole(profile.role === 'admin' ? 'Admin' : profile.role);
      }

      setLoadingProfile(false);
    };

    fetchAdminProfile();
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/designer-login');
  };

  const initials = adminName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <nav className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
      {/* Search */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-sm text-slate-700 outline-none transition focus:border-[#C96A2B] focus:bg-white focus:ring-2 focus:ring-[#C96A2B]/10"
          />
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4 lg:gap-6">
        <button className="flex items-center gap-2 rounded-xl bg-[#C96A2B] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#B95D20]">
          <span className="text-base">+</span>
          <span>Start New Design</span>
        </button>

        <button className="relative rounded-xl p-2 text-slate-400 transition hover:bg-slate-50 hover:text-[#C96A2B]">
          <span className="text-lg">🔔</span>
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full border-2 border-white bg-red-500"></span>
        </button>

        <div className="h-8 w-px bg-slate-200"></div>

        {/* Profile */}
        <div className="relative" ref={profileRef}>
          <button
            type="button"
            onClick={() => setShowProfile((prev) => !prev)}
            className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-slate-50"
          >
            <div className="text-right">
              <p className="text-sm font-semibold leading-none text-slate-800">
                {loadingProfile ? 'Loading...' : adminName}
              </p>
              <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                {loadingProfile ? 'Please wait' : role}
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-100 text-sm font-semibold text-[#C96A2B] shadow-sm">
              {loadingProfile ? '...' : initials}
            </div>
          </button>

          {showProfile && (
            <div className="absolute right-0 mt-3 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
              <div className="border-b border-slate-100 px-4 py-4">
                <p className="text-sm font-semibold text-slate-800">
                  {loadingProfile ? 'Loading...' : adminName}
                </p>
                <p className="mt-1 text-xs text-slate-500">
                  {loadingProfile ? 'Please wait' : role}
                </p>
              </div>

              <div className="p-2">
                <button
                  onClick={() => {
                    setShowProfile(false);
                    navigate('/admin');
                  }}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Dashboard
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full rounded-xl px-3 py-2 text-left text-sm font-medium text-red-600 transition hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;