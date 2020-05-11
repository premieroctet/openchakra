import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import { Provider } from 'react-redux'

import { store } from './core/store'
// import { ErrorBoundary as BugsnagErrorBoundary } from './utils/bugsnag'
import AppErrorBoundary from './components/errorBoundaries/AppErrorBoundary'

ReactDOM.render(
  // <BugsnagErrorBoundary>
  <ThemeProvider theme={theme}>
    <AppErrorBoundary>
      <Provider store={store}>
        <CSSReset />
        <App />
      </Provider>
    </AppErrorBoundary>
  </ThemeProvider>,
  // </BugsnagErrorBoundary>,

  document.getElementById('root'),
)
