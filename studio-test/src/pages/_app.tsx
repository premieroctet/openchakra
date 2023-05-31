import React from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import 'react-color-picker/index.css'
import '@reach/combobox/styles.css'

import { AppProps } from 'next/app'
import Fonts from '../dependencies/theme/Fonts'
import theme from '../dependencies/theme/theme'
import { UserWrapper } from '../dependencies/context/user'

import '../../public/styles.css'

const Main = ({ Component, pageProps }: AppProps) => (
  <UserWrapper>
    <ChakraProvider resetCSS theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  </UserWrapper>
)

export default Main
