import React from 'react';
import Draggable from 'react-draggable';

const RoomCanvas = ({ wallColor, shape, items, onSelectItem, selectedItemId }) => {
  const getShapeStyle = () => {
    switch (shape) {
      case 'rectangle': return { width: '500px', height: '350px' };
      case 'l-shape': return { width: '400px', height: '400px', clipPath: 'polygon(0% 0%, 100% 0%, 100% 50%, 50% 50%, 50% 100%, 0% 100%)' };
      default: return { width: '400px', height: '400px' }; // square
    }
  };

  return (
    <div 
      className="relative transition-all duration-500 shadow-inner"
      style={{ 
        ...getShapeStyle(),
        backgroundColor: wallColor, 
        border: '6px solid #334155', // Dark slate border
      }}
    >
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {items.map((item) => {
        const nodeRef = React.createRef();
        const isSelected = selectedItemId === item.id;

        return (
          <Draggable 
            key={item.id} 
            nodeRef={nodeRef} 
            bounds="parent"
            onStart={() => onSelectItem(item.id)}
          >
            <div 
              ref={nodeRef}
              onClick={(e) => { e.stopPropagation(); onSelectItem(item.id); }}
              className={`absolute cursor-move transition-shadow ${isSelected ? 'ring-2 ring-orange-500 ring-offset-2 z-50' : 'z-10'}`}
              style={{
                width: `${item.width}px`,
                height: `${item.height}px`,
                transform: `rotate(${item.rotation || 0}deg)`,
                left: '100px', top: '100px'
              }}
            >
              <img 
                src={item.image} 
                className="w-full h-full object-contain pointer-events-none" 
                alt={item.name} 
              />
              {isSelected && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-orange-600 text-white text-[8px] px-2 py-0.5 rounded font-bold uppercase">
                  Selected
                </div>
              )}
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default RoomCanvas;