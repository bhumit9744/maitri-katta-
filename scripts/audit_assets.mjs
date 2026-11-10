import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';
const PUBLIC_DIR = './public';
const INDEX_HTML = './index.html';

// 1. Gather all source files
function getFiles(dir, exts = ['.jsx', '.js', '.css', '.html']) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getFiles(fullPath, exts));
    } else if (exts.includes(path.extname(fullPath))) {
      results.push(fullPath);
    }
  }
  return results;
}

const codeFiles = [...getFiles(SRC_DIR), INDEX_HTML];

// Read all code contents
let combinedCode = '';
for (const file of codeFiles) {
  combinedCode += '\n' + fs.readFileSync(file, 'utf8');
}

// 2. Gather all files in public
function getAllPublicFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(getAllPublicFiles(fullPath));
    } else {
      results.push(fullPath);
    }
  }
  return results;
}

const publicFiles = getAllPublicFiles(PUBLIC_DIR);

console.log(`Total public files found: ${publicFiles.length}`);

const referenced = [];
const unreferenced = [];

for (const pFile of publicFiles) {
  const relPath = path.relative(PUBLIC_DIR, pFile).replace(/\\/g, '/');
  const basename = path.basename(pFile);
  const size = fs.statSync(pFile).size;

  // Search for the relative path (e.g. "/assets/mutton-lapeta.png" or "assets/mutton-lapeta.png" or basename)
  const isRef = combinedCode.includes(relPath) || combinedCode.includes('/' + relPath) || combinedCode.includes(basename);
  
  if (isRef) {
    referenced.push({ path: pFile, relPath, basename, size });
  } else {
    unreferenced.push({ path: pFile, relPath, basename, size });
  }
}

const totalPublicSize = publicFiles.reduce((acc, f) => acc + fs.statSync(f).size, 0);
const referencedSize = referenced.reduce((acc, f) => acc + f.size, 0);
const unrefSize = unreferenced.reduce((acc, f) => acc + f.size, 0);

console.log(`Total public directory size: ${(totalPublicSize / (1024 * 1024)).toFixed(2)} MB`);
console.log(`Referenced assets count: ${referenced.length} (${(referencedSize / (1024 * 1024)).toFixed(2)} MB)`);
console.log(`Unreferenced assets count: ${unreferenced.length} (${(unrefSize / (1024 * 1024)).toFixed(2)} MB)`);

console.log('\n--- TOP UNREFERENCED ASSETS BY SIZE ---');
unreferenced.sort((a, b) => b.size - a.size);
for (const item of unreferenced.slice(0, 30)) {
  console.log(`${(item.size / (1024 * 1024)).toFixed(2)} MB: ${item.relPath}`);
}

