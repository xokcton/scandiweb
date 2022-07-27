import { gql } from '@apollo/client'

export const GET_CATEGORIES_NAMES = gql`
  query GetCategoriesNames {
    categories {
      name
    }
  }
`

export const GET_CERTAIN_CATEEGORY = gql`
  query GetCertainCategory($name: String!) {
    category(input: { title: $name }) {
      name
      products {
        id
        name
        inStock
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        gallery
      }
    }
  }
` 