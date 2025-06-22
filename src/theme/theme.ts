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
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 500,
      md: 900,
      lg: 1200,
      xl: 1600,
    },
  },
})

export default theme
