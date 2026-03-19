import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import Sidebar from '../../components/admin/Sidebar';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const chartData = [
  { name: 'Jan', projects: 4 }, { name: 'Feb', projects: 7 }, { name: 'Mar', projects: 5 },
  { name: 'Apr', projects: 12 }, { name: 'May', projects: 9 }, { name: 'Jun', projects: 15 },
];

const COLORS = ['#FDE68A', '#FCD34D', '#FBBF24', '#F59E0B', '#D97706', '#B45309'];

const DashboardPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(null);
  const [stats, setStats] = useState({
    totalProjects: 0,
    activeClients: 0,
    completed: 0,
    inProgress: 0
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        // Get current user profile
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();
          setCurrentUser(profile);
        }

        // Total projects
        const { count: total } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });

        // All projects to count statuses (handles mixed case)
        const { data: allProjects } = await supabase
          .from('projects')
          .select('status');

        const completed = (allProjects || []).filter(p =>
          p.status?.toLowerCase().replace(/[- ]/g, '') === 'completed'
        ).length;

        const inProgress = (allProjects || []).filter(p =>
          p.status?.toLowerCase().replace(/[- ]/g, '') === 'inprogress'
        ).length;

        // Active customers from profiles table
       // Active clients from clients table
        const { count: clientCount } = await supabase
          .from('clients')
          .select('*', { count: 'exact', head: true });

        setStats({
          totalProjects: total || 0,
          activeClients: clientCount || 0,
          completed,
          inProgress,
        });

      } catch (err) {
        console.error("Error fetching data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar activePage="dashboard" />
      <main className="flex-1 flex items-center justify-center ml-64"><LoadingSpinner /></main>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar activePage="dashboard" user={currentUser} />

      <main className="flex-1 p-8 ml-64">

        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <button
            onClick={() => navigate('/workspace')}
            className="bg-[#D97706] text-white px-5 py-2 rounded-xl font-medium hover:bg-[#B45309] transition-all shadow-md active:scale-95"
          >
            + Start New Design
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 text-black">
          <StatCard icon="📂" label="Total Projects"  value={stats.totalProjects} color="bg-orange-50 text-orange-600" />
          <StatCard icon="👤" label="Active Clients"  value={stats.activeClients} color="bg-blue-50 text-blue-600" />
          <StatCard icon="✅" label="Completed"       value={stats.completed}     color="bg-emerald-50 text-emerald-600" />
          <StatCard icon="🔖" label="In Progress"     value={stats.inProgress}    color="bg-purple-50 text-purple-600" />
        </div>

        {/* Analytics Chart */}
        <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm">
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
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: '#9CA3AF', fontSize: 12, fontWeight: 600 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip
                  cursor={{ fill: '#F9FAFB' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px rgba(0,0,0,0.05)' }}
                />
                <Bar dataKey="projects" radius={[6, 6, 6, 6]} barSize={40}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

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
