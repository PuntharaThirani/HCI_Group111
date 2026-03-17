import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // 🖼️ සියලුම ව්‍යාපෘති ලැයිස්තුව (Mock Data)
  const [projects] = useState([
    { id: 1, name: 'Modern Loft Renovation', date: 'Oct 24, 2023', status: 'completed', thumbnail:  '/thumbnails/a1.jpeg' },
    { id: 2, name: 'Scandinavian Living Room', date: 'Oct 20, 2023', status: 'in-progress', thumbnail: '/thumbnails/a2.jpeg' },
    { id: 3, name: 'Urban Kitchen Remodel', date: 'Oct 15, 2023', status: 'completed', thumbnail: '/thumbnails/a3.jpeg' },
    { id: 4, name: 'Coastal Bedroom Suite', date: 'Oct 10, 2023', status: 'in-progress', thumbnail: '/thumbnails/a4.jpeg' },
    { id: 5, name: 'Minimalist Bath Oasis', date: 'Oct 05, 2023', status: 'pending', thumbnail: '/thumbnails/a5.jpeg' },
    { id: 6, name: 'Executive Office Suite', date: 'Sep 28, 2023', status: 'completed', thumbnail: '/thumbnails/a6.jpeg' },
    { id: 7, name: 'Master Bedroom Design', date: 'Sep 20, 2023', status: 'completed', thumbnail: '/thumbnails/a7.jpeg' },
    { id: 8, name: 'Rustic Dining Hall', date: 'Sep 15, 2023', status: 'in-progress', thumbnail: '/thumbnails/a8.jpeg' }
  ]);

  // 🔍 Search සහ Filter Logic
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || project.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, projects]);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* 1. Sidebar (Active Page එක 'projects' ලෙස ලබා දී ඇත) */}
      <Sidebar activePage="projects" />
      
      <main className="flex-1 ml-64 p-8">
        
        {/* 2. Page Header Section */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Projects Inventory</h1>
            <p className="text-sm text-gray-500">View and manage all your interior design projects</p>
          </div>
          <button 
            onClick={() => navigate('/workspace')}
            className="bg-[#D97706] text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-[#B45309] transition-all shadow-sm"
          >
            + New Project
          </button>
        </div>

        {/* 3. Filters & Search Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <div className="flex-1 relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search projects by name..." 
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <select 
            className="px-6 py-3 bg-white border border-gray-100 rounded-2xl text-gray-600 focus:outline-none cursor-pointer"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Filter by Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
          </select>
        </div>

        {/* 4. Projects Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProjects.map(project => (
            <div 
              key={project.id} 
              className="bg-white rounded-4xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 group cursor-pointer"
              onClick={() => navigate(`/admin/projects/${project.id}`)}
            >
              {/* Thumbnail Area */}
              <div className="h-52 overflow-hidden relative">
                <img 
                  src={project.thumbnail} 
                  alt={project.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
                  project.status === 'completed' ? 'bg-emerald-500 text-white' : 'bg-[#D97706] text-white'
                }`}>
                  {project.status}
                </div>
              </div>
              
              {/* Info Area */}
              <div className="p-6">
                <h3 className="text-base font-bold text-gray-800 group-hover:text-[#D97706] transition-colors truncate mb-1">
                  {project.name}
                </h3>
                <div className="flex justify-between items-center mt-4">
                   <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">{project.date}</span>
                   <span className="text-[#D97706] text-xs font-bold">Details →</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 5. No Results State */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-24 bg-white rounded-4xl border border-dashed border-gray-200">
            <span className="text-4xl mb-4 block">📂</span>
            <p className="text-gray-400 font-medium text-sm">No projects matched your search criteria.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage;