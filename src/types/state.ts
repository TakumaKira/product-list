import { Product } from "./product";

export interface State {
  additionalImageUrls: string[];
  currentPage: number;
  maxProductsPerPage: number;
  products: Product[];
  searchQuery: string;
  showAdditionalImage: boolean;
}