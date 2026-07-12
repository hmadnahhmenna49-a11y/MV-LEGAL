import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function CTA() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const body = bodyRef.current;
    const button = buttonRef.current;

    if (!section || !heading || !body || !button) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([heading, body, button], { opacity: 1, y: 0 });
      return;
    }

    const words = heading.querySelectorAll('.cta-word');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 75%',
        once: true,
      },
    });

    tl.fromTo(
      words,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.08 }
    );

    tl.fromTo(
      body,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.8'
    );

    tl.fromTo(
      button,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.4'
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-noir relative overflow-hidden"
      style={{ padding: '160px 48px', borderTop: '1px solid rgba(201, 169, 98, 0.1)' }}
    >
      {/* Background decorative element */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201, 169, 98, 0.04) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-[800px] mx-auto text-center relative z-10">
        <h2
          ref={headingRef}
          style={{
            fontSize: 'clamp(40px, 5vw, 72px)',
            lineHeight: 1.1,
            color: '#F5F5F0',
          }}
        >
          {'Tu defensa empieza aquí.'.split(' ').map((word, index) => (
            <span
              key={index}
              className="cta-word inline-block opacity-0"
              style={{ marginRight: '0.3em' }}
            >
              {index === 2 ? <span className="text-gold">{word}</span> : word}
            </span>
          ))}
        </h2>

        <p
          ref={bodyRef}
          className="body-large text-gris opacity-0"
          style={{ marginTop: 32, maxWidth: 560, margin: '32px auto 0' }}
        >
          Descarga nuestro folleto y solicita tu consulta personalizada sin compromiso.
          Estamos aquí para ayudarte.
        </p>

        <div className="flex flex-col items-center mt-10">
          <a
            ref={buttonRef}
            href="#contact"
            onClick={handleContactClick}
            className="btn-gold opacity-0 cursor-hover"
            style={{ padding: '20px 56px' }}
            data-cursor-text="Descargar"
          >
            Descargar Folleto
          </a>
          <a
            href="#contact"
            onClick={handleContactClick}
            className="body-small text-gold opacity-0 inline-flex items-center gap-2 group cursor-hover mt-6"
            data-cursor-text="Contactar"
          >
            <span className="relative">
              O contacta directamente
              <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#C9A962] transition-all duration-300 group-hover:w-full" />
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}