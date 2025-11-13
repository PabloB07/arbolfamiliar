'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Componente del tronco del árbol
function TreeTrunk() {
  const trunkRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (trunkRef.current) {
      // Suave balanceo del árbol
      trunkRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  return (
    <group ref={trunkRef}>
      {/* Tronco principal */}
      <mesh position={[0, -1.5, 0]} castShadow>
        <cylinderGeometry args={[0.3, 0.4, 3, 8]} />
        <meshStandardMaterial 
          color="#654321"
          roughness={0.9}
          metalness={0.1}
        />
      </mesh>
      
      {/* Base del tronco más ancha */}
      <mesh position={[0, -3, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.6, 0.5, 8]} />
        <meshStandardMaterial 
          color="#543210"
          roughness={0.95}
        />
      </mesh>

      {/* Ramas */}
      <Branch position={[-0.2, 0, 0]} rotation={[0, 0, -0.5]} scale={0.8} />
      <Branch position={[0.2, 0.3, 0]} rotation={[0, 0, 0.4]} scale={0.7} />
      <Branch position={[-0.15, -0.5, 0.1]} rotation={[0, 0.3, -0.3]} scale={0.6} />
      <Branch position={[0.15, -0.8, -0.1]} rotation={[0, -0.3, 0.35]} scale={0.65} />
    </group>
  );
}

// Componente de rama
function Branch({ position, rotation, scale }: { position: [number, number, number], rotation: [number, number, number], scale: number }) {
  return (
    <mesh position={position} rotation={rotation} scale={scale} castShadow>
      <cylinderGeometry args={[0.08, 0.15, 1.5, 6]} />
      <meshStandardMaterial 
        color="#765432"
        roughness={0.9}
      />
    </mesh>
  );
}

// Componente de follaje (hojas)
function Foliage() {
  const foliageRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (foliageRef.current) {
      // Movimiento suave del follaje
      foliageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      foliageRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.05;
    }
  });

  const leafGroups = useMemo(() => {
    return [
      { position: [0, 0.8, 0] as [number, number, number], scale: 1.8, color: '#2d5016' },
      { position: [0, 1.5, 0] as [number, number, number], scale: 1.5, color: '#3a6b1e' },
      { position: [0, 2.2, 0] as [number, number, number], scale: 1.2, color: '#4a8526' },
      { position: [0, 2.7, 0] as [number, number, number], scale: 0.8, color: '#5ca032' },
    ];
  }, []);

  return (
    <group ref={foliageRef}>
      {leafGroups.map((group, index) => (
        <mesh key={index} position={group.position} castShadow receiveShadow>
          <sphereGeometry args={[group.scale, 8, 8]} />
          <MeshWobbleMaterial
            color={group.color}
            speed={0.5}
            factor={0.2}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      ))}
      
      {/* Hojas individuales flotantes */}
      <FloatingLeaves />
    </group>
  );
}

// Hojas flotantes individuales
function FloatingLeaves() {
  const leavesRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (leavesRef.current) {
      leavesRef.current.children.forEach((leaf, i) => {
        leaf.position.y += Math.sin(state.clock.elapsedTime * 2 + i) * 0.002;
        leaf.rotation.z += 0.01;
      });
    }
  });

  const leaves = useMemo(() => {
    const leafArray = [];
    for (let i = 0; i < 15; i++) {
      leafArray.push({
        position: [
          (Math.random() - 0.5) * 4,
          Math.random() * 4,
          (Math.random() - 0.5) * 4,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: 0.1 + Math.random() * 0.1,
      });
    }
    return leafArray;
  }, []);

  return (
    <group ref={leavesRef}>
      {leaves.map((leaf, i) => (
        <mesh
          key={i}
          position={leaf.position}
          rotation={leaf.rotation}
          scale={leaf.scale}
        >
          <boxGeometry args={[0.3, 0.5, 0.05]} />
          <meshStandardMaterial color="#4a8526" />
        </mesh>
      ))}
    </group>
  );
}

