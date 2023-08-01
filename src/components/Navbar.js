import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ click }) => {
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const getCartCount = () => {
    let cartCount = 0;

    cartItems?.map((item) => (cartCount += Number(item.qty)));

    return cartCount;
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar__logo">
        <h2>
          Our Coffee <i className="fas fa-mug-hot" />
        </h2>
      </div>

      {/* Links */}
      <ul className="navbar__links">
        <li>
          <Link to="/" className="shop__link">
            Shop
          </Link>
        </li>
        <li>
          <Link to="/cart" className="cart__link">
            <i className="fas fa-shopping-cart" />
            <span>
              Cart
              <span className="cartlogo__badge">{getCartCount()}</span>
            </span>
          </Link>
        </li>
      </ul>

      {/* Hamburger Menu */}
      <div className="hamburger__menu" onClick={click}>
        <i className="fas fa-bars" />
      </div>
    </nav>
  );
};

export default Navbar;
