import React from 'react';
import { Easing, Html5Audio, Img, Sequence, staticFile, useCurrentFrame } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Cairo';
import { line, prog, toFrame, toSec } from '../timing';
import { ACCENT_GOLD, ACCENT_ORANGE, CARD_BG, ProductBackground, TEXT_MUTED, TEXT_WHITE } from '../look';

const { fontFamily } = loadFont('normal', { weights: ['700', '900'], subsets: ['arabic', 'latin'] });

export const Scene3Specs: React.FC<{ from: number }> = ({ from }) => {
  const frame = useCurrentFrame();
  const t = from + toSec(frame);
  const l = line('مخدوم ببلاستيك');

  const headIn = prog(t, l.start, l.start + 0.4, Easing.out(Easing.cubic));
  const card1In = prog(t, l.start + 0.3, l.start + 0.7, Easing.out(Easing.back(1.3)));
  const card2In = prog(t, l.start + 1.2, l.start + 1.6, Easing.out(Easing.back(1.3)));
  const card3In = prog(t, l.start + 2.2, l.start + 2.6, Easing.out(Easing.back(1.3)));

  const at = (s: number) => Math.max(0, toFrame(s) - toFrame(from));

  return (
    <div style={{ position: 'absolute', inset: 0, fontFamily }}>
      <ProductBackground accentColor={ACCENT_ORANGE} />

      <Sequence from={at(l.start + 0.3)} durationInFrames={18}>
        <Html5Audio src={staticFile('sfx/tick.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={at(l.start + 1.2)} durationInFrames={18}>
        <Html5Audio src={staticFile('sfx/tick.wav')} volume={0.5} />
      </Sequence>
      <Sequence from={at(l.start + 2.2)} durationInFrames={18}>
        <Html5Audio src={staticFile('sfx/tick.wav')} volume={0.5} />
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
          padding: '80px 50px',
          gap: 36,
        }}
      >
        {/* Section Title */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: headIn }}>
          <div
            style={{
              background: 'rgba(255, 107, 0, 0.15)',
              border: `2px solid ${ACCENT_ORANGE}`,
              padding: '8px 28px',
              borderRadius: 30,
              color: ACCENT_ORANGE,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            مواصفات تقنية عالية
          </div>
          <div style={{ fontSize: 64, fontWeight: 900, color: TEXT_WHITE, textAlign: 'center' }}>
            مصنوع ليتحمل أقسى الظروف
          </div>
        </div>

        {/* Spec 1: PPU Plastic */}
        <div
          style={{
            width: '100%',
            background: CARD_BG,
            border: '2px solid rgba(255,107,0,0.5)',
            borderRadius: 28,
            padding: '28px 36px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            transform: `scale(${card1In}) translateX(${(1 - card1In) * -50}px)`,
            opacity: card1In,
            boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ fontSize: 64, background: 'rgba(255,107,0,0.2)', padding: 18, borderRadius: 20 }}>🛡️</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            <div style={{ fontSize: 40, fontWeight: 900, color: '#FFB703' }}>بلاستيك PPU ممتاز</div>
            <div style={{ fontSize: 26, color: TEXT_MUTED, lineHeight: 1.3 }}>
              مادة مرنة بزاف ومقاومة للتمزق ولحرارة الشمس العالية
            </div>
          </div>
        </div>

        {/* Spec 2: Dust & Sand Proof */}
        <div
          style={{
            width: '100%',
            background: CARD_BG,
            border: '2px solid rgba(0,180,216,0.5)',
            borderRadius: 28,
            padding: '28px 36px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            transform: `scale(${card2In}) translateX(${(1 - card2In) * 50}px)`,
            opacity: card2In,
            boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ fontSize: 64, background: 'rgba(0,180,216,0.2)', padding: 18, borderRadius: 20 }}>🏖️</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            <div style={{ fontSize: 40, fontWeight: 900, color: '#00B4D8' }}>مقاوم للغبار والرمل</div>
            <div style={{ fontSize: 26, color: TEXT_MUTED, lineHeight: 1.3 }}>
              يحميك حتى في الصحراء ولا بلايص فيها الرملة بزاف
            </div>
          </div>
        </div>

        {/* Spec 3: Heavy Duty Lanyard */}
        <div
          style={{
            width: '100%',
            background: CARD_BG,
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: 28,
            padding: '28px 36px',
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            transform: `scale(${card3In}) translateX(${(1 - card3In) * -50}px)`,
            opacity: card3In,
            boxShadow: '0 12px 35px rgba(0,0,0,0.5)',
            backdropFilter: 'blur(16px)',
          }}
        >
          <div style={{ fontSize: 64, background: 'rgba(255,255,255,0.1)', padding: 18, borderRadius: 20 }}>🪢</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 6, flex: 1 }}>
            <div style={{ fontSize: 40, fontWeight: 900, color: TEXT_WHITE }}>حبل رقبة متين</div>
            <div style={{ fontSize: 26, color: TEXT_MUTED, lineHeight: 1.3 }}>
              خيط صحيح وغير قابل للقطع، قابل للتعديل باش يثبت في رقبتك مليح
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
