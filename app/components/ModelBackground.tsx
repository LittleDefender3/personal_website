"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Center, Bounds, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

const MODEL_URL = "/models/medieval_fantasy_book/scene.gltf";

function Model() {
  const { scene } = useGLTF(MODEL_URL);
  return <primitive object={scene} />;
}

useGLTF.preload(MODEL_URL);

// ── Orbit controls: user can drag to rotate/pan, scroll to zoom; a gentle
// auto-rotate resumes a couple seconds after the user lets go ─────────────

function DriftingOrbitControls() {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    let idleTimer: ReturnType<typeof setTimeout> | null = null;

    const pause = () => {
      controls.autoRotate = false;
      if (idleTimer) clearTimeout(idleTimer);
    };
    const resumeSoon = () => {
      idleTimer = setTimeout(() => {
        controls.autoRotate = true;
      }, 2500);
    };

    controls.addEventListener("start", pause);
    controls.addEventListener("end", resumeSoon);
    return () => {
      controls.removeEventListener("start", pause);
      controls.removeEventListener("end", resumeSoon);
      if (idleTimer) clearTimeout(idleTimer);
    };
  }, []);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enablePan
      enableZoom
      enableRotate
      enableDamping
      dampingFactor={0.08}
      autoRotate
      autoRotateSpeed={0.5}
      minDistance={40}
      maxDistance={600}
    />
  );
}

function Scene() {
  return (
    <>
      <hemisphereLight intensity={0.9} color="#bfe4ff" groundColor="#6b5642" />
      <ambientLight intensity={0.55} />
      <directionalLight position={[5, 8, 5]} intensity={1.6} color="#ffe3b0" />
      <directionalLight position={[-6, -3, -4]} intensity={0.6} color="#5d6dff" />
      <directionalLight position={[0, -8, -2]} intensity={0.35} color="#cfd8ff" />
      <DriftingOrbitControls />
      <Suspense fallback={null}>
        <Bounds fit clip margin={1.4}>
          <Center>
            <Model />
          </Center>
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
        background: "radial-gradient(ellipse at 50% 30%, #bfe4ff 0%, #6fb3ee 45%, #2f6fc4 100%)",
      }}
    >
      {!reducedMotion && (
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 10], fov: 45 }}
          style={{ width: "100%", height: "100%", cursor: "grab" }}
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
          color: "rgba(20, 35, 55, 0.45)",
          pointerEvents: "none",
        }}
      >
        &quot;Medieval Fantasy Book&quot; by Pixel, CC BY 4.0
      </div>
    </div>
  );
}
