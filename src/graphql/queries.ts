import { gql } from '@apollo/client'

export const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      phone
      capital
      currency
      languages {
        native
      }
      continent {
        name
      }
      emoji
    }
  }
`
