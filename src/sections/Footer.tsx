import { Instagram, Linkedin, ArrowUp } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre Nosotros', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Testimonios', href: '#testimonials' },
  { label: 'Contacto', href: '#contact' },
];

export default function Footer() {
  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const nav = (window as unknown as Record<string, (h: string) => void>).__mvNavigateToSection;
    if (nav) {
      nav(href);
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-noir" style={{ borderTop: '1px solid rgba(201, 169, 98, 0.1)' }}>
      <div className="content-max-width" style={{ padding: '80px 48px 32px' }}>
        {/* Row 1 - Brand + Navigation + Social */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16">
          {/* Logo & Description */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo-gold.png" alt="MV-LEGAL" style={{ height: 36, width: 'auto' }} />
              <span className="label-style text-gold" style={{ letterSpacing: '0.15em', fontSize: 14 }}>
                MV-LEGAL
              </span>
            </div>
            <p className="body-small text-gris" style={{ maxWidth: 280, lineHeight: 1.7 }}>
              Bufete de abogados multidisciplinar con más de 15 años de experiencia legal en Valencia.
              Justicia con excelencia y compromiso.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <p className="label-style text-[#5A5A55] mb-4" style={{ fontSize: 11 }}>NAVEGACIÓN</p>
            <nav className="flex flex-col" style={{ gap: 12 }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="body-small text-[#8A8A82] hover:text-gold transition-colors duration-300 cursor-hover w-fit"
                  data-cursor-text={link.label}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#/blog"
                className="body-small text-[#8A8A82] hover:text-gold transition-colors duration-300 cursor-hover w-fit"
                data-cursor-text="Blog"
              >
                Blog
              </a>
            </nav>
          </div>

          {/* Social & Contact */}
          <div>
            <p className="label-style text-[#5A5A55] mb-4" style={{ fontSize: 11 }}>CONTACTO</p>
            <p className="body-small text-gris mb-1">Carrer dels Pellers, 30 bajo</p>
            <p className="body-small text-gris mb-1">Gandía 46702 (Valencia)</p>
            <p className="body-small text-gold mb-6">667 30 89 90</p>

            <div className="flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center cursor-hover"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(201, 169, 98, 0.2)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A962';
                  e.currentTarget.style.backgroundColor = 'rgba(201, 169, 98, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.2)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                data-cursor-text="IG"
              >
                <Instagram size={18} className="text-gold" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center cursor-hover"
                style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  border: '1px solid rgba(201, 169, 98, 0.2)',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = '#C9A962';
                  e.currentTarget.style.backgroundColor = 'rgba(201, 169, 98, 0.1)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.2)';
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                data-cursor-text="IN"
              >
                <Linkedin size={18} className="text-gold" />
              </a>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(245, 245, 240, 0.05)', marginBottom: 24 }} />

        {/* Bottom Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <p className="mono-style text-[#5A5A55]" style={{ fontSize: 12 }}>
              © 2024 MV-Legal Abogados. Todos los derechos reservados.
            </p>
          </div>

          <div className="flex items-center gap-6 flex-wrap justify-center">
            <p className="mono-style text-[#5A5A55] hidden md:block" style={{ fontSize: 11 }}>
              Colegiada del ICAV · N.º 12.348
            </p>
            <a href="#/aviso-legal" className="mono-style text-[#5A5A55] hover:text-[#8A8A82] transition-colors duration-300 cursor-hover" style={{ fontSize: 11 }} data-cursor-text="Legal">Aviso Legal</a>
            <a href="#/politica-privacidad" className="mono-style text-[#5A5A55] hover:text-[#8A8A82] transition-colors duration-300 cursor-hover" style={{ fontSize: 11 }} data-cursor-text="Privacidad">Privacidad</a>
            <a href="#/cookies" className="mono-style text-[#5A5A55] hover:text-[#8A8A82] transition-colors duration-300 cursor-hover" style={{ fontSize: 11 }} data-cursor-text="Cookies">Cookies</a>
            <a href="#/desistir-contrato" className="mono-style text-[#5A5A55] hover:text-[#8A8A82] transition-colors duration-300 cursor-hover" style={{ fontSize: 11 }} data-cursor-text="Desistir">Desistir</a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="flex items-center justify-center cursor-hover"
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                border: '1px solid rgba(201, 169, 98, 0.2)',
                cursor: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = '#C9A962';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.2)';
              }}
              aria-label="Volver arriba"
              data-cursor-text="Top"
            >
              <ArrowUp size={14} className="text-gold" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}