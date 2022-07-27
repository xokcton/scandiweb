import { createSlice } from '@reduxjs/toolkit'

const categoryFromLS = JSON.parse(localStorage.getItem("currentCategory"))

const initialState = categoryFromLS ? {
  categories: categoryFromLS
} : {
  categories: {
    current: 0,
    all: []
  },
}

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCurrentCategory: (state, action) => {
      state.categories.current = action.payload
    },
    setAllCategories: (state, action) => {
      state.categories.all = action.payload
    },
  },
})

export const { setCurrentCategory, setAllCategories } = categorySlice.actions

export default categorySlice.reducer