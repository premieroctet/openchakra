import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import { Provider } from 'react-redux'

import { store } from './core/store'
import { ErrorBoundary } from './utils/bugsnag'

ReactDOM.render(
  <ErrorBoundary>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <App />
      </ThemeProvider>
    </Provider>
  </ErrorBoundary>,

  document.getElementById('root'),
)
