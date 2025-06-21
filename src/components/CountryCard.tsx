import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import FlagIcon from '@mui/icons-material/Flag'
import PublicIcon from '@mui/icons-material/Public'
import PhoneIcon from '@mui/icons-material/Phone'
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange'
import TranslateIcon from '@mui/icons-material/Translate'
import { useEffect, useState } from 'react'

interface Props {
  flag: string
  name: string
  continent: string
  code: string
  capital: string
  phone: string
  currency: string
  languages: string[]
}

const InfoRow = ({
  icon,
  text,
}: {
  icon: React.ReactNode
  text: React.ReactNode
}) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {icon}
    <Typography variant="body1">{text || 'Not found'}</Typography>
  </Stack>
)

const useIsLargeScreen = (breakpoint: number = 900) => {
  const [isLargeScreen, setIsLargeScreen] = useState(
    typeof window !== 'undefined' ? window.innerWidth > breakpoint : true
  )

  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > breakpoint)
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [breakpoint])

  return isLargeScreen
}

const CountryCard = ({
  flag,
  name,
  capital,
  code,
  continent,
  phone,
  currency,
  languages,
}: Props) => {
  const theme = useTheme()
  const isLargeScreen = useIsLargeScreen()

  const truncateByCharLimit = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    const words = text.split(' ')
    let result = ''

    for (const word of words) {
      if ((result + (result ? ' ' : '') + word).length > maxLength) break
      result += (result ? ' ' : '') + word
    }

    return result.trim() + '...'
  }

  const displayLanguages = (languages: string[], max: number = 3): string => {
    if (languages.length <= max) return languages.join('/')
    return `${languages.slice(0, max).join('/')}...`
  }

  return (
    <Card
      sx={{
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}>
      <CardHeader
        title={
          <Typography
            variant="h6"
            component="div"
            fontWeight={600}
            title={`${flag} ${name}`}>
            {flag} {isLargeScreen ? truncateByCharLimit(name, 22) : name}
          </Typography>
        }
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: 1,
          mb: 1,
        }}
      />

      <CardContent sx={{ pt: 0 }}>
        <Stack spacing={1.2}>
          <InfoRow
            icon={<PublicIcon sx={{ color: 'gray' }} />}
            text={continent}
          />
          <InfoRow
            icon={<LocationCityIcon sx={{ color: 'gray' }} />}
            text={capital}
          />
          <InfoRow icon={<FlagIcon sx={{ color: 'gray' }} />} text={code} />
          <InfoRow
            icon={<PhoneIcon sx={{ color: 'gray' }} />}
            text={phone ? `+${phone}` : null}
          />
          <InfoRow
            icon={<CurrencyExchangeIcon sx={{ color: 'gray' }} />}
            text={currency}
          />
          <InfoRow
            icon={<TranslateIcon sx={{ color: 'gray' }} />}
            text={
              <span title={languages.join(' / ')}>
                {displayLanguages(languages)}
              </span>
            }
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CountryCard
