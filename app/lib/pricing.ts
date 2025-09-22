export const PRICING = {
  paperback: {
    normal: 2950,
    introductory: 2500,
  },
  hardback: {
    normal: 3500,
    introductory: 3000,
  },
};

export const DELIVERY_FEES = {
  nairobi: 300,
  kenya: 500,
};

export function calculateTotal(edition: 'paperback' | 'hardback', quantity: number, deliveryLocation: 'nairobi' | 'kenya' = 'nairobi'): number {
  const bookPrice = PRICING[edition].introductory * quantity;
  const deliveryFee = DELIVERY_FEES[deliveryLocation];
  
  return bookPrice + deliveryFee;
}
