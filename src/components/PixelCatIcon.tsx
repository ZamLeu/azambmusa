import React from 'react';

export const PixelCatIcon: React.FC<{ size?: number; className?: string }> = ({ size = 28, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      shapeRendering="crispEdges"
      className={`pixel-crisp ${className}`}
      fill="currentColor"
    >
      {/* Ears */}
      <rect x="2" y="2" width="3" height="3" />
      <rect x="11" y="2" width="3" height="3" />
      {/* Inner Ear / Head top */}
      <rect x="4" y="4" width="8" height="2" />
      {/* Head Main Block */}
      <rect x="2" y="5" width="12" height="6" />
      {/* Cheeks */}
      <rect x="1" y="7" width="14" height="4" />
      {/* Chin */}
      <rect x="4" y="11" width="8" height="2" />
      {/* Eyes (Negative space cutouts) */}
      <rect x="4" y="7" width="2" height="2" fill="#F4F4F2" />
      <rect x="10" y="7" width="2" height="2" fill="#F4F4F2" />
      {/* Nose */}
      <rect x="7" y="9" width="2" height="1" fill="#F4F4F2" />
      {/* Mouth */}
      <rect x="6" y="11" width="1" height="1" fill="#F4F4F2" />
      <rect x="9" y="11" width="1" height="1" fill="#F4F4F2" />
    </svg>
  );
};

