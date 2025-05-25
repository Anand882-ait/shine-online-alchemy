
import { useState, useEffect } from 'react';

export const CursorFollower = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX - 150, y: e.clientY - 150 });
    };

    window.addEventListener('mousemove', updatePosition);
    return () => window.removeEventListener('mousemove', updatePosition);
  }, []);

  return (
    <div
      className="cursor-follower"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
      }}
    />
  );
};
