import React, { useState } from 'react';
import RoomSelector from '../components/editor2D/RoomSelector';
import ColorPicker from '../components/editor2D/ColorPicker';
import RoomCanvas from '../components/editor2D/RoomCanvas';
import FurnitureSidebar from '../components/editor2D/FurnitureSidebar';
import { supabase } from '../supabaseClient';

const Workspace = () => {
  const [selectedRoom, setSelectedRoom] = useState('square');
  const [wallColor, setWallColor] = useState('#ffffff');
  const [items, setItems] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loading, setLoading] = useState(false);

  const addFurniture = (furniture) => {
    const newItem = { ...furniture, id: Date.now(), rotation: 0 };
    setItems([...items, newItem]);
    setSelectedItemId(newItem.id);
  };

  const updateItemProperty = (property, value) => {
    setItems(items.map(item => item.id === selectedItemId ? { ...item, [property]: value } : item));
  };

  const selectedItem = items.find(item => item.id === selectedItemId);

  const saveDesign = async () => {
    setLoading(true);
    const { error } = await supabase.from('designs').insert([{ 
      content: { room_shape: selectedRoom, wall_color: wallColor, items: items, updated_at: new Date() } 
    }]);
    setLoading(false);
    if (error) alert(error.message); else alert("Design saved successfully! 🚀");
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F8FAFC] overflow-hidden font-sans selection:bg-orange-100">
      
      {/* 1. HEADER */}
      <nav className="flex items-center justify-between px-8 py-4 bg-white border-b border-slate-200 z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-orange-600 p-2 rounded-lg text-white font-black text-xl transform group-hover:rotate-12 transition-transform">V</div>
            <h1 className="font-black text-xl tracking-tighter text-slate-800 uppercase italic">Visionary <span className="text-orange-600 font-light lowercase not-italic">interiors</span></h1>
          </div>
          <div className="h-8 w-[px] bg-slate-200"></div>
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">Project: Mid-Century Modern Living ✏️</span>
        </div>

        <div className="flex items-center gap-4">
          <button onClick={saveDesign} className="flex items-center gap-2 px-6 py-2.5 bg-orange-600 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-orange-700 shadow-lg shadow-orange-200 transition-all active:scale-95">
            {loading ? 'Processing...' : 'Save Design'}
          </button>
          <div className="w-10 h-10 rounded-full border-2 border-white shadow-md overflow-hidden bg-slate-200">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Punthara" alt="profile" />
          </div>
        </div>
      </nav>

      <main className="flex flex-1 overflow-hidden">
        
        {/* 2. LEFT SIDEBAR */}
        <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-10 overflow-y-auto">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Room Layouts</h4>
            <RoomSelector onSelect={setSelectedRoom} />
          </div>
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Wall Material</h4>
            <ColorPicker onColorChange={setWallColor} />
          </div>
        </aside>

        {/* 3. CENTER EDITOR */}
        <section className="flex-1 relative bg-slate-100 flex flex-col">
          {/* Toggle Controls */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex bg-white p-1.5 rounded-2xl shadow-2xl z-20 border border-slate-100">
            <button className="flex items-center gap-2 px-8 py-2.5 bg-orange-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-100">🔶 2D Design</button>
            <button className="flex items-center gap-2 px-8 py-2.5 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest hover:text-slate-600">🧊 3D Visualization</button>
          </div>

          <div className="flex-1 flex items-center justify-center p-20 overflow-auto">
            <div className="bg-white p-32 rounded-[4rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] relative border border-white">
              <RoomCanvas wallColor={wallColor} shape={selectedRoom} items={items} onSelectItem={setSelectedItemId} selectedItemId={selectedItemId} />
            </div>
          </div>
        </section>

        {/* 4. RIGHT SIDEBAR */}
        <aside className="w-80 bg-white border-l border-slate-200 flex flex-col shadow-2xl z-20">
          {/* Catalog */}
          <div className="p-6 border-b border-slate-100 h-1/2 overflow-y-auto scrollbar-hide">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Furniture Catalog</h4>
             <FurnitureSidebar onAddFurniture={addFurniture} />
          </div>

          {/* Properties */}
          <div className="p-8 h-1/2 overflow-y-auto bg-slate-50/30">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">Object Properties ⚙️</h4>
             {selectedItem ? (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                   <div className="flex gap-4">
                      <div className="flex-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase mb-2 block tracking-widest">Width (cm)</label>
                        <input type="number" value={selectedItem.width} onChange={(e) => updateItemProperty('width', parseInt(e.target.value))} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-black shadow-sm outline-orange-500" />
                      </div>
                      <div className="flex-1">
                        <label className="text-[9px] font-bold text-slate-400 uppercase mb-2 block tracking-widest">Height (cm)</label>
                        <input type="number" value={selectedItem.height} onChange={(e) => updateItemProperty('height', parseInt(e.target.value))} className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-black shadow-sm outline-orange-500" />
                      </div>
                   </div>
                   <div>
                      <label className="text-[9px] font-bold text-slate-400 uppercase mb-4 block tracking-widest">Orientation: {selectedItem.rotation || 0}°</label>
                      <input type="range" min="0" max="360" value={selectedItem.rotation || 0} onChange={(e) => updateItemProperty('rotation', parseInt(e.target.value))} className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600" />
                   </div>
                   <button onClick={() => setSelectedItemId(null)} className="w-full py-3 bg-slate-100 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-slate-200 transition-colors">Deselect Item</button>
                </div>
             ) : (
                <div className="text-center py-20 opacity-20">
                   <p className="text-[10px] font-black uppercase tracking-widest">Click object to configure</p>
                </div>
             )}
          </div>
        </aside>
      </main>

      <footer className="px-8 py-3 bg-white border-t border-slate-200 flex justify-between items-center text-[9px] font-bold text-slate-400 tracking-widest">
         <div className="flex gap-8">
            <span className="text-emerald-500 flex items-center gap-2">● SYSTEM READY</span>
            <span>✢ GRID: 10CM</span>
            <span>📐 METRIC UNIT</span>
         </div>
         <div className="uppercase opacity-50">Visionary Interiors Workspace v2.4</div>
      </footer>
    </div>
  );
};

export default Workspace;