export interface OrderData {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  edition: 'paperback' | 'hardback';
  quantity: number;
  totalAmount: number;
  mpesaCode?: string;
  mpesaPhone?: string;
  status: 'pending' | 'payment_confirmed' | 'shipped' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  mpesaCode?: string;
  mpesaPhone?: string;
}
