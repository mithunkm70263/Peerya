"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

function BlobNode({ 
  position, 
  color, 
  speed, 
  label, 
  isCenter = false, 
  delay = 0 
}: { 
  position: [number, number, number], 
  color: string, 
  speed: number, 
  label: string, 
  isCenter?: boolean,
  delay?: number
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    
    // Organic bobbing
    mesh.current.position.y = position[1] + Math.sin(t * speed + delay) * 0.3;
    mesh.current.position.x = position[0] + Math.cos(t * speed * 0.8 + delay) * 0.1;
    
    // Center pulse effect
    if (isCenter) {
      const pulse = 1 + Math.sin(t * 2) * 0.04;
      mesh.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh 
        ref={mesh} 
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[isCenter ? 1.4 : 0.85, 32, 32]} />
        <meshPhysicalMaterial 
          color={color} 
          roughness={0.1} 
          metalness={0.2}
          transmission={0.8}
          thickness={1.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive={color}
          emissiveIntensity={isCenter ? 0.3 : 0.15}
        />
        
        <Html center zIndexRange={[100, 0]} style={{ pointerEvents: "none" }}>
          <div 
            className={`flex items-center justify-center font-bold tracking-widest text-white transition-all duration-500 backdrop-blur-md border rounded-full shadow-[0_0_20px_rgba(124,58,237,0.3)]
              ${isCenter 
                ? 'w-16 h-16 text-xl bg-black/40 border-white/20' 
                : 'w-12 h-12 text-sm bg-black/30 border-white/10'
              }
              ${hovered ? 'scale-125 bg-black/60 border-white/40 shadow-[0_0_30px_rgba(124,58,237,0.6)]' : 'scale-100'}
            `}
          >
            {label}
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.3;
      groupRef.current.rotation.x = Math.cos(state.clock.getElapsedTime() * 0.15) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 10, 5]} intensity={2.5} color="#a78bfa" />
      <directionalLight position={[-5, -10, -5]} intensity={1.5} color="#3b82f6" />
      <pointLight position={[0, 0, 0]} intensity={1.5} color="#7c3aed" />
      
      {/* Clustered together to prevent clipping on the sides */}
      <BlobNode position={[0, 0, 0]} color="#7c3aed" speed={1.5} label="AI" isCenter={true} />
      <BlobNode position={[-1.4, 2.0, 0.5]} color="#3b82f6" speed={1.2} label="ML" delay={0} />
      <BlobNode position={[1.5, -1.8, 0.8]} color="#ec4899" speed={1.0} label="UX" delay={1} />
      <BlobNode position={[1.6, 1.4, -1.5]} color="#06b6d4" speed={1.4} label="FE" delay={2} />
      <BlobNode position={[-1.6, -1.4, -1.2]} color="#8b5cf6" speed={1.1} label="DS" delay={3} />
    </group>
  );
}

export function Hero3DScene() {
  return (
    <div className="w-full h-full min-h-[500px] absolute inset-0 z-0 pointer-events-auto mix-blend-screen opacity-100 flex items-center justify-center">
      <Canvas 
        camera={{ position: [0, 0, 8.5], fov: 45 }} 
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
