import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import getConfig from '../../utils/getConfig';
import { setLoading } from './isLoading.slice';

export const purchaseSlice = createSlice({
  name: "purchase",
  initialState: [],
  reducers: {
    setPurchases: (state, action) => {
      return action.payload
    }
  }
})

export const getPurchasesThunk = () => dispatch => {
  dispatch(setLoading(true));
  return axios.get('https://ecommerce-api-react.herokuapp.com/api/v1/purchases', getConfig())
    .then(res => dispatch(setPurchases(res.data.data.purchases)))
    .finally(() => dispatch(setLoading(false)));
}



export const { setPurchases } = purchaseSlice.actions;

export default purchaseSlice.reducer;
