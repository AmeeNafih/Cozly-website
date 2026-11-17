const fs = require('fs');
const path = require('path');

const dirs = [
  'public/images/products',
  'public/images/hero',
  'public/images/factory',
  'public/images/swatches',
  'public/brand',
];

dirs.forEach((dir) => {
  const fullPath = path.join(process.cwd(), dir);
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath, { recursive: true });
  }
});

function createSofaSVG(title, subtitle, type, color, frameColor, tag = 'COZLY HANDCRAFTED') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="100%" height="100%">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#FAF8F5" />
      <stop offset="100%" stop-color="#EAE5DC" />
    </linearGradient>
    <linearGradient id="cushionGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="${color}" />
      <stop offset="100%" stop-color="#121820" stop-opacity="0.9" />
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
      <feDropShadow dx="0" dy="24" stdDeviation="24" flood-color="#18222D" flood-opacity="0.14" />
    </filter>
    <filter id="floorShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="16" />
      <feColorMatrix type="matrix" values="0 0 0 0 0.09   0 0 0 0 0.13   0 0 0 0 0.17  0 0 0 0.18 0"/>
      <feOffset dx="0" dy="18" />
      <feBlend in="SourceGraphic" in2="blurOut" mode="normal" />
    </filter>
  </defs>

  <!-- Clean Minimalist Studio Background -->
  <rect width="800" height="600" fill="url(#bg)" />

  <!-- Wall-Floor Architectural Base Line -->
  <line x1="0" y1="450" x2="800" y2="450" stroke="#DFD9CD" stroke-width="1.5" />
  <rect x="0" y="450" width="800" height="150" fill="#F3EFE7" opacity="0.6" />

  <!-- Studio Floor Shadow -->
  <ellipse cx="400" cy="460" rx="280" ry="24" fill="#000000" opacity="0.08" />

  <!-- Main Sofa Silhouette Group -->
  <g transform="translate(100, 160)" filter="url(#shadow)">
    <!-- Exposed Timber Legs or Base -->
    <path d="M 60 270 L 50 320 L 70 320 L 80 270 Z" fill="${frameColor}" />
    <path d="M 520 270 L 510 320 L 530 320 L 540 270 Z" fill="${frameColor}" />
    <path d="M 180 275 L 175 315 L 190 315 L 195 275 Z" fill="${frameColor}" />
    <path d="M 410 275 L 405 315 L 420 315 L 425 275 Z" fill="${frameColor}" />

    <!-- Sofa Frame Under-Plinth -->
    <rect x="40" y="250" width="520" height="26" rx="6" fill="${frameColor}" />

    <!-- Deep Seat Base Cushions -->
    <rect x="45" y="190" width="510" height="68" rx="14" fill="${color}" />
    <rect x="55" y="196" width="160" height="56" rx="10" fill="#ffffff" fill-opacity="0.08" />
    <rect x="220" y="196" width="160" height="56" rx="10" fill="#ffffff" fill-opacity="0.08" />
    <rect x="385" y="196" width="160" height="56" rx="10" fill="#ffffff" fill-opacity="0.08" />

    <!-- Backrest Cushions -->
    <rect x="55" y="80" width="160" height="120" rx="16" fill="${color}" />
    <rect x="220" y="80" width="160" height="120" rx="16" fill="${color}" />
    <rect x="385" y="80" width="160" height="120" rx="16" fill="${color}" />
    <!-- Highlight sheen -->
    <path d="M 65 95 Q 135 85 205 95" stroke="#ffffff" stroke-opacity="0.25" stroke-width="4" stroke-linecap="round" fill="none" />
    <path d="M 230 95 Q 300 85 370 95" stroke="#ffffff" stroke-opacity="0.25" stroke-width="4" stroke-linecap="round" fill="none" />
    <path d="M 395 95 Q 465 85 535 95" stroke="#ffffff" stroke-opacity="0.25" stroke-width="4" stroke-linecap="round" fill="none" />

    <!-- Left & Right Armrests -->
    <rect x="30" y="120" width="45" height="140" rx="12" fill="${color}" />
    <rect x="525" y="120" width="45" height="140" rx="12" fill="${color}" />
    <!-- Armrest Timber Caps (if wooden) -->
    <rect x="26" y="112" width="53" height="14" rx="4" fill="${frameColor}" />
    <rect x="521" y="112" width="53" height="14" rx="4" fill="${frameColor}" />

    <!-- Throw Cushions -->
    <rect x="80" y="150" width="70" height="70" rx="12" fill="#D9822B" transform="rotate(-8 80 150)" />
    <rect x="450" y="150" width="70" height="70" rx="12" fill="#FAF8F5" fill-opacity="0.9" transform="rotate(10 450 150)" />
  </g>

  <!-- Elegant Editorial Watermark / Product Badge -->
  <g transform="translate(48, 52)">
    <rect x="0" y="0" width="220" height="28" rx="6" fill="#18222D" fill-opacity="0.06" />
    <text x="14" y="18" font-family="'Inter', -apple-system, sans-serif" font-weight="700" font-size="10" letter-spacing="2" fill="#D9822B">
      ${tag}
    </text>
    <text x="0" y="54" font-family="'Playfair Display', Georgia, serif" font-weight="700" font-size="24" fill="#18222D">
      ${title}
    </text>
    <text x="0" y="74" font-family="'Inter', sans-serif" font-weight="500" font-size="12" letter-spacing="1" fill="#6B7280">
      ${subtitle}
    </text>
  </g>

  <!-- COZLY Minimal Emblem on Floor -->
  <g transform="translate(710, 545)">
    <circle cx="16" cy="16" r="16" fill="#18222D" />
    <text x="9" y="21" font-family="'Inter', sans-serif" font-weight="800" font-size="13" fill="#D9822B">C</text>
  </g>
