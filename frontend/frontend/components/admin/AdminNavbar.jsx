import React, { useState } from 'react';

const AdminNavbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  return (
    // Black bar එක අයින් කර සුදු පැහැති සරල Navbar එකක් එක් කරන ලදී
    <nav className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 sticky top-0 z-50">
      
      {/* Left Section - Search */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#D97706]">
            🔍
          </span>
          <input
            type="text"
            placeholder="Search projects..."
            className="w-full pl-11 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-orange-500/10 transition-all"
          />
        </div>
      </div>

      {/* Right Section - Actions & Profile */}
      <div className="flex items-center gap-6">
        
        {/* Start New Design Button */}
        <button className="bg-[#D97706] hover:bg-[#B45309] text-white px-5 py-2 rounded-xl text-sm font-semibold transition-colors flex items-center gap-2">
          <span className="text-lg">+</span> Start New Design
        </button>

        {/* Notifications Icon */}
        <button 
          onClick={() => setShowNotifications(!showNotifications)}
          className="text-gray-400 hover:text-[#D97706] transition-colors relative"
        >
          <span className="text-xl">🔔</span>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Vertical Divider */}
        <div className="h-8 w-px bg-gray-100 mx-1"></div>

        {/* Profile Section */}
        <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setShowProfile(!showProfile)}>
          <div className="text-right">
            <p className="text-sm font-bold text-gray-800 leading-none">Alex Rivera</p>
            <p className="text-[10px] text-gray-400 font-bold uppercase mt-1">Senior Designer</p>
          </div>
          <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm border-2 border-white shadow-sm">
            AR
          </div>
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;