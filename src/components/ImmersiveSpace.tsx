import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import * as THREE from 'three';

/* ------------------------------------------------------------------ */
/*  Scroll-driven camera — moves forward (negative z) as user scrolls */
/* ------------------------------------------------------------------ */
function ScrollCamera() {
  const { camera } = useThree();
  const scrollRef = useRef(0);
  const targetRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollFraction =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
      targetRef.current = scrollFraction;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useFrame(() => {
    // Lerp for smooth camera motion
    scrollRef.current += (targetRef.current - scrollRef.current) * 0.05;
    const z = 30 - scrollRef.current * 90; // travel 90 units deep
    camera.position.z = z;
    // Subtle vertical sway
    camera.position.y = Math.sin(scrollRef.current * Math.PI * 2) * 1.5;
    // Gentle rotation for parallax feel
    camera.rotation.x = scrollRef.current * 0.08;
  });

  return null;
}

/* ------------------------------------------------------------------ */
/*  Floating wireframe geometry scattered through the z-depth tunnel   */
/* ------------------------------------------------------------------ */
interface FloatingShapeProps {
  position: [number, number, number];
  geometry: 'icosahedron' | 'torus' | 'octahedron' | 'ring' | 'dodecahedron';
  scale: number;
  color: string;
  rotationSpeed: number;
}

function FloatingShape({ position, geometry, scale, color, rotationSpeed }: FloatingShapeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * rotationSpeed * 0.3;
    meshRef.current.rotation.y += delta * rotationSpeed * 0.2;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case 'icosahedron':
        return <icosahedronGeometry args={[1, 0]} />;
      case 'torus':
        return <torusGeometry args={[1, 0.3, 8, 16]} />;
      case 'octahedron':
        return <octahedronGeometry args={[1, 0]} />;
      case 'ring':
        return <torusGeometry args={[1, 0.05, 8, 32]} />;
      case 'dodecahedron':
        return <dodecahedronGeometry args={[1, 0]} />;
    }
  }, [geometry]);

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geo}
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </Float>
  );
}

/* ------------------------------------------------------------------ */
/*  Fog particles — tiny dots scattered in the tunnel for atmosphere   */
/* ------------------------------------------------------------------ */
function FogParticles({ count = 600 }: { count?: number }) {
  const points = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;     // x: spread wide
      arr[i * 3 + 1] = (Math.random() - 0.5) * 30;  // y: spread tall
      arr[i * 3 + 2] = Math.random() * -120;         // z: deep tunnel
    }
    return arr;
  }, [count]);

  const sizes = useMemo(() => {
    const arr = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      arr[i] = Math.random() * 0.08 + 0.02;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.005;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#a78bfa"
        transparent
        opacity={0.4}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}

/* ------------------------------------------------------------------ */
/*  Shape data — spread through a deep z-tunnel                        */
/* ------------------------------------------------------------------ */
const shapes: FloatingShapeProps[] = [
  // Near field (z: 10 to -10)
  { position: [-6, 3, 5], geometry: 'icosahedron', scale: 1.2, color: '#818cf8', rotationSpeed: 0.4 },
  { position: [7, -2, 0], geometry: 'torus', scale: 0.9, color: '#7dd3fc', rotationSpeed: 0.6 },
  { position: [3, 5, -5], geometry: 'ring', scale: 1.8, color: '#c084fc', rotationSpeed: 0.3 },

  // Mid field (z: -15 to -35)
  { position: [-8, -3, -18], geometry: 'dodecahedron', scale: 1.5, color: '#34d399', rotationSpeed: 0.5 },
  { position: [5, 4, -22], geometry: 'octahedron', scale: 1.0, color: '#f9a8d4', rotationSpeed: 0.7 },
  { position: [-4, 1, -28], geometry: 'torus', scale: 1.3, color: '#818cf8', rotationSpeed: 0.4 },
  { position: [9, -4, -32], geometry: 'icosahedron', scale: 0.8, color: '#fbbf24', rotationSpeed: 0.6 },
  { position: [-3, 6, -35], geometry: 'ring', scale: 2.2, color: '#a78bfa', rotationSpeed: 0.25 },

  // Deep field (z: -40 to -65)
  { position: [6, -5, -42], geometry: 'dodecahedron', scale: 1.8, color: '#7dd3fc', rotationSpeed: 0.3 },
  { position: [-7, 2, -48], geometry: 'octahedron', scale: 1.4, color: '#f87171', rotationSpeed: 0.5 },
  { position: [4, -1, -52], geometry: 'ring', scale: 2.5, color: '#c084fc', rotationSpeed: 0.2 },
  { position: [-5, -6, -55], geometry: 'icosahedron', scale: 1.1, color: '#34d399', rotationSpeed: 0.45 },
  { position: [8, 3, -60], geometry: 'torus', scale: 1.6, color: '#818cf8', rotationSpeed: 0.35 },
  { position: [-2, 5, -65], geometry: 'dodecahedron', scale: 1.0, color: '#fbbf24', rotationSpeed: 0.55 },

  // Far field (z: -70 to -90)
  { position: [3, -3, -72], geometry: 'octahedron', scale: 2.0, color: '#a78bfa', rotationSpeed: 0.2 },
  { position: [-8, 4, -78], geometry: 'ring', scale: 3.0, color: '#7dd3fc', rotationSpeed: 0.15 },
  { position: [6, -2, -82], geometry: 'icosahedron', scale: 1.5, color: '#f9a8d4', rotationSpeed: 0.4 },
  { position: [-4, -5, -88], geometry: 'torus', scale: 2.0, color: '#34d399', rotationSpeed: 0.3 },
];

/* ------------------------------------------------------------------ */
/*  Main scene component                                               */
/* ------------------------------------------------------------------ */
export default function ImmersiveSpace() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) setVisible(false);
  }, []);

  if (!visible) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.85 }}
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 200 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        {/* Fog for depth attenuation */}
        <fog attach="fog" args={['#0a0a14', 20, 80]} />

        {/* Ambient light for subtle fill */}
        <ambientLight intensity={0.3} />

        {/* Scroll-driven camera */}
        <ScrollCamera />

        {/* Star field — deep background */}
        <Stars
          radius={80}
          depth={60}
          count={2500}
          factor={3}
          saturation={0.2}
          fade
          speed={0.5}
        />

        {/* Floating wireframe shapes */}
        {shapes.map((s, i) => (
          <FloatingShape key={i} {...s} />
        ))}

        {/* Atmospheric fog particles */}
        <FogParticles count={500} />
      </Canvas>
    </div>
  );
}
