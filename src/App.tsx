import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import About from './sections/About';
import Services from './sections/Services';
import Stats from './sections/Stats';
import WhyChooseUs from './sections/WhyChooseUs';
import Testimonials from './sections/Testimonials';
import Philosophy from './sections/Philosophy';
import Contact from './sections/Contact';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import AvisoLegal from './pages/AvisoLegal';
import PoliticaPrivacidad from './pages/PoliticaPrivacidad';
import ConfiguracionCookies from './pages/ConfiguracionCookies';
import DesistirContrato from './pages/DesistirContrato';
import Blog from './pages/Blog';

gsap.registerPlugin(ScrollTrigger);

type Page = 'home' | 'aviso-legal' | 'politica-privacidad' | 'cookies' | 'desistir-contrato' | 'blog';

function getPage(): Page {
  const h = window.location.hash.replace('#/', '').replace('#', '');
  const valid: Page[] = ['home', 'aviso-legal', 'politica-privacidad', 'cookies', 'desistir-contrato', 'blog'];
  return valid.includes(h as Page) ? (h as Page) : 'home';
}

function HomePage() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Stats />
      <WhyChooseUs />
      <Testimonials />
      <Philosophy />
      <Contact />
      <CTA />
    </main>
  );
}

export default function App() {
  const [page, setPage] = useState<Page>(getPage);

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000); });
    gsap.ticker.lagSmoothing(0);
    return () => { lenis.destroy(); gsap.ticker.remove(lenis.raf as unknown as gsap.TickerCallback); };
  }, []);

  // Expose navigateToSection globally for Navigation/Footer to use
  useEffect(() => {
    (window as unknown as Record<string, unknown>).__mvNavigateToSection = (href: string) => {
      const hash = window.location.hash.replace('#/', '').replace('#', '');
      const isLegalPage = ['aviso-legal', 'politica-privacidad', 'cookies', 'desistir-contrato', 'blog'].includes(hash);
      if (isLegalPage) {
        sessionStorage.setItem('mv-scroll-to', href);
        window.location.hash = '';
      } else {
        const target = document.querySelector(href);
        if (target) target.scrollIntoView({ behavior: 'smooth' });
      }
    };
    return () => { delete (window as unknown as Record<string, unknown>).__mvNavigateToSection; };
  }, []);

  useEffect(() => {
    const onHash = () => {
      const newPage = getPage();
      setPage(newPage);
      const scrollTarget = sessionStorage.getItem('mv-scroll-to');
      if (scrollTarget && newPage === 'home') {
        sessionStorage.removeItem('mv-scroll-to');
        // Poll until the target section exists in DOM (React needs time to render)
        let attempts = 0;
        const tryScroll = () => {
          const el = document.querySelector(scrollTarget);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else if (attempts < 20) {
            attempts++;
            setTimeout(tryScroll, 100);
          }
        };
        setTimeout(tryScroll, 200);
      } else {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const renderPage = () => {
    switch (page) {
      case 'aviso-legal': return <AvisoLegal />;
      case 'politica-privacidad': return <PoliticaPrivacidad />;
      case 'cookies': return <ConfiguracionCookies />;
      case 'desistir-contrato': return <DesistirContrato />;
      case 'blog': return <Blog />;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-noir">
      <CustomCursor />
      <ScrollProgress />
      <Navigation />
      {renderPage()}
      <Footer />

      {/* Fixed WhatsApp Button */}
      <a
        href="https://wa.me/34667308990?text=Hola%2C%20me%20gustar%C3%ADa%20solicitar%20una%20consulta%20jur%C3%ADdica"
        target="_blank"
        rel="noopener noreferrer"
        className="cursor-hover"
        data-cursor-text="WhatsApp"
        aria-label="Contactar por WhatsApp"
        style={{
          position: 'fixed',
          bottom: 28,
          right: 28,
          zIndex: 9000,
          width: 56,
          height: 56,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #C9A962 0%, #A8893E 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 24px rgba(201, 169, 98, 0.35)',
          transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 32px rgba(201, 169, 98, 0.5)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 24px rgba(201, 169, 98, 0.35)';
        }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="#0A0908"/>
        </svg>
      </a>
    </div>
  );
}