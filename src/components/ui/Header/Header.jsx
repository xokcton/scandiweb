import React, { Component } from 'react'

import { Currencies, Cart } from "components/ui"
import { withUseDispatch, withUseNavigate, withUseSelector } from 'components/hoc'
import { withUseCategories } from 'components/hoc/useQuery'
import { GET_CATEGORIES_NAMES } from "apollo/queries/categories"
import { setCurrentCategory, setAllCategories } from "redux/features/category/slice"
import { getCategory } from 'redux/features/category/selector'

import { HeaderComponent } from "./HeaderComponent"
import Logo from "assets/logo.png"
import Loader from "assets/loader.gif"

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      headerCategory: this.props.selectorValue.current,
    }
    this.dispatch = this.props.dispatch
  }

  handleClick(idx, d) {
    this.setState({ headerCategory: idx })
    const data = {
      current: idx,
      all: d
    }
    localStorage.setItem("currentCategory", JSON.stringify(data))
    this.dispatch(setCurrentCategory(data.current))
    this.dispatch(setAllCategories(data.all))
    localStorage.removeItem("singleProduct")
    localStorage.removeItem("currentProductAttrs")
    window.location.replace("/")
  }

  handleLogoClick = () => {
    localStorage.removeItem("singleProduct")
    localStorage.removeItem("currentProductAttrs")
    this.props.navigate("/")
  }
  
  render() {
    const { loading, error, data } = this.props.queryValue

    const configureCategories = (value) => {
    if (!this.props.selectorValue.all.length) {
      const d = {
        current: 0,
        all: value
      }
      localStorage.setItem("currentCategory", JSON.stringify(d))
      this.dispatch(setCurrentCategory(d.current))
      this.dispatch(setAllCategories(d.all))
    }
  }

    if (loading || error) return (
      <div className="headerLoader">
        <img src={Loader} alt="loader" width="40px" />
      </div>
    )
    else configureCategories(data.categories)

    return (
      <HeaderComponent>
        <div className="left">
          {
            data.categories.map((cat, idx) => (
              <div key={idx} className={`${idx === this.state.headerCategory ? 'active' : ''}`} onClick={() => this.handleClick(idx, data.categories)}>{ cat.name }</div>
            ))
          }
        </div>
        <div className="logo">
          <img src={Logo} alt="logo" style={{ cursor: "pointer" }} onClick={this.handleLogoClick} />
        </div>
        <div className="right">
          <Currencies />
          <Cart />
        </div>
      </HeaderComponent>
    )
  }
}

export default withUseNavigate(withUseDispatch(withUseSelector(withUseCategories(Header, GET_CATEGORIES_NAMES), getCategory)))
