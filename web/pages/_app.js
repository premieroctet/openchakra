import {getChatURL, mustDisplayChat} from '../config/config'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import 'react-datepicker/dist/react-datepicker.css'
import 'react-input-range/lib/css/index.css'
import 'react-tabs/style/react-tabs.css'
import '../static/cssdashboard.css'
import '../static/form.css'
import '../static/forminputs.css'
import '../static/inputRange.css'
import '../static/style1.css'
import '../static/stylesfonts.css'
import ReactHtmlParser from 'react-html-parser'
import {MuiThemeProvider} from '@material-ui/core/styles'
import App from 'next/app'
import CssBaseline from '@material-ui/core/CssBaseline'
import Head from 'next/head'
import JssProvider from 'react-jss/lib/JssProvider'
import React from 'react'
import Router from 'next/router'
import {I18nextProvider, withTranslation} from 'react-i18next'
import getPageContext from '../lib/getPageContext'
import {snackBarError} from '../utils/notifications'
import {getLoggedUser} from '../utils/context'
import {COMPANY_NAME} from '../utils/i18n'
import i18n from '../server/utils/i18n_init'
import '../static/assets/css/custom.css'

class MyApp extends App {
  constructor() {
    super()
    this.pageContext = getPageContext()
  }

  loadTawkto() {
    if (mustDisplayChat()) {
      (function() {
        let s1 = document.createElement('script'), s0 = document.getElementsByTagName('script')[0]
        s1.async = true
        s1.src=getChatURL()
        s1.charset = 'UTF-8'
        s1.setAttribute('crossorigin', '*')
        s0.parentNode.insertBefore(s1, s0)
      })()
    }
  }

  componentDidMount() {
    this.loadTawkto()
  }

  onDeclineCookies = () => {
    if (getLoggedUser()) {
      snackBarError('Vous allez être déconnecté')
      Router.push('/logout')
    }
  }

  render() {
    const {Component, pageProps, t} = this.props
    return (
      <I18nextProvider i18n={i18n}>
        <Head>
          <title>{t('COMPANY_NAME')}</title>
          <meta property="og:image" content="https://my-alfred.io/static/presentation.jpg"/>
          <meta property="og:description"
            content="Réservez et proposez tous types de services immédiatement et très simplement autour de chez vous"/>
          <meta property="description"
            content="Réservez et proposez tous types de services immédiatement et très simplement autour de chez vous"/>
          <meta property="og:type" content="website"/>
          <meta property="og:url" content="https://my-alfred.io"/>
          <meta property="og:image:secure_url" content="https://my-alfred.io/static/presentation.jpg"/>
          <meta property="og:title" content="My Alfred - services autour de chez vous"/>
          <meta property="fb:app_id" content="512626602698236"/>
          {/* Use minimum-scale=1 to enable GPU rasterization */}
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
            integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
            crossOrigin=""/>
          <link rel="shortcut icon" href="/static/favicon.ico"/>
          <link rel="icon" href="/static/favicon.ico"/>
            // Custom favicon
          <link rel="shortcut icon" href="/static/custom/favicon.svg"/>
          <link rel="icon" href="/static/custom/favicon.svg"/>
          <link rel="preconnect" href="https://fonts.gstatic.com"/>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"/>
        </Head>
        {/* Wrap every page in Jss and Theme providers */}

        <JssProvider
          registry={this.pageContext.sheetsRegistry}
          generateClassName={this.pageContext.generateClassName}
        >
          {/* MuiThemeProvider makes the theme available down the React
                tree thanks to React context. */}
          <MuiThemeProvider
            theme={this.pageContext.theme}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline/>
            {/* Pass pageContext to the _document though the renderPage enhancer
                  to render collected styles on server-side. */}
            <Component pageContext={this.pageContext} {...pageProps} />
          </MuiThemeProvider>
        </JssProvider>
      </I18nextProvider>
    )
  }
}

export default withTranslation('custom', {withRef: true})(MyApp)
