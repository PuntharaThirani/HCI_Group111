import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ activePage = 'dashboard' }) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  // Navigation Items
  const menuItems = [
    { id: 'dashboard', label: 'My Designs', icon: '🎨', path: '/admin' },
    { id: 'projects', label: 'All Projects', icon: '📁', path: '/admin/projects' }, 
    { id: 'customers', label: 'Clients', icon: '👥', path: '/admin/clients' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/admin/settings' }
  ];

  return (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} bg-white border-r border-gray-100 h-screen fixed left-0 top-0 transition-all duration-300 z-50 shadow-sm flex flex-col`}>
      
      {/* 1. Brand Logo Section */}
      <div className={`p-6 mb-4 flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-8 h-8 bg-[#D97706] rounded-lg flex items-center justify-center text-white font-bold shrink-0 shadow-sm">
          V
        </div>
        {!collapsed && (
          <div className="text-left">
            <h2 className="font-bold text-gray-800 leading-none tracking-tight">VISIONARY</h2>
            <p className="text-[10px] font-bold text-gray-400 tracking-[0.2em] mt-1 leading-none uppercase">Interiors</p>
          </div>
        )}
      </div>

      {/* 2. Navigation Section */}
      <nav className="flex-1 px-4">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => navigate(item.path)}
            className={`
              w-full flex items-center ${collapsed ? 'justify-center' : 'gap-3'} 
              px-4 py-3 mb-2 rounded-xl text-sm transition-all relative group
              ${activePage === item.id 
                ? 'bg-[#FFF7ED] text-[#D97706]' 
                : 'text-gray-500 hover:bg-gray-50 hover:text-[#D97706]'
              }
            `}
          >
            <span className={`text-lg ${activePage === item.id ? 'text-[#D97706]' : 'text-gray-400 group-hover:text-[#D97706]'}`}>
              {item.icon}
            </span>
            {!collapsed && <span className="font-semibold">{item.label}</span>}
            
            {/* Active Indicator Bar */}
            {activePage === item.id && !collapsed && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-6 bg-[#D97706] rounded-r-full shadow-[2px_0_8px_rgba(217,119,6,0.3)]"></span>
            )}
          </button>
        ))}
      </nav>

      {/* 3. User Profile Section (Update කළ කොටස) */}
      {!collapsed && (
        <div className="p-4 border-t border-gray-100 mt-auto mb-4">
          <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-gray-100 shadow-sm transition-all hover:bg-gray-50/50 group cursor-pointer">
            {/* User Avatar */}
            <div className="w-10 h-10 bg-[#D97706] rounded-xl flex items-center justify-center font-bold text-white text-sm shrink-0 shadow-md shadow-orange-500/10">
              AR
            </div>
            
            {/* User Info & Role */}
            <div className="overflow-hidden text-left">
              <h4 className="font-bold text-gray-800 text-sm whitespace-nowrap group-hover:text-[#D97706] transition-colors">
                Alex Rivera
              </h4>
              <div className="flex items-center gap-1.5 mt-1">
                {/* Active Pulse Status */}
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                <p className="text-[10px] text-[#D97706] font-extrabold uppercase tracking-widest leading-none">
                  Senior Designer
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Collapse Toggle Button */}
      <button 
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-10 w-6 h-6 bg-white border border-gray-100 text-gray-400 rounded-full flex items-center justify-center text-xs shadow-sm hover:text-[#D97706] transition-all z-50"
      >
        {collapsed ? '→' : '←'}
      </button>
    </aside>
  );
};

export default Sidebar;