import React, { Component } from "react";
import { Link } from "react-router-dom";

import { Currencies, Cart } from "components/ui";
import { withUseDispatch, withUseSelector } from "components/hoc";
import { GET_CATEGORIES_NAMES } from "apollo/queries/categories";
import { setCurrentCategory, setAllCategories } from "redux/features/category/slice";
import { getCategory } from "redux/features/category/selector";
import { client } from "apollo";

import { HeaderComponent } from "./HeaderComponent";
import Logo from "assets/logo.png";
import Loader from "assets/loader.gif";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerCategory: this.props.selectorValue.current,
      loading: true,
      error: false,
      data: [],
    };
    this.dispatch = this.props.dispatch;
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
    this.dispatch(setCurrentCategory(data.current));
    this.dispatch(setAllCategories(data.all));
    localStorage.removeItem("singleProduct");
    localStorage.removeItem("currentProductAttrs");
  }

  handleLogoClick = () => {
    localStorage.removeItem("singleProduct");
    localStorage.removeItem("currentProductAttrs");
  };

  configureCategories = (value) => {
    if (!this.props.selectorValue.all.length) {
      const d = {
        current: 0,
        all: value,
      };
      localStorage.setItem("currentCategory", JSON.stringify(d));
      this.dispatch(setCurrentCategory(d.current));
      this.dispatch(setAllCategories(d.all));
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

export default withUseDispatch(withUseSelector(Header, getCategory));
