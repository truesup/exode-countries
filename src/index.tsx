import client from './apollo/client'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from '@emotion/react'
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import theme from './theme/theme'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ApolloProvider>
  </React.StrictMode>
)
