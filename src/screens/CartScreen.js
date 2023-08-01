import "./CartScreen.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

//Components
import CartItem from "../components/CartItem";
import SortSelect from "../components/SortSelect";

// actions
import { addToCart, removeFromCart } from "../redux/actions/cartActions";

const CartScreen = () => {
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [sortedCartItems, setSortedCartItems] = useState([]);

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    const sortCartItems = () => {
      const sortedItems = [...cartItems];

      switch (selectedSortOption) {
        case "a-z":
          sortedItems.sort((a, b) => a.name.localeCompare(b.name));
          break;
        case "z-a":
          sortedItems.sort((a, b) => b.name.localeCompare(a.name));
          break;
        case "price-asc":
          sortedItems.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          sortedItems.sort((a, b) => b.price - a.price);
          break;
        default:
          break;
      }

      return sortedItems;
    };

    const sortedItems = sortCartItems();
    setSortedCartItems(sortedItems);
  }, [cartItems, selectedSortOption]);

  const qtyChangeHandler = (id, qty) => {
    dispatch(addToCart(id, qty));
  };

  const removeHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const getCartCount = () => {
    let cartCount = 0;

    cartItems?.map((item) => (cartCount += Number(item.qty)));

    return cartCount;
  };

  const getTotalBudget = () => {
    let totalBudget = 0;

    cartItems?.map((item) => (totalBudget += Number(item.qty * item.price)));

    return totalBudget;
  };
  return (
    <div className="cartscreen">
      <div className="cartscreen__inner">
        <div className="cartscreen__left">
          <div className="cartscreen__left__header">
            <div className="cartscreen__left__header__title">
              <h2>Shopping Cart</h2>
            </div>
            <div className="cartscreen__left__header__sort">
              <SortSelect
                onChange={(e) => setSelectedSortOption(e.target.value)}
              />
            </div>
          </div>
          {cartItems?.length === 0 ? (
            <div>
              Your cart is empty <Link to="/">Go Back</Link>
            </div>
          ) : (
            sortedCartItems?.map((item) => (
              <CartItem
                key={item.product}
                item={item}
                qtyChangeHandler={qtyChangeHandler}
                removeHandler={removeHandler}
              />
            ))
          )}
        </div>
        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal {getCartCount()} items</p>
            <p>${getTotalBudget()}</p>
          </div>
          <div>
            <button>Proceed To Checkout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
