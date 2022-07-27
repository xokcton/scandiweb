import React, { Component } from 'react'

import { withUseNavigate, withUseSelector } from "components/hoc"
import { getCurrentCurrency } from "redux/features/currency/selector"

import Cart from "assets/cart.svg"

class ProductItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCurrency: this.props.product.prices.find(element => element.currency.label === this.props.selectorValue.label),
      isHovering: false,
    }
  }

  componentDidUpdate() {
    if (this.state.currentCurrency.currency.label !== this.props.selectorValue.label) {
      this.setState({ currentCurrency: this.props.product.prices.find(element => element.currency.label === this.props.selectorValue.label) })
    }
  }

  render() {
    const handleMouseOver = () => {
      this.setState({ isHovering: true })
    }

    const handleMouseOut = () => {
      this.setState({ isHovering: false })
    }

    const handleClick = (e, id) => {
      e.stopPropagation()
      localStorage.setItem("singleProduct", id)
      window.location.replace(`product/${id}`)
    }

    return (
      <>
        {
          !this.props.product.inStock ? (
            <div className="notInStock">
              <div className="item">
                <img src={this.props.product.gallery[0]} alt={this.props.product.name} />
                <div>
                  <p>{this.props.product.name}</p>
                  <b>{this.state.currentCurrency.currency.symbol} {this.state.currentCurrency.amount}</b>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="wrapper" 
              onClick={() => this.props.onItemClick(this.props.product.id)}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            >
              <div className="item">
                <img src={this.props.product.gallery[0]} alt={this.props.product.name} />
                <div>
                  <p>{this.props.product.name}</p>
                  <b>{this.state.currentCurrency.currency.symbol} {this.state.currentCurrency.amount}</b>
                </div>
              </div>
              {
                this.state.isHovering && (
                  <div className="add-to-cart" onClick={(e) => handleClick(e, this.props.product.id)}>
                    <img src={Cart} alt="add to cart" />
                  </div>
                )
              }
            </div>
          )
        }
      </>
    )
  }
}

export default withUseNavigate(withUseSelector(ProductItem, getCurrentCurrency))
