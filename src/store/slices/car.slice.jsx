import { createSlice } from '@reduxjs/toolkit';
import getConfig from '../../utils/getConfig';
import { setLoading } from './isLoading.slice';
import axios from 'axios';

export const carSlice = createSlice({
  name: 'car',
  initialState: [],
  reducers: {
    setCart: (state, action) => {
      return action.payload
    }

  }
})

export const getCart = () => (dispatch) => {
  dispatch(setLoading(true));
  return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/cart', getConfig())
    .then(res => dispatch(setCart(res.data.data.cart.products)))
    .finally(() => dispatch(setLoading(false)));
}

export const addCart = (product) => (dispatch) => {
  dispatch(setLoading(true));
  return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/cart', product, getConfig())
    .then(() => dispatch(getCart()))
    .finally(() => dispatch(setLoading(false)));
}

export const purchaseCart = () => (dispatch) => {
  dispatch(setLoading(true));
  return axios.post('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', {}, getConfig())
    .then(() => dispatch(setCart([])))
    .finally(() => dispatch(setLoading(false)));
}

export const deleteProductCart = (id) => (dispatch) => {
  dispatch(setLoading(true));
  return axios.delete(`https://ecommerce-api-react.herokuapp.com/api/v1/cart/${id}`, getConfig())
    .then(() => dispatch(getCart())).catch(error => console.log(error.response))
    .finally(() => dispatch(setLoading(false)));
}

export const { setCart } = carSlice.actions;

export default carSlice.reducer;
