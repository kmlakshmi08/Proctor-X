import React, { useState, useRef } from 'react';

const DraggableBox = ({ children }) => {
  const boxRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    const box = boxRef.current;
    const rect = box.getBoundingClientRect();
    setOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
    setIsDragging(true);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - offset.x,
      y: e.clientY - offset.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      ref={boxRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: '600px',
        height: '400px',
        backgroundColor: 'skyblue',
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        cursor: `${isDragging ? "grabbing" : "grab" }`,
        userSelect: 'none',
      }}
    >
      { children }
    </div>
  );
};

export default DraggableBox;
