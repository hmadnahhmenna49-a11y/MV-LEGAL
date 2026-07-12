import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '#hero' },
  { label: 'Sobre Nosotros', href: '#about' },
  { label: 'Servicios', href: '#services' },
  { label: 'Testimonios', href: '#testimonials' },
  { label: 'Blog', href: '#/blog' },
  { label: 'Contacto', href: '#contact' },
];

export default function Navigation() {
  const navRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [hidden, setHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      setScrolled(currentY > 50);
      setHidden(currentY > lastScrollY.current && currentY > 400);
      lastScrollY.current = currentY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const logo = nav.querySelector('.nav-logo');
    const links = nav.querySelectorAll('.nav-link');
    const cta = nav.querySelector('.nav-cta');
    const phone = nav.querySelector('.nav-phone');

    const tl = gsap.timeline({ delay: 2.2 });
    tl.to(logo, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to(links, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.08 }, '-=0.4')
      .to(phone, { opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to(cta, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3');
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px' }
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    // Blog link navigates to blog page
    if (href === '#/blog') {
      window.location.hash = '#/blog';
      setMobileOpen(false);
      return;
    }
    const nav = (window as unknown as Record<string, (h: string) => void>).__mvNavigateToSection;
    if (nav) {
      nav(href);
    } else {
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-[#0A0908]/90 backdrop-blur-[16px] shadow-[0_1px_0_rgba(201,169,98,0.1)]'
            : 'bg-transparent'
        }`}
        style={{
          height: 80,
          transform: hidden ? 'translateY(-100%)' : 'translateY(0)',
          transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s ease',
        }}
      >
        <div className="content-max-width h-full flex items-center justify-between" style={{ padding: '0 48px' }}>
          {/* Logo */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="nav-logo opacity-0 cursor-hover flex items-center gap-3"
            data-cursor-text="Home"
          >
            <img src="/logo-gold.png" alt="MV-LEGAL" style={{ height: 32, width: 'auto' }} />
            <span className="label-style text-gold" style={{ letterSpacing: '0.15em', fontSize: 14 }}>MV-LEGAL</span>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center" style={{ gap: 36 }}>
            {navLinks.map((link) => {
              const isPageLink = link.href.startsWith('#/');
              const isActive = !isPageLink && activeSection === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`nav-link body-small transition-colors duration-300 opacity-0 cursor-hover relative ${
                    isActive ? 'text-[#F5F5F0]' : 'text-[#8A8A82] hover:text-[#F5F5F0]'
                  }`}
                  data-cursor-text={link.label}
                  style={{
                    letterSpacing: '0.02em',
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 h-[1px] bg-gold"
                      style={{
                        width: '100%',
                        animation: 'navUnderline 0.3s ease forwards',
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Right side: Phone + CTA */}
          <div className="hidden lg:flex items-center" style={{ gap: 24 }}>
            <a
              href="tel:+34667308990"
              className="nav-phone flex items-center gap-2 text-[#8A8A82] hover:text-gold transition-colors duration-300 opacity-0 cursor-hover"
              data-cursor-text="Llamar"
            >
              <Phone size={16} />
              <span className="body-small" style={{ letterSpacing: '0.02em' }}>667 30 89 90</span>
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="nav-cta btn-gold hidden lg:inline-block opacity-0 cursor-hover"
              style={{ padding: '12px 28px', fontSize: 11 }}
              data-cursor-text="Consultar"
            >
              Consulta Gratis
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-[#F5F5F0] cursor-hover"
            onClick={() => setMobileOpen(true)}
            style={{ cursor: 'none' }}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-[#0A0908] transition-all duration-700 lg:hidden ${
          mobileOpen ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: mobileOpen ? 'all' : 'none',
        }}
      >
        <div className="flex flex-col h-full" style={{ padding: '32px 24px' }}>
          <div className="flex justify-between items-center mb-16">
            <div className="flex items-center gap-3">
            <img src="/logo-gold.png" alt="MV-LEGAL" style={{ height: 28, width: 'auto' }} />
            <span className="label-style text-gold" style={{ letterSpacing: '0.15em', fontSize: 14 }}>
              MV-LEGAL
            </span>
          </div>
            <button
              onClick={() => setMobileOpen(false)}
              className="text-[#F5F5F0]"
              style={{ cursor: 'none' }}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col" style={{ gap: 24 }}>
            {navLinks.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-[#F5F5F0] font-['Cormorant_Garamond'] font-medium"
                style={{
                  fontSize: 40,
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${0.1 + i * 0.06}s`,
                }}
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="mt-auto">
            <a
              href="tel:+34667308990"
              className="flex items-center gap-3 text-gold mb-6"
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}
            >
              <Phone size={22} />
              667 30 89 90
            </a>
            <a
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="btn-gold w-full text-center block cursor-hover"
              style={{ padding: '18px' }}
              data-cursor-text="Consultar"
            >
              Consulta Gratis
            </a>
          </div>
        </div>
      </div>
    </>
  );
}