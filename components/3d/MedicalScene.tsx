"use client";

import { Canvas } from "@react-three/fiber";
import { AxoraOrb } from "./AxoraOrb";

type Props = { lite: boolean; reduced: boolean; active: boolean; visible: boolean };

export default function MedicalScene({ lite, reduced, active, visible }: Props) {
  return (
    <Canvas
      camera={{ position: [0, 0, 8.8], fov: 34 }}
      dpr={[1, lite ? 1.25 : 1.75]}
      frameloop={reduced ? "demand" : visible ? "always" : "never"}
      gl={{ antialias: !lite, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.35} />
      <directionalLight position={[-4, 5, 4]} intensity={3.4} color="#ffffff" />
      <pointLight position={[5, -2, 3]} intensity={38} color="#1557D6" distance={14} />
      <pointLight position={[-3, -4, -3]} intensity={10} color="#ffffff" distance={12} />
      <AxoraOrb lite={lite} reduced={reduced} active={active} />
    </Canvas>
  );
}
