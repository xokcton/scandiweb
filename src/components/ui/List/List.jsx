import React, { Component } from "react";

import { Attributes, Slider } from "components/ui";
import { removeProduct, addProduct } from "redux/features/cart/slice";
import { getEachPrice } from "utils/";
import { store } from "redux/store";

import { ListContainer } from "./ListContainer";

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggleClick: false,
    };
  }

  reconfigureCartItemsInLS = (id, flag) => {
    let cartFromLS = JSON.parse(localStorage.getItem("cartItems"));
    const idx = cartFromLS.slice().findIndex((element) => element.id === id);
    if (flag) {
      cartFromLS[idx].amount++;
    } else {
      if (cartFromLS[idx].amount - 1 === 0) {
        cartFromLS = cartFromLS.slice().filter((element) => element.id !== id);
      } else {
        cartFromLS[idx].amount--;
      }
    }
    localStorage.setItem("cartItems", JSON.stringify(cartFromLS));
  };

  handleAdd = (id) => {
    store.dispatch(addProduct(id));
    this.reconfigureCartItemsInLS(id, true);
    this.setState({ toggleClick: !this.state.toggleClick });
  };

  handleRemove = (id) => {
    store.dispatch(removeProduct(id));
    this.reconfigureCartItemsInLS(id, false);
    this.setState({ toggleClick: !this.state.toggleClick });
  };

  render() {
    return (
      <ListContainer>
        <div className="listWrapper">
          {store.getState().cart.items.length > 0 &&
            store.getState().cart.items.map((item) => (
              <div key={item.id} className="eachItem">
                <div className="leftPart">
                  <div className="head">
                    <p className="name">{item.product.name}</p>
                    <p className="brand">{item.product.brand}</p>
                  </div>
                  <div className="eachPrice">
                    {getEachPrice(item, this.props.currentCurrency).symbol}{" "}
                    {getEachPrice(item, this.props.currentCurrency).amount}
                  </div>
                  <Attributes
                    key={item.id}
                    allAttributes={item.product.attributes}
                    selectedAttributes={item.selectedAttrs}
                  />
                </div>
                <div className="rightPart">
                  <div className="arrows">
                    <div className="plus" onClick={() => this.handleAdd(item.id)}>
                      {" "}
                      +{" "}
                    </div>
                    <div className="number">{item.amount}</div>
                    <div className="minus" onClick={() => this.handleRemove(item.id)}>
                      {" "}
                      -{" "}
                    </div>
                  </div>
                  <div className="slider">
                    {item.product.gallery.length > 1 ? (
                      <Slider images={item.product.gallery} />
                    ) : (
                      <img src={`${item.product.gallery[0]}`} alt="slider" />
                    )}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </ListContainer>
    );
  }
}

export default List;
