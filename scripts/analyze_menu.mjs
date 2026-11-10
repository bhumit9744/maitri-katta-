import fs from 'fs';

const code = fs.readFileSync('src/data/menuData.js', 'utf8');
const lines = code.split('\n');

let total = 0;
let withImg = 0;
const missing = [];
let currentDish = null;

for (const line of lines) {
  const idMatch = line.match(/^\s*id:\s*['"]([^'"]+)['"]/);
  if (idMatch && !line.includes('label:')) {
    total++;
    currentDish = { id: idMatch[1] };
  }
  const nameMatch = line.match(/^\s*name:\s*['"]([^'"]+)['"]/);
  if (nameMatch && currentDish) {
    currentDish.name = nameMatch[1];
  }
  const catMatch = line.match(/^\s*category:\s*['"]([^'"]+)['"]/);
  if (catMatch && currentDish) {
    currentDish.category = catMatch[1];
  }
  const imgMatch = line.match(/^\s*image:\s*['"]([^'"]+)['"]/);
  if (imgMatch && currentDish) {
    withImg++;
    currentDish.hasImage = true;
  }
  if (line.trim() === '},' && currentDish) {
    if (!currentDish.hasImage) {
      missing.push(currentDish);
    }
    currentDish = null;
  }
}

console.log(`Total dishes: ${total}`);
console.log(`With image: ${withImg}`);
console.log(`Missing image: ${missing.length}`);
console.log(`Sample missing dishes:`, missing.slice(0, 15));

