import React from 'react'
import { ChakraProvider, CSSReset } from '@chakra-ui/core'
import theme from '~chakra'
import 'react-color-picker/index.css'
import '@reach/combobox/styles.css'

import { wrapper } from '~core/store'
import { ErrorBoundary as BugsnagErrorBoundary } from '~utils/bugsnag'
import AppErrorBoundary from '~components/errorBoundaries/AppErrorBoundary'
import { AppProps } from 'next/app'

const Main = ({ Component, pageProps }: AppProps) => (
  <BugsnagErrorBoundary>
    <ChakraProvider theme={theme}>
      <AppErrorBoundary>
        <CSSReset />
        <Component {...pageProps} />
      </AppErrorBoundary>
    </ChakraProvider>
  </BugsnagErrorBoundary>
)

export default wrapper.withRedux(Main)
