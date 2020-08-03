import React from 'react'
import App from '../App'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import 'react-color-picker/index.css'
import '@reach/combobox/styles.css'

import { wrapper } from '../core/store'
import { ErrorBoundary as BugsnagErrorBoundary } from '../utils/bugsnag'
import AppErrorBoundary from '../components/errorBoundaries/AppErrorBoundary'

const Main = () => (
  <BugsnagErrorBoundary>
    <ThemeProvider theme={theme}>
      <AppErrorBoundary>
        <CSSReset />
        <App />
      </AppErrorBoundary>
    </ThemeProvider>
  </BugsnagErrorBoundary>
)

export default wrapper.withRedux(Main)
