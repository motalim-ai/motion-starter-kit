import React from 'react';
import { AbsoluteFill, Html5Audio, Sequence, staticFile } from 'remotion';
import { cutBefore, line, toFrame } from './timing';
import { Scene1Hook } from './scenes/Scene1Hook';
import { Scene2Hero } from './scenes/Scene2Hero';
import { Scene3Specs } from './scenes/Scene3Specs';
import { Scene4Action } from './scenes/Scene4Action';
import { Scene5Price } from './scenes/Scene5Price';
import { Scene6CTA } from './scenes/Scene6CTA';
import { Scene7Packaging } from './scenes/Scene7Packaging';

type Scene = { id: string; from: number; to: number; C: React.FC<{ from: number }> };

const end = line('التوصيل سريع للدار').end + 1.8;

const SCENES: Scene[] = [
  { id: 'scene1', from: 0, to: cutBefore('جراب ضد الماء'), C: Scene1Hook },
  { id: 'scene2', from: cutBefore('جراب ضد الماء'), to: cutBefore('بلاستيك عالي'), C: Scene2Hero },
  { id: 'scene3', from: cutBefore('بلاستيك عالي'), to: cutBefore('صور وتلعب'), C: Scene3Specs },
  { id: 'scene4', from: cutBefore('صور وتلعب'), to: cutBefore('والسعر غير'), C: Scene4Action },
  { id: 'scene5', from: cutBefore('والسعر غير'), to: cutBefore('اطلب الآن'), C: Scene5Price },
  { id: 'scene6', from: cutBefore('اطلب الآن'), to: cutBefore('التوصيل سريع للدار'), C: Scene6CTA },
  { id: 'scene7', from: cutBefore('التوصيل سريع للدار'), to: end, C: Scene7Packaging },
];

export const Video: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: '#070A12' }}>
    {/* Background music (add your own audio file to public/ for sound) */}
    {/* <Html5Audio src={staticFile('music_beach_clean.mp3')} volume={0.12} /> */}

    {SCENES.map((s) => (
      <Sequence
        key={s.id}
        name={s.id}
        from={toFrame(s.from)}
        durationInFrames={Math.max(1, toFrame(s.to) - toFrame(s.from))}
        premountFor={30}
      >
        <s.C from={s.from} />
      </Sequence>
    ))}
  </AbsoluteFill>
);
