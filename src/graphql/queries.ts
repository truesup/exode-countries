import { gql } from '@apollo/client'

export const GET_COUNTRIES = gql`
  query {
    countries(filter: { code: { in: "UZ" } }) {
      code
      name
      phone
      capital
      currency
      languages {
        name
        native
        rtl
      }
      continent {
        name
      }
      emoji
    }
  }
`
