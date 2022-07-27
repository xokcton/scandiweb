import React, { Component } from 'react'

import { withUseSelector } from 'components/hoc'
import { getPages } from 'redux/features/pagination/selector'

import { PaginationContainer } from "./PaginationContainer"

class Pagination extends Component {
  constructor(props) {
    super(props)
    this.dispatch = this.props.dispatch
  }

  render() {
    const handleClick = (idx) => {
      this.props.setStep(idx)

      if (idx > 0) this.setState({ isPrevDisabled: false })
      else this.setState({ isPrevDisabled: true })

      if (this.props.selectorValue.maxPagesNumber - 1 === idx) this.setState({ isNextDisabled: true })
      else this.setState({ isNextDisabled: false })
    }

    return (
      <PaginationContainer>
        <div className="pages">
          {
            [...new Array(this.props.selectorValue.maxPagesNumber)].map((_, idx) => (
              <button key={idx} className={`${this.props.currentPage === (idx + 1) ? 'active' : ''}`} onClick={() => handleClick(idx)}>{ idx + 1 }</button>
            ))
          }
        </div>
      </PaginationContainer>
    )
  }
}

export default withUseSelector(Pagination, getPages)
