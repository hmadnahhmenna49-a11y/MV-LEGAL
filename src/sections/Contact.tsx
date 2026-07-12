import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, Mail, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const consultaTypes = [
  'Derecho Civil',
  'Derecho Penal',
  'Extranjería',
  'Herencias',
  'Laboral',
  'Administrativo',
  'Otro',
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipo: '',
    mensaje: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Left column entrance
    const leftElements = section.querySelectorAll('.contact-left-animate');
    gsap.fromTo(
      leftElements,
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

    // Right column (form) entrance
    const formEl = section.querySelector('.contact-form-container');
    gsap.fromTo(
      formEl,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          once: true,
        },
      }
    );

    if (prefersReducedMotion) {
      gsap.set([...leftElements, formEl], { opacity: 1, y: 0 });
    }
  }, []);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.nombre.trim()) newErrors.nombre = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Introduce un email válido';
    }
    if (!formData.mensaje.trim()) newErrors.mensaje = 'El mensaje es obligatorio';
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setSubmitted(true);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="w-full bg-noir-light section-padding"
    >
      <div className="content-max-width">
        <div className="grid grid-cols-1 lg:grid-cols-2" style={{ gap: 80 }}>
          {/* Left Column - Contact Info */}
          <div className="order-2 lg:order-1">
            <p className="contact-left-animate label-style text-gold opacity-0">CONTACTO</p>

            <h2
              className="contact-left-animate text-blanc opacity-0"
              style={{
                fontSize: 'clamp(36px, 5vw, 72px)',
                lineHeight: 1.1,
                marginTop: 16,
              }}
            >
              Hablemos de tu caso
            </h2>

            <p className="contact-left-animate body-large text-gris opacity-0" style={{ marginTop: 24, maxWidth: 400 }}>
              Estamos aquí para ayudarte. Cuéntanos tu situación y te ofreceremos la mejor solución
              legal.
            </p>

            {/* Contact Details */}
            <div className="contact-left-animate opacity-0" style={{ marginTop: 64 }}>
              <div className="flex items-center gap-4">
                <Phone size={20} className="text-gold flex-shrink-0" />
                <span
                  className="text-blanc"
                  style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 500 }}
                >
                  667 30 89 90
                </span>
              </div>

              <div className="flex items-center gap-4" style={{ marginTop: 16 }}>
                <Mail size={20} className="text-gold flex-shrink-0" />
                <span className="body-large text-blanc">mjvivo@icav.es</span>
              </div>

              <div className="flex items-start gap-4" style={{ marginTop: 16 }}>
                <MapPin size={20} className="text-gold flex-shrink-0 mt-1" />
                <span className="text-gris">
                  Carrer dels Pellers, 30 bajo
                  <br />
                  Gandía 46702 (Valencia)
                </span>
              </div>
            </div>

            {/* Office Hours */}
            <div className="contact-left-animate opacity-0" style={{ marginTop: 48 }}>
              <p className="label-style text-[#5A5A55]">Horario de oficina:</p>
              <p className="body-small text-gris" style={{ marginTop: 8 }}>
                Lunes a Viernes: 9:00 - 14:00, 16:00 - 19:00
              </p>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-form-container order-1 lg:order-2 opacity-0">
            {!submitted ? (
              <form
                onSubmit={handleSubmit}
                className="bg-noir"
                style={{ padding: 48, border: '1px solid rgba(245, 245, 240, 0.1)' }}
              >
                <div style={{ marginBottom: 32 }}>
                  <label className="label-style text-[#5A5A55] block" style={{ marginBottom: 8 }}>
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleChange}
                    className={`form-input ${errors.nombre ? 'border-[#E74C3C]' : ''}`}
                    placeholder="Tu nombre"
                  />
                  {errors.nombre && (
                    <p className="body-small text-[#E74C3C] mt-1">{errors.nombre}</p>
                  )}
                </div>

                <div style={{ marginBottom: 32 }}>
                  <label className="label-style text-[#5A5A55] block" style={{ marginBottom: 8 }}>
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'border-[#E74C3C]' : ''}`}
                    placeholder="tu@email.com"
                  />
                  {errors.email && (
                    <p className="body-small text-[#E74C3C] mt-1">{errors.email}</p>
                  )}
                </div>

                <div style={{ marginBottom: 32 }}>
                  <label className="label-style text-[#5A5A55] block" style={{ marginBottom: 8 }}>
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="+34 600 000 000"
                  />
                </div>

                <div style={{ marginBottom: 32 }}>
                  <label className="label-style text-[#5A5A55] block" style={{ marginBottom: 8 }}>
                    Tipo de consulta
                  </label>
                  <select
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    className="form-input bg-transparent cursor-pointer"
                    style={{ color: formData.tipo ? '#F5F5F0' : '#5A5A55' }}
                  >
                    <option value="" disabled>
                      Selecciona un área
                    </option>
                    {consultaTypes.map((type) => (
                      <option key={type} value={type} style={{ background: '#141312' }}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: 40 }}>
                  <label className="label-style text-[#5A5A55] block" style={{ marginBottom: 8 }}>
                    Mensaje *
                  </label>
                  <textarea
                    name="mensaje"
                    value={formData.mensaje}
                    onChange={handleChange}
                    rows={4}
                    className={`form-input resize-none ${errors.mensaje ? 'border-[#E74C3C]' : ''}`}
                    placeholder="Cuéntanos tu caso..."
                  />
                  {errors.mensaje && (
                    <p className="body-small text-[#E74C3C] mt-1">{errors.mensaje}</p>
                  )}
                </div>

                <button type="submit" className="btn-gold w-full" style={{ padding: 16 }}>
                  Enviar Consulta
                </button>
              </form>
            ) : (
              <div
                className="bg-noir flex items-center justify-center text-center"
                style={{ padding: 48, border: '1px solid rgba(245, 245, 240, 0.1)', minHeight: 500 }}
              >
                <div>
                  <h3
                    className="text-blanc"
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: 48,
                      fontWeight: 500,
                      lineHeight: 1.15,
                    }}
                  >
                    Gracias por contactarnos
                  </h3>
                  <p className="body-large text-gris" style={{ marginTop: 24 }}>
                    Te responderemos en menos de 24 horas.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
