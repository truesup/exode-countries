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
export const GET_COUNTRIES_BY_NAME = gql`
  query GetCountriesByName($name: StringQueryOperatorInput) {
    countries(filter: { name: $name }) {
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
