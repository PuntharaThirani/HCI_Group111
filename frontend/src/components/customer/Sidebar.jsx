import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: 'Customer',
    initials: 'C',
  });

  const links = [
    { name: 'My Designs', path: '/customer-dashboard' },
    { name: 'Profile Settings', path: '/customer/profile' },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from('profiles')
        .select('full_name, role')
        .eq('id', user.id)
        .single();

      if (data?.full_name) {
        const parts = data.full_name.trim().split(' ');
        const initials = parts
          .slice(0, 2)
          .map((part) => part[0])
          .join('')
          .toUpperCase();

        setProfile({
          name: data.full_name,
          initials: initials || 'C',
        });
      } else {
        const email = user.email || 'Customer';
        setProfile({
          name: email,
          initials: email.charAt(0).toUpperCase(),
        });
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/login');
  };

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C96A2B] text-sm font-semibold text-white shadow-sm">
          V
        </div>

        <div>
          <div className="text-sm font-semibold leading-none tracking-tight text-slate-800">
            VISIONARY
          </div>
          <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
            Interiors
          </div>
        </div>
      </div>

      {/* Section Label */}
      <div className="px-6 pb-2 text-xs font-medium uppercase tracking-wider text-slate-400">
        Customer Menu
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4">
        {links.map((link) => {
          const active = location.pathname === link.path;

          return (
            <Link
              key={link.path}
              to={link.path}
              className={`relative mb-2 flex items-center rounded-xl px-4 py-3 text-sm transition ${
                active
                  ? 'bg-[#FFF7ED] font-medium text-[#C96A2B]'
                  : 'text-slate-600 hover:bg-slate-50 hover:text-[#C96A2B]'
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-6 w-1.5 -translate-y-1/2 rounded-r-full bg-[#C96A2B]"></span>
              )}
              <span>{link.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom user + logout */}
      <div className="mt-auto border-t border-slate-200 p-4">
        <div className="mb-3 flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-100 text-sm font-semibold text-[#C96A2B]">
            {profile.initials}
          </div>

          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-slate-800">
              {profile.name}
            </div>
            <div className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">
              Customer
            </div>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="w-full px-4 py-2 text-sm font-medium text-slate-500 transition hover:text-[#C96A2B] text-left"
        >
         ← Log out
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;