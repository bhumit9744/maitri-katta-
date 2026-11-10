const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const dir = path.join(__dirname, '../public/assets');
const files = fs.readdirSync(dir).filter(f => /\.(png|jpg|webp)$/i.test(f));

for (const file of files) {
  try {
    const filePath = path.join(dir, file);
    const out = execSync(`"D:\\ffmpeg-8.1.1-essentials_build\\bin\\ffprobe.exe" -v error -select_streams v:0 -show_entries stream=width,height -of csv=s=x:p=0 "${filePath}"`).toString().trim();
    console.log(`${file}: ${out}`);
  } catch (e) {
    console.log(`${file}: error`);
  }
}

