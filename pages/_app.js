import React from 'react';
import App, { Container } from 'next/app';
import Head from 'next/head';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import JssProvider from 'react-jss/lib/JssProvider';
import getPageContext from '../lib/getPageContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "react-tabs/style/react-tabs.css";
import "react-input-range/lib/css/index.css";
import '../static/stylesfonts.css';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../static/form.css';
import '../static/forminputs.css';
import "../static/inputRange.css";
import "react-datepicker/dist/react-datepicker.css";
import "../static/cssdashboard.css";
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-credit-cards/es/styles-compiled.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

toast.configure({
  position: 'top-center',
  autoClose: 2500,
});
class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  loadTawlkto(){
    var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
    (function(){
      var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
      s1.async=true;
      s1.src='https://embed.tawk.to/5de4db8c43be710e1d201adc/default';
      s1.charset='UTF-8';
      s1.setAttribute('crossorigin','*');
      s0.parentNode.insertBefore(s1,s0);
    })();
  }

  componentDidMount() {
    this.loadTawlkto()
  }

  render() {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <Head>
          <title>My Alfred</title>
	          <meta property="og:image" content="https://my-alfred.io/static/presentation.jpg" />
            <meta property="og:description" content="Réservez et proposez tous types de services immédiatement et très simplement autour de chez vous" />
            <meta property="description" content="Réservez et proposez tous types de services immédiatement et très simplement autour de chez vous" />
            <meta property="og:type" content="website" />
            <meta property="og:url"content="https://my-alfred.io" />
            <meta property="og:image:secure_url" content="https://my-alfred.io/static/presentation.jpg" />
            <meta property="og:title" content="My Alfred - services autour de chez vous" />
            <meta property="fb:app_id" content="512626602698236" />
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
                integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
                crossOrigin=""/>
            <link rel="shortcut icon" type="image/png" href="/static/favicon.png" />
            <link rel="icon" type="image/png" href="/static/favicon.png" />

            <script src="https://www.googletagmanager.com/gtag/js?id=G-5ZTWZ756HY"></script>
            <script src="/static/assets/ga.js" />
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
            sheetsManager={this.pageContext.sheetsManager}
          >
            {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
            <CssBaseline />
            {/* Pass pageContext to the _document though the renderPage enhancer
                to render collected styles on server-side. */}
            <Component pageContext={this.pageContext} {...pageProps} />
          </MuiThemeProvider>
        </JssProvider>

      </Container>
    );
  }
}

export default MyApp;
