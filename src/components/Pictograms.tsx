import React from 'react';

export interface PictogramProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
  className?: string;
}

// 1. 전통정자 (Traditional Pavilion)
export const PictogramTraditionalPavilion: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />
    
    {/* Roof finial / top bead */}
    <circle cx="50" cy="20" r="3.5" />
    
    {/* Curved Traditional Tile Roof */}
    <path
      d="M50 22 C44 32, 28 36, 14 42 C20 44, 25 44, 30 43.5 C36 43, 44 40, 50 37 C56 40, 64 43, 70 43.5 C75 44, 80 44, 86 42 C72 36, 56 32, 50 22 Z"
    />
    
    {/* Roof Rafters / Ribs */}
    <path d="M50 24 L50 37" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M47 26 Q40 33 34 42" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M53 26 Q60 33 66 42" stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" />
    <path d="M44 29 Q30 36 22 41" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    <path d="M56 29 Q70 36 78 41" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" fill="none" />

    {/* Pillars & Structure */}
    {/* Outer Pillars */}
    <rect x="25" y="43" width="5.5" height="27" rx="1.5" />
    <rect x="69.5" y="43" width="5.5" height="27" rx="1.5" />
    {/* Inner Pillars */}
    <rect x="39" y="41" width="5" height="29" rx="1.5" />
    <rect x="56" y="41" width="5" height="29" rx="1.5" />

    {/* Horizontal Beams */}
    <rect x="25" y="58" width="50" height="4" rx="1" />
    <rect x="25" y="65" width="50" height="4" rx="1" />

    {/* Base Platform / Foundation */}
    <path
      d="M21 70 L79 70 A2 2 0 0 1 81 72 L81 75 A2 2 0 0 1 79 77 L75 77 L75 80 L70 80 L70 77 L60 77 L60 80 L55 80 L55 77 L45 77 L45 80 L40 80 L40 77 L30 77 L30 80 L25 80 L25 77 L21 77 A2 2 0 0 1 19 75 L19 72 A2 2 0 0 1 21 70 Z"
    />
  </svg>
);

// 2. 파고라 (Pergola)
export const PictogramPergola: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Top Diagonal Rafters (6 angled slants radiating outward) */}
    <g stroke="currentColor" strokeWidth="4.5" strokeLinecap="round">
      {/* Left 3 slanting up-left */}
      <line x1="22" y1="27" x2="17" y2="21" />
      <line x1="33" y1="27" x2="30" y2="21" />
      <line x1="44" y1="27" x2="43" y2="21" />
      {/* Right 3 slanting up-right */}
      <line x1="56" y1="27" x2="57" y2="21" />
      <line x1="67" y1="27" x2="70" y2="21" />
      <line x1="78" y1="27" x2="83" y2="21" />
    </g>

    {/* Main Pergola Header Beam & Overhang */}
    <path
      d="M12 28 C13.5 26.5 15.5 26.5 20 26.5 L80 26.5 C84.5 26.5 86.5 26.5 88 28 C86.5 29.5 84 30.5 81 30.5 L81 36.5 L75.5 36.5 L75.5 30.5 L24.5 30.5 L24.5 36.5 L19 36.5 L19 30.5 C16 30.5 13.5 29.5 12 28 Z"
    />
    <rect x="19" y="30" width="62" height="6.5" />

    {/* Slat Windows / Rectangular Openings in Beam */}
    <rect x="20" y="31.2" width="5.5" height="4.2" fill="#fff" rx="0.6" />
    <rect x="28.5" y="31.2" width="5.5" height="4.2" fill="#fff" rx="0.6" />
    <rect x="37" y="31.2" width="5.5" height="4.2" fill="#fff" rx="0.6" />
    <rect x="47" y="31.2" width="6" height="4.2" fill="#fff" rx="0.6" />
    <rect x="57.5" y="31.2" width="5.5" height="4.2" fill="#fff" rx="0.6" />
    <rect x="66" y="31.2" width="5.5" height="4.2" fill="#fff" rx="0.6" />
    <rect x="74.5" y="31.2" width="5.5" height="4.2" fill="#fff" rx="0.6" />

    {/* Main Left & Right Vertical Pillars */}
    <rect x="19" y="36.5" width="5.5" height="37" rx="2.5" />
    <rect x="75.5" y="36.5" width="5.5" height="37" rx="2.5" />
  </svg>
);

