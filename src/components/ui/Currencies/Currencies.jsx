import React, { Component } from "react";

import { withUseDispatch } from "components/hoc";
import { GET_CURRENCIES } from "apollo/queries/currencies";
import { setCurrency } from "redux/features/currency/slice";
import { client } from "apollo";

import Loader from "assets/loader.gif";
import Arrow from "assets/arrow.png";

class Currencies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCurrency: 0,
      isOpen: false,
      loading: true,
      error: false,
      data: [],
    };
    this.currencyRef = React.createRef(null);
    this.handleClickOutside = undefined;
    this.dispatch = this.props.dispatch;
  }

  componentDidMount() {
    this.handleClickOutside = (e) => {
      if (this.currencyRef?.current && !e.path.includes(this.currencyRef?.current))
        this.setState({ isOpen: false });
    };
    document.body.addEventListener("click", this.handleClickOutside);

    client
      .query({
        query: GET_CURRENCIES,
      })
      .then((result) => {
        this.setState({ data: result.data });
        this.setState({ loading: false });
      })
      .catch((err) => {
        this.setState({ error: err });
      });
  }

  componentWillUnmount() {
    document.body.removeEventListener("click", this.handleClickOutside);
  }

  handleChange = (e) => {
    this.setState({ currentCurrency: e.target.value });
  };

  handleClick = (idx, data) => {
    this.setState({ currentCurrency: idx, isOpen: false });
    const currentCurrency = {
      label: data.label,
      symbol: data.symbol,
    };
    this.dispatch(setCurrency(currentCurrency));
    localStorage.setItem("currentCurrency", JSON.stringify(currentCurrency));
  };

  render() {
    return (
      <>
        {this.state.loading || this.state.error ? (
          <img src={Loader} alt="loader" width="30px" />
        ) : (
          <div ref={this.currencyRef} className="currencies">
            <div
              className="currencyDropDownPreview"
              onClick={() => this.setState({ isOpen: !this.state.isOpen })}>
              <div className="currencyNextToArrow">
                {localStorage.getItem("currentCurrency")
                  ? JSON.parse(localStorage.getItem("currentCurrency")).symbol
                  : this.state.data.currencies[this.state.currentCurrency].symbol}
              </div>
              <img
                src={Arrow}
                alt="arrow"
                className={`${this.state.isOpen ? "rotateArrow" : ""}`}
              />
            </div>
            <div className={`dropDown ${this.state.isOpen ? "" : "hidden"}`}>
              {this.state.data.currencies &&
                this.state.data.currencies.map((currency, idx) => (
                  <div onClick={() => this.handleClick(idx, currency)} key={currency.label}>
                    {currency.symbol} {currency.label}
                  </div>
                ))}
            </div>
          </div>
        )}
      </>
    );
  }
}

export default withUseDispatch(Currencies);
