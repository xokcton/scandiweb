import { configureStore } from '@reduxjs/toolkit'

import currency from "./features/currency/slice"
import pagination from "./features/pagination/slice"
import category from "./features/category/slice"
import cart from "./features/cart/slice"

export const store = configureStore({
  reducer: {
    currency,
    pagination,
    category,
    cart,
  },
})