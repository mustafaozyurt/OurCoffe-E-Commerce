import * as actionTypes from "../constants/productsConstants";
import axios from "axios";

export const getProducts = (query) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCTS_REQUEST });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:5000/coffees?${query}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.request(config).then((response) => {
      return response.data;
    });

    dispatch({
      type: actionTypes.GET_PRODUCTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: actionTypes.GET_PRODUCTS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_REQUEST });

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `http://localhost:5000/coffees/${id}`,
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = await axios.request(config).then((response) => {
      return response.data;
    });

    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    console.error(error);
    dispatch({
      type: actionTypes.GET_PRODUCT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const removeProductDetails = () => (dispatch) => {
  dispatch({ type: actionTypes.GET_PRODUCT_DETAILS_RESET });
};
