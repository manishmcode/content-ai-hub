import React from 'react';

export const VisaIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-auto' }) => (
  <svg className={className} viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M19.16 0.72L12.56 15.28H8.24L5.04 3.76C4.84 3.04 4.68 2.8 4.08 2.48C3.12 1.96 1.48 1.48 0 1.16L0.08 0.72H6.96C7.84 0.72 8.64 1.32 8.84 2.28L10.56 11.24L14.76 0.72H19.16ZM36.08 10.4C36.12 6.44 30.56 6.24 30.6 4.48C30.6 3.96 31.12 3.4 32.24 3.24C32.8 3.16 34.32 3.08 35.96 3.84L36.6 0.92C35.72 0.6 34.56 0.32 33.08 0.32C28.96 0.32 26.04 2.48 26.04 5.6C26 7.88 28.08 9.16 29.64 9.92C31.24 10.68 31.8 11.2 31.8 11.88C31.8 12.92 30.56 13.4 29.4 13.4C27.32 13.4 26.12 13.08 25.16 12.64L24.48 15.68C25.44 16.12 27.2 16.48 29.04 16.48C33.4 16.48 36.24 14.36 36.08 10.4ZM46.68 15.28H50.52L47.16 0.72H43.6C42.8 0.72 42.12 1.16 41.84 1.84L35.76 15.28H40.24L41.12 12.8H46.16L46.68 15.28ZM42.36 9.44L44.44 3.72L45.64 9.44H42.36ZM25.04 0.72L21.64 15.28H17.44L20.84 0.72H25.04Z"
      fill="#1434CB"
    />
  </svg>
);

export const MastercardIcon: React.FC<{ className?: string }> = ({ className = 'h-4 w-auto' }) => (
  <svg className={className} viewBox="0 0 36 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="11" fill="#EB001B" />
    <circle cx="25" cy="11" r="11" fill="#F79E1B" />
    <path
      d="M18 3.5C20.25 5.4 21.67 8.05 21.67 11C21.67 13.95 20.25 16.6 18 18.5C15.75 16.6 14.33 13.95 14.33 11C14.33 8.05 15.75 5.4 18 3.5Z"
      fill="#FF5F00"
    />
  </svg>
);

export const SepaIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-auto' }) => (
  <svg className={className} viewBox="0 0 48 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="SEPA">
    <text x="1" y="13" fill="#143D91" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="15">S</text>
    <text x="11" y="13" fill="#FFD500" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="15">€</text>
    <text x="22" y="13" fill="#143D91" fontFamily="Arial, Helvetica, sans-serif" fontWeight="900" fontSize="15" letterSpacing="-0.5">PA</text>
  </svg>
);

export const PaypalIcon: React.FC<{ className?: string }> = ({ className = 'h-3.5 w-auto' }) => (
  <svg className={className} viewBox="0 0 62 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Double P Icon */}
    <g transform="translate(0, 0)">
      <path
        d="M6.4 1.5H2C1.7 1.5 1.4 1.7 1.3 2L0 12.8C0 13 0.1 13.2 0.3 13.2H2.8C3 13.2 3.2 13 3.3 12.8L3.9 8.6C4 8.3 4.2 8.1 4.5 8.1H5.9C8.7 8.1 10.5 6.7 10.9 4C11.1 2.6 10.7 1.5 6.4 1.5Z"
        fill="#003087"
      />
      <path
        d="M8.5 4.5C8.3 5.9 7.1 7 5.3 7H4.4C4.2 7 4 7.2 3.9 7.4L3.2 11.8C3.1 12 3.3 12.2 3.5 12.2H5.3C5.5 12.2 5.7 12 5.8 11.8L6.2 9.2C6.3 9 6.5 8.8 6.7 8.8H7.3C9.4 8.8 11.1 7.9 11.5 5.8C11.7 4.7 11.3 3.8 10.2 3.4C9.6 4.2 9 4.4 8.5 4.5Z"
        fill="#0079C1"
      />
      <path
        d="M8 4.5C8 4.7 7.9 4.9 7.8 5.2C7.4 7.1 6.1 8.1 4.3 8.1H3.6C3.4 8.1 3.2 8.3 3.1 8.6L2.5 12.7C2.5 12.8 2.6 13 2.8 13H4.8C5 13 5.2 12.8 5.3 12.6L5.7 10C5.8 9.8 6 9.6 6.2 9.6H6.8C8.9 9.6 10.6 8.7 11 6.6C11.2 5.6 10.9 4.7 10.1 4.2C9.5 4.3 8.7 4.4 8 4.5Z"
        fill="#00457C"
      />
    </g>
    {/* Text "PayPal" */}
    <text
      x="14"
      y="12.5"
      fill="#003087"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="12.5"
      fontStyle="italic"
    >
      Pay
    </text>
    <text
      x="36"
      y="12.5"
      fill="#0079C1"
      fontFamily="system-ui, -apple-system, sans-serif"
      fontWeight="900"
      fontSize="12.5"
      fontStyle="italic"
    >
      Pal
    </text>
  </svg>
);
