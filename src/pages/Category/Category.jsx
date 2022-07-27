import React, { Component } from 'react'

import { getPages } from "redux/features/pagination/selector"
import { setCurrentPage, setMaxPagesNumber, setDataStep } from "redux/features/pagination/slice"
import { withUseCertainCategory } from "components/hoc/useQuery"
import { withUseDispatch, withUseNavigate, withUseSelector } from "components/hoc"
import { GET_CERTAIN_CATEEGORY } from "apollo/queries/categories"
import { ProductItem, Pagination } from "components/ui"

import { CategoryContainer } from "./CategoryContainer"
import Loader from "assets/loader.gif"

const dataFromLS = JSON.parse(localStorage.getItem("currentCategory"))
const name = dataFromLS ? dataFromLS.all[dataFromLS.current].name : "all"

class Category extends Component {
  static SELECTED_CATEGORY = name
  
  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch
    this.state = {
      currentPage: this.props.selectorValue.currentPage,
      partialData: JSON.parse(localStorage.getItem("partialData")) || [],
    }
  }

  handleDispatch(pagesCount) {
    this.dispatch(setCurrentPage(1))
    this.dispatch(setMaxPagesNumber(pagesCount))
    this.dispatch(setDataStep(0))

    const data = {
      currentPage: this.props.selectorValue.currentPage,
      maxPagesNumber: pagesCount,
      step: this.props.selectorValue.step,
    }

    localStorage.setItem("pages", JSON.stringify(data))
  }

  configurePages(d) {
    const pagesCount = Math.ceil(d.category.products.length / this.props.selectorValue.productsToShow)

    if (pagesCount > 1 && !this.state.partialData.length) {
      this.handleDispatch(pagesCount)
      this.updatePartialData(this.props.selectorValue.step, d.category.products)
    }

    if (pagesCount === 1) {
      this.handleDispatch(pagesCount)
      localStorage.removeItem("partialData")
    }
  }

  onItemClick = (id) => {
    localStorage.setItem("singleProduct", id)
    window.location.replace(`product/${id}`)
  }

  calculateStep(idx) {
    return idx * this.props.selectorValue.productsToShow
  }

  updatePartialData(step, data) {
    const copy = [...data].splice(step, this.props.selectorValue.productsToShow)

    this.setState({ partialData: copy })

    localStorage.setItem("partialData", JSON.stringify(copy))
  }

  render() {
    const { loading, error, data } = this.props.queryValue

    const setStep = (idx) => {
      const d = {
        currentPage: idx + 1,
        maxPagesNumber: this.props.selectorValue.maxPagesNumber,
        step: this.calculateStep(idx, data)
      }

      this.dispatch(setCurrentPage(d.currentPage))
      this.dispatch(setDataStep(d.step))

      this.setState({ currentPage: d.currentPage })

      this.updatePartialData(d.step, data.category.products)

      localStorage.setItem("pages", JSON.stringify(d))
    }
    
    if (loading || error) return (
      <div className="centerLoader">
        <img src={Loader} alt="loader" width="100px" />
      </div>
    )
    else this.configurePages(data)

    return (
      <CategoryContainer>
        <div className="header">
          {
            data && data.category.name
          }
        </div>
        <div className="products">
          {
            this.props.selectorValue.maxPagesNumber > 1 ?
              this.state.partialData.map(product => (
                <ProductItem key={product.id} product={product} onItemClick={this.onItemClick} />
              ))
              :
              data.category.products.map(product => (
                <ProductItem key={product.id} product={product} onItemClick={this.onItemClick} />
              ))
          }
        </div>
        {
          this.props.selectorValue.maxPagesNumber > 1 && (
            <div className="pagination-wrapper">
              <Pagination currentPage={this.state.currentPage} setStep={setStep} />
            </div>
          )
        }
      </CategoryContainer>
    )
  }
}

export default withUseNavigate(withUseDispatch(withUseSelector(withUseCertainCategory(Category, GET_CERTAIN_CATEEGORY, Category.SELECTED_CATEGORY), getPages)))
