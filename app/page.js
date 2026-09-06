'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CinemaViewport() {
  const [activeItem, setActiveItem] = useState(null); // 'tv', 'dossier', null

  // Audio diegetico: scatto meccanico e ronzio analogico
  const playMechanicalClick = () => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(80, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.08);

      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch (e) {}
  };

  const handleTvClick = () => {
    playMechanicalClick();
    setActiveItem('tv');
  };

  return (
    <main style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100dvh',
      backgroundColor: '#000000',
      overflow: 'hidden',
      fontFamily: 'monospace',
      userSelect: 'none'
    }}>
      {/* Texture grana analogica e scanline sovrapposte all'intera viewport */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        background: 'repeating-linear-gradient(rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.3) 3px, rgba(0,0,0,0.3) 4px)'
      }} />

      {/* AMBIENTE: VISTA STANZA & TAVOLO */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '30px 20px',
        boxSizing: 'border-box'
      }}>
        {/* Targa Segnale Superiore */}
        <div style={{ color: '#441111', fontSize: '0.75rem', letterSpacing: '0.25em' }}>
          DEEP NIGHT ARCHIVES // SIGNAL MONITOR
        </div>

        {/* POSTAZIONE TV CRT (Fisica, bombata, interattiva) */}
        <div
          onClick={handleTvClick}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            aspectRatio: '4/3',
            backgroundColor: '#0c0a0a',
            borderRadius: '24px',
            border: '8px solid #1a1616',
            boxShadow: 'inset 0 0 40px rgba(0,0,0,0.9), 0 10px 40px rgba(0,0,0,0.95)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer'
          }}
        >
          {/* Riflesso bombato vetro CRT */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '16px',
            background: 'radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.06) 0%, rgba(0,0,0,0.85) 100%)',
            pointerEvents: 'none'
          }} />

          {/* Tasto fisico centrale / Spia segnale */}
          <div style={{
            border: '2px solid #8B0000',
            padding: '14px 24px',
            color: '#ff2222',
            fontSize: '1.2rem',
            letterSpacing: '0.2em',
            boxShadow: '0 0 20px rgba(139,0,0,0.35)',
            textAlign: 'center'
          }}>
            [ ▶ PLAY SIGNAL ]
          </div>
          <span style={{ color: '#666', fontSize: '0.7rem', marginTop: '10px' }}>
            TOCCA PER INSERIRE NASTRO
          </span>
        </div>

        {/* PIANO DEL TAVOLO: FASCICOLO / DOSSIER FORENSE */}
        <Link
          href="/dossier"
          onClick={playMechanicalClick}
          style={{
            width: '100%',
            maxWidth: '340px',
            backgroundColor: '#1b1712',
            border: '1px solid #332a1f',
            borderLeft: '6px solid #8B0000',
            padding: '16px 20px',
            color: '#bfa78a',
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 8px 25px rgba(0,0,0,0.9)',
            transform: 'rotate(-1deg)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.65rem', color: '#8B0000', letterSpacing: '0.15em' }}>
              DOCUMENTO RISERVATO
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 'bold', marginTop: '2px' }}>
              DOSSIER FORENSE #01
            </div>
          </div>
          <span style={{ fontSize: '1.2rem' }}>📂</span>
        </Link>
      </div>

      {/* MODALE STREAMING CASSETTA ATTIVA */}
      {activeItem === 'tv' && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#000000',
          zIndex: 100,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px'
        }}>
          <button
            onClick={() => setActiveItem(null)}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'transparent',
              border: '1px solid #444',
              color: '#888',
              padding: '8px 16px',
              fontFamily: 'monospace',
              cursor: 'pointer'
            }}
          >
            [ EJECT TAPE ]
          </button>

          <div style={{ color: '#8B0000', fontSize: '0.85rem', marginBottom: '16px' }}>
            SEGNALE IN RIPRODUZIONE // CLOUDFLARE STREAM
          </div>

          <div style={{
            width: '100%',
            maxWidth: '500px',
            aspectRatio: '16/9',
            border: '1px solid #222',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#555',
            fontSize: '0.8rem'
          }}>
            [ STREAMING PLAYER EMBED AGGANCIATO QUI ]
          </div>
        </div>
      )}
    </main>
  );
}
