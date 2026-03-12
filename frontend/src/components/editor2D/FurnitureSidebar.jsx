import React from 'react';

const furnitureLibrary = [
  { 
    id: 'sofa', 
    name: 'Nordic Sofa', 
    image: 'https://cdn-icons-png.flaticon.com/512/1155/1155054.png', // Top view sofa
    width: 180, height: 80 
  },
  { 
    id: 'table', 
    name: 'Oak Table', 
    image: 'https://cdn-icons-png.flaticon.com/512/2855/2855149.png', // Top view table
    width: 100, height: 100 
  },
  { 
    id: 'chair', 
    name: 'Shell Chair', 
    image: 'https://cdn-icons-png.flaticon.com/512/1769/1769165.png', // Top view chair
    width: 50, height: 50 
  },
  { 
    id: 'bed', 
    name: 'Master Bed', 
    image: 'https://cdn-icons-png.flaticon.com/512/2833/2833179.png', // Top view bed
    width: 160, height: 200 
  }
];

const FurnitureSidebar = ({ onAddFurniture }) => {
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 gap-4">
        {furnitureLibrary.map((item) => (
          <div 
            key={item.id}
            onClick={() => onAddFurniture(item)}
            className="group bg-white border border-slate-100 p-4 rounded-xl cursor-pointer hover:shadow-xl hover:border-orange-200 transition-all text-center"
          >
            <div className="h-24 flex items-center justify-center mb-3">
              <img src={item.image} alt={item.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform" />
            </div>
            <p className="text-[10px] font-bold text-slate-700 uppercase tracking-tight">{item.name}</p>
            <p className="text-[9px] text-slate-400 mt-1">{item.width} x {item.height} cm</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FurnitureSidebar;