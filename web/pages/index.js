import axios from 'axios';
import React from 'react';
import Footer from '../hoc/Layout/Footer/Footer';
import {Helmet} from 'react-helmet';
import Grid from '@material-ui/core/Grid';
import InfoBar from '../components/InfoBar/InfoBar';
import {withStyles} from '@material-ui/core/styles';
import styles from '../static/css/pages/homePage/index';
import NavBar from '../hoc/Layout/NavBar/NavBar';
import BannerPresentation from '../components/HomePage/BannerPresentation/BannerPresentation';
import CategoryTopic from '../components/HomePage/Category/CategoryTopic';
import OurAlfred from "../components/HomePage/OurAlfred/OurAlfred";
import HowItWorks from "../components/HomePage/HowItWorks/HowItWorks";
import NewsLetter from "../components/HomePage/NewsLetter/NewsLetter";
import MobileNavbar from "../hoc/Layout/NavBar/MobileNavbar";
import Hidden from "@material-ui/core/Hidden";
import TrustAndSecurity from "../hoc/Layout/TrustAndSecurity/TrustAndSecurity";
import {Divider} from "@material-ui/core";
import ResaService from "../components/HomePage/ResaService/ResaService";
import {is_b2b_style} from "../utils/context";
const {PRO, PART}=require('../utils/consts')
const {getLoggedUserId} = require('../utils/functions');

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      alfred: {},
      logged: false,
    };
  }


  componentDidMount() {
    if (getLoggedUserId()) {
      this.setState({logged: true})
    }
    axios.get(`/myAlfred/api/category/${is_b2b_style() ? PRO : PART}`)
      .then(res => {
        let category = res.data;
        this.setState({category: category});
      }).catch(err => console.error(err));

    axios.get(`/myAlfred/api/serviceUser/home/${is_b2b_style() ? PRO : PART}`)
      .then(response => {
        let alfred = response.data;
        this.setState({alfred: alfred});
      }).catch(err => console.error(err));


  }

  render() {
    const {classes} = this.props;
    const {category, alfred, logged, user} = this.state;
    return (


      <React.Fragment>

        <Helmet>
          <title>Services rémunérés entre particuliers - My Alfred </title>
          <meta property="description"
                content="Des milliers de services référencés ! Consultez les offres de service rémunérés de milliers de particuliers avec My Alfred, première application d’offres de services entre particuliers. Rendre service en étant rémunéré autour de chez soi n’a jamais été aussi simple"/>
        </Helmet>
        <Grid>
          <Hidden only={['md', 'sm', 'xs']}>
            <Grid>
              <InfoBar/>
            </Grid>
          </Hidden>
          <Grid container  className={classes.navbarAndBannerContainer}>
            <Grid item xl={12} lg={12} sm={12} md={12} xs={12} className={is_b2b_style() ? classes.navbarAndBannerBackgroundb2b : classes.navbarAndBannerBackground}>
              <Grid className={classes.navbarComponentPosition}>
                <NavBar/>
              </Grid>
              <Grid className={classes.bannerPresentationContainer}>
                <Grid className={classes.bannerSize}>
                  <BannerPresentation/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={classes.mainContainerStyle}>
            <Grid className={classes.generalWidthContainer}>
              <CategoryTopic category={category}/>
            </Grid>
          </Grid>
          <Grid container className={is_b2b_style() ? classes.howItWorksComponentB2b : classes.howItWorksComponent}>
            <Grid className={classes.generalWidthContainer}>
              <HowItWorks/>
            </Grid>
          </Grid>
          <Grid container className={classes.mainContainerStyle}>
            <Grid className={classes.generalWidthContainer}>
              <OurAlfred alfred={alfred}/>
            </Grid>
          </Grid>
          {
            is_b2b_style() ? null :
              <Grid container className={classes.becomeAlfredComponent}>
                <Grid className={classes.generalWidthContainer}>
                  <ResaService/>
                </Grid>
              </Grid>}
          <Hidden only={['xs', 'sm']}>
            {
              is_b2b_style() ? null :
                <Grid container className={classes.mainNewsLetterStyle}>
                  <Grid className={classes.generalWidthContainerNewsLtter}>
                    <NewsLetter/>
                  </Grid>
                </Grid>}
          </Hidden>
          <Grid>
            <Divider/>
          </Grid>
          <Hidden only={['xs', 'sm', 'md']}>
            <Grid className={classes.trustAndSecurityContainer}>
              <Grid className={classes.trustAndSecurityComponent}>
                <TrustAndSecurity/>
              </Grid>
            </Grid>
          </Hidden>
          <Grid container className={classes.mainContainerStyleFooter}>
            <Grid className={classes.generalWidthFooter}>
              <Footer/>
            </Grid>
          </Grid>
          <Hidden only={['xl', 'lg', 'md', 'sm']}>
            <Grid style={{
              position: 'fixed',
              bottom: '3%',
              display: 'flex',
              justifyContent: 'center',
              width: '100%',
              zIndex: 1
            }}>
              <Grid style={{width: '100%'}}>
                <MobileNavbar currentIndex={0}/>
              </Grid>
            </Grid>
          </Hidden>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
