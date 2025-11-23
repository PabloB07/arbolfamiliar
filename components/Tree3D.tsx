'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshWobbleMaterial } from '@react-three/drei';
import * as THREE from 'three';

// ============================================================================
// COMPONENTES DEL ÁRBOL MEJORADOS
// ============================================================================

// Tronco mejorado con textura de corteza
function ImprovedTreeTrunk() {
  const trunkRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (trunkRef.current) {
      // Suave balanceo del árbol
      trunkRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.02;
    }
  });

  // Material de corteza con variación
  const barkMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x654321,
    roughness: 0.95,
    metalness: 0.05,
  }), []);

  const darkBarkMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: 0x543210,
    roughness: 0.98,
  }), []);

  return (
    <group ref={trunkRef}>
      {/* Tronco principal con segmentos */}
      <mesh position={[0, -2.5, 0]}>
        <cylinderGeometry args={[0.35, 0.45, 2, 12]} />
        <primitive object={barkMaterial} attach="material" />
      </mesh>

      <mesh position={[0, -1, 0]}>
        <cylinderGeometry args={[0.3, 0.35, 1, 12]} />
        <primitive object={barkMaterial} attach="material" />
      </mesh>

      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.28, 0.3, 0.8, 12]} />
        <primitive object={barkMaterial} attach="material" />
      </mesh>

      {/* Base del tronco más ancha */}
      <mesh position={[0, -3, 0]}>
        <cylinderGeometry args={[0.5, 0.65, 0.5, 12]} />
        <primitive object={darkBarkMaterial} attach="material" />
      </mesh>

      {/* Detalles de corteza - nudos */}
      <mesh position={[0.25, -1.5, 0.2]}>
        <sphereGeometry args={[0.12, 8, 8]} />
        <primitive object={darkBarkMaterial} attach="material" />
      </mesh>

      <mesh position={[-0.22, -0.8, 0.18]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <primitive object={darkBarkMaterial} attach="material" />
      </mesh>

      {/* Raíces expuestas */}
      <ExposedRoots />

      {/* Sistema de ramas mejorado */}
      <DetailedBranches />
    </group>
  );
}

