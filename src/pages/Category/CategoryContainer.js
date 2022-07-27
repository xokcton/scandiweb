import styled from "styled-components"

export const CategoryContainer = styled.div`
  .header {
    font-weight: 400;
    font-size: 42px;
    text-transform: capitalize; 
  }
  .products {
    margin-top: 80px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-template-rows: repeat(1, 1fr);
    grid-column-gap: 24px;
    grid-row-gap: 50px;
    margin-bottom: 50px;
    .notInStock {
      position: relative;
      max-width: 388px;
      max-height: 430px;
      width: 388px;
      height: 430px;
      display: flex;
      align-items: center;
      justify-content: center;
      &::after {
        content: "OUT OF STOCK";
        position: absolute;
        display: block;
        width: 388px;
        height: 430px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.1);
        color: #8D8F9A;
        font-weight: 400;
        font-size: 24px;
        text-align: center;
        line-height: 430px;
        z-index: 1000;
      }
      .item {
        max-width: 350px;
        max-height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        img {
          width: 100%;
          height: 320px;
        }
        div {
          margin-top: 30px;
          max-height: 50px;
          width: 100%;
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          p, b {
            width: 100%;
            height: 20px;
            color: #c7c7c7;
          }
        }
      }
    }
    .wrapper {
      position: relative;
      max-width: 388px;
      max-height: 430px;
      width: 388px;
      height: 430px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      &:hover {
        cursor: pointer;
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
      }
      .item {
        max-width: 350px;
        max-height: 400px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        img {
          width: 100%;
          height: 320px;
        }
        div {
          margin-top: 30px;
          max-height: 50px;
          width: 100%;
          height: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-between;
          p, b {
            width: 100%;
            height: 20px;
          }
        }
      }
      .add-to-cart {
        position: absolute;
        width: 50px;
        height: 50px;
        background-color: #5ECE7B;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.1);
        right: 31px;
        bottom: 72px;
        transition: all 0.3s ease-in-out;
        &:hover {
          box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.2);
          background-color: #237337;
        }
        img {
          width: 25px;
          height: 25px;
          filter:  brightness(0) invert(1);
        }
      }
    }
    @media screen and (max-width: 1250px) {
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    }
    @media screen and (max-width: 760px) {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
    }
  }
`