import React, { useState } from 'react';

const RoomCanvas = ({ wallColor, width, height, items, onSelectItem, selectedItemId, onUpdatePosition, onDeleteItem }) => {
  const [draggingId, setDraggingId] = useState(null);

  // Handle Dragging Logic
  const handleMouseMove = (e) => {
    if (!draggingId) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    // Boundary Check: Keep items inside the walls
    const boundedX = Math.max(0, Math.min(x, width));
    const boundedY = Math.max(0, Math.min(y, height));

    onUpdatePosition(draggingId, boundedX, boundedY);
  };

  const handleMouseUp = () => setDraggingId(null);

  return (
    <div className="flex items-center justify-center w-full h-full">
      {/* Main Room Container */}
      <div 
        className="relative shadow-2xl transition-all duration-300 overflow-visible cursor-crosshair"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
          backgroundColor: wallColor, 
          border: '12px solid #1e293b', 
          borderRadius: '4px',
          backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
          backgroundSize: '20px 20px' 
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            onMouseDown={(e) => {
              e.stopPropagation();
              onSelectItem(item.id);
              setDraggingId(item.id); 
            }}
            className={`absolute cursor-move group transition-shadow ${
              selectedItemId === item.id ? 'z-50' : 'z-10'
            }`}
            style={{
              left: `${item.x ?? width / 2}px`,
              top: `${item.y ?? height / 2}px`,
              width: `${item.width}px`,
              height: `${item.height}px`,
              transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg)`,
            }}
          >
            {/* Delete Button */}
            {selectedItemId === item.id && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteItem(item.id);
                }}
               className="absolute -top-3 -right-3 bg-rose-500 hover:bg-rose-600 text-white w-7 h-7 rounded-full flex items-center justify-center shadow-md hover:shadow-lg border-2 border-white z-50 transition-all duration-200 active:scale-90 text-[10px]"
                title="Remove Item"
              >
                ✕
              </button>
            )}

            {/* Selection Border */}
            {selectedItemId === item.id && (
              <div className="absolute -inset-1 border-2 border-orange-500 border-dashed rounded-sm pointer-events-none" />
            )}

            {/* THE IMAGE: Adjusted to fill the container */}
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-fill pointer-events-none select-none block" 
              // Changed object-contain to object-fill to ensure it matches the width/height exactly
            />
          </div>
        ))}

        {/* Labels */}
        <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/80 px-2">
          Width: {width}cm
        </div>
        <div className="absolute -left-16 top-1/2 -rotate-90 -translate-y-1/2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-white/80 px-2">
          Length: {height}cm
        </div>
      </div>
    </div>
  );
};

export default RoomCanvas;