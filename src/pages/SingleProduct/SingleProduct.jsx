import React, { Component } from 'react'
import { Interweave } from 'interweave'

import { withUseCertainProduct } from 'components/hoc/useQuery'
import { GET_PRODUCT } from "apollo/queries/product"
import { withUseDispatch, withUseSelector } from 'components/hoc'
import { getCurrentCurrency } from 'redux/features/currency/selector'
import { generateId, checkAttrs } from "utils/"
import { addProduct } from 'redux/features/cart/slice'

import { SingleProductContainer } from "./SingleProductContainer"
import Loader from "assets/loader.gif"

const attrs = ['Size', 'Color', 'Capacity', 'With USB 3 ports', 'Touch ID in keyboard']
const initialState = {
  selectedImage: 0,
  attributes: {
    size: 0,
    color: 0,
    capacity: 0,
    usb: 0,
    touchId: 0,
  }
}

class SingleProduct extends Component {
  static PRODUCT_ID = localStorage.getItem("singleProduct")
  constructor(props) {
    super(props)
    this.state = {
      productAttrs: JSON.parse(localStorage.getItem("currentProductAttrs")) || initialState,
      currentCurrency: JSON.parse(localStorage.getItem("currentCurrency")),
    }
    this.dispatch = this.props.dispatch
  }

  componentDidUpdate() {
    if (this.state.currentCurrency.label !== this.props.selectorValue.label) {
      this.setState({ currentCurrency: JSON.parse(localStorage.getItem("currentCurrency")) })
    }
  }

  addToCart = (data) => {
    const uniqueId = generateId()
    const cartItemsFromLS = JSON.parse(localStorage.getItem("cartItems")) || []
    const payload = {
      id: uniqueId,
      product: data,
      selectedAttrs: this.state.productAttrs.attributes
    }
    this.dispatch(addProduct(payload))

    const idx = cartItemsFromLS.findIndex((obj) => (
      obj.product.id === payload.product.id && checkAttrs(obj.selectedAttrs, payload.selectedAttrs)
    ))

    if (idx !== -1) {
      cartItemsFromLS[idx].amount++
    } else {
      cartItemsFromLS.push({ ...payload, amount: 1 })
    }

    localStorage.setItem("cartItems", JSON.stringify(cartItemsFromLS))
  }

  handleAttrClick = (e, idx) => {
    e.preventDefault()

    if (e.target.id === 'selectedImage') {
      this.setState({ productAttrs: { ...this.state.productAttrs, [e.target.id]: idx } })
      localStorage.setItem("currentProductAttrs", JSON.stringify({ ...this.state.productAttrs, [e.target.id]: idx }))
    } else {
      this.setState({ productAttrs: { ...this.state.productAttrs, attributes: {
        ...this.state.productAttrs.attributes,
        [e.target.id]: idx 
      }}})
      localStorage.setItem("currentProductAttrs", JSON.stringify({ ...this.state.productAttrs,  attributes: {
        ...this.state.productAttrs.attributes,
        [e.target.id]: idx 
      }}))
    }
  }

  render() {
    const { loading, error, data } = this.props.queryValue

    if (loading || error) return (
      <div className="centerLoader">
        <img src={Loader} alt="loader" width="100px" />
      </div>
    )

    const sizes = data.product.attributes.find(element => element.id === attrs[0])
    const colors = data.product.attributes.find(element => element.id === attrs[1])
    const capacity = data.product.attributes.find(element => element.id === attrs[2])
    const usbs = data.product.attributes.find(element => element.id === attrs[3])
    const touchIds = data.product.attributes.find(element => element.id === attrs[4])
    const currentPrice = data.product.prices.find(element => element.currency.label === this.state.currentCurrency.label)
    const extraImages = data.product.gallery.length > 1 ? data.product.gallery : []

    return (
      <SingleProductContainer>
        {
          extraImages.length > 1 && (
            <div className="imageWrapper">
              <div className="extraImages">
                {
                  extraImages.map((img, idx) => (
                    <img className={`${this.state.productAttrs.selectedImage === idx ? 'active' : ''}`} id="selectedImage" key={idx} src={`${img}`} alt={`asset - #${idx + 1}`} onClick={(e) => this.handleAttrClick(e, idx)} />
                  ))
                }
              </div>
            </div>
          )
        }
        <div className="wrapper">
          <div className="left">
            <img src={`${data.product.gallery[this.state.productAttrs.selectedImage]}`} alt="selected" />
          </div>
          <div className="right">
            <div className="head">
              <p className="name">{ data.product.name }</p>
              <p className="brand">{ data.product.brand }</p>
            </div>
            {
              sizes && (
                <div className="attr_header size">
                  <p>{sizes.id}:</p>
                  <div>
                    {
                      sizes.items.map((size, idx) => (
                        <div 
                          className={`${this.state.productAttrs.attributes.size === idx ? 'active' : ''}`} 
                          key={size.id} 
                          id="size" 
                          onClick={(e) => this.handleAttrClick(e, idx)}
                        >
                          { size.value }
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            }
            {
              colors && (
                <div className="attr_header color">
                  <p>{colors.id}:</p>
                  <div>
                    {
                      colors.items.map((color, idx) => (
                        <div
                          key={color.id} 
                          style={{ backgroundColor: `${color.value}` }}
                          id="color"
                          className={`${this.state.productAttrs.attributes.color === idx ? 'active' : ''}`}
                          onClick={(e) => this.handleAttrClick(e, idx)}
                        />
                      ))
                    }
                  </div>
                </div>
              )
            }
            {
              capacity && (
                <div className="attr_header capacity">
                  <p>{capacity.id}:</p>
                  <div>
                    {
                      capacity.items.map((cap, idx) => (
                        <div 
                          key={cap.id}
                          id="capacity"
                          className={`${this.state.productAttrs.attributes.capacity === idx ? 'active' : ''}`}
                          onClick={(e) => this.handleAttrClick(e, idx)}
                        >
                          {cap.value}
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            }
            {
              usbs && (
                <div className="attr_header usb">
                  <p>{usbs.id}:</p>
                  <div>
                    {
                      usbs.items.map((usb, idx) => (
                        <div 
                          key={usb.id}
                          id="usb"
                          className={`${this.state.productAttrs.attributes.usb === idx ? 'active' : ''}`}
                          onClick={(e) => this.handleAttrClick(e, idx)}
                        >
                          {usb.value}
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            }
            {
              touchIds && (
                <div className="attr_header usb">
                  <p>{touchIds.id}:</p>
                  <div>
                    {
                      touchIds.items.map((touchId, idx) => (
                        <div 
                          key={touchId.id}
                          id="touchId"
                          className={`${this.state.productAttrs.attributes.touchId === idx ? 'active' : ''}`}
                          onClick={(e) => this.handleAttrClick(e, idx)}
                        >
                          {touchId.value}
                        </div>
                      ))
                    }
                  </div>
                </div>
              )
            }
            <div className="attr_header price">
              <p>price:</p>
              <p className="second">{currentPrice.currency.symbol} {currentPrice.amount}</p>
            </div>
            <button onClick={() => this.addToCart(data.product)}>
              add to cart
            </button>
            <div className="description">
              <Interweave content={`${data.product.description}`} />
            </div>
          </div>
        </div>
      </SingleProductContainer>
    )
  }
}

export default withUseDispatch(withUseSelector(withUseCertainProduct(SingleProduct, GET_PRODUCT, SingleProduct.PRODUCT_ID), getCurrentCurrency))
