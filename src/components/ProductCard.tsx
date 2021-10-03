import { Product } from "../types/product";
import AsyncImage from './AsyncImage';

const ProductCard = ({product}: {product: Product}) =>
  <div className="card" style={{width: '300px', margin: 'auto'}}>
    <AsyncImage
      src={product.image_link}
      className="card-img-top"
      width={300}
      height={300}
      bgColor={'hsl(0, 0%, 100%)'}
      preloadBgColor={'hsl(0, 0%, 75%)'}
    />
    <div className="card-body">
      <h5 className="card-title">{product.title}</h5>
      <p className="card-text">{product.gtin}</p>
      <p className="card-text">{product.gender}</p>
      <p className="card-text" style={{textDecoration: 'line-through'}}>{product.price}</p>
      <p className="card-text">{product.sale_price}</p>
    </div>
  </div>;

export default ProductCard;