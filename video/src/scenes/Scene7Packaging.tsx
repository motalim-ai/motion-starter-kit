import React from 'react';
import { Easing, Html5Audio, Img, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cairo';
import { line, prog, toFrame, toSec } from '../timing';
import { ACCENT_GOLD, ACCENT_ORANGE, CARD_BG, ProductBackground, TEXT_WHITE } from '../look';

const { fontFamily } = loadFont('normal', { weights: ['700', '900'], subsets: ['arabic', 'latin'] });

export const Scene7Packaging: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const t = from + toSec(frame);
  const l = line('منتج أصلي ومضمون');

  const boxIn = prog(t, l.start, l.start + 0.5, Easing.out(Easing.back(1.5)));
  const textIn = prog(t, l.start + 0.4, l.start + 0.8, Easing.out(Easing.cubic));
  const sealIn = prog(t, l.start + 0.9, l.start + 1.2, Easing.out(Easing.back(1.4)));

  const rotate = Math.sin(t * 2) * 3;
  const floatY = Math.sin(t * 2.5) * 8;

  const at = (s: number) => Math.max(0, toFrame(s) - toFrame(from));

  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily }}>
      <ProductBackground accentColor={ACCENT_GOLD} />

      <Sequence from={at(l.start)} durationInFrames={25}>
        <Html5Audio src={staticFile('sfx/shimmer.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={at(l.start + 0.9)} durationInFrames={20}>
        <Html5Audio src={staticFile('sfx/pop.wav')} volume={0.6} />
      </Sequence>

      <div
        dir="rtl"
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 50px',
          gap: 50,
        }}
      >
        {/* Top Badge */}
        <div
          style={{
            background: 'linear-gradient(90deg, #FFB703, #FF8C00)',
            padding: '10px 32px',
            borderRadius: 50,
            color: '#000',
            fontSize: 26,
            fontWeight: 700,
            transform: `scale(${boxIn})`,
            boxShadow: '0 6px 20px rgba(255,183,3,0.4)',
          }}
        >
          ✨ جودة عالية ✨
        </div>

        {/* Product Box */}
        <div style={{ position: 'relative', width: 500, height: 500 }}>
          {/* Glow behind box */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,183,3,0.3) 0%, transparent 70%)',
              filter: 'blur(40px)',
            }}
          />

          {/* Box Image */}
          <Img
            src={staticFile('product.jpg')}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 28,
              transform: `scale(${boxIn}) rotate(${rotate}deg) translateY(${floatY}px)`,
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))',
              border: '4px solid rgba(255,183,3,0.3)',
            }}
          />

          {/* Seal */}
          <div
            style={{
              position: 'absolute',
              bottom: -20,
              right: -20,
              width: 120,
              height: 120,
              background: 'linear-gradient(135deg, #E63946, #D90429)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `scale(${sealIn}) rotate(15deg)`,
              boxShadow: '0 8px 25px rgba(230,57,70,0.5)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40 }}>✓</div>
              <div style={{ fontSize: 18, fontWeight: 900, color: '#FFF' }}>أصلي</div>
            </div>
          </div>
        </div>

        {/* Text */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 900,
            color: TEXT_WHITE,
            textAlign: 'center',
            lineHeight: 1.3,
            opacity: textIn,
            transform: `translateY(${(1 - textIn) * 30}px)`,
          }}
        >
          منتج أصلي ومضمون
          <br />
          <span style={{ fontSize: 32, color: ACCENT_GOLD, fontWeight: 700 }}>
            ضمان الجودة 100%
          </span>
        </div>
      </div>
    </div>
  );
};
