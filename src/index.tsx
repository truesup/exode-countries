import client from './apollo/client'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@emotion/react'
import ReactDOM from 'react-dom/client'
import { CircularProgress, Box } from '@mui/material'
import React, { Suspense, lazy } from 'react'
import theme from './theme/theme'
import './index.css'

const App = lazy(() => import('./App'))

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Suspense
          fallback={
            <Box
              sx={{
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(20, 28, 48, 0.95)',
              }}>
              <CircularProgress sx={{ color: 'white' }} />
            </Box>
          }>
          <App />
        </Suspense>
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
)
