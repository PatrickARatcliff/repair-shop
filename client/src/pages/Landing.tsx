import React from 'react';
import Lottie from 'react-lottie';
import animationData from '../images/landing-gears.json';
import '../styles/Landing.css';

export default function Landing() {
  // Configure Lottie options
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
  };

  return (
    <div className="landing-card mt-3">
      <h1>Welcome to Repair Shop</h1>
      <p>Sign in to get started!</p>
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}

