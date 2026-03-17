import React, { useState } from 'react';
import Sidebar from '../../components/admin/Sidebar';

const ClientsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // ✅ අලුතින් එකතු කළ States
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState(null);

  // 👥 පාරිභෝගික දත්ත (setClients එකතු කළා මකා දැමීම සිදු කිරීමට)
  const [clients, setClients] = useState([
    { id: 1, name: 'Sarah Jenkins', email: 'sarah.j@email.com', projects: 3, status: 'Active', phone: '+94 77 123 4567', joined: 'Jan 2024' },
    { id: 2, name: 'John Doe', email: 'john.doe@email.com', projects: 1, status: 'Inactive', phone: '+94 71 987 6543', joined: 'Feb 2024' },
    { id: 3, name: 'Michael Perera', email: 'm.perera@email.com', projects: 5, status: 'Active', phone: '+94 75 555 1234', joined: 'Dec 2023' },
    { id: 4, name: 'Emily Watson', email: 'emily.w@email.com', projects: 2, status: 'Active', phone: '+94 70 111 2222', joined: 'Mar 2024' },
  ]);

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ✅ මකා දැමීමේ Function එක
  const handleDelete = () => {
    setClients(clients.filter(c => c.id !== selectedClientId));
    setIsDeleteModalOpen(false);
    setSelectedClientId(null);
  };

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      <Sidebar activePage="customers" /> 

      <main className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 text-left">Client Directory</h1>
            <p className="text-sm text-gray-500 font-medium text-left">Manage your customer relationships and contact details</p>
          </div>
          <button className="bg-[#D97706] text-white px-6 py-3 rounded-2xl font-bold hover:bg-[#B45309] transition-all shadow-lg shadow-orange-500/20 active:scale-95">
            + Add New Client
          </button>
        </div>

        {/* Search & Statistics Bar */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-gray-100 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <span className="absolute left-4 top-2.5 text-gray-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              className="w-full pl-11 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-500/10 text-black outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-6">
             <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Clients</p>
                <p className="text-lg font-bold text-gray-800">{clients.length}</p>
             </div>
             <div className="w-px h-8 bg-gray-100"></div> 
             <div className="text-center">
                <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Active Now</p>
                <p className="text-lg font-bold text-emerald-500">{clients.filter(c => c.status === 'Active').length}</p>
             </div>
          </div>
        </div>

        {/* Clients Table */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden text-black">
          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Client Name</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Contact Info</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Engagement</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-8 py-5 text-[10px] font-bold text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredClients.map(client => (
                <tr key={client.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-[#D97706] font-bold text-sm uppercase border-2 border-white shadow-sm">
                        {client.name.charAt(0)}
                      </div>
                      <div className="text-left">
                        <span className="font-bold text-gray-800 text-sm block">{client.name}</span>
                        <span className="text-[10px] text-gray-400 font-bold uppercase">Since {client.joined}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-left">
                    <p className="text-sm text-gray-700 font-medium">{client.email}</p>
                    <p className="text-[10px] text-gray-400 font-bold">{client.phone}</p>
                  </td>
                  <td className="px-8 py-5 text-left">
                    <span className="text-sm font-bold text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                      {client.projects} Projects
                    </span>
                  </td>
                  <td className="px-8 py-5 text-left">
                    <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                      client.status === 'Active' 
                      ? 'bg-emerald-100 text-emerald-600 border border-emerald-200' 
                      : 'bg-gray-100 text-gray-400 border border-gray-200'
                    }`}>
                      {client.status}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 hover:bg-orange-50 rounded-lg text-gray-400 hover:text-[#D97706] transition-colors" title="Edit">
                        ✏️
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedClientId(client.id);
                          setIsDeleteModalOpen(true);
                        }}
                        className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500 transition-colors" 
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
        </div>

        {/* ✅ Confirmation Modal UI */}
        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-[2.5rem] p-8 max-w-sm w-full shadow-2xl border border-gray-100 transform animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-2xl mb-6 mx-auto">⚠️</div>
              <h3 className="text-xl font-bold text-gray-800 text-center mb-2 text-black">Are you sure?</h3>
              <p className="text-sm text-gray-500 text-center mb-8">This action cannot be undone. This client will be permanently removed.</p>
              <div className="flex gap-3">
                <button onClick={() => setIsDeleteModalOpen(false)} className="flex-1 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-50 transition-colors">Cancel</button>
                <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-500/20">Yes, Delete</button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ClientsPage;