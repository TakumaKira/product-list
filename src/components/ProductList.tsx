import ProductCard from "./ProductCard";
import { Product } from "../types/product";

const ProductList = ({products, onProductClick, cachedImages}: {products: Product[], onProductClick: Function, cachedImages: { [url in string]: HTMLImageElement }}) =>
  <div className="row">
    {products.map(product => (
      <div className="col my-3" key={product.gtin} onClick={() => onProductClick(product)}>
        <ProductCard product={product} cachedImages={cachedImages} />
      </div>
    ))}
  </div>;

export default ProductList;