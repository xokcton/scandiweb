import { createSlice } from '@reduxjs/toolkit'
import checkAttrs from 'utils/checkAttrs'

const cartFromLS = JSON.parse(localStorage.getItem("cartItems")) || []

const initialState = cartFromLS ? {
  items: cartFromLS
} : {
  items: [],
}

// item: {
//   id: asjkdklasjdkljlklk321j09sdk109k1,
//   amount: 0,
//   product: { },
//   selectedAttrs: { },
// }

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action) => {
      if (typeof action.payload === 'string') {
        const foundItem = state.items.find((obj) => obj.id === action.payload)
        if (foundItem) foundItem.amount++
      } else {
        const foundItem = state.items.find((obj) => (
          obj.product.id === action.payload.product.id && checkAttrs(obj.selectedAttrs, action.payload.selectedAttrs)
        ))

        if (foundItem) {
          foundItem.amount++
        } else {
          state.items.push({ ...action.payload, amount: 1 })
        }
      }
    },
    removeProduct: (state, action) => {
      const foundItem = state.items.find((obj) => obj.id === action.payload)

      if (foundItem.amount === 1) {
        state.items = state.items.filter((obj) => obj.id !== action.payload)
      } else {
        foundItem.amount--
      }
    },
    clearItems(state) {
      state.items = [];
    },
  },
})

export const { addProduct, removeProduct, clearItems } = cartSlice.actions

export default cartSlice.reducer