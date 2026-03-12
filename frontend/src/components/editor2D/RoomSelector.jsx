import React from 'react';

const roomShapes = [
  { id: 'square', name: 'Square', icon: '⬜' },
  { id: 'rectangle', name: 'Rectangle', icon: '▭' },
  { id: 'l-shape', name: 'L-Shape', icon: '∟' }
];

const RoomSelector = ({ onSelect }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Shape:</span>
      {roomShapes.map((shape) => (
        <button 
          key={shape.id} 
          onClick={() => onSelect(shape.id)}
          style={{
            padding: '5px 10px',
            cursor: 'pointer',
            border: '1px solid #ddd',
            borderRadius: '5px',
            background: '#fff',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          <span>{shape.icon}</span>
          <span style={{ fontSize: '12px' }}>{shape.name}</span>
        </button>
      ))}
    </div>
  );
};

export default RoomSelector;