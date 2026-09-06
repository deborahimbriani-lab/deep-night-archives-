'use client';

export default function DossierPage() {
  return (
    <main style={{
      minHeight: '100dvh',
      backgroundColor: '#050505',
      color: '#c0c0c0',
      padding: '24px 16px',
      fontFamily: 'monospace',
      overflowY: 'auto'
    }}>
      <div style={{ maxWidth: '680px', margin: '0 auto' }}>
        <div style={{ borderBottom: '1px solid #8B0000', paddingBottom: '12px', marginBottom: '24px' }}>
          <span style={{ color: '#8B0000', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            CLASSIFIED // FORENSIC ARCHIVE
          </span>
          <h1 style={{ color: '#e0e0e0', margin: '8px 0 0 0', fontSize: '1.4rem' }}>
            DOSSIER REPORT: CASE 01
          </h1>
        </div>

        <div style={{
          border: '1px dashed #333333',
          padding: '16px',
          textAlign: 'center',
          margin: '20px 0',
          color: '#555555',
          fontSize: '0.75rem'
        }}>
          [ AD UNIT: MONETIZATION ACTIVE ]
        </div>

        <article style={{ lineHeight: '1.7', fontSize: '0.9rem', color: '#a0a0a0' }}>
          <p>&gt; REPERTO AUTOPTICO #409-B</p>
          <p>
            Trascrizione dattiloscritta del primo rilievo sulla scena.
            Alterazioni volumetriche e degradazione del segnale analogico documentate.
          </p>
        </article>
      </div>
    </main>
  );
}
