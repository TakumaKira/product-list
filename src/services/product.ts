import parse from 'csv-parse/lib/sync';

import http from './http';

import { dataUrl } from '../config.json';
import { Product } from '../types/product';

export async function getProducts(): Promise<Product[]> {
  const input = await http.get(dataUrl) as string;
  const products: Product[] = parse(input, {
    columns: true,
    skip_empty_lines: true
  });
  return sanitizeGenders(products);
}

export function sanitizeGenders(products: Product[]): Product[] {
  for (const product of products) {
    if (product.gender !== 'male' && product.gender !== 'female' && product.gender !== 'unisex') {
      product.gender = null;
    }
  }
  return products;
}