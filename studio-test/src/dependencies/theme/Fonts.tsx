import React from 'react'
import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: 'Tomarik';
        src: local('Tomarik Display Line'), local('Tomarik-Display-Line'),
            url('fonts/Tomarik-DisplayLine.woff2') format('woff2'),
            url('fonts/Tomarik-DisplayLine.woff') format('woff'),
            url('fonts/Tomarik-DisplayLine.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Radikal';
        src: local('Radikal'), local('Radikal Bold'),
            url('fonts/Radikal-Bold.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      `}
  />
)

export default Fonts
