import { Product } from "../types/product";

const ProductCard = ({product}: {product: Product}) => {
  return (
    <div className="card" style={{width: '18rem', margin: 'auto'}}>
      <img src={product.image_link} className="card-img-top" alt={product.title} style={{height: '18rem', objectFit: 'contain'}}/>
      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.gtin}</p>
        <p className="card-text">{product.gender}</p>
        <p className="card-text" style={{textDecoration: 'line-through'}}>{product.price}</p>
        <p className="card-text">{product.sale_price}</p>
      </div>
    </div>
  );
};

export default ProductCard;