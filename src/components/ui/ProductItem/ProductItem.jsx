import React, { Component } from "react";

import { store } from "redux/store";

import Cart from "assets/cart.svg";
import { Link } from "react-router-dom";

class ProductItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCurrency: this.props.product.prices.find(
        (element) => element.currency.label === store.getState().currency.currentCurrency.label,
      ),
      isHovering: false,
    };
  }

  componentDidUpdate() {
    if (
      this.state.currentCurrency.currency.label !== store.getState().currency.currentCurrency.label
    ) {
      this.setState({
        currentCurrency: this.props.product.prices.find(
          (element) => element.currency.label === store.getState().currency.currentCurrency.label,
        ),
      });
    }
  }

  render() {
    const handleMouseOver = () => {
      this.setState({ isHovering: true });
    };

    const handleMouseOut = () => {
      this.setState({ isHovering: false });
    };

    const handleClick = (e, id) => {
      e.stopPropagation();
      localStorage.setItem("singleProduct", id);
    };

    return (
      <>
        {!this.props.product.inStock ? (
          <div className="notInStock">
            <div className="item">
              <img src={this.props.product.gallery[0]} alt={this.props.product.name} />
              <div>
                <p>{this.props.product.name}</p>
                <b>
                  {this.state.currentCurrency.currency.symbol} {this.state.currentCurrency.amount}
                </b>
              </div>
            </div>
          </div>
        ) : (
          <Link
            to={`/product/${this.props.product.id}`}
            className="wrapper"
            onClick={() => this.props.onItemClick(this.props.product.id)}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}>
            <div className="item">
              <img src={this.props.product.gallery[0]} alt={this.props.product.name} />
              <div>
                <p>{this.props.product.name}</p>
                <b>
                  {this.state.currentCurrency.currency.symbol} {this.state.currentCurrency.amount}
                </b>
              </div>
            </div>
            {this.state.isHovering && (
              <Link
                to={`/product/${this.props.product.id}`}
                className="add-to-cart"
                onClick={(e) => handleClick(e, this.props.product.id)}>
                <img src={Cart} alt="add to cart" />
              </Link>
            )}
          </Link>
        )}
      </>
    );
  }
}

export default ProductItem;
