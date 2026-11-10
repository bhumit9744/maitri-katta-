import fs from 'fs';
import path from 'path';

const PUBLIC_DIR = './public';
const ARCHIVE_DIR = './archive_raw_assets';
const AUDIT_SCRIPT = './scripts/detailed_asset_audit.mjs';

// 1. Gather all referenced assets from code
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

for (const file of codeFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = assetRegex.exec(content)) !== null) {
    let assetPath = match[1];
    if (assetPath.startsWith('/')) assetPath = assetPath.slice(1);
    referencedAssets.add(assetPath.replace(/\\/g, '/'));
  }
}

// Ensure critical brand files & patterns are always protected
const protectedFiles = [
  'assets/maitri-katta.svg',
  'assets/maitri-katta-logo-transparent.png',
  'assets/maitri-katta-logo-original.png',
  'assets/maitri-food-doodle-pattern.svg',
  'assets/maitri-heritage-pattern.svg',
  'assets/hero-maitri-facade.jpg',
  'assets/brand-story-mudra-hand-transparent.png'
];

protectedFiles.forEach(f => referencedAssets.add(f));

console.log(`Protected & actively referenced assets count: ${referencedAssets.size}`);

// Ensure archive dir exists
if (!fs.existsSync(ARCHIVE_DIR)) {
  fs.mkdirSync(ARCHIVE_DIR, { recursive: true });
}

// 2. Scan public directory
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

const allPublic = getAllPublicFiles(PUBLIC_DIR);
let movedCount = 0;
let movedBytes = 0;
const movedLog = [];

for (const fullPath of allPublic) {
  const relPath = path.relative(PUBLIC_DIR, fullPath).replace(/\\/g, '/');

  // Check if actively referenced
  if (referencedAssets.has(relPath)) {
    continue; // Keep safely in public!
  }

  // Not referenced in code -> move to archive
  const targetPath = path.join(ARCHIVE_DIR, relPath);
  const targetDir = path.dirname(targetPath);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const size = fs.statSync(fullPath).size;
  fs.renameSync(fullPath, targetPath);
  movedCount++;
  movedBytes += size;
  movedLog.push({ relPath, size });
}

// Clean empty directories in public
function cleanEmptyDirs(dir) {
  const list = fs.readdirSync(dir);
  for (const item of list) {
    const full = path.join(dir, item);
    if (fs.statSync(full).isDirectory()) {
      cleanEmptyDirs(full);
      if (fs.readdirSync(full).length === 0) {
        fs.rmdirSync(full);
      }
    }
  }
}
cleanEmptyDirs(PUBLIC_DIR);

console.log(`Safely moved ${movedCount} unreferenced files to archive_raw_assets/`);
console.log(`Total public space saved: ${(movedBytes / (1024 * 1024)).toFixed(2)} MB`);

// Write record
fs.writeFileSync(
  './archive_raw_assets/MOVED_FILES_RECORD.json',
  JSON.stringify({ movedCount, movedBytesMB: (movedBytes / (1024 * 1024)).toFixed(2), files: movedLog }, null, 2)
);

