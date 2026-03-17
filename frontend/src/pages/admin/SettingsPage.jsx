import React, { useState } from "react";
import Sidebar from "../../components/admin/Sidebar";

// Categories සහ Colors සඳහා මූලික දත්ත
const CATS = ["Seating", "Tables", "Bedroom", "Storage"];
const BLANK = { name: "", category: "Seating", color: "#D97706", width: 80, height: 80 };

export default function SettingsPage() {
  const [items, setItems] = useState([
    { id: 1, name: 'Velvet Armchair', category: 'Seating', color: '#4B5563', width: 85, height: 90 },
    { id: 2, name: 'Oak Dining Table', category: 'Tables', color: '#D97706', width: 180, height: 75 }
  ]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState(BLANK);
  const [adding, setAdding] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const handleAdd = () => {
    if (!form.name.trim()) return showToast("Please enter a name");
    const newItem = { ...form, id: Date.now() };
    setItems([newItem, ...items]);
    setForm(BLANK);
    setAdding(false);
    showToast("Furniture item added!");
  };

  const handleDelete = (id) => {
    if (window.confirm("Remove this item from catalog?")) {
      setItems(items.filter(i => i.id !== id));
      showToast("Item removed.");
    }
  };

  const filtered = items.filter(i => 
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* 1. ඔයාගේ පවතින Sidebar එක භාවිතා කිරීම */}
      <Sidebar activePage="settings" />

      <main className="flex-1 ml-64 p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Furniture Catalog</h1>
            <p className="text-sm text-gray-500">Manage your furniture assets and dimensions</p>
          </div>
          <button 
            onClick={() => setAdding(!adding)}
            className="bg-[#D97706] text-white px-6 py-2.5 rounded-xl font-bold hover:bg-[#B45309] transition-all shadow-sm"
          >
            {adding ? "✕ Close Form" : "+ Add Furniture"}
          </button>
        </div>

        {/* 2. Add Item Form (Dashboard Style) */}
        {adding && (
          <div className="bg-white p-8 rounded-4xl border border-gray-100 shadow-sm mb-10 animate-in fade-in slide-in-from-top-4">
            <h2 className="text-lg font-bold text-gray-800 mb-6">New Asset Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Item Name</label>
                <input 
                  className="bg-gray-50 border-none rounded-xl p-3 text-sm focus:ring-2 focus:ring-orange-500/20 outline-none text-black"
                  placeholder="e.g. Modern Sofa"
                  value={form.name}
                  onChange={e => setForm({...form, name: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Category</label>
                <select 
                  className="bg-gray-50 border-none rounded-xl p-3 text-sm outline-none text-black"
                  value={form.category}
                  onChange={e => setForm({...form, category: e.target.value})}
                >
                  {CATS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Width (cm)</label>
                <input 
                  type="number"
                  className="bg-gray-50 border-none rounded-xl p-3 text-sm text-black"
                  value={form.width}
                  onChange={e => setForm({...form, width: e.target.value})}
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Color Hex</label>
                <div className="flex gap-2">
                  <input 
                    type="color"
                    className="w-11 h-11 rounded-lg border-none cursor-pointer bg-transparent"
                    value={form.color}
                    onChange={e => setForm({...form, color: e.target.value})}
                  />
                  <input 
                    className="flex-1 bg-gray-50 border-none rounded-xl p-3 text-sm text-black"
                    value={form.color}
                    onChange={e => setForm({...form, color: e.target.value})}
                  />
                </div>
              </div>
            </div>
            <button 
              onClick={handleAdd}
              className="mt-8 bg-[#D97706] text-white px-8 py-3 rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Save Asset
            </button>
          </div>
        )}

        {/* 3. Filter & List Section */}
        <div className="bg-white rounded-4xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex items-center justify-between">
             <div className="relative w-72">
                <span className="absolute left-4 top-2.5 text-gray-400">🔍</span>
                <input 
                  placeholder="Search assets..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-orange-500/10 text-black"
                  onChange={e => setSearch(e.target.value)}
                />
             </div>
             <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{filtered.length} Items Total</span>
          </div>

          <table className="w-full text-left">
            <thead className="bg-gray-50/50">
              <tr>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Name</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Category</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Size</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Theme Color</th>
                <th className="px-8 py-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map(item => (
                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-4 font-bold text-gray-800 text-sm">{item.name}</td>
                  <td className="px-8 py-4">
                    <span className="bg-orange-50 text-[#D97706] px-3 py-1 rounded-lg text-[10px] font-bold uppercase">
                      {item.category}
                    </span>
                  </td>
                  <td className="px-8 py-4 text-sm text-gray-500">{item.width}x{item.height} cm</td>
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full shadow-sm" style={{ background: item.color }} />
                      <span className="text-xs font-mono text-gray-400">{item.color}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4">
                    <button 
                      onClick={() => handleDelete(item.id)}
                      className="text-gray-300 hover:text-red-500 transition-colors"
                    >
                      🗑️
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="fixed bottom-10 right-10 bg-gray-900 text-white px-6 py-3 rounded-2xl shadow-2xl animate-bounce">
            {toast}
          </div>
        )}
      </main>
    </div>
  );
}