// 3. 분리수거장 (Recycling Station)
export const PictogramRecycleStation: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Shelter Canopy Roof */}
    <path d="M14 32 L86 32 L82 24 L18 24 Z" />

    {/* Canopy Support Posts */}
    <rect x="18" y="32" width="4.5" height="46" rx="1" />
    <rect x="77.5" y="32" width="4.5" height="46" rx="1" />

    {/* 3 Recycling Bins */}
    {/* Bin 1 (Left) */}
    <rect x="15" y="43" width="22" height="33" rx="4" />
    <rect x="13.5" y="41" width="25" height="4" rx="2" />
    {/* Recycle Icon on Bin 1 */}
    <g fill="#fff" transform="translate(26, 57) scale(0.65)">
      <path d="M0 -8 L4 -2 L1 -2 C2 3, -1 6, -5 6 L-5 4 C-2 4, 0 1, -1 -2 L-4 -2 Z" />
      <path d="M0 -8 L4 -2 L1 -2 C2 3, -1 6, -5 6 L-5 4 C-2 4, 0 1, -1 -2 L-4 -2 Z" transform="rotate(120)" />
      <path d="M0 -8 L4 -2 L1 -2 C2 3, -1 6, -5 6 L-5 4 C-2 4, 0 1, -1 -2 L-4 -2 Z" transform="rotate(240)" />
    </g>

    {/* Bin 2 (Middle) */}
    <rect x="39" y="43" width="22" height="33" rx="4" />
    <rect x="37.5" y="41" width="25" height="4" rx="2" />
    {/* Recycle Icon on Bin 2 */}
    <g fill="#fff" transform="translate(50, 57) scale(0.65)">
      <path d="M0 -8 L4 -2 L1 -2 C2 3, -1 6, -5 6 L-5 4 C-2 4, 0 1, -1 -2 L-4 -2 Z" />
      <path d="M0 -8 L4 -2 L1 -2 C2 3, -1 6, -5 6 L-5 4 C-2 4, 0 1, -1 -2 L-4 -2 Z" transform="rotate(120)" />
      <path d="M0 -8 L4 -2 L1 -2 C2 3, -1 6, -5 6 L-5 4 C-2 4, 0 1, -1 -2 L-4 -2 Z" transform="rotate(240)" />
    </g>

    {/* Bin 3 (Right) */}
    <rect x="63" y="43" width="22" height="33" rx="4" />
    <rect x="61.5" y="41" width="25" height="4" rx="2" />
    {/* Recycle Icon on Bin 3 */}
    <g fill="#fff" transform="translate(74, 57) scale(0.65)">
      <path d="M0 -8 L4 -2 L1 -2 C2 3, -1 6, -5 6 L-5 4 C-2 4, 0 1, -1 -2 L-4 -2 Z" />
      <path d="M0 -8 L4 -2 L1 -2 C2 3, -1 6, -5 6 L-5 4 C-2 4, 0 1, -1 -2 L-4 -2 Z" transform="rotate(120)" />
      <path d="M0 -8 L4 -2 L1 -2 C2 3, -1 6, -5 6 L-5 4 C-2 4, 0 1, -1 -2 L-4 -2 Z" transform="rotate(240)" />
    </g>
  </svg>
);

// 4. 자전거 보관대 (Bicycle Rack / Shelter)
export const PictogramBicycleRack: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Curved Modern Bicycle Shelter Arch */}
    {/* Outer Arch */}
    <path
      d="M13 36 C13 26, 22 24, 34 24 L81 24 C84 24, 87 26, 86 31 L80 80"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Inner Curved Arch */}
    <path
      d="M21 78 L21 44 C21 34, 27 29, 37 28 L75 28"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
    />

    {/* Bicycle Pictogram */}
    {/* Wheels */}
    <circle cx="37" cy="65" r="9" fill="none" stroke="currentColor" strokeWidth="4" />
    <circle cx="67" cy="65" r="9" fill="none" stroke="currentColor" strokeWidth="4" />
    {/* Frame Triangle */}
    <path
      d="M37 65 L48 65 L59 52 L43 52 Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Seat Post & Seat */}
    <path d="M48 65 L42 47" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M38 46 L46 46" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    {/* Handlebar Post & Handle */}
    <path d="M67 65 L58 45" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
    <path d="M56 44 C61 44, 64 42, 65 40" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

