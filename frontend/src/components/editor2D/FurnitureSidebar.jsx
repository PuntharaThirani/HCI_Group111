import React from 'react';

// Use underscore instead of space in the folder name
const images = import.meta.glob('../../assets/furniture_images/*.{png,jpg,jpeg,svg}', { 
  eager: true, 
  import: 'default' 
});

const getImageUrl = (fileName) => {
  // Use the exact new folder name here
  const path = `../../assets/furniture_images/${fileName}`;
  return images[path] || `https://placehold.co/100x100?text=${fileName}`;
};

const furnitureLibrary = [
  // --- LIVING ROOM ---
  { id: 'sofa-2', category: 'Living Room', name: '2-Seater Sofa', image: getImageUrl('2-Seat_sofa.png'), width: 200, height: 120 },
  { id: 'sofa-3', category: 'Living Room', name: '3-Seater Sofa', image: getImageUrl('3-Seat_sofa.png'), width: 300, height: 150 },
  { id: 'coffee-table', category: 'Living Room', name: 'Coffee Table', image: getImageUrl('Coffee_table.png'), width: 150, height: 80 },
  { id: 'tv-stand', category: 'Living Room', name: 'TV Console', image: getImageUrl('TV _console.png'), width: 280, height: 160 },
 
 
  // --- DINING & KITCHEN ---
  { id: 'dining-rect', category: 'Kitchen', name: 'Dining table & chair', image: getImageUrl('Dining_table&chair.png'), width: 450, height: 190 },
  { id: 'kitchen-island', category: 'Kitchen', name: 'Kitchen Island', image: getImageUrl('kitchen_island.png'), width: 220, height: 170 },
  { id: 'fridge', category: 'Kitchen', name: 'Refrigerator', image: getImageUrl('Fridge.png'), width: 250, height: 200 },
  { id: 'cooktop', category: 'Kitchen', name: 'Cooktop/Oven', image: getImageUrl('Cooktop.png'), width: 100, height: 100 },

  // --- BEDROOM ---
  { id: 'Bed', category: 'Bedroom', name: 'Bed', image: getImageUrl('Bed.png'), width: 300, height: 200 },
  { id: 'wardrobe', category: 'Bedroom', name: 'Wardrobe', image: getImageUrl('Wardrobe.png'), width: 220, height: 120 },
  { id: 'nightstand', category: 'Bedroom', name: 'Nightstand', image: getImageUrl('Nightstand.png'), width: 100, height: 50 },
  { id: 'dressing-table', category: 'Bedroom', name: 'Dressing Table', image: getImageUrl('Dressing table.png'), width: 400, height: 200 },

  // --- BATHROOM ---
  { id: 'bathtub', category: 'Bathroom', name: 'Bathtub', image: getImageUrl('Bathtub.png'), width: 360, height: 175 },
  { id: 'wash-basin', category: 'Bathroom', name: 'Wash Basin', image: getImageUrl('Wash basin.png'), width: 350, height: 145 },
  { id: 'toilet', category: 'Bathroom', name: 'Toilet Seat', image: getImageUrl('Toilet.png'), width: 345, height: 165 },
];

const FurnitureSidebar = ({ onAddFurniture }) => {
  const categories = [...new Set(furnitureLibrary.map(item => item.category))];

  return (
    <div className="flex flex-col h-full bg-white">
      {categories.map((cat) => (
        <div key={cat} className="mb-8 px-4">
          <h5 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 border-b pb-2">
            {cat}
          </h5>
          <div className="grid grid-cols-1 gap-3">
            {furnitureLibrary
              .filter(item => item.category === cat)
              .map((item) => (
                <div 
                  key={item.id}
                  onClick={() => onAddFurniture(item)}
                  className="group flex items-center gap-4 p-3 rounded-xl border border-slate-50 hover:border-orange-200 hover:shadow-md transition-all cursor-pointer bg-slate-50/50 hover:bg-white"
                >
                  <div className="w-16 h-16 bg-white rounded-lg p-2 flex items-center justify-center shadow-sm">
                    {/* Displaying the image */}
                    <img src={item.image} alt={item.name} className="max-w-full max-h-full object-contain" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-[10px] font-bold text-slate-700 uppercase leading-none mb-1">{item.name}</p>
                    <p className="text-[8px] text-slate-400">{item.width} x {item.height} cm</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default FurnitureSidebar;