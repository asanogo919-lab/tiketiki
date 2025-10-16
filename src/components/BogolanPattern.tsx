// Composant SVG pour les motifs bogolan stylisés
export function BogolanPattern() {
  return (
    <svg 
      className="absolute inset-0 w-full h-full opacity-10 dark:opacity-5" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id="bogolan" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
          {/* Motifs géométriques inspirés du bogolan */}
          <circle cx="20" cy="20" r="2" fill="currentColor" />
          <circle cx="60" cy="20" r="2" fill="currentColor" />
          <circle cx="100" cy="20" r="2" fill="currentColor" />
          <circle cx="140" cy="20" r="2" fill="currentColor" />
          <circle cx="180" cy="20" r="2" fill="currentColor" />
          
          <path d="M 40 40 L 60 40 L 50 60 Z" fill="currentColor" opacity="0.5" />
          <path d="M 120 40 L 140 40 L 130 60 Z" fill="currentColor" opacity="0.5" />
          
          <rect x="10" y="80" width="30" height="3" fill="currentColor" opacity="0.6" />
          <rect x="50" y="80" width="30" height="3" fill="currentColor" opacity="0.6" />
          <rect x="90" y="80" width="30" height="3" fill="currentColor" opacity="0.6" />
          <rect x="130" y="80" width="30" height="3" fill="currentColor" opacity="0.6" />
          <rect x="170" y="80" width="30" height="3" fill="currentColor" opacity="0.6" />
          
          <path d="M 25 120 Q 35 110 45 120" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M 75 120 Q 85 110 95 120" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
          <path d="M 125 120 Q 135 110 145 120" stroke="currentColor" strokeWidth="2" fill="none" opacity="0.4" />
          
          <circle cx="40" cy="160" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          <circle cx="100" cy="160" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
          <circle cx="160" cy="160" r="8" fill="none" stroke="currentColor" strokeWidth="2" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#bogolan)" />
    </svg>
  );
}
