import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoading } from './isLoading.slice';


export const productsSlice = createSlice({
  name: 'products',
  initialState: [],
  reducers: {
    setProduct: (state, action) => {
      const product = action.payload;
      return product
    }
  }
})

export const getProductThunk = () => (dispatch) => {
  axios.get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
    .then(res => dispatch(setProduct(res.data.data.products)))
    .finally(() => dispatch(setLoading(false)))
}

export const { setProduct } = productsSlice.actions;

export default productsSlice.reducer;
