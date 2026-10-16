import React from 'react';
import { Composition } from 'remotion';
import { Video } from './Video';
import { VIDEO } from './config';
import { DURATION_FRAMES } from './timing';

export const Root: React.FC = () => (
  <Composition
    id="Main"
    component={Video}
    durationInFrames={DURATION_FRAMES}
    fps={VIDEO.fps}
    width={VIDEO.width}
    height={VIDEO.height}
  />
);
