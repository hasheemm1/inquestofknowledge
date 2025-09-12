import type { OrderData } from '~/types/order';

// Mock implementation for development - replace with real Firebase in production
let mockOrders: Map<string, OrderData> = new Map();

export async function createOrder(orderData: Omit<OrderData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const now = new Date();
  
  const order: OrderData = {
    id: orderId,
    ...orderData,
    createdAt: now,
    updatedAt: now,
  };
  
  mockOrders.set(orderId, order);
  console.log('Mock order created:', orderId);
  return orderId;
}

export async function updateOrder(orderId: string, updates: Partial<OrderData>): Promise<void> {
  const existingOrder = mockOrders.get(orderId);
  if (!existingOrder) {
    throw new Error('Order not found');
  }
  
  const updatedOrder = {
    ...existingOrder,
    ...updates,
    updatedAt: new Date(),
  };
  
  mockOrders.set(orderId, updatedOrder);
  console.log('Mock order updated:', orderId);
}

export async function getOrder(orderId: string): Promise<OrderData | null> {
  const order = mockOrders.get(orderId);
  console.log('Mock order retrieved:', orderId, order ? 'found' : 'not found');
  return order || null;
}

export function calculateTotal(edition: 'paperback' | 'hardback', quantity: number): number {
  const prices = {
    paperback: 2500,
    hardback: 3500,
  };
  
  return prices[edition] * quantity;
}
