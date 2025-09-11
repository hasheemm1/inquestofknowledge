import { collection, addDoc, doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';
import type { OrderData } from '~/types/order';

export async function createOrder(orderData: Omit<OrderData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
  try {
    const now = new Date();
    const docRef = await addDoc(collection(db, 'orders'), {
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
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
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
    const orderRef = doc(db, 'orders', orderId);
    const orderSnap = await getDoc(orderRef);
    
    if (orderSnap.exists()) {
      return {
        id: orderSnap.id,
        ...orderSnap.data(),
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
