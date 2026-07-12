import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    name: 'Carlos Martínez',
    role: 'Empresa Tecnológica',
    text: 'El equipo de MV-Legal nos proporcionó un asesoramiento excepcional en nuestro caso de derecho mercantil. Su profesionalismo y dedicación nos dieron una total tranquilidad durante todo el proceso.',
    rating: 5,
  },
  {
    name: 'Ana López',
    role: 'Residencia y Nacionalidad',
    text: 'Gracias a María José y su equipo, pude obtener mi nacionalidad española sin ningún problema. Siempre estuvieron disponibles para resolver todas mis dudas. Recomiendo sus servicios al 100%.',
    rating: 5,
  },
  {
    name: 'Roberto Sánchez',
    role: 'Caso Penal',
    text: 'En el momento más difícil de mi vida, MV-Legal estuvo ahí. Su defensa fue impecable y lograron la mejor resolución posible para mi caso. Profesionales de verdad.',
    rating: 5,
  },
  {
    name: 'Laura Fernández',
    role: 'Herencia Familiar',
    text: 'Trataron la herencia de mi familia con una sensibilidad y un profesionalismo admirables. Todo el proceso fue transparente y sin complicaciones.',
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerElements = section.querySelectorAll('.testimonials-header-animate');
    gsap.fromTo(
      headerElements,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        stagger: 0.15,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );

    const cardEl = section.querySelector('.testimonials-card');
    gsap.fromTo(
      cardEl,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
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

  const navigate = (dir: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent((prev) => {
      let next = prev + dir;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return next;
    });
    setTimeout(() => setIsAnimating(false), 500);
  };

  const testimonial = testimonials[current];

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="w-full bg-noir-light section-padding"
    >
      <div className="content-max-width">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 80 }}>
          <p className="testimonials-header-animate label-style text-gold opacity-0">
            TESTIMONIOS
          </p>
          <h2
            className="testimonials-header-animate text-blanc opacity-0"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            Lo que dicen nuestros clientes
          </h2>
        </div>

        {/* Testimonial Card */}
        <div className="testimonials-card opacity-0 max-w-[900px] mx-auto">
          <div
            className="relative"
            style={{
              background: 'rgba(201, 169, 98, 0.03)',
              border: '1px solid rgba(201, 169, 98, 0.15)',
              padding: 'clamp(40px, 6vw, 80px)',
            }}
          >
            {/* Quote Icon */}
            <Quote
              size={48}
              className="text-gold absolute"
              style={{ top: 32, right: 32, opacity: 0.3 }}
            />

            {/* Rating Stars */}
            <div className="flex gap-1" style={{ marginBottom: 32 }}>
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#C9A962">
                  <path d="M10 1.5L12.39 6.86L18.18 7.56L14.09 11.64L15.08 17.44L10 14.58L4.92 17.44L5.91 11.64L1.82 7.56L7.61 6.86L10 1.5Z" />
                </svg>
              ))}
            </div>

            {/* Quote Text */}
            <p
              className="text-blanc"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(22px, 3vw, 32px)',
                fontWeight: 400,
                lineHeight: 1.5,
                fontStyle: 'italic',
                transition: 'opacity 0.4s ease',
              }}
            >
              &ldquo;{testimonial.text}&rdquo;
            </p>

            {/* Author */}
            <div className="flex items-center gap-4 mt-8" style={{
              borderTop: '1px solid rgba(201, 169, 98, 0.15)',
              paddingTop: 32,
            }}>
              {/* Avatar placeholder */}
              <div
                className="flex items-center justify-center"
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: '50%',
                  border: '1.5px solid rgba(201, 169, 98, 0.3)',
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 24,
                  fontWeight: 600,
                  color: '#C9A962',
                  flexShrink: 0,
                }}
              >
                {testimonial.name[0]}
              </div>
              <div>
                <p className="text-blanc body-large" style={{ fontWeight: 500 }}>
                  {testimonial.name}
                </p>
                <p className="body-small text-[#5A5A55]">{testimonial.role}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={() => navigate(-1)}
              className="cursor-hover"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '1.5px solid rgba(201, 169, 98, 0.3)',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A962';
                e.currentTarget.style.backgroundColor = 'rgba(201, 169, 98, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.3)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <ChevronLeft size={20} className="text-gold" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: i === current ? 32 : 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: i === current ? '#C9A962' : 'rgba(201, 169, 98, 0.2)',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                />
              ))}
            </div>

            <button
              onClick={() => navigate(1)}
              className="cursor-hover"
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                border: '1.5px solid rgba(201, 169, 98, 0.3)',
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A962';
                e.currentTarget.style.backgroundColor = 'rgba(201, 169, 98, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.3)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <ChevronRight size={20} className="text-gold" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}