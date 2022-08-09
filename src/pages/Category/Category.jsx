import React, { Component } from 'react';

import { setCurrentPage, setMaxPagesNumber, setDataStep } from 'redux/features/pagination/slice';
import { GET_CERTAIN_CATEEGORY } from 'apollo/queries/categories';
import { ProductItem, Pagination, Header } from 'components/ui';
import { client } from 'apollo';
import { store } from 'redux/store';

import { CategoryContainer } from './CategoryContainer';
import Loader from 'assets/loader.gif';

class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: store.getState().pagination.pages.currentPage,
      partialData: JSON.parse(localStorage.getItem('partialData')) || [],
      SELECTED_CATEGORY:
        store.getState().category.categories.all[store.getState().category.categories.current]
          ?.name || 'all',
      loading: true,
      error: false,
      data: [],
      currentCategoryToggler: JSON.parse(localStorage.getItem('currentCategory')),
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

  handleDispatch(pagesCount) {
    store.dispatch(setCurrentPage(1));
    store.dispatch(setMaxPagesNumber(pagesCount));
    store.dispatch(setDataStep(0));

    const data = {
      currentPage: store.getState().pagination.pages.currentPage,
      maxPagesNumber: pagesCount,
      step: store.getState().pagination.pages.step,
    };

    localStorage.setItem('pages', JSON.stringify(data));
  }

  configurePages(d) {
    const pagesCount = Math.ceil(
      d.category.products.length / store.getState().pagination.pages.productsToShow,
    );

    if (pagesCount > 1 && !this.state.partialData.length) {
      this.handleDispatch(pagesCount);
      this.updatePartialData(store.getState().pagination.pages.step, d.category.products);
    }

    if (pagesCount === 1) {
      this.handleDispatch(pagesCount);
      localStorage.removeItem('partialData');
    }
  }

  onItemClick = (id) => {
    localStorage.setItem('singleProduct', id);
  };

  calculateStep(idx) {
    return idx * store.getState().pagination.pages.productsToShow;
  }

  updatePartialData(step, data) {
    const copy = [...data].splice(step, store.getState().pagination.pages.productsToShow);

    this.setState({ partialData: copy });

    localStorage.setItem('partialData', JSON.stringify(copy));
  }

  setStep = (idx) => {
    const d = {
      currentPage: idx + 1,
      maxPagesNumber: store.getState().pagination.pages.maxPagesNumber,
      step: this.calculateStep(idx, this.state.data),
    };

    store.dispatch(setCurrentPage(d.currentPage));
    store.dispatch(setDataStep(d.step));

    this.setState({ currentPage: d.currentPage });

    this.updatePartialData(d.step, this.state.data.category.products);

    localStorage.setItem('pages', JSON.stringify(d));
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
      <>
        <Header />
        <div className="content">
          <CategoryContainer>
            <div className="header">{this.state.data && this.state.data.category.name}</div>
            <div className="products">
              {store.getState().pagination.pages.maxPagesNumber > 1
                ? this.state.partialData.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      onItemClick={this.onItemClick}
                    />
                  ))
                : this.state.data.category.products.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      onItemClick={this.onItemClick}
                    />
                  ))}
            </div>
            {store.getState().pagination.pages.maxPagesNumber > 1 && (
              <div className="pagination-wrapper">
                <Pagination currentPage={this.state.currentPage} setStep={this.setStep} />
              </div>
            )}
          </CategoryContainer>
        </div>
      </>
    );
  }
}

export default Category;
