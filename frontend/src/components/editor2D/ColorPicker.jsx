import React from "react";

const ColorPicker = ({ onColorChange, currentColor }) => {
  const colorTable = {
    Neutrals: [
      { name: "Paper White", code: "#F8FAFC" },
      { name: "Soft Gray", code: "#E2E8F0" },
      { name: "Cool Slate", code: "#94A3B8" },
      { name: "Charcoal", code: "#334155" },
    ],
    "Warm Tones": [
      { name: "Champagne", code: "#FDF4FF" },
      { name: "Sandstone", code: "#FDE68A" },
      { name: "Sunset Clay", code: "#FCA5A5" },
      { name: "Rose Quartz", code: "#FBCFE8" },
    ],
    "Nature / Cool": [
      { name: "Mint Leaf", code: "#DCFCE7" },
      { name: "Sage", code: "#86EFAC" },
      { name: "Ocean Air", code: "#E0F2FE" },
      { name: "Deep Sea", code: "#0369A1" },
    ],
  };

  return (
    <div className="flex flex-col gap-6">
      <section>
        <div className="space-y-4">
          {Object.entries(colorTable).map(([group, colors]) => (
            <div key={group}>
              <p className="mb-2 ml-1 text-xs font-medium text-slate-400">
                {group}
              </p>

              <div className="grid grid-cols-4 gap-2 rounded-xl border border-slate-200 bg-slate-50 p-2">
                {colors.map((color) => {
                  const active = currentColor === color.code;

                  return (
                    <button
                      key={color.code}
                      type="button"
                      aria-label={color.name}
                      onClick={() => onColorChange(color.code)}
                      title={color.name}
                      className={`aspect-square rounded-lg border transition-transform hover:scale-105 ${
                        active
                          ? "border-[#C96A2B] ring-2 ring-orange-100"
                          : "border-white"
                      }`}
                      style={{ backgroundColor: color.code }}
                    />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h4 className="mb-3 text-xs font-medium uppercase tracking-wider text-slate-400">
          Custom Color
        </h4>

        <div className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-3 transition-colors hover:border-[#C96A2B]/30">
          <div className="relative h-10 w-10 overflow-hidden rounded-lg border border-slate-200 shadow-inner">
            <input
              type="color"
              value={currentColor}
              onChange={(e) => onColorChange(e.target.value)}
              className="absolute -left-2 -top-2 h-14 w-14 cursor-pointer"
            />
          </div>

          <div className="flex flex-col">
            <span className="text-xs font-medium text-slate-400">
              Active HEX
            </span>
            <span className="font-mono text-sm text-slate-700">
              {currentColor?.toUpperCase()}
            </span>
          </div>

          <div className="ml-auto h-2 w-2 rounded-full bg-[#C96A2B]"></div>
        </div>
      </section>
    </div>
  );
};

export default ColorPicker;