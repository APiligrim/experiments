import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { useRef } from 'react';

export default function Butterfly({ hideBody = true, leftWingImage, middleBodyImage, rightWingImage, scale = 8 }) {
  const leftWingRef = useRef<THREE.Mesh>(null);
  const rightWingRef = useRef<THREE.Mesh>(null);

  const leftWingTexture = useLoader(THREE.TextureLoader, leftWingImage) as THREE.Texture;
  const rightWingTexture = useLoader(THREE.TextureLoader, rightWingImage) as THREE.Texture;
  const middleBodyTexture = useLoader(THREE.TextureLoader, middleBodyImage) as THREE.Texture;

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const wingRotation = Math.sin(time * 5) * 0.3;
    if (leftWingRef.current) leftWingRef.current.rotation.y = wingRotation;
    if (rightWingRef.current) rightWingRef.current.rotation.y = -wingRotation;
  });

  return (
    <group scale={[scale, scale, scale]}>
      <mesh ref={leftWingRef} position={[-0.5, 0, -0.4]}>
        <planeGeometry args={[1, 1.39]} />
        <meshBasicMaterial map={leftWingTexture} transparent />
      </mesh>

      {!hideBody && (
        <mesh position={[0, 0, 0.01]}>
          <planeGeometry args={[0.07, 0.3]} />
          <meshBasicMaterial map={middleBodyTexture} transparent />
        </mesh>
      )}

      <mesh ref={rightWingRef} position={[0.48, 0, -0.4]}>
        <planeGeometry args={[1, 1.39]} />
        <meshBasicMaterial map={rightWingTexture} transparent />
      </mesh>
    </group>
  );
}
