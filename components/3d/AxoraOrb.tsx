"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const ACCENT = "#1557D6";
const ACCENT_HI = "#4D84F2";

type Props = { lite: boolean; reduced: boolean; active: boolean };

function uniqueVertices(geo: THREE.BufferGeometry) {
  const pos = geo.getAttribute("position");
  const seen = new Map<string, THREE.Vector3>();
  for (let i = 0; i < pos.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(pos, i);
    seen.set(`${v.x.toFixed(3)},${v.y.toFixed(3)},${v.z.toFixed(3)}`, v);
  }
  return [...seen.values()];
}

function Ring({ radius, tilt, speed, phase, reduced }: { radius: number; tilt: [number, number, number]; speed: number; phase: number; reduced: boolean }) {
  const node = useRef<THREE.Mesh>(null!);
  useFrame(({ clock }) => {
    if (reduced) return;
    const a = phase + clock.elapsedTime * speed;
    node.current.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  });
  return (
    <group rotation={tilt}>
      <mesh>
        <torusGeometry args={[radius, 0.0035, 6, 160]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.16} />
      </mesh>
      <mesh ref={node} position={[Math.cos(phase) * radius, Math.sin(phase) * radius, 0]}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color={ACCENT_HI} />
      </mesh>
    </group>
  );
}

export function AxoraOrb({ lite, reduced, active }: Props) {
  const group = useRef<THREE.Group>(null!);
  const shell = useRef<THREE.Group>(null!);
  const inner = useRef<THREE.Group>(null!);
  const ramp = useRef(0);

  const shellEdges = useMemo(
    () => new THREE.EdgesGeometry(new THREE.IcosahedronGeometry(1.66, lite ? 1 : 2)),
    [lite],
  );

  const { nodes, links } = useMemo(() => {
    const base = new THREE.IcosahedronGeometry(0.95, 0);
    const verts = uniqueVertices(base);
    const pts: number[] = [];
    const edges = new THREE.EdgesGeometry(base);
    const p = edges.getAttribute("position");
    for (let i = 0; i < p.count; i++) pts.push(p.getX(i), p.getY(i), p.getZ(i));
    const links = new THREE.BufferGeometry();
    links.setAttribute("position", new THREE.Float32BufferAttribute(pts, 3));
    return { nodes: verts, links };
  }, []);

  const dust = useMemo(() => {
    const count = lite ? 120 : 340;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.3 + Math.random() * 2.6;
      const t = Math.random() * Math.PI * 2;
      const u = Math.random() * 2 - 1;
      const s = Math.sqrt(1 - u * u);
      arr[i * 3] = r * s * Math.cos(t);
      arr[i * 3 + 1] = r * u * 0.8;
      arr[i * 3 + 2] = r * s * Math.sin(t);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, [lite]);

  useFrame((state, delta) => {
    if (reduced) return;
    // Rotation eases in after the intro so the object "wakes up" slowly.
    ramp.current += ((active ? 1 : 0) - ramp.current) * Math.min(1, delta * 0.8);
    const d = delta * ramp.current;
    shell.current.rotation.y += d * 0.06;
    shell.current.rotation.x += d * 0.015;
    inner.current.rotation.y -= d * 0.11;
    inner.current.rotation.z += d * 0.04;

    const scroll = typeof window === "undefined" ? 0 : window.scrollY / window.innerHeight;
    const g = group.current;
    const px = state.pointer.x * 0.12;
    const py = state.pointer.y * 0.08;
    g.rotation.y += (px + scroll * 0.5 - g.rotation.y) * 0.04;
    g.rotation.x += (-py + 0.25 - g.rotation.x) * 0.04;
    g.position.y += (scroll * 0.9 - g.position.y) * 0.06;
  });

  return (
    <group ref={group} rotation={[0.25, 0.4, 0]}>
      {/* dark faceted core */}
      <mesh>
        <sphereGeometry args={[1.5, lite ? 32 : 64, lite ? 32 : 64]} />
        <meshStandardMaterial
          color="#14161b"
          metalness={0.6}
          roughness={0.55}
          transparent
          opacity={0.68}
        />
      </mesh>

      {/* molecular lattice inside */}
      <group ref={inner}>
        <lineSegments geometry={links}>
          <lineBasicMaterial color={ACCENT_HI} transparent opacity={0.9} />
        </lineSegments>
        {nodes.map((v, i) => (
          <mesh key={i} position={v}>
            <sphereGeometry args={[0.04, 10, 10]} />
            <meshBasicMaterial color={ACCENT_HI} />
          </mesh>
        ))}
      </group>

      {/* scientific wire shell */}
      <group ref={shell}>
        <lineSegments geometry={shellEdges}>
          <lineBasicMaterial color="#ffffff" transparent opacity={0.13} />
        </lineSegments>
      </group>

      {/* orbit lines */}
      <Ring radius={2.15} tilt={[1.25, 0.15, 0]} speed={0.16} phase={0.6} reduced={reduced} />
      <Ring radius={2.6} tilt={[0.5, 0.2, 0.7]} speed={-0.11} phase={2.4} reduced={reduced} />
      {!lite && <Ring radius={3.1} tilt={[1.0, -0.3, -0.5]} speed={0.07} phase={4.1} reduced={reduced} />}

      <points geometry={dust}>
        <pointsMaterial color="#ffffff" size={0.014} sizeAttenuation transparent opacity={0.35} depthWrite={false} />
      </points>
    </group>
  );
}
