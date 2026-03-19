import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import Sidebar from '../../components/admin/Sidebar';

const ProjectsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    const loadProjects = async () => {
      setLoading(true);
      setPageError('');

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Load projects error:', error);
        setPageError(error.message);
        setProjects([]);
      } else {
        setProjects(data || []);
      }

      setLoading(false);
    };

    loadProjects();
  }, []);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch = (project.name || '')
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const normalizedStatus = (project.status || '')
        .toLowerCase()
        .replace(/\s+/g, '-');

      const matchesStatus =
        statusFilter === 'all' || normalizedStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter, projects]);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar activePage="projects" />

      <main className="ml-64 flex-1 p-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Projects Inventory</h1>
            <p className="text-sm text-gray-500">
              View and manage all your interior design projects
            </p>
          </div>

          <button
            onClick={() => navigate('/workspace')}
            className="rounded-xl bg-[#D97706] px-6 py-2.5 font-semibold text-white shadow-sm transition-all hover:bg-[#B45309]"
          >
            + New Project
          </button>
        </div>

        {pageError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {pageError}
          </div>
        )}

        <div className="mb-10 flex flex-col gap-4 md:flex-row">
          <div className="relative flex-1">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search projects by name..."
              className="w-full rounded-2xl border border-gray-100 bg-white py-3 pl-12 pr-4 focus:outline-none focus:ring-4 focus:ring-orange-500/5 transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="cursor-pointer rounded-2xl border border-gray-100 bg-white px-6 py-3 text-gray-600 focus:outline-none"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Filter by Status</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="pending">Pending</option>
            <option value="draft">Draft</option>
          </select>
        </div>

        {loading ? (
          <div className="rounded-3xl border border-gray-100 bg-white py-24 text-center text-sm text-gray-500">
            Loading projects...
          </div>
        ) : filteredProjects.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-gray-200 bg-white py-24 text-center">
            <span className="mb-4 block text-4xl">📂</span>
            <p className="text-sm font-medium text-gray-400">
              No projects matched your search criteria.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProjects.map((project) => {
              const normalizedStatus = (project.status || '')
                .toLowerCase()
                .replace(/\s+/g, '-');

              return (
                <div
                  key={project.id}
                  className="group cursor-pointer overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm transition-all duration-500 hover:shadow-xl"
                  onClick={() => navigate(`/admin/projects/${project.id}`)}
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={project.image || '/assets/placeholder.jpg'}
                      alt={project.name || 'Project'}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div
                      className={`absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest shadow-lg ${
                        normalizedStatus === 'completed'
                          ? 'bg-emerald-500 text-white'
                          : normalizedStatus === 'pending'
                          ? 'bg-amber-500 text-white'
                          : 'bg-[#D97706] text-white'
                      }`}
                    >
                      {project.status}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="mb-1 truncate text-base font-bold text-gray-800 transition-colors group-hover:text-[#D97706]">
                      {project.name || 'Untitled Project'}
                    </h3>

                    <div className="mt-4 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        {project.created_at
                          ? new Date(project.created_at).toLocaleDateString()
                          : 'No date'}
                      </span>
                      <span className="text-xs font-bold text-[#D97706]">
                        Details →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectsPage;