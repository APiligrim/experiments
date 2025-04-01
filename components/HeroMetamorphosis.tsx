import styles from '@components/HeroMetamorphosis.module.scss';

import { Canvas } from '@react-three/fiber';
import { classNames } from '@root/common/utilities';
import { useEffect, useState, useRef } from 'react';
import Butterfly from './Butterfly';
import Link from 'next/link';

export default function HeroMetamorphosis({ selectedImage }) {
  const [uiDarkMode, setUiDarkMode] = useState(false);
  const [allWords] = useState(['write', 'remember', 'feel', 'change', 'forget', 'imagine']);
  const [currentWords, setCurrentWords] = useState<string[]>([]);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const shuffleWords = () => {
      const shuffled = [...allWords].sort(() => Math.random() - 0.5);
      setCurrentWords(shuffled);
    };
    shuffleWords();
    const interval = setInterval(() => shuffleWords(), 1000);
    return () => clearInterval(interval);
  }, [allWords]);

  const renderAnimatedWords = (startIndex, count, column) => {
    return currentWords.slice(startIndex, startIndex + count).map((word, index) => (
      <p key={`${word}-${index}`} className={classNames(styles.wordFade, column === 'left' ? styles[`leftDynamic${index + 1}`] : styles[`rightDynamic${index + 1}`])}>
        all that you {word}
      </p>
    ));
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        color: uiDarkMode ? '#333' : 'white',
        transition: 'all 0.3s ease',
      }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
        }}
      >
        <div className={styles.background} />

        <div className={styles.text}>
          <div className={styles.butterfly} style={{ position: 'absolute', zIndex: 9 }}>
            <Canvas>
              <Butterfly leftWingImage="/left-wing.png" rightWingImage="/right-wing.png" middleBodyImage="/middle-body.png" hideBody={false} />
            </Canvas>
          </div>
          <div className={styles.headingRow}>
            <h1 className={classNames(styles.title)}>
              <span className={styles.capitalLetter}>T</span>he <span className={styles.capitalLetter}>M</span>etamorphosis <span className={styles.capitalLetter}>O</span>f
            </h1>
          </div>
          <div className={styles.columns}>
            <div className={classNames(styles.subtext, styles.unfillFont, styles.columnLeft)}>
              <p className={styles.leftStatic1}>all that you design</p>
              {renderAnimatedWords(0, 3, 'left')}
              <p className={styles.leftStatic2}>all that you love</p>
            </div>
            <div className={classNames(styles.subtext, styles.unfillFont, styles.columnRight)}>
              <p className={styles.rightStatic1}>all that you build</p>
              {renderAnimatedWords(3, 3, 'right')}
              <p className={styles.rightStatic2}>all that you battle</p>
              {renderAnimatedWords(6, 2, 'right')}
            </div>
          </div>

          <p className={styles.paragraph}>
            <span className={classNames(styles.capitalLetter, styles.paragraphDecorator)}>A</span>ll that you've come here to{' '}
            <span className={classNames(styles.capitalLetter, styles.paragraphDecorator)}>B</span>ecome
          </p>
          <Link href="https://pierre.co/" target="_blank" style={{ color: 'var( --color-blue-dark)', borderBottom: 'none', textDecoration: 'none' }}>
            <p className={styles.company}>Pierre.Co</p>
          </Link>

          <h1 className={styles.subtitle}>
            <span className={classNames(styles.capitalLetter, styles.subtitleMain)}>C</span>hange <span className={classNames(styles.capitalLetter, styles.subtitleMain)}>L</span>
            og 0.1
          </h1>
        </div>
      </div>
    </div>
  );
}