// 5. 옥외용 벤치 (Outdoor Bench)
export const PictogramOutdoorBench: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Backrest Slats */}
    <rect x="20" y="32" width="60" height="6.5" rx="3" />
    <rect x="20" y="42" width="60" height="6.5" rx="3" />

    {/* Backrest Vertical Supports */}
    <rect x="28" y="36" width="5" height="20" rx="1" />
    <rect x="67" y="36" width="5" height="20" rx="1" />

    {/* Seat Planks */}
    <rect x="14" y="55" width="72" height="7.5" rx="3.5" />

    {/* Bench Legs & Feet */}
    <rect x="21" y="62" width="6.5" height="19" rx="2" />
    <rect x="72.5" y="62" width="6.5" height="19" rx="2" />
  </svg>
);

// 6. 수목보호의자 (Tree Guard Bench)
export const PictogramTreeBench: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Tree Foliage / Canopy */}
    <path
      d="M50 20 C42 20, 36 26, 36 32 C30 32, 25 37, 26 44 C26 51, 33 55, 41 55 C43 55, 46 54, 48 53 L48 68 L52 68 L52 53 C54 54, 57 55, 59 55 C67 55, 74 51, 74 44 C75 37, 70 32, 64 32 C64 26, 58 20, 50 20 Z"
    />
    {/* Tree Trunk Branches */}
    <path d="M50 48 L41 38 M50 48 L59 38" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />

    {/* Circular Tree Bench Structure around trunk */}
    {/* Bench Curved Ring Seat */}
    <ellipse cx="50" cy="67" rx="31" ry="8" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Bench Support Legs */}
    <rect x="23" y="69" width="4.5" height="14" rx="1.5" />
    <rect x="39" y="72" width="4.5" height="12" rx="1.5" />
    <rect x="56.5" y="72" width="4.5" height="12" rx="1.5" />
    <rect x="72.5" y="69" width="4.5" height="14" rx="1.5" />
  </svg>
);

// 7. 버스승강장 (Bus Shelter)
export const PictogramBusShelter: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Main Shelter Canopy Top */}
    <rect x="14" y="24" width="60" height="6.5" rx="3" />

    {/* Shelter Glass Box Outer Border */}
    <path
      d="M18 30 L18 80 L70 80 L70 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Inside Bench */}
    <rect x="27" y="60" width="34" height="6" rx="3" />
    <rect x="33" y="66" width="4" height="14" rx="1" />
    <rect x="51" y="66" width="4" height="14" rx="1" />

    {/* Standalone Bus Stop Sign on Right */}
    {/* Sign Pole */}
    <rect x="79" y="30" width="4" height="52" rx="1" />
    {/* Sign Box */}
    <rect x="73" y="30" width="16" height="18" rx="4" />
    {/* Bus Icon inside Sign */}
    <g fill="#fff" transform="translate(81, 39) scale(0.65)">
      <rect x="-8" y="-9" width="16" height="16" rx="2.5" />
      {/* Windshield */}
      <rect x="-6" y="-7" width="12" height="5.5" rx="1" fill="currentColor" />
      {/* Headlights */}
      <circle cx="-4" cy="2" r="1.5" fill="currentColor" />
      <circle cx="4" cy="2" r="1.5" fill="currentColor" />
      {/* Wheels */}
      <rect x="-6" y="6.5" width="3" height="2" fill="#fff" />
      <rect x="3" y="6.5" width="3" height="2" fill="#fff" />
    </g>
  </svg>
);

