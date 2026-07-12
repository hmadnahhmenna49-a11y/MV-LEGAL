import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Clock, Handshake, ShieldCheck, TrendingUp, Users } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const reasons = [
  {
    icon: ShieldCheck,
    title: 'Defensa Firme',
    description: 'Protección legal agresiva y estratégica para salvaguardar tus derechos e intereses en cada procedimiento.',
  },
  {
    icon: Users,
    title: 'Atención Personalizada',
    description: 'Cada caso recibe un trato individual. No somos una fábrica de expedientes, somos tu equipo legal de confianza.',
  },
  {
    icon: Clock,
    title: 'Respuesta Rápida',
    description: 'Comunicación constante y respuestas en menos de 24 horas. Tu tiempo y tranquilidad son nuestra prioridad.',
  },
  {
    icon: Award,
    title: 'Resultado Comprobado',
    description: 'Más de 2.000 casos resueltos con una tasa de éxito del 98%. Nuestros resultados hablan por nosotros.',
  },
  {
    icon: Handshake,
    title: 'Compromiso Total',
    description: 'Nos involucramos al 100% con cada cliente. Tu problema legal es nuestra misión hasta su resolución.',
  },
  {
    icon: TrendingUp,
    title: 'Especialización',
    description: 'Actualización constante en legislación para ofrecer las estrategias más efectivas y actuales del mercado.',
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const headerElements = section.querySelectorAll('.why-header-animate');
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

    const cards = section.querySelectorAll('.why-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: section.querySelector('.why-grid'),
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
      className="w-full bg-noir section-padding"
    >
      <div className="content-max-width">
        {/* Header */}
        <div className="text-center" style={{ marginBottom: 80 }}>
          <p className="why-header-animate label-style text-gold opacity-0">
            POR QUÉ ELEGIRNOS
          </p>
          <h2
            className="why-header-animate text-blanc opacity-0"
            style={{
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.1,
              marginTop: 16,
            }}
          >
            Tu mejor elección legal
          </h2>
          <p
            className="why-header-animate body-large text-gris opacity-0 max-w-[600px] mx-auto"
            style={{ marginTop: 24 }}
          >
            Combinamos experiencia, dedicación y resultados para ofrecerte la representación legal que mereces.
          </p>
        </div>

        {/* Grid */}
        <div className="why-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ gap: 24 }}>
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <div
                key={index}
                className="why-card opacity-0 group cursor-hover"
                style={{
                  background: 'rgba(20, 19, 18, 0.6)',
                  border: '1px solid rgba(245, 245, 240, 0.06)',
                  padding: '40px 32px',
                  transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.3)';
                  e.currentTarget.style.background = 'rgba(201, 169, 98, 0.03)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(245, 245, 240, 0.06)';
                  e.currentTarget.style.background = 'rgba(20, 19, 18, 0.6)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Gold corner accent */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    width: 60,
                    height: 60,
                    background: 'linear-gradient(135deg, transparent 50%, rgba(201, 169, 98, 0.1) 50%)',
                    transition: 'all 0.4s ease',
                  }}
                />

                <Icon
                  size={28}
                  className="text-gold mb-6 block"
                  style={{
                    transition: 'transform 0.3s ease',
                  }}
                />
                <h4 className="text-blanc mb-3" style={{ fontSize: 22, fontFamily: "'Cormorant Garamond', serif", fontWeight: 500 }}>
                  {reason.title}
                </h4>
                <p className="body-small text-gris" style={{ lineHeight: 1.7 }}>
                  {reason.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}