import fs from 'fs';
import path from 'path';

const SRC_DIR = './src';
const INDEX_HTML = './index.html';

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
const assetRegex = /['"](\/?assets\/[^'"]+)['"]/g;
const referencedAssets = new Set();
const assetToFiles = {};

for (const file of codeFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = assetRegex.exec(content)) !== null) {
    let assetPath = match[1];
    if (assetPath.startsWith('/')) assetPath = assetPath.slice(1);
    referencedAssets.add(assetPath);
    if (!assetToFiles[assetPath]) assetToFiles[assetPath] = new Set();
    assetToFiles[assetPath].add(path.relative('.', file).replace(/\\/g, '/'));
  }
}

console.log(`Unique asset paths found in source code: ${referencedAssets.size}`);

// Verify existence on disk
const missing = [];
const existing = [];

for (const asset of Array.from(referencedAssets).sort()) {
  const diskPath = path.join('./public', asset);
  if (fs.existsSync(diskPath)) {
    const stat = fs.statSync(diskPath);
    existing.push({ asset, diskPath, size: stat.size, files: Array.from(assetToFiles[asset]) });
  } else {
    missing.push({ asset, files: Array.from(assetToFiles[asset]) });
  }
}

console.log(`\nExisting referenced assets: ${existing.length}`);
console.log(`Missing referenced assets: ${missing.length}`);

if (missing.length > 0) {
  console.log('\n--- MISSING ASSETS (CRITICAL TO FIX) ---');
  for (const m of missing) {
    console.log(`MISSING: ${m.asset} (referenced in: ${m.files.join(', ')})`);
  }
}

console.log('\n--- EXISTING REFERENCED ASSETS ---');
for (const e of existing) {
  console.log(`${(e.size / 1024).toFixed(1)} KB: ${e.asset}`);
}

