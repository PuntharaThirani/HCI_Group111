import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../../components/admin/Sidebar';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data - සැබෑ පද්ධතියකදී මේවා Supabase එකෙන් ලබා ගනී
  const project = {
    id: id,
    name: 'Modern Loft Renovation',
    client: 'Sarah Jenkins',
    status: 'In Progress',
    date: 'Oct 24, 2023',
    budget: '$15,000',
    location: 'Colombo 07, Sri Lanka',
    description: 'A complete overhaul of a 1200 sqft loft focusing on minimalist industrial design with warm orange accents and sustainable materials.',
    image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800',
    features: ['Minimalist Lighting', 'Industrial Flooring', 'Sustainable Wood'],
    progress: 65
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar activePage="projects" />
      
      <main className="flex-1 ml-64 p-8 text-black">
        {/* Back Button */}
        <button 
          onClick={() => navigate('/admin/projects')}
          className="text-gray-400 hover:text-[#D97706] mb-8 flex items-center gap-2 transition-all font-semibold"
        >
          ← Back to Project Inventory
        </button>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex flex-col lg:flex-row">
            
            {/* Left: Project Image & Quick Stats */}
            <div className="lg:w-1/2 relative group">
              <img src={project.image} alt={project.name} className="w-full h-full object-cover min-h-125" />
              <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-md p-6 rounded-3xl shadow-xl">
                 <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Current Progress</p>
                 <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#D97706] rounded-full" style={{ width: `${project.progress}%` }}></div>
                 </div>
                 <p className="text-right text-xs font-bold text-[#D97706] mt-2">{project.progress}% Completed</p>
              </div>
            </div>

            {/* Right: Project Detailed Info */}
            <div className="lg:w-1/2 p-12">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <span className="text-[10px] font-bold text-[#D97706] uppercase tracking-[0.2em] bg-orange-50 px-3 py-1 rounded-lg">REF: #{id}</span>
                  <h1 className="text-4xl font-bold text-gray-800 mt-3">{project.name}</h1>
                  <p className="text-gray-400 text-sm mt-1">📍 {project.location}</p>
                </div>
                <span className="bg-orange-500 text-white px-4 py-1.5 rounded-xl text-[10px] font-bold uppercase shadow-lg shadow-orange-500/20">
                  {project.status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-y-10 gap-x-6 mb-10 border-y border-gray-50 py-8">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Client</p>
                  <p className="text-gray-800 font-bold text-lg">{project.client}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Start Date</p>
                  <p className="text-gray-800 font-bold text-lg">{project.date}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Budget Allocation</p>
                  <p className="text-[#D97706] font-bold text-2xl">{project.budget}</p>
                </div>
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Key Features</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {project.features.map(f => (
                      <span key={f} className="text-[9px] bg-gray-100 text-gray-600 px-2 py-1 rounded-md font-bold">{f}</span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mb-12">
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">Project Narrative</p>
                <p className="text-gray-600 leading-relaxed text-sm italic">
                  "{project.description}"
                </p>
              </div>

              <div className="flex gap-4">
                <button className="flex-2 bg-[#D97706] text-white px-8 py-4 rounded-2xl font-bold hover:bg-[#B45309] transition-all shadow-md active:scale-95">
                  Edit Specifications
                </button>
                <button className="flex-1 border-2 border-gray-100 text-gray-500 px-6 py-4 rounded-2xl font-bold hover:bg-gray-50 transition-all active:scale-95">
                  PDF Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetails;