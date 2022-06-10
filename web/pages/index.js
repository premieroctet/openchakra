import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import Router from 'next/router'
import axios from 'axios'
import Head from 'next/head'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import lodash from 'lodash'
import {Dialog, DialogActions, DialogContent, Divider} from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import {isAndroid} from 'react-device-detect'
import ResaService from '../components/HomePage/ResaService/ResaService'
import TrustAndSecurity from '../hoc/Layout/TrustAndSecurity/TrustAndSecurity'
import MobileNavbar from '../hoc/Layout/NavBar/MobileNavbar'
import NewsLetter from '../components/HomePage/NewsLetter/NewsLetter'
import {PRO, PART} from '../utils/consts'
import OurAlfred from '../components/HomePage/OurAlfred/OurAlfred'
import CategoryTopic from '../components/HomePage/Category/CategoryTopic'
import BannerPresentation from '../components/HomePage/BannerPresentation/BannerPresentation'
import NavBar from '../hoc/Layout/NavBar/NavBar'
import styles from '../static/css/pages/homePage/index'
import InfoBar from '../components/InfoBar/InfoBar'
import Footer from '../hoc/Layout/Footer/Footer'
import CustomButton from '../components/CustomButton/CustomButton'
import LoggedAsBanner from '../components/LoggedAsBanner'
import {
  isApplication,
  isMobile,
} from '../utils/context'
import {hideStoreDialog} from '../config/config'
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
      categories: [],
      services: {},
      alfred: {},
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

    if (isMobile()) {
      this.setState({open: true})
    }

    axios.get(`/myAlfred/api/category/${PART}`)
      .then(res => {
        let categories = lodash.shuffle(res.data)
        this.setState({categories: categories})
      }).catch(err => console.error(err))

    axios.get(`/myAlfred/api/service/all`)
      .then(res => {
        let services=res.data.filter(s => !!s.tag)
        let groupedServices = lodash.groupBy(services, 'tag')
        this.setState({services: groupedServices})
      }).catch(err => console.error(err))

    axios.get(`/myAlfred/api/serviceUser/home/${PART}`)
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
    const {mounted, categories, alfred, open, services} = this.state

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
              className={`custombanner ${classes.navbarAndBannerBackground}` }
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
          <Grid container className={`customslidecat ${classes.mainContainerStyle}`}>
            <Grid className={classes.generalWidthContainer}>
              <CategoryTopic categories={categories}/>
            </Grid>
          </Grid>
          <Grid container className={classes.howItWorksComponent}>
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
          {Object.entries(services).map(entry => {
            const [tag, taggedServices]=entry
            return (
              <Grid container className={`customslideservices ${classes.mainContainerStyle}`}>
                <Grid className={classes.generalWidthContainer}>
                  <ServiceTopic label={tag} services={taggedServices.map(s => s._id)}/>
                </Grid>
              </Grid>
            )
          })
          }
          <Grid container className={`customresaservice ${classes.becomeAlfredComponent}`}>
            <Grid className={classes.generalWidthContainer}>
              <ResaService triggerLogin={this.callLogin}/>
            </Grid>
          </Grid>
          <Grid className={`customnewsletter ${classes.newsLetterContainer}`}>
            <Grid container className={classes.mainNewsLetterStyle}>
              <Grid className={classes.generalWidthContainerNewsLtter}>
                <NewsLetter/>
              </Grid>
            </Grid>
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
