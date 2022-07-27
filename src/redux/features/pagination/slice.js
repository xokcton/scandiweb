import { createSlice } from '@reduxjs/toolkit'

const pagesFromLS = JSON.parse(localStorage.getItem("pages"))
const PRODUCTS_TO_SHOW = 3

const initialState = pagesFromLS ? {
  pages: {
    ...pagesFromLS,
    productsToShow: PRODUCTS_TO_SHOW
  }
} : {
  pages: {
    currentPage: 1,
    maxPagesNumber: 1,
    step: 0,
    productsToShow: PRODUCTS_TO_SHOW,
  }
}

export const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.pages.currentPage = action.payload
    },
    setMaxPagesNumber: (state, action) => {
      state.pages.maxPagesNumber = action.payload
    },
    setDataStep: (state, action) => {
      state.pages.step = action.payload
    },
  },
})

export const { setCurrentPage, setMaxPagesNumber, setDataStep } = paginationSlice.actions

export default paginationSlice.reducer