// Raíces expuestas en la base
function ExposedRoots() {
  const roots = useMemo(() => {
    const rootArray = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      rootArray.push({
        position: [
          Math.cos(angle) * 0.4,
          -3.1,
          Math.sin(angle) * 0.4,
        ] as [number, number, number],
        rotation: [
          0.3,
          angle,
          0,
        ] as [number, number, number],
      });
    }
    return rootArray;
  }, []);

  return (
    <group>
      {roots.map((root, i) => (
        <mesh
          key={i}
          position={root.position}
          rotation={root.rotation}
         
        >
          <cylinderGeometry args={[0.08, 0.15, 0.6, 8]} />
          <meshStandardMaterial color="#543210" roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

// Sistema de ramas detallado
function DetailedBranches() {
  const branches = useMemo(() => {
    return [
      // Ramas principales grandes
      { position: [-0.25, 0.2, 0], rotation: [0, 0, -0.6], scale: 1, length: 1.8 },
      { position: [0.25, 0.5, 0], rotation: [0, 0, 0.5], scale: 0.9, length: 1.6 },
      { position: [-0.2, -0.3, 0.15], rotation: [0.2, 0.4, -0.4], scale: 0.85, length: 1.5 },
      { position: [0.2, -0.6, -0.15], rotation: [-0.2, -0.4, 0.45], scale: 0.8, length: 1.4 },
      { position: [0.1, 0.8, 0.2], rotation: [0.3, 0.6, 0.2], scale: 0.75, length: 1.3 },
      { position: [-0.15, 1, -0.2], rotation: [-0.3, -0.5, -0.3], scale: 0.7, length: 1.2 },

      // Ramas secundarias más pequeñas
      { position: [0.15, 0.1, -0.2], rotation: [-0.4, -0.6, 0.35], scale: 0.6, length: 1 },
      { position: [-0.12, 0.6, 0.25], rotation: [0.4, 0.7, -0.25], scale: 0.55, length: 0.9 },
    ];
  }, []);

  return (
    <group>
      {branches.map((branch, i) => (
        <group key={i} position={branch.position} rotation={branch.rotation} scale={branch.scale}>
          {/* Rama principal */}
          <mesh>
            <cylinderGeometry args={[0.06, 0.12, branch.length, 8]} />
            <meshStandardMaterial color="#765432" roughness={0.9} />
          </mesh>

          {/* Sub-ramas */}
          <mesh position={[-0.1, branch.length * 0.4, 0]} rotation={[0, 0, -0.6]}>
            <cylinderGeometry args={[0.03, 0.05, branch.length * 0.5, 6]} />
            <meshStandardMaterial color="#876543" roughness={0.9} />
          </mesh>

          <mesh position={[0.12, branch.length * 0.5, 0]} rotation={[0, 0, 0.5]}>
            <cylinderGeometry args={[0.03, 0.05, branch.length * 0.4, 6]} />
            <meshStandardMaterial color="#876543" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Follaje realista mejorado con más capas
function RealisticFoliage() {
  const foliageRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (foliageRef.current) {
      // Movimiento suave del follaje simulando viento
      foliageRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
      foliageRef.current.position.y = 0.6 + Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
    }
  });

  const leafGroups = useMemo(() => {
    return [
      // Capa inferior - más oscura
      { position: [0, 0.6, 0] as [number, number, number], scale: 2.2, color: '#2d5016', wobbleSpeed: 0.5, wobbleFactor: 0.25 },
      { position: [-0.8, 0.9, 0.3] as [number, number, number], scale: 1.3, color: '#2d5016', wobbleSpeed: 0.6, wobbleFactor: 0.2 },
      { position: [0.9, 1.1, -0.2] as [number, number, number], scale: 1.2, color: '#325518', wobbleSpeed: 0.55, wobbleFactor: 0.22 },

      // Capa media - verde medio
      { position: [0, 1.4, 0] as [number, number, number], scale: 1.9, color: '#3a6b1e', wobbleSpeed: 0.6, wobbleFactor: 0.23 },
      { position: [-0.6, 1.7, -0.4] as [number, number, number], scale: 1.1, color: '#3a6b1e', wobbleSpeed: 0.65, wobbleFactor: 0.21 },
      { position: [0.7, 1.8, 0.3] as [number, number, number], scale: 1, color: '#3f7020', wobbleSpeed: 0.7, wobbleFactor: 0.2 },

      // Capa media-alta
      { position: [0, 2.1, 0] as [number, number, number], scale: 1.6, color: '#4a8526', wobbleSpeed: 0.65, wobbleFactor: 0.24 },
      { position: [-0.5, 2.3, 0.2] as [number, number, number], scale: 0.9, color: '#4a8526', wobbleSpeed: 0.7, wobbleFactor: 0.22 },
      { position: [0.6, 2.4, -0.3] as [number, number, number], scale: 0.85, color: '#508a28', wobbleSpeed: 0.75, wobbleFactor: 0.2 },

      // Capa superior - más clara
      { position: [0, 2.7, 0] as [number, number, number], scale: 1.3, color: '#5ca032', wobbleSpeed: 0.8, wobbleFactor: 0.26 },
      { position: [-0.4, 2.9, -0.1] as [number, number, number], scale: 0.7, color: '#5ca032', wobbleSpeed: 0.85, wobbleFactor: 0.25 },
      { position: [0.3, 3, 0.15] as [number, number, number], scale: 0.65, color: '#68b536', wobbleSpeed: 0.9, wobbleFactor: 0.23 },

      // Capa de copa - verde brillante
      { position: [0, 3.2, 0] as [number, number, number], scale: 0.9, color: '#75c040', wobbleSpeed: 1, wobbleFactor: 0.28 },
      { position: [0, 3.5, 0] as [number, number, number], scale: 0.5, color: '#82d048', wobbleSpeed: 1.1, wobbleFactor: 0.3 },
    ];
  }, []);

  return (
    <group ref={foliageRef}>
      {leafGroups.map((group, index) => (
        <mesh key={index} position={group.position}>
          <sphereGeometry args={[group.scale, 12, 12]} />
          <MeshWobbleMaterial
            color={group.color}
            speed={group.wobbleSpeed}
            factor={group.wobbleFactor}
            roughness={0.6}
            metalness={0.1}
          />
        </mesh>
      ))}

      {/* Hojas individuales flotantes mejoradas */}
      <FloatingLeaves count={25} />
    </group>
  );
}

// Hojas flotantes individuales mejoradas
function FloatingLeaves({ count = 25 }: { count?: number }) {
  const leavesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (leavesRef.current) {
      leavesRef.current.children.forEach((leaf, i) => {
        const time = state.clock.elapsedTime;
        leaf.position.y += Math.sin(time * 2 + i) * 0.003;
        leaf.position.x += Math.cos(time * 1.5 + i) * 0.002;
        leaf.rotation.z += 0.008;
        leaf.rotation.y += 0.005;
      });
    }
  });

  const leaves = useMemo(() => {
    const leafArray = [];
    for (let i = 0; i < count; i++) {
      leafArray.push({
        position: [
          (Math.random() - 0.5) * 5,
          Math.random() * 5 + 0.5,
          (Math.random() - 0.5) * 5,
        ] as [number, number, number],
        rotation: [
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        ] as [number, number, number],
        scale: 0.12 + Math.random() * 0.12,
        color: ['#4a8526', '#5ca032', '#68b536'][Math.floor(Math.random() * 3)],
      });
    }
    return leafArray;
  }, [count]);

  return (
    <group ref={leavesRef}>
      {leaves.map((leaf, i) => (
        <mesh
          key={i}
          position={leaf.position}
          rotation={leaf.rotation}
          scale={leaf.scale}
        >
          <boxGeometry args={[0.35, 0.6, 0.02]} />
          <meshStandardMaterial color={leaf.color} roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

// Componente principal del árbol mejorado
function Tree() {
  return (
    <group>
      <ImprovedTreeTrunk />
      <RealisticFoliage />
    </group>
  );
}

// ============================================================================
// COMPONENTES DEL ENTORNO MEJORADOS
// ============================================================================

// Cielo con gradiente
function Sky() {
  const skyRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (skyRef.current) {
      skyRef.current.rotation.y = state.clock.elapsedTime * 0.01;
    }
  });

  return (
    <mesh ref={skyRef}>
      <sphereGeometry args={[50, 32, 32]} />
      <meshBasicMaterial
        color="#b3e5fc"
        side={THREE.BackSide}
      />
    </mesh>
  );
}

// Nubes flotantes
function Clouds() {
  const cloudsRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
      cloudsRef.current.children.forEach((cloud, i) => {
        cloud.position.y = 8 + Math.sin(state.clock.elapsedTime * 0.5 + i) * 0.5;
      });
    }
  });

  const clouds = useMemo(() => {
    const cloudArray = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 20 + Math.random() * 15;
      cloudArray.push({
        position: [
          Math.cos(angle) * radius,
          8 + Math.random() * 4,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        scale: 1 + Math.random() * 0.8,
      });
    }
    return cloudArray;
  }, []);

  return (
    <group ref={cloudsRef}>
      {clouds.map((cloud, i) => (
        <group key={i} position={cloud.position} scale={cloud.scale}>
          <mesh>
            <sphereGeometry args={[1.5, 8, 8]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.8} roughness={1} />
          </mesh>
          <mesh position={[1, 0, 0]}>
            <sphereGeometry args={[1.2, 8, 8]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.7} roughness={1} />
          </mesh>
          <mesh position={[-1, 0, 0]}>
            <sphereGeometry args={[1.3, 8, 8]} />
            <meshStandardMaterial color="#ffffff" transparent opacity={0.75} roughness={1} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Suelo mejorado con hierba
function ImprovedGround() {
  return (
    <>
      {/* Superficie de césped con variación */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3.3, 0]}>
        <circleGeometry args={[8, 32]} />
        <meshStandardMaterial
          color="#7cb342"
          roughness={0.9}
        />
      </mesh>

      {/* Hierba 3D */}
      <GrassBlades />

      {/* Flores decorativas mejoradas */}
      <ImprovedFlowers />

      {/* Rocas decorativas */}
      <Rocks />

      {/* Arbustos pequeños */}
      <Bushes />

      {/* Setas */}
      <Mushrooms />

      {/* Parte inferior de la isla flotante */}
      <IslandBottom />
    </>
  );
}

// Hierba en 3D
function GrassBlades() {
  const grassPositions = useMemo(() => {
    const positions = [];
    for (let i = 0; i < 80; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = Math.random() * 7;
      positions.push({
        position: [
          Math.cos(angle) * radius,
          -3.25,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [0, Math.random() * Math.PI * 2, 0] as [number, number, number],
        scale: 0.8 + Math.random() * 0.4,
      });
    }
    return positions;
  }, []);

  return (
    <group>
      {grassPositions.map((grass, i) => (
        <mesh
          key={i}
          position={grass.position}
          rotation={grass.rotation}
          scale={grass.scale}
        >
          <coneGeometry args={[0.05, 0.3, 3]} />
          <meshStandardMaterial color="#6ba832" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// Rocas decorativas
function Rocks() {
  const rocks = useMemo(() => {
    const rockArray = [];
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2 + Math.random() * 0.5;
      const radius = 4 + Math.random() * 2.5;
      rockArray.push({
        position: [
          Math.cos(angle) * radius,
          -3.2,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        rotation: [
          Math.random() * 0.5,
          Math.random() * Math.PI * 2,
          Math.random() * 0.5,
        ] as [number, number, number],
        scale: [0.15 + Math.random() * 0.2, 0.12 + Math.random() * 0.15, 0.15 + Math.random() * 0.2] as [number, number, number],
        color: ['#8b7355', '#7a6a4a', '#6b5a3f'][Math.floor(Math.random() * 3)],
      });
    }
    return rockArray;
  }, []);

  return (
    <group>
      {rocks.map((rock, i) => (
        <mesh
          key={i}
          position={rock.position}
          rotation={rock.rotation}
          scale={rock.scale}
         
        >
          <dodecahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color={rock.color} roughness={0.95} />
        </mesh>
      ))}
    </group>
  );
}

// Arbustos pequeños
function Bushes() {
  const bushes = useMemo(() => {
    const bushArray = [];
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + Math.random() * 0.8;
      const radius = 3.5 + Math.random() * 2;
      bushArray.push({
        position: [
          Math.cos(angle) * radius,
          -3.1,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        scale: 0.3 + Math.random() * 0.2,
      });
    }
    return bushArray;
  }, []);

  return (
    <group>
      {bushes.map((bush, i) => (
        <group key={i} position={bush.position} scale={bush.scale}>
          <mesh>
            <sphereGeometry args={[1, 8, 8]} />
            <meshStandardMaterial color="#4a7c1f" roughness={0.9} />
          </mesh>
          <mesh position={[0.3, 0, 0]}>
            <sphereGeometry args={[0.7, 8, 8]} />
            <meshStandardMaterial color="#558622" roughness={0.9} />
          </mesh>
          <mesh position={[-0.3, 0, 0]}>
            <sphereGeometry args={[0.75, 8, 8]} />
            <meshStandardMaterial color="#4d8120" roughness={0.9} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Setas decorativas
function Mushrooms() {
  const mushrooms = useMemo(() => {
    const mushroomArray = [];
    for (let i = 0; i < 10; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 4;
      mushroomArray.push({
        position: [
          Math.cos(angle) * radius,
          -3.22,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        scale: 0.08 + Math.random() * 0.08,
        capColor: Math.random() > 0.5 ? '#d84315' : '#c62828',
      });
    }
    return mushroomArray;
  }, []);

  return (
    <group>
      {mushrooms.map((mushroom, i) => (
        <group key={i} position={mushroom.position} scale={mushroom.scale}>
          {/* Tallo */}
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[1, 1.2, 3, 8]} />
            <meshStandardMaterial color="#f5f5dc" roughness={0.8} />
          </mesh>
          {/* Sombrero */}
          <mesh position={[0, 2, 0]}>
            <sphereGeometry args={[2, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial color={mushroom.capColor} roughness={0.7} />
          </mesh>
          {/* Puntos blancos en el sombrero */}
          <mesh position={[0.8, 2.2, 0]}>
            <sphereGeometry args={[0.3, 8, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.8} />
          </mesh>
          <mesh position={[-0.6, 2.1, 0.5]}>
            <sphereGeometry args={[0.25, 8, 8]} />
            <meshStandardMaterial color="#ffffff" roughness={0.8} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Flores decorativas mejoradas
function ImprovedFlowers() {
  const flowers = useMemo(() => {
    const flowerArray = [];
    for (let i = 0; i < 30; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 2 + Math.random() * 4;
      flowerArray.push({
        position: [
          Math.cos(angle) * radius,
          -3.18,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        color: ['#ff69b4', '#ffb6c1', '#ffa07a', '#ffff00', '#ff1493', '#ff6347'][Math.floor(Math.random() * 6)],
        scale: 0.7 + Math.random() * 0.5,
      });
    }
    return flowerArray;
  }, []);

  return (
    <group>
      {flowers.map((flower, i) => (
        <group key={i} position={flower.position} scale={flower.scale}>
          {/* Centro de la flor */}
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.08, 8, 8]} />
            <meshStandardMaterial color="#ffeb3b" emissive="#ffeb3b" emissiveIntensity={0.3} />
          </mesh>
          {/* Pétalos */}
          {[0, 1, 2, 3, 4].map((petal) => {
            const petalAngle = (petal / 5) * Math.PI * 2;
            return (
              <mesh
                key={petal}
                position={[
                  Math.cos(petalAngle) * 0.12,
                  0.1,
                  Math.sin(petalAngle) * 0.12,
                ]}
              >
                <sphereGeometry args={[0.08, 8, 8]} />
                <meshStandardMaterial color={flower.color} emissive={flower.color} emissiveIntensity={0.2} />
              </mesh>
            );
          })}
          {/* Tallo */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.01, 0.01, 0.2, 6]} />
            <meshStandardMaterial color="#4a8526" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Parte inferior de la isla flotante - Mejorada
function IslandBottom() {
  return (
    <group>
      {/* Borde de transición césped-tierra */}
      <mesh position={[0, -3.35, 0]}>
        <cylinderGeometry args={[7.8, 7.6, 0.15, 32]} />
        <meshStandardMaterial color="#6b8e23" roughness={0.85} />
      </mesh>

      {/* Capa de tierra superior oscura */}
      <mesh position={[0, -3.6, 0]}>
        <cylinderGeometry args={[7.6, 7, 0.4, 32]} />
        <meshStandardMaterial color="#8b6f47" roughness={0.9} />
      </mesh>

      {/* Capa de tierra con textura */}
      <mesh position={[0, -4.1, 0]}>
        <cylinderGeometry args={[7, 6, 0.8, 32]} />
        <meshStandardMaterial color="#7a5c3e" roughness={0.92} />
      </mesh>

      {/* Capa de tierra media */}
      <mesh position={[0, -4.8, 0]}>
        <cylinderGeometry args={[6, 5, 1, 32]} />
        <meshStandardMaterial color="#6b5638" roughness={0.94} />
      </mesh>

      {/* Capa rocosa superior */}
      <mesh position={[0, -5.6, 0]}>
        <cylinderGeometry args={[5, 4, 1, 32]} />
        <meshStandardMaterial color="#5a4a3a" roughness={0.95} />
      </mesh>

      {/* Capa rocosa media */}
      <mesh position={[0, -6.4, 0]}>
        <cylinderGeometry args={[4, 3, 1, 32]} />
        <meshStandardMaterial color="#4d3d2d" roughness={0.96} />
      </mesh>

      {/* Capa rocosa oscura */}
      <mesh position={[0, -7.1, 0]}>
        <cylinderGeometry args={[3, 2.2, 1, 32]} />
        <meshStandardMaterial color="#3d2d1d" roughness={0.97} />
      </mesh>

      {/* Punta rocosa de la isla - más alargada */}
      <mesh position={[0, -7.8, 0]}>
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
    for (let i = 0; i < 15; i++) {
      const angle = (i / 15) * Math.PI * 2 + Math.random() * 0.3;
      const radius = 3 + Math.random() * 2;
      stalArray.push({
        position: [
          Math.cos(angle) * radius,
          -6.8 - Math.random() * 0.6,
          Math.sin(angle) * radius,
        ] as [number, number, number],
        scale: 0.12 + Math.random() * 0.18,
      });
    }
    return stalArray;
  }, []);

  return (
    <group>
      {stalactites.map((stal, i) => (
        <mesh key={i} position={stal.position}>
          <coneGeometry args={[stal.scale, stal.scale * 2.5, 8]} />
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
      { y: -5, radius: 5.5, count: 7, length: [1, 1.6] },
      { y: -6, radius: 4, count: 6, length: [0.8, 1.3] },
      { y: -7, radius: 2.5, count: 5, length: [0.5, 1] },
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
         
        >
          <cylinderGeometry args={[root.thickness, root.thickness * 0.5, root.length, 6]} />
          <meshStandardMaterial color="#654321" roughness={0.9} />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// EFECTOS Y PARTÍCULAS MEJORADOS
// ============================================================================

// Partículas de luz mejoradas (luciérnagas y polen)
function ImprovedParticles() {
  const particlesRef = useRef<THREE.Points>(null);

  const particles = useMemo(() => {
    const positions = new Float32Array(100 * 3);
    for (let i = 0; i < 100; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = Math.random() * 8 - 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime * 2 + i) * 0.004;
        positions[i] += Math.cos(state.clock.elapsedTime + i) * 0.002;
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
        size={0.06}
        color="#ffeb3b"
        sizeAttenuation
        transparent
        opacity={0.7}
      />
    </points>
  );
}

// Mariposas animadas
function Butterflies() {
  const butterfliesRef = useRef<THREE.Group>(null);

  const butterflies = useMemo(() => {
    const butterflyArray = [];
    for (let i = 0; i < 5; i++) {
      butterflyArray.push({
        offset: i * 2,
        color: ['#ff69b4', '#ffb6c1', '#87ceeb', '#ffa07a', '#98fb98'][i],
      });
    }
    return butterflyArray;
  }, []);

  useFrame((state) => {
    if (butterfliesRef.current) {
      butterfliesRef.current.children.forEach((butterfly, i) => {
        const t = state.clock.elapsedTime + butterflies[i].offset;
        butterfly.position.x = Math.cos(t * 0.5) * 3;
        butterfly.position.y = Math.sin(t * 0.7) * 2 + 1;
        butterfly.position.z = Math.sin(t * 0.5) * 3;
        butterfly.rotation.y = Math.atan2(
          Math.sin(t * 0.5),
          Math.cos(t * 0.5)
        );
      });
    }
  });

  return (
    <group ref={butterfliesRef}>
      {butterflies.map((butterfly, i) => (
        <group key={i}>
          {/* Cuerpo */}
          <mesh>
            <cylinderGeometry args={[0.02, 0.02, 0.15, 6]} />
            <meshStandardMaterial color="#2c1810" />
          </mesh>
          {/* Ala izquierda */}
          <mesh position={[-0.08, 0, 0]} rotation={[0, 0, 0.3]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={butterfly.color}
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Ala derecha */}
          <mesh position={[0.08, 0, 0]} rotation={[0, 0, -0.3]}>
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshStandardMaterial
              color={butterfly.color}
              transparent
              opacity={0.8}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Hojas cayendo del árbol
function FallingLeaves() {
  const leavesRef = useRef<THREE.Group>(null);

  const leaves = useMemo(() => {
    const leafArray = [];
    for (let i = 0; i < 15; i++) {
      leafArray.push({
        startY: 3 + Math.random() * 2,
        offset: Math.random() * Math.PI * 2,
        speed: 0.3 + Math.random() * 0.4,
        color: ['#d4a574', '#c89464', '#b87333'][Math.floor(Math.random() * 3)],
      });
    }
    return leafArray;
  }, []);

  useFrame((state) => {
    if (leavesRef.current) {
      leavesRef.current.children.forEach((leaf, i) => {
        const t = state.clock.elapsedTime * leaves[i].speed + leaves[i].offset;
        leaf.position.y = leaves[i].startY - (t % 8);
        leaf.position.x = Math.sin(t) * 2;
        leaf.position.z = Math.cos(t * 1.3) * 2;
        leaf.rotation.x = t * 2;
        leaf.rotation.z = t * 1.5;

        // Reiniciar cuando llega al suelo
        if (leaf.position.y < -3) {
          leaf.position.y = leaves[i].startY;
        }
      });
    }
  });

  return (
    <group ref={leavesRef}>
      {leaves.map((leaf, i) => (
        <mesh key={i}>
          <boxGeometry args={[0.2, 0.3, 0.02]} />
          <meshStandardMaterial color={leaf.color} />
        </mesh>
      ))}
    </group>
  );
}

// ============================================================================
// PERSONAJES
// ============================================================================

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
      <mesh position={[0.15, 0.3, 0]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      <mesh position={[-0.15, 0.3, 0]} rotation={[1.57, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.1, 0.6, 8]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>

      {/* Espinillas (parte inferior de piernas) */}
      <mesh position={[0.15, 0.2, 0.5]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.5, 8]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>
      <mesh position={[-0.15, 0.2, 0.5]} rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.08, 0.5, 8]} />
        <meshStandardMaterial color="#4a4a4a" />
      </mesh>

      {/* Torso */}
      <mesh position={[0, 0.8, -0.1]}>
        <cylinderGeometry args={[0.25, 0.3, 0.8, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Brazos superiores */}
      <mesh position={[0.35, 0.7, -0.1]} rotation={[0.3, 0, 0.6]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>
      <mesh position={[-0.35, 0.7, -0.1]} rotation={[0.3, 0, -0.6]}>
        <cylinderGeometry args={[0.08, 0.08, 0.5, 8]} />
        <meshStandardMaterial color="#8b4513" />
      </mesh>

      {/* Antebrazos */}
      <mesh position={[0.55, 0.4, 0.1]} rotation={[-0.5, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.4, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      <mesh position={[-0.55, 0.4, 0.1]} rotation={[-0.5, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.4, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Manos en las rodillas */}
      <mesh position={[0.15, 0.3, 0.35]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      <mesh position={[-0.15, 0.3, 0.35]}>
        <sphereGeometry args={[0.09, 8, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Pies en el suelo */}
      <mesh position={[0.15, -0.03, 0.75]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.18, 0.12, 0.28]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>
      <mesh position={[-0.15, -0.03, 0.75]} rotation={[0, 0, 0]}>
        <boxGeometry args={[0.18, 0.12, 0.28]} />
        <meshStandardMaterial color="#2c2c2c" />
      </mesh>

      {/* Cuello */}
      <mesh position={[0, 1.25, -0.1]}>
        <cylinderGeometry args={[0.1, 0.1, 0.15, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Cabeza */}
      <mesh position={[0, 1.45, -0.05]}>
        <sphereGeometry args={[0.22, 16, 16]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Pelo/Cabello blanco */}
      <mesh position={[0, 1.6, -0.05]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshStandardMaterial color="#e8e8e8" roughness={0.9} />
      </mesh>

      {/* Barba */}
      <mesh position={[0, 1.35, 0.15]}>
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
      <mesh position={[0, 1.42, 0.2]}>
        <coneGeometry args={[0.04, 0.1, 8]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>

      {/* Bastón apoyado */}
      <mesh position={[0.6, 0.5, 0.2]} rotation={[0.2, 0, -0.3]}>
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
      <mesh position={[0, 0.25, 0]}>
        <boxGeometry args={[0.8, 1, 0.6]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Mentón */}
      <mesh position={[0, 0.8, 0.05]}>
        <boxGeometry args={[0.9, 0.4, 0.65]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Cabeza principal */}
      <mesh position={[0, 1.5, 0]}>
        <boxGeometry args={[1, 1.5, 0.75]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Frente prominente */}
      <mesh position={[0, 2.1, 0.1]}>
        <boxGeometry args={[1, 0.4, 0.6]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Nariz larga característica */}
      <mesh position={[0, 1.6, 0.45]}>
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
      <mesh position={[0, 1.15, 0.4]}>
        <boxGeometry args={[0.5, 0.15, 0.25]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Orejas alargadas */}
      <mesh position={[-0.55, 1.75, 0]}>
        <boxGeometry args={[0.15, 0.75, 0.2]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>
      <mesh position={[0.55, 1.75, 0]}>
        <boxGeometry args={[0.15, 0.75, 0.2]} />
        <primitive object={stoneMaterial} attach="material" />
      </mesh>

      {/* Pukao (sombrero rojo) */}
      <mesh position={[0, 2.5, 0]}>
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
    const waveCount = 28; // Más ramas para un efecto más suave

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
          <mesh>
            <cylinderGeometry args={[0.06, 0.1, wave.scale, 8]} />
            <meshStandardMaterial color="#654321" roughness={0.9} />
          </mesh>

          {/* Ramita izquierda */}
          <mesh position={[-0.08, wave.scale * 0.3, 0]} rotation={[0, 0, -0.5]}>
            <cylinderGeometry args={[0.03, 0.04, wave.scale * 0.4, 6]} />
            <meshStandardMaterial color="#765432" roughness={0.9} />
          </mesh>

          {/* Ramita derecha */}
          <mesh position={[0.08, wave.scale * 0.35, 0]} rotation={[0, 0, 0.5]}>
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

// ============================================================================
// ILUMINACIÓN MEJORADA
// ============================================================================

function ImprovedLighting() {
  return (
    <>
      {/* Luz ambiental brillante */}
      <ambientLight intensity={0.8} />

      {/* Luz direccional principal (sol) */}
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.5}
       
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-12}
        shadow-camera-right={12}
        shadow-camera-top={12}
        shadow-camera-bottom={-12}
        shadow-bias={-0.0001}
      />

      {/* Luz de relleno azulada (cielo) */}
      <hemisphereLight
        args={['#e3f2fd', '#a5d6a7', 0.8]}
        position={[0, 10, 0]}
      />

      {/* Luces de acento cálidas */}
      <pointLight position={[-6, 4, -6]} intensity={0.5} color="#ffeb3b" distance={15} />
      <pointLight position={[6, 3, 6]} intensity={0.4} color="#fff9c4" distance={12} />
      <pointLight position={[0, -2, 8]} intensity={0.3} color="#fffde7" distance={10} />

      {/* Luz trasera para rim lighting */}
      <spotLight
        position={[-8, 6, -8]}
        intensity={0.4}
        angle={Math.PI / 4}
        penumbra={0.5}
        color="#fff59d"
      />
    </>
  );
}

// ============================================================================
// ESCENA PRINCIPAL
// ============================================================================

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Rotación automática muy suave
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.1) * 0.3;
    }
  });

  return (
    <>
      {/* Fondo de cielo */}
      <Sky />

      {/* Nubes */}
      <Clouds />

      {/* Grupo principal con rotación */}
      <group ref={groupRef}>
        <Tree />
        <ImprovedGround />
        <ImprovedParticles />
        <Butterflies />
        <FallingLeaves />
        <OldMan />
        <Moai />
        <BranchWaveDivider />
      </group>
    </>
  );
}

// ============================================================================
// COMPONENTE PRINCIPAL EXPORTABLE
// ============================================================================

export default function Tree3D() {
  return (
    <section className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2, 14], fov: 50 }}
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
        {/* Iluminación mejorada */}
        <ImprovedLighting />

        {/* Niebla atmosférica suave */}
        <fog attach="fog" args={['#e1f5fe', 20, 50]} />

        {/* Escena */}
        <Scene />
      </Canvas>
    </section>
  );
}
