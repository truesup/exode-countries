import { Paper, Grid } from '@mui/material'
import { useQuery } from '@apollo/client'
import { GET_COUNTRIES } from '../graphql/queries'
import { useEffect, useState } from 'react'
import CountryCard from './CountryCard'

interface Country {
  emoji: string
  name: string
  continent: {
    name: string
  }
  code: string
  capital: string
  phone: string
  currency: string
  languages: {
    native: string
  }[]
}

const CountriesSection = () => {
  const { data, loading, error } = useQuery(GET_COUNTRIES)

  const [countriesList, setCountriesList] = useState<Country[]>([])

  useEffect(() => {
    if (data?.countries) {
      setCountriesList(data?.countries)
    }
  }, [data])

  return (
    <Paper
      component="section"
      elevation={3}
      sx={{
        p: 2,
        width: '100%',
        height: '100%',
        borderRadius: 2,
        backgroundColor: 'rgba(20, 28, 48, 0.95)',
        overflowY: 'scroll',
      }}>
      <Grid
        container
        spacing={2}
        columns={{ xs: 6, sm: 6, md: 12, lg: 12, xl: 16 }}>
        {countriesList.map((country, ind) => (
          <Grid key={ind} size={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
            <CountryCard
              flag={country.emoji}
              name={country.name}
              capital={country.capital}
              code={country.code}
              continent={country.continent.name}
              phone={country.phone}
              currency={country.currency}
              languages={country.languages.map(lang => lang.native)}
            />
          </Grid>
        ))}
      </Grid>
    </Paper>
  )
}

export default CountriesSection
