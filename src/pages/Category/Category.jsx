import React, { Component } from "react";

import { getPages } from "redux/features/pagination/selector";
import { setCurrentPage, setMaxPagesNumber, setDataStep } from "redux/features/pagination/slice";
import { withUseDispatch, withUseSelector } from "components/hoc";
import { GET_CERTAIN_CATEEGORY } from "apollo/queries/categories";
import { ProductItem, Pagination } from "components/ui";
import { client } from "apollo";

import { CategoryContainer } from "./CategoryContainer";
import Loader from "assets/loader.gif";

class Category extends Component {
  constructor(props) {
    super(props);
    const dataFromLS = JSON.parse(localStorage.getItem("currentCategory"));
    const name = dataFromLS ? dataFromLS.all[dataFromLS.current].name : "all";
    this.dispatch = this.props.dispatch;
    this.state = {
      currentPage: this.props.selectorValue.currentPage,
      partialData: JSON.parse(localStorage.getItem("partialData")) || [],
      SELECTED_CATEGORY: name,
      loading: true,
      error: false,
      data: [],
      currentCategoryToggler: JSON.parse(localStorage.getItem("currentCategory")),
    };
  }

  componentDidMount() {
    client
      .query({
        query: GET_CERTAIN_CATEEGORY,
        variables: { name: this.state.SELECTED_CATEGORY },
      })
      .then((result) => {
        this.setState({ data: result.data });
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }

  componentDidUpdate() {
    const dataFromLS = JSON.parse(localStorage.getItem("currentCategory"));
    const name = dataFromLS ? dataFromLS.all[dataFromLS.current].name : "all";

    if (
      this.state.currentCategoryToggler.current !==
      JSON.parse(localStorage.getItem("currentCategory")).current
    ) {
      this.setState({
        currentCategoryToggler: JSON.parse(localStorage.getItem("currentCategory")),
        ELECTED_CATEGORY: name,
      });
      // TODO: not updating
      console.log("updating");
      client
        .query({
          query: GET_CERTAIN_CATEEGORY,
          variables: { name },
        })
        .then((result) => {
          this.setState({ partialData: [], data: result.data, loading: false });
          this.configurePages(result.data);
        })
        .catch((err) => {
          this.setState({ error: err });
        });
    }
  }

  handleDispatch(pagesCount) {
    this.dispatch(setCurrentPage(1));
    this.dispatch(setMaxPagesNumber(pagesCount));
    this.dispatch(setDataStep(0));

    const data = {
      currentPage: this.props.selectorValue.currentPage,
      maxPagesNumber: pagesCount,
      step: this.props.selectorValue.step,
    };

    localStorage.setItem("pages", JSON.stringify(data));
  }

  configurePages(d) {
    const pagesCount = Math.ceil(
      d.category.products.length / this.props.selectorValue.productsToShow,
    );

    if (pagesCount > 1 && !this.state.partialData.length) {
      this.handleDispatch(pagesCount);
      this.updatePartialData(this.props.selectorValue.step, d.category.products);
    }

    if (pagesCount === 1) {
      this.handleDispatch(pagesCount);
      localStorage.removeItem("partialData");
    }
  }

  onItemClick = (id) => {
    localStorage.setItem("singleProduct", id);
  };

  calculateStep(idx) {
    return idx * this.props.selectorValue.productsToShow;
  }

  updatePartialData(step, data) {
    const copy = [...data].splice(step, this.props.selectorValue.productsToShow);

    this.setState({ partialData: copy });

    localStorage.setItem("partialData", JSON.stringify(copy));
  }

  setStep = (idx) => {
    const d = {
      currentPage: idx + 1,
      maxPagesNumber: this.props.selectorValue.maxPagesNumber,
      step: this.calculateStep(idx, this.state.data),
    };

    this.dispatch(setCurrentPage(d.currentPage));
    this.dispatch(setDataStep(d.step));

    this.setState({ currentPage: d.currentPage });

    this.updatePartialData(d.step, this.state.data.category.products);

    localStorage.setItem("pages", JSON.stringify(d));
  };

  render() {
    if (this.state.loading || this.state.error)
      return (
        <div className="centerLoader">
          <img src={Loader} alt="loader" width="100px" />
        </div>
      );
    else this.configurePages(this.state.data);

    return (
      <CategoryContainer>
        <div className="header">{this.state.data && this.state.data.category.name}</div>
        <div className="products">
          {this.props.selectorValue.maxPagesNumber > 1
            ? this.state.partialData.map((product) => (
                <ProductItem key={product.id} product={product} onItemClick={this.onItemClick} />
              ))
            : this.state.data.category.products.map((product) => (
                <ProductItem key={product.id} product={product} onItemClick={this.onItemClick} />
              ))}
        </div>
        {this.props.selectorValue.maxPagesNumber > 1 && (
          <div className="pagination-wrapper">
            <Pagination currentPage={this.state.currentPage} setStep={this.setStep} />
          </div>
        )}
      </CategoryContainer>
    );
  }
}

export default withUseDispatch(withUseSelector(Category, getPages));
