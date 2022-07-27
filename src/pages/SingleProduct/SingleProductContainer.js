import styled from "styled-components"

export const SingleProductContainer = styled.div`
  max-width: 1250px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  @media screen and (max-width: 1350px) {
    flex-direction: column-reverse;
  }
  .imageWrapper {
    position: absolute;
    z-index: 10;
    left: -50px;
    top: 0;
    width: 140px;
    height: 500px;
    overflow-y: scroll;
    overflow-x: hidden;
    &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
      border-radius: 10px;
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar {
      width: 10px;
      background-color: #F5F5F5;
    }
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
      background-color: #5ECE7B;
    }
    @media screen and (max-width: 1350px) {
      width: 750px;
      height: 140px;
      overflow-x: auto;
      overflow-y: hidden;
      position: relative;
      margin-top: 20px;
    }
    .extraImages {
      width: 100%;
      height: auto;
      padding: 20px 0;
      display: flex;
      flex-direction: column;
      gap: 40px;
      align-items: center;
      justify-content: center;
      @media screen and (max-width: 1350px) {
        width: auto;
        height: 100%;
        flex-direction: row;
        padding: 20px;
      }
      img {
        width: 80px;
        height: 80px;
        transition: box-shadow 0.2s ease-in-out;
        object-fit: cover;
        &:hover {
          cursor: pointer;
          box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.4);
        }
        &.active {
          outline: 1px solid #5ECE7B;
        }
      }
    }
  }
  .wrapper {
    max-width: 1000px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 100px;
    grid-row-gap: 0px;
    .left {
      img {
        max-height: 500px
      }
    }
    .right {
      max-width: 290px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .head {
        width: 100%;
        .name {
          font-weight: 600;
          font-style: normal;
          font-size: 30px;
          color: #1D1F22;
          margin-bottom: 10px;
        }
        .brand {
          font-weight: 400;
          font-style: normal;
          font-size: 30px;
          color: #1D1F22;
        }
      }
      .size {
        div {
          display: flex;
          align-items: center;
          gap: 10px;
          div {
            width: 60px;
            height: 45px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #1D1F22;
            &.active {
              color: #fff;
              background-color: #1D1F22;
            }
            &:hover {
              cursor: pointer;
              border: 1px dashed #1D1F22;
            }
          }
        }
      }
      .color {
        div {
          display: flex;
          align-items: center;
          gap: 10px;
          div {
            width: 32px;
            height: 32px;
            outline: 1px solid #c7c7c7;
            &.active {
              outline: 3px solid #5ECE7B;
            }
            &:hover {
              cursor: pointer;
              outline: 3px solid #5ECE7B;
            }
          }
        }
      }
      .capacity {
        div {
          display: flex;
          align-items: center;
          gap: 10px;
          div {
            width: 70px;
            height: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #1D1F22;
            &.active {
              color: #fff;
              background-color: #1D1F22;
            }
            &:hover {
              cursor: pointer;
              border: 1px dashed #1D1F22;
            }
          }
        }
      }
      .usb {
        div {
          display: flex;
          align-items: center;
          gap: 10px;
          div {
            width: 40px;
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #1D1F22;
            &.active {
              color: #fff;
              background-color: #1D1F22;
            }
            &:hover {
              cursor: pointer;
              border: 1px dashed #1D1F22;
            }
          }
        }
      }
      .price {
        .second {
          font-size: 24px;
        }
      }
      button {
        width: 100%;
        padding: 16px 32px;
        height: 52px;
        background: #5ECE7B;
        color: #fff;
        outline: none;
        border: none;
        text-transform: uppercase;
        font-weight: 600;
        font-size: 16px;
        transition: all 0.3s ease-in-out;
        &:hover {
          cursor: pointer;
          background: #237337;
        }
      }
      .description {
        width: 100%;
        margin-top: 40px;
        font-style: normal;
        font-weight: 400;
        font-size: 16px;
        color: #1D1F22;
      }
    }
  }
  .attr_header {
    width: 100%;
    display: flex;
    margin-top: 40px;
    flex-direction: column;
    p {
      font-style: normal;
      font-weight: 700;
      font-size: 18px;
      color: #1D1F22;
      text-transform: uppercase;
      margin-bottom: 10px;
    }
  }
`