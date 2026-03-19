import React, { useRef, useState } from 'react';
import { Trash2, RotateCw, Move } from 'lucide-react';

const WALL_THICKNESS = 12;

const RoomCanvas = ({
  wallColor,
  floorColor,
  width,
  height,
  items,
  onSelectItem,
  selectedItemId,
  onUpdatePosition,
  onDeleteItem,
  onRotateItem,
}) => {
  const [draggingId, setDraggingId] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef(null);

  const handleMouseDown = (e, item) => {
    e.stopPropagation();
    onSelectItem(item.id);
    setDraggingId(item.id);

    const rect = canvasRef.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    setDragOffset({
      x: mouseX - (item.x ?? width / 2),
      y: mouseY - (item.y ?? height / 2),
    });
  };

  const handleMouseMove = (e) => {
    if (!draggingId) return;

    const draggedItem = items.find((item) => item.id === draggingId);
    if (!draggedItem) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - dragOffset.x;
    const y = e.clientY - rect.top - dragOffset.y;

    const halfWidth = (draggedItem.width || 0) / 2;
    const halfHeight = (draggedItem.height || 0) / 2;

    const boundedX = Math.max(halfWidth, Math.min(x, width - halfWidth));
    const boundedY = Math.max(halfHeight, Math.min(y, height - halfHeight));

    onUpdatePosition(draggingId, Math.round(boundedX), Math.round(boundedY));
  };

  const handleMouseUp = () => setDraggingId(null);

  return (
    <div className="flex h-full w-full items-center justify-center overflow-auto bg-[#F1F0EE] p-8 lg:p-10">
      <div className="relative">
        {/* Top dimension label */}
        <div className="absolute -top-8 left-0 flex w-full items-center justify-between px-2 text-xs font-medium uppercase tracking-wider text-slate-400">
          <div className="h-px flex-1 bg-slate-300"></div>
          <span className="bg-[#F1F0EE] px-3">{width} cm</span>
          <div className="h-px flex-1 bg-slate-300"></div>
        </div>

        {/* Left dimension label */}
        <div className="absolute -left-10 top-0 flex h-full flex-col items-center justify-between py-2 text-xs font-medium uppercase tracking-wider text-slate-400 [writing-mode:vertical-lr] rotate-180">
          <div className="w-px flex-1 bg-slate-300"></div>
          <span className="bg-[#F1F0EE] py-3">{height} cm</span>
          <div className="w-px flex-1 bg-slate-300"></div>
        </div>

        {/* Room walls */}
        <div
          className="relative border border-slate-200 shadow-sm"
          style={{
            width: `${width + WALL_THICKNESS * 2}px`,
            height: `${height + WALL_THICKNESS * 2}px`,
            backgroundColor: wallColor,
            padding: `${WALL_THICKNESS}px`,
          }}
        >
          {/* Floor area */}
          <div
            ref={canvasRef}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            className="relative h-full w-full cursor-crosshair"
            style={{
              backgroundColor: floorColor,
              backgroundImage: `
                linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          >
            {items.map((item) => {
              const isSelected = selectedItemId === item.id;
              const isDragging = draggingId === item.id;

              return (
                <div
                  key={item.id}
                  onMouseDown={(e) => handleMouseDown(e, item)}
                  className={`absolute cursor-grab transition-all active:cursor-grabbing ${
                    isSelected ? 'z-50' : 'z-10'
                  }`}
                  style={{
                    left: `${item.x ?? width / 2}px`,
                    top: `${item.y ?? height / 2}px`,
                    width: `${item.width}px`,
                    height: `${item.height}px`,
                    transform: `translate(-50%, -50%) rotate(${item.rotation || 0}deg)`,
                  }}
                >
                  {isSelected && (
                    <>
                      <div className="absolute -inset-2 rounded-lg border-2 border-dashed border-[#C96A2B]" />

                      <div className="absolute -top-12 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-xl bg-slate-900 p-1 text-white shadow-lg">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteItem(item.id);
                          }}
                          className="rounded-lg p-2 transition hover:bg-rose-500"
                          title="Remove"
                        >
                          <Trash2 size={14} />
                        </button>

                        <div className="mx-1 h-4 w-px bg-slate-700"></div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onRotateItem) {
                              onRotateItem(item.id, (item.rotation || 0) + 90);
                            }
                          }}
                          className="rounded-lg p-2 transition hover:bg-[#C96A2B]"
                          title="Rotate"
                        >
                          <RotateCw size={14} />
                        </button>
                      </div>

                      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 rounded-md border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-500 shadow-sm">
                        {item.name}
                      </div>
                    </>
                  )}

                  <img
                    src={item.image}
                    alt={item.name}
                    draggable="false"
                    className={`pointer-events-none h-full w-full select-none object-fill transition-transform duration-200 ${
                      isDragging ? 'scale-105' : 'scale-100'
                    }`}
                    style={{
                      filter: isDragging
                        ? 'drop-shadow(0 10px 12px rgba(0,0,0,0.18))'
                        : 'none',
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-5 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Move size={12} />
            <span>Use mouse to arrange furniture</span>
          </div>
          <div className="font-mono">
            Viewport: {width} × {height}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCanvas;