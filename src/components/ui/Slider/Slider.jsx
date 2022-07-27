import React, { Component } from 'react'

import { SliderContainer } from "./SliderContainer"

import Arrow from "assets/arrow.png"

class Slider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentImage: 0,
    }
  }

  handleArrowClick = (flag) => {
    const theLastImageIdx = this.props.images.length - 1
    let nextImage = 0
    if (flag) {
      nextImage = this.state.currentImage + 1 > theLastImageIdx ? 0 : this.state.currentImage + 1
    } else {
      nextImage = this.state.currentImage - 1 < 0 ? theLastImageIdx : this.state.currentImage - 1
    }
    this.setState({ currentImage: nextImage })
  }

  render() {
    return (
      <SliderContainer>
        <div className="multipleImages">
          <img src={this.props.images[this.state.currentImage]} alt="slider" />
          <div className="slider-leftArrow" onClick={() => this.handleArrowClick(false)}>
            <img src={Arrow} alt="left-arrow" />
          </div>
          <div className="slider-rightArrow"  onClick={() => this.handleArrowClick(true)}>
            <img src={Arrow} alt="right-arrow" />
          </div>
        </div>
      </SliderContainer>
    )
  }
}

export default Slider
