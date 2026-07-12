import LegalLayout from './LegalLayout';

export default function DesistirContrato() {
  return (
    <LegalLayout title="Desistir del Contrato" lastUpdated="1 de enero de 2025">
      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>1. Derecho de desistimiento</h2>
      <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>De conformidad con la Ley 7/1998 y el TRLGDCU, el cliente tiene derecho a desistir del contrato de servicios jurídicos sin necesidad de justificación en el plazo de catorce (14) días naturales contados a partir de la firma del mismo. Este derecho es aplicable a los contratos celebrados fuera del establecimiento mercantil, a distancia o mediante medios electrónicos.</p>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>2. Exclusiones al derecho de desistimiento</h2>
      <ul className="mb-6 flex flex-col" style={{ gap: 8, paddingLeft: 0 }}>
        {['Cuando el contrato haya sido plenamente ejecutado por ambas partes con consentimiento expreso.', 'Cuando el precio dependa de fluctuaciones del mercado financiero no controlables.', 'Cuando el servicio haya comenzado con consentimiento expreso del consumidor.', 'Cuando la prestación se haya comenzado antes de finalizar el plazo de desistimiento.'].map((item, i) => (
          <li key={i} className="flex items-start gap-3 body-small text-gris" style={{ lineHeight: 1.8 }}><span className="text-gold mt-1" style={{ minWidth: 6 }}>•</span>{item}</li>
        ))}
      </ul>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>3. Modelo de formulario de desistimiento</h2>
      <div className="mb-10 p-6 md:p-8" style={{ background: 'rgba(201, 169, 98, 0.03)', border: '1px solid rgba(201, 169, 98, 0.1)' }}>
        <p className="mono-style text-[#5A5A55] mb-4" style={{ fontSize: 11 }}>MODELO DE FORMULARIO DE DESISTIMIENTO</p>
        <div className="body-small text-blanc" style={{ lineHeight: 2.2 }}>
          <p>— A la atención de:</p>
          <p className="ml-4 text-gold">MV-LEGAL Abogados · María José Vivo Zaragozá</p>
          <p className="ml-4 mb-4">Carrer dels Pellers, 30 bajo, Gandía 46702 (Valencia)</p>
          <p>— Por medio de la presente, yo/nosotros <span style={{ borderBottom: '1px solid rgba(201, 169, 98, 0.3)', minWidth: 200, display: 'inline-block' }} /> declaramos desistir del contrato de servicios jurídicos celebrado con fecha <span style={{ borderBottom: '1px solid rgba(201, 169, 98, 0.3)', minWidth: 120, display: 'inline-block' }} />.</p>
          <p className="mt-4">— Nombre y apellidos: <span style={{ borderBottom: '1px solid rgba(201, 169, 98, 0.3)', minWidth: 300, display: 'inline-block' }}>&nbsp;</span></p>
          <p className="mt-2">— DNI/NIE: <span style={{ borderBottom: '1px solid rgba(201, 169, 98, 0.3)', minWidth: 200, display: 'inline-block' }}>&nbsp;</span></p>
          <p className="mt-2">— Firma: <span style={{ borderBottom: '1px solid rgba(201, 169, 98, 0.3)', minWidth: 200, display: 'inline-block' }} /></p>
          <p className="mt-2">— Fecha: <span style={{ borderBottom: '1px solid rgba(201, 169, 98, 0.3)', minWidth: 120, display: 'inline-block' }} /></p>
        </div>
      </div>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>4. Consecuencias del desistimiento</h2>
      <p className="body-small text-gris mb-6" style={{ lineHeight: 1.9 }}>En caso de desistimiento, MV-LEGAL Abogados devolverá todos los pagos recibidos sin demora injustificada y en el plazo máximo de catorce (14) días naturales. La devolución se efectuará utilizando el mismo medio de pago empleado inicialmente. No obstante, podrá retener una cantidad proporcional al valor de los servicios ya efectivamente prestados si el cliente solicitó expresamente comenzar durante el plazo de desistimiento.</p>

      <h2 className="text-blanc mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 500 }}>5. Vía de notificación</h2>
      <div className="p-6" style={{ background: 'rgba(201, 169, 98, 0.03)', border: '1px solid rgba(201, 169, 98, 0.1)' }}>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Correo electrónico:</span> <span className="text-gold">info@mv-legal.es</span></p>
        <p className="body-small text-blanc mb-2" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Correo postal:</span> Carrer dels Pellers, 30 bajo, Gandía 46702 (Valencia)</p>
        <p className="body-small text-blanc" style={{ lineHeight: 1.8 }}><span className="text-[#5A5A55]">Teléfono:</span> 667 30 89 90</p>
      </div>
    </LegalLayout>
  );
}