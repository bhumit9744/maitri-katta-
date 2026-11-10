import fs from 'fs';
import path from 'path';
import https from 'https';
import http from 'http';

const DISH_DIR = path.resolve('public/assets/dishes');
if (!fs.existsSync(DISH_DIR)) {
  fs.mkdirSync(DISH_DIR, { recursive: true });
}

// Curated high quality food photography matching Zomato / Swiggy dish standards
const DISH_IMAGES = [
  // Biryani & Kepsa
  {
    name: 'mutton-dum-biryani.jpg',
    url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'chicken-kepsa.jpg',
    url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'dezaz-biryani.jpg',
    url: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=800&auto=format&fit=crop&q=80',
  },
  // Tandoor Ki Aag Se
  {
    name: 'paneer-malai-tikka.jpg',
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'paneer-tandoor-special.jpg',
    url: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'veg-sizzler-platter.jpg',
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'royal-tandoor-platter.jpg',
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'chicken-pahadi-kebab.jpg',
    url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'chicken-seekh-kebab.jpg',
    url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'tandoori-chicken.jpg',
    url: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=800&auto=format&fit=crop&q=80',
  },
  // Starters & Crispies
  {
    name: 'chicken-lovestar.jpg',
    url: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'chicken-koliwada.jpg',
    url: 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'surmai-tawa-fry.jpg',
    url: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'veg-hara-bhara-kabab.jpg',
    url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'cheese-corn-balls.jpg',
    url: 'https://images.unsplash.com/photo-1541529086526-db283c563270?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'chana-garlic-fry.jpg',
    url: 'https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'crispy-veg.jpg',
    url: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=800&auto=format&fit=crop&q=80',
  },
  // Chinese Wok
  {
    name: 'chicken-crispy.jpg',
    url: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'veg-manchurian-dry.jpg',
    url: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'chicken-chilli-dry.jpg',
    url: 'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'veg-hakka-noodles.jpg',
    url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'schezwan-fried-rice.jpg',
    url: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'triple-schezwan-rice.jpg',
    url: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop&q=80',
  },
  // Curries & Gravies
  {
    name: 'butter-chicken.jpg',
    url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'paneer-butter-masala.jpg',
    url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'kaju-curry.jpg',
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'dal-tadka.jpg',
    url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'chicken-kolhapuri.jpg',
    url: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=800&auto=format&fit=crop&q=80',
  },
  // Breads & Rice
  {
    name: 'butter-naan.jpg',
    url: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'garlic-naan.jpg',
    url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'tandoori-roti.jpg',
    url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'jeera-rice.jpg',
    url: 'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'jowar-bhakri.jpg',
    url: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?w=800&auto=format&fit=crop&q=80',
  },
  // Mocktails & Drinks
  {
    name: 'blue-lagoon.jpg',
    url: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'virgin-mojito.jpg',
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'fruit-punch.jpg',
    url: 'https://images.unsplash.com/photo-1546171753-97d7676e4602?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'cold-coffee.jpg',
    url: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'fresh-lime-soda.jpg',
    url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?w=800&auto=format&fit=crop&q=80',
  },
  // Desserts
  {
    name: 'gulab-jamun-icecream.jpg',
    url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'sizzling-brownie.jpg',
    url: 'https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'matka-kulfi.jpg',
    url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?w=800&auto=format&fit=crop&q=80',
  },
  // Agri Specials
  {
    name: 'mutton-handi.jpg',
    url: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'chicken-handi.jpg',
    url: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'egg-lapeta.jpg',
    url: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&auto=format&fit=crop&q=80',
  },
  {
    name: 'liver-lapeta.jpg',
    url: 'https://images.unsplash.com/photo-1545247181-516773cae754?w=800&auto=format&fit=crop&q=80',
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    const client = url.startsWith('https') ? https : http;
    client.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      if (response.statusCode !== 200) {
        return reject(new Error(`Status ${response.statusCode} for ${url}`));
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve(dest));
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${DISH_IMAGES.length} dish images...`);
  let successCount = 0;
  for (const item of DISH_IMAGES) {
    const targetPath = path.join(DISH_DIR, item.name);
    try {
      console.log(`Downloading ${item.name}...`);
      await downloadFile(item.url, targetPath);
      successCount++;
    } catch (err) {
      console.error(`Failed ${item.name}:`, err.message);
    }
  }
  console.log(`Done! Successfully downloaded ${successCount}/${DISH_IMAGES.length} dish images to ${DISH_DIR}`);
}

run();

