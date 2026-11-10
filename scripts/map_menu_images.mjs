import fs from 'fs';

let content = fs.readFileSync('src/data/menuData.js', 'utf8');

const imageMapping = {
  // Agri
  'agri-liver-petha-lapeta': '/assets/dishes/liver-lapeta.jpg',
  'agri-egg-lapeta': '/assets/dishes/egg-lapeta.jpg',
  'agri-mutton-handi': '/assets/dishes/mutton-handi.jpg',
  'agri-chicken-handi': '/assets/dishes/chicken-handi.jpg',
  
  // Biryani & Kepsa
  'chicken-kepsa': '/assets/dishes/chicken-kepsa.jpg',
  'mutton-biryani': '/assets/dishes/mutton-dum-biryani.jpg',
  'dezaz-biryani': '/assets/dishes/dezaz-biryani.jpg',
  'veg-dum-biryani': '/assets/veg-biryani.png',

  // Tandoor
  'paneer-malai-tikka': '/assets/dishes/paneer-malai-tikka.jpg',
  'paneer-tandoor-special': '/assets/dishes/paneer-tandoor-special.jpg',
  'veg-sizzler-kabab-platter': '/assets/dishes/veg-sizzler-platter.jpg',
  'non-veg-tandoor-platter': '/assets/dishes/royal-tandoor-platter.jpg',
  'chicken-pahadi-kebab': '/assets/dishes/chicken-pahadi-kebab.jpg',
  'chicken-seekh-kebab': '/assets/dishes/chicken-seekh-kebab.jpg',
  'tandoori-chicken-half-full': '/assets/dishes/tandoori-chicken.jpg',

  // Starters
  'chicken-lovestar': '/assets/dishes/chicken-lovestar.jpg',
  'chicken-koliwada': '/assets/dishes/chicken-koliwada.jpg',
  'surmai-tawa-fry': '/assets/dishes/surmai-tawa-fry.jpg',
  'veg-hara-bhara-kabab': '/assets/dishes/veg-hara-bhara-kabab.jpg',
  'cheese-corn-ball': '/assets/dishes/cheese-corn-balls.jpg',
  'chana-garlic-fry': '/assets/dishes/chana-garlic-fry.jpg',
  'crispy-veg': '/assets/dishes/crispy-veg.jpg',

  // Chinese
  'chicken-crispy': '/assets/dishes/chicken-crispy.jpg',
  'veg-manchurian-dry': '/assets/dishes/veg-manchurian-dry.jpg',
  'chicken-chilli-dry': '/assets/dishes/chicken-chilli-dry.jpg',
  'veg-hakka-noodles': '/assets/dishes/veg-hakka-noodles.jpg',
  'chicken-schezwan-noodles': '/assets/dishes/schezwan-fried-rice.jpg',
  'chicken-triple-schezwan': '/assets/dishes/triple-schezwan-rice.jpg',

  // Curries
  'butter-chicken': '/assets/dishes/butter-chicken.jpg',
  'paneer-butter-masala': '/assets/dishes/paneer-butter-masala.jpg',
  'kaju-curry': '/assets/dishes/kaju-curry.jpg',
  'dal-tadka': '/assets/dishes/dal-tadka.jpg',
  'chicken-kolhapuri': '/assets/dishes/chicken-kolhapuri.jpg',

  // Breads & Rice
  'butter-naan': '/assets/dishes/butter-naan.jpg',
  'garlic-naan': '/assets/dishes/garlic-naan.jpg',
  'tandoori-roti': '/assets/dishes/tandoori-roti.jpg',
  'jeera-rice': '/assets/dishes/jeera-rice.jpg',
  'jowar-bhakri': '/assets/dishes/jowar-bhakri.jpg',

  // Mocktails
  'blue-lagoon': '/assets/dishes/blue-lagoon.jpg',
  'virgin-mojito': '/assets/dishes/virgin-mojito.jpg',
  'fruit-punch': '/assets/dishes/fruit-punch.jpg',
  'cold-coffee': '/assets/dishes/cold-coffee.jpg',
  'fresh-lime-soda': '/assets/dishes/fresh-lime-soda.jpg',

  // Desserts
  'gulab-jamun-ice-cream': '/assets/dishes/gulab-jamun-icecream.jpg',
  'sizzling-brownie': '/assets/dishes/sizzling-brownie.jpg',
  'matka-kulfi': '/assets/dishes/matka-kulfi.jpg'
};

// Check which IDs exist in content and whether they already have image
let updatedCount = 0;
for (const [id, imgPath] of Object.entries(imageMapping)) {
  const itemRegex = new RegExp(`(id:\\s*['"]${id}['"][\\s\\S]*?)(description:[^,\n]+(?:,)?)([\\s\\S]*?image:[^,\n]+)?`, 'm');
  
  // Find the dish block
  const blockRegex = new RegExp(`(\\{[\\s\\S]*?id:\\s*['"]${id}['"][\\s\\S]*?\\},)`, 'm');
  const match = content.match(blockRegex);
  if (match) {
    let block = match[1];
    if (block.includes('image:')) {
      // Replace existing image if any
      block = block.replace(/image:\s*['"][^'"]+['"]/, `image: '${imgPath}'`);
    } else {
      // Insert image before the closing },
      block = block.replace(/(\n\s*description:[^\n]+)/, `$1\n    image: '${imgPath}',`);
    }
    content = content.replace(match[1], block);
    updatedCount++;
  } else {
    console.log(`Could not find dish with id: ${id}`);
  }
}

fs.writeFileSync('src/data/menuData.js', content, 'utf8');
console.log(`Successfully updated ${updatedCount} dish images in src/data/menuData.js`);

