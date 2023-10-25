import React from 'react';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import animationData from '../images/landing-gears.json';

import '../styles/Landing.css';

export default function Landing() {

  return (
    <div className="landing-card mt-3">
      <h1>Welcome to Repair Shop</h1>
      <p>Sign in to get started!</p>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: '30vw', width: '30vw' }}
      >
        <Controls visible={false} buttons={['play', 'repeat', 'frame', 'debug']} />
      </Player>
    </div>
  );
}

