import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft } from 'lucide-react';

interface LegalLayoutProps {
  children: React.ReactNode;
  title: string;
  lastUpdated: string;
}

export default function LegalLayout({ children, title, lastUpdated }: LegalLayoutProps) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = contentRef.current;
    if (!el) return;
    const elements = el.querySelectorAll('.legal-animate');
    gsap.fromTo(elements, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.3 });
  }, []);

  return (
    <section className="w-full section-padding" style={{ paddingTop: 140 }}>
      <div className="content-max-width" ref={contentRef}>
        <a href="#/" className="legal-animate opacity-0 inline-flex items-center gap-2 text-[#8A8A82] hover:text-gold transition-colors duration-300 mb-8 cursor-hover" data-cursor-text="Volver">
          <ArrowLeft size={16} />
          <span className="body-small" style={{ letterSpacing: '0.02em' }}>Volver al inicio</span>
        </a>
        <h1 className="legal-animate opacity-0 text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, fontWeight: 500 }}>{title}</h1>
        <div className="legal-animate opacity-0 mb-6" style={{ width: 60, height: 1, background: '#C9A962' }} />
        <p className="legal-animate opacity-0 mono-style text-[#5A5A55] mb-12" style={{ fontSize: 11 }}>Última actualización: {lastUpdated}</p>
        <div className="legal-animate opacity-0 max-w-[850px]" style={{ borderTop: '1px solid rgba(245, 245, 240, 0.06)', paddingTop: 40 }}>{children}</div>
      </div>
    </section>
  );
}