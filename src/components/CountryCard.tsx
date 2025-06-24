import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'
import {
  LocationCity as LocationCityIcon,
  Flag as FlagIcon,
  Public as PublicIcon,
  Phone as PhoneIcon,
  CurrencyExchange as CurrencyIcon,
  Translate as TranslateIcon,
} from '@mui/icons-material'
import { useEffect, useState, ReactNode } from 'react'

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

const InfoRow = ({ icon, text }: { icon: ReactNode; text: ReactNode }) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {icon}
    <Typography variant="body1">{text || 'Not found'}</Typography>
  </Stack>
)

const useIsLargeScreen = (breakpoint: number = 900): boolean => {
  const [isLarge, setIsLarge] = useState(
    typeof window !== 'undefined' ? window.innerWidth > breakpoint : true
  )

  useEffect(() => {
    const onResize = () => setIsLarge(window.innerWidth > breakpoint)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoint])

  return isLarge
}

const truncate = (text: string, max: number): string => {
  if (text.length <= max) return text
  const words = text.split(' ')
  let result = ''
  for (const word of words) {
    if ((result + ' ' + word).trim().length > max) break
    result += (result ? ' ' : '') + word
  }
  return result.trim() + '...'
}

const formatLanguages = (langs: string[], max = 3): string =>
  langs.length <= max ? langs.join('/') : `${langs.slice(0, max).join('/')}...`

const CountryCard = ({
  flag,
  name,
  continent,
  code,
  capital,
  phone,
  currency,
  languages,
}: Props) => {
  const theme = useTheme()
  const isLarge = useIsLargeScreen()

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
          <Typography variant="h2" component="div" title={`${flag} ${name}`}>
            {flag} {isLarge ? truncate(name, 22) : name}
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
            text={phone && `+${phone}`}
          />
          <InfoRow
            icon={<CurrencyIcon sx={{ color: 'gray' }} />}
            text={currency}
          />
          <InfoRow
            icon={<TranslateIcon sx={{ color: 'gray' }} />}
            text={
              <span title={languages.join(' / ')}>
                {formatLanguages(languages)}
              </span>
            }
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CountryCard
