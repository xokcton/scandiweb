import React, { Component } from 'react'

import { withUseDispatch, withUseNavigate, withUseSelector } from 'components/hoc'
import { getCart } from 'redux/features/cart/selector'
import { nestedWithUseSelector } from 'components/hoc/useSelector'
import { getCurrentCurrency } from 'redux/features/currency/selector'
import { getTotalAmount, getTotalPrice } from 'utils'
import { clearItems } from "redux/features/cart/slice"
import { List } from 'components/ui'

import { CartPageContainer } from "./CartPageContainer"

const TAX = 21

class CartPage extends Component {

  #utilityFunction = () => {
    localStorage.removeItem("cartItems")
    this.props.dispatch(clearItems())
    this.props.navigate("/")
  }

  handleOrder = () => {
    const value = window.confirm("Do you really want to purchase this?")
    if (value) {
      this.#utilityFunction()
    }
  }

  handleClearCart = () => {
    const value = window.confirm("Are you sure you want to empty the cart?")
    if (value) {
      this.#utilityFunction()
    }
  }

  render() {
    const totalAmount = getTotalAmount(this.props.selectorValue.slice())
    const totalPrice = getTotalPrice(this.props.selectorValue.slice(), this.props.nestedSelectorValue.label)

    return (
      <CartPageContainer>
        <div className="header">
          cart
        </div>
        {
          this.props.selectorValue.length > 0 ? (
            <div className="innerPart">
              <div className="cartItemsList">
                <List currentCurrency={this.props.nestedSelectorValue} />
              </div>
              <div className="summary">
                <div>
                  <p>Tax {TAX}%:</p>
                  <b>{this.props.nestedSelectorValue.symbol}{ (totalPrice / 100 * TAX).toFixed(2) }</b>
                </div>
                <div>
                  <p>Quantity:</p>
                  <b>{totalAmount}</b>
                </div>
                <div>
                  <p>Total Price:</p>
                  <b>{this.props.nestedSelectorValue.symbol}{totalPrice.toFixed(2)}</b>
                </div>
                <div>
                  <p>Price With Tax:</p>
                  <b>{this.props.nestedSelectorValue.symbol}{(totalPrice / 100 * TAX + totalPrice).toFixed(2)}</b>
                </div>
                <div className='lastItemWithButtons'>
                  <button className="lastItemWithGreenButton" onClick={this.handleOrder}>order</button>
                  <button onClick={this.handleClearCart}>clear cart</button>
                </div>
              </div>
            </div>
          ) : (
            <div className='nothingToShow'>Nothing to show... <b className='goBack' onClick={() => this.props.navigate("/")}>Go back to the main page?</b></div>
          )
        }
      </CartPageContainer>
    )
  }
}

export default withUseNavigate(withUseDispatch(nestedWithUseSelector(withUseSelector(CartPage, getCart), getCurrentCurrency)))
