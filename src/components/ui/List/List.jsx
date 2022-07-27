import React, { Component } from 'react'

import { withUseDispatch, withUseSelector } from 'components/hoc'
import { Attributes, Slider } from 'components/ui'
import { getCart } from 'redux/features/cart/selector'
import { removeProduct, addProduct } from "redux/features/cart/slice"
import { getEachPrice } from "utils/"

import { ListContainer } from "./ListContainer"

class List extends Component {
  // constructor(props) {
  //   super(props)
  //   console.log(this.props.currentCurrency);
  // }

  reconfigureCartItemsInLS = (id, flag) => {
    let cartFromLS = JSON.parse(localStorage.getItem("cartItems"))
    const idx = cartFromLS.slice().findIndex(element => element.id === id)
    if (flag) {
      cartFromLS[idx].amount++
    } else {
      if (cartFromLS[idx].amount - 1 === 0) {
        cartFromLS = cartFromLS.slice().filter(element => element.id !== id)
      } else {
        cartFromLS[idx].amount--
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(cartFromLS))
  }

  handleAdd = (id) => {
    this.props.dispatch(addProduct(id))
    this.reconfigureCartItemsInLS(id, true)
  }

  handleRemove = (id) => {
    this.props.dispatch(removeProduct(id))
    this.reconfigureCartItemsInLS(id, false)
  }

  render() {
    return (
      <ListContainer>
        <div className="listWrapper">
          {
            this.props.selectorValue.length > 0 &&
            this.props.selectorValue.map(item => (
              <div key={item.id} className="eachItem">
                <div className="leftPart">
                  <div className="head">
                    <p className="name">{ item.product.name }</p>
                    <p className="brand">{ item.product.brand }</p>
                  </div>
                  <div className="eachPrice">{ getEachPrice(item, this.props.currentCurrency).symbol } { getEachPrice(item, this.props.currentCurrency).amount }</div>
                  <Attributes key={item.id} allAttributes={item.product.attributes} selectedAttributes={item.selectedAttrs} />
                </div>
                <div className="rightPart">
                  <div className="arrows">
                    <div className="plus" onClick={() => this.handleAdd(item.id)}> + </div>
                    <div className="number">{ item.amount }</div>
                    <div className="minus"  onClick={() => this.handleRemove(item.id)}> - </div>
                  </div>
                  <div className="slider">
                    {
                      item.product.gallery.length > 1 ? (
                        <Slider images={item.product.gallery} />
                      ) : (
                        <img src={`${item.product.gallery[0]}`} alt="slider" />
                      )
                    }
                    
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </ListContainer>
    )
  }
}

export default withUseDispatch(withUseSelector(List, getCart))
