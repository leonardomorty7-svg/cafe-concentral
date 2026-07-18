import React from 'react';

/**
 * BeanIcon — la semilla dorada, el hilo conductor visual del sitio.
 * Vive en la apertura cinemática y en la cinta del proceso.
 */
const BeanIcon = ({ width = 44, height = 62 }) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 60 84"
    fill="none"
    aria-hidden="true"
    style={{ filter: 'drop-shadow(0 0 14px rgba(198,164,126,0.4))' }}
  >
    <ellipse cx="30" cy="42" rx="24" ry="36" stroke="#C6A47E" strokeWidth="2.5" fill="rgba(198,164,126,0.08)" />
    <path d="M30 8 C 16 28, 16 56, 30 76" stroke="#C6A47E" strokeWidth="2.5" fill="none" />
  </svg>
);

export default BeanIcon;
