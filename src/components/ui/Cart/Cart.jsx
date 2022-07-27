import React, { Component } from 'react'

import { withUseDispatch, withUseNavigate, withUseSelector } from 'components/hoc'
import { getCart } from 'redux/features/cart/selector'
import { clearItems } from "redux/features/cart/slice"
import { nestedWithUseSelector } from 'components/hoc/useSelector'
import { getCurrentCurrency } from 'redux/features/currency/selector'
import { getTotalAmount, getTotalPrice } from 'utils'
import { List } from "components/ui"

import { CartContainer } from "./CartContainer"
import CartImage  from "assets/cart.svg"

class Cart extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isCartOpen: false,
    }
    this.cartRef = React.createRef(null)
    this.cartItemsRef = React.createRef(null)
    this.handleClickOutside = undefined
  }

  componentDidMount() {
    this.handleClickOutside = (e) => {
      if (this.cartRef?.current && !e.path.includes(this.cartRef?.current) && this.state.isCartOpen && !e.path.includes(this.cartItemsRef?.current)){
        this.setState({ isCartOpen: false });
      }
    };
    document.body.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleClickOutside);
  }

  openCart = () => {
    if (this.props.selectorValue.length === 0) {
      alert("Add at least one element first!")
      return
    }
    this.setState({ isCartOpen: !this.state.isCartOpen })
  }

  handleClearBag = (e) => {
    e.preventDefault()
    this.props.dispatch(clearItems())
    localStorage.removeItem("cartItems")
    this.setState({ isCartOpen: false })
  }

  goToCartPage = (e) => {
    e.preventDefault()
    this.setState({ isCartOpen: false })
    this.props.navigate("/cart")
  }

  render() {
    const totalAmount = getTotalAmount(this.props.selectorValue.slice())
    const totalPrice = getTotalPrice(this.props.selectorValue.slice(), this.props.nestedSelectorValue.label)

    return (
      <CartContainer>
        <div className="cartAfter" onClick={this.openCart} ref={this.cartRef}>
          <img src={CartImage} alt="cart" />
          {
            totalAmount > 0 && (
              <div className="cartItemsAmount">
                { totalAmount }
              </div>
            )
          }
        </div>
        {
          (this.state.isCartOpen && totalAmount > 0) && (
            <div className="substrate">
              <div className="cartModal" ref={this.cartItemsRef}>
                <div className="cartHeader">
                  <b>my bag,</b>
                  {
                    totalAmount === 1 ? (
                      <p>{ totalAmount } item</p>
                    ) : (
                      <p>{ totalAmount } items</p>
                    )
                  }
                </div>
                <div className="itemsWrapper">
                  <List currentCurrency={this.props.nestedSelectorValue} />
                </div>
                <div className="total">
                  <b>Total</b>
                  <b>{this.props.nestedSelectorValue.symbol}{totalPrice.toFixed(2)}</b>
                </div>
                <div className="buttons">
                  <button onClick={this.handleClearBag}>clear bag</button>
                  <button className="success" onClick={this.goToCartPage}>view bag</button>
                </div>
              </div>
            </div>
          )
        }
      </CartContainer>
    )
  }
}

export default withUseNavigate(withUseDispatch(nestedWithUseSelector(withUseSelector(Cart, getCart), getCurrentCurrency)))
