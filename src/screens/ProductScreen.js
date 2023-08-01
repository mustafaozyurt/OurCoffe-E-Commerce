import "./ProductScreen.css";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";

//actions
import { getProductDetails } from "../redux/actions/productActions";
import { addToCart } from "../redux/actions/cartActions";

const ProductScreen = () => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.getProductDetails);
  const { loading, error, product } = productDetails;

  const { id } = useParams();
  const navigate = useNavigate();

  const coffee = product?.coffee;

  useEffect(() => {
    if (product && id !== product.coffee?._id) {
      dispatch(getProductDetails(id));
    }
  }, [dispatch, product, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(product.coffee?._id, qty));
    navigate("/cart");
  };

  return (
    <div className="productscreen">
      {loading && !product ? (
        <h2>Loading...</h2>
      ) : error ? (
        <h2>{error}</h2>
      ) : (
        <div className="productscreen__inner">
          <div className="productscreen__left">
            <div className="left__image">
              <img src={coffee?.imageUrl} alt={coffee?.name}></img>
            </div>
          </div>

          <div className="productscreen__right">
            <div className="productscreen__right__inner">
              <div className="product__header">
                <h2>{coffee?.name}</h2>
                <h2>${coffee?.price}</h2>
              </div>

              <div className="product__description">
                <h3>{coffee?.description}</h3>
                <h4>{coffee?.text}</h4>
                <h3>
                  Type:
                  {coffee?.coffee_type === "flavored" ? (
                    <span>
                      Flavored <i className="fas fa-candy-cane"></i>
                    </span>
                  ) : (
                    <span>
                      Classic <i className="fas fa-mug-hot"></i>
                    </span>
                  )}
                </h3>
                <h4>
                  Favorite:
                  {coffee?.isFav ? (
                    <span className="status-ok">Yes</span>
                  ) : (
                    <span className="status-ok not">No</span>
                  )}
                </h4>
                <h4>
                  Status:
                  {coffee?.countInStock > 0 ? (
                    <span className="status-ok">In Stock</span>
                  ) : (
                    <span className="status-ok not">Out Of Stock</span>
                  )}
                </h4>
              </div>

              <div className="product__addToCart">
                <div className="product__addToCart__inner">
                  <div className="product__addToCart__qty">
                    <h4>
                      Qty:
                      <select
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                      >
                        {[...Array(coffee?.countInStock).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </h4>
                  </div>
                  <div className="product__addToCart__button">
                    <h4>
                      <button type="button" onClick={addToCartHandler}>
                        Add To Cart
                      </button>
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