</svg>`;
}

function createHeroSVG(headline, sub, themeColor = '#18222D') {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 900" width="100%" height="100%">
  <defs>
    <linearGradient id="heroBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#141D26" />
      <stop offset="50%" stop-color="#1B2836" />
      <stop offset="100%" stop-color="#0F161E" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ffffff" stroke-width="0.5" stroke-opacity="0.04" />
    </pattern>
  </defs>

  <rect width="1600" height="900" fill="url(#heroBg)" />
  <rect width="1600" height="900" fill="url(#grid)" />

  <!-- Atmospheric Glow -->
  <circle cx="1200" cy="450" r="400" fill="#D9822B" opacity="0.08" />

  <!-- Architectural 3D Sofa Art in Hero -->
  <g transform="translate(720, 260)">
    <!-- Floor shadow -->
    <ellipse cx="400" cy="460" rx="360" ry="32" fill="#000000" opacity="0.4" />
    <!-- Plinth -->
    <rect x="60" y="380" width="680" height="30" rx="8" fill="#9E6738" />
    <!-- Base cushion -->
    <rect x="70" y="300" width="660" height="90" rx="18" fill="#243447" />
    <!-- Backrests -->
    <rect x="80" y="160" width="200" height="150" rx="20" fill="#18222D" />
    <rect x="300" y="160" width="200" height="150" rx="20" fill="#18222D" />
    <rect x="520" y="160" width="200" height="150" rx="20" fill="#18222D" />
    <!-- Armrests -->
    <rect x="40" y="210" width="60" height="180" rx="16" fill="#18222D" />
    <rect x="700" y="210" width="60" height="180" rx="16" fill="#18222D" />
    <!-- Throw cushions -->
    <rect x="110" y="250" width="90" height="90" rx="14" fill="#D9822B" transform="rotate(-12 110 250)" />
    <rect x="600" y="250" width="90" height="90" rx="14" fill="#FAF8F5" fill-opacity="0.8" transform="rotate(8 600 250)" />
  </g>

  <!-- Editorial Typography Overlay -->
  <g transform="translate(120, 360)">
    <rect x="0" y="0" width="280" height="32" rx="6" fill="#D9822B" fill-opacity="0.2" />
    <text x="16" y="21" font-family="'Inter', sans-serif" font-weight="700" font-size="12" letter-spacing="3" fill="#D9822B">
      HANDCRAFTED IN ERATTUPETTA
    </text>
    <text x="0" y="90" font-family="'Playfair Display', Georgia, serif" font-weight="700" font-size="52" fill="#FAF8F5">
      ${headline}
    </text>
    <text x="0" y="140" font-family="'Inter', sans-serif" font-weight="400" font-size="18" fill="#9CA3AF">
      ${sub}
    </text>
  </g>
</svg>`;
}

