import React from 'react';

interface ZMBadgeIconProps {
  size?: number;
  className?: string;
}

export const ZMBadgeIcon: React.FC<ZMBadgeIconProps> = ({ size = 24, className = '' }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      shapeRendering="crispEdges"
    >
      {/* Outer Retro Chassis Frame */}
      <rect x="1" y="1" width="30" height="30" fill="currentColor" fillOpacity="0.08" stroke="currentColor" strokeWidth="2" />

      {/* Amber Phosphor Active Hardware LED */}
      <rect x="25" y="4" width="3" height="3" fill="#F59E0B" />

      {/* ============================================================== */}
      {/* LETTER 'Z' (Pixel Art Typography) */}
      {/* ============================================================== */}
      {/* Top Bar */}
      <rect x="6" y="9" width="9" height="2.5" fill="currentColor" />
      {/* Diagonal Steps */}
      <rect x="11.5" y="11.5" width="3.5" height="2.5" fill="currentColor" />
      <rect x="8.5" y="14" width="3.5" height="2.5" fill="currentColor" />
      <rect x="6" y="16.5" width="3.5" height="2.5" fill="currentColor" />
      {/* Bottom Bar */}
      <rect x="6" y="19" width="9" height="2.5" fill="currentColor" />

      {/* ============================================================== */}
      {/* LETTER 'M' (Pixel Art Typography) */}
      {/* ============================================================== */}
      {/* Left Vertical Pillar */}
      <rect x="17" y="9" width="2.5" height="12.5" fill="currentColor" />
      {/* Left Inner Angle */}
      <rect x="19.5" y="11.5" width="2" height="3" fill="currentColor" />
      {/* Center V-Dip */}
      <rect x="21" y="14" width="2" height="3" fill="currentColor" />
      {/* Right Inner Angle */}
      <rect x="22.5" y="11.5" width="2" height="3" fill="currentColor" />
      {/* Right Vertical Pillar */}
      <rect x="24.5" y="9" width="2.5" height="12.5" fill="currentColor" />
    </svg>
  );
};
