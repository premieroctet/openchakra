import {COMPANY_NAME, INDEX, INFOBAR} from '../utils/i18n'
const {
  getLoggedUserId,
  isApplication,
  isB2BStyle,
  isMobile,
} = require('../utils/context')
import CustomButton from '../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import axios from 'axios'
import React from 'react'
import Footer from '../hoc/Layout/Footer/Footer'
import {Helmet} from 'react-helmet'
import Grid from '@material-ui/core/Grid'
import InfoBar from '../components/InfoBar/InfoBar'
import {withStyles} from '@material-ui/core/styles'
import styles from '../static/css/pages/homePage/index'
import NavBar from '../hoc/Layout/NavBar/NavBar'
import BannerPresentation from '../components/HomePage/BannerPresentation/BannerPresentation'
import CategoryTopic from '../components/HomePage/Category/CategoryTopic'
import OurAlfred from '../components/HomePage/OurAlfred/OurAlfred'
import HowItWorks from '../components/HomePage/HowItWorks/HowItWorks'
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
import _ from 'lodash'
import CustomBannerMultiCol from '../components/HomePage/CustomBannerMultiCol/CustomBannerMultiCol'
import RandomDisplay from '../components/RandomDisplay/RandomDisplay'

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


const fivecol = () => {
  return(
    <>
      <div className={'custombannerimgfirst'} style={{backgroundSize: 'contain', width: '100%', height: '100%'}}><Typography className={'customhowitworksfirsttext'}>{ReactHtmlParser(this.props.t('INDEX.first_content'))}</Typography></div>
      <div className={'custombannerimgtwo'} style={{backgroundSize: 'contain', width: '100%', height: '100%'}}><Typography className={'customhowitworkssecondtext'}>{ReactHtmlParser(this.props.t('INDEX.second_content'))}</Typography></div>
      <div className={'custombannerimgthree'} style={{backgroundSize: 'contain', width: '100%', height: '100%'}}><Typography className={'customhowitworksthirdttext'}>{ReactHtmlParser(this.props.t('INDEX.third_content'))}</Typography></div>
      <div className={'custombannerimgfour'} style={{backgroundSize: 'contain', width: '100%', height: '100%'}}><Typography className={'customhowitworksfourtext'}>{ReactHtmlParser(this.props.t('INDEX.four_content'))}</Typography></div>
      <div className={'custombannerimgfive'} style={{backgroundSize: 'contain', width: '100%', height: '100%'}}><Typography className={'customhowitworksfivetext'}>{ReactHtmlParser(this.props.t('INDEX.five_content'))}</Typography></div>
      <div className={'custombannerimgsix'} style={{backgroundSize: 'contain', width: '100%', height: '100%'}}><Typography className={'customhowitworkssixtext'}>{ReactHtmlParser(this.props.t('INDEX.six_content'))}</Typography></div>
    </>
  )
}


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
        {
          text: ['', INDEX.first_content, INDEX.second_content, INDEX.third_content, INDEX.four_content, INDEX.five_content],
        },
        {
          text: ['', INDEX.six_content, INDEX.seven_content, INDEX.eight_content, INDEX.nine_content, INDEX.ten_content],
        },
        {
          text: ['', INDEX.eleven_content, INDEX.twelve_content, INDEX.thirteen_content, INDEX.fourteen_content, INDEX.fiveteen_content],
        },

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
        let categories = _.shuffle(res.data)
        this.setState({categories: categories})
      }).catch(err => console.error(err))

    axios.get(`/myAlfred/api/serviceUser/home/${isB2BStyle(this.state.user) ? PRO : PART}`)
      .then(response => {
        let alfred = response.data
        this.setState({alfred: alfred})
      }).catch(err => console.error(err))

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
        <Helmet>
          <title>{t('COMPANY_NAME')}</title>
          <meta
            property="description"
            content="Des milliers de services référencés ! Consultez les offres de service rémunérés de milliers de particuliers avec My Alfred, première application d’offres de services entre particuliers. Rendre service en étant rémunéré autour de chez soi n’a jamais été aussi simple"
          />
        </Helmet>
        <Grid>
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
          <Grid container className={`customhowitworks ${isB2BStyle(user) ? classes.howItWorksComponentB2b : classes.howItWorksComponent}`}>
            <Grid style={{width: '100%'}}>
              {/* <HowItWorks/>*/}
              <Grid className={classes.howItWorksMainStyle}>
                <RandomDisplay arrayText={this.state.arrayText} loop={true}/>
              </Grid>
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
        {!isApplication() ? open ? this.dialogStore(classes) : null : null}
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Home))