// 8. 어린이 버스승강장 (Children Bus Shelter)
export const PictogramKidsBusShelter: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Shelter Canopy Top */}
    <rect x="13" y="24" width="62" height="6.5" rx="3" />

    {/* Shelter Wall Outline */}
    <path
      d="M17 30 L17 80 L71 80 L71 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="4.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />

    {/* Kids Holding Hands inside */}
    {/* Boy (Left) */}
    <circle cx="34" cy="48" r="4.5" />
    <path d="M29 55 L39 55 L38 67 L35 67 L35 77 L33 77 L33 67 L30 67 Z" />
    <path d="M29 55 L25 63 M39 55 L44 61" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

    {/* Girl (Right) */}
    <circle cx="53" cy="48" r="4.5" />
    {/* Girl Hair detail */}
    <path d="M47 48 C46 52, 48 54, 50 54 M59 48 C60 52, 58 54, 56 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
    {/* Dress & Legs */}
    <path d="M49 55 L57 55 L61 68 L45 68 Z" />
    <rect x="49" y="68" width="2.5" height="9" rx="1" />
    <rect x="55" y="68" width="2.5" height="9" rx="1" />
    <path d="M49 55 L44 61 M57 55 L61 63" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />

    {/* Holding hands connection */}
    <path d="M44 61 L45 61" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />

    {/* Bus Sign on Right */}
    <rect x="80" y="30" width="4" height="52" rx="1" />
    <rect x="74" y="30" width="16" height="18" rx="4" />
    <g fill="#fff" transform="translate(82, 39) scale(0.65)">
      <rect x="-8" y="-9" width="16" height="16" rx="2.5" />
      <rect x="-6" y="-7" width="12" height="5.5" rx="1" fill="currentColor" />
      <circle cx="-4" cy="2" r="1.5" fill="currentColor" />
      <circle cx="4" cy="2" r="1.5" fill="currentColor" />
    </g>
  </svg>
);

// 9. 야외운동시설 (Outdoor Fitness / Workout)
export const PictogramOutdoorFitness: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Fitness Machine / Treadmill Structure */}
    {/* Base Track */}
    <rect x="23" y="73" width="54" height="5.5" rx="2.5" />
    {/* Left Flywheel */}
    <circle cx="27" cy="74" r="6" fill="none" stroke="currentColor" strokeWidth="3" />
    {/* Right Flywheel */}
    <circle cx="71" cy="74" r="4" />

    {/* Front Post & Handles */}
    <path d="M68 74 L60 44 L66 40 L69 22" fill="none" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M66 40 L69 35" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

    {/* Connecting link */}
    <path d="M27 74 L55 68" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

    {/* Exercising Person */}
    {/* Head */}
    <circle cx="45" cy="22" r="6" />
    {/* Torso */}
    <path d="M43 30 L35 48 L43 55" stroke="currentColor" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Arms holding front bars */}
    <path d="M42 34 L56 34 L62 42" stroke="currentColor" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Back Leg */}
    <path d="M35 48 L31 66 L27 68" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    {/* Forward Leg */}
    <path d="M35 48 L49 61 L53 71" stroke="currentColor" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
  </svg>
);

// 10. 휀스 (Fence)
export const PictogramFence: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Horizontal Rails */}
    <rect x="13" y="41" width="74" height="6.5" rx="1.5" />
    <rect x="13" y="61" width="74" height="6.5" rx="1.5" />

    {/* 5 Vertical Pickets with Pointed Tops */}
    {/* Picket 1 */}
    <path d="M19 78 L19 36 L24 30 L29 36 L29 78 Z" />
    {/* Picket 2 */}
    <path d="M33 78 L33 36 L38 30 L43 36 L43 78 Z" />
    {/* Picket 3 (Center) */}
    <path d="M47 78 L47 36 L52 30 L57 36 L57 78 Z" />
    {/* Picket 4 */}
    <path d="M61 78 L61 36 L66 30 L71 36 L71 78 Z" />
    {/* Picket 5 */}
    <path d="M75 78 L75 36 L80 30 L85 36 L85 78 Z" />
  </svg>
);

