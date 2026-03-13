import React, { useState } from "react";

const RoomSelector = ({ onRoomUpdate }) => {
  // Initialize state with default values
  const [roomType, setRoomType] = useState("Bedroom");
  const [shape, setShape] = useState("square");
  const [width, setWidth] = useState(300);
  const [length, setLength] = useState(300);

  // Configuration for room categories
  const roomTypes = [
    "Bedroom",
    "Living Room",
    "Kitchen",
    "Dining Room",
    "Office",
    "Bathroom",
  ];

  // Standard measurement options in centimeters (10 options)
  const sizeOptions = [200, 250, 300, 350, 400, 450, 500, 550, 600, 700];

  /**
   * Updates specific room properties while maintaining existing state.
   * Then triggers the parent callback to update the 2D canvas.
   */
  const updateRoom = (newValues) => {
    const updated = {
      roomType,
      shape,
      width,
      length,
      ...newValues
    };

    // Update local state for UI feedback
    setRoomType(updated.roomType);
    setShape(updated.shape);
    setWidth(updated.width);
    setLength(updated.length);

    // Sync with parent Workspace component
    onRoomUpdate(updated);
  };

  return (
    <div className="flex flex-col gap-6 p-3 bg-white h-full overflow-y-auto scrollbar-hide">
      
      {/* SECTION 1: ROOM CATEGORY SELECTION */}
      <section>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">1. Room Type</h4>
        <div className="grid grid-cols-2 gap-2">
          {roomTypes.map((type) => (
            <button
              key={type}
              onClick={() => updateRoom({ roomType: type })}
              className={`p-2.5 rounded-lg border text-[11px] font-bold transition-all ${
                roomType === type
                  ? "bg-orange-50 border-orange-500 text-orange-600 shadow-sm"
                  : "border-slate-100 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 2: ARCHITECTURAL SHAPE */}
      <section>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">2. Shape</h4>
        <div className="flex gap-2">
          {["square", "rectangle"].map((s) => (
            <button
              key={s}
              onClick={() => updateRoom({ shape: s })}
              className={`flex-1 p-2.5 rounded-lg border text-[11px] font-bold capitalize transition-all ${
                shape === s
                  ? "bg-orange-50 border-orange-500 text-orange-600 shadow-sm"
                  : "border-slate-100 text-slate-500 hover:border-slate-300"
              }`}
            >
              {s === "square" ? "■ " : "▬ "} {s}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 3: WIDTH CONTROLS */}
      <section>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">3. Width (cm)</h4>
        <div className="grid grid-cols-5 gap-1.5">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => updateRoom({ width: size })}
              className={`py-2 border rounded-md text-[10px] font-mono transition-all ${
                width === size
                  ? "bg-orange-500 border-orange-600 text-white font-bold"
                  : "border-slate-100 text-slate-400 hover:bg-slate-50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

      {/* SECTION 4: LENGTH/HEIGHT CONTROLS */}
      <section>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">4. Length (cm)</h4>
        <div className="grid grid-cols-5 gap-1.5">
          {sizeOptions.map((size) => (
            <button
              key={size}
              onClick={() => updateRoom({ length: size })}
              className={`py-2 border rounded-md text-[10px] font-mono transition-all ${
                length === size
                  ? "bg-orange-500 border-orange-600 text-white font-bold"
                  : "border-slate-100 text-slate-400 hover:bg-slate-50"
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};

export default RoomSelector;