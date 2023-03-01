import React from 'react'
import { Global } from '@emotion/react'

const Fonts = () => (
  <Global
    styles={`
      /* latin */
      @font-face {
        font-family: Tomarik;
        src: local('Tomarik Display Line'), local('Tomarik-Display-Line'),
            url('fonts/Tomarik-DisplayLine.woff2') format('woff2'),
            url('fonts/Tomarik-DisplayLine.woff') format('woff'),
            url('fonts/Tomarik-DisplayLine.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: Radikal;
        src: local('Radikal'), local('Radikal Bold'),
            url('fonts/Radikal-Bold.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Radikal Thin';
        src: local('Radikal Thin'), local('Radikal-Thin'),
            url('fonts/Radikal-Thin.woff') format('woff');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Futura';
        src: local('Futura'), 
            url('fonts/futura.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Digital-7';
        src: local('digital 7'), local('digital-7'),
            url('fonts/digital-7.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Cabin';
        src: local('Cabin'), 
            url('fonts/Cabin-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'Cabin';
        src: local('Cabin'), 
            url('fonts/Cabin-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
      }
      @font-face {
        font-family: 'DancingScript';
        src: local('DancingScript'), 
            url('fonts/DancingScript-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      @font-face {
        font-family: 'DancingScript';
        src: local('DancingScript'), 
            url('fonts/DancingScript-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
      }
      @font-face {
        font-family: 'Playfair Display';
        src: local('Playfair Display'), 
            url('fonts/PlayfairDisplay-regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
      }
      `}
  />
)

export default Fonts
