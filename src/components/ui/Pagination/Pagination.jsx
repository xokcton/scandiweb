import React, { Component } from "react";

import { PaginationContainer } from "./PaginationContainer";
import { store } from "redux/store";

class Pagination extends Component {
  render() {
    const handleClick = (idx) => {
      this.props.setStep(idx);

      if (idx > 0) this.setState({ isPrevDisabled: false });
      else this.setState({ isPrevDisabled: true });

      if (store.getState().pagination.pages.maxPagesNumber - 1 === idx)
        this.setState({ isNextDisabled: true });
      else this.setState({ isNextDisabled: false });
    };

    return (
      <PaginationContainer>
        <div className="pages">
          {[...new Array(store.getState().pagination.pages.maxPagesNumber)].map((_, idx) => (
            <button
              key={idx}
              className={`${this.props.currentPage === idx + 1 ? "active" : ""}`}
              onClick={() => handleClick(idx)}>
              {idx + 1}
            </button>
          ))}
        </div>
      </PaginationContainer>
    );
  }
}

export default Pagination;