// 11. 어린이놀이터 (Kids Playground)
export const PictogramPlayground: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Play Tower Roof */}
    <path d="M47 22 L33 35 L61 35 Z" />

    {/* Tower Cabin & Window */}
    <rect x="36" y="35" width="22" height="42" rx="1" />
    {/* Arch Window */}
    <path d="M43 46 C43 41, 51 41, 51 46 L51 51 L43 51 Z" fill="#fff" />
    {/* Ladder / Steps inside tower base */}
    <rect x="43" y="56" width="8" height="3" fill="#fff" rx="0.5" />
    <rect x="43" y="62" width="8" height="3" fill="#fff" rx="0.5" />

    {/* Slide on Left */}
    <path
      d="M37 47 C31 47, 28 53, 23 62 C18 69, 14 71, 12 71 C12 69, 14 67, 18 64 C23 57, 29 47, 36 47 Z"
    />
    <path
      d="M36 50 C29 50, 24 57, 19 65 C15 72, 12 73, 12 73"
      fill="none"
      stroke="currentColor"
      strokeWidth="5"
      strokeLinecap="round"
    />

    {/* Swing Set on Right */}
    {/* Top Beam */}
    <rect x="56" y="38" width="31" height="4.5" rx="1" />
    {/* Right Post A-frame */}
    <path d="M84 41 L88 77 M84 41 L79 77" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    {/* Swing Ropes */}
    <line x1="66" y1="42" x2="66" y2="65" stroke="currentColor" strokeWidth="2.2" />
    <line x1="74" y1="42" x2="74" y2="65" stroke="currentColor" strokeWidth="2.2" />
    {/* Swing Seat */}
    <rect x="63" y="64" width="14" height="5" rx="2.5" />
  </svg>
);

// 12. 반려동물 놀이터 (Pet Park / Agility)
export const PictogramPetPark: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Top Agility / Park Fence */}
    <rect x="18" y="34" width="67" height="4" rx="1" />
    <rect x="18" y="42" width="67" height="4" rx="1" />
    <rect x="23" y="28" width="4.5" height="18" rx="1" />
    <rect x="33" y="28" width="4.5" height="18" rx="1" />
    <rect x="43" y="28" width="4.5" height="18" rx="1" />
    <rect x="53" y="28" width="4.5" height="18" rx="1" />
    <rect x="63" y="28" width="4.5" height="18" rx="1" />
    <rect x="73" y="28" width="4.5" height="18" rx="1" />

    {/* Playful Dog Running */}
    {/* Body & Tail */}
    <path
      d="M59 49 C55 48, 51 51, 46 54 C39 55, 30 55, 26 59 C22 62, 22 65, 18 61 C17 60, 19 56, 23 54 C27 52, 33 51, 38 49 C46 47, 54 46, 59 49 Z"
    />
    {/* Head & Ears */}
    <path
      d="M58 50 C62 47, 66 49, 68 53 C69 55, 68 57, 65 58 C62 59, 58 57, 57 53 Z"
    />
    <path d="M60 48 C60 43, 56 46, 56 48 Z" />
    {/* Front Running Legs */}
    <path d="M57 56 L64 71 C65 73, 67 73, 67 71 L64 56" />
    <path d="M53 58 L58 75 C58 77, 60 76, 61 74 L56 57" />
    {/* Back Running Legs */}
    <path d="M28 58 L20 73 C19 75, 21 76, 23 74 L32 60" />
    <path d="M34 58 L28 77 C28 78, 30 79, 31 77 L38 60" />

    {/* Ball */}
    <circle cx="79" cy="67" r="5" />
  </svg>
);

// 13. 방음벽 (Noise Barrier)
export const PictogramNoiseBarrier: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Noise Barrier Posts & Horizontal Glass/Acoustic Panels */}
    <rect x="18" y="25" width="6.5" height="55" rx="2" />
    <rect x="44.5" y="32" width="6.5" height="48" rx="2" />
    <rect x="69" y="38" width="6.5" height="42" rx="2" />

    {/* Horizontal Panel Rails */}
    <line x1="22" y1="36" x2="48" y2="36" stroke="currentColor" strokeWidth="4.5" />
    <line x1="22" y1="48" x2="48" y2="48" stroke="currentColor" strokeWidth="4.5" />
    <line x1="22" y1="60" x2="48" y2="60" stroke="currentColor" strokeWidth="4.5" />

    <line x1="48" y1="46" x2="72" y2="46" stroke="currentColor" strokeWidth="4.5" />
    <line x1="48" y1="58" x2="72" y2="58" stroke="currentColor" strokeWidth="4.5" />
    <line x1="48" y1="70" x2="72" y2="70" stroke="currentColor" strokeWidth="4.5" />

    {/* Sound Wave Rings blocked / absorbed in Top Right */}
    <path d="M68 28 C74 27, 76 22, 73 18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M74 34 C82 32, 85 24, 80 18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
    <path d="M81 39 C90 37, 94 26, 88 18" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />

    {/* Trees & Bush at Base */}
    {/* Tree Right */}
    <path d="M82 54 C77 54, 76 60, 77 69 C77 75, 87 75, 87 69 C88 60, 87 54, 82 54 Z" />
    <rect x="80.5" y="69" width="3" height="11" rx="1" />
    {/* Bushes */}
    <path
      d="M14 78 C14 69, 23 66, 26 71 C29 65, 37 65, 40 70 C44 65, 52 66, 52 74 C52 76, 50 78, 48 78 Z"
    />
    <path
      d="M51 78 C51 70, 59 67, 63 72 C66 68, 74 69, 75 75 C75 77, 73 78, 71 78 Z"
    />
  </svg>
);

