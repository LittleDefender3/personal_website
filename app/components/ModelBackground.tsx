"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center, Bounds } from "@react-three/drei";
import * as THREE from "three";

const MODEL_URL = "/models/medieval_fantasy_book/scene.gltf";

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} />;
}

useGLTF.preload(MODEL_URL);

function SpinningModel() {
  const ref = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.18;
  });

  return (
    <group ref={ref}>
      <Center>
        <Model />
      </Center>
    </group>
  );
}

function Scene() {
  return (
    <>
      <hemisphereLight intensity={0.9} color="#fff2d8" groundColor="#1a0535" />
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} color="#ffe3b0" />
      <directionalLight position={[-6, -3, -4]} intensity={0.6} color="#5d6dff" />
      <Suspense fallback={null}>
        <Bounds fit clip margin={1.4}>
          <SpinningModel />
        </Bounds>
      </Suspense>
    </>
  );
}

// ── Main exported component ───────────────────────────────────────────────────

export default function ModelBackground() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        background: "radial-gradient(ellipse at 50% 60%, #1a0535 0%, #07050f 65%)",
      }}
    >
      {!reducedMotion && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 10], fov: 45 }}
          style={{ width: "100%", height: "100%" }}
          frameloop="always"
        >
          <Scene />
        </Canvas>
      )}
      <div
        style={{
          position: "absolute",
          bottom: 6,
          right: 10,
          fontSize: "10px",
          fontFamily: "monospace",
          letterSpacing: "0.02em",
          color: "rgba(224, 216, 240, 0.35)",
        }}
      >
        &quot;Medieval Fantasy Book&quot; by Pixel, CC BY 4.0
      </div>
    </div>
  );
}
