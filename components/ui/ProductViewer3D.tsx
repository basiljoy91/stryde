"use client";

import { Suspense, useMemo, useRef, type MutableRefObject } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  PresentationControls,
  RoundedBox,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";

import { cn } from "@/lib/utils";

type ProductViewer3DProps = {
  className?: string;
  image: string;
  interactive?: boolean;
  rotationProgressRef?: MutableRefObject<number>;
  tone?: "dark" | "light";
};

export function ProductViewer3D({
  className,
  image,
  interactive = false,
  rotationProgressRef,
  tone = "dark",
}: ProductViewer3DProps) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <Canvas
        dpr={[1, 1.75]}
        gl={{ alpha: true, antialias: true }}
        camera={{ fov: 28, position: [0, 0.25, 7] }}
      >
        <color attach="background" args={["#000000"]} />
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[4.5, 5.5, 5]}
          intensity={tone === "light" ? 2.2 : 1.7}
          color={tone === "light" ? "#fff4dc" : "#ffffff"}
        />
        <spotLight
          position={[-5, 4, 7]}
          intensity={tone === "light" ? 26 : 18}
          angle={0.34}
          penumbra={0.9}
          color={tone === "light" ? "#ffd6ae" : "#e8ff47"}
        />
        <Suspense fallback={null}>
          <ViewerScene
            image={image}
            interactive={interactive}
            rotationProgressRef={rotationProgressRef}
            tone={tone}
          />
          <Environment preset={tone === "light" ? "studio" : "city"} />
          <ContactShadows
            position={[0, -2.45, 0]}
            opacity={tone === "light" ? 0.28 : 0.4}
            blur={2.4}
            scale={8}
            far={4.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}

function ViewerScene({
  image,
  interactive,
  rotationProgressRef,
  tone,
}: {
  image: string;
  interactive: boolean;
  rotationProgressRef?: MutableRefObject<number>;
  tone: "dark" | "light";
}) {
  const texture = useTexture(image);
  const groupRef = useRef<THREE.Group | null>(null);
  const frameRef = useRef<THREE.Mesh | null>(null);

  const cardScale = useMemo(() => {
    const source = texture.image as { height?: number; width?: number } | undefined;
    const aspect =
      source?.width && source?.height ? source.width / source.height : 1.2;

    const maxWidth = interactive ? 5.6 : 6.2;
    const maxHeight = interactive ? 3.7 : 4.2;
    let width = maxHeight * aspect;
    let height = maxHeight;

    if (width > maxWidth) {
      width = maxWidth;
      height = width / aspect;
    }

    return [width, height, 0.02] as [number, number, number];
  }, [interactive, texture.image]);

  useFrame((state, delta) => {
    if (!groupRef.current) {
      return;
    }

    const scrollRotation =
      rotationProgressRef?.current !== undefined
        ? THREE.MathUtils.mapLinear(
            rotationProgressRef.current,
            0,
            1,
            -0.7,
            Math.PI * 1.3,
          )
        : null;

    if (!interactive) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        scrollRotation ?? Math.sin(state.clock.elapsedTime * 0.45) * 0.18,
        0.05,
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        (scrollRotation !== null
          ? Math.sin(rotationProgressRef!.current * Math.PI) * 0.14
          : Math.cos(state.clock.elapsedTime * 0.32) * 0.04),
        0.05,
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        scrollRotation !== null
          ? Math.sin(rotationProgressRef!.current * Math.PI) * 0.2
          : Math.sin(state.clock.elapsedTime * 0.8) * 0.12,
        0.06,
      );
    }

    if (frameRef.current) {
      frameRef.current.rotation.z += delta * 0.02;
    }
  });

  const content = (
    <group ref={groupRef} position={[0, 0.35, 0]}>
      <mesh
        ref={frameRef}
        rotation={[-0.25, 0.18, -0.18]}
        position={[0, -0.15, -1.3]}
      >
        <torusGeometry args={[2.8, 0.04, 20, 96]} />
        <meshStandardMaterial
          color={tone === "light" ? "#ffb06d" : "#e8ff47"}
          emissive={tone === "light" ? "#ff7a22" : "#7e8f24"}
          emissiveIntensity={tone === "light" ? 0.32 : 0.24}
          roughness={0.34}
          metalness={0.68}
        />
      </mesh>

      <RoundedBox args={cardScale} radius={0.22} smoothness={5} position={[0, 0, -0.14]}>
        <meshPhysicalMaterial
          color={tone === "light" ? "#fffaf2" : "#111214"}
          roughness={0.3}
          metalness={0.16}
          transmission={0.08}
          thickness={0.8}
          clearcoat={0.75}
          clearcoatRoughness={0.22}
        />
      </RoundedBox>

      <mesh scale={[cardScale[0] - 0.22, cardScale[1] - 0.22, 1]} position={[0, 0, 0.02]}>
        <planeGeometry args={[1, 1]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.1, -0.2]}>
        <circleGeometry args={[1.65, 48]} />
        <meshStandardMaterial
          color={tone === "light" ? "#ffffff" : "#1a1a1a"}
          roughness={0.85}
          metalness={0.05}
        />
      </mesh>
    </group>
  );

  if (!interactive) {
    return content;
  }

  return (
    <PresentationControls
      global
      snap
      rotation={[0.05, 0.18, 0]}
      polar={[-0.32, 0.24]}
      azimuth={[-0.62, 0.62]}
    >
      {content}
    </PresentationControls>
  );
}
