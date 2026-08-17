"use client";

import dynamic from "next/dynamic";

const CyberpunkBackground = dynamic(
  () => import("./CyberpunkBackground"),
  { ssr: false }
);

export default function BackgroundWrapper() {
  return <CyberpunkBackground />;
}
