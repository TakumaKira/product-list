import ProductCard from "./ProductCard";
import { Product } from "../types/product";

const ProductList = ({products}: {products: Product[]}) =>
  <div className="row">
    {products.map(product => (
      <div className="col my-3" key={product.gtin}>
        <ProductCard product={product}/>
      </div>
    ))}
  </div>;

export default ProductList;