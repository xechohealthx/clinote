// Script to generate extension icons
// This would typically be run with a tool like canvas or svg2png
// For now, this serves as documentation for icon requirements

const iconSpecs = {
  '16': { size: 16, usage: 'Extension toolbar' },
  '32': { size: 32, usage: 'Windows taskbar' },
  '48': { size: 48, usage: 'Extension management page' },
  '128': { size: 128, usage: 'Chrome Web Store' }
};

const iconDesign = {
  concept: 'Medical stethoscope with audio wave',
  colors: {
    primary: '#3b82f6',
    secondary: '#1d4ed8',
    accent: '#ffffff'
  },
  elements: [
    'Stethoscope silhouette',
    'Audio waveform pattern',
    'Medical cross symbol',
    'Clean, professional appearance'
  ]
};

console.log('Clinote Extension Icon Specifications:');
console.log(JSON.stringify({ iconSpecs, iconDesign }, null, 2));

// SVG template for icon generation
const svgTemplate = `
<svg width="128" height="128" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3b82f6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1d4ed8;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Background circle -->
  <circle cx="64" cy="64" r="60" fill="url(#gradient)" />
  
  <!-- Stethoscope head -->
  <circle cx="64" cy="45" r="12" fill="none" stroke="white" stroke-width="3" />
  
  <!-- Stethoscope tubes -->
  <path d="M 52 45 Q 40 60 45 80 Q 50 95 64 95 Q 78 95 83 80 Q 88 60 76 45" 
        fill="none" stroke="white" stroke-width="3" stroke-linecap="round" />
  
  <!-- Earpieces -->
  <circle cx="45" cy="82" r="6" fill="white" />
  <circle cx="83" cy="82" r="6" fill="white" />
  
  <!-- Audio wave indicator -->
  <path d="M 20 64 L 25 60 L 30 68 L 35 58 L 40 70" 
        fill="none" stroke="white" stroke-width="2" stroke-linecap="round" opacity="0.8" />
</svg>
`;

console.log('\nSVG Template:');
console.log(svgTemplate);