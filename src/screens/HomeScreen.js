import "./HomeScreen.css";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

// Compnents
import Product from "../components/Product";
import Category from "../components/Category";

// Actions
import { getProducts as listProducts } from "../redux/actions/productActions";
import SortSelect from "../components/SortSelect";

const HomeScreen = () => {
  const click = false;

  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSortOption, setSelectedSortOption] = useState("");
  const [showCategoriesMobile, setShowCategoriesMobile] = useState(click);
  const [button, setButton] = useState(true);

  const categories = ["All", "Favorite", "Classic", "Flavored"];

  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(
    (state) => state.getProducts
  );
  const coffees = products?.coffees;

  const showButton = () => {
    if (window.innerWidth <= 992) {
      setButton(true);
    } else {
      setButton(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let queryParams = "";

        switch (selectedCategory) {
          case "Favorite":
            queryParams = "isFav=true";
            break;
          case "Classic":
            queryParams = "coffee_type=classic";
            break;
          case "Flavored":
            queryParams = "coffee_type=flavored";
            break;
          default:
            queryParams = "";
        }

        setQuery(`${queryParams}&sort=${selectedSortOption}`);

        dispatch(listProducts(query));
      } catch (err) {
        console.error(`error: ${err}`);
      }
    };

    fetchData();
    showButton();
  }, [dispatch, selectedCategory, selectedSortOption, query]);

  window.addEventListener("resize", showButton);

  return (
    <div className="homescreen">
      <section className="products">
        <div className="products__inner">
          <section className="products__header">
            <div className="products__count">
              <p>{coffees?.length} Products</p>
            </div>

            <div
              className="categories__mobile"
              onClick={() => setShowCategoriesMobile(!showCategoriesMobile)}
            >
              <button type="submit">Categorize</button>
            </div>

            <div className="products__sort">
              <SortSelect
                onChange={(e) => setSelectedSortOption(e.target.value)}
              />
            </div>
          </section>

          <section
            className={
              showCategoriesMobile && button
                ? "categories__active"
                : "categories"
            }
          >
            {categories.map((category) => (
              <Category
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={
                  selectedCategory === category
                    ? "category selected"
                    : "category"
                }
              >
                {category} Coffees
              </Category>
            ))}
          </section>

          <section className="products__content">
            {loading ? (
              <h2>Loading...</h2>
            ) : error ? (
              <h2>{error}</h2>
            ) : coffees?.length === 0 ? (
              <h2>No Products Found</h2>
            ) : (
              coffees?.map((product) => (
                <Product
                  key={product._id}
                  name={product.name}
                  imageUrl={product.imageUrl}
                  productId={product._id}
                  price={product.price}
                />
              ))
            )}
          </section>
        </div>
      </section>
    </div>
  );
};

export default HomeScreen;
