
import { useState, useRef, useEffect } from 'react';

interface IDCardEntryProps {
  onUnlock: () => void;
  isUnlocked: boolean;
}

export const IDCardEntry = ({ onUnlock, isUnlocked }: IDCardEntryProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isInScanner, setIsInScanner] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: offsetX, y: offsetY });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !cardRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left - containerRect.width / 2;
    const y = e.clientY - containerRect.top - containerRect.height / 2;

    setPosition({ x, y });
    
    // Add subtle rotation based on movement
    const rotX = (y / containerRect.height) * 20;
    const rotY = -(x / containerRect.width) * 20;
    setRotation({ x: rotX, y: rotY });

    // Check if in scanner zone
    const scannerZone = document.querySelector('.scanner-zone');
    if (scannerZone) {
      const scannerRect = scannerZone.getBoundingClientRect();
      const cardRect = cardRef.current.getBoundingClientRect();
      
      const isOverlapping = !(
        cardRect.right < scannerRect.left ||
        cardRect.left > scannerRect.right ||
        cardRect.bottom < scannerRect.top ||
        cardRect.top > scannerRect.bottom
      );

      setIsInScanner(isOverlapping);
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);

    if (isInScanner) {
      onUnlock();
    } else {
      // Return to original position with bounce
      setPosition({ x: 0, y: 0 });
      setRotation({ x: 0, y: 0 });
    }
    setIsInScanner(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isInScanner]);

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-100/50 via-transparent to-transparent animate-pulse" />
      
      {/* Instructions */}
      <div className="absolute top-1/4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Welcome
        </h1>
        <p className="text-lg text-muted-foreground mb-8">
          Drag the ID card to the scanner to access the portfolio
        </p>
      </div>

      {/* Scanner Zone */}
      <div className={`scanner-zone absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-48 rounded-xl flex items-center justify-center ${isInScanner ? 'active' : ''}`}>
        <div className="text-center">
          <div className="text-2xl mb-2">🔍</div>
          <div className="text-sm text-muted-foreground">Drop ID card here</div>
        </div>
      </div>

      {/* Lanyard */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-40 lanyard" />

      {/* ID Card */}
      <div
        ref={cardRef}
        className={`id-card w-80 h-48 rounded-xl cursor-grab active:cursor-grabbing select-none transition-all duration-300 ${
          isDragging ? 'scale-105 shadow-2xl' : 'animate-swing'
        } ${isUnlocked ? 'animate-unlock' : ''}`}
        style={{
          transform: `translate(${position.x}px, ${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transformStyle: 'preserve-3d',
        }}
        onMouseDown={handleMouseDown}
      >
        <div className="h-full p-6 flex flex-col justify-between relative overflow-hidden">
          {/* Company Logo */}
          <div className="flex justify-between items-start">
            <div className="text-xs font-semibold text-primary uppercase tracking-wider">
              Professional Portfolio
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">AS</span>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex items-center gap-4">
            {/* Photo */}
            <div className="w-16 h-20 bg-gradient-to-br from-primary-200 to-primary-300 rounded-lg flex items-center justify-center overflow-hidden">
              <div className="w-12 h-14 bg-gradient-to-br from-gray-300 to-gray-400 rounded-md flex items-center justify-center">
                <span className="text-gray-600 text-xs">PHOTO</span>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-lg font-bold text-foreground mb-1">ANAND S</h3>
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                Full-Stack Developer
              </p>
              <p className="text-xs text-muted-foreground">
                ID: DEV-2024-001
              </p>
            </div>
          </div>

          {/* Bottom Info */}
          <div className="text-xs text-muted-foreground">
            <div className="flex justify-between">
              <span>Valid: 2024</span>
              <span>Access Level: Premium</span>
            </div>
          </div>

          {/* Holographic Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
        </div>
      </div>
    </div>
  );
};
