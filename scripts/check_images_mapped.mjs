import fs from 'fs';

const code = fs.readFileSync('src/data/menuData.js', 'utf8');
const lines = code.split('\n');
let curId = '';
for (let i = 0; i < lines.length; i++) {
  if (lines[i].includes('id:') && !lines[i].includes('label:')) {
    curId = lines[i].match(/id:\s*['"]([^'"]+)['"]/)?.[1];
  }
  if (lines[i].includes('image:')) {
    console.log(`${curId} --> ${lines[i].trim()}`);
  }
}

