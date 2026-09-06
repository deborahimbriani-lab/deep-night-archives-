'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RoomCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // SCENA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // CINEPRESA (Inquadratura cinematografica: leggermente dall'alto e inclinata)
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0.4, 3.8);
    camera.lookAt(0, -0.1, 0);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // LUCI: Chiaroscuro horror drammatico
    const ambientLight = new THREE.AmbientLight(0x080808);
    scene.add(ambientLight);

    const ceilingSpot = new THREE.SpotLight(0x8B0000, 4, 10, Math.PI / 4, 0.5);
    ceilingSpot.position.set(0, 3, 1.5);
    ceilingSpot.target.position.set(0, -0.2, 0);
    scene.add(ceilingSpot);
    scene.add(ceilingSpot.target);

    const edgeRimLight = new THREE.PointLight(0x1a2233, 1.5, 6);
    edgeRimLight.position.set(-2, 1, -1);
    scene.add(edgeRimLight);

    // GRUPPO GENERALE STANZA / APPARECCHIATURE
    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // TAVOLO IN LEGNO SCURO (Superficie orizzontale)
    const tableGeo = new THREE.BoxGeometry(4.5, 0.15, 3);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0x120d0a,
      roughness: 0.95,
      metalness: 0.05
    });
    const table = new THREE.Mesh(tableGeo, tableMat);
    table.position.set(0, -0.85, 0);
    roomGroup.add(table);

    // CORPO PRINCIPALE TV CRT (Chassis sagomato anni '80)
    const tvGroup = new THREE.Group();
    tvGroup.position.set(0, -0.05, 0);
    roomGroup.add(tvGroup);

    const chassisGeo = new THREE.BoxGeometry(1.9, 1.4, 1.1);
    const chassisMat = new THREE.MeshStandardMaterial({
      color: 0x181818,
      roughness: 0.8,
      metalness: 0.2
    });
    const chassis = new THREE.Mesh(chassisGeo, chassisMat);
    tvGroup.add(chassis);

    // CORNICE DELLO SCHERMO
    const bezelGeo = new THREE.BoxGeometry(1.4, 1.15, 0.05);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: 0x0a0a0a,
      roughness: 0.9
    });
    const bezel = new THREE.Mesh(bezelGeo, bezelMat);
    bezel.position.set(-0.15, 0, 0.56);
    tvGroup.add(bezel);

    // PANNELLO LATERALE COMANDI / MANOPOLE ANALOGICHE
    const knobGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.05, 16);
    const knobMat = new THREE.MeshStandardMaterial({ color: 0x2b2b2b, metalness: 0.6 });
    
    const knob1 = new THREE.Mesh(knobGeo, knobMat);
    knob1.rotation.x = Math.PI / 2;
    knob1.position.set(0.72, 0.25, 0.57);
    tvGroup.add(knob1);

    const knob2 = knob1.clone();
    knob2.position.set(0.72, 0.05, 0.57);
    tvGroup.add(knob2);

    // VETRO BOMBATO CRT CON SEGNALE E TASTO DIEGETICO
    const crtCanvas = document.createElement('canvas');
    crtCanvas.width = 512;
    crtCanvas.height = 512;
    const ctx = crtCanvas.getContext('2d');
    const crtTexture = new THREE.CanvasTexture(crtCanvas);

    const screenGeo = new THREE.PlaneGeometry(1.3, 1.05);
    const screenMat = new THREE.MeshBasicMaterial({
      map: crtTexture
    });
    const screen = new THREE.Mesh(screenGeo, screenMat);
    screen.position.set(-0.15, 0, 0.59);
    tvGroup.add(screen);

    // LUCE EMESSA DALLO SCHERMO
    const screenGlow = new THREE.PointLight(0x3a0d0d, 1.2, 2.5);
    screenGlow.position.set(-0.15, 0, 0.9);
    tvGroup.add(screenGlow);

    // GESTIONE RESIZE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // RENDERING LOOP (Disegno scanline, rumore analogico e tasto Play pulsante)
    let animId;
    let pulse = 0;

    const animate = () => {
      pulse += 0.05;

      // Disegna il quadro del CRT
      ctx.fillStyle = '#060202';
      ctx.fillRect(0, 0, 512, 512);

      // Righe di scansione interlacciate
      for (let y = 0; y < 512; y += 4) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.45)';
        ctx.fillRect(0, y, 512, 2);
      }

      // Rumore analogico sparso
      for (let i = 0; i < 400; i++) {
        const rx = Math.random() * 512;
        const ry = Math.random() * 512;
        ctx.fillStyle = 'rgba(160, 20, 20, 0.15)';
        ctx.fillRect(rx, ry, 2, 2);
      }

      // Tasto diegetico [ ▶ ] pulsante
      const glowAlpha = 0.5 + Math.sin(pulse) * 0.35;
      ctx.strokeStyle = `rgba(255, 30, 30, ${glowAlpha})`;
      ctx.lineWidth = 4;
      ctx.strokeRect(176, 216, 160, 80);

      ctx.fillStyle = `rgba(255, 50, 50, ${glowAlpha})`;
      ctx.font = 'bold 36px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('[ ▶ ]', 256, 256);

      ctx.font = '14px monospace';
      ctx.fillStyle = 'rgba(150, 150, 150, 0.7)';
      ctx.fillText('SIGNAL: LOCKED', 256, 320);

      crtTexture.needsUpdate = true;

      // Sfarfallio organico della luce horror
      ceilingSpot.intensity = Math.random() > 0.92 ? 1.5 : 4.2;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        overflow: 'hidden',
        backgroundColor: '#000000'
      }}
    />
  );
}
