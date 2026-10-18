import React from 'react';
import { interpolate, useCurrentFrame, useVideoConfig } from 'remotion';

export const BG_DARK = '#070A12';
export const ACCENT_ORANGE = '#FF6B00';
export const ACCENT_GOLD = '#FFB703';
export const ACCENT_BLUE = '#00B4D8';
export const TEXT_WHITE = '#FFFFFF';
export const TEXT_MUTED = '#94A3B8';
export const CARD_BG = 'rgba(15, 23, 42, 0.75)';
export const CARD_BORDER = 'rgba(255, 255, 255, 0.12)';

export const ProductBackground: React.FC<{ accentColor?: string }> = ({ accentColor = ACCENT_ORANGE }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;

  // Slow pulsing ambient lighting
  const pulse1 = Math.sin(t * 2) * 0.15 + 0.35;
  const pulse2 = Math.cos(t * 1.5) * 0.15 + 0.3;
  const moveY = Math.sin(t * 1.2) * 40;

  return (
    <div style={{ position: 'absolute', inset: 0, backgroundColor: BG_DARK, overflow: 'hidden' }}>
      {/* Radial ambient lighting */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          width: 800,
          height: 800,
          transform: `translate(-50%, -50%) translateY(${moveY}px)`,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor} 0%, rgba(0, 180, 216, 0.15) 50%, transparent 70%)`,
          opacity: pulse1,
          filter: 'blur(90px)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          bottom: '10%',
          left: '50%',
          width: 600,
          height: 600,
          transform: 'translate(-50%, 0)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(0, 180, 216, 0.4) 0%, transparent 70%)',
          opacity: pulse2,
          filter: 'blur(80px)',
          pointerEvents: 'none',
        }}
      />

      {/* Cyber/modern grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Floating water/energy bubbles */}
      {[...Array(6)].map((_, i) => {
        const speed = 0.8 + i * 0.3;
        const y = 1920 - ((frame * speed * 3 + i * 350) % 2100);
        const x = 120 + i * 160 + Math.sin(t * 2 + i) * 30;
        const size = 16 + (i % 3) * 12;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              top: y,
              left: x,
              width: size,
              height: size,
              borderRadius: '50%',
              background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(0,180,216,0.3) 60%, transparent)',
              boxShadow: '0 0 12px rgba(0,180,216,0.5)',
              opacity: 0.6,
            }}
          />
        );
      })}

      {/* Vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at center, transparent 55%, rgba(0,0,0,0.8) 100%)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
};
