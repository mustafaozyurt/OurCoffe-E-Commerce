import "./SideDrawer.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const SideDrawer = ({ show,click }) => {
  const sideDrawerClass = ["sidedrawer"];

  if (show) {
    sideDrawerClass.push("show");
  }

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    let cartCount = 0;

    cartItems?.map((item) => (cartCount += Number(item.qty)));

    return cartCount;
  };

  return <div className={sideDrawerClass.join(" ")}>
    <ul className="sidedrawer__links" onClick={click}>
      <li>
      <Link to="/cart">
        <i className="fas fa-shopping-cart"></i>
        <span>
          Cart
          <span className="sidedrawer__cartbadge">{getCartCount()}</span>
        </span>
      </Link>
      </li>
      <li>
        <Link to="/">Shop</Link>
      </li>
    </ul>
  </div>;
};

export default SideDrawer;
