import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const mockData = [
  { id: 1, name: 'Modern Loft Renovation', date: 'Oct 24, 2023', status: 'completed', thumbnail: '/thumbnails/p1.jpeg' },
  { id: 2, name: 'Scandinavian Living Room', date: 'Oct 20, 2023', status: 'in-progress', thumbnail: '/thumbnails/p2.jpeg' },
  { id: 3, name: 'Urban Kitchen Remodel', date: 'Oct 15, 2023', status: 'completed', thumbnail: '/thumbnails/p3.jpeg' },
  { id: 4, name: 'Coastal Bedroom Suite', date: 'Oct 10, 2023', status: 'in-progress', thumbnail: '/thumbnails/p4.jpeg' },
  { id: 5, name: 'Minimalist Bath Oasis', date: 'Oct 05, 2023', status: 'in-progress', thumbnail: '/thumbnails/p5.jpeg' },
  { id: 6, name: 'Executive Office Suite', date: 'Sep 28, 2023', status: 'completed', thumbnail: '/thumbnails/p6.jpeg' }
];

const chartData = [
  { name: 'Jan', projects: 4 },
  { name: 'Feb', projects: 7 },
  { name: 'Mar', projects: 5 },
  { name: 'Apr', projects: 12 },
  { name: 'May', projects: 9 },
  { name: 'Jun', projects: 15 },
];

const COLORS = ['#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B', '#D97706', '#B45309'];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [recentProjects, setRecentProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const stats = {
    totalProjects: 48,
    activeClients: 12,
    completed: 34,
    inProgress: 14
  };

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setRecentProjects(mockData);
      setLoading(false);
    };
    fetchDashboardData();
  }, []);

  const filteredProjects = recentProjects.filter(project => {
    const query = searchQuery.toLowerCase().trim();
    return project.name.toLowerCase().includes(query) || 
           project.status.toLowerCase().includes(query);
  });

  if (loading) return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar activePage="dashboard" />
      <main className="flex-1 flex items-center justify-center ml-64"><LoadingSpinner /></main>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar activePage="dashboard" />

      <main className="flex-1 p-8 ml-64">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <div className="flex items-center gap-4 text-black">
            <div className="relative group">
              <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="pl-10 pr-10 py-2 border border-gray-100 rounded-xl bg-white shadow-sm focus:outline-none w-80 focus:ring-2 focus:ring-orange-500/20 transition-all text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600 font-bold">✕</button>
              )}
            </div>
            <button onClick={() => navigate('/workspace')} className="bg-[#D97706] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#B45309] transition-all shadow-md active:scale-95">
              + Start New Design
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-black">
          <StatCard icon="📂" label="Total Projects" value={stats.totalProjects} color="bg-orange-50 text-orange-600" />
          <StatCard icon="👤" label="Active Clients" value={stats.activeClients} color="bg-blue-50 text-blue-600" />
          <StatCard icon="✅" label="Completed" value={stats.completed} color="bg-emerald-50 text-emerald-600" />
          <StatCard icon="🔖" label="In Progress" value={stats.inProgress} color="bg-purple-50 text-purple-600" />
        </div>

        {/* Analytics Chart Section */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm mb-10">
          <div className="flex justify-between items-center mb-8">
            <div className="text-left">
              <h3 className="text-lg font-bold text-gray-800">Design Performance</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest">Monthly Project Volume</p>
            </div>
            <div className="text-right">
               <span className="text-2xl font-bold text-[#D97706]">+25%</span>
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Growth rate</p>
            </div>
          </div>
          <div className="h-64 w-full text-black">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9CA3AF', fontSize: 12, fontWeight: 600}} dy={10} />
                <YAxis hide />
                <Tooltip cursor={{fill: '#F9FAFB'}} contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.05)'}} />
                <Bar dataKey="projects" radius={[6, 6, 6, 6]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Projects Title */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-baseline gap-3 text-black">
             <h2 className="text-xl font-bold text-gray-800">Recent Projects</h2>
             {searchQuery && <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Found {filteredProjects.length} results</span>}
          </div>
          <button onClick={() => navigate('/admin/projects')} className="text-[#D97706] font-semibold text-sm hover:underline">View all →</button>
        </div>

        {/* Project Grid / Empty State */}
        {filteredProjects.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] border border-dashed border-gray-200 py-24 text-center">
             <div className="text-4xl mb-4 text-black">🔍</div>
             <h3 className="text-lg font-bold text-gray-800">No projects found</h3>
             <button onClick={() => setSearchQuery('')} className="mt-4 text-[#D97706] font-bold text-sm">Clear Search</button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredProjects.map(project => (
              <div key={project.id} onClick={() => navigate(`/admin/projects/${project.id}`)} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer">
                <div className="h-48 bg-gray-100 relative overflow-hidden">
                  <img src={project.thumbnail} alt={project.name} className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700" />
                  <span className={`absolute top-3 right-3 px-2 py-1 rounded-lg text-[10px] font-black uppercase text-white shadow-lg ${project.status === 'completed' ? 'bg-emerald-500' : 'bg-[#D97706]'}`}>{project.status}</span>
                </div>
                <div className="p-5 text-left text-black">
                  <h3 className="font-bold text-gray-800 group-hover:text-[#D97706] transition-colors truncate">{project.name}</h3>
                  <div className="flex justify-between items-center mt-2">
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{project.date}</p>
                    <span className="text-[#D97706] text-xs font-bold opacity-0 group-hover:opacity-100 transition-opacity">Details →</span>
                  </div>
                </div>
              </div>
            ))}

            {/* ✅ අලුතින් එකතු කළ New Project Dotted Card */}
            {!searchQuery && (
              <div 
                onClick={() => navigate('/workspace')}
                className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 hover:bg-orange-50/50 hover:border-[#D97706]/30 transition-all group cursor-pointer min-h-62.5"
                
              >
                <div className="w-12 h-12 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center text-gray-300 group-hover:border-[#D97706] group-hover:text-[#D97706] mb-3 transition-colors">
                  <span className="text-2xl font-light">+</span>
                </div>
                <p className="text-gray-400 font-bold text-[10px] group-hover:text-[#D97706] transition-colors uppercase tracking-[0.2em]">New Design</p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

const StatCard = ({ icon, label, value, color }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-transform hover:scale-[1.02]">
    <div className={`w-12 h-12 ${color.split(' ')[0]} rounded-xl flex items-center justify-center text-xl`}>{icon}</div>
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-none mb-1 text-left">{label}</p>
      <p className="text-2xl font-bold text-gray-800 text-left">{value}</p>
    </div>
  </div>
);

export default DashboardPage;