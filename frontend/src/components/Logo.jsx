/** Logo.jsx — SVG-based premium text logo for MY Cafe */

export default function Logo({ size = 'md', white = false }) {
  const scales = { sm: 0.7, md: 1, lg: 1.4 };
  const scale  = scales[size] || 1;

  return (
    <svg
      width={Math.round(140 * scale)}
      height={Math.round(50 * scale)}
      viewBox="0 0 140 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="MY Cafe logo"
    >
      {/* Coffee cup body */}
      <rect x="4" y="22" width="24" height="18" rx="3" fill={white ? '#fff' : '#6F4E37'} />
      {/* Cup handle */}
      <path d="M28 28 Q36 28 36 34 Q36 40 28 40" stroke={white ? '#fff' : '#6F4E37'} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      {/* Saucer */}
      <ellipse cx="16" cy="41" rx="14" ry="3" fill={white ? 'rgba(255,255,255,0.4)' : '#4A3423'} />
      {/* Steam lines */}
      <path d="M10 20 Q11 16 10 12" stroke={white ? '#FFB27A' : '#FF8C42'} strokeWidth="2" strokeLinecap="round" />
      <path d="M16 18 Q17 14 16 10" stroke={white ? '#FFB27A' : '#FF8C42'} strokeWidth="2" strokeLinecap="round" />
      <path d="M22 20 Q23 16 22 12" stroke={white ? '#FFB27A' : '#FF8C42'} strokeWidth="2" strokeLinecap="round" />
      {/* Brand text: MY */}
      <text x="44" y="31" fontFamily="Poppins, sans-serif" fontWeight="800" fontSize="18"
        fill={white ? '#fff' : '#1A1512'} letterSpacing="-0.5">MY</text>
      {/* Brand text: Cafe */}
      <text x="44" y="44" fontFamily="Playfair Display, serif" fontWeight="600" fontSize="13"
        fill={white ? '#FFB27A' : '#FF8C42'} letterSpacing="2">Cafe</text>
    </svg>
  );
}
