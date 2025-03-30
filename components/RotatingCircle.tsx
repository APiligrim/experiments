'use client';

// import { Canvas, useFrame, useLoader } from '@react-three/fiber';
// import { OrbitControls, Text3D, useFont, useTexture } from '@react-three/drei';
// import { Text } from '@react-three/drei';
// import * as THREE from 'three';
// import React, { useRef } from 'react';

// function CircleOutline({ radius }: { radius: number }) {
//   const points = [];
//   const segments = 64;

//   for (let i = 0; i <= segments; i++) {
//     const angle = (i / segments) * Math.PI * 2;
//     points.push(new THREE.Vector3(radius * Math.cos(angle), 0.01, radius * Math.sin(angle)));
//   }

//   const geometry = new THREE.BufferGeometry().setFromPoints(points);
//   return (
//     <lineLoop geometry={geometry}>
//       <lineBasicMaterial attach="material" color="white" />
//     </lineLoop>
//   );
// }

// function RoundedImage({ position, rotation, texture }) {
//   return (
//     <mesh position={position} rotation={rotation}>
//       <planeGeometry args={[1, 1, 16, 16]} />
//       <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} roughness={0.8} />
//     </mesh>
//   );
// }

// function RotatingCircle({ radius, speed, imageCount, texture }: { radius: number; speed: number; imageCount: number; texture: THREE.Texture }) {
//   const groupRef = useRef<THREE.Group>(null);

//   useFrame((state, delta) => {
//     if (groupRef.current) {
//       groupRef.current.rotation.y += speed * delta;
//     }
//   });

//   return (
//     <group ref={groupRef}>
//       <CircleOutline radius={radius} />
//       {Array.from({ length: imageCount }).map((_, i) => {
//         const angle = (i / imageCount) * Math.PI * 2;
//         const x = radius * Math.cos(angle);
//         const z = radius * Math.sin(angle);
//         return <RoundedImage key={i} position={[x, 0, z]} rotation={[-Math.PI / 2, 0, 0]} texture={texture} />;
//       })}
//     </group>
//   );
// }

// function Scene() {
//   const imageUrl = 'https://intdev-global.s3.us-west-2.amazonaws.com/public/internet-dev/dd7dbdcd-65a9-4e38-b0b8-17d37b5643f4.png';
//   const texture = useTexture(imageUrl);

//   // Array of 11 values to generate circles
//   const circles = Array.from({ length: 11 }, (_, i) => ({
//     radius: 5 + i * 2.5,
//     speed: (i % 2 === 0 ? 1 : -1) * (0.1 + Math.random() * 0.4), // Alternate spin direction
//     imageCount: 8 + i * 2,
//   }));

//   return (
//     <>
//       <ambientLight intensity={0.6} />
//       <directionalLight position={[5, 10, 5]} intensity={0.8} />

//       {/* Central flat image */}
//       <mesh rotation={[-Math.PI / 2, 0, 0]}>
//         <planeGeometry args={[8, 8, 100, 100]} />
//         <meshStandardMaterial map={texture} />
//       </mesh>

//       {/* Rotating image rings */}
//       {circles.map((circle, index) => (
//         <RotatingCircle key={index} radius={circle.radius} speed={circle.speed} imageCount={circle.imageCount} texture={texture} />
//       ))}

//       <OrbitControls />
//     </>
//   );
// }

// function SpinningCircles() {
//   return (
//     <div style={{ width: '100%', height: '100vh', background: 'black' }}>
//       <Canvas camera={{ position: [0, 10, 20], fov: 50 }}>
//         <Scene />
//       </Canvas>
//     </div>
//   );
// }

// export default SpinningCircles;

import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Text } from '@react-three/drei';
import ScrollingTextList from './ScrollingText';
import HeroMetamorphosis from './HeroMetamorphosis';

// Improved CircleOutline with configurable color and height
function CircleOutline({ radius, color = 'white', height = 0.01 }: { radius: number; color?: string; height?: number }) {
  const points = [];
  const segments = 64;

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(radius * Math.cos(angle), height, radius * Math.sin(angle)));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial attach="material" color={color} />
    </lineLoop>
  );
}

