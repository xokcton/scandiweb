import styled from "styled-components"

export const SliderContainer = styled.div`
  .multipleImages {
    width: 100px;
    height: 190px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .slider-leftArrow, .slider-rightArrow {
      position: absolute;
      width: 20px;
      height: 20px;
      background-color: rgba(0,0,0,0.7);
      &:hover {
        cursor: pointer;
        background-color: rgba(0,0,0,0.5);
      }
    }
    .slider-leftArrow{
      right: 40px;
      bottom: 20px;
      img {
        transform: rotate(90deg);
        filter:  brightness(0) invert(1);
      }
    }
    .slider-rightArrow {
      right: 10px;
      bottom: 20px;
      img {
        transform: rotate(-90deg);
        filter:  brightness(0) invert(1);
      }
    }
  }
`