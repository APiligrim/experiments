import { useState } from 'react';
import styles from '@components/HeroMetamorphosis.module.scss';
import { classNames } from '@root/common/utilities';

export default function HeroMetamorphosis({ selectedImage }) {
  const [uiDarkMode, setUiDarkMode] = useState(false);
  const [showControls, setShowControls] = useState(true);

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
      {/* Header */}
      <div
        style={{
          position: 'absolute',
          //   top: '20px',
          //   left: '20px',
          //   right: '20px',
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          pointerEvents: 'auto',
        }}
      >
        <div className={styles.text}>
          <div className={styles.headingRow}>
            <h1 className={classNames(styles.title)}>
              <span className={styles.capitalLetter}>T</span>he <span className={styles.capitalLetter}>M</span>etamorphosis <span className={styles.capitalLetter}>O</span>f
            </h1>
          </div>

          <div className={styles.columns}>
            <div className={classNames(styles.subtext, styles.unfillFont)}>
              <p> all that you design </p>
              <p> all that you write</p>
              <p> all that you love</p>
              <p> all that you remember</p>
              <p> all that you feel</p>
            </div>
            <div className={classNames(styles.subtext, styles.unfillFont)}>
              <p> all that you build </p>
              <p> all that you change</p>
              <p> all that you battle</p>
              <p> all that you forget</p>
              <p> all that you imagine</p>
            </div>
          </div>

          <p className={styles.paragraph}>
            <span className={styles.capitalLetter}>A</span>ll that you've come here to <span className={styles.capitalLetter}>B</span>ecome
          </p>
          <h1 className={styles.subtitle}>
            <span className={classNames(styles.capitalLetter, styles.subtitleMain)}>C</span>hange <span className={classNames(styles.capitalLetter, styles.subtitleMain)}>L</span>og
            0.1
          </h1>
        </div>
        {/* <div>
          <button
            onClick={() => setUiDarkMode(!uiDarkMode)}
            style={{
              marginLeft: '10px',
              background: uiDarkMode ? '#333' : '#111',
              color: 'white',
            }}
          >
            {uiDarkMode ? 'Light UI' : 'Dark UI'}
          </button>
          <button
            onClick={() => setShowControls(!showControls)}
            style={{
              marginLeft: '10px',
              background: uiDarkMode ? '#333' : '#111',
              color: 'white',
            }}
          >
            {showControls ? 'Hide Controls' : 'Show Controls'}
          </button>
        </div> */}
      </div>

      {/* Control Panel */}
      {/* {showControls && (
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            background: uiDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.5)',
            padding: '15px',
            borderRadius: '10px',
            pointerEvents: 'auto',
          }}
        >
          <h3 style={{ marginTop: 0 }}>Controls</h3>
          <p>Click on any image to select it</p>
          <p>Orbit controls are limited to specific angles</p>
          {selectedImage && (
            <div style={{ marginTop: '10px' }}>
              <p>Selected Image:</p>
              <p>Ring Radius: {selectedImage.radius}</p>
              <p>Position: {selectedImage.index}</p>
            </div>
          )}
        </div>
      )} */}

      {/* Status Info */}
      {/* <div
        style={{
          position: 'absolute',
          top: '80px',
          right: '20px',
          background: uiDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.5)',
          padding: '10px',
          borderRadius: '5px',
          pointerEvents: 'auto',
        }}
      >
        <p>Total Rings: 11</p>
        <p>Total Images: 187</p>
      </div> */}
    </div>
  );
}