// 14. 시설물 보수 (Facility Maintenance & Repair)
export const PictogramMaintenance: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Crossed Tools: Wrench & Chisel / Screwdriver */}
    {/* Screwdriver (Top-Right to Bottom-Left) */}
    <g transform="rotate(-45 50 50)">
      {/* Blade Tip */}
      <rect x="47" y="16" width="6" height="12" rx="1" />
      {/* Shank */}
      <rect x="48" y="28" width="4" height="24" />
      {/* Handle */}
      <path d="M44 52 C44 50, 56 50, 56 52 L57 80 C57 83, 43 83, 43 80 Z" />
      {/* Handle Hole */}
      <circle cx="50" cy="74" r="2.5" fill="#fff" />
    </g>

    {/* Wrench (Top-Left to Bottom-Right) */}
    <g transform="rotate(45 50 50)">
      {/* Wrench Head */}
      <path
        d="M40 18 C40 12, 60 12, 60 18 C60 25, 56 29, 56 34 L44 34 C44 29, 40 25, 40 18 Z"
      />
      {/* Wrench Jaw Cutout */}
      <path d="M46 12 L54 12 L54 22 L46 22 Z" fill="#fff" />
      {/* Wrench Shaft */}
      <rect x="45.5" y="34" width="9" height="34" rx="2" />
      {/* Wrench Bottom Ring */}
      <circle cx="50" cy="74" r="8" />
      <circle cx="50" cy="74" r="4.2" fill="#fff" />
    </g>
  </svg>
);

// 15. 기타 조경 시설물 (Other Landscape Facilities)
export const PictogramLandscapeFacilities: React.FC<PictogramProps> = ({ size = 56, className = '', ...props }) => (
  <svg
    viewBox="0 0 100 100"
    width={size}
    height={size}
    fill="currentColor"
    className={className}
    {...props}
  >
    {/* Outer Rounded Frame */}
    <rect x="6" y="6" width="88" height="88" rx="18" fill="none" stroke="currentColor" strokeWidth="6" />

    {/* Left Tree */}
    <path
      d="M31 23 C22 23, 16 30, 16 39 C16 48, 23 52, 29 52 L29 67 L33 67 L33 52 C39 52, 46 48, 46 39 C46 30, 40 23, 31 23 Z"
    />
    <path d="M31 52 L31 38 M31 44 L24 37 M31 44 L38 37" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />

    {/* Left Bushes */}
    <path d="M12 75 C12 66, 20 63, 23 68 C27 63, 34 64, 35 70 C35 73, 33 75, 30 75 Z" />

    {/* Middle Bushes & Winding Path */}
    <path d="M57 41 C50 41, 44 47, 44 54 C44 61, 50 64, 56 64 C62 64, 68 60, 68 54 C68 47, 63 41, 57 41 Z" />
    {/* Path Winding Down */}
    <path
      d="M51 63 C49 67, 33 71, 26 82 L42 82 C49 74, 60 71, 62 64 Z"
    />

    {/* Right Bush */}
    <path d="M60 79 C60 72, 67 69, 70 73 C73 69, 81 70, 82 76 C82 78, 80 79, 77 79 Z" />

    {/* Right Classic Street Lamp */}
    <path d="M76 65 L76 26 C76 20, 68 20, 67 25" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    {/* Lamp Shade */}
    <path d="M63 26 C63 22, 73 22, 73 26 Z" />
    {/* Lamp Base Stand */}
    <rect x="74" y="52" width="4" height="13" rx="1" />
    <path d="M71 65 L81 65 L83 67 L69 67 Z" />
  </svg>
);

