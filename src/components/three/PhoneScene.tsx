"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Environment, Float, Html } from "@react-three/drei";
import * as THREE from "three";
import { useReducedMotion, type MotionValue } from "framer-motion";
import { PhonePoster } from "./PhonePoster";
import { PhoneScreens } from "@/components/wow/PhoneScreens";

export type PhoneSceneMode = "hero" | "scrolly";

export function PhoneScene({
  mode = "hero",
  scrollProgress,
  ariaLabel,
}: {
  mode?: PhoneSceneMode;
  scrollProgress?: MotionValue<number>;
  ariaLabel?: string;
}) {
  const reduced = useReducedMotion();

  if (reduced) {
    return <PhonePoster tilt={mode === "hero" ? -12 : 0} />;
  }

  return (
    <div className="relative h-full w-full" aria-label={ariaLabel} role="img">
      <Canvas
        dpr={[1, 1.8]}
        camera={{ position: [0, 0, 6.6], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
        shadows
      >
        {/* Soft fill so dark surfaces don't go black */}
        <ambientLight intensity={0.65} />
        {/* Key light from upper right, drives the main highlight */}
        <directionalLight
          position={[5, 6, 5]}
          intensity={1.6}
          color="#ffffff"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        {/* Warm fill from the left to lift shadows */}
        <directionalLight
          position={[-4, 1.5, 3]}
          intensity={0.55}
          color="#ffd9b5"
        />
        {/* Cool rim light from behind to outline the silhouette */}
        <directionalLight
          position={[-2, 2, -4]}
          intensity={1.1}
          color="#cfe1ff"
        />
        {/* Subtle ember accent so the phone feels Callline-branded */}
        <pointLight
          position={[1.2, -1.5, 1.6]}
          intensity={1.4}
          distance={4}
          color="#ff6a33"
        />
        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Phone mode={mode} scrollProgress={scrollProgress} />
          <ContactShadows
            position={[0, -1.95, 0]}
            opacity={0.42}
            scale={6}
            blur={2.6}
            far={3.5}
            resolution={512}
            color="#0e0e0c"
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Phone({
  mode,
  scrollProgress,
}: {
  mode: PhoneSceneMode;
  scrollProgress?: MotionValue<number>;
}) {
  const group = useRef<THREE.Group>(null);
  const targets = useRef({ rotY: -0.26, rotX: 0.05, scale: 1 });

  useEffect(() => {
    if (mode !== "scrolly" || !scrollProgress) return;
    const apply = (raw: number) => {
      const p = Math.max(0, Math.min(1, raw));
      if (p < 0.2) {
        const t = p / 0.2;
        targets.current.rotY = -0.26 * (1 - t);
        targets.current.rotX = 0.05 * (1 - t);
        targets.current.scale = 1;
      } else if (p < 0.85) {
        targets.current.rotY = 0;
        targets.current.rotX = 0;
        targets.current.scale = 1.02;
      } else {
        const t = (p - 0.85) / 0.15;
        targets.current.rotY = -0.18 * t;
        targets.current.rotX = -0.08 * t;
        targets.current.scale = 1.02 - 0.04 * t;
      }
    };
    apply(scrollProgress.get());
    const unsub = scrollProgress.on("change", apply);
    return () => unsub();
  }, [mode, scrollProgress]);

  useFrame((_, dt) => {
    if (!group.current) return;
    const damp = 1 - Math.exp(-dt * 6);

    if (mode === "hero") {
      const t = performance.now() * 0.0004;
      const rotY = -0.34 + Math.sin(t) * 0.05;
      const rotX = 0.09 + Math.cos(t * 0.8) * 0.025;
      const rotZ = 0.05 + Math.sin(t * 0.6) * 0.02;
      group.current.rotation.y += (rotY - group.current.rotation.y) * damp;
      group.current.rotation.x += (rotX - group.current.rotation.x) * damp;
      group.current.rotation.z += (rotZ - group.current.rotation.z) * damp;
      return;
    }

    group.current.rotation.y +=
      (targets.current.rotY - group.current.rotation.y) * damp;
    group.current.rotation.x +=
      (targets.current.rotX - group.current.rotation.x) * damp;
    const s = targets.current.scale;
    group.current.scale.x += (s - group.current.scale.x) * damp;
    group.current.scale.y += (s - group.current.scale.y) * damp;
    group.current.scale.z += (s - group.current.scale.z) * damp;
  });

  return (
    <Float
      speed={1.1}
      rotationIntensity={mode === "hero" ? 0.35 : 0}
      floatIntensity={mode === "hero" ? 0.25 : 0}
      floatingRange={[-0.04, 0.04]}
    >
      <group ref={group}>
        <PhoneBody />
        <PhoneHtmlScreen mode={mode} scrollProgress={scrollProgress} />
      </group>
    </Float>
  );
}

function PhoneBody() {
  const bodyGeo = useMemo(
    () => roundedBoxGeometry(1.7, 3.5, 0.18, 0.16, 24),
    []
  );
  const frameGeo = useMemo(
    () => roundedBoxGeometry(1.62, 3.42, 0.005, 0.14, 24),
    []
  );

  return (
    <group>
      {/* Body. Brushed-dark metal, picks up the rim light cleanly. */}
      <mesh geometry={bodyGeo} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#222220"
          metalness={0.92}
          roughness={0.34}
          clearcoat={1}
          clearcoatRoughness={0.14}
          reflectivity={0.85}
          envMapIntensity={1.1}
        />
      </mesh>
      {/* Side button — slightly lighter so it reads as a separate part */}
      <mesh position={[0.86, 0.45, 0]} castShadow>
        <boxGeometry args={[0.025, 0.36, 0.07]} />
        <meshStandardMaterial color="#3a3a36" metalness={0.7} roughness={0.42} />
      </mesh>
      {/* Volume buttons */}
      <mesh position={[-0.85, 0.55, 0]} castShadow>
        <boxGeometry args={[0.025, 0.22, 0.07]} />
        <meshStandardMaterial color="#3a3a36" metalness={0.7} roughness={0.42} />
      </mesh>
      <mesh position={[-0.85, 0.22, 0]} castShadow>
        <boxGeometry args={[0.025, 0.22, 0.07]} />
        <meshStandardMaterial color="#3a3a36" metalness={0.7} roughness={0.42} />
      </mesh>
      {/* Glass bezel inset, dark and glossy so the screen sits inside it */}
      <mesh geometry={frameGeo} position={[0, 0, 0.0915]}>
        <meshPhysicalMaterial
          color="#0a0a09"
          metalness={0.15}
          roughness={0.08}
          clearcoat={1}
          clearcoatRoughness={0.05}
          reflectivity={0.5}
        />
      </mesh>
    </group>
  );
}

function PhoneHtmlScreen({
  mode,
  scrollProgress,
}: {
  mode: PhoneSceneMode;
  scrollProgress?: MotionValue<number>;
}) {
  return (
    <group position={[0, 0, 0.094]}>
      <mesh>
        <planeGeometry args={[1.5, 3.28]} />
        <meshBasicMaterial color="#0b0b0a" />
      </mesh>
      <Html
        transform
        distanceFactor={3}
        position={[0, 0, 0.001]}
        style={{
          width: 500,
          height: 1090,
          pointerEvents: "none",
        }}
        zIndexRange={[10, 0]}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            background: "#0b0b0a",
            borderRadius: 36,
            overflow: "hidden",
            position: "relative",
          }}
        >
          {mode === "hero" ? (
            <PhoneScreens phase={0} />
          ) : (
            <PhoneScreens scrollProgress={scrollProgress} />
          )}
        </div>
      </Html>
    </group>
  );
}

function roundedBoxGeometry(
  width: number,
  height: number,
  depth: number,
  radius: number,
  segments: number
) {
  const shape = new THREE.Shape();
  const w = width / 2;
  const h = height / 2;
  const r = Math.min(radius, w, h);

  shape.moveTo(-w + r, -h);
  shape.lineTo(w - r, -h);
  shape.quadraticCurveTo(w, -h, w, -h + r);
  shape.lineTo(w, h - r);
  shape.quadraticCurveTo(w, h, w - r, h);
  shape.lineTo(-w + r, h);
  shape.quadraticCurveTo(-w, h, -w, h - r);
  shape.lineTo(-w, -h + r);
  shape.quadraticCurveTo(-w, -h, -w + r, -h);

  const geo = new THREE.ExtrudeGeometry(shape, {
    depth,
    bevelEnabled: true,
    bevelSegments: Math.max(2, Math.floor(segments / 4)),
    bevelSize: 0.01,
    bevelThickness: 0.01,
    curveSegments: segments,
  });
  geo.translate(0, 0, -depth / 2);
  geo.computeVertexNormals();
  return geo;
}
