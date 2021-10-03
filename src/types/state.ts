import { Product } from "./product";

export interface State {
  additionalImageUrls: string[];
  currentPage: number;
  gender: 'all' | 'male' | 'female' | 'unisex';
  maxProductsPerPage: number;
  products: Product[];
  searchQuery: string;
  showAdditionalImage: boolean;
}