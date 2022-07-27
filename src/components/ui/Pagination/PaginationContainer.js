import styled from "styled-components"

export const PaginationContainer = styled.div`
  width: 100%;
  max-height: 50px;
  height: 50px;
  margin: 80px 0 50px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  .pages{
    max-width: 1250px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 10px;
    button {
      min-width: 30px;
      min-height: 30px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 10px 15px;
      color: #fff;
      border: none;
      outline: none;
      font-weight: bold;
      font-size: 18px;
      background-color: #5ECE7B;
      transition: all 0.3s ease-in-out;
      &:disabled {
        background-color: #c7c7c7;
        cursor: not-allowed;
        &:hover {
          background-color: #c7c7c7;
          box-shadow: none;
          cursor: not-allowed;
        }
      }
      &:hover {
        cursor: pointer;
        background-color: #237337;
        box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.2);
      }
      &.active {
        background-color: #237337;
        box-shadow: 0px 4px 11px rgba(29, 31, 34, 0.2);
      }
    }
  }
`