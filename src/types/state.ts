import { Product } from "./product";

export interface State {
  currentPage: number;
  maxProductsPerPage: number;
  products: Product[];
  searchQuery: string;
}