// Enhanced RoundedImage with hover effects and click handling
function RoundedImage({ position, rotation, texture, onClick }) {
  const [hovered, setHover] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={ref} position={position} rotation={rotation} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} onClick={onClick}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} roughness={0.8} emissive={hovered ? 'white' : 'black'} emissiveIntensity={hovered ? 0.5 : 0} />
    </mesh>
  );
}

// RotatingCircle with dynamic speed control
function RotatingCircle({ radius, speed, imageCount, texture, onImageClick }) {
  const groupRef = useRef<THREE.Group>(null);
  const [currentSpeed, setCurrentSpeed] = useState(speed);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += currentSpeed * delta;
    }
  });

  return (
    <group ref={groupRef}>
      <CircleOutline radius={radius} color={`hsl(${radius * 10}, 80%, 60%)`} />
      {Array.from({ length: imageCount }).map((_, i) => {
        const angle = (i / imageCount) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return <RoundedImage key={i} position={[x, 0, z]} rotation={[-Math.PI / 2, 0, 0]} texture={texture} onClick={() => onImageClick(i, radius)} />;
      })}
    </group>
  );
}

function Scene({ onImageClick }) {
  const imageUrl = 'https://intdev-global.s3.us-west-2.amazonaws.com/public/internet-dev/dd7dbdcd-65a9-4e38-b0b8-17d37b5643f4.png';
  const texture = useTexture(imageUrl);
  const controlsRef = useRef();
  const { camera } = useThree();

  // Initialize camera for bird's-eye view (keeping your exact setup)
  useEffect(() => {
    camera.position.set(0, 20, 0.1); // Changed from 50 to 30 for closer zoom
    camera.lookAt(200, 0, 0);
    camera.up.set(0, 0, 300); // Keeping your custom up vector
  }, [camera]);

  const circles = Array.from({ length: 11 }, (_, i) => ({
    radius: 5 + i * 2.5,
    speed: (i % 2 === 0 ? 1 : -1) * (0.1 + Math.random() * 0.4),
    imageCount: 8 + i * 2,
  }));

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <pointLight position={[0, 10, 0]} intensity={1} />

      {/* Central flat image - keeping your exact orientation */}
      <group rotation={[0, 0, 0]}>
        <mesh>
          <planeGeometry args={[8, 8, 100, 100]} />
          <meshStandardMaterial map={texture} />
        </mesh>
        <Text position={[0, 0.1, 0]} rotation={[0, 0, 0]} color="white" fontSize={1} maxWidth={6} lineHeight={1} letterSpacing={0.1} anchorX="center" anchorY="middle">
          Interactive Gallery
        </Text>
      </group>

      {/* Rotating image rings */}
      {circles.map((circle, index) => (
        <RotatingCircle key={index} radius={circle.radius} speed={circle.speed} imageCount={circle.imageCount} texture={texture} onImageClick={onImageClick} />
      ))}

      <OrbitControls
        ref={controlsRef}
        enableZoom={true}
        enablePan={false}
        // minPolarAngle={Math.PI / 2 - 0.05} // Very slight tilt allowance (~2.8 degrees)
        // maxPolarAngle={Math.PI / 2 + 0.05} // Very slight tilt allowance
        // minAzimuthAngle={-0.05} // Tiny rotation limits (~2.8 degrees)
        // maxAzimuthAngle={0.05} // Tiny rotation limits
        // minDistance={20} // Closer minimum zoom (from 30)
        // maxDistance={60} // Reduced maximum zoom (from 100)
        zoomSpeed={0.5}
        rotateSpeed={0.3}
        dampingFactor={0.2}
      />
    </>
  );
}

function SpinningCircles() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageClick = (index, radius) => {
    setSelectedImage({ index, radius });
    // console.log(`Image clicked: Index ${index}, Radius ${radius}`);
  };

  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '100vh',
          background: 'black',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Three.js Canvas */}
        <Canvas>
          <Scene onImageClick={handleImageClick} />
        </Canvas>
      </div>
      <HeroMetamorphosis selectedImage={selectedImage} />
      <ScrollingTextList />

      <div
        style={{
          height: '100vh',
          background: 'black',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontSize: '2rem',
        }}
      >
        Continue your experience...
      </div>
    </div>
  );
}

export default SpinningCircles;
