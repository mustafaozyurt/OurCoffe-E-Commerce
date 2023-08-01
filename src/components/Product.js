import { Link } from "react-router-dom";
import "./Product.css";

const Product = ({ name, imageUrl, price, productId }) => {
  return (
    <div className="product">
      <div className="product__header">
        <Link to={`product/${productId}`}>
          <img src={imageUrl} alt={name}></img>
        </Link>
      </div>

      <div className="product__content">
        <div className="content__title">
          <Link to={`product/${productId}`}>
            <p className="info__name">{name}</p>
          </Link>
        </div>

        <div className="content__price">
          <p className="info__price">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
