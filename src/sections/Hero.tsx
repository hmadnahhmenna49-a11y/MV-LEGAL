import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const lineTopRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    const overlay = overlayRef.current;
    const content = contentRef.current;
    const preloader = preloaderRef.current;
    const lineTop = lineTopRef.current;

    if (!section || !video || !overlay || !content || !preloader) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      gsap.set(preloader, { opacity: 0, pointerEvents: 'none' });
      gsap.set(content.querySelectorAll('.hero-animate'), { opacity: 1, y: 0 });
      return;
    }

    /* ── Phase 1: Preloader ── */
    const preTl = gsap.timeline({
      onComplete: () => gsap.set(preloader, { pointerEvents: 'none', display: 'none' }),
    });

    preTl.fromTo(
      preloader.querySelector('.preloader-text'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' },
      0.2
    );

    preTl.fromTo(
      preloader.querySelector('.preloader-bar-fill'),
      { scaleX: 0 },
      { scaleX: 1, duration: 1.2, ease: 'power2.inOut' },
      0.4
    );

    preTl.to(preloader, { opacity: 0, duration: 0.6, ease: 'power2.inOut' }, 1.8);

    /* ── Phase 2: Content entrance (starts after preloader fades) ── */
    const mainTl = gsap.timeline({ delay: 2.2 });

    // Gold decorative line
    if (lineTop) {
      mainTl.fromTo(
        lineTop,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: 'power3.out' },
        0
      );
    }

    // Overline
    mainTl.fromTo(
      content.querySelector('.hero-overline'),
      { opacity: 0, y: -15 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      0.15
    );

    // H1 title lines
    mainTl.fromTo(
      content.querySelectorAll('.hero-title-line'),
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 },
      0.35
    );

    // Subtitle
    mainTl.fromTo(
      content.querySelector('.hero-subtitle'),
      { opacity: 0, y: 25 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
      0.7
    );

    // CTA buttons (all elements with hero-cta)
    mainTl.fromTo(
      content.querySelectorAll('.hero-cta'),
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.1 },
      0.9
    );

    // Scroll indicator
    mainTl.fromTo(
      content.querySelector('.hero-scroll'),
      { opacity: 0 },
      { opacity: 0.6, duration: 0.8, ease: 'power1.inOut' },
      1.2
    );

    /* ── Phase 3: Scroll-driven blur exit ── */
    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    scrollTl.to(video, { filter: 'blur(30px)', ease: 'none' }, 0);
    scrollTl.to(overlay, { opacity: 0.85, ease: 'none' }, 0);
    scrollTl.to(content, { opacity: 0, y: -60, ease: 'none' }, 0);

    return () => {
      preTl.kill();
      mainTl.kill();
      scrollTl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  const handleCtaClick = (e: React.MouseEvent) => {
    e.preventDefault();
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative w-screen overflow-hidden"
      style={{ height: '100vh' }}
    >
      {/* Preloader */}
      <div
        ref={preloaderRef}
        className="absolute inset-0 z-30 bg-[#0A0908] flex flex-col items-center justify-center"
      >
        <div className="preloader-text flex items-center gap-3" style={{ marginBottom: 32, opacity: 0 }}>
          <img src="/logo-gold.png" alt="" style={{ height: 40, width: 'auto' }} />
          <span className="label-style text-gold" style={{ letterSpacing: '0.2em' }}>MV-LEGAL</span>
        </div>
        <div className="preloader-bar" style={{ width: 200, height: '1px', background: 'rgba(245, 245, 240, 0.1)' }}>
          <div
            className="preloader-bar-fill"
            style={{
              width: '100%',
              height: '100%',
              background: '#C9A962',
              transformOrigin: 'left',
              transform: 'scaleX(0)',
            }}
          />
        </div>
      </div>

      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover z-[1]"
        autoPlay
        muted
        loop
        playsInline
        poster="https://images.unsplash.com/photo-1589994965851-a8f479c573a9?w=1920&q=80"
      >
        <source
          src="https://assets.mixkit.co/videos/preview/mixkit-golden-scales-of-justice-on-a-dark-background-4742-large.mp4"
          type="video/mp4"
        />
      </video>

      {/* Dark Overlay */}
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background: 'linear-gradient(180deg, rgba(10,9,8,0.4) 0%, rgba(10,9,8,0.7) 60%, rgba(10,9,8,0.95) 100%)',
        }}
      />

      {/* Extra overlay for scroll blur effect */}
      <div
        ref={overlayRef}
        className="absolute inset-0 z-[3] bg-[#0A0908] pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Content */}
      <div
        ref={contentRef}
        className="absolute z-10 w-full"
        style={{ bottom: 120, left: 0, padding: '0 48px' }}
      >
        <div className="max-w-[700px]">
          {/* Decorative top line */}
          <div
            ref={lineTopRef}
            className="mb-8 origin-left"
            style={{
              width: 60,
              height: '1px',
              background: '#C9A962',
              transform: 'scaleX(0)',
            }}
          />

          <p className="hero-overline label-style text-gold" style={{ marginBottom: 20, opacity: 0 }}>
            ABOGADA EN GANDIA
          </p>

          <h1
            className="text-blanc"
            style={{
              fontSize: 'clamp(48px, 8vw, 96px)',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              maxWidth: 700,
            }}
          >
            <span className="hero-title-line block" style={{ opacity: 0 }}>
              Justicia con
            </span>
            <span className="hero-title-line block" style={{ opacity: 0 }}>
              <span className="text-gold">Excelencia</span>
            </span>
          </h1>

          <p
            className="hero-subtitle body-large text-gris"
            style={{ maxWidth: 520, marginTop: 28, opacity: 0 }}
          >
            MV-Legal es un bufete de abogados multidisciplinar con más de 15 años de experiencia legal en
            derecho civil, de extranjería y penal en Valencia.
          </p>

          <div className="flex items-center gap-6 mt-10 flex-wrap">
            <a
              href="#contact"
              onClick={handleCtaClick}
              className="hero-cta btn-gold inline-block cursor-hover"
              style={{ opacity: 0 }}
              data-cursor-text="Consultar"
            >
              Consulta Gratis
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hero-cta inline-block body-small text-gold cursor-hover group"
              style={{ padding: '16px 0', opacity: 0 }}
              data-cursor-text="Ver"
            >
              <span className="relative">
                Ver Servicios
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#C9A962] transition-all duration-300 group-hover:w-full" />
              </span>
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div
          className="hero-scroll absolute left-1/2 -translate-x-1/2 flex flex-col items-center scroll-indicator"
          style={{ bottom: -80, opacity: 0 }}
        >
          <ChevronDown size={24} className="text-[#8A8A82]" />
          <span className="mono-style text-[#8A8A82] mt-1" style={{ fontSize: 12 }}>
            Desplaza
          </span>
        </div>
      </div>
    </section>
  );
}