import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { ThemeProvider, CSSReset, theme } from '@chakra-ui/core'
import { Provider } from 'react-redux'
import { store } from './core/store'

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <CSSReset />
      <App />
    </ThemeProvider>
  </Provider>,

  document.getElementById('root'),
)
