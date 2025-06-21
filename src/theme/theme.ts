import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  typography: {
    fontFamily: `'Mulish', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`,
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '1.6rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    body2: {
      fontSize: '1rem',
      fontWeight: 400,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 300,
    },
    subtitle2: {
      fontSize: '0.6rem',
      fontWeight: 300,
    },
  },
})

export default theme
