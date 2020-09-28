import React from 'react'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import 'react-color-picker/index.css'
import '@reach/combobox/styles.css'

import { wrapper } from '~core/store'
import { ErrorBoundary as BugsnagErrorBoundary } from '~utils/bugsnag'
import AppErrorBoundary from '~components/errorBoundaries/AppErrorBoundary'
import { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'

const Main = ({ Component, pageProps }: AppProps) => (
  <Provider session={pageProps.session}>
    <BugsnagErrorBoundary>
      <ThemeProvider theme={theme}>
        <AppErrorBoundary>
          <CSSReset />
          <Component {...pageProps} />
        </AppErrorBoundary>
      </ThemeProvider>
    </BugsnagErrorBoundary>
  </Provider>
)

export default wrapper.withRedux(Main)
