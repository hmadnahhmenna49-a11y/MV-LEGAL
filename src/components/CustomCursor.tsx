import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const mouse = useRef({ x: 0, y: 0 });
  const follower = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Detect hoverable elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isLink = target.closest('a, button, [role="button"], .cursor-hover');
      const isInput = target.closest('input, textarea, select');

      if (isLink) {
        setIsHovering(true);
        const text = (isLink as HTMLElement).getAttribute('data-cursor-text');
        setCursorText(text || '');
      } else if (isInput) {
        setIsHovering(true);
        setCursorText('');
      } else {
        setIsHovering(false);
        setCursorText('');
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseover', handleMouseOver);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseover', handleMouseOver);
    };
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) return;

    const animate = () => {
      follower.current.x += (mouse.current.x - follower.current.x) * 0.12;
      follower.current.y += (mouse.current.y - follower.current.y) * 0.12;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      }
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${follower.current.x}px, ${follower.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId.current);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    <>
      {/* Main cursor dot - golden diamond */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div
          className="relative"
          style={{
            width: 8,
            height: 8,
            marginLeft: -4,
            marginTop: -4,
            transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            transform: 'rotate(45deg)',
            backgroundColor: isHovering ? '#C9A962' : '#C9A962',
            boxShadow: `0 0 ${isHovering ? '20px' : '10px'} rgba(201, 169, 98, ${isHovering ? 0.6 : 0.3})`,
            opacity: isHovering && cursorText ? 0 : 1,
          }}
        />
      </div>

      {/* Cursor follower - luxury ring */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{ willChange: 'transform' }}
      >
        <div
          style={{
            width: isHovering ? (cursorText ? 100 : 56) : 40,
            height: isHovering ? (cursorText ? 100 : 56) : 40,
            marginLeft: (isHovering ? (cursorText ? 100 : 56) : 40) / -2,
            marginTop: (isHovering ? (cursorText ? 100 : 56) : 40) / -2,
            borderRadius: cursorText ? '8px' : '50%',
            border: `1.5px solid rgba(201, 169, 98, ${isHovering ? 0.8 : 0.4})`,
            backgroundColor: isHovering ? 'rgba(201, 169, 98, 0.08)' : 'transparent',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transform: isClicking ? 'scale(0.85)' : 'scale(1)',
          }}
        >
          {cursorText && (
            <span
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 11,
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase' as const,
                color: '#C9A962',
                whiteSpace: 'nowrap',
              }}
            >
              {cursorText}
            </span>
          )}
          {!cursorText && isHovering && (
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ transform: 'rotate(-45deg)' }}>
              <path d="M7 1L13 7L7 13L1 7L7 1Z" stroke="#C9A962" strokeWidth="1.5" fill="none" />
            </svg>
          )}
        </div>
      </div>
    </>
  );
}