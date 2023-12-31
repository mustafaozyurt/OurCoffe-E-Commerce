import { Link } from "react-router-dom";
import "./CartItem.css";

const CartItem = ({ item, qtyChangeHandler, removeHandler }) => {
  const { name, imageUrl, countInStock, price, product, qty } = item;

  return (
    <div className="cartitem">
      <div className="cartitem__image">
        <img src={imageUrl} alt={name}></img>
      </div>

      <Link to={`/product/${product}`} className="cartitem__name">
        <p>{name}</p>
      </Link>

      <p className="cartitem__price">{price}</p>

      <select
        value={qty}
        onChange={(e) => qtyChangeHandler(product, e.target.value)}
      >
        {[...Array(countInStock).keys()].map((x) => (
          <option key={x + 1} value={x + 1}>
            {x + 1}
          </option>
        ))}
      </select>

      <button
        className="cartitem__deletebtn"
        onClick={() => removeHandler(product)}
      >
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default CartItem;

