"use client";

import { useRef, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// ── Starfield ───────────────────────────────────────────────────────────────

function Stars({ count = 600 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const palette = [
      new THREE.Color("#00f5ff"),
      new THREE.Color("#ff2d78"),
      new THREE.Color("#b44dff"),
      new THREE.Color("#e0d8f0"),
    ];
    for (let i = 0; i < count; i++) {
      positions[i * 3]     = (Math.random() - 0.5) * 60;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 3]     = c.r;
      colors[i * 3 + 1] = c.g;
      colors[i * 3 + 2] = c.b;
    }
    return { positions, colors };
  }, [count]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.018;
    ref.current.rotation.x += delta * 0.006;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-color"
          args={[colors, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        vertexColors
        transparent
        opacity={0.85}
        sizeAttenuation
      />
    </points>
  );
}

// ── Synthwave horizon grid ───────────────────────────────────────────────────
//
// The grid alternates cyan/magenta every row, so the color pattern itself
// repeats every 2 rows (`PERIOD = CELL * 2`), not every single row. Previously
// we wrapped `position.z` modulo a single `CELL`, which is phase-continuous
// for line *spacing* but shifts the color sequence by one row on every wrap —
// cyan lines would suddenly land where magenta ones were, reading as a
// "color swap" snap even though the geometry itself didn't jump.
//
// Wrapping modulo the full color-pattern period (2 rows) keeps both the
// spacing AND the color sequence phase-aligned across the loop boundary, so
// a given colored line always scrolls seamlessly into the position vacated
// by a same-colored line.

const CELL = 1.5;
const ROWS = 24; // extra rows beyond the base 20 so wrap has no visible gap
const PERIOD = CELL * 2; // full repeat length of the cyan/magenta color pattern

function Grid() {
  const ref = useRef<THREE.LineSegments>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const verts: number[] = [];
    const cols: number[]  = [];

    const cyan    = new THREE.Color("#00f5ff");
    const magenta = new THREE.Color("#ff2d78");
    const cols2   = [cyan, magenta];

    // horizontal lines — extend a couple of extra rows in front of the
    // camera (+z) so there's always a line of the *correct upcoming color*
    // ready to scroll into view, keeping the loop seamless regardless of
    // the wrap point.
    for (let i = -2; i <= ROWS; i++) {
      const z = -i * CELL;
      const c = cols2[((i % 2) + 2) % 2];
      const t = Math.max(0, i) / ROWS;
      verts.push(-15, 0, z,  15, 0, z);
      for (let k = 0; k < 2; k++) {
        cols.push(c.r * (1 - t * 0.6), c.g * (1 - t * 0.6), c.b * (1 - t * 0.6));
      }
    }

    // vertical lines
    for (let i = -10; i <= 10; i++) {
      const x = i * CELL;
      verts.push(x, 0, CELL * 2,  x, 0, -ROWS * CELL);
      cols.push(0.0, 0.96, 1.0,  0.25, 0.0, 0.35);
    }

    geo.setAttribute("position", new THREE.Float32BufferAttribute(verts, 3));
    geo.setAttribute("color",    new THREE.Float32BufferAttribute(cols,  3));
    return geo;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    // Scroll grid forward, wrapping continuously with modulo the full
    // color-pattern period so both line spacing AND color sequence are
    // phase-aligned across the loop boundary — no jump/pop and no visible
    // color swap, regardless of frame rate or delta jitter.
    const z = ref.current.position.z + delta * 1.5;
    ref.current.position.z = z % PERIOD;
  });

  return (
    <lineSegments ref={ref} geometry={geometry} position={[0, -4, 4]}>
      <lineBasicMaterial vertexColors transparent opacity={0.55} />
    </lineSegments>
  );
}

// ── Floating wireframe shapes ─────────────────────────────────────────────────

function FloatingShape({
  position,
  color,
  speed,
  rotAxis,
}: {
  position: [number, number, number];
  color: string;
  speed: number;
  rotAxis: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * speed * rotAxis[0];
    ref.current.rotation.y += delta * speed * rotAxis[1];
    ref.current.rotation.z += delta * speed * rotAxis[2];
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[0.6, 0]} />
      <meshBasicMaterial color={color} wireframe transparent opacity={0.35} />
    </mesh>
  );
}

// ── Fog / ambient ─────────────────────────────────────────────────────────────

function SceneSetup() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2("#07050f", 0.035);
    return () => { scene.fog = null; };
  }, [scene]);
  return null;
}

// ── Scene ────────────────────────────────────────────────────────────────────

const SHAPES: { pos: [number,number,number]; color: string; speed: number; ax: [number,number,number] }[] = [
  { pos: [-8,  2, -10], color: "#ff2d78", speed: 0.4, ax: [1, 0.5, 0.3] },
  { pos: [ 9,  3, -14], color: "#00f5ff", speed: 0.3, ax: [0.2, 1, 0.6] },
  { pos: [-5, -3,  -8], color: "#b44dff", speed: 0.5, ax: [0.8, 0.2, 1] },
  { pos: [ 6, -2, -12], color: "#00f5ff", speed: 0.25, ax: [0.4, 0.9, 0.2] },
  { pos: [ 0,  5, -18], color: "#ff2d78", speed: 0.35, ax: [0.6, 0.4, 0.8] },
];

function Scene() {
  return (
    <>
      <SceneSetup />
      <Stars count={500} />
      <Grid />
      {SHAPES.map((s, i) => (
        <FloatingShape key={i} position={s.pos} color={s.color} speed={s.speed} rotAxis={s.ax} />
      ))}
    </>
  );
}

// ── Main exported component ───────────────────────────────────────────────────

export default function CyberpunkBackground() {
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
          camera={{ position: [0, 0, 10], fov: 55 }}
          style={{ width: "100%", height: "100%" }}
          frameloop="always"
        >
          <Scene />
        </Canvas>
      )}
    </div>
  );
}
