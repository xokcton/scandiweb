import styled from "styled-components"

export const CartPageContainer = styled.div`
  .nothingToShow {
    margin-top: 30px;
    font-size: 20px;
    font-weight: bold;
    .goBack {
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        color: #5ECE7B;
      }
    }
  }
  .header {
    font-weight: 400;
    font-size: 42px;
    text-transform: capitalize;
    padding-bottom: 50px;
    border-bottom: 1px solid #E5E5E5;
  }
  .innerPart {
    max-width: 1250px;
    .cartItemsList {
      min-height: 335px;
      padding: 20px 0;
      border-bottom: 1px solid #E5E5E5 !important;
    }
  }
  .summary {
    margin-top: 20px;
    height: 200px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    div {
      display: flex;
      flex-direction: row;
      gap: 10px;
      p {
        width: 150px;
        font-size: 20px;
        color: #1D1F22;
        font-weight: 400;
      }
      b {
        font-size: 20px;
        color: #1D1F22;
        font-weight: 700;
      }
      .lastItemWithButtons {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 280px;
        height: 45px;
        outline: none;
        cursor: pointer;
        background-color: #fff;
        border: 1px solid #1D1F22;
        color: #1D1F22;
        text-transform: capitalize;
        text-decoration: none;
        font-size: 18px;
        transition: all 0.2s ease-in-out;
        &:hover {
          background-color: #1D1F22;
          color: #fff;
        }
      }
      .lastItemWithGreenButton{
        color: #fff;
        background-color: #5ECE7B;
        border: none;
        &:hover {
          background-color: #237337;
        }
      }
    }
  }
`