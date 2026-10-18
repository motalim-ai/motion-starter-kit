import React from 'react';
import { Easing, Html5Audio, Img, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cairo';
import { line, prog, toFrame, toSec } from '../timing';
import { ACCENT_ORANGE, ACCENT_BLUE, CARD_BG, CARD_BORDER, ProductBackground, TEXT_MUTED, TEXT_WHITE } from '../look';

const { fontFamily } = loadFont('normal', { weights: ['700', '900'], subsets: ['arabic', 'latin'] });

export const Scene1Hook: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const t = from + toSec(frame);
  const l = line('راك رايح');

  const badgeIn = prog(t, l.start, l.start + 0.35, Easing.out(Easing.back(1.5)));
  const titleIn = prog(t, l.start + 0.3, l.start + 0.7, Easing.out(Easing.cubic));
  const cardIn = prog(t, l.start + 0.9, l.start + 1.4, Easing.out(Easing.back(1.2)));

  const shake = Math.sin(frame * 0.35) * 6;
  const at = (s: number) => Math.max(0, toFrame(s) - toFrame(from));

  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily }}>
      <ProductBackground accentColor="#E63946" />

      <Sequence from={at(l.start)} durationInFrames={20}>
        <Html5Audio src={staticFile('sfx/whoosh.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={at(l.start + 0.8)} durationInFrames={25}>
        <Html5Audio src={staticFile('sfx/impact.wav')} volume={0.5} />
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
          padding: '0 60px',
          gap: 40,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, opacity: badgeIn }}>
          <Img src={staticFile('logo.png')} style={{ width: 70, height: 70, borderRadius: '50%', border: '2px solid #FFB703' }} />
          <span style={{ color: '#FFB703', fontSize: 32, fontWeight: 700, letterSpacing: 1 }}>BDN SHOP</span>
        </div>

        <div
          style={{
            background: 'linear-gradient(90deg, #FF6B00, #FF8800)',
            padding: '12px 36px',
            borderRadius: 50,
            color: '#FFF',
            fontSize: 32,
            fontWeight: 700,
            boxShadow: '0 8px 30px rgba(255,107,0,0.5)',
            transform: `scale(${badgeIn})`,
          }}
        >
          صيف 2026 🏖️
        </div>

        <div
          style={{
            fontSize: 88,
            fontWeight: 900,
            color: TEXT_WHITE,
            textAlign: 'center',
            lineHeight: 1.25,
            opacity: titleIn,
            transform: `translateY(${(1 - titleIn) * 40}px)`,
            textShadow: '0 10px 40px rgba(0,0,0,0.8)',
          }}
        >
          راك رايح للبحر؟
        </div>

        <div
          style={{
            background: CARD_BG,
            border: `2px solid ${ACCENT_ORANGE}`,
            borderRadius: 32,
            padding: '40px 50px',
            maxWidth: 900,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 20,
            transform: `scale(${cardIn}) translateY(${shake}px)`,
            opacity: cardIn,
            boxShadow: '0 20px 60px rgba(255, 107, 0, 0.25)',
            backdropFilter: 'blur(20px)',
          }}
        >
          <div style={{ fontSize: 72 }}>⚠️</div>
          <div
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: '#FF6B00',
              textAlign: 'center',
              lineHeight: 1.3,
            }}
          >
            وتخاف على تليفونك يفسد في الما؟
          </div>
          <div style={{ fontSize: 32, color: TEXT_MUTED, textAlign: 'center' }}>
            ما تغامرش بتليفونك الغالي هذا الصيف!
          </div>
        </div>
      </div>
    </div>
  );
};
