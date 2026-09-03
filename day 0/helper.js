export function multiply(a, b) {
  return a * b;
}
export function divide(a, b) {
  return a / b;
}

const prices = { laptop: 50000, phone: 30000, tablet: 20000 };
let newPrices = Object.values(prices).map((price) => price * 1.1);

console.log(newPrices);
