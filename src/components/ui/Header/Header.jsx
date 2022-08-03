import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Currencies, Cart } from "components/ui";
import { GET_CATEGORIES_NAMES } from "apollo/queries/categories";
import { setCurrentCategory, setAllCategories } from "redux/features/category/slice";
import { client } from "apollo";
import { store } from "redux/store";

import { HeaderComponent } from "./HeaderComponent";
import Logo from "assets/logo.png";
import Loader from "assets/loader.gif";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerCategory: store.getState().category.categories.current,
      loading: true,
      error: false,
      data: [],
    };
  }

  componentDidMount() {
    client
      .query({
        query: GET_CATEGORIES_NAMES,
      })
      .then((result) => {
        this.setState({ data: result.data });
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }

  handleClick(idx, d) {
    this.setState({ headerCategory: idx });
    const data = {
      current: idx,
      all: d,
    };
    localStorage.setItem("currentCategory", JSON.stringify(data));
    store.dispatch(setCurrentCategory(data.current));
    store.dispatch(setAllCategories(data.all));
    localStorage.removeItem("singleProduct");
    localStorage.removeItem("currentProductAttrs");
    localStorage.removeItem("partialData");
    localStorage.removeItem("pages");
  }

  handleLogoClick = () => {
    localStorage.removeItem("singleProduct");
    localStorage.removeItem("currentProductAttrs");
    localStorage.removeItem("partialData");
    localStorage.removeItem("pages");
  };

  configureCategories = (value) => {
    if (!store.getState().category.categories.all.length) {
      const d = {
        current: 0,
        all: value,
      };
      localStorage.setItem("currentCategory", JSON.stringify(d));
      store.dispatch(setCurrentCategory(d.current));
      store.dispatch(setAllCategories(d.all));
    }
  };

  render() {
    if (this.state.loading || this.state.error)
      return (
        <div className="headerLoader">
          <img src={Loader} alt="loader" width="40px" />
        </div>
      );
    else this.configureCategories(this.state.data.categories);

    return (
      <HeaderComponent>
        <div className="left">
          {this.state.data.categories.map((cat, idx) => (
            <Link
              to="/"
              key={idx}
              className={`categoryLink ${idx === this.state.headerCategory ? "active" : ""}`}
              onClick={() => this.handleClick(idx, this.state.data.categories)}>
              {cat.name}
            </Link>
          ))}
        </div>
        <div className="logo">
          <Link to="/">
            <img
              src={Logo}
              alt="logo"
              style={{ cursor: "pointer" }}
              onClick={this.handleLogoClick}
            />
          </Link>
        </div>
        <div className="right">
          <Currencies />
          <Cart />
        </div>
      </HeaderComponent>
    );
  }
}

export default Header;
