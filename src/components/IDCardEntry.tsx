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
  const [ropeOffset, setRopeOffset] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [connectionStatus, setConnectionStatus] = useState<'checking' | 'connected' | 'error'>('checking');
  const cardRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPositionRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  // Connection check simulation
  useEffect(() => {
    const checkConnection = async () => {
      setConnectionStatus('checking');
      
      // Simulate connection check delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate connection success (you can add real connection logic here)
      try {
        // Mock connection check - replace with real API call if needed
        const isOnline = navigator.onLine;
        setConnectionStatus(isOnline ? 'connected' : 'error');
      } catch (error) {
        setConnectionStatus('error');
      }
    };

    checkConnection();
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) {
      const offsetX = e.clientX - rect.left - rect.width / 2;
      const offsetY = e.clientY - rect.top - rect.height / 2;
      setPosition({ x: offsetX, y: offsetY });
      lastPositionRef.current = { x: offsetX, y: offsetY };
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || !cardRef.current || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - containerRect.left - containerRect.width / 2;
    const y = e.clientY - containerRect.top - containerRect.height / 2;

    // Calculate velocity for momentum
    const newVelocity = {
      x: (x - lastPositionRef.current.x) * 0.8,
      y: (y - lastPositionRef.current.y) * 0.8
    };
    setVelocity(newVelocity);

    setPosition({ x, y });
    lastPositionRef.current = { x, y };
    
    // Improved rotation with smoother easing and limits
    const maxRotation = 15;
    const rotX = Math.max(-maxRotation, Math.min(maxRotation, (y / containerRect.height) * 30));
    const rotY = Math.max(-maxRotation, Math.min(maxRotation, -(x / containerRect.width) * 30));
    setRotation({ x: rotX, y: rotY });

    // Smoother rope physics - rope follows card with some lag and curve
    const ropeX = x * 0.3; // Reduced influence for smoother movement
    const ropeY = Math.max(0, y * 0.2); // Rope bends down naturally
    setRopeOffset({ x: ropeX, y: ropeY });

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
      // Improved return animation with momentum and easing
      animateReturn();
    }
    setIsInScanner(false);
  };

  const animateReturn = () => {
    const startPosition = { ...position };
    const startRotation = { ...rotation };
    const startRopeOffset = { ...ropeOffset };
    const startTime = Date.now();
    const duration = 800;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for bounce effect
      const easeOutBounce = (t: number): number => {
        if (t < 1 / 2.75) {
          return 7.5625 * t * t;
        } else if (t < 2 / 2.75) {
          return 7.5625 * (t -= 1.5 / 2.75) * t + 0.75;
        } else if (t < 2.5 / 2.75) {
          return 7.5625 * (t -= 2.25 / 2.75) * t + 0.9375;
        } else {
          return 7.5625 * (t -= 2.625 / 2.75) * t + 0.984375;
        }
      };

      const easedProgress = easeOutBounce(progress);

      // Animate position back to center
      setPosition({
        x: startPosition.x * (1 - easedProgress),
        y: startPosition.y * (1 - easedProgress)
      });

      // Animate rotation back to neutral
      setRotation({
        x: startRotation.x * (1 - easedProgress),
        y: startRotation.y * (1 - easedProgress)
      });

      // Animate rope back to center
      setRopeOffset({
        x: startRopeOffset.x * (1 - easedProgress),
        y: startRopeOffset.y * (1 - easedProgress)
      });

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    animate();
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isDragging, isInScanner]);

  const getConnectionStatusText = () => {
    switch (connectionStatus) {
      case 'checking':
        return 'Establishing secure connection...';
      case 'connected':
        return 'Drag the ID card to the scanner to access the portfolio';
      case 'error':
        return 'Connection issue detected. Please try again.';
      default:
        return 'Drag the ID card to the scanner to access the portfolio';
    }
  };

  const getConnectionIcon = () => {
    switch (connectionStatus) {
      case 'checking':
        return '⏳';
      case 'connected':
        return '🔒';
      case 'error':
        return '⚠️';
      default:
        return '🔒';
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen flex items-center justify-center relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-radial from-primary-100/50 via-transparent to-transparent animate-pulse" />
      
      {/* Enhanced Welcome Section with Connection Status */}
      <div className="absolute top-1/4 text-center max-w-2xl mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4">
          Welcome
        </h1>
        
        {/* Connection Status Indicator */}
        <div className={`flex items-center justify-center gap-3 mb-6 transition-all duration-500 ${
          connectionStatus === 'connected' ? 'text-green-600' : 
          connectionStatus === 'error' ? 'text-red-500' : 'text-blue-500'
        }`}>
          <div className={`text-2xl ${connectionStatus === 'checking' ? 'animate-spin' : 'animate-bounce'}`}>
            {getConnectionIcon()}
          </div>
          <div className="text-sm font-medium uppercase tracking-wider">
            {connectionStatus === 'checking' && 'Connecting...'}
            {connectionStatus === 'connected' && 'Secure Connection'}
            {connectionStatus === 'error' && 'Connection Failed'}
          </div>
        </div>

        {/* Connection Progress Bar */}
        {connectionStatus === 'checking' && (
          <div className="w-64 mx-auto mb-6">
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse" 
                   style={{ width: '70%', animation: 'pulse 1.5s ease-in-out infinite' }} />
            </div>
          </div>
        )}

        {/* Dynamic Instructions */}
        <p className={`text-lg text-muted-foreground mb-8 transition-all duration-500 ${
          connectionStatus === 'connected' ? 'opacity-100' : 'opacity-60'
        }`}>
          {getConnectionStatusText()}
        </p>

        {/* System Status Indicators */}
        <div className="flex justify-center gap-6 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 
              connectionStatus === 'checking' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
            }`} />
            <span>Security Protocol</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 
              connectionStatus === 'checking' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
            }`} />
            <span>Access Control</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${
              connectionStatus === 'connected' ? 'bg-green-500 animate-pulse' : 
              connectionStatus === 'checking' ? 'bg-yellow-500 animate-pulse' : 'bg-red-500'
            }`} />
            <span>Portfolio Ready</span>
          </div>
        </div>
      </div>

      {/* Scanner Zone - Only show when connected */}
      {connectionStatus === 'connected' && (
        <div className={`scanner-zone absolute bottom-20 left-1/2 transform -translate-x-1/2 w-80 h-48 rounded-xl flex items-center justify-center transition-all duration-300 ${
          isInScanner 
            ? 'bg-primary/20 border-2 border-primary shadow-lg shadow-primary/50 scale-105' 
            : 'bg-card/50 border-2 border-dashed border-muted-foreground/30 hover:border-primary/50'
        }`}>
          <div className="text-center">
            <div className={`text-2xl mb-2 transition-all duration-300 ${isInScanner ? 'animate-bounce' : ''}`}>
              {isInScanner ? '✨' : '🔍'}
            </div>
            <div className="text-sm text-muted-foreground">
              {isInScanner ? 'Release to unlock!' : 'Drop ID card here'}
            </div>
          </div>
        </div>
      )}

      {/* Retry Button for connection errors */}
      {connectionStatus === 'error' && (
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2">
          <button 
            onClick={() => setConnectionStatus('checking')}
            className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors duration-200 font-medium"
          >
            Retry Connection
          </button>
        </div>
      )}

      {/* Lanyard and ID Card - Only show when connected */}
      {connectionStatus === 'connected' && (
        <>
          {/* Improved Lanyard */}
          <div 
            className="absolute top-0 left-1/2 transform -translate-x-1/2 transition-all duration-200 ease-out"
            style={{
              transform: `translate(calc(-50% + ${ropeOffset.x}px), ${ropeOffset.y}px)`,
            }}
          >
            <svg width="4" height="160" className="lanyard">
              <defs>
                <linearGradient id="lanyardGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--muted))" />
                  <stop offset="50%" stopColor="hsl(var(--muted-foreground))" />
                  <stop offset="100%" stopColor="hsl(var(--muted))" />
                </linearGradient>
              </defs>
              <path
                d={`M2,0 Q${2 + ropeOffset.x * 0.5},${80 + ropeOffset.y * 0.5} 2,160`}
                stroke="url(#lanyardGradient)"
                strokeWidth="3"
                fill="none"
                className="drop-shadow-sm"
              />
            </svg>
          </div>

          {/* Attachment Point - where rope connects to card */}
          <div 
            className="absolute transition-all duration-200 ease-out z-10"
            style={{
              transform: `translate(calc(-50% + ${position.x}px), calc(-50% + ${position.y + 158}px))`,
              left: '50%',
              top: '50%'
            }}
          >
            <div className="w-3 h-3 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full border border-gray-500 shadow-sm relative">
              <div className="absolute inset-0.5 bg-gradient-to-br from-gray-300 to-gray-500 rounded-full" />
              <div className="absolute inset-1 bg-gradient-to-br from-gray-200 to-gray-400 rounded-full" />
            </div>
          </div>

          {/* ID Card */}
          <div
            ref={cardRef}
            className={`id-card w-80 h-48 rounded-xl cursor-grab active:cursor-grabbing select-none transition-all duration-300 ${
              isDragging ? 'scale-105 shadow-2xl z-50' : 'animate-swing hover:scale-102'
            } ${isUnlocked ? 'animate-unlock' : ''}`}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
              transformStyle: 'preserve-3d',
              filter: isDragging ? 'brightness(1.1)' : 'none',
            }}
            onMouseDown={handleMouseDown}
          >
            <div className="h-full p-6 flex flex-col justify-between relative overflow-hidden">
              {/* Header with Company Title and AS Circle */}
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
                    Freelancer
                  </p>
                </div>
              </div>

              {/* Empty bottom area (removed the fields) */}
              <div></div>

              {/* Holographic Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer pointer-events-none" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};
