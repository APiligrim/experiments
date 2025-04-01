import styles from '@components/ScrollingText.module.scss';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useRef, useState } from 'react';
import { OrbitControls, Sparkles, useTexture } from '@react-three/drei';
import { H1, H2, H3 } from '@root/system/typography';
import { classNames } from '@root/common/utilities';
import * as THREE from 'three';

function TypingParagraphAnimation({ children, className, letterClass, typingSpeed = 20 }: any) {
  const [displayText, setDisplayText] = useState('');
  const textRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
          setDisplayText(''); // Reset when out of view
          clearTimeout(typingTimeoutRef.current);
        }
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current);
      }
      clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let currentIndex = 0;
    const fullText = children;
    setDisplayText('');

    const typeCharacter = () => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex + 1));
        currentIndex++;
        typingTimeoutRef.current = setTimeout(typeCharacter, typingSpeed);
      }
    };

    // Start with a slight delay for better effect
    typingTimeoutRef.current = setTimeout(typeCharacter, 300);

    return () => clearTimeout(typingTimeoutRef.current);
  }, [isVisible, children, typingSpeed]);

  return (
    <p ref={textRef} className={classNames(styles.subtitle, className)} style={{ whiteSpace: 'pre-wrap' }}>
      {displayText.split('').map((letter, index) => (
        <span
          key={index}
          className={classNames({
            [letterClass]: true,
            // [styles.capitalLetter]: /[A-Z]/.test(letter),
            [styles.subtitleMain]: /[A-Z]/.test(letter),
          })}
          style={{
            display: 'inline-block',
          }}
        >
          {letter}
        </span>
      ))}
      {/* Blinking cursor */}
      {isVisible && displayText.length < children.length && <span className={styles.typingCursor}>|</span>}
    </p>
  );
}

function BackgroundCircles({ visible, fullyVisible }: { visible: boolean; fullyVisible?: boolean }) {
  const texture = useTexture('/butterfly.png');
  const groupRef = useRef<THREE.Group | null>(null);
  const orbitRef = useRef<THREE.Group | null>(null);

  const backgroundCircles = Array.from({ length: 16 }, (_, i) => ({
    radius: 3 + i * 1.8,
    speed: (i % 2 === 0 ? 1 : -1) * (0.05 + Math.random() * 0.2),
    imageCount: 6 + i * 2,
  }));

  useFrame((state, delta) => {
    if (orbitRef.current) {
      orbitRef.current.rotation.y += 0.0 * delta;
      orbitRef.current.rotation.x += 0.04 * delta; // Slight vertical tilt
      orbitRef.current.position.x = Math.sin(state.clock.elapsedTime * 0.9) * 3; // Gentle side-to-side
      orbitRef.current.position.z = Math.cos(state.clock.elapsedTime * 0.1) * 3; // Gentle in-out
    }

    // Existing fade logic
    if (groupRef.current) {
      groupRef.current.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          child.material.opacity = THREE.MathUtils.lerp(child.material.opacity, visible ? 1 : 0, 0.05);
          child.material.transparent = true;
          child.material.needsUpdate = true;
        }
      });
    }
  });

  return (
    <group ref={orbitRef}>
      <group ref={groupRef}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />

        {backgroundCircles.map((circle, index) => (
          <RotatingCircle key={index} radius={circle.radius} speed={circle.speed} imageCount={circle.imageCount} texture={texture} onImageClick={() => {}} visible={visible} />
        ))}
      </group>
    </group>
  );
}

// Update RotatingCircle to accept visible prop
function RotatingCircle({ radius, speed, imageCount, texture, onImageClick, visible }) {
  const groupRef = useRef<THREE.Group | null>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed * delta;
    }
  });

  const baseHue = 220;
  const lightness = Math.max(40, 70 - radius * 9);

  return (
    <group ref={groupRef}>
      <CircleOutline radius={radius} color={`hsl(${baseHue}, 100%, ${lightness}%)`} visible={visible} />
      {Array.from({ length: imageCount }).map((_, i) => {
        const angle = (i / imageCount) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);
        return <RoundedImage key={i} position={[x, 0, z]} rotation={[-Math.PI / 2, 0, 0]} texture={texture} onClick={() => onImageClick(i, radius)} visible={visible} />;
      })}
    </group>
  );
}

