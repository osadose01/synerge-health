"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// 800 points in a shape loosely suggesting Sub-Saharan Africa's bounding box
// (abstract data-cloud, not a geographic outline)
function generateParticles(count: number) {
  const positions = new Float32Array(count * 3);

  // Sub-Saharan Africa roughly spans lat -35°→10°, lon 10°→50°
  // Map to a normalised space [-2.5, 2.5] x [-2.5, 2.5] with some rejection sampling
  let i = 0;
  while (i < count) {
    const x = (Math.random() - 0.5) * 4.5;
    const y = (Math.random() - 0.5) * 3.5;
    const z = (Math.random() - 0.5) * 0.5;

    // Crude bounding shape (not a real map — abstract data-cloud)
    const inBound = Math.abs(x) < 2.1 && Math.abs(y) < 1.6;
    const density = Math.exp(-(x * x + y * y) / 3);
    if (inBound && Math.random() < density * 1.8) {
      positions[i * 3] = x + (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 1] = y + (Math.random() - 0.5) * 0.2;
      positions[i * 3 + 2] = z;
      i++;
    }
  }
  return positions;
}

function Particles() {
  const ref = useRef<THREE.Points>(null!);
  const positions = useMemo(() => generateParticles(800), []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.012;
    ref.current.rotation.x = Math.sin(t * 0.007) * 0.05;
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#2BE0B0"
        size={0.022}
        sizeAttenuation
        depthWrite={false}
        opacity={0.65}
      />
    </Points>
  );
}

export function ParticleHeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 3.5], fov: 60 }}
      gl={{ antialias: false, powerPreference: "low-power" }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
    >
      <Particles />
    </Canvas>
  );
}
