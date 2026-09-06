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

    // CINEPRESA (Arretriamo a 5 metri per vedere l'intero televisore)
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 5.2);

    // RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // LUCI (Chiaroscuro horror d'atmosfera)
    const redLight = new THREE.PointLight(0x8B0000, 3, 15);
    redLight.position.set(0, 2, 2);
    scene.add(redLight);

    const ambientLight = new THREE.AmbientLight(0x1a1a1a);
    scene.add(ambientLight);

    // TELAIO ESTERNO TV CRT (Plastica opaca pesante)
    const bodyGeo = new THREE.BoxGeometry(2.4, 1.8, 1.2);
    const bodyMat = new THREE.MeshStandardMaterial({
      color: 0x151515,
      roughness: 0.85,
      metalness: 0.1
    });
    const tvBody = new THREE.Mesh(bodyGeo, bodyMat);
    scene.add(tvBody);

    // VETRO BOMBATO DEL MONITOR (Canvas dinamico con rumore statico e scanline)
    const noiseCanvas = document.createElement('canvas');
    noiseCanvas.width = 256;
    noiseCanvas.height = 256;
    const ctx = noiseCanvas.getContext('2d');
    const screenTexture = new THREE.CanvasTexture(noiseCanvas);

    // VETRO CURVO
    const screenGeo = new THREE.CylinderGeometry(1.6, 1.6, 1.3, 32, 1, false, -0.4, 0.8);
    const screenMat = new THREE.MeshBasicMaterial({
      map: screenTexture,
    });
    const tvScreen = new THREE.Mesh(screenGeo, screenMat);
    tvScreen.rotation.y = Math.PI;
    tvScreen.position.z = 0.55;
    scene.add(tvScreen);

    // RESIZE
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // LOOP: Generazione statica analogica + flicker
    let animId;
    const animate = () => {
      // Rumore bianco da canale non sintonizzato
      const imgData = ctx.createImageData(256, 256);
      const buffer = new Uint32Array(imgData.data.buffer);
      for (let i = 0; i < buffer.length; i++) {
        // Interlacciamento a bande orizzontali + rumore scuro
        const row = (i / 256) | 0;
        const scanlineDarkness = (row % 3 === 0) ? 0.4 : 1.0;
        const gray = ((Math.random() * 90) * scanlineDarkness) | 0;
        buffer[i] = (255 << 24) | (gray << 16) | (gray << 8) | gray;
      }
      ctx.putImageData(imgData, 0, 0);
      screenTexture.needsUpdate = true;

      // Sfarfallio della luce d'ambiente
      redLight.intensity = Math.random() > 0.9 ? 1.2 : 2.8;

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
        overflow: 'hidden'
      }}
    />
  );
}
