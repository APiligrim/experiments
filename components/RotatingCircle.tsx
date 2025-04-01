'use client';
import styles from '@components/ScrollingText.module.scss';

import * as THREE from 'three';
import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useTexture, Text, Sparkles } from '@react-three/drei';
import HeroMetamorphosis from './HeroMetamorphosis';
import ScrollingTextList from './ScrollingText';
import Butterflies, { ButterfliesTwo } from './Butterflies';

function CircleOutline({ radius, color = 'white', height = 0.01 }: { radius: number; color?: string; height?: number }) {
  const points: THREE.Vector3[] = [];
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

function RoundedImage({ position, rotation, texture, onClick }) {
  const [hovered, setHover] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={ref} position={position} rotation={rotation} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} onClick={onClick}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <meshStandardMaterial map={texture} transparent side={THREE.DoubleSide} roughness={0.8} emissive={hovered ? 'white' : 'red'} emissiveIntensity={hovered ? 0.5 : 0} />
    </mesh>
  );
}

export function RotatingCircle({ radius, speed, imageCount, texture, onImageClick }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed * delta;
    }
  });

  // Define a base blue color and vary its lightness based on the radius
  const baseHue = 220; // Hue for blue in HSL
  const lightness = Math.max(40, 70 - radius * 9); // Adjust lightness based on radius

  return (
    <group ref={groupRef}>
      <CircleOutline radius={radius} color={`hsl(${baseHue}, 100%, ${lightness}%)`} />
      {Array.from({ length: imageCount }).map((_, i) => {
        const angle = (i / imageCount) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return <RoundedImage key={i} position={[x, 0, z]} rotation={[-Math.PI / 2, 0, 0]} texture={texture} onClick={() => onImageClick(i, radius)} />;
      })}
    </group>
  );
}

function Scene({ onImageClick, cameraRef, controlsRef }) {
  // const imageUrl = 'https://intdev-global.s3.us-west-2.amazonaws.com/public/internet-dev/dd7dbdcd-65a9-4e38-b0b8-17d37b5643f4.png';
  const imageUrl = '/butterfly.png';
  const paperRef = useRef<THREE.Mesh>(null);

  const texture = useTexture(imageUrl);
  const { camera } = useThree();

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

  useFrame(() => {
    if (paperRef.current) {
      paperRef.current.quaternion.copy(camera.quaternion);
    }
  });

  const zoomIn = () => {
    camera.position.set(0, 10, 10);
    camera.lookAt(0, 0, 0);
  };

  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
      <pointLight position={[0, 10, 0]} intensity={1} />

      {/* <group rotation={[0, 0, 0]}>
        <mesh>
          <planeGeometry args={[8, 2, 0, 0]} />
          <meshStandardMaterial map={texture} />
        </mesh>
      </group> */}

      {circles.map((circle, index) => (
        <RotatingCircle key={index} radius={circle.radius} speed={circle.speed} imageCount={circle.imageCount} texture={texture} onImageClick={onImageClick} />
      ))}

      <Sparkles noise={0} count={500} speed={0.04} size={0.6} color={'#FFD2BE'} opacity={10} scale={[20, 100, 20]}></Sparkles>
      <Sparkles noise={0} count={30} speed={1.3} size={10} color={'#FFF'} opacity={2} scale={[30, 100, 10]}></Sparkles>
      <Sparkles noise={0} count={30} speed={1} size={10} color={'#FFF'} opacity={2} scale={[30, 100, 10]}></Sparkles>
      <Sparkles noise={0} count={30} speed={1.3} size={10} color={'#FF2D75'} opacity={2} scale={[80, 300, 10]}></Sparkles>
      <Sparkles noise={0} count={30} speed={1.3} size={10} color={'#FFDE59'} opacity={2} scale={[80, 300, 10]}></Sparkles>
      <Sparkles noise={0} count={30} speed={1.3} size={10} color={'#59FFB9'} opacity={2} scale={[80, 300, 10]}></Sparkles>
      <Sparkles noise={0} count={30} speed={1.3} size={10} color={'#5973FF'} opacity={2} scale={[80, 300, 10]}></Sparkles>
      <Sparkles noise={0} count={1000} speed={0.04} size={0.6} color={'#A5FFD6'} opacity={10} scale={[300, 300, 40]}></Sparkles>

      <Sparkles noise={0} count={1000} speed={0.09} size={0.7} color={'#FFF'} opacity={2} scale={[40, 300, 30]}></Sparkles>

      <OrbitControls ref={controlsRef} enableZoom={false} enablePan={true} zoomSpeed={0.5} rotateSpeed={0.3} dampingFactor={0.2} />
    </>
  );
}

function SpinningCircles() {
  const cameraRef = useRef(null); // NEW
  const controlsRef = useRef(null); // NEW
  const [selectedImage, setSelectedImage] = useState<{ index: number; radius: number } | null>(null);
  const handleImageClick = (index, radius) => {
    setSelectedImage({ index, radius });
  };

  return (
    <div>
      <div
        style={{
          width: '100%',
          height: '100dvh',
          background: 'black',
          position: 'relative',
        }}
      >
        <Canvas>
          <Scene onImageClick={handleImageClick} cameraRef={cameraRef} controlsRef={controlsRef} />
        </Canvas>

        <HeroMetamorphosis selectedImage={selectedImage} />
        <ScrollingTextList />

        <div style={{ position: 'relative', height: '100%' }}>
          <Canvas style={{ background: 'black' }} camera={{ position: [0, 0, 5], fov: 50 }}>
            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 10, 5]} intensity={0.8} />
            <pointLight position={[0, 10, 0]} intensity={1} />
            <Sparkles noise={0} count={500} speed={0.04} size={0.6} color={'#FFD2BE'} opacity={10} scale={[20, 100, 20]} />
            <Sparkles noise={0} count={800} speed={0.04} size={0.6} color={'#FFD2BE'} opacity={10} scale={[30, 100, 20]} />
            <Sparkles noise={0} count={100} speed={1.3} size={10} color={'#FFF'} opacity={2} scale={[30, 100, 10]} />
            <Sparkles noise={0} count={100} speed={1} size={13} color={'#FFF'} opacity={2} scale={[30, 100, 10]} />
            <Sparkles noise={0} count={100} speed={1} size={13} color={'#FFF'} opacity={2} scale={[30, 100, 10]} />
            <Sparkles noise={0} count={30} speed={1.3} size={10} color={'#fff'} opacity={2} scale={[80, 300, 10]} />
            <Sparkles noise={0} count={1000} speed={1} size={1} color={'#FFD2BE'} opacity={10} scale={[300, 300, 40]} />
            <Sparkles noise={0} count={1000} speed={1} size={1} color={'#FFD2BE'} opacity={10} scale={[30, 100, 20]} />

            <Sparkles noise={0} count={1000} speed={0.09} size={0.7} color={'#FFF'} opacity={2} scale={[40, 300, 30]} />

            <Butterflies count={30} />
            <ButterfliesTwo count={10} />
          </Canvas>

          {/* Text overlay positioned above ButterfliesTwo */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              width: '100%',
              zIndex: 10,
              pointerEvents: 'none', // Allows clicking through to canvas
            }}
          >
            <p
              className={styles.lastSectionTitle}
              style={{
                marginBottom: '1rem',
              }}
            >
              Becoming the Best You Can Be With Your Team
            </p>
            <p
              className={styles.label}
              style={{
                color: '#FFD2BE',
                fontSize: '2rem',
                fontFamily: 'var(--font-family-heading)',
                letterSpacing: '0.2em',
              }}
            >
              Pierre.co
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpinningCircles;
