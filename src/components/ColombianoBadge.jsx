import React from 'react';

const ColombianoBadge = ({ className = "" }) => (
  <div className={`hidden lg:block z-0 pointer-events-none ${className}`}>
    <svg
      viewBox="0 0 240 240"
      className="w-[190px] h-[190px] animate-spin-slow md:w-[210px] md:h-[210px]"
    >
      <defs>
        <path
          id="circlePath"
          d="M 120, 120
             m -95, 0
             a 95,95 0 1,1 190,0
             a 95,95 0 1,1 -190,0"
        />
      </defs>
      <text fontSize="13" letterSpacing="3.5" fill="#D1AA49" fontWeight="600" opacity="0.75">
        <textPath href="#circlePath">
          100% COLOMBIANO • 100% COLOMBIANO •
        </textPath>
      </text>
    </svg>
  </div>
);

export default ColombianoBadge;
