import React from 'react';
import { Easing, Html5Audio, Img, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cairo';
import { line, prog, toFrame, toSec } from '../timing';
import { ACCENT_BLUE, ACCENT_GOLD, ACCENT_ORANGE, CARD_BG, ProductBackground, TEXT_MUTED, TEXT_WHITE } from '../look';

const { fontFamily } = loadFont('normal', { weights: ['700', '900'], subsets: ['arabic', 'latin'] });

export const Scene6CTA: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const t = from + toSec(frame);
  const l = line('اطلب الآن');

  const logoIn = prog(t, l.start, l.start + 0.4, Easing.out(Easing.back(1.6)));
  const ctaIn = prog(t, l.start + 0.3, l.start + 0.7, Easing.out(Easing.back(1.4)));
  const delivIn = prog(t, l.start + 1.2, l.start + 1.6, Easing.out(Easing.cubic));
  const trustIn = prog(t, l.start + 2.2, l.start + 2.6, Easing.out(Easing.cubic));

  const at = (s: number) => Math.max(0, toFrame(s) - toFrame(from));
  const buttonPulse = 1 + Math.sin(frame * 0.15) * 0.04;

  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily }}>
      <ProductBackground accentColor="#FF6B00" />

      <Sequence from={at(l.start)} durationInFrames={20}>
        <Html5Audio src={staticFile('sfx/whoosh.wav')} volume={0.6} />
      </Sequence>
      <Sequence from={at(l.start + 0.5)} durationInFrames={25}>
        <Html5Audio src={staticFile('sfx/hit.wav')} volume={0.65} />
      </Sequence>
      <Sequence from={at(l.start + 1.5)} durationInFrames={20}>
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
          padding: '110px 50px 100px',
        }}
      >
        {/* Brand Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            transform: `scale(${logoIn})`,
            opacity: logoIn,
          }}
        >
          <Img
            src={staticFile('logo.png')}
            style={{
              width: 140,
              height: 140,
              borderRadius: '50%',
              border: `4px solid ${ACCENT_GOLD}`,
              boxShadow: '0 0 35px rgba(255,183,3,0.5)',
            }}
          />
          <div style={{ fontSize: 48, fontWeight: 900, color: ACCENT_GOLD, letterSpacing: 2 }}>
            BDN SHOP
          </div>
        </div>

        {/* Big Action Box */}
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 24,
            transform: `scale(${ctaIn})`,
          }}
        >
          {/* Main Pulsing CTA Button */}
          <div
            style={{
              width: '100%',
              background: 'linear-gradient(90deg, #FF6B00, #FF8800)',
              borderRadius: 32,
              padding: '30px 40px',
              textAlign: 'center',
              boxShadow: '0 15px 40px rgba(255,107,0,0.5)',
              transform: `scale(${buttonPulse})`,
            }}
          >
            <div style={{ fontSize: 58, fontWeight: 900, color: '#FFF' }}>
              اطلب الآن ⚡
            </div>
            <div style={{ fontSize: 32, fontWeight: 700, color: '#FFE5D9', marginTop: 6 }}>
              والدفع عند الاستلام يد بيد!
            </div>
          </div>
        </div>

        {/* Delivery & Trust Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%', gap: 18 }}>
          {/* Delivery */}
          <div
            style={{
              background: CARD_BG,
              border: `2px solid ${ACCENT_BLUE}`,
              borderRadius: 24,
              padding: '20px 30px',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              transform: `scale(${delivIn})`,
              opacity: delivIn,
              backdropFilter: 'blur(16px)',
            }}
          >
            <span style={{ fontSize: 46 }}>🚚</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 34, fontWeight: 900, color: '#FFF' }}>
                توصيل سريع لباب دارك
              </span>
              <span style={{ fontSize: 24, color: TEXT_MUTED }}>
                متوفر لكل 58 ولاية في الجزائر
              </span>
            </div>
          </div>

          {/* Guarantee */}
          <div
            style={{
              background: CARD_BG,
              border: `2px solid ${ACCENT_GOLD}`,
              borderRadius: 24,
              padding: '20px 30px',
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              transform: `scale(${trustIn})`,
              opacity: trustIn,
              backdropFilter: 'blur(16px)',
            }}
          >
            <span style={{ fontSize: 46 }}>🛡️</span>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: 34, fontWeight: 900, color: '#FFF' }}>
                ضمان الجودة 100%
              </span>
              <span style={{ fontSize: 24, color: TEXT_MUTED }}>
                تأكد من طلبك قبل الدفع
              </span>
            </div>
          </div>
        </div>

        {/* Footer instruction */}
        <div style={{ textAlign: 'center', color: '#CBD5E1', fontSize: 28, fontWeight: 700 }}>
          اضغط على الزر أسفل الفيديو أو أرسل رسالة في الخاص 📲
        </div>
      </div>
    </div>
  );
};
