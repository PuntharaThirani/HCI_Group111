import React from 'react';

const ColorPicker = ({ onColorChange, currentColor }) => {
  // Organized Color Groups for Walls
  const colorTable = {
    "Neutrals": [
      { name: 'Paper White', code: '#F8FAFC' },
      { name: 'Soft Gray', code: '#E2E8F0' },
      { name: 'Cool Slate', code: '#94A3B8' },
      { name: 'Charcoal', code: '#334155' },
    ],
    "Warm Tones": [
      { name: 'Champagne', code: '#FDF4FF' },
      { name: 'Sandstone', code: '#FDE68A' },
      { name: 'Sunset Clay', code: '#FCA5A5' },
      { name: 'Rose Quartz', code: '#FBCFE8' },
    ],
    "Nature/Cool": [
      { name: 'Mint Leaf', code: '#DCFCE7' },
      { name: 'Sage', code: '#86EFAC' },
      { name: 'Ocean Air', code: '#E0F2FE' },
      { name: 'Deep Sea', code: '#0369A1' },
    ]
  };

  return (
    <div className="flex flex-col gap-6">
      {/* SECTION 1: STRUCTURED COLOR TABLE */}
      <section>
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">
          Wall Paint Palette
        </h4>
        
        <div className="space-y-4">
          {Object.entries(colorTable).map(([group, colors]) => (
            <div key={group}>
              <p className="text-[9px] font-bold text-slate-300 uppercase mb-2 ml-1">{group}</p>
              <div className="grid grid-cols-4 gap-2 bg-slate-50/50 p-2 rounded-xl border border-slate-100">
                {colors.map((color) => (
                  <button
                    key={color.code}
                    onClick={() => onColorChange(color.code)}
                    title={color.name}
                    className={`aspect-square rounded-lg border-2 transition-all hover:scale-105 shadow-sm ${
                      currentColor === color.code ? 'border-orange-500 shadow-md ring-2 ring-orange-100' : 'border-white'
                    }`}
                    style={{ backgroundColor: color.code }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: ADVANCED CUSTOM RANGE */}
      <section className="mt-2">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
          Custom Wall Tint
        </h4>
        <div className="group flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-200 hover:border-orange-200 transition-colors">
          <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-slate-100 shadow-inner">
             <input
                type="color"
                value={currentColor}
                onChange={(e) => onColorChange(e.target.value)}
                className="absolute -top-2 -left-2 w-14 h-14 cursor-pointer"
              />
          </div>
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase">Active HEX</span>
            <span className="text-xs font-black text-slate-700 font-mono tracking-tighter">
              {currentColor?.toUpperCase()}
            </span>
          </div>
          <div className="ml-auto">
             <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ColorPicker;

