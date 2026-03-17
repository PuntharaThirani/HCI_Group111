import React, { useState } from 'react';
import RoomSelector from '../components/editor2D/RoomSelector';
import ColorPicker from '../components/editor2D/ColorPicker';
import RoomCanvas from '../components/editor2D/RoomCanvas';
import FurnitureSidebar from '../components/editor2D/FurnitureSidebar';
import { supabase } from '../supabaseClient';
import RoomViewer3D from '../components/3D/RoomViewer3D';

const Workspace = () => {
  const [roomData, setRoomData] = useState({
    roomType: 'Bedroom',
    shape: 'square',
    width: 400,
    length: 400,
  });

  const [wallColor, setWallColor] = useState('#ffffff');
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('2D');

  const saveToHistory = () => {
    setHistory((prev) => [...prev, [...items]].slice(-20));
  };

  const addFurniture = (furniture) => {
    saveToHistory();

    const newItem = {
      ...furniture,
      id: Date.now(),           // 2D logic සඳහා
      modelKey: furniture.id,   // 3D model filename සඳහා
      rotation: 0,
      x: roomData.width / 2,
      y: roomData.length / 2,
    };

    setItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
  };

  const updateItemProperty = (property, value) => {
    if (selectedItemId === null) return;

    saveToHistory();
    setItems((prev) =>
      prev.map((item) =>
        item.id === selectedItemId ? { ...item, [property]: value } : item
      )
    );
  };

  const updateItemPosition = (id, newX, newY) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, x: newX, y: newY } : item
      )
    );
  };

  const deleteItem = (id) => {
    saveToHistory();
    setItems((prev) => prev.filter((item) => item.id !== id));
    setSelectedItemId((prev) => (prev === id ? null : prev));
  };

  const undo = () => {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setItems(previousState);
    setHistory((prev) => prev.slice(0, -1));
    setSelectedItemId(null);
  };

  const resetCanvas = () => {
    if (window.confirm('Are you sure you want to clear the entire design?')) {
      saveToHistory();
      setItems([]);
      setSelectedItemId(null);
    }
  };

  const selectedItem = items.find((item) => item.id === selectedItemId);

  const saveDesign = async () => {
    setLoading(true);

    const { error } = await supabase.from('designs').insert([
      {
        content: {
          room_config: roomData,
          wall_color: wallColor,
          items,
          updated_at: new Date(),
        },
      },
    ]);

    setLoading(false);

    if (error) {
      alert('Error: ' + error.message);
    } else {
      alert('Design saved successfully! 🚀');
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen bg-[#F8FAFC] overflow-hidden font-sans selection:bg-orange-100">
      <nav className="flex items-center justify-between px-8 py-3 bg-white border-b border-slate-200 z-30 shadow-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-orange-600 p-2 rounded-lg text-white font-black text-xl transform group-hover:rotate-12 transition-transform">
              V
            </div>
            <h1 className="font-black text-xl tracking-tighter text-slate-800 uppercase italic">
              Visionary{' '}
              <span className="text-orange-600 font-light lowercase not-italic">
                interiors
              </span>
            </h1>
          </div>

          <div className="h-8 w-px bg-slate-200"></div>

          <div className="flex flex-col">
            <span className="text-[9px] font-black text-orange-600 uppercase tracking-[0.2em] leading-none mb-1">
              Lead Architect
            </span>
            <span className="text-[11px] font-bold text-slate-700 tracking-tight">
              Punthara Thirani (Member 03)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={undo}
            disabled={history.length === 0}
            className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-orange-600 disabled:opacity-30 transition-colors"
          >
            ↩ Undo
          </button>

          <div className="h-8 w-px bg-slate-200"></div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-800 leading-none">
                Group 111
              </p>
              <p className="text-[8px] font-bold text-emerald-500 uppercase">
                Online
              </p>
            </div>

            <div className="w-10 h-10 rounded-full border-2 border-orange-100 p-0.5 shadow-sm">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Punthara"
                alt="profile"
                className="rounded-full bg-slate-100"
              />
            </div>
          </div>
        </div>
      </nav>

      <main className="flex flex-1 overflow-hidden">
        <aside className="w-72 bg-white border-r border-slate-200 p-6 flex flex-col gap-10 overflow-y-auto scrollbar-hide">
          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
              Room Layouts
            </h4>
            <RoomSelector onRoomUpdate={(data) => setRoomData(data)} />
          </div>

          <div>
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">
              Wall Material
            </h4>
            <ColorPicker onColorChange={setWallColor} currentColor={wallColor} />
          </div>
        </aside>

        <section className="flex-1 relative bg-slate-100 flex flex-col">
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex bg-white p-1.5 rounded-2xl shadow-2xl z-20 border border-slate-100">
            <button
              onClick={() => setViewMode('2D')}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                viewMode === '2D'
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-100'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              🔶 2D Design
            </button>

            <button
              onClick={() => setViewMode('3D')}
              className={`flex items-center gap-2 px-8 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                viewMode === '3D'
                  ? 'bg-orange-600 text-white shadow-lg shadow-orange-100'
                  : 'text-slate-400 hover:text-slate-600'
              }`}
            >
              🧊 3D Visualization
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center p-20 overflow-auto">
            {viewMode === '2D' ? (
              <div className="bg-white p-16 rounded-3xl shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] relative border border-white">
                <RoomCanvas
                  wallColor={wallColor}
                  width={roomData.width}
                  height={roomData.length}
                  items={items}
                  onSelectItem={setSelectedItemId}
                  selectedItemId={selectedItemId}
                  onUpdatePosition={updateItemPosition}
                  onDeleteItem={deleteItem}
                />
              </div>
            ) : (
              <RoomViewer3D furnitureList={items} roomConfig={roomData} />
            )}
          </div>
        </section>

        <aside className="w-80 bg-white border-l border-slate-200 flex flex-col shadow-2xl z-20">
          <div className="p-6 border-b border-slate-100 h-[45%] overflow-y-auto scrollbar-hide">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
              Furniture Catalog
            </h4>
            <FurnitureSidebar onAddFurniture={addFurniture} />
          </div>

          <div className="p-8 h-[35%] overflow-y-auto bg-slate-50/30">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-8">
              Object Properties ⚙️
            </h4>

            {selectedItem ? (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase mb-2 block tracking-widest">
                      Width (cm)
                    </label>
                    <input
                      type="number"
                      value={selectedItem.width || 0}
                      onChange={(e) =>
                        updateItemProperty('width', parseInt(e.target.value) || 0)
                      }
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-black shadow-sm outline-orange-500"
                    />
                  </div>

                  <div className="flex-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase mb-2 block tracking-widest">
                      Height (cm)
                    </label>
                    <input
                      type="number"
                      value={selectedItem.height || 0}
                      onChange={(e) =>
                        updateItemProperty('height', parseInt(e.target.value) || 0)
                      }
                      className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-black shadow-sm outline-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-slate-400 uppercase mb-4 block tracking-widest">
                    Orientation: {selectedItem.rotation || 0}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={selectedItem.rotation || 0}
                    onChange={(e) =>
                      updateItemProperty('rotation', parseInt(e.target.value) || 0)
                    }
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
                  />
                </div>
              </div>
            ) : (
              <div className="text-center py-10 opacity-20 italic text-[10px] uppercase tracking-widest">
                Select an item to edit
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-slate-100 mt-auto flex flex-col gap-3">
            <button
              onClick={saveDesign}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 py-4 bg-orange-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.25em] hover:bg-orange-700 shadow-xl shadow-orange-200 transition-all active:scale-95 disabled:opacity-50"
            >
              {loading ? '💾 Synchronizing...' : 'Save Design Structure'}
            </button>

            <button
              onClick={resetCanvas}
              className="w-full py-3 bg-slate-50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-red-50 hover:text-red-500 transition-colors"
            >
              🗑 Clear Workspace
            </button>
          </div>
        </aside>
      </main>

      <footer className="px-8 py-3 bg-white border-t border-slate-200 flex justify-between items-center text-[9px] font-bold text-slate-400 tracking-widest">
        <div className="flex gap-8 items-center">
          <span className="text-emerald-500 flex items-center gap-2">● PROJECT_LIVE</span>
          <span className="opacity-30">|</span>
          <span>✢ HCI_GROUP_111</span>
          <span className="opacity-30">|</span>
          <span>MODIFICATIONS: {history.length}</span>
        </div>
        <div className="uppercase opacity-50 italic">Member 03 Portfolio Edition</div>
      </footer>
    </div>
  );
};

export default Workspace;3