// Componente principal del árbol
function Tree() {
  return (
    <group>
      <TreeTrunk />
      <Foliage />
    </group>
  );
}

// Suelo con césped
function Ground() {
  return (
    <>
      {/* Superficie de césped */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.3, 0]} receiveShadow>
        <circleGeometry args={[8, 32]} />
        <meshStandardMaterial 
          color="#7cb342"
          roughness={0.8}
        />
      </mesh>
      
      {/* Pequeñas flores decorativas */}
      <Flowers />
      
      {/* Parte inferior de la isla flotante */}
      <IslandBottom />
    </>
  );
}

// Parte inferior de la isla flotante - Mejorada
function IslandBottom() {
  return (
    <group>
      {/* Borde de transición césped-tierra */}
      <mesh position={[0, -3.35, 0]} castShadow>
        <cylinderGeometry args={[7.8, 7.6, 0.15, 32]} />
        <meshStandardMaterial color="#6b8e23" roughness={0.85} />
      </mesh>

      {/* Capa de tierra superior oscura */}
      <mesh position={[0, -3.6, 0]} castShadow>
        <cylinderGeometry args={[7.6, 7, 0.4, 32]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.9} />
      </mesh>

      {/* Capa de tierra con textura */}
      <mesh position={[0, -4.1, 0]} castShadow>
        <cylinderGeometry args={[7, 6, 0.8, 32]} />
        <meshStandardMaterial color="#7a5c3e" roughness={0.92} />
      </mesh>

      {/* Capa de tierra media */}
      <mesh position={[0, -4.8, 0]} castShadow>
        <cylinderGeometry args={[6, 5, 1, 32]} />
        <meshStandardMaterial color="#6b5638" roughness={0.94} />
      </mesh>

      {/* Capa rocosa superior */}
      <mesh position={[0, -5.6, 0]} castShadow>
        <cylinderGeometry args={[5, 4, 1, 32]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.95} />
      </mesh>

      {/* Capa rocosa media */}
      <mesh position={[0, -6.4, 0]} castShadow>
        <cylinderGeometry args={[4, 3, 1, 32]} />
        <meshStandardMaterial color="#4d3d2d" roughness={0.96} />
      </mesh>

      {/* Capa rocosa oscura */}
      <mesh position={[0, -7.1, 0]} castShadow>
        <cylinderGeometry args={[3, 2.2, 1, 32]} />
        <meshStandardMaterial color="#3d2d1d" roughness={0.97} />
      </mesh>

      {/* Punta rocosa de la isla - más alargada */}
      <mesh position={[0, -7.8, 0]} castShadow>
        <coneGeometry args={[2.2, 1.5, 32]} />
        <meshStandardMaterial color="#2d1d0d" roughness={1} />
      </mesh>

      {/* Raíces colgantes */}
      <FloatingRoots />
      
      {/* Estalactitas rocosas pequeñas */}
      <RockStalactites />
    </group>
  );
}

// Estalactitas pequeñas en la parte inferior
function RockStalactites() {
  const stalactites = useMemo(() => {
    const stalArray = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.3;
      const radius = 3 + Math.random() * 2;
      stalArray.push({
        position: [
          Math.cos(angle) * radius,
          -6.8 - Math.random() * 0.5,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        scale: 0.15 + Math.random() * 0.15,
      });
    }
    return stalArray;
  }, []);

  return (
    <group>
      {stalactites.map((stal, i) => (
        <mesh key={i} position={stal.position} castShadow>
          <coneGeometry args={[stal.scale, stal.scale * 2, 8]} />
          <meshStandardMaterial color="#3d2d1d" roughness={1} />
        </mesh>
      ))}
    </group>
  );
}

