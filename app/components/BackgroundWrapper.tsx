"use client";

import dynamic from "next/dynamic";

const ModelBackground = dynamic(
  () => import("./ModelBackground"),
  { ssr: false }
);

export default function BackgroundWrapper() {
  return <ModelBackground />;
}
