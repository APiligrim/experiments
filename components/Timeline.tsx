import React from 'react';

export interface TimelineItem {
  title: string;
  description: string;
  dataPoint?: string;
}

export interface TimelineProps {
  items: TimelineItem[];
  className?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ items, className }) => {
  return (
    <div>
      <span
        style={{
          display: 'inline-block',
          width: 20,
          height: 20,
          marginRight: 8,
          verticalAlign: 'middle',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 50 50" style={{ display: 'block' }}>
          <circle cx="25" cy="25" r="20" fill="none" stroke="#888" strokeWidth="5" opacity="0.2" />
          <circle
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke="#888"
            strokeWidth="5"
            strokeDasharray="90 60"
            strokeDashoffset="0"
            style={{
              transformOrigin: 'center',
              animation: 'spin 1s linear infinite',
            }}
          />
          <style>{`
            @keyframes spin {
              100% { transform: rotate(360deg); }
            }
          `}</style>
        </svg>
      </span>
      <p style={{ display: 'inline-block', verticalAlign: 'middle' }}>
        <strong>Current Step:</strong> Analyzing Records for the Final Report
      </p>
      <div style={{ margin: '8px 0 20px 28px', color: '#888', fontSize: 14 }}>
        Estimated waiting time: <strong>20 minutes</strong>
        <br />
        Progress: <strong>4 out of 5 steps completed</strong>
      </div>

      <div className={className} style={{ position: 'relative', paddingLeft: 24 }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', marginBottom: 32, position: 'relative' }}>
            {/* Circle */}
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: '#888',
                position: 'absolute',
                left: -21,
                top: 4,
              }}
            />
            {/* Line connecting circles */}
            {idx < items.length - 1 && (
              <div
                style={{
                  position: 'absolute',
                  left: -18,
                  top: 12,
                  width: 0,
                  height: 99,
                  borderLeft: '2px solid #e0e0e0',
                  zIndex: 0,
                }}
              />
            )}
            <div>
              <div style={{ fontWeight: 600, fontSize: 16, marginBottom: 4 }}>{item.title}</div>
              <div style={{ color: '#666', fontSize: 14, maxWidth: '460px', marginBottom: 6 }}>{item.description}</div>
              {item.dataPoint && (
                <div style={{ color: '#888', fontSize: 12, fontStyle: 'italic', background: '#f5f5f5', padding: '4px 8px', borderRadius: '4px', display: 'inline-block' }}>
                  {item.dataPoint}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button style={{ background: 'black', color: 'white', padding: '8px 16px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>Preview Document</button>
    </div>
  );
};