// Raíces que cuelgan de la isla - Mejoradas
function FloatingRoots() {
  const roots = useMemo(() => {
    const rootArray: Array<{
      position: [number, number, number];
      rotation: [number, number, number];
      length: number;
      thickness: number;
    }> = [];
    
    // Raíces en diferentes niveles de la isla
    const levels = [
      { y: -5, radius: 5.5, count: 6, length: [1, 1.5] },
      { y: -6, radius: 4, count: 5, length: [0.8, 1.2] },
      { y: -7, radius: 2.5, count: 4, length: [0.5, 0.9] },
    ];

    levels.forEach((level) => {
      for (let i = 0; i < level.count; i++) {
        const angle = (i / level.count) * Math.PI * 2 + Math.random() * 0.4;
        const r = level.radius + (Math.random() - 0.5) * 0.5;
        const length = level.length[0] + Math.random() * (level.length[1] - level.length[0]);
        
        rootArray.push({
          position: [
            Math.cos(angle) * r,
            level.y - Math.random() * 0.3,
            Math.sin(angle) * r,
          ] as [number, number, number],
          rotation: [
            Math.random() * 0.4 - 0.2,
            angle,
            Math.random() * 0.4 - 0.2,
          ] as [number, number, number],
          length,
          thickness: 0.04 + Math.random() * 0.03,
        });
      }
    });
    
    return rootArray;
  }, []);

  return (
    <group>
      {roots.map((root, i) => (
        <mesh
          key={i}
          position={root.position}
          rotation={root.rotation}
          castShadow
        >
          <cylinderGeometry args={[root.thickness, root.thickness * 0.5, root.length, 6]} />
          <meshStandardMaterial color="#654321" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Flores decorativas
function Flowers() {
  const flowers = useMemo(() => {
    const flowerArray = [];
    for (let i = 0; i < 20; i++) {
      const angle = (i / 20) * Math.PI * 2;
      const radius = 2 + Math.random() * 3;
      flowerArray.push({
        position: [
          Math.cos(angle) * radius,
          -3.2,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: ['#ff69b4', '#ffb6c1', '#ffa07a', '#ffff00'][Math.floor(Math.random() * 4)],
      });
    }
    return flowerArray;
  }, []);

  return (
    <group>
      {flowers.map((flower, i) => (
        <mesh key={i} position={flower.position}>
          <sphereGeometry args={[0.08, 6, 6]} />
          <meshStandardMaterial color={flower.color} emissive={flower.color} emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// Partículas de luz (luciérnagas)
function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  
  const particles = useMemo(() => {
    const positions = new Float32Array(50 * 3);
    for (let i = 0; i < 50; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 6 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(particles, 3));
    return geo;
  }, [particles]);

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        size={0.05}
        color="#ffeb3b"
        sizeAttenuation
        transparent
        opacity={0.6}
      />
    </points>
  );
}

// Anciano sentado
function OldMan() {
  const manRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (manRef.current) {
      // Respiración suave
      const breathScale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.01;
      manRef.current.children[4].scale.set(1, breathScale, 1); // Solo el torso respira
    }
  });

  return (
    <group ref={manRef} position={[0, -3.15, 2]}>
      {/* Piernas dobladas (muslos) */}
      <mesh position={[0.15, 0.3, 0]} rotation={[1.57, 0, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      <mesh position={[-0.15, 0.3, 0]} rotation={[1.57, 0, 0]} castShadow>
        <cylinderGeometry args={[0.12, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>

      {/* Espinillas (parte inferior de piernas) */}
      <mesh position={[0.15, 0.2, 0.5]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.5, 8]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      <mesh position={[-0.15, 0.2, 0.5]} rotation={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.1, 0.08, 0.5, 8]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.8, -0.1]} castShadow>
        <cylinderGeometry args={[0.25, 0.3, 0.8, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Brazos superiores */}
      <mesh position={[0.35, 0.7, -0.1]} rotation={[0.3, 0, 0.6]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[-0.35, 0.7, -0.1]} rotation={[0.3, 0, -0.6]} castShadow>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Antebrazos */}
      <mesh position={[0.55, 0.4, 0.1]} rotation={[-0.5, 0, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.4, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      <mesh position={[-0.55, 0.4, 0.1]} rotation={[-0.5, 0, 0]} castShadow>
        <cylinderGeometry args={[0.07, 0.07, 0.4, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Manos en las rodillas */}
      <mesh position={[0.15, 0.3, 0.35]} castShadow>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      <mesh position={[-0.15, 0.3, 0.35]} castShadow>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Pies en el suelo */}
      <mesh position={[0.15, -0.03, 0.75]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.18, 0.12, 0.28]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      <mesh position={[-0.15, -0.03, 0.75]} rotation={[0, 0, 0]} castShadow>
        <boxGeometry args={[0.18, 0.12, 0.28]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>

      {/* Cuello */}
      <mesh position={[0, 1.25, -0.1]} castShadow>
        <cylinderGeometry args={[0.1, 0.1, 0.15, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Cabeza */}
      <mesh position={[0, 1.45, -0.05]} castShadow>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Pelo/Cabello blanco */}
      <mesh position={[0, 1.6, -0.05]} castShadow>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.9} />
      </mesh>

      {/* Barba */}
      <mesh position={[0, 1.35, 0.15]} castShadow>
        <sphereGeometry args={[0.13, 8, 8]} />
        <meshStandardMaterial color="#f0f0f0" roughness={0.9} />
      </mesh>

      {/* Ojos */}
      <mesh position={[0.08, 1.48, 0.16]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#2b1810" />
      </mesh>
      <mesh position={[-0.08, 1.48, 0.16]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshStandardMaterial color="#2b1810" />
      </mesh>

      {/* Nariz */}
      <mesh position={[0, 1.42, 0.2]} castShadow>
        <coneGeometry args={[0.04, 0.1, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Bastón apoyado */}
      <mesh position={[0.6, 0.5, 0.2]} rotation={[0.2, 0, -0.3]} castShadow>
        <cylinderGeometry args={[0.025, 0.025, 1.3, 8]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
      {/* Mango del bastón */}
      <mesh position={[0.65, 1.15, 0.15]} rotation={[0, 0, 1.2]}>
        <torusGeometry args={[0.07, 0.025, 8, 12]} />
        <meshStandardMaterial color="#654321" />
      </mesh>
    </group>
  );
}

// Moai de la Isla de Pascua - Detallado
function Moai() {
  const moaiRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (moaiRef.current) {
      // Movimiento sutil con el tiempo
      moaiRef.current.rotation.y = 0.3 + Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  // Material de piedra
  const stoneMaterial = new THREE.MeshStandardMaterial({
    color: 0x8b7355,
    roughness: 0.8,
    metalness: 0.1,
  });

  const darkStoneMaterial = new THREE.MeshStandardMaterial({
    color: 0x5a4a3a,
    roughness: 0.9,
  });

  return (
    <group ref={moaiRef} position={[-4.5, -2.8, 1]} rotation={[0, 0.3, 0]}>
      {/* Cuerpo/Cuello */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.8, 1, 0.6]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Mentón */}
      <mesh position={[0, 0.8, 0.05]} castShadow>
        <boxGeometry args={[0.9, 0.4, 0.65]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Cabeza principal */}
      <mesh position={[0, 1.5, 0]} castShadow>
        <boxGeometry args={[1, 1.5, 0.75]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Frente prominente */}
      <mesh position={[0, 2.1, 0.1]} castShadow>
        <boxGeometry args={[1, 0.4, 0.6]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Nariz larga característica */}
      <mesh position={[0, 1.6, 0.45]} castShadow>
        <boxGeometry args={[0.2, 0.6, 0.4]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Ojos hundidos */}
      <mesh position={[-0.25, 1.9, 0.35]}>
        <boxGeometry args={[0.25, 0.2, 0.15]} />
        <primitive object={darkStoneMaterial} attach="material" />
      </mesh>
      <mesh position={[0.25, 1.9, 0.35]}>
        <boxGeometry args={[0.25, 0.2, 0.15]} />
        <primitive object={darkStoneMaterial} attach="material" />
      </mesh>

      {/* Boca/Labios */}
      <mesh position={[0, 1.15, 0.4]} castShadow>
        <boxGeometry args={[0.5, 0.15, 0.25]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Orejas alargadas */}
      <mesh position={[-0.55, 1.75, 0]} castShadow>
        <boxGeometry args={[0.15, 0.75, 0.2]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>
      <mesh position={[0.55, 1.75, 0]} castShadow>
        <boxGeometry args={[0.15, 0.75, 0.2]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Pukao (sombrero rojo) */}
      <mesh position={[0, 2.5, 0]} castShadow>
        <cylinderGeometry args={[0.55, 0.6, 0.35, 16]} />
        <meshStandardMaterial color="#b8564a" roughness={0.85} />
      </mesh>
    </group>
  );
}

// Delimitador con ramas onduladas - estilo wave
function BranchWaveDivider() {
  const branchWaves = useMemo(() => {
    const waveArray = [];
    const waveCount = 24; // Más ramas para un efecto más suave
    
    for (let i = 0; i < waveCount; i++) {
      const angle = (i / waveCount) * Math.PI * 2;
      const radius = 6.5;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      
      // Efecto de ola con múltiples ondas
      const waveHeight = Math.sin(angle * 4) * 0.5; // 4 olas alrededor
      const y = waveHeight - 3.25;
      
      // Rotación para que apunten hacia fuera y ligeramente hacia arriba
      const outwardRotation = [
        Math.sin(angle * 2) * 0.3, // Inclinación variable
        angle + Math.PI / 2, // Apuntan hacia fuera
        waveHeight * 0.4, // Se inclinan según la ola
      ] as [number, number, number];
      
      waveArray.push({
        position: [x, y, z] as [number, number, number],
        rotation: outwardRotation,
        scale: 0.8 + Math.abs(waveHeight) * 0.4, // Más grandes en las crestas
      });
    }
    return waveArray;
  }, []);

  return (
    <group>
      {branchWaves.map((wave, i) => (
        <group key={i} position={wave.position} rotation={wave.rotation}>
          {/* Rama principal */}
          <mesh castShadow>
            <cylinderGeometry args={[0.06, 0.1, wave.scale, 8]} />
            <meshStandardMaterial color="#654321" roughness={0.9} />
          </mesh>
          
          {/* Ramita izquierda */}
          <mesh position={[-0.08, wave.scale * 0.3, 0]} rotation={[0, 0, -0.5]} castShadow>
            <cylinderGeometry args={[0.03, 0.04, wave.scale * 0.4, 6]} />
            <meshStandardMaterial color="#765432" roughness={0.9} />
          </mesh>
          
          {/* Ramita derecha */}
          <mesh position={[0.08, wave.scale * 0.35, 0]} rotation={[0, 0, 0.5]} castShadow>
            <cylinderGeometry args={[0.03, 0.04, wave.scale * 0.4, 6]} />
            <meshStandardMaterial color="#765432" roughness={0.9} />
          </mesh>
          
          {/* Hojas en las puntas */}
          <mesh position={[0, wave.scale * 0.5, 0]}>
            <sphereGeometry args={[0.12, 6, 6]} />
            <meshStandardMaterial color="#4a8526" roughness={0.7} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Componente de escena 3D
function Scene() {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Rotación automática muy suave
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
    }
  });

  return (
    <group ref={groupRef}>
      <Tree />
      <Ground />
      <Particles />
      <OldMan />
      <Moai />
      <BranchWaveDivider />
    </group>
  );
}

// Componente principal exportable
export default function Tree3D() {
  return (
    <section className="w-full h-full">
      <Canvas
        shadows
        camera={{ position: [0, 0, 12], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ 
          outline: 'none', 
          border: 'none', 
          boxShadow: 'none',
          display: 'block',
          width: '100%',
          height: '100%',
          background: 'transparent'
        }}
      >
        {/* Iluminación */}
        <ambientLight intensity={0.4} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        <pointLight position={[-5, 5, -5]} intensity={0.5} color="#ffa500" />
        <pointLight position={[5, 3, 5]} intensity={0.3} color="#ffffff" />
        
        {/* Escena */}
        <Scene />
      </Canvas>
    </section>
  );
}

