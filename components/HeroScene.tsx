"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const MedicalScene = dynamic(() => import("./3d/MedicalScene"), { ssr: false });

type Mode = "pending" | "full" | "lite" | "static";

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static SVG stand-in used when WebGL is missing or the device is weak. */
function StaticOrb() {
  return (
    <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
      <defs>
        <radialGradient id="orbFill" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#1a1c22" />
          <stop offset="1" stopColor="#050505" />
        </radialGradient>
      </defs>
      <circle cx="200" cy="200" r="120" fill="url(#orbFill)" stroke="rgba(255,255,255,0.14)" />
      <ellipse cx="200" cy="200" rx="120" ry="38" fill="none" stroke="rgba(255,255,255,0.1)" />
      <ellipse cx="200" cy="200" rx="38" ry="120" fill="none" stroke="rgba(255,255,255,0.1)" />
      <ellipse cx="200" cy="200" rx="170" ry="52" transform="rotate(-24 200 200)" fill="none" stroke="#1557D6" strokeOpacity="0.7" />
      <ellipse cx="200" cy="200" rx="195" ry="70" transform="rotate(28 200 200)" fill="none" stroke="rgba(255,255,255,0.14)" />
      <circle cx="326" cy="146" r="4" fill="#4D84F2" />
    </svg>
  );
}

export function HeroScene({ active }: { active: boolean }) {
  const [mode, setMode] = useState<Mode>("pending");
  const [reduced, setReduced] = useState(false);
  const [visible, setVisible] = useState(true);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(rm.matches);
    const onRm = () => setReduced(rm.matches);
    rm.addEventListener("change", onRm);

    if (!webglAvailable()) setMode("static");
    else {
      const nav = navigator as Navigator & { deviceMemory?: number };
      const weak = (nav.hardwareConcurrency ?? 8) <= 2 || (nav.deviceMemory ?? 8) <= 2;
      const small = window.matchMedia("(max-width: 767px)").matches;
      setMode(weak ? "static" : small ? "lite" : "full");
    }
    return () => rm.removeEventListener("change", onRm);
  }, []);

  useEffect(() => {
    if (!box.current) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(box.current);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={box} className="h-full w-full">
      {mode === "static" && <StaticOrb />}
      {(mode === "full" || mode === "lite") && (
        <MedicalScene lite={mode === "lite"} reduced={reduced} active={active} visible={visible} />
      )}
    </div>
  );
}
