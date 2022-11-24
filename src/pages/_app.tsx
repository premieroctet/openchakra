import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import theme from '@chakra-ui/theme'
// import theme from '../theme/index'
import 'react-color-picker/index.css'
import '@reach/combobox/styles.css'

import { wrapper } from '~core/store'
import { ErrorBoundary as BugsnagErrorBoundary } from '~utils/bugsnag'
import AppErrorBoundary from '~components/errorBoundaries/AppErrorBoundary'
import { AppProps } from 'next/app'
import Fonts from '~dependencies/theme/Fonts'

const Main = ({ Component, pageProps }: AppProps) => (
  <BugsnagErrorBoundary>
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <AppErrorBoundary>
        <Component {...pageProps} />
      </AppErrorBoundary>
    </ChakraProvider>
  </BugsnagErrorBoundary>
)

export default wrapper.withRedux(Main)
