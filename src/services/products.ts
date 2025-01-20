import { API_ENDPOINTS } from '../config/api';
import { fetchApi } from './api';
import { Product } from '../types';
import { products as localProducts } from '../data/products';

// Temporary solution using local data
// TODO: Remove this when backend is integrated
const USE_LOCAL_DATA = true;

export async function getProducts(): Promise<Product[]> {
  if (USE_LOCAL_DATA) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return localProducts;
  }
  return fetchApi<Product[]>(API_ENDPOINTS.products);
}