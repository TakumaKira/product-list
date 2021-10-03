import ProductCard from "./ProductCard";
import { Product } from "../types/product";

const ProductList = ({products, onProductClick}: {products: Product[], onProductClick: Function}) =>
  <div className="row">
    {products.map(product => (
      <div className="col my-3" key={product.gtin} onClick={() => onProductClick(product)}>
        <ProductCard product={product} />
      </div>
    ))}
  </div>;

export default ProductList;