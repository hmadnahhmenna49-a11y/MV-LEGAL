import LegalLayout from './LegalLayout';

export default function PoliticaPrivacidad() {
  return (
    <LegalLayout title="Política de Privacidad" lastUpdated="1 de enero de 2025">
      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>1. Responsable del tratamiento</h2>
      <p className="body-small text-gris mb-4" style={{ lineHeight: 1.9 }}>En cumplimiento del RGPD y la LOPDGDD:</p>
      <div className="mb-10 p-6" style={{ background: 'rgba(201, 169, 98, 0.03)', border: '1px solid rgba(201, 169, 98, 0.1)' }}>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Responsable:</span> María José Vivo Zaragozá</p>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Nombre comercial:</span> MV-LEGAL Abogados</p>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Domicilio:</span> Carrer dels Pellers, 30 bajo, Gandía 46702 (Valencia)</p>
        <p className="body-small text-blanc" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Correo:</span> info@mv-legal.es · <span className="text-[#5A5A55]">Teléfono:</span> 667 30 89 90</p>
      </div>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>2. Finalidad del tratamiento</h2>
      <ul className="mb-6 flex flex-col" style={{ gap: 8, paddingLeft: 0 }}>
        {['Atender y gestionar su solicitud de contacto o consulta inicial.', 'Enviarle el presupuesto solicitado, en su caso.', 'Gestionar la relación profesional derivada del contrato de servicios legales.', 'Enviar comunicaciones comerciales, únicamente con su consentimiento previo.', 'Cumplir con las obligaciones legales aplicables.'].map((item, i) => (
          <li key={i} className="flex items-start gap-3 body-small text-gris" style={{ lineHeight: 1.8 }}><span className="text-gold mt-1" style={{ minWidth: 6 }}>•</span>{item}</li>
        ))}
      </ul>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>3. Base legal del tratamiento</h2>
      <ul className="mb-6 flex flex-col" style={{ gap: 8, paddingLeft: 0 }}>
        {['Consentimiento del interesado (art. 6.1.a RGPD): para comunicaciones comerciales.', 'Ejecución de un contrato (art. 6.1.b RGPD): para la prestación de servicios jurídicos.', 'Interés legítimo (art. 6.1.f RGPD): para gestión de consultas.', 'Obligación legal (art. 6.1.c RGPD): para obligaciones fiscales y de la profesión.'].map((item, i) => (
          <li key={i} className="flex items-start gap-3 body-small text-gris" style={{ lineHeight: 1.8 }}><span className="text-gold mt-1" style={{ minWidth: 6 }}>•</span>{item}</li>
        ))}
      </ul>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>4. Plazo de conservación</h2>
      <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>Los datos se conservarán durante el tiempo necesario para cumplir con la finalidad para la que fueron recogidos. Los datos de clientes se conservarán durante la vigencia del contrato y los plazos de prescripción aplicables. Los datos de formularios de contacto se conservarán máximo 12 meses.</p>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>5. Derechos del interesado</h2>
      <p className="body-small text-gris mb-4" style={{ lineHeight: 1.9 }}>De acuerdo con el RGPD, usted tiene derecho a:</p>
      <ul className="mb-6 flex flex-col" style={{ gap: 8, paddingLeft: 0 }}>
        {['Acceder, rectificar y solicitar la supresión de sus datos.', 'Oponerse al tratamiento y solicitar su limitación.', 'Solicitar la portabilidad de sus datos.', 'Revocar el consentimiento en cualquier momento.'].map((item, i) => (
          <li key={i} className="flex items-start gap-3 body-small text-gris" style={{ lineHeight: 1.8 }}><span className="text-gold mt-1" style={{ minWidth: 6 }}>•</span>{item}</li>
        ))}
      </ul>
      <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>Para ejercer estos derechos: <span className="text-gold">info@mv-legal.es</span>. También puede presentar reclamación ante la AEPD: <span className="text-gold">www.aepd.es</span>.</p>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>6. Medidas de seguridad</h2>
      <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>MV-LEGAL Abogados adopta las medidas técnicas y organizativas necesarias para garantizar la seguridad e integridad de los datos personales, con protocolos de cifrado SSL/TLS para las comunicaciones.</p>
    </LegalLayout>
  );
}