const productMap = [
  { file: 'malabar-teak.svg', title: 'The Malabar Teak 3-Seater', sub: 'Solid Kerala Teakwood • Belgian Linen', color: '#1B382B', frame: '#9E6738' },
  { file: 'malabar-teak-side.svg', title: 'Malabar Teak Detail', sub: 'Precision Mortise & Tenon Joinery', color: '#1B382B', frame: '#9E6738' },
  { file: 'factory-craft.svg', title: 'Erattupetta Workshop', sub: 'Master Woodcraft & Upholstery Atelier', color: '#2B211E', frame: '#C59B27' },
  { file: 'vembanad-lshape.svg', title: 'Vembanad L-Shape', sub: 'Modular 6-Seater Sectional • Bouclé', color: '#4E6151', frame: '#18222D' },
  { file: 'vembanad-chaise.svg', title: 'Vembanad Chaise Lounge', sub: 'Reversible Left/Right Layout', color: '#4E6151', frame: '#18222D' },
  { file: 'royal-chesterfield.svg', title: 'Royal Chesterfield', sub: 'Diamond Hand-Tufted • Italian Velvet', color: '#18222D', frame: '#4E2C17' },
  { file: 'royal-tufting.svg', title: 'Chesterfield Tufting Detail', sub: 'Hand-Pleated Buttoning Heritage', color: '#18222D', frame: '#4E2C17' },
  { file: 'sahyadri-sofabed.svg', title: 'Sahyadri Sofa-Cum-Bed', sub: 'Hydraulic Mechanism • Foldable Queen Mattress', color: '#5C6269', frame: '#9E6738' },
  { file: 'sahyadri-bed-mode.svg', title: 'Sahyadri Queen Bed Mode', sub: 'Smooth 3-Second Hydraulic Conversion', color: '#5C6269', frame: '#9E6738' },
  { file: 'munnar-recliner.svg', title: 'Munnar Lounger Recliner', sub: 'Ergonomic Single Seater • Caramel Tan', color: '#8C4820', frame: '#222222' },
  { file: 'highrange-2seater.svg', title: 'Highrange Nordic 2-Seater', sub: 'Exposed Teak Frame • Sage Linen', color: '#7D8F7B', frame: '#B89B72' },
  { file: 'periyar-chaise.svg', title: 'Periyar Curved Chaise', sub: 'Organic Asymmetric Silhouette • Cream Bouclé', color: '#C59B97', frame: '#D4AF37' },
  { file: 'wayanad-compact.svg', title: 'Wayanad Apartment 3-Seater', sub: 'Slim 7cm Armrest • High Density Foam', color: '#1B2C42', frame: '#9E6738' },
  { file: 'anamudi-highback.svg', title: 'Anamudi High-Back Orthopedic', sub: 'Full Lumbar & Headrest Support', color: '#3E5336', frame: '#9E6738' },
  { file: 'kumarakom-daybed.svg', title: 'Kumarakom Teak Daybed', sub: 'Charupadi Slats • Jute-Cotton Mattress', color: '#786851', frame: '#A67342' },
  { file: 'travancore-suite.svg', title: 'Travancore Heritage 3+1+1', sub: 'Carved Teak Suite • Removable Cushions', color: '#611621', frame: '#3D1C16' },
  { file: 'calicut-deepseat.svg', title: 'Calicut Deep-Seat Lounger', sub: '105cm Seating Depth • Pet-Friendly Velvet', color: '#18222D', frame: '#18222D' },
];

productMap.forEach((item) => {
  const filePath = path.join(process.cwd(), 'public/images/products', item.file);
  fs.writeFileSync(filePath, createSofaSVG(item.title, item.sub, 'sofa', item.color, item.frame));
});

// Hero banners
fs.writeFileSync(
  path.join(process.cwd(), 'public/images/hero/hero-atelier.svg'),
  createHeroSVG('Mastercrafted Sofas.', 'Direct from our Erattupetta Atelier to your living room.')
);
fs.writeFileSync(
  path.join(process.cwd(), 'public/images/hero/hero-customizer.svg'),
  createHeroSVG('Customise Your Dream Sofa.', '7 bespoke steps. Endless combinations. Real-time pricing.')
);
fs.writeFileSync(
  path.join(process.cwd(), 'public/images/hero/hero-delivery.svg'),
  createHeroSVG('Factory-Direct Delivery.', 'Kerala, Tamil Nadu & Bangalore with zero transit damage.')
);

console.log('Successfully generated all brand SVG placeholders.');
