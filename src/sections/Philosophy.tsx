import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLHeadingElement>(null);
  const attributionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const quote = quoteRef.current;
    const attribution = attributionRef.current;

    if (!section || !quote || !attribution) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      gsap.set([quote, attribution], { opacity: 1, y: 0 });
      return;
    }

    // Split the quote into lines and animate each line
    const lines = quote.querySelectorAll('.quote-line');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 70%',
        once: true,
      },
    });

    // Animate each line with stagger
    tl.fromTo(
      lines,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out', stagger: 0.1 }
    );

    // Attribution fade in
    tl.fromTo(
      attribution,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.6'
    );

    return () => {
      tl.kill();
    };
  }, []);

  // Split quote into natural line segments for animation
  const lines = [
    'La abogacía es una lucha de pasiones.',
    'No se puede matar la verdad.',
    'No se puede matar la justicia.',
    'No se puede matar aquello por lo que luchamos.',
  ];

  return (
    <section
      ref={sectionRef}
      className="w-full bg-noir"
      style={{ padding: '200px 48px' }}
    >
      <div className="max-w-[900px] mx-auto text-center">
        <h2
          ref={quoteRef}
          style={{
            fontSize: 'clamp(36px, 5vw, 72px)',
            lineHeight: 1.2,
            color: '#F5F5F0',
          }}
        >
          {lines.map((line, index) => (
            <span
              key={index}
              className="quote-line block opacity-0"
              style={{ marginBottom: index < lines.length - 1 ? '0.3em' : 0 }}
            >
              {line}
            </span>
          ))}
        </h2>

        <p
          ref={attributionRef}
          className="opacity-0"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(24px, 3vw, 32px)',
            fontWeight: 500,
            lineHeight: 1.2,
            color: '#C9A962',
            marginTop: 48,
          }}
        >
          — María José Vivo
        </p>
      </div>
    </section>
  );
}
