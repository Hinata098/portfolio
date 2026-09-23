import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function TechSphereCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 5.2;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 1. Tech Wireframe Sphere
    const sphereGeo = new THREE.IcosahedronGeometry(2.0, 3);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: 0x1e2e50,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    group.add(sphereMesh);

    // 2. Glowing Nodes on vertices
    const nodeCount = 64;
    const nodesGeo = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);
    const nodeColors = new Float32Array(nodeCount * 3);

    const colA = new THREE.Color(0x00f0ff);
    const colB = new THREE.Color(0x9333ea);
    const colC = new THREE.Color(0x10b981);

    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;
      const r = 2.0;

      nodePositions[i * 3] = r * Math.cos(theta) * Math.sin(phi);
      nodePositions[i * 3 + 1] = r * Math.sin(theta) * Math.sin(phi);
      nodePositions[i * 3 + 2] = r * Math.cos(phi);

      const pick = i % 3;
      const c = pick === 0 ? colA : pick === 1 ? colB : colC;
      nodeColors[i * 3] = c.r;
      nodeColors[i * 3 + 1] = c.g;
      nodeColors[i * 3 + 2] = c.b;
    }

    nodesGeo.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));
    nodesGeo.setAttribute('color', new THREE.BufferAttribute(nodeColors, 3));

    const nodesMat = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
    });
    const nodesMesh = new THREE.Points(nodesGeo, nodesMat);
    group.add(nodesMesh);

    // 3. Orbiting Data Satellites
    const satCount = 4;
    const satellites = [];
    const satGeos = [];
    const satMats = [];

    const satColors = [0x00f0ff, 0x9333ea, 0x10b981, 0xf59e0b];
    for (let i = 0; i < satCount; i++) {
      const satGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const satMat = new THREE.MeshBasicMaterial({
        color: satColors[i],
        wireframe: false,
      });
      const sat = new THREE.Mesh(satGeo, satMat);
      group.add(sat);
      satellites.push({
        mesh: sat,
        speed: 0.4 + i * 0.15,
        radius: 2.7 + i * 0.25,
        angleOffset: (i * Math.PI * 2) / satCount,
        planeTilt: (i * Math.PI) / 6,
      });
      satGeos.push(satGeo);
      satMats.push(satMat);
    }

    // 4. Subtle ambient & directional lights
    const light = new THREE.DirectionalLight(0xffffff, 1.2);
    light.position.set(3, 5, 4);
    scene.add(light);

    // Dynamic rotation & mouse interaction
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };

    const onMouseDown = (e) => {
      isDragging = true;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      const deltaX = e.clientX - prevMousePos.x;
      const deltaY = e.clientY - prevMousePos.y;
      group.rotation.y += deltaX * 0.006;
      group.rotation.x += deltaY * 0.006;
      prevMousePos = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Touch support for dragging
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging = true;
        prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };
    const onTouchMove = (e) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - prevMousePos.x;
      const deltaY = e.touches[0].clientY - prevMousePos.y;
      group.rotation.y += deltaX * 0.006;
      group.rotation.x += deltaY * 0.006;
      prevMousePos = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => {
      isDragging = false;
    };

    domEl.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // Resize
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
    let animId;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const time = clock.getElapsedTime();

      if (!isDragging) {
        group.rotation.y += 0.004;
        group.rotation.x = Math.sin(time * 0.3) * 0.15;
      }

      // Update satellites position
      satellites.forEach((sat) => {
        const theta = time * sat.speed + sat.angleOffset;
        sat.mesh.position.x = Math.cos(theta) * sat.radius;
        sat.mesh.position.y = Math.sin(theta) * sat.radius * Math.sin(sat.planeTilt);
        sat.mesh.position.z = Math.sin(theta) * sat.radius * Math.cos(sat.planeTilt);
      });

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      domEl.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('resize', handleResize);

      if (container && domEl && container.contains(domEl)) {
        container.removeChild(domEl);
      }

      sphereGeo.dispose();
      sphereMat.dispose();
      nodesGeo.dispose();
      nodesMat.dispose();
      satGeos.forEach((g) => g.dispose());
      satMats.forEach((m) => m.dispose());
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="w-full h-[320px] md:h-[400px] relative pointer-events-auto cursor-grab active:cursor-grabbing"
      aria-label="Interactive 3D Tech Ecosystem Constellation"
    />
  );
}
