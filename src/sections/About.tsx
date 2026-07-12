import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import lawyerPhoto from '../images/Maria_Jose_Vivo.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const imageContainer = imageContainerRef.current;

    if (!section || !image || !imageContainer) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Left column entrance animation
    const leftElements = section.querySelectorAll('.about-animate');
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        once: true,
      },
    });

    entranceTl.fromTo(
      leftElements,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1, ease: 'power3.out', stagger: 0.15 }
    );

    // Right column image entrance
    entranceTl.fromTo(
      imageContainer,
      { opacity: 0, scale: 0.95, clipPath: 'inset(100% 0 0 0)' },
      { opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.out' },
      '-=0.9'
    );

    // Parallax effect on image
    if (!prefersReducedMotion) {
      gsap.fromTo(
        image,
        { y: '-15%' },
        {
          y: '0%',
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      );
    }

    return () => {
      entranceTl.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full bg-noir section-padding"
    >
      <div className="content-max-width">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Text */}
          <div className="order-2 lg:order-1">
            <p className="about-animate label-style text-gold opacity-0">
              SOBRE NOSOTROS
            </p>

            <h2
              className="about-animate text-blanc opacity-0"
              style={{
                fontSize: 'clamp(36px, 5vw, 64px)',
                lineHeight: 1.1,
                marginTop: 16,
              }}
            >
              Un bufete comprometido con tu tranquilidad legal
            </h2>

            <p className="about-animate body-large text-gris opacity-0" style={{ marginTop: 32 }}>
              En MV-Legal, liderado por María José Vivo, nos dedicamos a ofrecer servicios jurídicos
              personalizados y de alta calidad. Con una sólida especialización en derecho civil,
              extranjería y penal, brindamos asesoramiento legal cercano, eficaz y adaptado a cada
              cliente. Nuestro enfoque combina la experiencia de más de 15 años de práctica con las
              estrategias más innovadoras del sector.
            </p>

            <p className="about-animate text-gris opacity-0" style={{ marginTop: 16 }}>
              Nos destacamos por nuestra experiencia y compromiso, acompañándote en cada paso del
              proceso legal para alcanzar los mejores resultados posibles. Tu tranquilidad legal es
              nuestra prioridad absoluta.
            </p>

            {/* Quick stats inline */}
            <div className="about-animate flex flex-wrap gap-8 mt-10 opacity-0">
              <div>
                <p className="text-gold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 600, lineHeight: 1 }}>15+</p>
                <p className="label-style text-[#5A5A55] mt-1">Años</p>
              </div>
              <div style={{ width: 1, background: 'rgba(245, 245, 240, 0.1)' }} />
              <div>
                <p className="text-gold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 600, lineHeight: 1 }}>2000+</p>
                <p className="label-style text-[#5A5A55] mt-1">Casos</p>
              </div>
              <div style={{ width: 1, background: 'rgba(245, 245, 240, 0.1)' }} />
              <div>
                <p className="text-gold" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 600, lineHeight: 1 }}>98%</p>
                <p className="label-style text-[#5A5A55] mt-1">Éxito</p>
              </div>
            </div>

            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="about-animate inline-flex items-center gap-2 body-small text-gold opacity-0 group cursor-hover mt-8"
              data-cursor-text="Ver"
            >
              <span className="relative">
                Conoce Nuestros Servicios
                <span className="absolute left-0 bottom-0 w-0 h-[1px] bg-[#C9A962] transition-all duration-300 group-hover:w-full" />
              </span>
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>

          {/* Right Column - Image */}
          <div
            ref={imageContainerRef}
            className="order-1 lg:order-2 opacity-0 overflow-hidden relative"
            style={{ height: 600 }}
          >
            <img
              ref={imageRef}
              src={lawyerPhoto}
              alt="María José Vivo - Abogada"
              className="w-full h-[120%] object-cover"
            />
            {/* Gold frame accent */}
            <div
              className="absolute bottom-0 left-0 w-full h-1/3 pointer-events-none"
              style={{ background: 'linear-gradient(to top, rgba(10,9,8,0.8), transparent)' }}
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ border: '1px solid rgba(201, 169, 98, 0.15)' }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}