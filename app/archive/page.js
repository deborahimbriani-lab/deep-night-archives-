'use client';

export default function ArchivePage() {
  return (
    <main style={{
      width: '100vw',
      height: '100dvh',
      backgroundColor: '#000000',
      color: '#8B0000',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'monospace',
      padding: '20px',
      boxSizing: 'border-box',
      textAlign: 'center'
    }}>
      <div style={{ border: '1px solid #8B0000', padding: '30px 20px', maxWidth: '450px' }}>
        <h2 style={{ fontSize: '1.2rem', letterSpacing: '0.25em', margin: '0 0 12px 0' }}>
          RESTRICTED ARCHIVE
        </h2>
        <p style={{ color: '#555555', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
          SIGNAL UNLOCKED // ZERO PUBLIC ACCESS
        </p>
        <div style={{ marginTop: '24px', color: '#666666', fontSize: '0.85rem' }}>
          [ AUDIO INTERCEPT 01: READY ]
        </div>
      </div>
    </main>
  );
}
