import LegalLayout from './LegalLayout';

export default function AvisoLegal() {
  return (
    <LegalLayout title="Aviso Legal" lastUpdated="1 de enero de 2025">
      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>1. Datos identificativos</h2>
      <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>En cumplimiento con la Ley 34/2002, de 11 de julio, de Servicios de la Sociedad de la Información y del Comercio Electrónico (LSSICE), se facilitan los siguientes datos:</p>
      <div className="mb-10 p-6" style={{ background: 'rgba(201, 169, 98, 0.03)', border: '1px solid rgba(201, 169, 98, 0.1)' }}>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Denominación:</span> MV-LEGAL Abogados</p>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Titular:</span> María José Vivo Zaragozá</p>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Domicilio profesional:</span> Carrer dels Pellers, 30 bajo, Gandía 46702 (Valencia)</p>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Colegio Profesional:</span> Ilustre Colegio de Abogados de Valencia (ICAV)</p>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">N.º de Colegiada:</span> 12.348</p>
        <p className="body-small text-blanc" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Correo electrónico:</span> info@mv-legal.es</p>
      </div>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>2. Objeto</h2>
      <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>Este sitio web tiene como finalidad poner a disposición de los usuarios información sobre los servicios jurídicos ofrecidos por MV-LEGAL Abogados, así como facilitar el contacto y la solicitud de consultas. El contenido de esta página web es de carácter meramente informativo y en ningún caso constituye asesoramiento legal personalizado. La relación abogado-cliente solo se establece mediante la firma del correspondiente contrato de servicios legales.</p>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>3. Condiciones de uso</h2>
      <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>El acceso a este sitio web es gratuito y no requiere registro previo. El usuario se compromete a utilizar los contenidos y servicios de conformidad con la ley, la moral y el orden público. Queda expresamente prohibido cualquier uso que suponga un perjuicio para los derechos e intereses legítimos de MV-LEGAL Abogados o de terceros. MV-LEGAL Abogados se reserva el derecho de modificar, en cualquier momento y sin previo aviso, la presentación, configuración y contenido del sitio web.</p>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>4. Propiedad intelectual e industrial</h2>
      <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>Todos los contenidos del sitio web, incluyendo textos, fotografías, gráficos, imágenes, iconos, tecnología, software, enlaces y demás contenidos audiovisuales o sonoros, así como su diseño gráfico y códigos fuente, son propiedad intelectual de MV-LEGAL Abogados o de terceros que han autorizado su uso. Queda expresamente prohibida la reproducción, distribución, comunicación pública, transformación o cualquier otra actividad sin autorización expresa por escrito.</p>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>5. Exclusión de responsabilidad</h2>
      <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>MV-LEGAL Abogados no garantiza la disponibilidad continua e ininterrumpida del sitio web. Los contenidos se ofrecen con carácter informativo y no constituyen asesoramiento jurídico vinculante. No se responsabiliza de los contenidos de sitios web de terceros accesibles mediante enlaces desde este portal.</p>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>6. Legislación aplicable y jurisdicción</h2>
      <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>Las presentes condiciones se rigen por la legislación española. Para la resolución de cualquier controversia, las partes se someterán a los Juzgados y Tribunales del domicilio del titular, con renuncia expresa a cualquier otro fuero.</p>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>7. Contacto</h2>
      <div className="p-6" style={{ background: 'rgba(201, 169, 98, 0.03)', border: '1px solid rgba(201, 169, 98, 0.1)' }}>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Teléfono:</span> 667 30 89 90</p>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Email:</span> info@mv-legal.es</p>
        <p className="body-small text-blanc" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Dirección:</span> Carrer dels Pellers, 30 bajo, Gandía 46702 (Valencia)</p>
      </div>
    </LegalLayout>
  );
}