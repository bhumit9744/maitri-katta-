const fs = require('fs');
const path = require('path');

// Check maitri-katta.svg base64 image
const svg = fs.readFileSync(path.join(__dirname, '../public/assets/maitri-katta.svg'), 'utf8');
const match = svg.match(/base64,([^"]+)/);
if (match) {
  fs.writeFileSync(path.join(__dirname, '../public/assets/maitri-katta-extracted.png'), Buffer.from(match[1], 'base64'));
  console.log('Extracted logo PNG from SVG, bytes:', match[1].length);
}

// List all files in public/assets and their sizes
const files = fs.readdirSync(path.join(__dirname, '../public/assets'));
console.log('Assets count:', files.length);

