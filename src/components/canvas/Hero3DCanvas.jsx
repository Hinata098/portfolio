import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Hero3DCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030712, 0.038);

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Central Core - Glowing Icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.4, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00f5ff,
      emissive: 0x003355,
      roughness: 0.12,
      metalness: 0.9,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    mainGroup.add(coreMesh);

    // 2. Inner Crystal Core (Sun God / Crimson nucleus)
    const innerGeo = new THREE.OctahedronGeometry(0.72, 0);
    const innerMat = new THREE.MeshStandardMaterial({
      color: 0xff2a5f,
      emissive: 0x990022,
      roughness: 0.25,
      metalness: 0.95,
      flatShading: true,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    mainGroup.add(innerMesh);

    // 3. Orbital Tech Rings (Cyan and Crimson)
    const ringGeo1 = new THREE.TorusGeometry(2.3, 0.02, 16, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: 0x00f5ff,
      transparent: true,
      opacity: 0.65,
      wireframe: true,
    });
    const ring1 = new THREE.Mesh(ringGeo1, ringMat1);
    ring1.rotation.x = Math.PI / 3;
    mainGroup.add(ring1);

    const ringGeo2 = new THREE.TorusGeometry(2.8, 0.018, 16, 100);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0xff2a5f,
      transparent: true,
      opacity: 0.55,
    });
    const ring2 = new THREE.Mesh(ringGeo2, ringMat2);
    ring2.rotation.y = Math.PI / 4;
    ring2.rotation.x = -Math.PI / 6;
    mainGroup.add(ring2);

    // 4. Particle Constellation Dust (Cyan, Crimson, White, Violet)
    const particleCount = 850;
    const particlesGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);

    const colorCyan = new THREE.Color(0x00f5ff);
    const colorCrimson = new THREE.Color(0xff2a5f);
    const colorWhite = new THREE.Color(0xffffff);
    const colorViolet = new THREE.Color(0xa855f7);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.0 + Math.random() * 4.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);

      const rPick = Math.random();
      const col = rPick < 0.4 ? colorCyan : rPick < 0.7 ? colorCrimson : rPick < 0.88 ? colorViolet : colorWhite;
      particleColors[i * 3] = col.r;
      particleColors[i * 3 + 1] = col.g;
      particleColors[i * 3 + 2] = col.b;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('color', new THREE.BufferAttribute(particleColors, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.048,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeo, particlesMat);
    mainGroup.add(particlesMesh);

    // 5. Dual Lighting: Electric Cyan & Crimson
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    const cyanLight = new THREE.PointLight(0x00f5ff, 45, 25);
    cyanLight.position.set(4, 3, 4);
    scene.add(cyanLight);

    const crimsonLight = new THREE.PointLight(0xff2a5f, 40, 25);
    crimsonLight.position.set(-4, -3, 3);
    scene.add(crimsonLight);

    // Mouse Tracking
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      targetX = x * 0.7;
      targetY = y * 0.7;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        targetX = x * 0.6;
        targetY = y * 0.6;
      }
    };
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      coreMesh.rotation.y = elapsedTime * 0.25;
      coreMesh.rotation.x = elapsedTime * 0.15;

      innerMesh.rotation.y = -elapsedTime * 0.4;
      innerMesh.rotation.z = elapsedTime * 0.3;

      const scale = 1 + Math.sin(elapsedTime * 2.8) * 0.09;
      innerMesh.scale.set(scale, scale, scale);

      ring1.rotation.z = elapsedTime * 0.15;
      ring2.rotation.x = -elapsedTime * 0.2;
      ring2.rotation.y = elapsedTime * 0.1;

      particlesMesh.rotation.y = elapsedTime * 0.05;
      particlesMesh.rotation.x = Math.sin(elapsedTime * 0.03) * 0.1;

      mainGroup.rotation.y = mouseX * 0.8;
      mainGroup.rotation.x = -mouseY * 0.8;

      camera.position.x = Math.sin(elapsedTime * 0.2) * 0.2;
      camera.position.y = Math.cos(elapsedTime * 0.2) * 0.2;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-full min-h-[380px] lg:min-h-[520px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Holographic Developer Core"
    />
  );
}
