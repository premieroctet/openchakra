import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Link from '../../../components/Link/Link'
import {withStyles} from '@material-ui/core/styles'
import FacebookIcon from '@material-ui/icons/Facebook'
import InstagramIcon from '@material-ui/icons/Instagram'
import LinkedInIcon from '@material-ui/icons/LinkedIn'
import TwitterIcon from '@material-ui/icons/Twitter'
import Divider from '@material-ui/core/Divider'
import styles from '../../../static/css/components/Footer/Footer'
import IconButton from '@material-ui/core/IconButton'
import {isAndroid, isIOS} from '../../../utils/context'
import Register from '../../../components/Register/Register'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import {FOOTER} from '../../../utils/i18n'
const {getLoggedUserId, isLoggedUserAlfredPro, isB2BStyle, isApplication} = require('../../../utils/context')
const {isB2BDisabled, mustDisplayChat} = require('../../../config/config')

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose} = props
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


class Footer extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      setOpenRegister: false,
      setOpenLogin: false,
    }
  }

  handleOpenRegister = () => {
    this.handleMenuClose()
    this.setState({setOpenRegister: true, setOpenLogin: false})
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null})
  };

  dialogRegister = classes => {
    const {setOpenRegister} = this.state

    return (
      <Dialog
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.navbarModal}
        open={setOpenRegister}
        onClose={this.handleCloseRegister}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseRegister}/>
        <DialogContent dividers={false} className={classes.navbarMuidialogContent}>
          <div className={classes.navbarPaper}>
            <Register callLogin={this.handleOpenLogin} sendParentData={this.getData} id={'register'}/>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  handleCloseRegister = (event, reason) => {
    if (reason=='backdropClick') { return }
    if (this.state.activeStep === 2) {
      this.setState({setOpenRegister: false}, () => this.componentDidMount())
    }
    else {
      this.setState({setOpenRegister: false})
    }
  };

  render() {
    const {classes} = this.props
    const {setOpenRegister} = this.state

    return (
      <Grid container spacing={2} style={{width: '100%', margin: 0}}>
        <Grid container spacing={1} className={classes.containerSectionFooter} item xl={isB2BStyle() ? 4 : 3}
          lg={isB2BStyle() ? 4 : 3} md={isB2BStyle() ? 4 : 3} sm={6} xs={6}>
          <Grid item className={'customfooterabout'}>
            <h3>{ReactHtmlParser(this.props.t('FOOTER.about'))}</h3>
          </Grid>
          <Grid item className={'customfootermyalfred'}>
            <Link href={'/footer/apropos'}>
              <Typography>{ReactHtmlParser(this.props.t('FOOTER.myalfred'))}</Typography>
            </Link>
          </Grid>
          {
            isB2BStyle() ?
              <>
                <Grid item>
                  <Link href={'/footer/apropos'}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.presse'))}</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/footer/apropos'}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.blog'))}</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/footer/apropos'}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.cgv'))}</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/footer/apropos'}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.faq'))}</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/footer/apropos'}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.info'))}</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/particular'}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.particular'))}</Typography>
                  </Link>
                </Grid>
              </>
              : null
          }
          {
            !isB2BStyle() ?
              <>
                <Grid item className={'customfooterteam'}>
                  <Link href={'/footer/ourTeam'}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.team'))}</Typography>
                  </Link>
                </Grid>
                <Grid item className={'customfootercontact'}>
                  <Link href={'/contact'}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.contact_us'))}</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  { isB2BDisabled() ? null:
                    <Link href={'/professional'}>
                      <Typography>{ReactHtmlParser(this.props.t('FOOTER.professional'))}</Typography>
                    </Link>
                  }
                </Grid>
              </>
              : null
          }
        </Grid>
        <Grid container spacing={1} className={classes.containerSectionFooter} item xl={isB2BStyle() ? 4 : 3}
          lg={isB2BStyle() ? 4 : 3} md={isB2BStyle() ? 4 : 3} sm={6} xs={6}>
          <Grid item className={'customfootercommunity'}>
            <h3>{isB2BStyle() ? ReactHtmlParser(this.props.t('FOOTER.company')) : ReactHtmlParser(this.props.t('FOOTER.community'))}</h3>
          </Grid>
          {
            !isB2BStyle() ?
              <Grid item className={'customfooterourcommunity'}>
                <Link href={'/footer/ourCommunity'}>
                  <Typography>{ReactHtmlParser(this.props.t('FOOTER.our_community'))}</Typography>
                </Link>
              </Grid>
              :
              <>
                <Grid item>
                  <Link href={'/blog/tarifs'}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.price'))}</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/blog/elementor-211/'}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.service_company'))}</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/blog/services-aux-collaborateurs/'}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.service_collab'))}</Typography>
                  </Link>
                </Grid>
              </>
          }
        </Grid>
        <Grid container spacing={1} className={classes.containerSectionFooter} item xl={isB2BStyle() ? 4 : 3}
          lg={isB2BStyle() ? 4 : 3} md={isB2BStyle() ? 4 : 3} sm={6} xs={6}>
          <Grid item className={'customfooteralfred'}>
            <h3>{ReactHtmlParser(this.props.t('FOOTER.alfred'))}</h3>
          </Grid>
          {
            isB2BStyle() ? null :
              <Grid item className={'customfooterbecome'}>
                <Link href={'/footer/becomeAlfred'}>
                  <Typography>{ReactHtmlParser(this.props.t('FOOTER.become_alfred'))}</Typography>
                </Link>
              </Grid>
          }
          {
            getLoggedUserId() && !isLoggedUserAlfredPro() ? null :
              isB2BStyle() ?
                isLoggedUserAlfredPro() ?
                  <Grid item>
                    <Link href={'/creaShop/creaShop'}>
                      <Typography>{ReactHtmlParser(this.props.t('FOOTER.crea_shop'))}</Typography>
                    </Link>
                  </Grid>

                  :
                  <Grid item onClick={this.handleOpenRegister} style={{cursor: 'pointer'}}>
                    <Typography>{ReactHtmlParser(this.props.t('FOOTER.crea_shop'))}</Typography>
                  </Grid>
                : null
          }
          {
            isB2BStyle() ?
              <Grid item>
                <Link href={'/footer/becomeAlfred'}>
                  <Typography>{ReactHtmlParser(this.props.t('FOOTER.charte'))}</Typography>
                </Link>
              </Grid>
              : null
          }
        </Grid>
        {
          isB2BStyle() ? null :
            <Grid container spacing={1} className={classes.containerSectionFooter} item xl={3} lg={3} md={3} sm={6}
              xs={6}>
              <Grid item className={'customfooterhelp'}>
                <h3>{ReactHtmlParser(this.props.t('FOOTER.help'))}</h3>
              </Grid>
              <Grid item className={'customfooterresa'}>
                <Link href={'/footer/addService'}>
                  <Typography>{ReactHtmlParser(this.props.t('FOOTER.resa_service'))}</Typography>
                </Link>
              </Grid>
              { mustDisplayChat() &&
                <Grid item onClick={() => Tawk_API.maximize()} className={`customfootertawlk ${classes.hiddenOnMobile}`}>
                  <Typography>{ReactHtmlParser(this.props.t('FOOTER.tawlk_human'))}</Typography>
                </Grid>
              }
              <Grid item className={'customfooterfaq'}>
                <Link href={'/faq'}>
                  <Typography>{ReactHtmlParser(this.props.t('FOOTER.faq'))}</Typography>
                </Link>
              </Grid>
            </Grid>
        }
        {
          !isApplication() ?

            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.containerSectionFooter}>
              <Grid className={'customfootermobile'}>
                <h3>{ReactHtmlParser(this.props.t('FOOTER.mobile'))}</h3>
              </Grid>
              <Grid container className={classes.storeContainer}>
                {
                  !isAndroid ?
                    <Grid item className={'customfooterapple'}>
                      <a href={'https://apps.apple.com/us/app/my-alfred/id1544073864'} target={'_blank'}>
                        <img alt={'appleStore'} title={'badge_applestore'} width={126.5} height={40}
                          src={'/static/assets/img/footer/ios/ios_black.svg'}/>
                      </a>
                    </Grid> : null
                }
                {
                  !isIOS ? <Grid item className={'customfooterandroid'}>
                    <a href={'https://play.google.com/store/apps/details?id=com.myalfred'} target={'_blank'}>
                      <img alt={'googlePlay'} title={'badge_android'} width={153}
                        src={'/static/assets/img/footer/android/android.png'}/>
                    </a>
                  </Grid> : null
                }
              </Grid>
            </Grid> : null
        }
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Divider classes={{root: 'customfooterdivider'}}/>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.socialAndLegalContainer}>
          <Grid container item xl={6} lg={8} md={9} sm={12} xs={12} spacing={1} className={classes.legalContainer}>
            <Grid item>
              <Typography>{ReactHtmlParser(this.props.t('FOOTER.security'))}</Typography>
            </Grid>
            <Grid item>
              <span>·</span>
            </Grid>
            <Grid item>
              <Link href={'/footer/legalNotice'}>
                <Typography>{ReactHtmlParser(this.props.t('FOOTER.info'))}</Typography>
              </Link>
            </Grid>
            <Grid item>
              <span>·</span>
            </Grid>
            <Grid item>
              <Link href={'/cgu'}>
                <Typography>{ReactHtmlParser(this.props.t('FOOTER.cgu_bis'))}</Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid container item xl={6} lg={4} md={3} sm={12} xs={12} spacing={1} className={classes.socialContainer}>
            <Grid item className={'customfooterfacebook'}>
              <a href={'https://www.facebook.com/myalfred1/'} target={'_blank'}>
                <IconButton aria-label="FacebookIcon">
                  <FacebookIcon/>
                </IconButton>
              </a>
            </Grid>
            <Grid item className={'customfooterinsta'}>
              <a href={'https://www.instagram.com/All_upon_a_time/'} target={'_blank'}>
                <IconButton aria-label="InstagramIcon">
                  <InstagramIcon/>
                </IconButton>
              </a>
            </Grid>
            <Grid item className={'customfooterlinkedin'}>
              <a href={'https://www.linkedin.com/company/all-inclusive-groupe-semafor/'} target={'_blank'}>
                <IconButton aria-label="LinkedInIcon">
                  <LinkedInIcon/>
                </IconButton>
              </a>
            </Grid>
            <Grid item className={'customfootertwitter'}>
              <a href={'https://twitter.com/MyAlfred2'} target={'_blank'}>
                <IconButton aria-label="TwitterIcon">
                  <TwitterIcon/>
                </IconButton>
              </a>
            </Grid>
          </Grid>
        </Grid>
        {setOpenRegister && this.dialogRegister(classes)}
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Footer))
