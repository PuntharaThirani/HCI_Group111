import React from 'react';

const colors = ['#ffffff', '#ffadad', '#ffd6a5', '#fdffb6', '#caffbf', '#9bf6ff', '#a0c4ff', '#bdb2ff'];

const ColorPicker = ({ onColorChange }) => {
  return (
    <div style={{ padding: '10px', marginTop: '10px' }}>
      <p style={{ margin: '5px 0', fontSize: '14px' }}>Select Wall Color:</p>
      <div style={{ display: 'flex', gap: '8px' }}>
        {colors.map((color) => (
          <div
            key={color}
            onClick={() => onColorChange(color)}
            style={{
              width: '25px',
              height: '25px',
              backgroundColor: color,
              border: '1px solid #999',
              borderRadius: '50%',
              cursor: 'pointer'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorPicker;