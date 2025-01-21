export const  API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  products: '/products',
  orders: '/orders',
  checkout: '/orders/checkout',
  register: '/User/register',
} as const;