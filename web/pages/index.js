import axios from 'axios';
import React, {Fragment} from 'react';
import Layout from '../hoc/Layout/Layout';
import Footer from '../hoc/Layout/Footer/Footer';
import SerenityNeed from '../components/home/SerenityNeed/SerenityNeed';
import Profiteandlearn from '../components/home/profite&learn/profite&learn';
import BecomeAlfred from '../components/HomePage/BecomeAlfred/BecomeAlfred';
import NearbyYou from '../components/home/NearbyYou/NearbyYou';
import Homeheader from '../components/home/Homeheader/Homeheader';
import FeelingGood from '../components/home/feelingGood/feelingGood';
import Wellbeing from '../components/home/Wellbeing/Wellbeing';
import Proposeservice from '../components/home/proposeservice/Proposeservice';
import Assureback from '../components/home/AssureBack/Assureback';
import Section3 from '../components/home/section3';
import Section6 from '../components/home/section6';
import Section8 from '../components/home/section8';
import Passions from '../components/home/Passions/passions';
import Facons from '../components/home/Facons/facons';
import Otter from '../components/home/Otter/otter';
import Section10 from '../components/home/section10';
import Section12 from '../components/home/section12';
import Section15 from '../components/home/section15';
import Section16 from '../components/home/section16';
import Section18 from '../components/home/section18';
import Section19 from '../components/home/section19';
import Section21 from '../components/home/section21';
import Section22 from '../components/home/section22';
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
import OurServices from '../components/HomePage/OurServices/OurServices';
import OurDescription from '../components/HomePage/OurDescription/OurDescription';
import Category from '../components/HomePage/Category/Category';
import OurAlfred from "../components/HomePage/OurAlfred/OurAlfred";
import HowItWorks from "../components/HomePage/HowItWorks/HowItWorks";
import NewsLetter from "../components/HomePage/NewsLetter/NewsLetter";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    const token = cookie.load('token');
    axios.get('/myAlfred/api/touch/');
    if (token) {
      Router.push('/search');
    }
  }

  logout() {
    cookie.remove('token', {path: '/'});
    // Remove auth header for future requests
    setAuthToken(false);
    window.location.reload();
  };

  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Helmet>
          <title>Services rémunérés entre particuliers - My Alfred </title>
          <meta property="description"
                content="Des milliers de services référencés ! Consultez les offres de service rémunérés de milliers de particuliers avec My Alfred, première application d’offres de services entre particuliers. Rendre service en étant rémunéré autour de chez soi n’a jamais été aussi simple"/>
        </Helmet>
        <Grid style={{overflowX: 'hidden'}}>
          <Grid>
            <InfoBar style={classes}/>
          </Grid>
          <Grid container className={classes.navbarAndBannerContainer}>
            <Grid className={classes.navbarAndBannerBackground}>
              <Grid className={classes.navbarComponentPosition}>
                <NavBar style={classes}/>
              </Grid>
              <Grid className={classes.bannerPresentationContainer}>
                <Grid className={classes.bannerSize}>
                  <BannerPresentation style={classes}/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.mainContainerStyle}>
            <Grid style={{width: '100%'}}>
              <OurServices style={classes}/>
            </Grid>
          </Grid>
          <Grid container className={classes.mainContainerStyle}>
            <Grid className={classes.ourDescriptionComponentContainer}>
              <OurDescription style={classes}/>
            </Grid>
          </Grid>
          <Grid container className={classes.mainContainerStyle}>
            <Grid className={classes.generalWidthContainer}>
              <Category style={classes}/>
            </Grid>
          </Grid>
          <Grid container className={classes.becomeAlfredComponent} style={{transform: 'rotate(-1deg)'}}>
            <Grid className={classes.generalWidthContainer}  style={{transform: 'rotate(1deg)'}}>
              <BecomeAlfred style={classes}/>
            </Grid>
          </Grid>
          <Grid container className={classes.mainContainerStyle}>
            <Grid className={classes.generalWidthContainer}>
              <OurAlfred style={classes}/>
            </Grid>
          </Grid>
          <Grid container className={classes.howItWorksComponent}>
            <Grid className={classes.generalWidthContainer}>
              <HowItWorks style={classes}/>
            </Grid>
          </Grid>
          <Grid container className={classes.mainContainerStyle}>
            <Grid className={classes.generalWidthContainer}>
              <NewsLetter style={classes}/>
            </Grid>
          </Grid>
          <Grid container style={{justifyContent: 'center', marginTop: '2%', backgroundColor: 'rgba(228, 228, 228, 8)'}}>
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
