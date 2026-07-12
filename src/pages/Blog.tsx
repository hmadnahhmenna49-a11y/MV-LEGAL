import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowLeft, Clock, User, ArrowRight } from 'lucide-react';

interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  image: string;
  content: string[];
}

const articles: Article[] = [
  {
    id: 'mv-legal-15-anos-experiencia',
    title: 'MV-LEGAL: 15 Años de Excelencia Legal en la Comunidad Valenciana',
    excerpt: 'Desde nuestras oficinas en Gandía, hemos construido un bufete de abogados multidisciplinar que ha atendido a más de 2.000 clientes, consolidándonos como referente en el ámbito jurídico de la provincia de Valencia.',
    category: 'Sobre Nosotros',
    date: '15 de junio de 2025',
    readTime: '6 min',
    author: 'María José Vivo',
    image: '/blog/mv-legal-15-anos.png',
    content: [
      'Cuando fundé MV-LEGAL hace más de quince años, mi visión era clara: crear un bufete que combinara la rigorosidad técnica del derecho con una atención humana y personalizada. En un sector donde la distancia profesional entre abogado y cliente suele ser la norma, apostamos por construir relaciones de confianza duraderas, donde cada persona que cruza nuestra puerta se siente escuchada y comprendida.',
      'Nuestra sede en el Carrer dels Pellers, 30 bajo de Gandía, se ha convertido en un punto de referencia para ciudadanos y empresas de toda la comarca de La Safor y más allá. A lo largo de estos años, hemos atendido a más de dos mil clientes en áreas tan diversas como el derecho de familia, el derecho inmobiliario, la mediación civil y mercantil, y el asesoramiento empresarial. Cada caso nos ha enseñado algo nuevo y nos ha permitido perfeccionar nuestros procesos internos para ofrecer un servicio más eficiente.',
      'Lo que distingue a MV-LEGAL es nuestro enfoque integral. No nos limitamos a resolver un problema jurídico puntual, sino que analizamos la situación completa de cada cliente para anticipar posibles conflictos futuros y ofrecer soluciones preventivas. Este enfoque proactivo ha sido clave para mantener una tasa de satisfacción superior al 95% entre nuestros clientes, muchos de los cuales confían en nosotros de manera recurrente a lo largo de los años.',
      'La incorporación de la tecnología en nuestros procesos ha sido otra de las piedras angulares de nuestra evolución. Hemos implementado sistemas de gestión documental avanzados, plataformas de comunicación segura con clientes y herramientas de análisis jurídico que nos permiten trabajar con mayor precisión y rapidez. Sin embargo, nunca hemos perdido de vista que la tecnología es un medio, no un fin: el corazón de nuestro trabajo sigue siendo la relación humana con cada cliente.',
      'Mirando hacia el futuro, MV-LEGAL continúa expandiendo sus áreas de especialización y fortaleciendo su equipo humano. Nuestro compromiso con la formación continua nos permite estar siempre actualizados en los cambios legislativos y jurisprudenciales que afectan a nuestros clientes. Porque en derecho, como en la vida, la excelencia no es un destino, sino un camino que se recorre cada día con dedicación y pasión.',
    ],
  },
  {
    id: 'derecho-familia-guia-2025',
    title: 'Guía Completa: Cómo Enfrentar un Proceso de Separación en España en 2025',
    excerpt: 'La separación y el divorcio son momentos críticos que requieren asesoramiento legal especializado. Explicamos los pasos fundamentales, los derechos de cada parte y las novedades legislativas más relevantes del año.',
    category: 'Derecho de Familia',
    date: '3 de julio de 2025',
    readTime: '8 min',
    author: 'María José Vivo',
    image: '/blog/derecho-familia.png',
    content: [
      'El derecho de familia es una de las áreas jurídicas con mayor impacto emocional y económico en la vida de las personas. En España, las separaciones y divorcios continúan siendo uno de los motivos de consulta más frecuentes en los bufetes de abogados. Según datos del INE, se formalizan más de 80.000 divorcios al año en nuestro país, una cifra que refleja la importancia de contar con un asesoramiento legal adecuado desde el primer momento.',
      'El primer paso en cualquier proceso de separación es determinar la vía más adecuada: el divorcio contencioso o el divorcio de mutuo acuerdo. En MV-LEGAL siempre recomendamos, cuando es posible, la vía del mutuo acuerdo o la mediación familiar. Estos procesos son más rápidos, menos costosos y generan menor desgaste emocional para todas las partes involucradas, especialmente cuando hay menores en común. Nuestra experiencia demuestra que los acuerdos alcanzados mediante diálogo suelen ser más duraderos y satisfactorios que las imposiciones judiciales.',
      'Los aspectos más sensibles en una separación suelen ser la custodia de los hijos menores, la pensión alimenticia y la distribución del patrimonio conyugal. Respecto a la custodia, la tendencia jurisprudencial en España se inclina cada vez más hacia la custodia compartida, considerándola como el régimen ideal salvo que concurran circunstancias que la hagan desaconsejable. Es fundamental que cada caso se estudie de forma individualizada, valorando el interés superior del menor por encima de cualquier otra consideración.',
      'En cuanto a la pensión alimenticia, el Código Civil establece que ambos progenitores deben contribuir al sostenimiento de los hijos en proporción a sus ingresos y recursos. La reciente jurisprudencia del Tribunal Supremo ha matizado algunos criterios de cálculo, introduciendo mayor flexibilidad para adaptarse a las realidades económicas cambiantes. En MV-LEGAL, trabajamos con peritos económicos y_forenses para garantizar que las cantidades fijadas sean justas y proporcionadas.',
      'Finalmente, es importante destacar que una separación bien gestionada desde el punto de vista legal puede marcar la diferencia entre un nuevo comienzo estable y un conflicto prolongado. En MV-LEGAL acompañamos a nuestros clientes en cada etapa del proceso, desde la primera consulta hasta la firma de la conveniencia reguladora y su posterior homologación judicial, proporcionando la tranquilidad y seguridad que necesitan en momentos difíciles.',
    ],
  },
  {
    id: 'compra-venta-inmuebles-valencia',
    title: 'Comprar Vivienda en Valencia: Los Errores Jurídicos Más Comunes y Cómo Evitarlos',
    excerpt: 'El mercado inmobiliario valenciano atrae a compradores nacionales e internacionales. Revelamos los errores jurídicos más frecuentes en las transacciones inmobiliarias y cómo proteger su inversión desde el primer momento.',
    category: 'Derecho Inmobiliario',
    date: '20 de junio de 2025',
    readTime: '7 min',
    author: 'María José Vivo',
    image: '/blog/compra-inmuebles.png',
    content: [
      'La Comunidad Valenciana, y especialmente la provincia de Valencia, ha experimentado en los últimos años un auge significativo en el mercado inmobiliario. La combinación de un clima privilegiado, una calidad de vida excepcional y precios más competitivos que otras zonas de la costa mediterránea ha atraído a compradores de toda España y del extranjero. Sin embargo, detrás de cada operación de compraventa se esconden riesgos jurídicos que, si no se gestionan correctamente, pueden convertir la compra del hogar soñado en una pesadilla legal.',
      'Uno de los errores más frecuentes que observamos en nuestra práctica diaria es la firma del contrato de arras sin una verificación jurídica previa suficiente. Muchos compradores entregan cantidades significativas de dinero sin haber comprobado la situación registral del inmueble, los posibles cargas y gravámenes, las licencias de obra o la situación urbanística del terreno. En MV-LEGAL realizamos siempre una due diligence completa antes de cualquier compromiso económico, lo que nos ha permitido detectar problemas ocultos que habrían supuesto pérdidas económicas importantes para nuestros clientes.',
      'Otro aspecto crítico es la verificación de la identidad y legitimidad del vendedor. En casos de herencias yacentes, propiedades en proindiviso o comunidades de bienes, es esencial asegurarse de que todas las partes con derecho a vender han dado su consentimiento. Hemos atendido casos de compradores que firmaron contratos con personas que no tenían capacidad legal para vender, lo que derivó en litigios largos y costosos que pudieron evitarse con una comprobación previa adecuada.',
      'Para los compradores extranjeros, especialmente los procedentes de fuera de la Unión Europea, existen requisitos adicionales como la obtención del NIE (Número de Identidad de Extranjero) y, en algunos casos, la verificación de la procedencia de los fondos conforme a la normativa antiblanqueo de capitales. En MV-LEGAL contamos con experiencia en operaciones internacionales y podemos guiar a los compradores extranjeros a través de todo el proceso en su propio idioma, garantizando el cumplimiento de todos los requisitos legales.',
      'Nuestra recomendación es siempre la misma: nunca firme nada ni entregue dinero sin haber consultado previamente con un abogado especializado en derecho inmobiliario. El coste de un asesoramiento preventivo es insignificante comparado con el coste de un litigio inmobiliario. En MV-LEGAL ofrecemos un servicio integral que abarca desde la verificación inicial hasta la firma de la escritura pública y el registro de la propiedad, proporcionando a nuestros clientes la tranquilidad de que su inversión está protegida.',
    ],
  },
  {
    id: 'asesoramiento-empresarial-pymes',
    title: 'Por Qué Tu PYME Necesita Asesoramiento Legal Permanente: Más Allá de las Multas',
    excerpt: 'Muchos pequeños y medianos empresarios solo acuden al abogado cuando surge un problema. Explicamos por qué el asesoramiento legal preventivo es una inversión, no un gasto, y cómo puede proteger el futuro de su empresa.',
    category: 'Derecho Empresarial',
    date: '8 de julio de 2025',
    readTime: '7 min',
    author: 'María José Vivo',
    image: '/blog/asesoramiento-empresarial.png',
    content: [
      'En el ecosistema empresarial español, las PYMEs representan más del 99% del tejido empresarial y generan aproximadamente dos tercios del empleo privado. Sin embargo, una gran parte de estos negocios opera sin un asesoramiento legal adecuado, esperando a que surja un problema para buscar ayuda profesional. Esta estrategia reactiva, además de ser más costosa, puede poner en riesgo la viabilidad misma de la empresa cuando los conflictos legales alcanzan dimensiones significativas.',
      'El asesoramiento legal preventivo abarca múltiples áreas que muchas PYMEs descuidan: la redacción y revisión de contratos con proveedores y clientes, la protección de la propiedad intelectual e industrial, el cumplimiento de la normativa laboral y de protección de datos, y la adecuada configuración societaria desde la constitución de la empresa. Un contrato mal redactado o una cláusula ambigua puede ser el origen de un litigio que suponga costes judiciales muy superiores a lo que habría costado una revisión profesional inicial.',
      'La normativa RGPD y la Ley Orgánica de Protección de Datos Personales y garantía de los derechos digitales (LOPDGDD) continúan siendo una fuente de preocupación para muchas empresas. Las sanciones por incumplimiento pueden alcanzar los 20 millones de euros o el 4% de la facturación global anual. En MV-LEGAL ayudamos a las empresas a implementar protocolos de protección de datos adecuados a su tamaño y actividad, realizando auditorías periódicas y formando a los empleados en las mejores prácticas de tratamiento de datos personales.',
      'Otro aspecto fundamental es la planificación laboral. Los cambios en la legislación laboral española, incluyendo las reformas recientes sobre modalidades de contratación y teletrabajo, requieren una actualización constante de los contratos y políticas internas de la empresa. Un error en la clasificación de un trabajador o en la aplicación de un convenio colectivo puede derivar en inspecciones de trabajo, sanciones económicas y reclamaciones ante los tribunales sociales.',
      'En MV-LEGAL ofrecemos planes de asesoramiento legal periódico adaptados a las necesidades y presupuesto de cada empresa. Desde revisiones trimestrales hasta servicios de atención permanente, nuestro objetivo es que los empresarios puedan centrarse en lo que mejor saben hacer: hacer crecer su negocio, con la tranquilidad de que el aspecto legal está cubierto por profesionales especializados. Porque el mejor litigio es el que nunca llega a producirse.',
    ],
  },
];

