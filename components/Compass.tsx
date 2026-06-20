"use client";

export default function Compass({ size = 200, className = "" }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Outer ring */}
      <circle cx="100" cy="100" r="95" stroke="url(#compassGrad)" strokeWidth="1" opacity="0.3" />
      <circle cx="100" cy="100" r="85" stroke="url(#compassGrad)" strokeWidth="0.5" opacity="0.2" />

      {/* Cardinal direction ticks */}
      {[0, 90, 180, 270].map((angle) => (
        <line
          key={angle}
          x1="100"
          y1="10"
          x2="100"
          y2="20"
          stroke="#6366F1"
          strokeWidth="2"
          transform={`rotate(${angle} 100 100)`}
          opacity="0.6"
        />
      ))}

      {/* Minor ticks */}
      {[30, 60, 120, 150, 210, 240, 300, 330].map((angle) => (
        <line
          key={angle}
          x1="100"
          y1="12"
          x2="100"
          y2="18"
          stroke="#A855F7"
          strokeWidth="1"
          transform={`rotate(${angle} 100 100)`}
          opacity="0.4"
        />
      ))}

      {/* North arrow */}
      <polygon points="100,25 94,55 100,48 106,55" fill="url(#northGrad)" />

      {/* South arrow */}
      <polygon points="100,175 94,145 100,152 106,145" fill="#6366F1" opacity="0.4" />

      {/* East-West line */}
      <line x1="25" y1="100" x2="175" y2="100" stroke="#6366F1" strokeWidth="0.5" opacity="0.2" />

      {/* Center circle */}
      <circle cx="100" cy="100" r="8" fill="url(#centerGrad)" />
      <circle cx="100" cy="100" r="4" fill="#0A0A0F" />
      <circle cx="100" cy="100" r="2" fill="#00E5FF" opacity="0.8" />

      {/* Degree markers */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <circle
          key={`dot-${angle}`}
          cx="100"
          cy="15"
          r="1.5"
          fill="#00E5FF"
          transform={`rotate(${angle} 100 100)`}
          opacity="0.5"
        />
      ))}

      <defs>
        <linearGradient id="compassGrad" x1="0" y1="0" x2="200" y2="200">
          <stop offset="0%" stopColor="#6366F1" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#00E5FF" />
        </linearGradient>
        <linearGradient id="northGrad" x1="100" y1="25" x2="100" y2="55">
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#6366F1" />
        </linearGradient>
        <radialGradient id="centerGrad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6366F1" />
        </radialGradient>
      </defs>
    </svg>
  );
}
