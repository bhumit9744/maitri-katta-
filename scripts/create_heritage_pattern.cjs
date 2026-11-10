const fs = require('fs');

// High-end seamless Indian Jaali & Botanical Floral Trellis Pattern (64x64)
// Perfectly tiles horizontally and vertically with zero seams
const svgPattern = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
  <defs>
    <!-- Sub-element reusable floret -->
    <g id="lotus-floret">
      <circle cx="0" cy="0" r="2.2" fill="#241915" fill-opacity="0.12" />
      <circle cx="0" cy="0" r="1.1" fill="#FFC900" fill-opacity="0.35" />
      <path d="M0 -7 C-2 -4 -2 -2 0 0 C2 -2 2 -4 0 -7 Z" fill="#241915" fill-opacity="0.10" />
      <path d="M0 7 C-2 4 -2 2 0 0 C2 2 2 4 0 7 Z" fill="#241915" fill-opacity="0.10" />
      <path d="M-7 0 C-4 -2 -2 -2 0 0 C-2 2 -4 2 -7 0 Z" fill="#241915" fill-opacity="0.10" />
      <path d="M7 0 C4 -2 2 -2 0 0 C2 2 4 2 7 0 Z" fill="#241915" fill-opacity="0.10" />
    </g>
  </defs>

  <!-- Base Lattice Lines -->
  <g fill="none" stroke="#241915" stroke-width="0.8" opacity="0.11">
    <!-- Diamond Grid -->
    <path d="M32 0 L64 32 L32 64 L0 32 Z" />
    <path d="M0 0 L64 64" stroke-dasharray="1 3" stroke-width="0.5" opacity="0.6" />
    <path d="M64 0 L0 64" stroke-dasharray="1 3" stroke-width="0.5" opacity="0.6" />

    <!-- Interlocking Moorish / Indian Arch Contours -->
    <path d="M0 0 C16 16 16 16 32 0 C48 16 48 16 64 0" />
    <path d="M0 64 C16 48 16 48 32 64 C48 48 48 48 64 64" />
    <path d="M0 0 C16 16 16 16 0 32 C16 48 16 48 0 64" />
    <path d="M64 0 C48 16 48 16 64 32 C48 48 48 48 64 64" />

    <!-- Inner Concentric Diamond -->
    <path d="M32 14 L50 32 L32 50 L14 32 Z" stroke-width="0.6" opacity="0.7" />
  </g>

  <!-- Crimson Accent Accents at intersection nodes -->
  <g fill="#9C171C" opacity="0.13">
    <circle cx="32" cy="0" r="1.5" />
    <circle cx="64" cy="32" r="1.5" />
    <circle cx="32" cy="64" r="1.5" />
    <circle cx="0" cy="32" r="1.5" />
  </g>

  <!-- Center Lotus Floret -->
  <use href="#lotus-floret" x="32" y="32" />

  <!-- Corner Lotus Florets (to seamlessly bridge tiles) -->
  <use href="#lotus-floret" x="0" y="0" />
  <use href="#lotus-floret" x="64" y="0" />
  <use href="#lotus-floret" x="0" y="64" />
  <use href="#lotus-floret" x="64" y="64" />
</svg>`;

fs.writeFileSync('public/assets/maitri-heritage-pattern.svg', svgPattern);
console.log('Successfully generated public/assets/maitri-heritage-pattern.svg');

