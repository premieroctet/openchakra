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
import {Dialog, DialogActions, DialogContent, Divider} from "@material-ui/core";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import ResaService from "../components/HomePage/ResaService/ResaService";
import {is_b2b_style} from "../utils/context";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import {deviceType, isMobile, osName, isAndroid, isIOS} from 'react-device-detect';
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
const {PRO, PART}=require('../utils/consts')
const {getLoggedUserId} = require('../utils/functions');
import Router from 'next/router';


const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: {},
      alfred: {},
      logged: false,
      user:{},
      open: false
    };
  }


  componentDidMount() {
    if (getLoggedUserId()) {
      this.setState({logged: true})
    }
    if(deviceType === 'browser'){
      if(isAndroid || isIOS){
        this.setState({open: true})
      }
    }

    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let data = res.data;
        this.setState({
          user: data,
          gps: data.billing_address ? data.billing_address.gps : null
        }
        );
      })
      .catch(err => {
        console.error((err))
      })

    axios.get(`/myAlfred/api/category/${is_b2b_style(this.state.user) ? PRO : PART}`)
      .then(res => {
        let category = res.data;
        this.setState({category: category});
      }).catch(err => console.error(err));

    axios.get(`/myAlfred/api/serviceUser/home/${is_b2b_style(this.state.user) ? PRO : PART}`)
      .then(response => {
        let alfred = response.data;
        this.setState({alfred: alfred});
      }).catch(err => console.error(err))
  }

  dialogStore = (classes) =>{
    const{open} = this.state;

    return(
      <Dialog onClose={() => this.setState({open: false})} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({open: false})}>
          Application My Alfred
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
           Notre application est disponible sur {isAndroid ? 'Google play' : 'Apple store'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => Router.push(isAndroid ? 'https://play.google.com/store/apps/details?id=com.myalfred' :'https://apps.apple.com/us/app/my-alfred/id1544073864')} color="primary">
            Télécharger
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  resizeFrame = () =>{

    let iframe = document.querySelector("#myIframe");

    window.addEventListener('message', function(e) {
      // message that was passed from iframe page
      let message = e.data;
      iframe.style.height = message.height + 'px';
    } , false);
  }

  render() {
    const {classes} = this.props;
    const {category, alfred, open, user} = this.state;
    return (

      <Grid>
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
            <Grid item xl={12} lg={12} sm={12} md={12} xs={12} className={is_b2b_style(user) ? classes.navbarAndBannerBackgroundb2b : classes.navbarAndBannerBackground}>
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
          {
            is_b2b_style(user) ?
              <iframe
                onLoad={this.resizeFrame}
                frameBorder="0"
                scrolling="no"
                id="myIframe"
                src="/blog/accueil"
                style={{width: '100%'}}
              >
              </iframe>
             : null
          }
          <Grid container className={classes.mainContainerStyle}>
            <Grid className={classes.generalWidthContainer}>
              <CategoryTopic category={category}/>
            </Grid>
          </Grid>
          <Grid container className={is_b2b_style(user) ? classes.howItWorksComponentB2b : classes.howItWorksComponent}>
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
            is_b2b_style(user) ? null :
              <Grid container className={classes.becomeAlfredComponent}>
                <Grid className={classes.generalWidthContainer}>
                  <ResaService/>
                </Grid>
              </Grid>
          }
          <Hidden only={['xs', 'sm']}>
            {
              is_b2b_style(user) ? null :
                <Grid container className={classes.mainNewsLetterStyle}>
                  <Grid className={classes.generalWidthContainerNewsLtter}>
                    <NewsLetter/>
                  </Grid>
                </Grid>
            }
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
        {open ? this.dialogStore(classes) : null}
      </Grid>
    );
  }
}

export default withStyles(styles)(Home);
