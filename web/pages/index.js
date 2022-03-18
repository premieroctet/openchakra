const {hideStoreDialog} = require('../config/config')
const {
  getLoggedUserId,
  isApplication,
  isB2BStyle,
  isMobile,
} = require('../utils/context')
import LoggedAsBanner from '../components/LoggedAsBanner'
import CustomButton from '../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import axios from 'axios'
import React from 'react'
import Footer from '../hoc/Layout/Footer/Footer'
import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import InfoBar from '../components/InfoBar/InfoBar'
import {withStyles} from '@material-ui/core/styles'
import styles from '../static/css/pages/homePage/index'
import NavBar from '../hoc/Layout/NavBar/NavBar'
import BannerPresentation from '../components/HomePage/BannerPresentation/BannerPresentation'
import CategoryTopic from '../components/HomePage/Category/CategoryTopic'
import OurAlfred from '../components/HomePage/OurAlfred/OurAlfred'
import NewsLetter from '../components/HomePage/NewsLetter/NewsLetter'
import MobileNavbar from '../hoc/Layout/NavBar/MobileNavbar'
import TrustAndSecurity from '../hoc/Layout/TrustAndSecurity/TrustAndSecurity'
import {Dialog, DialogActions, DialogContent, Divider} from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import ResaService from '../components/HomePage/ResaService/ResaService'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import {isAndroid} from 'react-device-detect'
const {PRO, PART} = require('../utils/consts')
import Router from 'next/router'
import '../static/assets/css/custom.css'
import lodash from 'lodash'
import RandomBanner from '../components/RandomBanner/RandomBanner'
import {INDEX} from '../utils/i18n'

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.child = React.createRef()
    this.state = {
      category: {},
      alfred: {},
      logged: false,
      user: {},
      open: false,
      mounted: false,
      arrayText: [
        ['INDEX.first_content_title', '', 'INDEX.first_content', 'INDEX.second_content', 'INDEX.third_content', 'INDEX.four_content', 'INDEX.five_content'].map(k => ReactHtmlParser(props.t(k))),
        ['INDEX.second_content_title', '', 'INDEX.six_content', 'INDEX.seven_content', 'INDEX.eight_content', 'INDEX.nine_content', 'INDEX.ten_content'].map(k => ReactHtmlParser(props.t(k))),
        ['INDEX.third_content_title', '', 'INDEX.eleven_content', 'INDEX.twelve_content', 'INDEX.thirteen_content', 'INDEX.fourteen_content', 'INDEX.fiveteen_content'].map(k => ReactHtmlParser(props.t(k))),
      ],
    }
  }

  componentDidMount() {
    if (getLoggedUserId()) {
      this.setState({logged: true})
    }
    if (isMobile()) {
      this.setState({open: true})
    }

    if (this.state.logged) {
      axios.get('/myAlfred/api/users/current')
        .then(res => {
          let data = res.data
          this.setState({
            user: data,
            gps: data.billing_address ? data.billing_address.gps : null,
          },
          )
        })
        .catch(err => {
          console.error((err))
        })
    

      axios.get(`/myAlfred/api/category/${isB2BStyle(this.state.user) ? PRO : PART}`)
        .then(res => {
          let categories = lodash.shuffle(res.data)
          this.setState({categories: categories})
        }).catch(err => console.error(err))

      axios.get(`/myAlfred/api/serviceUser/home/${isB2BStyle(this.state.user) ? PRO : PART}`)
        .then(response => {
          let alfred = response.data
          this.setState({alfred: alfred})
        }).catch(err => console.error(err))
    }
    
    this.setState({mounted: true})
  }

  dialogStore = () => {
    const {open} = this.state


    return (
      <Dialog onClose={() => this.setState({open: false})} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({open: false})}>
          <Grid style={{display: 'flex'}}>
            <img style={{marginRight: '7vh'}} src="/static/assets/icon/iconBlueDeep20@3x-2.png" alt="icone application myAlfred"/>
            <Grid>{ReactHtmlParser(this.props.t('INDEX.dialog_store'))}</Grid>
          </Grid>
        </DialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            {ReactHtmlParser(this.props.t('INDEX.store_available')) + isAndroid ? 'Google play' : 'Apple store'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <CustomButton
            onClick={() => Router.push(isAndroid ? 'https://play.google.com/store/apps/details?id=com.myalfred' : 'https://apps.apple.com/us/app/my-alfred/id1544073864')}
            color="primary">
            {ReactHtmlParser(this.props.t('INDEX.download_button'))}
          </CustomButton>
        </DialogActions>
      </Dialog>
    )
  }

  resizeFrame = () => {

    let iframe = document.querySelector('#myIframe')

    window.addEventListener('message', e => {
      // message that was passed from iframe page
      let message = e.data
      iframe.style.height = `${message.height }px`
    }, false)
  }

  callLogin = () => {
    this.child.current.handleOpenLogin()
  }

  render() {
    const {classes, t} = this.props
    const {mounted, categories, alfred, open, user} = this.state

    if (!mounted) {
      return null
    }

    return (

      <Grid>
        <Head>
          <title>{t('COMPANY_NAME')}</title>
          <meta
            property="description"
            content="Des milliers de services référencés ! Consultez les offres de service rémunérés de milliers de particuliers avec My Alfred, première application d’offres de services entre particuliers. Rendre service en étant rémunéré autour de chez soi n’a jamais été aussi simple"
          />
        </Head>
        <Grid>
          <LoggedAsBanner />
          <Grid className={`customheaderinfobar ${classes.infoBarContainer}`}>
            <InfoBar/>
          </Grid>
          <Grid container className={classes.navbarAndBannerContainer}>
            <Grid
              item
              xl={12}
              lg={12}
              sm={12}
              md={12}
              xs={12}
              className={`custombanner ${isB2BStyle(user) ? classes.navbarAndBannerBackgroundb2b : classes.navbarAndBannerBackground}` }
            >
              <Grid className={`customheader ${classes.navbarComponentPosition}`}>
                <NavBar ref={this.child}/>
              </Grid>
              <Grid className={classes.bannerPresentationContainer}>
                <Grid className={classes.bannerSize}>
                  <BannerPresentation/>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {
            isB2BStyle(user) ? <iframe
              onLoad={this.resizeFrame}
              frameBorder="0"
              scrolling="no"
              id="myIframe"
              src="/blog/accueil"
              style={{width: '100%'}}
            >
            </iframe> : null
          }
          <Grid container className={`customslidecat ${classes.mainContainerStyle}`}>
            <Grid className={classes.generalWidthContainer}>
              <CategoryTopic categories={categories}/>
            </Grid>
          </Grid>
          <Grid container className={`${isB2BStyle(user) ? classes.howItWorksComponentB2b : classes.howItWorksComponent}`}>
            {/* <HowItWorks/>*/}
            <Grid item xs={12} className={classes.howItWorksMainStyle}>
              <RandomBanner arrayText={this.state.arrayText} loop={false}/>
            </Grid>
          </Grid>
          <Grid container className={`customouralfred ${classes.mainContainerStyle}`}>
            <Grid className={classes.generalWidthContainer}>
              <OurAlfred alfred={alfred}/>
            </Grid>
          </Grid>
          {
            isB2BStyle(user) ? null :
              <Grid container className={`customresaservice ${classes.becomeAlfredComponent}`}>
                <Grid className={classes.generalWidthContainer}>
                  <ResaService triggerLogin={this.callLogin}/>
                </Grid>
              </Grid>
          }
          <Grid className={`customnewsletter ${classes.newsLetterContainer}`}>
            {
              isB2BStyle(user) ? null : <Grid container className={classes.mainNewsLetterStyle}>
                <Grid className={classes.generalWidthContainerNewsLtter}>
                  <NewsLetter/>
                </Grid>
              </Grid>
            }
          </Grid>
          <Grid>
            <Divider/>
          </Grid>
          <Grid className={`customtrustandsecurity ${classes.hideAndShowTrustAndSecurity}`}>
            <Grid className={classes.trustAndSecurityContainer}>
              <Grid className={classes.trustAndSecurityComponent}>
                <TrustAndSecurity/>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={`customgeneralfooter ${classes.mainContainerStyleFooter}`}>
            <Grid className={classes.generalWidthFooter}>
              <Footer/>
            </Grid>
          </Grid>
          <Grid className={classes.mobileNavBarContainer}>
            <Grid style={{width: '100%'}}>
              <MobileNavbar currentIndex={0}/>
            </Grid>
          </Grid>
        </Grid>
        {!hideStoreDialog() && !isApplication() && open && this.dialogStore(classes)}
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Home))
