import { gql } from '@apollo/client'

export const COUNTRY_FIELDS = gql`
  fragment CountryFields on Country {
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
`

export const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      ...CountryFields
    }
  }
  ${COUNTRY_FIELDS}
`

export const GET_COUNTRIES_BY_NAME = gql`
  query GetCountriesByName($name: StringQueryOperatorInput) {
    countries(filter: { name: $name }) {
      ...CountryFields
    }
  }
  ${COUNTRY_FIELDS}
`

export const GET_COUNTRIES_BY_CODE = gql`
  query GetCountriesByCode($code: StringQueryOperatorInput) {
    countries(filter: { code: $code }) {
      ...CountryFields
    }
  }
  ${COUNTRY_FIELDS}
`
