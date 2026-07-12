import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: 15, suffix: '+', label: 'Años de Experiencia' },
  { number: 2000, suffix: '+', label: 'Casos Resueltos' },
  { number: 98, suffix: '%', label: 'Tasa de Éxito' },
  { number: 500, suffix: '+', label: 'Clientes Satisfechos' },
];

function AnimatedCounter({ target, suffix }: { target: number; suffix: string }) {
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = countRef.current;
    if (!el) return;

    const obj = { val: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    });

    tl.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.floor(obj.val).toLocaleString('es-ES') + suffix;
      },
    });

    return () => { tl.kill(); };
  }, [target, suffix]);

  return <span ref={countRef}>0{suffix}</span>;
}

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const line = lineRef.current;
    if (!section || !line) return;

    // Animate the gold line expansion
    gsap.fromTo(
      line,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.5,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-noir relative overflow-hidden"
      style={{ padding: '120px 48px' }}
    >
      {/* Gold accent line */}
      <div
        ref={lineRef}
        className="absolute top-0 left-1/2 -translate-x-1/2 origin-center"
        style={{
          width: '80%',
          maxWidth: 900,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.5), transparent)',
          transformOrigin: 'center',
        }}
      />

      <div className="content-max-width">
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ gap: 48 }}>
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div
                className="text-gold"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(48px, 6vw, 72px)',
                  fontWeight: 600,
                  lineHeight: 1,
                }}
              >
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <p
                className="label-style text-[#5A5A55] mt-3"
                style={{ maxWidth: 160, margin: '12px auto 0' }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom gold line */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: '80%',
          maxWidth: 900,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201, 169, 98, 0.5), transparent)',
        }}
      />
    </section>
  );
}