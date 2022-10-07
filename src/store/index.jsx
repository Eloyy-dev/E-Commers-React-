import { configureStore } from '@reduxjs/toolkit'
import carSlice from './slices/car.slice'

import isLoadingSlice from './slices/isLoading.slice'
import productsSlice from './slices/products.slice'
import purchaseSlice from './slices/purchase.slice'

export default configureStore({
  reducer: {
    isLoading: isLoadingSlice,
    products: productsSlice,
    purchases: purchaseSlice,
    car: carSlice

  }
})
