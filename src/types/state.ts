import { Product } from "./product";

export interface State {
  maxProducts: number;
  products: Product[];
  searchQuery: string;
}