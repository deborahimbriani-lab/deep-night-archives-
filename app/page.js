'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function CinemaViewport() {
  const [activeItem, setActiveItem] = useState(null);
  const [shares, setShares] = useState(0);
  const [showShareModal, setShowShareModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null); // 'private' o 'broadcast'

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
  const encodedFullMessage = encodeURIComponent(rawText);

  // Apertura App Privata (+1)
  const openPrivateApp = (url) => {
    playClick(100);
    navigator.clipboard?.writeText(rawText);
    window.location.href = url;
    setPendingAction('private');
  };

  // Apertura App Social (Sblocco Totale 3/3)
  const openSocialApp = (appUrl, webFallback) => {
    playClick(150);
    navigator.clipboard?.writeText(rawText);
    
    // Prova ad aprire l'app nativa di iOS, fallback web se non installata
    const start = Date.now();
    window.location.href = appUrl;
    setTimeout(() => {
      if (Date.now() - start < 1500 && webFallback) {
        window.open(webFallback, '_blank');
      }
    }, 500);

    setPendingAction('broadcast');
  };

  // Conferma manuale per evitare falsi sblocchi
  const confirmTransmission = () => {
    playClick(180);
    if (pendingAction === 'private') {
      const updated = Math.min(shares + 1, 3);
      setShares(updated);
      localStorage.setItem('dna_sigil_shares', updated);
    } else if (pendingAction === 'broadcast') {
      setShares(3);
      localStorage.setItem('dna_sigil_shares', 3);
    }
    setPendingAction(null);
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

      {/* MODALE DI TRASMISSIONE CON ICONE UFFICIALI E VERIFICA */}
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
          padding: '20px'
        }}>
          <div style={{
            border: '1px solid #8B0000',
            padding: '24px 16px',
            maxWidth: '380px',
            width: '100%',
            backgroundColor: '#0a0505',
            boxSizing: 'border-box',
            textAlign: 'center'
          }}>
            <div style={{ color: '#FF1E1E', fontSize: '1rem', letterSpacing: '0.15em', marginBottom: '4px' }}>
              TRANSMIT THE SIGNAL
            </div>
            <p style={{ color: '#777', fontSize: '0.72rem', margin: '0 0 16px 0' }}>
              Condividi in privato (+1) o sui social per lo sblocco immediato (3/3).
            </p>

            <div style={{
              fontSize: '1.6rem',
              color: shares >= 3 ? '#25D366' : '#fff',
              margin: '8px 0 16px 0',
              letterSpacing: '0.2em'
            }}>
              [ {shares} / 3 ] {shares >= 3 && '✓'}
            </div>

            {/* SE C'È UN'AZIONE IN SOSPESO RICHIEDE LA CONFERMA REALE */}
            {pendingAction ? (
              <div style={{
                backgroundColor: '#160a0a',
                border: '1px solid #ff2222',
                padding: '16px',
                marginBottom: '16px'
              }}>
                <p style={{ color: '#eee', fontSize: '0.8rem', margin: '0 0 12px 0' }}>
                  Hai completato l&apos;invio nell&apos;app?
                </p>
                <button
                  onClick={confirmTransmission}
                  style={{
                    width: '100%',
                    padding: '12px',
                    backgroundColor: '#8B0000',
                    border: 'none',
                    color: '#fff',
                    fontFamily: 'monospace',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                  }}
                >
                  ✓ CONFERMA TRASMISSIONE EFFETTUATA
                </button>
              </div>
            ) : (
              <>
                {/* GRUPPO PRIVATI (+1) */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#8B0000', fontSize: '0.65rem', letterSpacing: '0.1em', textAlign: 'left', marginBottom: '8px' }}>
                    CANALI PRIVATI (+1 PER INVIO)
                  </div>
                  <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                    {/* WHATSAPP ICON */}
                    <button
                      onClick={() => openPrivateApp(`whatsapp://send?text=${encodedFullMessage}`)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: '#0d1a11',
                        border: '1px solid #25D366',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#25D366">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                      </svg>
                    </button>

                    {/* TELEGRAM ICON */}
                    <button
                      onClick={() => openPrivateApp(`tg://msg?text=${encodedFullMessage}`)}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: '#0a1622',
                        border: '1px solid #2AABEE',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#2AABEE">
                        <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.643-.204-.657-.643.136-.953l11.57-4.461c.537-.198 1.006.129.828.942z"/>
                      </svg>
                    </button>
                  </div>
                </div>

                {/* GRUPPO BROADCAST (3/3) */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ color: '#8B0000', fontSize: '0.65rem', letterSpacing: '0.1em', textAlign: 'left', marginBottom: '8px' }}>
                    BROADCAST SOCIAL (SBLOCCO TOTALE 3/3)
                  </div>
                  <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    {/* YOUTUBE APP */}
                    <button
                      onClick={() => openSocialApp('vnd.youtube://', 'https://youtube.com')}
                      style={{
                        flex: 1,
                        padding: '12px 6px',
                        background: '#1a0505',
                        border: '1px solid #FF0000',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <svg width="28" height="28" viewBox="0 0 24 24" fill="#FF0000">
                        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                      </svg>
                    </button>

                    {/* INSTAGRAM APP */}
                    <button
                      onClick={() => openSocialApp('instagram://camera', 'https://instagram.com')}
                      style={{
                        flex: 1,
                        padding: '12px 6px',
                        background: '#1a0d18',
                        border: '1px solid #E1306C',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="#E1306C">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </button>

                    {/* TIKTOK APP */}
                    <button
                      onClick={() => openSocialApp('snssdk1233://', 'https://tiktok.com')}
                      style={{
                        flex: 1,
                        padding: '12px 6px',
                        background: '#0a1416',
                        border: '1px solid #25F4EE',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="#25F4EE">
                        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 2.89 3.5 2.77 1.81-.03 3.33-1.46 3.48-3.27.08-1.57.04-3.14.04-4.71V.02z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </>
            )}

            <button
              onClick={() => { setShowShareModal(false); setPendingAction(null); }}
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
