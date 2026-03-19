import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import Sidebar from '../../components/admin/Sidebar';

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [customerList, setCustomerList] = useState([]);
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [pageError, setPageError] = useState('');
  const [formError, setFormError] = useState('');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isRemovalOpen, setIsRemovalOpen] = useState(false);
  const [activeTargetId, setActiveTargetId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
  });

  const loadCustomers = async () => {
    setIsPageLoading(true);
    setPageError('');

    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Load clients error:', error);
      setPageError('Unable to load clients right now.');
      setCustomerList([]);
    } else {
      setCustomerList(data || []);
    }

    setIsPageLoading(false);
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const closeForm = () => {
    setIsFormOpen(false);
    setIsEditing(false);
    setActiveTargetId(null);
    setFormError('');
    setFormData({
      full_name: '',
      email: '',
      phone: '',
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormError('');

    if (!formData.full_name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setFormError('Please fill in all required fields.');
      return;
    }

    if (isEditing) {
      const { error } = await supabase
        .from('clients')
        .update({
          name: formData.full_name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        })
        .eq('id', activeTargetId);

      if (error) {
        console.error('Update client error:', error);
        setFormError(error.message);
        return;
      }

      setCustomerList((prev) =>
        prev.map((client) =>
          client.id === activeTargetId
            ? {
                ...client,
                name: formData.full_name.trim(),
                email: formData.email.trim(),
                phone: formData.phone.trim(),
              }
            : client
        )
      );

      closeForm();
    } else {
      const { data, error } = await supabase
        .from('clients')
        .insert([
          {
            name: formData.full_name.trim(),
            email: formData.email.trim(),
            phone: formData.phone.trim(),
            created_at: new Date().toISOString(),
          },
        ])
        .select();

      if (error) {
        console.error('Insert client error:', error);
        setFormError(error.message);
        return;
      }

      if (data?.[0]) {
        setCustomerList((prev) => [data[0], ...prev]);
      }

      closeForm();
    }
  };

  const executeRemoval = async () => {
    const { error } = await supabase
      .from('clients')
      .delete()
      .eq('id', activeTargetId);

    if (error) {
      console.error('Delete client error:', error);
      return;
    }

    setCustomerList((prev) => prev.filter((client) => client.id !== activeTargetId));
    setIsRemovalOpen(false);
    setActiveTargetId(null);
  };

  const openEditMode = (client) => {
    setIsEditing(true);
    setActiveTargetId(client.id);
    setFormError('');
    setFormData({
      full_name: client.name || '',
      email: client.email || '',
      phone: client.phone || '',
    });
    setIsFormOpen(true);
  };

  const filteredData = customerList.filter((client) => {
    const query = searchTerm.toLowerCase();
    return (
      (client.name || '').toLowerCase().includes(query) ||
      (client.email || '').toLowerCase().includes(query) ||
      (client.phone || '').toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex min-h-screen bg-[#EEF1F4] font-sans text-slate-900">
      <Sidebar />

      <main className="ml-64 flex-1 p-6 lg:p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-left">
            <h1 className="text-2xl font-semibold text-slate-800">
              Customer Directory
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Manage customer records and contact information.
            </p>
          </div>

          <button
            onClick={() => {
              setFormError('');
              setIsFormOpen(true);
            }}
            className="rounded-xl bg-[#C96A2B] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:bg-[#B95D20] active:scale-[0.99]"
          >
            + Register Client
          </button>
        </div>

        {pageError && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {pageError}
          </div>
        )}

        <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:flex-row md:items-center md:justify-between">
          <input
            type="text"
            placeholder="Filter by name, email, or phone..."
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-[#C96A2B] focus:bg-white md:w-96"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <div className="text-sm text-slate-500">
            Database: <span className="font-medium text-slate-800">{customerList.length}</span> records
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          {isPageLoading ? (
            <div className="px-6 py-16 text-center text-sm text-slate-500">
              Loading clients...
            </div>
          ) : filteredData.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <p className="text-lg font-medium text-slate-700">No clients found</p>
              <p className="mt-2 text-sm text-slate-500">
                Try a different search term or add a new client.
              </p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="border-b border-slate-200 bg-slate-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                    Client Information
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                    Email Address
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-slate-400">
                    Phone Number
                  </th>
                  <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-slate-400">
                    Manage
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {filteredData.map((client) => (
                  <tr key={client.id} className="transition hover:bg-slate-50/60">
                    <td className="px-6 py-5 text-left">
                      <div className="text-sm font-semibold text-slate-800">
                        {client.name}
                      </div>
                      <div className="mt-1 text-xs text-slate-400">
                        ID: {client.id}
                      </div>
                    </td>

                    <td className="px-6 py-5 text-left text-sm text-slate-600">
                      {client.email}
                    </td>

                    <td className="px-6 py-5 text-left text-sm text-slate-600">
                      {client.phone}
                    </td>

                    <td className="px-6 py-5">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => openEditMode(client)}
                          className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-500 transition hover:bg-orange-50 hover:text-[#C96A2B]"
                          title="Edit"
                        >
                          ✏️
                        </button>

                        <button
                          onClick={() => {
                            setActiveTargetId(client.id);
                            setIsRemovalOpen(true);
                          }}
                          className="rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-500 transition hover:bg-red-50 hover:text-red-600"
                          title="Delete"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
              <h3 className="text-2xl font-semibold text-slate-800">
                {isEditing ? 'Update Client' : 'New Client'}
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Enter the client details below.
              </p>

              <form onSubmit={handleFormSubmit} className="mt-8 space-y-5 text-left">
                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.full_name}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#C96A2B]"
                    onChange={(e) =>
                      setFormData({ ...formData, full_name: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#C96A2B]"
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-500">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.phone}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-[#C96A2B]"
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                  />
                </div>

                {formError && (
                  <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {formError}
                  </div>
                )}

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeForm}
                    className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#C96A2B] py-3 text-sm font-semibold text-white transition hover:bg-[#B95D20]"
                  >
                    {isEditing ? 'Update Client' : 'Save Client'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {isRemovalOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-900/50 p-4 backdrop-blur-sm">
            <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-xl">
              <div className="mb-4 text-4xl">⚠️</div>
              <h3 className="text-xl font-semibold text-slate-800">
                Delete client?
              </h3>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                This action cannot be undone. The selected client record will be permanently removed.
              </p>

              <div className="mt-8 flex gap-3">
                <button
                  onClick={() => setIsRemovalOpen(false)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
                >
                  Cancel
                </button>

                <button
                  onClick={executeRemoval}
                  className="flex-1 rounded-xl bg-red-500 py-3 text-sm font-semibold text-white transition hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientsPage;