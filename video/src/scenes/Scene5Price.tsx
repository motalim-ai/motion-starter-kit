import React from 'react';
import { Easing, Html5Audio, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cairo';
import { line, prog, toFrame, toSec } from '../timing';
import { ACCENT_GOLD, ACCENT_ORANGE, CARD_BG, ProductBackground, TEXT_WHITE } from '../look';

const { fontFamily } = loadFont('normal', { weights: ['700', '900'], subsets: ['arabic', 'latin'] });

export const Scene5Price: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const t = from + toSec(frame);
  const l = line('والسعر هبال');

  const titleIn = prog(t, l.start, l.start + 0.35, Easing.out(Easing.back(1.5)));
  const oldPriceIn = prog(t, l.start + 0.5, l.start + 0.85, Easing.out(Easing.cubic));
  const newPriceIn = prog(t, l.start + 1.2, l.start + 1.6, Easing.out(Easing.back(1.7)));
  const badgeIn = prog(t, l.start + 2.0, l.start + 2.35, Easing.out(Easing.back(1.4)));

  const at = (s: number) => Math.max(0, toFrame(s) - toFrame(from));

  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily }}>
      <ProductBackground accentColor={ACCENT_GOLD} />

      <Sequence from={at(l.start)} durationInFrames={20}>
        <Html5Audio src={staticFile('sfx/whoosh.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={at(l.start + 1.2)} durationInFrames={30}>
        <Html5Audio src={staticFile('sfx/impact.wav')} volume={0.8} />
      </Sequence>
      <Sequence from={at(l.start + 2.0)} durationInFrames={20}>
        <Html5Audio src={staticFile('sfx/pop.wav')} volume={0.55} />
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
          gap: 46,
        }}
      >
        {/* Urgent Promo Badge */}
        <div
          style={{
            background: 'linear-gradient(90deg, #E63946, #D90429)',
            color: '#FFF',
            padding: '12px 36px',
            borderRadius: 50,
            fontSize: 32,
            fontWeight: 900,
            letterSpacing: 1,
            boxShadow: '0 8px 30px rgba(230,57,70,0.5)',
            transform: `scale(${titleIn})`,
          }}
        >
          🔥 عرض الصيف الخاص 🔥
        </div>

        {/* Catchy headline */}
        <div
          style={{
            fontSize: 84,
            fontWeight: 900,
            color: TEXT_WHITE,
            textAlign: 'center',
            textShadow: '0 8px 30px rgba(0,0,0,0.9)',
            opacity: titleIn,
          }}
        >
          والسعر <span style={{ color: ACCENT_ORANGE }}>هبال!</span>
        </div>

        {/* Price Card Container */}
        <div
          style={{
            width: '100%',
            background: CARD_BG,
            border: `3px solid ${ACCENT_GOLD}`,
            borderRadius: 36,
            padding: '50px 40px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 28,
            boxShadow: '0 20px 60px rgba(255,183,3,0.3)',
            backdropFilter: 'blur(20px)',
          }}
        >
          {/* Old Price Strikethrough */}
          <div
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              opacity: oldPriceIn,
              transform: `scale(${oldPriceIn})`,
            }}
          >
            <span style={{ fontSize: 44, color: '#94A3B8', fontWeight: 700 }}>
              السعر السابق: 3500 دج
            </span>
            {/* Red Strike Line */}
            <div
              style={{
                position: 'absolute',
                left: -10,
                right: -10,
                height: 5,
                background: '#E63946',
                transform: 'rotate(-6deg)',
                boxShadow: '0 0 10px #E63946',
              }}
            />
          </div>

          {/* New Giant Price */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              transform: `scale(${newPriceIn})`,
              gap: 8,
            }}
          >
            <div
              style={{
                fontSize: 130,
                fontWeight: 900,
                color: ACCENT_GOLD,
                lineHeight: 1,
                textShadow: '0 0 35px rgba(255,183,3,0.6)',
              }}
            >
              2000 دج
            </div>
            <div style={{ fontSize: 36, color: '#FFF', fontWeight: 900 }}>
              (ألفين دينار فقط!)
            </div>
          </div>

          {/* Savings Badge */}
          <div
            style={{
              background: 'linear-gradient(90deg, #FF6B00, #FF8800)',
              color: '#FFF',
              padding: '10px 28px',
              borderRadius: 30,
              fontSize: 30,
              fontWeight: 900,
              transform: `scale(${badgeIn})`,
              boxShadow: '0 6px 20px rgba(255,107,0,0.4)',
            }}
          >
            وفّر 1500 دج واستمتع بالصيف 🏖️
          </div>
        </div>

        {/* Stock warning */}
        <div style={{ fontSize: 30, color: '#E2E8F0', fontWeight: 700, opacity: badgeIn }}>
          ⏳ الكمية محدودة جداً سارع بالطلب الآن!
        </div>
      </div>
    </div>
  );
};
