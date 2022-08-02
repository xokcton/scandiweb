import styled from "styled-components"

export const CartContainer = styled.div`
  .cartAfter {
    width: 20px;
    height: 20px;
    position: relative;
    .cartItemsAmount {
      width: 30px;
      height: 30px;
      cursor: pointer;
      user-select: none;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      background-color: #000;
      outline: none;
      border-radius: 50%;
      padding: 5px;
      right: -25px;
      top: -15px;
    }
  }
  .substrate {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    top: 63px;
    overflow: hidden;
    width: 100vw;
    min-height: 100vh;
    background-color: rgba(0,0,0,0.2);
    z-index: 1500;
    .cartModal {
      position: absolute;
      right: 70px;
      padding: 32px 16px;
      width: 325px;
      height: 675px;
      background-color: #fff;
      display: flex;
      flex-direction: column;
      gap: 30px;
      .cartHeader {
        display: flex;
        flex-direction: row;
        gap: 10px;
        b {
          text-transform: capitalize;
          font-weight: bold;
        }
      }
      .itemsWrapper {
        height: 420px;
        width: 100%;
      }
      .total {
        width: 100%;
        height: 30px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      .buttons {
        width: 100%;
        height: 45px;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        button {
          cursor: pointer;
          width: 140px;
          height: 45px;
          text-transform: uppercase;
          outline: none;
          transition: all 0.2s ease-in-out;
          background-color: #fff;
          color: #1D1F22;
          border: 1px solid #000;
          font-weight: bold;
          &:hover {
            background-color: #1D1F22;
            color: #fff;
          }
        }
        .success {
          cursor: pointer;
          width: 140px;
          height: 45px;
          text-transform: uppercase;
          outline: none;
          transition: all 0.2s ease-in-out;
          text-decoration: none;
          font-weight: bold;
          font-size: 13px;
          background-color: #5ECE7B;
          color: #fff;
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          &:hover {
            background-color: #237337;
          }
        }
      }
    }
  }
`