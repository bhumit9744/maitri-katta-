import fs from 'fs';

let content = fs.readFileSync('src/data/menuData.js', 'utf8');

const imageMapping = {
  // Agri
  'agri-mutton-handi': '/assets/dishes/mutton-handi.jpg',
  'agri-chicken-handi': '/assets/dishes/chicken-handi.jpg',
  'agri-liver-petha-lapeta': '/assets/dishes/liver-lapeta.jpg',
  'agri-egg-lapeta': '/assets/dishes/egg-lapeta.jpg',

  // Biryani & Kepsa
  'chicken-kepsa': '/assets/dishes/chicken-kepsa.jpg',
  'mutton-biryani': '/assets/dishes/mutton-dum-biryani.jpg',
  'dezaz-biryani': '/assets/dishes/dezaz-biryani.jpg',

  // Tandoor
  'paneer-malai-tikka': '/assets/dishes/paneer-malai-tikka.jpg',
  'paneer-tandoor-special': '/assets/dishes/paneer-tandoor-special.jpg',
  'veg-sizzler-kabab-platter': '/assets/dishes/veg-sizzler-platter.jpg',
  'non-veg-tandoor-platter': '/assets/dishes/royal-tandoor-platter.jpg',

  // Starters
  'chicken-lovestar': '/assets/dishes/chicken-lovestar.jpg',
  'chicken-koliwada': '/assets/dishes/chicken-koliwada.jpg',
  'surmai-tawa-fry': '/assets/dishes/surmai-tawa-fry.jpg',
  'veg-hara-bhara-kabab': '/assets/dishes/veg-hara-bhara-kabab.jpg',
  'cheese-corn-ball': '/assets/dishes/cheese-corn-balls.jpg',
  'chana-garlic-fry': '/assets/dishes/chana-garlic-fry.jpg',

  // Chinese
  'chicken-crispy': '/assets/dishes/chicken-crispy.jpg',
  'chicken-chilli': '/assets/dishes/chicken-chilli-dry.jpg',
  'paneer-chilli': '/assets/dishes/paneer-tandoor-special.jpg',
  'veg-manchurian': '/assets/dishes/veg-manchurian-dry.jpg',
  'chicken-hakka-noodles': '/assets/dishes/veg-hakka-noodles.jpg',
  'veg-triple-schezwan-rice': '/assets/dishes/triple-schezwan-rice.jpg',

  // Curries
  'butter-chicken': '/assets/dishes/butter-chicken.jpg',
  'mutton-rara': '/assets/dishes/mutton-handi.jpg',
  'chicken-kolhapuri': '/assets/dishes/chicken-kolhapuri.jpg',
  'chicken-tikka-masala': '/assets/dishes/butter-chicken.jpg',
  'paneer-butter-masala': '/assets/dishes/paneer-butter-masala.jpg',
  'paneer-tikka-masala': '/assets/dishes/paneer-butter-masala.jpg',
  'veg-maratha': '/assets/dishes/kaju-curry.jpg',
  'dal-tadka': '/assets/dishes/dal-tadka.jpg',
  'shev-bhaji': '/assets/dishes/dal-tadka.jpg',

  // Breads & Rice
  'bhakri': '/assets/dishes/jowar-bhakri.jpg',
  'garlic-naan': '/assets/dishes/garlic-naan.jpg',
  'cheese-garlic-naan': '/assets/dishes/garlic-naan.jpg',
  'butter-roti': '/assets/dishes/tandoori-roti.jpg',
  'dal-khichdi-tadka': '/assets/dishes/jeera-rice.jpg',
  'steam-rice': '/assets/dishes/jeera-rice.jpg',

  // Mocktails
  'maitri-katta-special-mocktail': '/assets/dishes/fruit-punch.jpg',
  'blue-sea-mocktail': '/assets/dishes/blue-lagoon.jpg',
  'orange-peach-snap': '/assets/dishes/fruit-punch.jpg',
  'mint-mojito': '/assets/dishes/virgin-mojito.jpg',
  'passionate-ice-tea': '/assets/dishes/fruit-punch.jpg',
  'fresh-lime-soda': '/assets/dishes/fresh-lime-soda.jpg',
  'punjabi-lassi': '/assets/dishes/cold-coffee.jpg',

  // Desserts
  'sizzling-brownie': '/assets/dishes/sizzling-brownie.jpg',
  'mataka-kulfi': '/assets/dishes/matka-kulfi.jpg',
  'gulab-jamun': '/assets/dishes/gulab-jamun-icecream.jpg',
  'oreo-shake': '/assets/dishes/cold-coffee.jpg',
  'cold-coffee-ice-cream': '/assets/dishes/cold-coffee.jpg',
};

// Process each dish in content
for (const [id, imgPath] of Object.entries(imageMapping)) {
  // Regex to find the object block for this id
  const regex = new RegExp(`(\\{[\\s\\S]*?id:\\s*['"]${id}['"][\\s\\S]*?\\},)`, 'g');
  content = content.replace(regex, (match) => {
    if (match.includes('image:')) {
      return match.replace(/image:\s*['"][^'"]+['"]/, `image: '${imgPath}'`);
    } else {
      // add image property right after description or price
      return match.replace(/(\n\s*description:[^\n]+(?:,)?)/, `$1\n    image: '${imgPath}',`);
    }
  });
}

fs.writeFileSync('src/data/menuData.js', content, 'utf8');
console.log('Successfully updated all dish images in menuData.js!');

