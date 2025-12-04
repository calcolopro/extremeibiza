'use client';

interface LogoProps {
  variant?: 'horizontal' | 'icon';
  className?: string;
}

export default function Logo({ variant = 'horizontal', className = '' }: LogoProps) {
  if (variant === 'icon') {
    return (
      <svg 
        viewBox="0 0 60 80" 
        className={className}
        fill="none"
      >
        {/* X shape */}
        <path 
          d="M12 10 L30 35 L48 10 L42 10 L30 27 L18 10 Z" 
          fill="#00B4D8"
        />
        <path 
          d="M12 50 L30 25 L48 50 L42 50 L30 33 L18 50 Z" 
          fill="#00B4D8"
        />
        {/* Gecko on X */}
        <g transform="translate(38, 8)">
          <path 
            d="M8 0 C4 0 2 2 2 4 C2 5 3 6 3 6 L1 10 L3 12 L1 16 L4 18 L6 16 L8 18 L10 16 L12 18 L15 16 L13 12 L15 10 L13 6 C13 6 14 5 14 4 C14 2 12 0 8 0 Z" 
            fill="#00B4D8"
          />
          <circle cx="6" cy="3" r="1" fill="#0a0a0a"/>
          <circle cx="10" cy="3" r="1" fill="#0a0a0a"/>
        </g>
        {/* IBIZA text */}
        <text 
          x="30" 
          y="72" 
          textAnchor="middle" 
          fill="#00B4D8" 
          fontSize="14" 
          fontFamily="var(--font-bebas)"
          fontStyle="italic"
          letterSpacing="0.1em"
        >
          IBIZA
        </text>
      </svg>
    );
  }

  // Horizontal logo
  return (
    <div className={`flex items-center ${className}`}>
      <span className="font-bebas text-white tracking-wide">EXTREME</span>
      <span className="font-bebas text-cyan italic tracking-wide">IBIZA</span>
      {/* Gecko */}
      <svg 
        viewBox="0 0 24 24" 
        className="w-6 h-6 ml-1"
        fill="#00B4D8"
      >
        <path d="M12 2C8 2 6 4 6 6C6 8 7 9 7 9L5 12L7 14L5 18L8 20L10 18L12 20L14 18L16 20L19 18L17 14L19 12L17 9C17 9 18 8 18 6C18 4 16 2 12 2Z"/>
        <circle cx="9" cy="5" r="1" fill="#0a0a0a"/>
        <circle cx="15" cy="5" r="1" fill="#0a0a0a"/>
      </svg>
    </div>
  );
}
