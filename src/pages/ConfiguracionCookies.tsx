import { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { gsap } from 'gsap';

const COOKIE_DATA = [
  { id: 'necesarias', title: 'Cookies técnicas / necesarias', desc: 'Son imprescindibles para el funcionamiento del sitio web. Permiten la navegación y el uso de funciones básicas.', locked: true, cookies: [
    { name: 'cookie_consent', purpose: 'Almacena tu consentimiento sobre el uso de cookies.', duration: '1 año' },
    { name: 'session_id', purpose: 'Mantiene la sesión del usuario activa durante la navegación.', duration: 'Sesión' },
  ]},
  { id: 'analiticas', title: 'Cookies analíticas', desc: 'Nos ayudan a entender cómo los visitantes interactúan con el sitio web, recopilando información de forma anónima.', locked: false, cookies: [
    { name: '_ga', purpose: 'Google Analytics: identifica visitantes únicos.', duration: '2 años' },
    { name: '_ga_*', purpose: 'Google Analytics: mantiene el estado de la sesión.', duration: '2 años' },
    { name: '_gid', purpose: 'Google Analytics: distingue entre usuarios.', duration: '24 horas' },
  ]},
  { id: 'publicidad', title: 'Cookies de publicidad', desc: 'Se utilizan para mostrar anuncios relevantes y medir la efectividad de las campañas publicitarias.', locked: false, cookies: [
    { name: '_fbp', purpose: 'Meta Pixel: identifica navegadores para publicidad.', duration: '3 meses' },
    { name: '_gcl_au', purpose: 'Google Ads: rastrea conversiones de anuncios.', duration: '3 meses' },
  ]},
];

export default function ConfiguracionCookies() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>({ necesarias: true, analiticas: false, publicidad: false });
  const [saved, setSaved] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = contentRef.current;
    if (!el) return;
    const items = el.querySelectorAll('.legal-animate');
    gsap.fromTo(items, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.08, delay: 0.3 });
  }, []);

  const save = (cfg: Record<string, boolean>) => {
    setEnabled(cfg);
    localStorage.setItem('mv-legal-cookie-config', JSON.stringify(cfg));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleCat = (id: string, locked: boolean) => {
    if (locked) return;
    save({ ...enabled, [id]: !enabled[id] });
  };

  return (
    <section className="w-full section-padding" style={{ paddingTop: 140 }}>
      <div className="content-max-width" ref={contentRef}>
        <a href="#/" className="legal-animate opacity-0 inline-flex items-center gap-2 text-[#8A8A82] hover:text-gold transition-colors duration-300 mb-8 cursor-hover" data-cursor-text="Volver">
          <ArrowLeft size={16} />
          <span className="body-small" style={{ letterSpacing: '0.02em' }}>Volver al inicio</span>
        </a>

        <div className="legal-animate opacity-0 flex items-center gap-4 mb-4">
          <div className="flex items-center justify-center" style={{ width: 48, height: 48, borderRadius: '50%', border: '1px solid rgba(201, 169, 98, 0.2)' }}>
            <Shield size={22} className="text-gold" />
          </div>
          <h1 className="text-blanc" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, fontWeight: 500 }}>Configuración de Cookies</h1>
        </div>
        <div className="legal-animate opacity-0 mb-6" style={{ width: 60, height: 1, background: '#C9A962' }} />
        <p className="legal-animate opacity-0 mono-style text-[#5A5A55] mb-12" style={{ fontSize: 11 }}>Última actualización: 1 de enero de 2025</p>

        <div className="legal-animate opacity-0 max-w-[850px]" style={{ borderTop: '1px solid rgba(245, 245, 240, 0.06)', paddingTop: 40 }}>
          <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>Utilizamos cookies propias y de terceros para mejorar tu experiencia de navegación. Puedes aceptar todas, rechazar las opcionales o configurar las que deseas permitir.</p>

          <div className="flex flex-wrap gap-4 mb-12">
            <button onClick={() => save({ necesarias: true, analiticas: true, publicidad: true })} className="btn-gold cursor-hover" style={{ padding: '14px 32px', fontSize: 11 }} data-cursor-text="Aceptar">Aceptar todas</button>
            <button onClick={() => save({ necesarias: true, analiticas: false, publicidad: false })} className="cursor-hover transition-colors duration-300 text-[#F5F5F0] hover:text-gold" style={{ padding: '14px 32px', fontSize: 11, border: '1px solid rgba(245, 245, 240, 0.15)', background: 'transparent' }} data-cursor-text="Rechazar">Rechazar opcionales</button>
          </div>

          {saved && <div className="mb-8 p-4 text-center text-gold body-small" style={{ background: 'rgba(201, 169, 98, 0.08)', border: '1px solid rgba(201, 169, 98, 0.2)' }}>Configuración guardada correctamente.</div>}

          <div className="flex flex-col" style={{ gap: 24 }}>
            {COOKIE_DATA.map((cat) => (
              <div key={cat.id} style={{ background: 'rgba(20, 19, 18, 0.6)', border: enabled[cat.id] ? '1px solid rgba(201, 169, 98, 0.15)' : '1px solid rgba(245, 245, 240, 0.06)', padding: 'clamp(24px, 3vw, 36px)', transition: 'border-color 0.3s ease' }}>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <h2 className="text-blanc mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 500 }}>{cat.title}</h2>
                    <p className="body-small text-[#8A8A82]" style={{ lineHeight: 1.7, fontSize: 13 }}>{cat.desc}</p>
                  </div>
                  <div role="switch" aria-checked={enabled[cat.id]} tabIndex={cat.locked ? -1 : 0} onClick={() => toggleCat(cat.id, cat.locked)} onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleCat(cat.id, cat.locked); } }} className="flex-shrink-0 relative cursor-hover" style={{ width: 48, height: 26, borderRadius: 13, background: enabled[cat.id] ? '#C9A962' : 'rgba(245, 245, 240, 0.1)', transition: 'background 0.3s ease', opacity: cat.locked ? 0.6 : 1, cursor: cat.locked ? 'not-allowed' : 'none' }}>
                    <div style={{ position: 'absolute', top: 3, left: enabled[cat.id] ? 25 : 3, width: 20, height: 20, borderRadius: '50%', background: cat.locked ? '#5A5A55' : '#0A0908', transition: 'left 0.3s ease' }} />
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(245, 245, 240, 0.06)', paddingTop: 16 }}>
                  <div className="hidden md:grid" style={{ gridTemplateColumns: '1.2fr 2fr 1fr', gap: 12, marginBottom: 8 }}>
                    <p className="mono-style text-[#5A5A55]" style={{ fontSize: 10 }}>NOMBRE</p>
                    <p className="mono-style text-[#5A5A55]" style={{ fontSize: 10 }}>FINALIDAD</p>
                    <p className="mono-style text-[#5A5A55]" style={{ fontSize: 10 }}>DURACIÓN</p>
                  </div>
                  {cat.cookies.map((c, j) => (
                    <div key={j} className="grid md:grid-cols-[1.2fr_2fr_1fr] gap-2 md:gap-12 mb-3" style={{ borderTop: j > 0 ? '1px solid rgba(245, 245, 240, 0.04)' : 'none', paddingTop: j > 0 ? 12 : 0 }}>
                      <p className="body-small text-gold" style={{ fontSize: 13, wordBreak: 'break-all' }}>{c.name}</p>
                      <p className="body-small text-[#8A8A82]" style={{ fontSize: 13, lineHeight: 1.6 }}>{c.purpose}</p>
                      <p className="body-small text-[#8A8A82]" style={{ fontSize: 13 }}>{c.duration}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <button onClick={() => save(enabled)} className="btn-gold cursor-hover" style={{ padding: '16px 48px', fontSize: 11 }} data-cursor-text="Guardar">Guardar configuración</button>
          </div>
        </div>
      </div>
    </section>
  );
}