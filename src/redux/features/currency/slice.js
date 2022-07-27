import { createSlice } from '@reduxjs/toolkit'

const currencyFromLS = JSON.parse(localStorage.getItem("currentCurrency"))

const initialState = currencyFromLS ? {
  currentCurrency: currencyFromLS
} : {
  currentCurrency: {
    label: "USD",
    symbol: "$",
  },
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setCurrency: (state, action) => {
      state.currentCurrency = action.payload
    },
  },
})

export const { setCurrency } = currencySlice.actions

export default currencySlice.reducer