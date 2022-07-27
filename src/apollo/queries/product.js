import { gql } from '@apollo/client'

export const GET_PRODUCT = gql`
  query getProduct($id: String!) {
    product(id: $id){
      name
      id
      inStock
      gallery
      description
      category
      attributes{
        id
        name
        type
        items{
          id
          value
          displayValue
        }
      }
      prices{
        amount
        currency{
          label
          symbol
        }
      }
      brand
    }
  }
`