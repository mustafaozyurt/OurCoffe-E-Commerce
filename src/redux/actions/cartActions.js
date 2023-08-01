import * as actionTypes from "../constants/cartConstants";

import axios from "axios";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `http://localhost:5000/coffees/${id}`,
    headers: {
      "Content-Type": "application/json",
    },
  };

  const coffees = await axios.request(config).then((response) => {
    return response.data;
  });

  const data = coffees?.coffee;

  dispatch({
    type: actionTypes.ADD_TO_CART,
    payload: {
      product: data?._id,
      name: data?.name,
      imageUrl: data?.imageUrl,
      price: data?.price,
      countInStock: data?.countInStock,
      qty,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};
