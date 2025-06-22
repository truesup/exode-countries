import {
  Paper,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useQuery } from '@apollo/client'
import { GET_COUNTRIES } from '../graphql/queries'
import { useEffect, useRef, useState, useMemo } from 'react'
import CountryCard from './CountryCard'

interface Props {
  filter: string
  mode: 'name' | 'code' | null
}

interface Country {
  emoji: string
  name: string
  continent: { name: string }
  code: string
  capital: string
  phone: string
  currency: string
  languages: { native: string }[]
}

const CountriesSection = ({ filter, mode }: Props) => {
  const [countriesList, setCountriesList] = useState<Country[]>([])
  const [visibleCount, setVisibleCount] = useState(9)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const { data, loading, error, refetch } = useQuery(GET_COUNTRIES)

  useEffect(() => {
    if (data?.countries) {
      setCountriesList(data.countries)
    }
  }, [data])

  const filteredCountries = useMemo(() => {
    if (!filter.trim() || !mode) return countriesList

    const search = filter.toLowerCase()

    return countriesList.filter(country =>
      mode === 'name'
        ? country.name.toLowerCase().includes(search)
        : country.code.toLowerCase().includes(search)
    )
  }, [countriesList, filter, mode])

  const handleScroll = () => {
    const el = scrollRef.current
    if (!el || isFetchingMore) return

    const { scrollTop, scrollHeight, clientHeight } = el
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200

    if (isNearBottom && visibleCount < filteredCountries.length) {
      setIsFetchingMore(true)
      setTimeout(() => {
        setVisibleCount(prev => Math.min(prev + 6, filteredCountries.length))
        setIsFetchingMore(false)
      }, 250)
    }
  }

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [filteredCountries.length, visibleCount, isFetchingMore])

  return (
    <Paper
      component="section"
      elevation={3}
      ref={scrollRef}
      sx={{
        p: 2,
        width: '100%',
        height: '100%',
        borderRadius: 2,
        backgroundColor: 'rgba(20, 28, 48, 0.95)',
        overflowY: 'scroll',
        position: loading ? 'relative' : 'static',
      }}>
      {loading && (
        <CircularProgress
          size={32}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
          }}
        />
      )}

      {!loading && error && (
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
          sx={{ height: '100%' }}>
          <Grid>
            <Typography variant="h2" color="white" textAlign="center">
              Error fetching countries 😓
            </Typography>
          </Grid>
          <Grid>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={() => refetch()}
              sx={{ color: 'white', borderColor: 'white' }}>
              Try again
            </Button>
          </Grid>
        </Grid>
      )}

      {!loading && !error && (
        <Grid
          container
          spacing={2}
          columns={{ xs: 6, sm: 6, md: 12, lg: 12, xl: 16 }}>
          {filteredCountries.slice(0, visibleCount).map(country => (
            <Grid
              key={country.code}
              size={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
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

          {isFetchingMore && (
            <Grid
              sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <CircularProgress size={24} sx={{ color: 'white' }} />
            </Grid>
          )}
        </Grid>
      )}
    </Paper>
  )
}

export default CountriesSection
