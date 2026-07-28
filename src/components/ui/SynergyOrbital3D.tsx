"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function SynergyOrbital3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || 600;
    let height = container.clientHeight || 400;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060b09);
    scene.fog = new THREE.FogExp2(0x060b09, 0.05);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 100);
    camera.position.set(0, 0.4, 6.2);

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // 4. Lighting
    scene.add(new THREE.AmbientLight(0x1c2a25, 1.2));

    const lTeal = new THREE.PointLight(0x2be0b0, 3.2, 14);
    lTeal.position.set(3, 2, 3);
    scene.add(lTeal);

    const lBlue = new THREE.PointLight(0x3fa9e0, 2.6, 14);
    lBlue.position.set(-3, -1.5, 2);
    scene.add(lBlue);

    const lGold = new THREE.PointLight(0xe3a83b, 2.2, 10);
    lGold.position.set(0, 1.5, -3);
    scene.add(lGold);

    // 5. Main group containing rings and core
    const group = new THREE.Group();
    scene.add(group);

    const ringDefs = [
      { color: 0x2be0b0, rot: [0.35, 0, 0.15], speed: 0.006, label: "Founder" },
      { color: 0x3fa9e0, rot: [-0.25, 0.9, 0.4], speed: -0.008, label: "Studio" },
      { color: 0xe3a83b, rot: [1.0, 0.3, -0.5], speed: 0.005, label: "Capital" },
      { color: 0x79c6e8, rot: [-0.6, -0.7, 0.2], speed: -0.007, label: "Market" },
    ];

    const rings = ringDefs.map((def, i) => {
      const geo = new THREE.TorusGeometry(1.55, 0.048, 16, 100);
      const mat = new THREE.MeshStandardMaterial({
        color: def.color,
        emissive: def.color,
        emissiveIntensity: 0.35,
        metalness: 0.75,
        roughness: 0.25,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.rotation.set(def.rot[0], def.rot[1], def.rot[2]);
      mesh.scale.set(1, 1, 0.001); // starts collapsed flat for smooth reveal
      mesh.userData = { spin: def.speed, targetScaleZ: 0.55, delay: i * 220 };
      group.add(mesh);
      return mesh;
    });

    // 6. Glowing Patient Outcome Core
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      emissive: 0x2be0b0,
      emissiveIntensity: 1.4,
      metalness: 0.3,
      roughness: 0.2,
    });
    const core = new THREE.Mesh(new THREE.SphereGeometry(0.22, 32, 32), coreMat);
    group.add(core);

    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x2be0b0,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const halo = new THREE.Mesh(new THREE.SphereGeometry(0.52, 32, 32), haloMat);
    group.add(halo);

    group.rotation.x = 0.15;

    // 7. Interactive pointer drag logic
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    const velX = 0.0022;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      if (container) container.style.cursor = "grabbing";
    };

    const onPointerUp = () => {
      dragging = false;
      if (container) container.style.cursor = "grab";
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      group.rotation.y += dx * 0.005;
      group.rotation.x += dy * 0.003;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    container.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointermove", onPointerMove);

    // 8. Animation loop
    const startTime = performance.now();
    let animFrameId: number;

    const animate = (now: number) => {
      animFrameId = requestAnimationFrame(animate);
      const elapsed = now - startTime;

      rings.forEach((r) => {
        const t = Math.min(Math.max((elapsed - r.userData.delay) / 900, 0), 1);
        const eased = 1 - Math.pow(1 - t, 3);
        r.scale.z = 0.001 + eased * r.userData.targetScaleZ;
        r.rotation.z += r.userData.spin;
      });

      if (!dragging) {
        group.rotation.y += velX;
      }

      haloMat.opacity = 0.14 + Math.sin(elapsed * 0.0015) * 0.05;
      coreMat.emissiveIntensity = 1.2 + Math.sin(elapsed * 0.0015) * 0.3;

      renderer.render(scene, camera);
    };

    animFrameId = requestAnimationFrame(animate);

    // 9. Responsive Resize Handler
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", onResize);

    // Clean up WebGL resources on unmount
    return () => {
      cancelAnimationFrame(animFrameId);
      container.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full flex flex-col items-center">
      <div
        ref={containerRef}
        className="w-full h-[380px] sm:h-[440px] rounded-3xl border border-white/[0.12] bg-[radial-gradient(circle_at_50%_45%,#0F1F1A_0%,#060B09_75%)] relative overflow-hidden cursor-grab touch-none shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
      >
        <div className="absolute top-4 left-6 pointer-events-none flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#2BE0B0] animate-ping" />
          <span className="font-mono text-[10px] sm:text-[11px] tracking-widest uppercase text-[#A5B8B0]">
            Synergy Orbital Sculpture · Drag to rotate
          </span>
        </div>
      </div>

      {/* Orbit Pillar Legend */}
      <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 mt-6 px-4 py-3 rounded-full border border-white/[0.08] bg-[#060B09]">
        <div className="flex items-center gap-2 text-xs font-mono text-[#C2D1CB]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#2BE0B0]" />
          <span>Founder</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#C2D1CB]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#3FA9E0]" />
          <span>Studio</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#C2D1CB]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E3A83B]" />
          <span>Capital</span>
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-[#C2D1CB]">
          <span className="w-2.5 h-2.5 rounded-full bg-[#79C6E8]" />
          <span>Market</span>
        </div>
        <div className="h-3 w-[1px] bg-white/[0.12] hidden sm:block" />
        <div className="flex items-center gap-2 text-xs font-mono text-[#2BE0B0]">
          <span className="w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_8px_#2BE0B0]" />
          <span>Patient Outcome Core</span>
        </div>
      </div>
    </div>
  );
}
