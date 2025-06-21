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
  text: string | null
}) => (
  <Stack direction="row" spacing={1} alignItems="center">
    {icon}
    <Typography variant="body1">{text || 'Not found'}</Typography>
  </Stack>
)

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
          <Typography variant="h6" component="div" fontWeight={600}>
            {flag} {name}
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
            text={languages?.length ? languages.join(' / ') : null}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default CountryCard
