import React, { Component } from "react";
import { Link } from "react-router-dom";

import { clearItems } from "redux/features/cart/slice";
import { getTotalAmount, getTotalPrice } from "utils";
import { List } from "components/ui";
import { store } from "redux/store";

import { CartContainer } from "./CartContainer";
import CartImage from "assets/cart.svg";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCartOpen: false,
    };
    this.cartRef = React.createRef(null);
    this.cartItemsRef = React.createRef(null);
    this.handleClickOutside = undefined;
  }

  componentDidMount() {
    this.handleClickOutside = (e) => {
      if (
        this.cartRef?.current &&
        !e.path.includes(this.cartRef?.current) &&
        this.state.isCartOpen &&
        !e.path.includes(this.cartItemsRef?.current)
      ) {
        this.setState({ isCartOpen: false });
      }
    };
    document.body.addEventListener("click", this.handleClickOutside);
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleClickOutside);
  }

  openCart = () => {
    if (store.getState().cart.items.length === 0) {
      alert("Add at least one element first!");
      return;
    }
    this.setState({ isCartOpen: !this.state.isCartOpen });
  };

  handleClearBag = (e) => {
    e.preventDefault();
    store.dispatch(clearItems());
    localStorage.removeItem("cartItems");
    this.setState({ isCartOpen: false });
  };

  goToCartPage = () => {
    this.setState({ isCartOpen: false });
  };

  render() {
    const totalAmount = getTotalAmount(store.getState().cart.items.slice());
    const totalPrice = getTotalPrice(
      store.getState().cart.items.slice(),
      store.getState().currency.currentCurrency.label,
    );

    return (
      <CartContainer>
        <div className="cartAfter" onClick={this.openCart} ref={this.cartRef}>
          <img src={CartImage} alt="cart" />
          {totalAmount > 0 && <div className="cartItemsAmount">{totalAmount}</div>}
        </div>
        {this.state.isCartOpen && totalAmount > 0 && (
          <div className="substrate">
            <div className="cartModal" ref={this.cartItemsRef}>
              <div className="cartHeader">
                <b>my bag,</b>
                {totalAmount === 1 ? <p>{totalAmount} item</p> : <p>{totalAmount} items</p>}
              </div>
              <div className="itemsWrapper">
                <List currentCurrency={store.getState().currency.currentCurrency} />
              </div>
              <div className="total">
                <b>Total</b>
                <b>
                  {store.getState().currency.currentCurrency.symbol}
                  {totalPrice.toFixed(2)}
                </b>
              </div>
              <div className="buttons">
                <button onClick={this.handleClearBag}>clear bag</button>
                <Link to="/cart" className="success" onClick={this.goToCartPage}>
                  view bag
                </Link>
              </div>
            </div>
          </div>
        )}
      </CartContainer>
    );
  }
}

export default Cart;
