'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function RoomCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const currentMount = mountRef.current;
    if (!currentMount) return;

    // SCENA & CINEPRESA
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 3);

    // RENDERER WebGL
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    currentMount.appendChild(renderer.domElement);

    // LUCE INSTABILE A LAMA HORROR
    const pointLight = new THREE.PointLight(0x8B0000, 2, 10);
    pointLight.position.set(0, 1.5, 1.5);
    scene.add(pointLight);

    const ambientLight = new THREE.AmbientLight(0x0a0a0a);
    scene.add(ambientLight);

    // MESH MONITOR CRT (Curvatura retro-illuminata)
    const crtGeometry = new THREE.BoxGeometry(2, 1.4, 0.4);
    const crtMaterial = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.9,
      metalness: 0.1
    });
    const crtMonitor = new THREE.Mesh(crtGeometry, crtMaterial);
    scene.add(crtMonitor);

    // VETRO SCHERMO CRT (Emissione segnale analogico)
    const screenGeometry = new THREE.PlaneGeometry(1.8, 1.2);
    const screenMaterial = new THREE.MeshBasicMaterial({
      color: 0x220000,
      wireframe: false
    });
    const screenMesh = new THREE.Mesh(screenGeometry, screenMaterial);
    screenMesh.position.z = 0.21;
    scene.add(screenMesh);

    // GESTIONE RESIZE SCHERMO
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // RENDERING LOOP & SFARFALLIO LUCE
    let animationFrameId;
    const animate = () => {
      // Sfarfallio intermittente da neon esausto
      pointLight.intensity = Math.random() > 0.85 ? 0.3 : 1.8;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (currentMount && renderer.domElement) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: 1,
        overflow: 'hidden'
      }}
    />
  );
}
