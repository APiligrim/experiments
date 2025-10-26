import React, { ReactNode } from 'react';

interface LinedGraphBackgroundProps {
  children: ReactNode;
  gridSize?: number;
  lineColor?: string;
  lineWidth?: number;
  style?: React.CSSProperties;
}

const DEFAULT_GRID_SIZE = 20;
const DEFAULT_LINE_COLOR = '#e0e0e0';
const DEFAULT_LINE_WIDTH = 1;

export const LinedGraphBackground: React.FC<LinedGraphBackgroundProps> = ({
  children,
  gridSize = DEFAULT_GRID_SIZE,
  lineColor = DEFAULT_LINE_COLOR,
  lineWidth = DEFAULT_LINE_WIDTH,
  style = {},
}) => {
  const patternId = 'lined-graph-bg-pattern';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        ...style,
      }}
    >
      <svg
        width="100%"
        height="100%"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          pointerEvents: 'none',
        }}
      >
        <defs>
          <pattern id={patternId} width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
            <path d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} fill="none" stroke={lineColor} strokeWidth={lineWidth} />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />
      </svg>
      <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
    </div>
  );
};
