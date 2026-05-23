'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, Float, MeshTransmissionMaterial, ContactShadows, Text } from '@react-three/drei';
import { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';

function Scene() {
  const group = useRef<THREE.Group>(null);
  const textRef = useRef<THREE.Group>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollMotion, setScrollMotion] = useState({ progress: 0, direction: 0 });

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let scrollTimer: number;

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    const handleScroll = () => {
      const nextScrollY = window.scrollY;
      const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);

      setScrollMotion({
        progress: nextScrollY / maxScroll,
        direction: Math.sign(nextScrollY - lastScrollY),
      });

      lastScrollY = nextScrollY;
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        setScrollMotion((current) => ({ ...current, direction: 0 }));
      }, 140);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.clearTimeout(scrollTimer);
    };
  }, []);

  useFrame((state) => {
    if (group.current) {
      const scrollFloat = Math.sin(scrollMotion.progress * Math.PI * 2) * 0.55;
      const targetY = mouse.y * 0.7 + scrollFloat;
      
      group.current.position.x = THREE.MathUtils.lerp(group.current.position.x, mouse.x * 1.2, 0.05);
      group.current.position.y = THREE.MathUtils.lerp(group.current.position.y, targetY, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, mouse.y * 0.5, 0.05);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, mouse.x * 0.5, 0.05);
    }

    if (textRef.current) {
      const scrollKick = scrollMotion.direction * 0.45;
      const textTargetY = THREE.MathUtils.clamp(
        mouse.y * 0.45 + scrollKick + Math.sin(state.clock.elapsedTime * 1.4) * 0.16,
        -1.2,
        1.2
      );

      textRef.current.position.y = THREE.MathUtils.lerp(textRef.current.position.y, 1.45 + textTargetY * 0.35, 0.05);
      textRef.current.position.x = THREE.MathUtils.lerp(textRef.current.position.x, mouse.x * 0.45, 0.05);
      textRef.current.rotation.z = THREE.MathUtils.lerp(
        textRef.current.rotation.z,
        scrollMotion.direction * -0.06,
        0.06
      );
      textRef.current.scale.setScalar(
        THREE.MathUtils.lerp(textRef.current.scale.x, 1 + Math.abs(scrollMotion.direction) * 0.08, 0.08)
      );
    }
  });

  return (
    <>
      <group ref={textRef} position={[0, 1.45, -3.8]}>
        <Text
          fontSize={2.25}
          color="#e6ffff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.34}
          letterSpacing={0.08}
          outlineWidth={0.018}
          outlineColor="#00ffff"
          material-toneMapped={false}
        >
          KUNAL PAUL
        </Text>
        <Text
          position={[0, -0.68, 0.02]}
          fontSize={0.34}
          color="#67e8f9"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.38}
          letterSpacing={0.18}
          material-toneMapped={false}
        >
          FULL STACK DEVELOPER
        </Text>
      </group>

      <group ref={group}>
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <mesh position={[0, 0, 0]}>
            <torusKnotGeometry args={[1.2, 0.3, 128, 32]} />
            <MeshTransmissionMaterial 
              backside
              thickness={1}
              roughness={0}
              transmission={1}
              ior={1.5}
              chromaticAberration={0.1}
              color="#00ffff"
            />
          </mesh>
        </Float>
        
        <Float speed={3} rotationIntensity={2} floatIntensity={1.5}>
          <mesh position={[-4, 2, -2]} scale={0.6}>
            <octahedronGeometry args={[1, 0]} />
            <MeshTransmissionMaterial 
              backside
              thickness={0.8}
              roughness={0.1}
              transmission={0.9}
              ior={1.2}
              color="#a855f7"
            />
          </mesh>
        </Float>

        <Float speed={1.5} rotationIntensity={1} floatIntensity={1}>
          <mesh position={[4, -2, -1]} scale={0.8}>
            <icosahedronGeometry args={[1, 0]} />
            <MeshTransmissionMaterial 
              backside
              thickness={1}
              roughness={0}
              transmission={1}
              ior={1.4}
              color="#ec4899"
            />
          </mesh>
        </Float>
      </group>
    </>
  );
}

export default function Three3DModel() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Environment preset="city" />
          <Scene />
          <ContactShadows position={[0, -3, 0]} opacity={0.6} scale={20} blur={2.5} far={4.5} color="#00ffff" />
        </Suspense>
      </Canvas>
    </div>
  );
}
