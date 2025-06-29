import {
  Paper,
  Grid,
  Button,
  Typography,
  CircularProgress,
} from '@mui/material'
import RefreshIcon from '@mui/icons-material/Refresh'
import { useQuery } from '@apollo/client'
import { useEffect, useRef, useState, useMemo, useCallback } from 'react'
import { GET_COUNTRIES } from '../graphql/queries'
import CountryCard from './CountryCard'
import type { SearchMode } from '../types/search'

interface CountriesSectionProps {
  searchMode: SearchMode
  searchData: any
  searchLoading: boolean
  searchError: any
  hasSearchBeenSubmitted: boolean
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

const CountriesSection = ({
  searchMode,
  searchData,
  searchLoading,
  searchError,
  hasSearchBeenSubmitted,
}: CountriesSectionProps) => {
  const [visibleCount, setVisibleCount] = useState(9)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const scrollRef = useRef<HTMLDivElement | null>(null)

  const {
    data: allCountriesData,
    loading: allCountriesLoading,
    error: allCountriesError,
    refetch,
  } = useQuery(GET_COUNTRIES)

  const countriesList: Country[] = useMemo(() => {
    return searchMode && hasSearchBeenSubmitted
      ? searchData?.countries ?? []
      : allCountriesData?.countries ?? []
  }, [searchMode, hasSearchBeenSubmitted, searchData, allCountriesData])

  // для скролла и лоадера снизу (фейк загрузка)
  // коллбэк потому что функция передается в зависимости useEffect ниже
  const handleScroll = useCallback(() => {
    const el = scrollRef.current
    if (!el || isFetchingMore) return

    const { scrollTop, scrollHeight, clientHeight } = el
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - 200

    if (isNearBottom && visibleCount < countriesList.length) {
      setIsFetchingMore(true)
      setTimeout(() => {
        setVisibleCount(prev => Math.min(prev + 6, countriesList.length))
        setIsFetchingMore(false)
      }, 250)
    }
  }, [isFetchingMore, visibleCount, countriesList.length])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    el.addEventListener('scroll', handleScroll)
    return () => el.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const showLoading = searchLoading || allCountriesLoading
  const showError = searchError || allCountriesError

  const renderLoader = () => (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ height: '100%' }}>
      <CircularProgress size={32} sx={{ color: 'white' }} />
    </Grid>
  )

  const renderError = () => (
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
  )

  const renderEmptySearchResult = () => (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
      sx={{ height: '100%' }}>
      <Grid>
        <Typography variant="h2" color="white" textAlign="center">
          No matches found for your search 😓
        </Typography>
      </Grid>
    </Grid>
  )

  const renderCountries = () => (
    <Grid
      container
      spacing={2}
      columns={{ xs: 6, sm: 6, md: 12, lg: 12, xl: 16 }}>
      {countriesList.slice(0, visibleCount).map(country => (
        <Grid key={country.code} size={{ xs: 6, sm: 6, md: 6, lg: 4, xl: 4 }}>
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
  )

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
        // для лоадера
        position: showLoading ? 'relative' : 'static',
      }}>
      {showLoading
        ? renderLoader()
        : showError
        ? renderError()
        : searchMode && hasSearchBeenSubmitted && countriesList.length === 0
        ? renderEmptySearchResult()
        : renderCountries()}
    </Paper>
  )
}

export default CountriesSection
