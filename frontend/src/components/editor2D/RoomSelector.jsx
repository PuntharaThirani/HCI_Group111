import React, { useState } from "react";
import {
  Bed, Sofa, Utensils, Briefcase, Bath,
  Square, RectangleHorizontal
} from "lucide-react";

const RoomSelector = ({ onRoomUpdate }) => {
  const [room, setRoom] = useState({
    roomType: "Bedroom",
    shape: "square",
    width: 300,
    length: 300,
  });

  const roomTypes = [
    { name: "Bedroom", icon: <Bed size={16} /> },
    { name: "Living Room", icon: <Sofa size={16} /> },
    { name: "Kitchen", icon: <Utensils size={16} /> },
    { name: "Office", icon: <Briefcase size={16} /> },
    { name: "Bathroom", icon: <Bath size={16} /> },
  ];

  const sizeOptions = [200, 250, 300, 350, 400, 450, 500, 600];

  const updateRoom = (changes) => {
    setRoom((prev) => {
      const updated = { ...prev, ...changes };

      if (updated.shape === "square") {
        if (changes.width) updated.length = changes.width;
        else if (changes.length) updated.width = changes.length;
        else if (changes.shape === "square") updated.length = updated.width;
      }

      onRoomUpdate(updated);
      return updated;
    });
  };

  const calculateArea = () => ((room.width * room.length) / 10000).toFixed(2);

  return (
    <div className="flex h-full flex-col gap-6 bg-white p-5">

      {/* Room Type */}
      <section>
        <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
          Room Type
        </h4>

        <div className="grid grid-cols-2 gap-2">
          {roomTypes.map((type) => (
            <button
              key={type.name}
              onClick={() => updateRoom({ roomType: type.name })}
              className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                room.roomType === type.name
                  ? "border-[#C96A2B] bg-orange-50 text-[#C96A2B]"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {type.icon}
              {type.name}
            </button>
          ))}
        </div>
      </section>

      {/* Shape */}
      <section>
        <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
          Shape
        </h4>

        <div className="flex gap-2">
          {[
            { id: "square", label: "Square", icon: <Square size={16} /> },
            { id: "rectangle", label: "Rectangle", icon: <RectangleHorizontal size={16} /> }
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => updateRoom({ shape: s.id })}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                room.shape === s.id
                  ? "border-[#C96A2B] bg-orange-50 text-[#C96A2B]"
                  : "border-slate-200 text-slate-600 hover:bg-slate-50"
              }`}
            >
              {s.icon}
              {s.label}
            </button>
          ))}
        </div>
      </section>

      {/* Dimensions */}
      <section className="space-y-4">
        {/* Width */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Width</span>
            <span className="text-xs font-medium text-[#C96A2B]">
              {room.width} cm
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => updateRoom({ width: size })}
                className={`rounded-lg border py-2 text-sm transition ${
                  room.width === size
                    ? "border-[#C96A2B] bg-[#C96A2B] text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Length */}
        <div className={room.shape === "square" ? "opacity-40 pointer-events-none" : ""}>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500">Length</span>
            <span className="text-xs font-medium text-[#C96A2B]">
              {room.length} cm
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {sizeOptions.map((size) => (
              <button
                key={size}
                onClick={() => updateRoom({ length: size })}
                className={`rounded-lg border py-2 text-sm transition ${
                  room.length === size
                    ? "border-[#C96A2B] bg-[#C96A2B] text-white"
                    : "border-slate-200 text-slate-600 hover:bg-slate-50"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <div className="mt-auto border-t border-slate-200 pt-4">
        <div className="rounded-xl bg-slate-900 p-4 text-white">
          <p className="text-xs text-slate-400 mb-1">Estimated Area</p>

          <div className="flex items-end justify-between">
            <span className="text-2xl font-light">
              {calculateArea()} <span className="text-sm">m²</span>
            </span>

            <span className="rounded bg-[#C96A2B] px-2 py-1 text-xs font-medium text-white">
              {room.roomType}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomSelector;