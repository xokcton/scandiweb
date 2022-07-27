import React from "react"
import { Routes, Route } from "react-router-dom"

import { Category, SingleProduct, CartPage } from "pages"
import MainLayout from "layouts/MainLayout"

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="" element={<Category />} />
          <Route path="product/:id" element={<SingleProduct />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    )
  }
}


export default App;
