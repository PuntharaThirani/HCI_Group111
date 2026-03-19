import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import Sidebar from '../../components/admin/Sidebar';
import { jsPDF } from 'jspdf';

const ProjectDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [clientName, setClientName] = useState('Not assigned');
  const [loading, setLoading] = useState(true);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      setPageError('');

      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .eq('id', id)
        .single();

      if (error || !data) {
        console.error('Fetch project error:', error);
        setPageError('Unable to load project details.');
        setProject(null);
        setLoading(false);
        return;
      }

      setProject(data);

      if (data.client_id) {
        const { data: clientData, error: clientError } = await supabase
          .from('clients')
          .select('name')
          .eq('id', data.client_id)
          .single();

        if (!clientError && clientData?.name) {
          setClientName(clientData.name);
        } else {
          setClientName('Not assigned');
        }
      } else {
        setClientName('Not assigned');
      }

      setLoading(false);
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  const featuresList = useMemo(() => {
    if (!project?.features) return [];

    if (Array.isArray(project.features)) return project.features;
    if (typeof project.features === 'string') {
      return project.features
        .split(',')
        .map((item) => item.trim())
        .filter(Boolean);
    }
    return [];
  }, [project]);

  const handleGeneratePdf = () => {
    if (!project) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.setTextColor(201, 106, 43);
    doc.text('PROJECT SPECIFICATION REPORT', 20, 20);

    doc.setFontSize(12);
    doc.setTextColor(40, 40, 40);
    doc.text(`Ref ID: #${project.id}`, 20, 35);
    doc.text(`Project: ${project.name || 'N/A'}`, 20, 45);
    doc.text(`Client: ${clientName}`, 20, 55);
    doc.text(`Status: ${project.status || 'N/A'}`, 20, 65);
    doc.text(`Budget: ${project.budget || 'Not specified'}`, 20, 75);
    doc.text(`Location: ${project.location || 'Not specified'}`, 20, 85);
    doc.text(`Progress: ${project.progress || 0}%`, 20, 95);

    const description = project.description || 'No description available.';
    const wrappedDescription = doc.splitTextToSize(
      `Description: ${description}`,
      170
    );
    doc.text(wrappedDescription, 20, 110);

    let y = 110 + wrappedDescription.length * 7 + 10;

    doc.text('Features:', 20, y);
    y += 10;

    if (featuresList.length > 0) {
      featuresList.forEach((feature, index) => {
        doc.text(`- ${feature}`, 25, y + index * 8);
      });
      y += featuresList.length * 8;
    } else {
      doc.text('- No features listed', 25, y);
      y += 8;
    }

    if (project.room_config) {
      y += 10;
      doc.text('Room Configuration:', 20, y);
      y += 10;

      doc.text(`Room Type: ${project.room_config.roomType || 'N/A'}`, 25, y);
      y += 8;
      doc.text(`Shape: ${project.room_config.shape || 'N/A'}`, 25, y);
      y += 8;
      doc.text(`Width: ${project.room_config.width || 0}`, 25, y);
      y += 8;
      doc.text(`Length: ${project.room_config.length || 0}`, 25, y);
    }

    doc.save(`${project.name || 'project-report'}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#EEF1F4]">
        <Sidebar />
        <main className="ml-64 flex flex-1 items-center justify-center">
          <p className="animate-pulse text-sm text-slate-500">
            Loading project details...
          </p>
        </main>
      </div>
    );
  }

  if (pageError || !project) {
    return (
      <div className="flex min-h-screen bg-[#EEF1F4]">
        <Sidebar />
        <main className="ml-64 flex flex-1 items-center justify-center p-8">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 font-medium text-red-600">
            {pageError || 'Project not found.'}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#EEF1F4]">
      <Sidebar />

      <main className="ml-64 flex-1 p-6 text-slate-900 lg:p-8">
        <button
          onClick={() => navigate('/admin/projects')}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-[#C96A2B]"
        >
          ← Back to Inventory
        </button>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="flex flex-col lg:flex-row">
            <div className="relative lg:w-1/2">
              <img
                src={project.image || '/assets/placeholder.jpeg'}
                alt={project.name || 'Project'}
                onError={(e) => {
                  e.currentTarget.src = '/assets/placeholder.jpeg';
                }}
                className="min-h-[500px] w-full object-cover"
              />

              <div className="absolute bottom-6 left-6 right-6 rounded-2xl border border-white/50 bg-white/90 p-5 shadow-lg backdrop-blur-md">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-slate-400">
                  Current Progress
                </p>
                <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-[#C96A2B]"
                    style={{ width: `${project.progress || 0}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-right text-xs font-medium text-[#C96A2B]">
                  {project.progress || 0}% Completed
                </p>
              </div>
            </div>

            <div className="p-8 lg:w-1/2 lg:p-10">
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <span className="rounded-lg bg-orange-50 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#C96A2B]">
                    Ref: #{project.id}
                  </span>
                  <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-800">
                    {project.name || 'Untitled Project'}
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    📍 {project.location || 'Not specified'}
                  </p>
                </div>

                <span className="rounded-xl bg-[#C96A2B] px-4 py-2 text-xs font-medium uppercase tracking-wider text-white shadow-lg">
                  {project.status || 'draft'}
                </span>
              </div>

              <div className="mb-10 grid grid-cols-1 gap-8 border-y border-slate-100 py-8 sm:grid-cols-2">
                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                    Client
                  </p>
                  <p className="text-lg font-semibold text-slate-700">
                    {clientName}
                  </p>
                </div>

                <div>
                  <p className="mb-1 text-xs font-medium uppercase tracking-wider text-slate-400">
                    Budget
                  </p>
                  <p className="text-2xl font-semibold text-[#C96A2B]">
                    {project.budget || 'Not specified'}
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
                  Narrative
                </p>
                <p className="text-sm italic leading-relaxed text-slate-500">
                  "{project.description || 'No description available.'}"
                </p>
              </div>

              <div className="mb-8">
                <p className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
                  Features
                </p>
                {featuresList.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {featuresList.map((feature) => (
                      <span
                        key={feature}
                        className="rounded-md bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">No features listed.</p>
                )}
              </div>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate(`/workspace/${id}`)}
                  className="flex-1 rounded-xl bg-[#C96A2B] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#B95D20]"
                >
                  Edit Specifications
                </button>

                <button
                  onClick={handleGeneratePdf}
                  className="rounded-xl border border-slate-200 bg-white px-6 py-4 text-sm font-medium text-slate-500 transition hover:bg-slate-50"
                >
                  Download PDF
                </button>

                <button
                  onClick={() =>
                    navigate('/payment', {
                      state: {
                        project: {
                          id: project.id,
                          name: project.name,
                          image: project.image,
                          price: project.budget || 25000,
                          status: project.status,
                        },
                      },
                    })
                  }
                  className="rounded-xl bg-green-600 px-6 py-4 text-sm font-bold text-white transition hover:bg-green-700"
                >
                  Proceed to Payment
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