// Map of all 15 custom pictograms
export const PICTOGRAM_MAP: Record<string, React.FC<PictogramProps>> = {
  // Korean filenames / keys
  '1전통정자': PictogramTraditionalPavilion,
  '2파고라': PictogramPergola,
  '2 파고라': PictogramPergola,
  '3분리수거장': PictogramRecycleStation,
  '3 분리수거장': PictogramRecycleStation,
  '4자전거보관대': PictogramBicycleRack,
  '4 자전거 보관대': PictogramBicycleRack,
  '5옥외용벤치': PictogramOutdoorBench,
  '5 옥외용 벤치': PictogramOutdoorBench,
  '6수목보호의자': PictogramTreeBench,
  '6 수목보호의자': PictogramTreeBench,
  '7버스승강장': PictogramBusShelter,
  '7 버스승강장': PictogramBusShelter,
  '8어린이버스승강장': PictogramKidsBusShelter,
  '8 어린이 버스승강장': PictogramKidsBusShelter,
  '9야외운동시설': PictogramOutdoorFitness,
  '9 야외운동시설': PictogramOutdoorFitness,
  '10휀스': PictogramFence,
  '10 휀스': PictogramFence,
  '11어린이놀이터': PictogramPlayground,
  '11 어린이놀이터': PictogramPlayground,
  '12반려동물놀이터': PictogramPetPark,
  '12 반려동물 놀이터': PictogramPetPark,
  '13방음벽': PictogramNoiseBarrier,
  '13 방음벽': PictogramNoiseBarrier,
  '14시설물보수': PictogramMaintenance,
  '14 시설물 보수': PictogramMaintenance,
  '15기타조경시설물': PictogramLandscapeFacilities,
  '15 기타 조경 시설물': PictogramLandscapeFacilities,

  // English aliases
  traditional_pavilion: PictogramTraditionalPavilion,
  pavilion: PictogramTraditionalPavilion,
  pergola: PictogramPergola,
  recycle: PictogramRecycleStation,
  recycling_station: PictogramRecycleStation,
  bin: PictogramRecycleStation,
  bicycle: PictogramBicycleRack,
  bike_rack: PictogramBicycleRack,
  bench: PictogramOutdoorBench,
  tree_bench: PictogramTreeBench,
  bus_shelter: PictogramBusShelter,
  kids_bus_shelter: PictogramKidsBusShelter,
  fitness: PictogramOutdoorFitness,
  outdoor_fitness: PictogramOutdoorFitness,
  fence: PictogramFence,
  playground: PictogramPlayground,
  pet_park: PictogramPetPark,
  noise_barrier: PictogramNoiseBarrier,
  maintenance: PictogramMaintenance,
  landscape_facilities: PictogramLandscapeFacilities,
  bollard: PictogramLandscapeFacilities
};

export const AVAILABLE_PICTOGRAMS = [
  { id: '1전통정자', name: '1. 전통정자', component: PictogramTraditionalPavilion },
  { id: '2 파고라', name: '2. 파고라', component: PictogramPergola },
  { id: '3 분리수거장', name: '3. 분리수거장', component: PictogramRecycleStation },
  { id: '4 자전거 보관대', name: '4. 자전거 보관대', component: PictogramBicycleRack },
  { id: '5 옥외용 벤치', name: '5. 옥외용 벤치', component: PictogramOutdoorBench },
  { id: '6 수목보호의자', name: '6. 수목보호의자', component: PictogramTreeBench },
  { id: '7 버스승강장', name: '7. 버스승강장', component: PictogramBusShelter },
  { id: '8 어린이 버스승강장', name: '8. 어린이 버스승강장', component: PictogramKidsBusShelter },
  { id: '9 야외운동시설', name: '9. 야외운동시설', component: PictogramOutdoorFitness },
  { id: '10 휀스', name: '10. 휀스', component: PictogramFence },
  { id: '11 어린이놀이터', name: '11. 어린이놀이터', component: PictogramPlayground },
  { id: '12 반려동물 놀이터', name: '12. 반려동물 놀이터', component: PictogramPetPark },
  { id: '13 방음벽', name: '13. 방음벽', component: PictogramNoiseBarrier },
  { id: '14 시설물 보수', name: '14. 시설물 보수', component: PictogramMaintenance },
  { id: '15 기타 조경 시설물', name: '15. 기타 조경 시설물', component: PictogramLandscapeFacilities }
];
