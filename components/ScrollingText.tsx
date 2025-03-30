import { useEffect, useState } from 'react';

export default function ScrollingTextList() {
  const [scrollY, setScrollY] = useState(0);
  const loremTexts = Array(15)
    .fill(null)
    .map(
      (_, i) =>
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
    ${i + 1}`
    );

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
        position: 'relative',
        width: '100vw',
        height: '200vh',
        background: 'linear-gradient(135deg, #111, #333)',
        overflow: 'hidden',
      }}
    >
      {/* Paper-like container - now smaller and better positioned */}
      <div
        style={{
          transform: 'rotate(-10deg) skewX(-5deg)', // Reduced rotation and skew
          transformOrigin: 'center center',
          position: 'absolute',
          left: '50%',
          top: `${-20 - scrollY * 0.15}px`, // Slower scroll movement
          width: '50%', // Reduced width
          marginLeft: '-40%', // Centers the element
          padding: '20px 0', // Reduced padding
        }}
      >
        {/* Continuous paper background */}
        <div
          style={{
            background: 'linear-gradient(to right, #f9f9f9, #f0f0f0)',
            boxShadow: '0 0 20px rgba(0,0,0,0.2)', // Softer shadow
            padding: '40px 60px', // Reduced padding
            borderTop: '1px solid #ddd',
            borderBottom: '1px solid #ddd',
            position: 'relative',
            '::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '20px',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.1), transparent)',
            },
            '::after': {
              content: '""',
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '20px',
              background: 'linear-gradient(to top, rgba(0,0,0,0.1), transparent)',
            },
          }}
        >
          {/* Paper texture overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage:
                'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAABOSURBVGhD7cExAQAwDMCg+zfdm1gQ+JFNkCRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiRJkiTpB3UfBx+1wB4wAAAAAElFTkSuQmCC")',
              opacity: 0.08, // More subtle texture
              pointerEvents: 'none',
            }}
          />

          {/* Text content */}
          <div
            style={{
              color: '#333',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '1rem', // Slightly smaller font
              lineHeight: '1.6', // Tighter line height
              position: 'relative',
              zIndex: 1,
            }}
          >
            {loremTexts.map((text, index) => (
              <div
                key={index}
                style={{
                  marginBottom: '30px', // Reduced spacing
                  position: 'relative',
                  paddingLeft: '15px', // Smaller indent
                  '::before': {
                    content: '"¶"',
                    position: 'absolute',
                    left: 0,
                    color: '#999',
                    fontSize: '0.7rem', // Smaller paragraph marker
                  },
                }}
              >
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
