import { db } from './firebase';
import type { OrderData } from '~/types/order';
import { PRICING, DELIVERY_FEES } from './pricing';

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

// Re-export pricing constants and functions
export { PRICING, DELIVERY_FEES, calculateTotal } from './pricing';
