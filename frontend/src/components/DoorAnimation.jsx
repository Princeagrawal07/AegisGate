import React from 'react';

const DoorAnimation = ({ isOpen, isError }) => {
  return (
    <div className={`door-frame-3d ${isOpen ? 'open' : ''} ${isError ? 'error' : ''}`}>
      {/* Yellow light spill polygon */}
      <div className="light-beam-3d" />

      {/* Waving Cartoon Character */}
      <div className="character-3d">
        <svg viewBox="0 0 120 200" className="character-svg">
          {/* Head & Face */}
          <circle cx="60" cy="55" r="15" fill="#fdd835" /> {/* Yellow skin tone cartoon */}
          <circle cx="60" cy="55" r="15" fill="#ffe082" /> {/* Lighter skin face overlay */}
          
          {/* Hair */}
          <path d="M 45 52 L 45 42 L 53 34 L 62 38 L 71 34 L 75 42 L 75 52 Z" fill="#263238" />
          <path d="M 45 42 C 45 36, 52 30, 60 30 C 68 30, 75 36, 75 42 Z" fill="#263238" /> {/* Hair top */}

          {/* Eyes (Cute cartoon dots) */}
          <circle cx="55" cy="53" r="2" fill="#263238" />
          <circle cx="65" cy="53" r="2" fill="#263238" />
          
          {/* Mouth (Big cartoon laugh) */}
          <path d="M 52 60 Q 60 70 68 60 Z" fill="#c62828" />
          <path d="M 55 64 Q 60 67 65 64" stroke="#ffffff" strokeWidth="1.5" fill="none" /> {/* Teeth */}

          {/* Neck */}
          <rect x="57" y="68" width="6" height="8" fill="#ffe082" />

          {/* Collar & Tie */}
          <path d="M 52 74 L 68 74 L 60 84 Z" fill="#ffffff" />
          <path d="M 59 84 L 61 84 L 63 105 L 60 110 L 57 105 Z" fill="#006064" /> {/* Dark teal tie */}

          {/* Businessman Suit Jacket */}
          <path d="M 42 74 L 78 74 L 70 140 L 50 140 Z" fill="#37474f" /> {/* Suit body */}

          {/* Left Arm (Resting on hip / waving) */}
          <path d="M 42 74 Q 30 95 38 108" stroke="#37474f" strokeWidth="8" strokeLinecap="round" fill="none" />
          <circle cx="38" cy="111" r="4.5" fill="#ffe082" />

          {/* Right Arm (Waving!) */}
          <g className="waving-arm-group">
            {/* Upper arm swinging */}
            <path d="M 78 74 L 94 92" stroke="#37474f" strokeWidth="8" strokeLinecap="round" fill="none" />
            <circle cx="94" cy="92" r="4.5" fill="#ffe082" />
            {/* Waving hand shape */}
            <path d="M 94 92 Q 104 88 100 80" stroke="#ffe082" strokeWidth="5" strokeLinecap="round" fill="none" />
          </g>

          {/* Pants */}
          <rect x="50" y="140" width="8" height="42" fill="#212121" />
          <rect x="62" y="140" width="8" height="42" fill="#212121" />

          {/* Shoes */}
          <path d="M 45 182 L 58 182 L 56 188 L 46 188 Z" fill="#111111" />
          <path d="M 62 182 L 75 182 L 73 188 L 63 188 Z" fill="#111111" />
        </svg>
      </div>

      {/* 3D Hinged Door Panel */}
      <div className="door-3d">
        <div className="door-panels-grid">
          <div className="door-inset" />
          <div className="door-inset" />
          <div className="door-inset" />
          <div className="door-inset" />
        </div>
        <div className="door-handle" />
      </div>
    </div>
  );
};

export default DoorAnimation;
