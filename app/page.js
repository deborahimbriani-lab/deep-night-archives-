'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function CinemaViewport() {
  const [activeItem, setActiveItem] = useState(null); // 'tv', 'tapes', null
  const [shares, setShares] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);

  // Audio diegetico: click meccanico a nastro
  const playClick = (freq = 80) => {
    try {
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(20, audioCtx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.5, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.09);
    } catch (e) {}
  };

  const handleShare = () => {
    playClick(140);
    const newShares = Math.min(shares + 1, 3);
    setShares(newShares);
    if (navigator.share) {
      navigator.share({
        title: 'DEEP NIGHT ARCHIVES',
        text: 'The entity is unlocked. Watch the signal before it disappears.',
        url: window.location.href,
      }).catch(() => {});
    }
  };

  return (
    <main style={{
      position: 'fixed',
      inset: 0,
      width: '100vw',
      height: '100dvh',
      backgroundColor: '#030202',
      backgroundImage: 'radial-gradient(ellipse at 50% 30%, #150909 0%, #030202 85%)',
      overflow: 'hidden',
      fontFamily: 'monospace',
      userSelect: 'none',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '24px 16px',
      boxSizing: 'border-box'
    }}>
      {/* Scanline CRT globali */}
      <div style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 10,
        background: 'repeating-linear-gradient(rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.35) 3px, rgba(0,0,0,0.35) 4px)'
      }} />

      {/* HEADER AMBIENTALE */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #2a0b0b',
        paddingBottom: '8px',
        zIndex: 2
      }}>
        <span style={{ color: '#8B0000', fontSize: '0.75rem', letterSpacing: '0.2em' }}>
          ARCHIVE ROOM // TAPE DECK
        </span>
        <span style={{ color: '#444', fontSize: '0.7rem' }}>
          SIGIL: {shares}/3 UNLOCKED
        </span>
      </div>

      {/* MONITOR CRT AL CENTRO */}
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        aspectRatio: '4/3',
        backgroundColor: '#0a0808',
        borderRadius: '28px',
        border: '10px solid #141111',
        boxShadow: 'inset 0 0 50px #000, 0 15px 50px rgba(0,0,0,0.95), 0 0 30px rgba(139,0,0,0.15)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'pointer'
      }}
      onClick={() => { playClick(90); setActiveItem('tv'); }}
      >
        <div style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '18px',
          background: 'radial-gradient(circle at 50% 35%, rgba(255,255,255,0.05) 0%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none'
        }} />

        <div style={{
          border: '2px solid #8B0000',
          padding: '16px 28px',
          color: '#ff2b2b',
          fontSize: '1.25rem',
          letterSpacing: '0.25em',
          boxShadow: '0 0 25px rgba(139,0,0,0.4)',
          zIndex: 3
        }}>
          [ ▶ PLAY TAPE ]
        </div>
        <span style={{ color: '#555', fontSize: '0.7rem', marginTop: '12px', zIndex: 3 }}>
          CASE 01 // READY
        </span>
      </div>

      {/* ZONA TAVOLO & INTERAZIONI FISICHE */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        zIndex: 2
      }}>
        {/* RASTRELLIERA CASSETTE VHS (I TUOI PROSSIMI FILM) */}
        <div style={{
          backgroundColor: '#0c0a0a',
          border: '1px solid #221a1a',
          padding: '12px 16px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ color: '#666', fontSize: '0.65rem' }}>VHS SHELF</div>
            <div style={{ color: '#999', fontSize: '0.85rem' }}>
              NEXT REEL: {shares >= 3 ? 'CASE 02 UNLOCKED' : 'CASE 02 [SEALED]'}
            </div>
          </div>
          <button
            onClick={() => { playClick(120); setShowShareModal(true); }}
            style={{
              background: shares >= 3 ? '#8B0000' : 'transparent',
              border: '1px solid #8B0000',
              color: '#fff',
              padding: '6px 14px',
              fontFamily: 'monospace',
              fontSize: '0.75rem',
              cursor: 'pointer'
            }}
          >
            {shares >= 3 ? 'PLAY CASE 02' : `UNLOCK (${shares}/3)`}
          </button>
        </div>

        {/* IL DOSSIER FORENSE SUL TAVOLO */}
        <Link
          href="/dossier"
          onClick={() => playClick(60)}
          style={{
            backgroundColor: '#16120d',
            border: '1px solid #2e2418',
            borderLeft: '6px solid #8B0000',
            padding: '14px 18px',
            color: '#c2ab91',
            textDecoration: 'none',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            boxShadow: '0 8px 30px rgba(0,0,0,0.9)'
          }}
        >
          <div>
            <div style={{ fontSize: '0.65rem', color: '#8B0000', letterSpacing: '0.15em' }}>
              CONFIDENTIAL REPORT
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 'bold' }}>
              OPEN DOSSIER // CASE 01
            </div>
          </div>
          <span style={{ fontSize: '1.2rem' }}>📂</span>
        </Link>
      </div>

      {/* POPUP SBLOCCO VIRALE (CATENA CONDIVISIONI) */}
      {showShareModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.92)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '24px',
          textAlign: 'center'
        }}>
          <div style={{
            border: '1px solid #8B0000',
            padding: '24px',
            maxWidth: '360px',
            width: '100%',
            backgroundColor: '#0a0505'
          }}>
            <div style={{ color: '#FF1E1E', fontSize: '1.1rem', marginBottom: '8px' }}>
              BREAK THE SIGNAL CURSE
            </div>
            <p style={{ color: '#888', fontSize: '0.8rem', lineHeight: '1.5' }}>
              Transmit the frequency to 3 victims to unlock CASE 02 and classified records.
            </p>
            <div style={{ margin: '20px 0', fontSize: '1.5rem', color: '#fff' }}>
              [ {shares} / 3 ]
            </div>
            <button
              onClick={handleShare}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: '#8B0000',
                border: 'none',
                color: '#fff',
                fontFamily: 'monospace',
                fontWeight: 'bold',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              TRANSMIT SIGNAL
            </button>
            <button
              onClick={() => setShowShareModal(false)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#555',
                fontFamily: 'monospace',
                fontSize: '0.75rem',
                cursor: 'pointer'
              }}
            >
              [ CLOSE ]
            </button>
          </div>
        </div>
      )}

      {/* SCHERMATA PLAYER VIDEO NASTRO ATTIVO */}
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
              top: '24px',
              right: '24px',
              background: 'transparent',
              border: '1px solid #8B0000',
              color: '#8B0000',
              padding: '8px 16px',
              fontFamily: 'monospace',
              cursor: 'pointer'
            }}
          >
            [ EJECT ]
          </button>
          <div style={{ color: '#ff2222', fontSize: '0.85rem', marginBottom: '16px' }}>
            SIGNAL ACTIVE // CASE 01
          </div>
          <div style={{
            width: '100%',
            maxWidth: '540px',
            aspectRatio: '16/9',
            border: '1px solid #333',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#666',
            fontSize: '0.85rem'
          }}>
            [ CLOUDFLARE STREAM VIDEO EMBED ]
          </div>
        </div>
      )}
    </main>
  );
}
