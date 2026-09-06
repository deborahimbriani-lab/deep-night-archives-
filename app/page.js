'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CinemaViewport() {
  const [activeItem, setActiveItem] = useState(null);
  const [shares, setShares] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('dna_sigil_shares');
    if (saved) setShares(parseInt(saved, 10));
  }, []);

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

  const currentUrl = typeof window !== 'undefined' ? window.location.origin : 'https://deep-night-archives.vercel.app';
  const rawText = "⚠️ SEGNALE INTERCETTATO // DEEP NIGHT ARCHIVES\nGuarda il nastro prima che venga rimosso:\n" + currentUrl;
  const encodedTextOnly = encodeURIComponent("⚠️ SEGNALE INTERCETTATO // DEEP NIGHT ARCHIVES - Guarda il nastro prima che venga rimosso:");
  const encodedUrlOnly = encodeURIComponent(currentUrl);
  const encodedFullMessage = encodeURIComponent(rawText);

  // Canali Privati: +1 per invio
  const handlePrivateShare = (url) => {
    playClick(110);
    window.open(url, '_blank');
    setShares((prev) => {
      const updated = Math.min(prev + 1, 3);
      localStorage.setItem('dna_sigil_shares', updated);
      return updated;
    });
  };

  // Social Broadcast (X): Sblocco Totale 3/3
  const handleTwitterShare = () => {
    playClick(150);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTextOnly}&url=${encodedUrlOnly}`;
    window.open(twitterUrl, '_blank');
    setShares(3);
    localStorage.setItem('dna_sigil_shares', 3);
  };

  // YouTube Community Post: Sblocco Totale 3/3
  const handleYouTubeShare = () => {
    playClick(160);
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(rawText);
    }
    const youtubeUrl = `https://www.youtube.com/post_entry`;
    window.open(youtubeUrl, '_blank');
    setShares(3);
    localStorage.setItem('dna_sigil_shares', 3);
  };

  // Copia Testo + Link per TikTok/Instagram Storie: Sblocco Totale 3/3
  const handleCopyFullSignal = () => {
    playClick(150);
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(rawText);
      setCopyFeedback(true);
      setShares(3);
      localStorage.setItem('dna_sigil_shares', 3);
      setTimeout(() => setCopyFeedback(false), 2500);
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
        <span style={{ color: shares >= 3 ? '#25D366' : '#666', fontSize: '0.7rem' }}>
          SIGIL: {shares}/3 UNLOCKED
        </span>
      </div>

      {/* MONITOR CRT */}
      <div
        style={{
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

      {/* RASTRELLIERA E DOSSIER */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        width: '100%',
        maxWidth: '420px',
        margin: '0 auto',
        zIndex: 2
      }}>
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

      {/* POPUP CONDIVISIONE */}
      {showShareModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.95)',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          textAlign: 'center'
        }}>
          <div style={{
            border: '1px solid #8B0000',
            padding: '24px 18px',
            maxWidth: '380px',
            width: '100%',
            backgroundColor: '#0a0505',
            boxSizing: 'border-box'
          }}>
            <div style={{ color: '#FF1E1E', fontSize: '1rem', letterSpacing: '0.15em', marginBottom: '6px' }}>
              BREAK THE CURSE // TRANSMISSION
            </div>
            <p style={{ color: '#777', fontSize: '0.75rem', lineHeight: '1.4', margin: '0 0 16px 0' }}>
              Invia a 3 persone in privato (+1 per contatto) o trasmetti pubblicamente per sbloccare l&apos;intero archivio.
            </p>

            <div style={{
              fontSize: '1.6rem',
              color: shares >= 3 ? '#25D366' : '#fff',
              margin: '10px 0 18px 0',
              letterSpacing: '0.2em'
            }}>
              [ {shares} / 3 ] {shares >= 3 && '✓'}
            </div>

            {/* PRIVATI (+1) */}
            <div style={{ textAlign: 'left', marginBottom: '14px' }}>
              <span style={{ color: '#8B0000', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                INVIO PRIVATO (+1 OGNUNO)
              </span>
              <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                <button
                  onClick={() => handlePrivateShare(`https://api.whatsapp.com/send?text=${encodedFullMessage}`)}
                  style={{
                    flex: 1,
                    padding: '10px 6px',
                    backgroundColor: '#111',
                    border: '1px solid #25D366',
                    color: '#25D366',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  WHATSAPP
                </button>
                <button
                  onClick={() => handlePrivateShare(`https://t.me/share/url?url=${encodedUrlOnly}&text=${encodedTextOnly}`)}
                  style={{
                    flex: 1,
                    padding: '10px 6px',
                    backgroundColor: '#111',
                    border: '1px solid #2AABEE',
                    color: '#2AABEE',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem',
                    cursor: 'pointer'
                  }}
                >
                  TELEGRAM
                </button>
              </div>
            </div>

            {/* SOCIAL (SBLOCCO TOTALE 3/3) */}
            <div style={{ textAlign: 'left', marginBottom: '18px' }}>
              <span style={{ color: '#8B0000', fontSize: '0.65rem', letterSpacing: '0.1em' }}>
                PUBBLICAZIONE BROADCAST (SBLOCCO IMMEDIATO 3/3)
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
                {/* YOUTUBE COMMUNITY */}
                <button
                  onClick={handleYouTubeShare}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#1a0505',
                    border: '1px solid #FF0000',
                    color: '#FF0000',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  POST SU YOUTUBE (COMMUNITY)
                </button>

                {/* X / TWITTER */}
                <button
                  onClick={handleTwitterShare}
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: '#8B0000',
                    border: 'none',
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    fontSize: '0.78rem',
                    cursor: 'pointer'
                  }}
                >
                  POST SU X / TWITTER
                </button>

                {/* COPIA LINK / STORIE */}
                <button
                  onClick={handleCopyFullSignal}
                  style={{
                    width: '100%',
                    padding: '9px',
                    backgroundColor: '#141414',
                    border: '1px dashed #666',
                    color: copyFeedback ? '#25D366' : '#bbb',
                    fontFamily: 'monospace',
                    fontSize: '0.7rem',
                    cursor: 'pointer'
                  }}
                >
                  {copyFeedback ? '✓ TESTO + LINK COPIATI!' : 'COPIA SEGNALE (TIKTOK / IG STORIES)'}
                </button>
              </div>
            </div>

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
              [ CHIUDI ARCHIVIO ]
            </button>
          </div>
        </div>
      )}

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
