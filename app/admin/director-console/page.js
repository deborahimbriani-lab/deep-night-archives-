'use client';

import { useState, useEffect } from 'react';

export default function DirectorConsole() {
  const [stealthMode, setStealthMode] = useState(true);

  useEffect(() => {
    // Flag invisibilità Director: esclude i test dell'autore dal conteggio analytics
    if (typeof window !== 'undefined') {
      localStorage.setItem('director_stealth_mode', 'true');
    }
  }, []);

  return (
    <main style={{
      minHeight: '100dvh',
      backgroundColor: '#0a0a0c',
      color: '#e0e0e0',
      padding: '24px 16px',
      fontFamily: 'monospace',
      overflowY: 'auto'
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ borderBottom: '1px solid #333', paddingBottom: '16px', marginBottom: '24px' }}>
          <span style={{ color: '#FF1E1E', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            RESTRICTED ACCESS // LEVEL 0
          </span>
          <h1 style={{ margin: '8px 0 4px 0', fontSize: '1.4rem' }}>DIRECTOR CONSOLE</h1>
          <p style={{ color: '#00ff66', fontSize: '0.75rem', margin: 0 }}>
            ● STEALTH TRACKING ACTIVE (Director traffic filtered)
          </p>
        </div>

        {/* Griglia Moduli di Controllo */}
        <div style={{ display: 'grid', gap: '16px' }}>
          <section style={{ border: '1px solid #222', padding: '16px', background: '#0e0e11' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#ff3333' }}>
              01. CLOUDFLARE STREAM MASTER
            </h3>
            <p style={{ fontSize: '0.75rem', color: '#777', margin: '0 0 12px 0' }}>
              Main CRT Tape ID / HLS Manifest URL
            </p>
            <input
              type="text"
              placeholder="Cloudflare Video UID..."
              style={{
                width: '100%',
                padding: '10px',
                background: '#000',
                border: '1px solid #333',
                color: '#fff',
                fontFamily: 'monospace',
                boxSizing: 'border-box'
              }}
            />
          </section>

          <section style={{ border: '1px solid #222', padding: '16px', background: '#0e0e11' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '0.9rem', color: '#ff3333' }}>
              02. SECRET METRICS & INSIGHTS
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '12px' }}>
              <div style={{ background: '#000', padding: '12px', border: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: '0.7rem', color: '#666' }}>CRT PLAYS</div>
                <div style={{ fontSize: '1.2rem', color: '#fff', marginTop: '4px' }}>--</div>
              </div>
              <div style={{ background: '#000', padding: '12px', border: '1px solid #1a1a1a' }}>
                <div style={{ fontSize: '0.7rem', color: '#666' }}>BREAKOUT COMPLETION</div>
                <div style={{ fontSize: '1.2rem', color: '#fff', marginTop: '4px' }}>--%</div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
