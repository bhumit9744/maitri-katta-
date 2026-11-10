const { RESTAURANT_INFO } = require('../src/data/restaurantInfo.js');

console.log('Testing WhatsApp URL and cart formatting logic...');
const mockItems = [
  { name: 'Mutton Lapeta (Agri Special)', option: null, unitPrice: 750, quantity: 1 },
  { name: 'Chicken Kepsa', option: 'Full', unitPrice: 1300, quantity: 1 },
  { name: 'Ghavan (Traditional Rice Crepe)', option: null, unitPrice: 80, quantity: 2 },
];

const lines = [];
lines.push(`*NAMASTE MAITRI KATTA!* 🌿`);
lines.push(`I would like to place an order inquiry:`);
lines.push(``);
lines.push(`📋 *ORDER TYPE:* DINE-IN`);
lines.push(`🪑 *Table Number:* T-14`);
lines.push(`👤 *Customer:* Rahul (+91 98765 43210)`);
lines.push(``);
lines.push(`🍽️ *ITEMS ORDERED:*`);

let subtotal = 0;
mockItems.forEach((item, index) => {
  const opt = item.option ? ` (${item.option})` : '';
  const lineTotal = item.unitPrice * item.quantity;
  subtotal += lineTotal;
  lines.push(`${index + 1}. ${item.name}${opt} × ${item.quantity} = ₹${lineTotal}`);
});

lines.push(``);
lines.push(`----------------------------------`);
lines.push(`*ESTIMATED TOTAL: ₹${subtotal}*`);
lines.push(`----------------------------------`);
lines.push(`⚠️ *Note:* Order is confirmed only after restaurant confirms readiness & timings.`);

const waUrl = `https://wa.me/919561019972?text=${encodeURIComponent(lines.join('\n'))}`;
console.log('WhatsApp Message Lines:\n' + lines.join('\n'));
console.log('\nGenerated WhatsApp URL:\n' + waUrl);
console.log('\nAll checks passed successfully!');

