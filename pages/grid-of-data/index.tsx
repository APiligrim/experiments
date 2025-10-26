import React, { useEffect, useState } from 'react';
import styles from './GridOfData.module.scss';

// Animation components
const Rain = () => (
  <div className={styles.fullHeightAnimation}>
    <p className={styles.animatedText}>R A I N</p>
  </div>
);

const Waterfall = () => (
  <div className={styles.fullHeightAnimation}>
    <p className={styles.animatedText}>W A T E R F A L L</p>
  </div>
);

const Clouds = () => (
  <div className={styles.fullHeightAnimation}>
    <p className={styles.animatedText}>C L O U D S</p>
  </div>
);

const Wind = () => (
  <div className={styles.fullHeightAnimation}>
    <p className={styles.animatedText}>W I N D</p>
  </div>
);

// Example data fixture
const dataFixture = [
  { title: 'Data 1', size: 50, animation: <Rain /> },
  { title: 'Data 2', size: 30, animation: <Waterfall /> },
  { title: 'Data 3', size: 70, animation: <Clouds /> },
  { title: 'Data 4', size: 40, animation: <Wind /> },
  { title: 'Data 5', size: 60, animation: <Rain /> },
  { title: 'Data 6', size: 20, animation: <Waterfall /> },
  { title: 'Data 7', size: 80, animation: <Clouds /> },
  { title: 'Data 8', size: 35, animation: <Wind /> },
  { title: 'Data 9', size: 90, animation: <Rain /> },
  { title: 'Data 10', size: 25, animation: <Waterfall /> },
  { title: 'Data 11', size: 55, animation: <Rain /> },
  { title: 'Data 12', size: 45, animation: <Clouds /> },
];

const generateMatrixColumn = (length) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  return Array.from({ length: length + 10 }, () => chars[Math.floor(Math.random() * chars.length)]);
};

const SpiralTextEffect = () => {
  const [spiralText, setSpiralText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  useEffect(() => {
    const interval = setInterval(() => {
      setSpiralText((prev) => {
        const newChar = chars[Math.floor(Math.random() * chars.length)];
        return prev + newChar;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.spiralTextContainer}>
      <svg viewBox="-50 -50 100 100" className={styles.spiralSvg}>
        {spiralText.split('').map((char, index) => {
          const angle = index * 15; // Adjust spacing between characters
          const radius = 5 + index * 0.5; // Adjust spiral growth
          const x = radius * Math.cos((angle * Math.PI) / 180);
          const y = radius * Math.sin((angle * Math.PI) / 180);
          return (
            <text key={index} x={x} y={y} textAnchor="middle" alignmentBaseline="middle" className={styles.spiralText}>
              {char}
            </text>
          );
        })}
      </svg>
    </div>
  );
};

const flowerImages = [
  '/images/flower1.png',
  '/images/flower2.png',
  '/images/flower3.png',
  '/images/flower4.png',
  '/images/flower5.png',
  '/images/flower6.png',
  '/images/flower7.png',
  '/images/flower8.png',
  '/images/flower9.png',
  '/images/flower10.png',
  '/images/flower11.png',
  '/images/flower12.png',
];

const circleColors = [
  '#1E90FF', // DodgerBlue
  '#00BFFF', // DeepSkyBlue
  '#87CEFA', // LightSkyBlue
  '#4682B4', // SteelBlue
  '#5F9EA0', // CadetBlue
  '#6495ED', // CornflowerBlue
  '#4169E1', // RoyalBlue
  '#2424b7ff', // Blue
  '#003d93ff', // MediumBlue
  '#00008dff', // DarkBlue
  '#191970', // MidnightBlue
  '#B0C4DE', // LightSteelBlue
];

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.clockContainer}>
      <p className={styles.clockText}>{time.toLocaleTimeString()}</p>
    </div>
  );
};

const CircularClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourAngle = (360 / 12) * hours + (360 / 12) * (minutes / 60);
  const minuteAngle = (360 / 60) * minutes + (360 / 60) * (seconds / 60);
  const secondAngle = (360 / 60) * seconds;

  return (
    <div className={styles.circularClockContainer}>
      <svg viewBox="-50 -50 100 100" className={styles.circularClockSvg}>
        {/* Clock numbers */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (360 / 12) * i;
          const x = 40 * Math.cos((angle - 90) * (Math.PI / 180));
          const y = 40 * Math.sin((angle - 90) * (Math.PI / 180));
          return (
            <text key={i} x={x} y={y} textAnchor="middle" alignmentBaseline="middle" className={styles.clockNumber}>
              {i === 0 ? 12 : i}
            </text>
          );
        })}

        {/* Hour hand */}
        <line x1="0" y1="0" x2={20 * Math.cos((hourAngle - 90) * (Math.PI / 180))} y2={20 * Math.sin((hourAngle - 90) * (Math.PI / 180))} className={styles.hourHand} />

        {/* Minute hand */}
        <line x1="0" y1="0" x2={30 * Math.cos((minuteAngle - 90) * (Math.PI / 180))} y2={30 * Math.sin((minuteAngle - 90) * (Math.PI / 180))} className={styles.minuteHand} />

        {/* Second hand */}
        <line x1="0" y1="0" x2={40 * Math.cos((secondAngle - 90) * (Math.PI / 180))} y2={40 * Math.sin((secondAngle - 90) * (Math.PI / 180))} className={styles.secondHand} />
      </svg>
    </div>
  );
};

const SidebarAnimation = ({ animation }) => <div className={styles.sidebarAnimation}>{animation}</div>;

const GridOfData = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {dataFixture.map((data, index) => (
          <div key={index} className={styles.gridItem} onMouseEnter={() => setHoveredIndex(index)} onMouseLeave={() => setHoveredIndex(null)}>
            <p className={styles.label}>{data.title}</p>
            <div
              className={styles.circle}
              style={{
                width: data.size,
                height: data.size,
                backgroundColor: circleColors[index % circleColors.length],
              }}
            ></div>
          </div>
        ))}
      </div>
      <div className={styles.sidePanel}>{hoveredIndex !== null && <SidebarAnimation animation={dataFixture[hoveredIndex].animation} />}</div>
    </div>
  );
};

export default function ProgressPage() {
  return <GridOfData />;
}
