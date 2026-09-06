'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

// Caricamento asincrono di Three.js per evitare errori server-side
const RoomCanvas = dynamic(() => import('../components/RoomCanvas'), {
  ssr: false,
});

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
      position: 'relative',
      overflow: 'hidden'
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
            boxShadow: '0 0 15px rgba(139, 0, 0, 0.4)',
            zIndex: 10
          }}
        >
          [ ▶ ENTER SIGNAL ]
        </button>
      ) : (
        <RoomCanvas />
      )}
    </main>
  );
}
