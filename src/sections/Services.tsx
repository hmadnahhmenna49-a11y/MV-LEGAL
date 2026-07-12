import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Scale, Shield, Globe, FileText, Users, Building, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    title: 'Derecho Civil',
    icon: Scale,
    description: 'Contratos, reclamaciones de cantidad, propiedad, familia e incapacidades.',
    detail: 'Cobertura completa en materia civil con atención detallada a cada caso.',
  },
  {
    title: 'Derecho Penal',
    icon: Shield,
    description: 'Defensa en procedimientos penales, juicios rápidos y delitos.',
    detail: 'Protección firme de tus derechos con estrategia defensiva sólida.',
  },
  {
    title: 'Extranjería',
    icon: Globe,
    description: 'Permisos de residencia, nacionalidad, expulsiones y asilo.',
    detail: 'Acompañamiento completo en trámites de extranjería y nacionalidad.',
  },
  {
    title: 'Herencias',
    icon: FileText,
    description: 'Testamentos, particiones, adjudicaciones y planificación patrimonial.',
    detail: 'Gestión sensible y eficiente de sucesiones y herencias.',
  },
  {
    title: 'Laboral',
    icon: Users,
    description: 'Despidos, reclamaciones salariales y accidentes de trabajo.',
    detail: 'Defensa de tus derechos laborales con resultados comprobados.',
  },
  {
    title: 'Administrativo',
    icon: Building,
    description: 'Recursos, licencias, sanciones y reclamaciones a la administración.',
    detail: 'Recurso efectivo contra actos de la administración pública.',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const gridInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const grid = gridRef.current;
    const gridInner = gridInnerRef.current;

    if (!section || !grid || !gridInner) return;



    // Header entrance
    const headerElements = section.querySelectorAll('.services-header-animate');
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

    // Cards entrance
    const cards = gridInner.querySelectorAll('.service-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.1,
        scrollTrigger: {
          trigger: grid,
          start: 'top 80%',
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === section || st.trigger === grid) st.kill();
      });
    };
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full bg-noir section-padding"
    >
      <div className="content-max-width">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between" style={{ marginBottom: 80 }}>
          <div>
            <p className="services-header-animate label-style text-gold opacity-0">
              ÁREAS DE PRÁCTICA
            </p>
            <h2
              className="services-header-animate text-blanc opacity-0"
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                lineHeight: 1.1,
                marginTop: 16,
              }}
            >
              Servicios Jurídicos
            </h2>
          </div>
          <p
            className="services-header-animate mono-style text-[#5A5A55] opacity-0"
            style={{ marginTop: 16 }}
          >
            15+ años de experiencia
          </p>
        </div>

        {/* Card Grid */}
        <div ref={gridRef}>
          <div
            ref={gridInnerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            style={{ gap: 20 }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="service-card opacity-0 group cursor-hover relative"
                  style={{
                    padding: '36px 28px',
                    minHeight: 280,
                  }}
                  data-cursor-text={service.title}
                >
                  {/* Hover gold line at top */}
                  <div
                    className="absolute top-0 left-0 h-[2px] bg-gold transition-all duration-500"
                    style={{
                      width: 0,
                      transition: 'width 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.width = '100%';
                    }}
                  />

                  <div className="flex items-start justify-between mb-6">
                    <Icon
                      size={36}
                      className="text-gold transition-transform duration-300 group-hover:scale-110"
                    />
                    <ArrowUpRight
                      size={18}
                      className="text-[#5A5A55] transition-all duration-300 opacity-0 group-hover:opacity-100 group-hover:text-gold group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </div>

                  <h4 className="text-blanc mb-3" style={{ fontSize: 28 }}>
                    {service.title}
                  </h4>

                  <p className="body-small text-gris" style={{ marginBottom: 12 }}>
                    {service.description}
                  </p>

                  <p
                    className="body-small text-[#5A5A55] transition-all duration-300 max-h-0 overflow-hidden opacity-0 group-hover:max-h-[100px] group-hover:opacity-100"
                    style={{ transition: 'all 0.4s ease', fontSize: 13 }}
                  >
                    {service.detail}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}