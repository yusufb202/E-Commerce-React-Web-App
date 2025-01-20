import { API_ENDPOINTS } from '../config/api';
import { fetchApi } from './api';
import { CartItem, PaymentDetails, ShippingDetails } from '../types';

interface CheckoutRequest {
  items: CartItem[];
  shipping: ShippingDetails;
  payment: PaymentDetails;
}

export async function checkout(data: CheckoutRequest): Promise<{ orderId: string }> {
  return fetchApi<{ orderId: string }>(API_ENDPOINTS.checkout, {
    method: 'POST',
    body: JSON.stringify(data),
  });
}