// Update CircleOutline to accept visible prop
function CircleOutline({ radius, color = 'white', height = 0.01, visible }) {
  const points: THREE.Vector3[] = [];
  const segments = 64;

  for (let i = 0; i <= segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(radius * Math.cos(angle), height, radius * Math.sin(angle)));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  return (
    <lineLoop geometry={geometry}>
      <lineBasicMaterial attach="material" color={color} opacity={visible ? 1 : 0} transparent={true} />
    </lineLoop>
  );
}

// Update RoundedImage to accept visible prop
function RoundedImage({ position, rotation, texture, onClick, visible }) {
  const [hovered, setHover] = useState(false);
  const ref = useRef<THREE.Mesh>(null);

  return (
    <mesh ref={ref} position={position} rotation={rotation} onPointerOver={() => setHover(true)} onPointerOut={() => setHover(false)} onClick={onClick}>
      <planeGeometry args={[1, 1, 16, 16]} />
      <meshStandardMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}
        roughness={0.8}
        emissive={hovered ? 'white' : 'red'}
        emissiveIntensity={hovered ? 0.5 : 0}
        opacity={visible ? 1 : 0}
      />
    </mesh>
  );
}

export default function ScrollingTextList() {
  const [scrollY, setScrollY] = useState(0);
  const [paperInView, setPaperInView] = useState(false);
  const [isBelowWorkspace, setIsBelowWorkspace] = useState(false);
  const workspaceRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (workspaceRef.current) {
        const workspaceRect = workspaceRef.current.getBoundingClientRect();
        // Check if viewport is below the workspace element
        setIsBelowWorkspace(workspaceRect.top < 0);
      }
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Only trigger once when first entering viewport
        if (entry.isIntersecting && !paperInView) {
          setPaperInView(true);
        }
        // But still hide if scrolled back above
        if (!entry.isIntersecting && !isBelowWorkspace) {
          setPaperInView(false);
        }
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: '0px 0px -200px 0px',
      }
    );

    if (workspaceRef.current) {
      observer.observe(workspaceRef.current);
    }

    return () => {
      if (workspaceRef.current) {
        observer.unobserve(workspaceRef.current);
      }
    };
  }, [isBelowWorkspace, paperInView]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '380vh',
        background: 'black',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <Canvas camera={{ position: [0, 2, 20], fov: 40 }}>
          <Suspense fallback={null}>
            <Sparkles noise={0} count={500} speed={0.04} size={0.6} color={'#FFD2BE'} opacity={10} scale={[20, 100, 20]} />
            <Sparkles noise={0} count={800} speed={0.04} size={0.6} color={'#FFD2BE'} opacity={10} scale={[30, 100, 20]} />
            <Sparkles noise={0} count={100} speed={1.3} size={10} color={'#FFF'} opacity={2} scale={[30, 100, 10]} />
            <Sparkles noise={0} count={100} speed={1} size={9} color={'#FFF'} opacity={2} scale={[30, 100, 10]} />
            <Sparkles noise={0} count={100} speed={1} size={16} color={'#FFF'} opacity={2} scale={[30, 100, 10]} />
            <Sparkles noise={0} count={30} speed={1.3} size={10} color={'#fff'} opacity={2} scale={[80, 300, 10]} />
            <Sparkles noise={0} count={1000} speed={0.04} size={1} color={'#FFD2BE'} opacity={10} scale={[300, 300, 40]} />
            <Sparkles noise={0} count={1000} speed={0.04} size={1} color={'#FFD2BE'} opacity={10} scale={[30, 100, 20]} />
            <Sparkles noise={0} count={1000} speed={0.09} size={0.7} color={'#FFF'} opacity={2} scale={[40, 300, 30]} />
            <BackgroundCircles visible={paperInView || isBelowWorkspace} fullyVisible={isBelowWorkspace} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} zoomSpeed={0.5} rotateSpeed={0.3} dampingFactor={0.2} />
        </Canvas>
      </div>

      <div
        style={{
          transform: 'rotate(-8deg) skewX(-3deg)',
          transformOrigin: 'center center',
          position: 'absolute',
          left: '50%',
          top: `${100 - scrollY * 0.15}px`,
          width: '60%',
          marginLeft: '-30%',
          padding: '80px 0 20px 0',
        }}
      >
        <div
          style={{
            background: 'linear-gradient(to right, #f9f9f9, #f0f0f0)',
            boxShadow: '0 0 30px rgba(0,0,0,0.3)',
            padding: '60px 80px',
            borderTop: '1px solid #ddd',
            borderBottom: '1px solid #ddd',
            position: 'relative',
            minHeight: '80vh',
            // background: 'var(--color-blue-dark)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.15), transparent)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '40px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.15), transparent)',
            }}
          />

          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'url("data:image/png;base64,iVBORw0KGgo...")',
              opacity: 0.1,
              pointerEvents: 'none',
            }}
          />

          <div
            style={{
              color: '#333',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '1.1rem',
              lineHeight: '1.7',
              position: 'relative',
              zIndex: 1,
              marginTop: '20px',
            }}
          >
            <div>
              <H1 className={styles.title}>
                <span className={classNames(styles.capitalLetter, styles.paragraphDecorator)}>W</span>elcome to{' '}
                <span className={classNames(styles.capitalLetter, styles.paragraphDecorator)}>P</span>ierre{' '}
              </H1>
              <div className={styles.divider}>
                <div style={{ paddingBottom: '1.5rem' }}>
                  <TypingParagraphAnimation className={styles.text}>
                    Pierre is an all-new git-based engineering platform. With features such as code hosting, code review, and CI, it’s one place for engineers and their teams to
                    focus on what they do best—building products.
                  </TypingParagraphAnimation>
                </div>
                <p className={styles.label} ref={workspaceRef}>
                  Workspace Notifications
                </p>
                <p>Stay up to date with notifications in your workspace. See what needs your attention, who’s mentioned you, and more.</p>
                <p>
                  In addition to your mentions, you’ll see notifications in the workspace for things that need your attention. This includes new branches, requested reviews,
                  comments, approvals, and more. These come in the form of sidebar links, user mentions, and even in-app toast notifications.
                </p>
              </div>

              <div className={styles.divider}>
                <p className={styles.label}>Unread Activity</p>
                <p>
                  Anytime new activity happens on a branch (either one of your own, or one that you are reviewing) an unread indicator will appear – as well as a count in the
                  navigation sidebar. Reading the activity will the clear the count.
                </p>

                <div className={styles.imageContainer}>
                  <img src="https://docs.pierre.co/images/docs/workspaces/sidebar.png" className={styles.image} style={{ width: '50%' }} />
                </div>
                <p>
                  Unread activity is marked with a purple dot to their left. You’ll see these on everything from branches to comments to mentions. When you’ve viewed the relevant
                  activity, the dot will disappear.
                </p>
                <div className={styles.imageContainer}>
                  <img src="https://docs.pierre.co/images/docs/workspaces/unreads.png" className={styles.image} />
                </div>
              </div>

              <p className={styles.label}>Mentions</p>
              <p>
                Your teammates can mention you just about anywhere on Pierre. When they do, you’ll see an unread indicator on the mentions tab in the sidebar. Click it to toggle
                open the mentions popover.
              </p>
              <p>
                All your mentions will appear here, and new ones will show as unread. When you have a lot of unread mentions, feel free to mark them all as read by using the link
                in the top right of the popover.
              </p>

              <div className={styles.imageContainer}>
                <img src="https://docs.pierre.co/images/docs/workspaces/mentions.png" className={styles.image} />
              </div>

              <p className={styles.label}>Toasts</p>
              <p>
                Toasts appear in the lower right corner of the app and show you timely events. You’ll see toasts for things like new changes getting pushed to a branch and more.
              </p>

              <div className={styles.imageContainer}>
                <img src="https://docs.pierre.co/images/docs/workspaces/draft-toast.png" className={styles.image} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
