import React from 'react';
import { Easing, Html5Audio, Img, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cairo';
import { line, prog, toFrame, toSec } from '../timing';
import { ACCENT_BLUE, ACCENT_GOLD, ACCENT_ORANGE, CARD_BG, ProductBackground, TEXT_MUTED, TEXT_WHITE } from '../look';

const { fontFamily } = loadFont('normal', { weights: ['700', '900'], subsets: ['arabic', 'latin'] });

export const Scene2Hero: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const t = from + toSec(frame);
  const l = line('جبنالك جراب');

  const enter = prog(t, l.start, l.start + 0.5, Easing.out(Easing.back(1.4)));
  const prodEnter = prog(t, l.start + 0.2, l.start + 0.8, Easing.out(Easing.cubic));
  const tag1In = prog(t, l.start + 0.7, l.start + 1.1, Easing.out(Easing.back(1.5)));
  const tag2In = prog(t, l.start + 1.1, l.start + 1.5, Easing.out(Easing.back(1.5)));

  // 3D floating and subtle rotation of product
  const floatY = Math.sin((t - l.start) * 2.5) * 25;
  const rotateDeg = Math.sin((t - l.start) * 1.5) * 4;

  const at = (s: number) => Math.max(0, toFrame(s) - toFrame(from));

  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily }}>
      <ProductBackground accentColor={ACCENT_BLUE} />

      <Sequence from={at(l.start)} durationInFrames={25}>
        <Html5Audio src={staticFile('sfx/impact.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={at(l.start + 0.7)} durationInFrames={20}>
        <Html5Audio src={staticFile('sfx/blip.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={at(l.start + 1.1)} durationInFrames={20}>
        <Html5Audio src={staticFile('sfx/pop.wav')} volume={0.5} />
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
          padding: '100px 50px 120px',
        }}
      >
        {/* Top Titles */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              background: 'linear-gradient(90deg, #00B4D8, #0077B6)',
              padding: '10px 32px',
              borderRadius: 50,
              color: '#FFF',
              fontSize: 28,
              fontWeight: 700,
              boxShadow: '0 8px 25px rgba(0,180,216,0.4)',
              transform: `scale(${enter})`,
            }}
          >
            الحل الذكي والنهائي ⚡
          </div>
          <div
            style={{
              fontSize: 72,
              fontWeight: 900,
              color: TEXT_WHITE,
              textAlign: 'center',
              lineHeight: 1.25,
              opacity: enter,
              textShadow: '0 8px 30px rgba(0,0,0,0.8)',
            }}
          >
            جراب ضد الماء الأصلي
          </div>
          <div style={{ fontSize: 36, color: ACCENT_GOLD, fontWeight: 700, opacity: enter }}>
            ★ جودة عالية ومضمونة 100% ★
          </div>
        </div>

        {/* Center: Hero Product with floating tags */}
        <div style={{ position: 'relative', width: '100%', height: 900, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {/* Neon Glow behind product */}
          <div
            style={{
              position: 'absolute',
              width: 500,
              height: 500,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(0,180,216,0.45) 0%, rgba(255,107,0,0.2) 60%, transparent)',
              filter: 'blur(60px)',
            }}
          />

          {/* Product Image */}
          <Img
            src={staticFile('product_transparent.png')}
            style={{
              maxHeight: 820,
              maxWidth: 750,
              objectFit: 'contain',
              transform: `scale(${prodEnter}) translateY(${floatY}px) rotate(${rotateDeg}deg)`,
              filter: 'drop-shadow(0 25px 45px rgba(0,0,0,0.9)) drop-shadow(0 0 25px rgba(0,180,216,0.4))',
            }}
          />

          {/* Floating Tag 1 (Waterproof) */}
          <div
            style={{
              position: 'absolute',
              right: 30,
              top: '25%',
              background: CARD_BG,
              border: `2px solid ${ACCENT_BLUE}`,
              borderRadius: 24,
              padding: '16px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transform: `scale(${tag1In})`,
              boxShadow: '0 10px 30px rgba(0,180,216,0.3)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <span style={{ fontSize: 38 }}>💧</span>
            <span style={{ color: TEXT_WHITE, fontSize: 32, fontWeight: 700 }}>ضد الماء 100%</span>
          </div>

          {/* Floating Tag 2 (Universal Fit) */}
          <div
            style={{
              position: 'absolute',
              left: 30,
              bottom: '25%',
              background: CARD_BG,
              border: `2px solid ${ACCENT_ORANGE}`,
              borderRadius: 24,
              padding: '16px 28px',
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              transform: `scale(${tag2In})`,
              boxShadow: '0 10px 30px rgba(255,107,0,0.3)',
              backdropFilter: 'blur(16px)',
            }}
          >
            <span style={{ fontSize: 38 }}>📱</span>
            <span style={{ color: TEXT_WHITE, fontSize: 32, fontWeight: 700 }}>لكل الهواتف</span>
          </div>
        </div>

        {/* Bottom Banner */}
        <div
          style={{
            background: 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: 20,
            padding: '14px 40px',
            color: TEXT_WHITE,
            fontSize: 28,
            fontWeight: 700,
            opacity: enter,
          }}
        >
          حماية كاملة داخل وخارج الماء 🌊
        </div>
      </div>
    </div>
  );
};
