import { db } from './firebase';
import type { OrderData } from '~/types/order';

export async function createOrder(orderData: Omit<OrderData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const now = new Date();
    const docRef = await db.collection('orders').add({
      ...orderData,
      createdAt: now,
      updatedAt: now,
    });
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw new Error('Failed to create order');
  }
}

export async function updateOrder(orderId: string, updates: Partial<OrderData>): Promise<void> {
  try {
    await db.collection('orders').doc(orderId).update({
      ...updates,
      updatedAt: new Date(),
    });
  } catch (error) {
    console.error('Error updating order:', error);
    throw new Error('Failed to update order');
  }
}

export async function getOrder(orderId: string): Promise<OrderData | null> {
  try {
    const orderDoc = await db.collection('orders').doc(orderId).get();
    
    if (orderDoc.exists) {
      return {
        id: orderDoc.id,
        ...orderDoc.data(),
      } as OrderData;
    }
    
    return null;
  } catch (error) {
    console.error('Error getting order:', error);
    throw new Error('Failed to get order');
  }
}

export function calculateTotal(edition: 'paperback' | 'hardback', quantity: number): number {
  const prices = {
    paperback: 2500,
    hardback: 3500,
  };
  
  return prices[edition] * quantity;
}
