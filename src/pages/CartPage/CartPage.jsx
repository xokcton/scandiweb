import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { getTotalAmount, getTotalPrice } from 'utils';
import { clearItems } from 'redux/features/cart/slice';
import { Header, List } from 'components/ui';
import { store } from 'redux/store';

import { CartPageContainer } from './CartPageContainer';

const TAX = 21;

class CartPage extends Component {
  #utilityFunction = () => {
    localStorage.removeItem('cartItems');
    store.dispatch(clearItems());
  };

  handleOrder = () => {
    const value = window.confirm('Do you really want to purchase this?');
    if (value) {
      this.#utilityFunction();
    }
  };

  handleClearCart = () => {
    const value = window.confirm('Are you sure you want to empty the cart?');
    if (value) {
      this.#utilityFunction();
    }
  };

  render() {
    const totalAmount = getTotalAmount(store.getState().cart.items.slice());
    const totalPrice = getTotalPrice(
      store.getState().cart.items.slice(),
      store.getState().currency.currentCurrency.label,
    );

    return (
      <>
        <Header />
        <div className="content">
          <CartPageContainer>
            <div className="header">cart</div>
            {store.getState().cart.items.length > 0 ? (
              <div className="innerPart">
                <div className="cartItemsList">
                  <List currentCurrency={store.getState().currency.currentCurrency} />
                </div>
                <div className="summary">
                  <div>
                    <p>Tax {TAX}%:</p>
                    <b>
                      {store.getState().currency.currentCurrency.symbol}
                      {((totalPrice / 100) * TAX).toFixed(2)}
                    </b>
                  </div>
                  <div>
                    <p>Quantity:</p>
                    <b>{totalAmount}</b>
                  </div>
                  <div>
                    <p>Total Price:</p>
                    <b>
                      {store.getState().currency.currentCurrency.symbol}
                      {totalPrice.toFixed(2)}
                    </b>
                  </div>
                  <div>
                    <p>Price With Tax:</p>
                    <b>
                      {store.getState().currency.currentCurrency.symbol}
                      {((totalPrice / 100) * TAX + totalPrice).toFixed(2)}
                    </b>
                  </div>
                  <div>
                    <Link
                      to="/"
                      className="lastItemWithButtons lastItemWithGreenButton"
                      onClick={this.handleOrder}>
                      order
                    </Link>
                    <Link to="/" className="lastItemWithButtons" onClick={this.handleClearCart}>
                      clear cart
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="nothingToShow">
                Nothing to show...{' '}
                <Link to="/" className="goBack">
                  Go back to the main page?
                </Link>
              </div>
            )}
          </CartPageContainer>
        </div>
      </>
    );
  }
}

export default CartPage;
