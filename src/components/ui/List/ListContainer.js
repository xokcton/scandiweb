import styled from "styled-components"

export const ListContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
    border-radius: 10px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar {
    width: 5px;
    background-color: #F5F5F5;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
    background-color: #5ECE7B;
  }
  .listWrapper {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 40px;
    .eachItem {
      width: 100%;
      min-height: 190px;
      display: flex;
      flex-direction: row;
      align-items: start;
      justify-content: space-between;
      gap: 10px;
      .leftPart, .rightPart {
        width: 140px;
        min-height: 190px;
      }
      .leftPart {
        display: flex;
        flex-direction: column;
        align-items: start;
        .head {
          width: 100%;
          text-transform: capitalize;
          padding-bottom: 5px;
          .name {
            text-align: start;
            font-weight: 300;
            font-style: normal;
            font-size: 16px;
            color: #1D1F22;
            margin-bottom: 5px;
          }
          .brand {
            text-align: start;
            font-weight: 300;
            font-style: normal;
            font-size: 16px;
            color: #1D1F22;
          }
        }
        .attr_cart_header {
          width: 100%;
          display: flex;
          margin-top: 5px;
          flex-direction: column;
          p {
            font-style: normal;
            font-weight: 300;
            font-size: 14px;
            color: #1D1F22;
            text-transform: capitalize;
            margin-bottom: 5px;
          }
          div {
            display: flex;
            flex-direction: row;
            align-items: start;
            gap: 5px;
          }
          .general {
            div {
              min-width: 20px;
              min-height: 20px;
              padding: 5px 5px;
              border: 1px solid #1D1F22;
              &.active {
                color: #fff;
                background-color: #1D1F22;
              }
            }
          }
          .color {
            div {
              min-width: 20px;
              min-height: 20px;
              outline: 1px solid #c7c7c7;
              &.active {
                outline: 3px solid #5ECE7B;
              }
            }
          }
        }
      }
      .rightPart {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: start;
        gap: 10px;
        .arrows {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          min-height: 190px;
          .plus, .minus {
            width: 30px;
            height: 30px;
            font-size: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #1D1F22;
            &:hover {
              cursor: pointer;
              border: 1px dashed #1D1F22;
            }
          }
          .number {
            font-weight: bold;
            text-align: center;
          }
        }
        .slider {
          height: 190px;
          width: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          img {
            height: 100%;
            width: 100%;
            object-fit: cover;
          }
        }
      }
    }
  }
`