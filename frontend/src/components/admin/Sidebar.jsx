import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [designerName, setDesignerName] = useState('Designer');
  const [designerRole, setDesignerRole] = useState('Admin');
  const [loadingProfile, setLoadingProfile] = useState(true);

  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/admin' },
    { id: 'projects', label: 'All Projects', icon: '📁', path: '/admin/projects' },
    { id: 'clients', label: 'Clients', icon: '👥', path: '/admin/clients' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/admin/settings' },
  ];

  useEffect(() => {
    const fetchProfile = async () => {
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
        setDesignerName(user.email?.split('@')[0] || 'Designer');
        setDesignerRole('Admin');
      } else {
        setDesignerName(profile.full_name || user.email?.split('@')[0] || 'Designer');
        setDesignerRole(profile.role === 'admin' ? 'Admin' : profile.role);
      }

      setLoadingProfile(false);
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/designer-login');
  };

  const initials = designerName
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const isActive = (path) => {
    if (path === '/admin') return location.pathname === '/admin';
    return location.pathname.startsWith(path);
  };

  return (
    <aside
      className={`${
  collapsed ? 'w-20' : 'w-64'
} fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-slate-200 bg-white transition-all duration-300`}
    >
      {/* Brand */}
      <div className={`mb-4 flex items-center p-6 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#C96A2B] text-sm font-semibold text-white shadow-sm">
          V
        </div>

        {!collapsed && (
          <div className="text-left">
            <h2 className="font-semibold leading-none tracking-tight text-slate-800">
              VISIONARY
            </h2>
            <p className="mt-1 text-xs font-medium uppercase tracking-wider leading-none text-slate-400">
              Interiors
            </p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`group relative mb-2 flex w-full items-center rounded-xl px-4 py-3 text-sm transition-all ${
              collapsed ? 'justify-center' : 'gap-3'
            } ${
              isActive(item.path)
                ? 'bg-[#FFF7ED] text-[#C96A2B]'
                : 'text-slate-500 hover:bg-slate-50 hover:text-[#C96A2B]'
            }`}
          >
            <span
              className={`text-lg ${
                isActive(item.path)
                  ? 'text-[#C96A2B]'
                  : 'text-slate-400 group-hover:text-[#C96A2B]'
              }`}
            >
              {item.icon}
            </span>

            {!collapsed && <span className="font-medium">{item.label}</span>}

            {isActive(item.path) && !collapsed && (
              <span className="absolute left-0 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-[#C96A2B]"></span>
            )}
          </button>
        ))}
      </nav>

      {/* Footer Profile */}
      {!collapsed && (
        <div className="mb-4 mt-auto border-t border-slate-200 p-4">
          <div className="rounded-2xl border border-slate-200 bg-white p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-semibold text-[#C96A2B]">
                {loadingProfile ? '...' : initials}
              </div>

              <div className="overflow-hidden text-left">
                <h4 className="truncate text-sm font-semibold text-slate-800">
                  {loadingProfile ? 'Loading...' : designerName}
                </h4>

                <div className="mt-1 flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500"></span>
                  <p className="text-xs font-medium uppercase tracking-wider leading-none text-slate-400">
                    {loadingProfile ? 'Please wait' : designerRole}
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="mt-3 w-full rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-[#C96A2B]"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-10 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-slate-200 bg-white text-xs text-slate-400 shadow-sm transition hover:text-[#C96A2B]"
      >
        {collapsed ? '→' : '←'}
      </button>
    </aside>
  );
};

export default Sidebar;