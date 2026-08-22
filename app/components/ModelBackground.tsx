"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, useAnimations, Center, Bounds, OrbitControls, Html } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type * as THREE from "three";
import { useWindowManager, type AppId } from "./WindowManager";

const MODEL_URL = "/models/medieval_fantasy_book/scene.gltf";

// The model ships one clip ("The Life") that spins the windmill's wind and
// water wheels and waves both flags — useGLTF only loads the clips, playing
// them still needs an AnimationMixer, which useAnimations sets up for us.
function Model() {
  const groupRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL_URL);
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    Object.values(actions).forEach((action) => action?.play());
  }, [actions]);

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
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

// ── Clickable map markers ──────────────────────────────────────────────────
//
// Positions are landmark nodes' world coordinates *within the loaded GLTF's
// own local frame* (found by traversing scene.getObjectByName(...) and
// calling getWorldPosition() before mounting). Since Model and Markers are
// siblings inside the same <Center> group with no transform of their own,
// that local frame is exactly what a marker's `position` prop should use —
// they end up sitting on the real landmark regardless of how Center/Bounds
// re-centers or scales the view.

interface MarkerDef {
  position: [number, number, number];
  label: string;
  icon: string;
  app: AppId;
}

const MARKERS: MarkerDef[] = [
  { position: [-6.72, 12.5, -7.03], label: "About", icon: "◈", app: "browser" },
  { position: [-35.78, 3.89, 27.19], label: "Files", icon: "⌗", app: "files" },
  { position: [3.71, -0.44, 15.4], label: "Photos", icon: "⬡", app: "photos" },
  { position: [-18.33, -0.05, 14.6], label: "Terminal", icon: ">_", app: "terminal" },
  { position: [-6.7, 12.55, -26.52], label: "Credits", icon: "©", app: "credits" },
];

function Marker({ position, label, icon, onSelect }: MarkerDef & { onSelect: () => void }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Html position={position} center zIndexRange={[10, 0]}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          padding: "4px 10px 4px 6px",
          borderRadius: 999,
          border: "1px solid rgba(77, 141, 255, 0.6)",
          background: hovered ? "rgba(77, 141, 255, 0.92)" : "rgba(10, 15, 30, 0.72)",
          color: hovered ? "#08111f" : "#dfeeff",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "11px",
          letterSpacing: "0.03em",
          cursor: "pointer",
          boxShadow: hovered
            ? "0 0 14px rgba(77, 141, 255, 0.65)"
            : "0 2px 8px rgba(0, 0, 0, 0.35)",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "background 0.15s, color 0.15s, box-shadow 0.15s, transform 0.15s",
          whiteSpace: "nowrap",
        }}
      >
        <span style={{ fontSize: "13px" }}>{icon}</span>
        {label}
      </button>
    </Html>
  );
}

function Markers() {
  const { openWindow } = useWindowManager();
  return (
    <>
      {MARKERS.map((m) => (
        <Marker key={m.app} {...m} onSelect={() => openWindow(m.app)} />
      ))}
    </>
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
            <Markers />
          </Center>
        </Bounds>
      </Suspense>
    </>
  );
}

// ── Main exported component ───────────────────────────────────────────────────

export default function ModelBackground() {
  const { openWindow } = useWindowManager();
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
      <button
        onClick={() => openWindow("credits")}
        style={{
          position: "absolute",
          bottom: 6,
          right: 10,
          fontSize: "10px",
          fontFamily: "monospace",
          letterSpacing: "0.02em",
          color: "rgba(20, 35, 55, 0.45)",
          background: "transparent",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        &quot;Medieval Fantasy Book&quot; by Pixel, CC BY 4.0 · Credits
      </button>
    </div>
  );
}
