import React from 'react';
import { Easing, Html5Audio, Img, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cairo';
import { line, prog, toFrame, toSec } from '../timing';
import { ACCENT_BLUE, ACCENT_GOLD, ACCENT_ORANGE, CARD_BG, ProductBackground, TEXT_WHITE } from '../look';

const { fontFamily } = loadFont('normal', { weights: ['700', '900'], subsets: ['arabic', 'latin'] });

export const Scene4Action: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const t = from + toSec(frame);
  const l = line('تصور');

  const in1 = prog(t, l.start, l.start + 0.35, Easing.out(Easing.back(1.5)));
  const in2 = prog(t, l.start + 0.9, l.start + 1.25, Easing.out(Easing.back(1.5)));
  const in3 = prog(t, l.start + 1.8, l.start + 2.15, Easing.out(Easing.back(1.5)));

  // Continuous subtle pulsing zoom
  const pulse = 1 + Math.sin(frame * 0.1) * 0.04;
  const at = (s: number) => Math.max(0, toFrame(s) - toFrame(from));

  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily }}>
      <ProductBackground accentColor="#0077B6" />

      <Sequence from={at(l.start)} durationInFrames={20}>
        <Html5Audio src={staticFile('sfx/whoosh.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={at(l.start + 0.9)} durationInFrames={20}>
        <Html5Audio src={staticFile('sfx/blip.wav')} volume={0.55} />
      </Sequence>
      <Sequence from={at(l.start + 1.8)} durationInFrames={25}>
        <Html5Audio src={staticFile('sfx/hit.wav')} volume={0.6} />
      </Sequence>

      <div
        dir="rtl"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '100px 50px 100px',
        }}
      >
        {/* Title */}
        <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ fontSize: 72, fontWeight: 900, color: TEXT_WHITE }}>
            عيش الصيف <span style={{ color: ACCENT_ORANGE }}>براحتك!</span>
          </div>
          <div style={{ fontSize: 34, color: ACCENT_BLUE, fontWeight: 700 }}>
            بلا خوف وبلا وسواس 🌊
          </div>
        </div>

        {/* Center: Glowing product */}
        <div style={{ position: 'relative', height: 750, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Img
            src={staticFile('product_transparent.png')}
            style={{
              maxHeight: 700,
              objectFit: 'contain',
              transform: `scale(${pulse})`,
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.85)) drop-shadow(0 0 35px rgba(0,180,216,0.5))',
            }}
          />
        </div>

        {/* 3 Action Badges */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 20 }}>
          <div
            style={{
              background: 'linear-gradient(90deg, rgba(255,107,0,0.9), rgba(255,140,0,0.8))',
              borderRadius: 20,
              padding: '16px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              transform: `scale(${in1})`,
              boxShadow: '0 8px 25px rgba(255,107,0,0.4)',
            }}
          >
            <span style={{ fontSize: 40 }}>📸</span>
            <span style={{ fontSize: 36, fontWeight: 900, color: '#FFF' }}>تصوّر تحت الما بدقة فائقة</span>
          </div>

          <div
            style={{
              background: 'linear-gradient(90deg, rgba(0,180,216,0.9), rgba(0,119,182,0.8))',
              borderRadius: 20,
              padding: '16px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              transform: `scale(${in2})`,
              boxShadow: '0 8px 25px rgba(0,180,216,0.4)',
            }}
          >
            <span style={{ fontSize: 40 }}>📱</span>
            <span style={{ fontSize: 36, fontWeight: 900, color: '#FFF' }}>اللمس يخدم عادي 100%</span>
          </div>

          <div
            style={{
              background: 'linear-gradient(90deg, rgba(255,183,3,0.95), rgba(251,133,0,0.9))',
              borderRadius: 20,
              padding: '16px 30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              transform: `scale(${in3})`,
              boxShadow: '0 8px 25px rgba(255,183,3,0.4)',
            }}
          >
            <span style={{ fontSize: 40 }}>🏖️</span>
            <span style={{ fontSize: 36, fontWeight: 900, color: '#000' }}>خفيف الوزن وما تحسش بيه كامل</span>
          </div>
        </div>
      </div>
    </div>
  );
};
