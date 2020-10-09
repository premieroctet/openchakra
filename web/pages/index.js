import axios from 'axios';
import React, {Fragment} from 'react';
import Footer from '../hoc/Layout/Footer/Footer';
import BecomeAlfred from '../components/HomePage/BecomeAlfred/BecomeAlfred';
import setAuthToken from '../utils/setAuthToken';
import Router from 'next/router';
import {Helmet} from 'react-helmet';
import cookie from 'react-cookies';
import Grid from '@material-ui/core/Grid';
import InfoBar from '../components/InfoBar/InfoBar';
import {withStyles} from '@material-ui/core/styles';
import styles from '../static/css/homePage/index';
import NavBar from '../hoc/Layout/NavBar/NavBar';
import BannerPresentation from '../components/HomePage/BannerPresentation/BannerPresentation';
import Category from '../components/HomePage/Category/Category';
import OurAlfred from "../components/HomePage/OurAlfred/OurAlfred";
import HowItWorks from "../components/HomePage/HowItWorks/HowItWorks";
import NewsLetter from "../components/HomePage/NewsLetter/NewsLetter";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category:{},
      alfred:{},
      logged: false
    };
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    const token = cookie.load('token');
    axios.get('/myAlfred/api/touch/');
    if (token) {
      this.setState({logged: true})
    }
    axios.get('/myAlfred/api/category/all')
      .then(res => {
        let category = res.data;
        this.setState({category: category});
      }).catch();

    axios.get('/myAlfred/api/serviceUser/home')
      .then(response => {
        let alfred = response.data;
        this.setState({alfred: alfred});
      });
  }

  logout() {
    cookie.remove('token', {path: '/'});
    // Remove auth header for future requests
    setAuthToken(false);
    window.location.reload();
  };

  render() {
    const { classes } = this.props;
    const {category, alfred, logged} = this.state;
    return (
      <React.Fragment>
        <Helmet>
          <title>Services rémunérés entre particuliers - My Alfred </title>
          <meta property="description"
                content="Des milliers de services référencés ! Consultez les offres de service rémunérés de milliers de particuliers avec My Alfred, première application d’offres de services entre particuliers. Rendre service en étant rémunéré autour de chez soi n’a jamais été aussi simple"/>
        </Helmet>
        <Grid>
          <Grid>
            <InfoBar style={classes}/>
          </Grid>
          <Grid container className={classes.navbarAndBannerContainer}>
            <Grid className={classes.navbarAndBannerBackground}>
              <Grid className={classes.navbarComponentPosition}>
                <NavBar style={classes} logged={logged}/>
              </Grid>
              <Grid className={classes.bannerPresentationContainer}>
                <Grid className={classes.bannerSize}>
                  <BannerPresentation style={classes}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.mainContainerStyle}>
            <Grid className={classes.generalWidthContainer}>
              <Category style={classes} category={category}/>
            </Grid>
          </Grid>
          <Grid container className={classes.howItWorksComponent}>
            <Grid className={classes.generalWidthContainer}>
              <HowItWorks style={classes}/>
            </Grid>
          </Grid>
          <Grid container className={classes.mainContainerStyle}>
            <Grid className={classes.generalWidthContainer}>
              <OurAlfred style={classes} alfred={alfred}/>
            </Grid>
          </Grid>
          <Grid container className={classes.becomeAlfredComponent}>
            <Grid className={classes.generalWidthContainer}>
              <BecomeAlfred style={classes}/>
            </Grid>
          </Grid>
          <Grid container className={classes.mainNewsLetterStyle}>
            <Grid className={classes.generalWidthContainer}>
              <NewsLetter style={classes}/>
            </Grid>
          </Grid>
          <Grid container className={classes.mainContainerStyleFooter}>
            <Grid className={classes.generalWidthFooter}>
              <Footer style={classes}/>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles, {withTheme: true})(Home);
