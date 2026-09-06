'use client';

import { useState } from 'react';

export default function Home() {
  const [signalLocked, setSignalLocked] = useState(false);

  const handleStart = () => {
    setSignalLocked(true);
  };

  return (
    <main style={{
      width: '100vw',
      height: '100dvh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#000000',
      position: 'relative'
    }}>
      {!signalLocked ? (
        <button
          onClick={handleStart}
          style={{
            background: 'transparent',
            border: '2px solid #8B0000',
            color: '#8B0000',
            padding: '18px 36px',
            fontSize: '1.2rem',
            fontFamily: 'monospace',
            letterSpacing: '0.25em',
            cursor: 'pointer',
            boxShadow: '0 0 15px rgba(139, 0, 0, 0.4)'
          }}
        >
          [ ▶ ENTER SIGNAL ]
        </button>
      ) : (
        <div style={{ color: '#FF1E1E', letterSpacing: '0.2em' }}>
          INITIALIZING WEBGL VIEWPORT...
        </div>
      )}
    </main>
  );
}
