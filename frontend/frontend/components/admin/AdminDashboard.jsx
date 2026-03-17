import React, { useState } from 'react';
import AdminNavbar from '../../components/admin/AdminNavbar';
import Sidebar from '../../components/admin/Sidebar';

const AdminDashboard = () => {
  const [stats] = useState({
    totalProjects: 48,
    activeClients: 12,
    completed: 34,
    inProgress: 14
  });

  const [recentProjects] = useState([
    { id: 1, name: 'Modern Loft Renovation', date: 'Oct 24, 2023', status: 'completed' },
    { id: 2, name: 'Scandinavian Living Room', date: 'Oct 20, 2023', status: 'in-progress' },
    { id: 3, name: 'Urban Kitchen Remodel', date: 'Oct 15, 2023', status: 'completed' },
    { id: 4, name: 'Coastal Bedroom Suite', date: 'Oct 10, 2023', status: 'in-progress' },
    { id: 5, name: 'Minimalist Bath Oasis', date: 'Oct 05, 2023', status: 'pending' },
    { id: 6, name: 'Executive Office Suite', date: 'Sep 28, 2023', status: 'completed' }
  ]);

  return (
    <div className="min-h-screen bg-[#F9FAFB]">
      <AdminNavbar />
      <div className="flex">
        <Sidebar activePage="dashboard" />
        
        <main className="flex-1 ml-64 p-8">
          {/* Header Section with Search and Action Button */}
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            
            <div className="flex items-center gap-4">
              {/* Search Bar */}
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="pl-10 pr-4 py-2 bg-gray-100 border-none rounded-xl text-sm w-64 focus:ring-2 focus:ring-orange-500/20 outline-none"
                />
              </div>
              {/* Primary Action Button */}
              <button className="bg-[#D97706] hover:bg-[#B45309] text-white px-5 py-2 rounded-xl font-medium transition-colors flex items-center gap-2">
                <span className="text-xl">+</span> Start New Design
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatCard icon="📂" label="Total Projects" value={stats.totalProjects} bgColor="bg-orange-50" textColor="text-orange-600" />
            <StatCard icon="👤" label="Active Clients" value={stats.activeClients} bgColor="bg-blue-50" textColor="text-blue-600" />
            <StatCard icon="✅" label="Completed" value={stats.completed} bgColor="bg-emerald-50" textColor="text-emerald-600" />
            <StatCard icon="🔖" label="In Progress" value={stats.inProgress} bgColor="bg-purple-50" textColor="text-purple-600" />
          </div>

          {/* Recent Projects Section */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-800">Recent Projects</h2>
            <button className="text-[#D97706] font-semibold text-sm hover:underline">View all →</button>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {recentProjects.map(project => (
              <div key={project.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group">
                <div className="h-40 bg-gray-100 flex items-center justify-center text-gray-300">
                  Preview Image
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">{project.name}</h3>
                  <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">{project.date}</p>
                </div>
              </div>
            ))}

            {/* New Project Dotted Card */}
            <div className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 hover:bg-gray-50 transition-colors group cursor-pointer">
              <div className="w-10 h-10 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-300 group-hover:border-orange-500 group-hover:text-orange-500 mb-2">+</div>
              <p className="text-gray-400 font-medium group-hover:text-orange-500">New Project</p>
            </div>
          </div>

          {/* User Profile Info Footer */}
          <div className="flex items-center gap-3 pt-6 border-t border-gray-100">
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold text-sm">
              AR
            </div>
            <div>
              <p className="text-sm font-bold text-gray-800 leading-none">Alex Rivera</p>
              <p className="text-xs text-gray-500 mt-1">Senior Designer</p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Helper Component for Stat Cards
const StatCard = ({ icon, label, value, bgColor }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4">
    <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center text-xl`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1">{label}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export default AdminDashboard;