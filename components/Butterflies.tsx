import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
import Butterfly from './Butterfly';

export function ButterfliesTwo({ count = 10 }) {
  const groupRef = useRef<THREE.Group>(null);
  const butterflies = useRef<any[]>([]);

  // Initialize butterflies with smaller scales
  useMemo(() => {
    butterflies.current = Array.from({ length: count }).map(() => ({
      position: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, -5 - Math.random() * 15),
      target: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, -5 - Math.random() * 15),
      speed: 0.5 + Math.random() * 0.5,
      scale: 0.1 + Math.random() * 1, // Smaller scale range (0.1 to 0.4)
      timeOffset: Math.random() * 100,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();

    butterflies.current.forEach((butterfly) => {
      // Update target periodically
      if (time % 5 < 0.016) {
        // About every 5 seconds
        butterfly.target.set((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, -5 - Math.random() * 15);
      }

      // Move toward target
      const direction = new THREE.Vector3()
        .subVectors(butterfly.target, butterfly.position)
        .normalize()
        .multiplyScalar(butterfly.speed * 0.05);

      butterfly.position.add(direction);

      // Add some organic fluttering
      butterfly.position.y += Math.sin(time * 2 + butterfly.timeOffset) * 0.02;
    });

    // Update all butterfly positions in the scene
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const butterfly = butterflies.current[i];
        child.position.copy(butterfly.position);
        child.scale.setScalar(butterfly.scale);

        // Face direction of movement
        if (i > 0) {
          const prevPos = butterflies.current[i - 1].position;
          child.lookAt(prevPos);
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {butterflies.current.map((_, i) => (
        <group key={i}>
          <Butterfly leftWingImage="/left-wing.png" rightWingImage="/right-wing.png" middleBodyImage="/middle-body.png" scale={0.7} />
        </group>
      ))}
    </group>
  );
}

export default function Butterflies({ count = 20 }) {
  const groupRef = useRef<THREE.Group>(null);
  const butterflies = useRef<any[]>([]);
  const prevPositions = useRef<THREE.Vector3[]>([]);

  // Initialize butterflies
  useMemo(() => {
    butterflies.current = Array.from({ length: count }).map(() => {
      const pos = new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, -5 - Math.random() * 15);
      return {
        position: pos.clone(),
        target: new THREE.Vector3((Math.random() - 0.5) * 20, (Math.random() - 0.5) * 10, -5 - Math.random() * 15),
        speed: 0.5 + Math.random() * 0.5,
        scale: 0.1 + Math.random() * 0.6,
        timeOffset: Math.random() * 100,
        velocity: new THREE.Vector3(),
      };
    });
    prevPositions.current = butterflies.current.map((b) => b.position.clone());
  }, [count]);

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const delta = Math.min(0.1, clock.getDelta()); // Smoothing factor

    butterflies.current.forEach((butterfly, i) => {
      // Save previous position for smooth rotation
      prevPositions.current[i].copy(butterfly.position);

      // Update target periodically (smoother transition)
      if (time % 7 < delta) {
        // Every ~7 seconds
        butterfly.target.set(
          (Math.random() - 0.5) * 20,
          (Math.random() - 0.3) * 10, // Slight upward bias
          -5 - Math.random() * 15
        );
      }

      // Calculate smooth direction using velocity
      const direction = new THREE.Vector3().subVectors(butterfly.target, butterfly.position).normalize();

      butterfly.velocity.lerp(direction.multiplyScalar(butterfly.speed), 0.1 * delta * 60);
      butterfly.position.add(butterfly.velocity.multiplyScalar(delta * 2));

      // Organic fluttering (reduced intensity)
      butterfly.position.y += Math.sin(time * 3 + butterfly.timeOffset) * 0.01;
    });

    // Update all butterfly positions and rotations
    if (groupRef.current) {
      groupRef.current.children.forEach((child, i) => {
        const butterfly = butterflies.current[i];
        child.position.copy(butterfly.position);
        child.scale.setScalar(butterfly.scale);

        // Smooth rotation toward movement direction
        if (i > 0) {
          const movementDirection = new THREE.Vector3().subVectors(butterfly.position, prevPositions.current[i]).normalize();

          if (movementDirection.length() > 0.001) {
            child.quaternion.slerp(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), movementDirection), 0.1);
          }
        }
      });
    }
  });

  return (
    <group ref={groupRef}>
      {butterflies.current.map((_, i) => (
        <group key={i}>
          <Butterfly leftWingImage="/left-wing.png" rightWingImage="/right-wing.png" middleBodyImage="/middle-body.png" scale={0.7} />
        </group>
      ))}
    </group>
  );
}
