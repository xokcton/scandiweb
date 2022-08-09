import React from "react"
import { Routes, Route } from "react-router-dom"

import { Category, SingleProduct, CartPage } from "pages"

class App extends React.Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Category />} />
        <Route path="/product/:id" element={<SingleProduct />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    )
  }
}


export default App;
