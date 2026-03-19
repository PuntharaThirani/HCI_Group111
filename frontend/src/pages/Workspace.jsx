import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import RoomSelector from '../components/editor2D/RoomSelector';
import ColorPicker from '../components/editor2D/ColorPicker';
import RoomCanvas from '../components/editor2D/RoomCanvas';
import FurnitureSidebar from '../components/editor2D/FurnitureSidebar';
import { supabase } from '../supabaseClient';
import RoomViewer3D from '../components/3D/RoomViewer3D';

const Workspace = () => {
  const [searchParams] = useSearchParams();

  const [roomData, setRoomData] = useState({
    roomType: 'Bedroom',
    shape: 'square',
    width: 400,
    length: 400,
  });

  const [wallColor, setWallColor] = useState('#2C1C14');
  const [floorColor, setFloorColor] = useState('#F8FAFC');
  const [items, setItems] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState('2D');
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('success');
  const [currentDesignId, setCurrentDesignId] = useState(null);
  const [designName, setDesignName] = useState('Untitled design');

  // Load existing design if ID is in URL
  useEffect(() => {
    const designId = searchParams.get('id');
    if (!designId) return;

    const loadDesign = async () => {
      const { data, error } = await supabase
        .from('customer_designs')
        .select('*')
        .eq('id', designId)
        .single();

      if (error || !data) return;

      setCurrentDesignId(data.id);
      if (data.name) setDesignName(data.name);

      const content = data.content;
      if (content?.room_config) setRoomData(content.room_config);
      if (content?.wall_color) setWallColor(content.wall_color);
      if (content?.floor_color) setFloorColor(content.floor_color);
      if (content?.items) setItems(content.items);
    };

    loadDesign();
  }, []);

  const saveToHistory = () => {
    setHistory((prev) =>
      [...prev, JSON.parse(JSON.stringify(items))].slice(-20)
    );
  };

  const addFurniture = (furniture) => {
    saveToHistory();
    const newItem = {
      ...furniture,
      id: crypto.randomUUID(),
      modelKey: furniture.id,
      rotation: 0,
      x: roomData.width / 2,
      y: roomData.length / 2,
    };
    setItems((prev) => [...prev, newItem]);
    setSelectedItemId(newItem.id);
    setShowClearConfirm(false);
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
    setShowClearConfirm(false);
  };

  const confirmResetCanvas = () => {
    saveToHistory();
    setItems([]);
    setSelectedItemId(null);
    setShowClearConfirm(false);
    setStatusType('success');
    setStatusMessage('Workspace cleared successfully.');
  };

  const selectedItem = items.find((item) => item.id === selectedItemId);

  const saveDesign = async (status = 'IN-PROGRESS') => {
    setLoading(true);
    setStatusMessage('');

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setStatusType('error');
      setStatusMessage('You must be logged in to save a design.');
      setLoading(false);
      return;
    }

    const designPayload = {
      user_id: user.id,
      name: designName,
      room: roomData.roomType,
      status: status,
      items: items.length,
      content: {
        room_config: roomData,
        wall_color: wallColor,
        floor_color: floorColor,
        items,
        updated_at: new Date(),
      },
    };

    let error;

    if (currentDesignId) {
      ({ error } = await supabase
        .from('customer_designs')
        .update(designPayload)
        .eq('id', currentDesignId));
    } else {
      const { data, error: insertError } = await supabase
        .from('customer_designs')
        .insert([designPayload])
        .select()
        .single();

      error = insertError;
      if (data) setCurrentDesignId(data.id);
    }

    setLoading(false);

    if (error) {
      setStatusType('error');
      setStatusMessage(`Error: ${error.message}`);
    } else {
      setStatusType('success');
      setStatusMessage(
        status === 'COMPLETED'
          ? 'Design marked as complete!'
          : 'Design saved successfully.'
      );
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-[#EEF1F4] font-sans text-slate-900">
      {/* Top Bar */}
      <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-[#C96A2B] px-3 py-2 text-sm font-bold text-white">
              V
            </div>
            <div>
              <h1 className="text-lg font-semibold uppercase tracking-tight text-slate-900">
                Visionary<span className="font-light">Interiors</span>
              </h1>
              <p className="text-xs font-medium text-slate-400">
                Current project: {designName}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={undo}
            disabled={history.length === 0}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-[#C96A2B] hover:text-[#C96A2B] disabled:opacity-40"
          >
            Undo
          </button>

          <button
            onClick={() => setShowClearConfirm((prev) => !prev)}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-600 transition hover:border-red-300 hover:text-red-500"
          >
            Clear
          </button>

          <button
            onClick={() => saveDesign('IN-PROGRESS')}
            disabled={loading}
            className="rounded-xl bg-[#C96A2B] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-orange-200 transition hover:bg-[#B95D20] disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save design'}
          </button>
        </div>
      </header>

      {/* Inline status / confirm area */}
      {(statusMessage || showClearConfirm) && (
        <div className="border-b border-slate-200 bg-white px-6 py-3">
          {showClearConfirm ? (
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
              <p className="text-sm text-red-700">
                Are you sure you want to clear the entire design?
              </p>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-600"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmResetCanvas}
                  className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white"
                >
                  Clear workspace
                </button>
              </div>
            </div>
          ) : (
            <div
              className={`rounded-xl px-4 py-3 text-sm ${
                statusType === 'error'
                  ? 'border border-red-200 bg-red-50 text-red-700'
                  : 'border border-emerald-200 bg-emerald-50 text-emerald-700'
              }`}
            >
              {statusMessage}
            </div>
          )}
        </div>
      )}

      {/* Main Layout */}
      <main className="grid flex-1 grid-cols-[280px_1fr_320px] overflow-hidden">
        {/* Left Sidebar */}
        <aside className="overflow-y-auto border-r border-slate-200 bg-white">
  <div className="space-y-6 p-5">

    {/* Project Info */}
    <PanelBlock title="Project Info">
      <div>
        <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
          Project Name
        </label>
        <input
          type="text"
          value={designName}
          onChange={(e) => setDesignName(e.target.value)}
          placeholder="Enter project name"
          className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-800 outline-none transition focus:border-[#C96A2B] focus:ring-2 focus:ring-orange-500/20"
        />
      </div>
    </PanelBlock>

    <PanelBlock title="Room Setup">
              <RoomSelector onRoomUpdate={(data) => setRoomData(data)} />
            </PanelBlock>

            <PanelBlock title="Wall Finish">
              <ColorPicker
                onColorChange={setWallColor}
                currentColor={wallColor}
              />
            </PanelBlock>

            <PanelBlock title="Floor Finish">
              <ColorPicker
                onColorChange={setFloorColor}
                currentColor={floorColor}
              />
            </PanelBlock>
          </div>
        </aside>

        {/* Center Workspace */}
        <section className="relative flex flex-col overflow-hidden bg-[#EEF1F4]">
          <div className="flex items-center justify-center border-b border-slate-200 bg-white px-6 py-4">
            <div className="flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
              <button
                onClick={() => setViewMode('2D')}
                className={`rounded-xl px-6 py-2.5 text-sm font-medium transition ${
                  viewMode === '2D'
                    ? 'bg-[#C96A2B] text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                2D Editor
              </button>

              <button
                onClick={() => setViewMode('3D')}
                className={`rounded-xl px-6 py-2.5 text-sm font-medium transition ${
                  viewMode === '3D'
                    ? 'bg-[#C96A2B] text-white shadow-md'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                3D View
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-auto p-6">
            <div className="flex h-full min-h-160 items-center justify-center rounded-2xl bg-[#E9EDF1] p-4 lg:p-6">
              {viewMode === '2D' ? (
                <RoomCanvas
                  wallColor={wallColor}
                  floorColor={floorColor}
                  width={roomData.width}
                  height={roomData.length}
                  items={items}
                  onSelectItem={setSelectedItemId}
                  selectedItemId={selectedItemId}
                  onUpdatePosition={updateItemPosition}
                  onDeleteItem={deleteItem}
                />
              ) : (
                <div className="h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-white">
                  <RoomViewer3D
                    furnitureList={items}
                    roomConfig={roomData}
                    wallColor={wallColor}
                    floorColor={floorColor}
                    onUpdatePosition={updateItemPosition}
                  />
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="overflow-y-auto border-l border-slate-200 bg-white">
          <div className="border-b border-slate-100 p-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Furniture Library
            </h3>
          </div>

          <div className="p-5">
            <FurnitureSidebar onAddFurniture={addFurniture} />
          </div>

          <div className="mt-4 border-t border-slate-200 p-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-slate-400">
              Selected Object
            </h3>
          </div>

          <div className="p-5 pt-0">
            {selectedItem ? (
              <div className="space-y-5">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    Item Name
                  </p>
                  <p className="mt-2 text-sm text-slate-800">
                    {selectedItem.name}
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                        Width
                      </label>
                      <input
                        type="number"
                        value={selectedItem.width || 0}
                        onChange={(e) =>
                          updateItemProperty(
                            'width',
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-[#C96A2B]"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-xs font-medium uppercase tracking-wider text-slate-400">
                        Height
                      </label>
                      <input
                        type="number"
                        value={selectedItem.height || 0}
                        onChange={(e) =>
                          updateItemProperty(
                            'height',
                            parseInt(e.target.value) || 0
                          )
                        }
                        className="w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-800 outline-none focus:border-[#C96A2B]"
                      />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                  <label className="mb-3 block text-xs font-medium uppercase tracking-wider text-slate-400">
                    Rotation: {selectedItem.rotation || 0}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={selectedItem.rotation || 0}
                    onChange={(e) =>
                      updateItemProperty(
                        'rotation',
                        parseInt(e.target.value) || 0
                      )
                    }
                    className="w-full accent-[#C96A2B]"
                  />
                </div>
              </div>
            ) : (
              <div className="flex min-h-55 items-center justify-center rounded-xl border border-dashed border-slate-200 bg-white text-center">
                <div>
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    No Item Selected
                  </p>
                  <p className="mt-2 text-sm text-slate-500">
                    Select a furniture item to edit its properties.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Buttons */}
          <div className="border-t border-slate-200 p-5 space-y-3">
            <button
              onClick={() => saveDesign('IN-PROGRESS')}
              disabled={loading}
              className="w-full rounded-xl bg-[#C96A2B] py-3 text-sm font-semibold text-white transition hover:bg-[#B95D20] disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save design'}
            </button>

            <button
              onClick={() => saveDesign('COMPLETED')}
              disabled={loading}
              className="w-full rounded-xl bg-emerald-600 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : '✓ Mark as Complete'}
            </button>

            <button
              onClick={() => setShowClearConfirm(true)}
              className="w-full rounded-xl bg-slate-100 py-3 text-sm font-medium text-slate-600 transition hover:bg-red-50 hover:text-red-600"
            >
              Clear workspace
            </button>
          </div>
        </aside>
      </main>
    </div>
  );
};

const PanelBlock = ({ title, children }) => (
  <section className="rounded-2xl border border-slate-200 bg-[#FAFBFC] p-4 shadow-sm">
    <h3 className="mb-4 text-xs font-medium uppercase tracking-wider text-slate-400">
      {title}
    </h3>
    {children}
  </section>
);

export default Workspace;
