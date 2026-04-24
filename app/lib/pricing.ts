export function calculatePrice(totalItems: number) {
  const packs = Math.floor(totalItems / 3);
  const remainder = totalItems % 3;
  return packs * 40 + remainder * 15;
}

export function calculateSavings(totalItems: number) {
  const normalPrice = totalItems * 15;
  const finalPrice = calculatePrice(totalItems);
  return normalPrice - finalPrice;
}