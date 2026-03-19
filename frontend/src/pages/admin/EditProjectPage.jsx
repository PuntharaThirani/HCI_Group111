import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '../../supabaseClient';
import Sidebar from '../../components/admin/Sidebar';

const EditProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageError, setPageError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    status: '',
    budget: '',
    location: '',
    description: '',
    progress: 0,
    features: '',
    image: '',
  });

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
        setPageError('Unable to load project for editing.');
        setLoading(false);
        return;
      }

      setFormData({
        name: data.name || '',
        status: data.status || '',
        budget: data.budget || '',
        location: data.location || '',
        description: data.description || '',
        progress: data.progress || 0,
        features: Array.isArray(data.features)
          ? data.features.join(', ')
          : data.features || '',
        image: data.image || '',
      });

      setLoading(false);
    };

    fetchProject();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'progress' ? Number(value) : value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setPageError('');

    const featuresArray = formData.features
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    const { error } = await supabase
      .from('projects')
      .update({
        name: formData.name,
        status: formData.status,
        budget: formData.budget,
        location: formData.location,
        description: formData.description,
        progress: formData.progress,
        features: featuresArray,
        image: formData.image,
      })
      .eq('id', id);

    setSaving(false);

    if (error) {
      console.error('Update project error:', error);
      setPageError(error.message);
      return;
    }

    navigate(`/admin/projects/${id}`);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#EEF1F4]">
        <Sidebar />
        <main className="ml-64 flex flex-1 items-center justify-center text-sm text-slate-500">
          Loading project...
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#EEF1F4]">
      <Sidebar />

      <main className="ml-64 flex-1 p-6 lg:p-8">
        <button
          onClick={() => navigate(`/admin/projects/${id}`)}
          className="mb-6 text-sm font-medium text-slate-500 transition hover:text-[#C96A2B]"
        >
          ← Back to Project Details
        </button>

        <div className="max-w-4xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold text-slate-800">
            Edit Project
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Update the project specifications and save changes.
          </p>

          {pageError && (
            <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {pageError}
            </div>
          )}

          <form onSubmit={handleSave} className="mt-8 grid gap-5 md:grid-cols-2">
            <Field
              label="Project Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />

            <Field
              label="Status"
              name="status"
              value={formData.status}
              onChange={handleChange}
            />

            <Field
              label="Budget"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
            />

            <Field
              label="Location"
              name="location"
              value={formData.location}
              onChange={handleChange}
            />

            <Field
              label="Progress %"
              name="progress"
              type="number"
              value={formData.progress}
              onChange={handleChange}
            />

            <Field
              label="Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <Field
                label="Features (comma separated)"
                name="features"
                value={formData.features}
                onChange={handleChange}
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#C96A2B]"
              />
            </div>

            <div className="md:col-span-2 flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate(`/admin/projects/${id}`)}
                className="rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#C96A2B] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#B95D20] disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

const Field = ({ label, name, value, onChange, type = 'text' }) => (
  <div>
    <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
      {label}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#C96A2B]"
    />
  </div>
);

export default EditProjectPage;