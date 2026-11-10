import fs from 'fs';

const code = fs.readFileSync('src/data/menuData.js', 'utf8');
const lines = code.split('\n');

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  if (line.includes('id:') && !line.includes('label:')) {
    const id = line.match(/id:\s*['"]([^'"]+)['"]/)?.[1];
    let name = '';
    let category = '';
    let hasImage = false;
    for (let j = i; j < Math.min(i + 15, lines.length); j++) {
      if (lines[j].includes('name:')) name = lines[j].match(/name:\s*['"]([^'"]+)['"]/)?.[1];
      if (lines[j].includes('category:')) category = lines[j].match(/category:\s*['"]([^'"]+)['"]/)?.[1];
      if (lines[j].includes('image:')) hasImage = true;
      if (lines[j].trim() === '},') break;
    }
    console.log(`${id} | ${name} | ${category} | image: ${hasImage}`);
  }
}

