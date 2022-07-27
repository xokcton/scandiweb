import styled from "styled-components"

export const HeaderComponent = styled.div`
  max-width: 1250px;
  padding: 0 15px 0 15px;
  height: 80px;
  max-height: 80px;
  background-color: #fff;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .left {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0px;
    width: 234px;
    height: 56px;
    div {
      text-align: center;
      padding: 5px 10px 20px;
      font-weight: 500;
      text-transform: uppercase;
      transition: all 0.5s ease-in-out;
      &.active {
        color: #5ECE7B;
        border-bottom: 1px solid #5ECE7B;
      }
      &:hover {
        color: #5ECE7B;
        cursor: pointer;
      }
    }
  }
  .right{
    width: 234px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    padding: 0px;
    gap: 22px;
    height: 40px;
    right: 101px;
    top: 23px;
    img {
      cursor: pointer;
    }
    .currencies {
      transition: all ease-in-out 0.5s;
      position: relative;
      z-index: 10000;
      .currencyDropDownPreview {
        position: relative;
        display: flex;
        cursor: pointer;
        .currencyNextToArrow {
          padding-right: 10px;
          font-size: 20px;
        }
        img {
          width: 20px;
          padding-top: 5px;
        }
      }
      .dropDown {
        position: absolute;
        display: block;
        min-width: 115px;
        right: 5;
        top: 40px;
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
        border-radius: 3px;
        div {
          font-size: 20px;
          padding: 10px 20px;
          text-align: justify;
          cursor: pointer;
          &:hover {
            background-color: #EEEEEE;
          }
        }
      }
    }
  }
  .hidden {
    display: none !important;
  }
  .rotateArrow {
    transform: rotate(-180deg);
  }
`