function BlogList({ onArticleClick }: { onArticleClick: (article: Article) => void }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = listRef.current;
    if (!el) return;
    const cards = el.querySelectorAll('.blog-card');
    gsap.fromTo(cards, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', stagger: 0.12, delay: 0.3 });
  }, []);

  return (
    <section className="w-full section-padding" style={{ paddingTop: 140 }}>
      <div className="content-max-width" ref={listRef}>
        <a
          href="#/"
          className="blog-card opacity-0 inline-flex items-center gap-2 text-[#8A8A82] hover:text-gold transition-colors duration-300 mb-8 cursor-hover"
          data-cursor-text="Volver"
        >
          <ArrowLeft size={16} />
          <span className="body-small" style={{ letterSpacing: '0.02em' }}>Volver al inicio</span>
        </a>

        <div className="blog-card opacity-0 mb-4">
          <p className="label-style text-gold mb-3" style={{ letterSpacing: '0.12em' }}>Blog Jurídico</p>
        </div>
        <h1
          className="blog-card opacity-0 text-blanc mb-4"
          style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 'clamp(32px, 5vw, 56px)', lineHeight: 1.1, fontWeight: 500 }}
        >
          Análisis y Perspectivas Legales
        </h1>
        <div className="blog-card opacity-0 mb-4" style={{ width: 60, height: 1, background: '#C9A962' }} />
        <p className="blog-card opacity-0 text-gris mb-16 body-large" style={{ maxWidth: 640, lineHeight: 1.7 }}>
          Artículos escritos por nuestro equipo sobre actualidad jurídica, consejos legales y novedades legislativas que afectan a ciudadanos y empresas.
        </p>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              onClick={() => onArticleClick(article)}
              className="blog-card opacity-0 group cursor-hover"
              data-cursor-text="Leer"
              style={{
                background: '#141312',
                border: '1px solid rgba(245, 245, 240, 0.06)',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                overflow: 'hidden',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.4)';
                e.currentTarget.style.background = 'rgba(201, 169, 98, 0.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(245, 245, 240, 0.06)';
                e.currentTarget.style.background = '#141312';
              }}
            >
              {/* Image */}
              <div
                style={{
                  height: 200,
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                  }}
                  className="group-hover:scale-105"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(10, 9, 8, 0.7) 0%, transparent 60%)',
                }} />
                {/* Category badge */}
                <div
                  className="absolute top-4 left-4 label-style"
                  style={{
                    fontSize: 10,
                    padding: '6px 14px',
                    background: 'rgba(10, 9, 8, 0.6)',
                    backdropFilter: 'blur(8px)',
                    color: '#C9A962',
                    border: '1px solid rgba(201, 169, 98, 0.3)',
                    letterSpacing: '0.08em',
                  }}
                >
                  {article.category}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '32px' }}>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-1.5 text-[#5A5A55]">
                    <Clock size={12} />
                    <span className="mono-style" style={{ fontSize: 11 }}>{article.readTime}</span>
                  </div>
                  <span style={{ color: 'rgba(245, 245, 240, 0.1)' }}>|</span>
                  <span className="mono-style text-[#5A5A55]" style={{ fontSize: 11 }}>{article.date}</span>
                </div>

                <h2
                  className="text-blanc mb-3 transition-colors duration-300 group-hover:text-gold"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 24,
                    fontWeight: 500,
                    lineHeight: 1.25,
                  }}
                >
                  {article.title}
                </h2>

                <p className="text-gris body-small mb-6" style={{ lineHeight: 1.7 }}>
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: 'rgba(201, 169, 98, 0.15)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 11,
                        color: '#C9A962',
                        fontFamily: "'Inter', sans-serif",
                        fontWeight: 600,
                      }}
                    >
                      MJ
                    </div>
                    <span className="body-small text-[#5A5A55]" style={{ fontSize: 12 }}>{article.author}</span>
                  </div>
                  <div
                    className="flex items-center gap-1.5 text-[#8A8A82] group-hover:text-gold transition-colors duration-300"
                    style={{ fontSize: 12 }}
                  >
                    <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 500, letterSpacing: '0.04em' }}>Leer más</span>
                    <ArrowRight size={14} style={{ transition: 'transform 0.3s ease', transform: 'translateX(0)' }} className="group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ArticleView({ article, onBack }: { article: Article; onBack: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const el = contentRef.current;
    if (!el) return;
    const elements = el.querySelectorAll('.article-animate');
    gsap.fromTo(elements, { opacity: 0, y: 25 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out', stagger: 0.06, delay: 0.2 });
  }, [article.id]);

  return (
    <section className="w-full section-padding" style={{ paddingTop: 140 }}>
      <div className="content-max-width" ref={contentRef}>
        <a
          href="#/blog"
          onClick={(e) => { e.preventDefault(); onBack(); }}
          className="article-animate opacity-0 inline-flex items-center gap-2 text-[#8A8A82] hover:text-gold transition-colors duration-300 mb-10 cursor-hover"
          data-cursor-text="Blog"
        >
          <ArrowLeft size={16} />
          <span className="body-small" style={{ letterSpacing: '0.02em' }}>Volver al Blog</span>
        </a>

        {/* Category + Meta */}
        <div className="article-animate opacity-0 flex flex-wrap items-center gap-4 mb-6">
          <span
            className="label-style"
            style={{
              fontSize: 10,
              padding: '6px 14px',
              background: 'rgba(201, 169, 98, 0.15)',
              color: '#C9A962',
              border: '1px solid rgba(201, 169, 98, 0.3)',
              letterSpacing: '0.08em',
            }}
          >
            {article.category}
          </span>
          <div className="flex items-center gap-1.5 text-[#5A5A55]">
            <Clock size={12} />
            <span className="mono-style" style={{ fontSize: 11 }}>{article.readTime} de lectura</span>
          </div>
          <span style={{ color: 'rgba(245, 245, 240, 0.1)' }}>|</span>
          <span className="mono-style text-[#5A5A55]" style={{ fontSize: 11 }}>{article.date}</span>
        </div>

        {/* Title */}
        <h1
          className="article-animate opacity-0 text-blanc mb-6"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 'clamp(28px, 4vw, 48px)',
            lineHeight: 1.15,
            fontWeight: 500,
            maxWidth: 800,
          }}
        >
          {article.title}
        </h1>

        {/* Author */}
        <div className="article-animate opacity-0 flex items-center gap-3 mb-10">
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'rgba(201, 169, 98, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 14,
              color: '#C9A962',
              fontFamily: "'Inter', sans-serif",
              fontWeight: 600,
            }}
          >
            MJ
          </div>
          <div>
            <p className="text-blanc body-small" style={{ fontWeight: 500, fontSize: 14 }}>{article.author}</p>
            <p className="text-[#5A5A55] mono-style" style={{ fontSize: 11 }}>Abogada · N.º Colegiada 12.348 ICAV</p>
          </div>
        </div>

        {/* Divider */}
        <div className="article-animate opacity-0 mb-10" style={{ width: 60, height: 1, background: '#C9A962' }} />

        {/* Article Body */}
        <div className="article-animate opacity-0 max-w-[800px]">
          {/* Hero image */}
          <div
            className="mb-12"
            style={{
              height: 300,
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid rgba(245, 245, 240, 0.06)',
            }}
          >
            <img
              src={article.image}
              alt={article.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(10, 9, 8, 0.5) 0%, transparent 50%)',
            }} />
          </div>

          {article.content.map((paragraph, i) => (
            <p
              key={i}
              className="text-gris mb-6"
              style={{
                fontSize: 16,
                lineHeight: 1.85,
                fontFamily: "'Inter', sans-serif",
                fontWeight: 400,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="article-animate opacity-0 mt-16 pt-10" style={{ borderTop: '1px solid rgba(245, 245, 240, 0.06)' }}>
          <p className="text-blanc mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 500 }}>
            ¿Necesita asesoramiento legal?
          </p>
          <p className="text-gris body-small mb-6" style={{ maxWidth: 500 }}>
            En MV-LEGAL ofrecemos consulta inicial gratuita. Permítanos ayudarle con su caso.
          </p>
          <a href="#/" className="btn-gold cursor-hover inline-block" data-cursor-text="Consultar">
            Consulta Gratuita
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Blog() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  // Listen for hash changes to handle browser back/forward
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash === '#/blog') {
        setSelectedArticle(null);
      }
    };
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, []);

  if (selectedArticle) {
    return <ArticleView article={selectedArticle} onBack={() => setSelectedArticle(null)} />;
  }

  return <BlogList onArticleClick={(article) => {
    setSelectedArticle(article);
    window.location.hash = '#/blog';
  }} />;
}