import { useEffect, useRef, useState } from 'react';

export default function ScrollProgress() {
  const [progress, setProgress] = useState(0);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
      setShowTop(scrollTop > 600);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Scroll Progress Bar */}
      <div
        className="fixed top-0 left-0 z-[100] h-[2px]"
        style={{
          width: `${progress}%`,
          background: 'linear-gradient(90deg, #C9A962, #D4BC7E)',
          boxShadow: '0 0 10px rgba(201, 169, 98, 0.5)',
          transition: 'width 0.1s linear',
        }}
      />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="fixed z-[100] flex items-center justify-center cursor-hover"
        style={{
          bottom: 32,
          right: 32,
          width: 48,
          height: 48,
          borderRadius: '50%',
          border: '1.5px solid rgba(201, 169, 98, 0.4)',
          backgroundColor: 'rgba(10, 9, 8, 0.8)',
          backdropFilter: 'blur(12px)',
          opacity: showTop ? 1 : 0,
          transform: showTop ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'none',
        }}
        aria-label="Volver arriba"
        data-cursor-text="Top"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M9 15V3M9 3L3 9M9 3L15 9" stroke="#C9A962" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </>
  );
}