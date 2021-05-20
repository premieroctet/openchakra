import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '../../../components/Link/Link'
import {withStyles} from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter'
import Divider from "@material-ui/core/Divider";
import styles from '../../../static/css/components/Footer/Footer'
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import {is_b2b_style, is_application, is_mobile} from "../../../utils/context";
import {isAndroid, isIOS} from 'react-device-detect';

import Register from "../../../components/Register/Register";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import Slide from "@material-ui/core/Slide";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";

const {getLoggedUserId, isLoggedUserAlfredPro} = require('../../../utils/functions');


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      setOpenRegister: false,
      setOpenLogin: false
    }
  }

  handleOpenRegister = (e) => {
    this.handleMenuClose();
    this.setState({setOpenRegister: true, setOpenLogin: false});
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null});
  };

  dialogRegister = (classes) => {
    const {setOpenRegister} = this.state;

    return (
      <Dialog
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.navbarModal}
        open={setOpenRegister}
        onClose={this.handleCloseRegister}
        TransitionComponent={Transition}
        disableBackdropClick={true}
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

  handleCloseRegister = () => {
    if (this.state.activeStep === 2) {
      this.setState({setOpenRegister: false}, () => this.componentDidMount());
    } else {
      this.setState({setOpenRegister: false});
    }
  };

  render() {
    const {classes} = this.props;

    return (
      <Grid container spacing={2} style={{width: '100%', margin: 0}}>
        <Grid container spacing={1} className={classes.containerSectionFooter} item xl={is_b2b_style() ? 4 : 3}
              lg={is_b2b_style() ? 4 : 3} md={is_b2b_style() ? 4 : 3} sm={6} xs={6}>
          <Grid item>
            <h3>À propos</h3>
          </Grid>
          <Grid item>
            <Link href={'/footer/apropos'}>
              <Typography>My Alfred</Typography>
            </Link>
          </Grid>
          {
            is_b2b_style() ?
              <>
                <Grid item>
                  <Link href={'/footer/apropos'}>
                    <Typography>Presse</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/footer/apropos'}>
                    <Typography>Blog</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/footer/apropos'}>
                    <Typography>CGU/CGV</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/footer/apropos'}>
                    <Typography>FAQ</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/footer/apropos'}>
                    <Typography>Informations légales</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/particular'}>
                    <Typography>Espace particulier</Typography>
                  </Link>
                </Grid>
              </>
              : null
          }
          {
            !is_b2b_style() ?
              <>
                <Grid item>
                  <Link href={'/footer/ourTeam'}>
                    <Typography>Notre équipe</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/contact'}>
                    <Typography>Nous contacter</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/professional'}>
                    <Typography>Espace entreprise</Typography>
                  </Link>
                </Grid>
              </>
              : null
          }
        </Grid>
        <Grid container spacing={1} className={classes.containerSectionFooter} item xl={is_b2b_style() ? 4 : 3}
              lg={is_b2b_style() ? 4 : 3} md={is_b2b_style() ? 4 : 3} sm={6} xs={6}>
          <Grid item>
            <h3>{is_b2b_style() ? "Entreprises" : "Communauté"}</h3>
          </Grid>
          {
            !is_b2b_style() ?
              <Grid item>
                <Link href={'/footer/ourCommunity'}>
                  <Typography>Notre communauté</Typography>
                </Link>
              </Grid>
              :
              <>
                <Grid item>
                  <Link href={'/blog/tarifs'}>
                    <Typography>Offre et tarifs</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/blog/elementor-211/'}>
                    <Typography>Services aux entreprises</Typography>
                  </Link>
                </Grid>
                <Grid item>
                  <Link href={'/blog/services-aux-collaborateurs/'}>
                    <Typography>Services aux collaborateurs</Typography>
                  </Link>
                </Grid>
              </>
          }
        </Grid>
        <Grid container spacing={1} className={classes.containerSectionFooter} item xl={is_b2b_style() ? 4 : 3}
              lg={is_b2b_style() ? 4 : 3} md={is_b2b_style() ? 4 : 3} sm={6} xs={6}>
          <Grid item>
            <h3>Alfred</h3>
          </Grid>
          {
            is_b2b_style() ? null :
              <Grid item>
                <Link href={'/footer/becomeAlfred'}>
                  <Typography>Devenir Alfred</Typography>
                </Link>
              </Grid>
          }
          {
            getLoggedUserId() && !isLoggedUserAlfredPro() ? null :
              is_b2b_style() ?
                isLoggedUserAlfredPro() ?
                  <Grid item>
                    <Link href={'/creaShop/creaShop'}>
                      <Typography>Je propose mes services</Typography>
                    </Link>
                  </Grid>

                  :
                  <Grid item onClick={this.handleOpenRegister} style={{cursor: 'pointer'}}>
                    <Typography>Je propose mes services</Typography>
                  </Grid>
                : null
          }
          {
            is_b2b_style() ?
              <Grid item>
                <Link href={'/footer/becomeAlfred'}>
                  <Typography>Charte</Typography>
                </Link>
              </Grid>
              : null
          }
        </Grid>
        {
          is_b2b_style() ? null :
            <Grid container spacing={1} className={classes.containerSectionFooter} item xl={3} lg={3} md={3} sm={6}
                  xs={6}>
              <Grid item>
                <h3>Assistance</h3>
              </Grid>
              <Grid item>
                <Link href={'/footer/addService'}>
                  <Typography>Réserver un service</Typography>
                </Link>
              </Grid>
              <Hidden only={['xs']}>
                <Grid item onClick={() => Tawk_API.maximize()}>
                  <Typography>Parler à un humain</Typography>
                </Grid>
              </Hidden>
              <Grid item>
                <Link href={'/faq'}>
                  <Typography>FAQ</Typography>
                </Link>
              </Grid>
            </Grid>
        }
        {
          !is_application() ?

            <Grid item xl={6} lg={6} md={6} sm={6} xs={6} className={classes.containerSectionFooter}>
              <Grid>
                <h3>Mobiles</h3>
              </Grid>
              <Grid container className={classes.storeContainer}>
                {
                  !isAndroid ?

                    <Grid item>
                      <a href={'https://apps.apple.com/us/app/my-alfred/id1544073864'} target={'_blank'}>
                        <img alt={'appleStore'} title={'badge_applestore'} width={126.5} height={40}
                             src={'../../static/assets/img/footer/ios/ios_black.svg'}/>
                      </a>
                    </Grid> : null
                }
                {
                  !isIOS ? <Grid item>
                    <a href={'https://play.google.com/store/apps/details?id=com.myalfred'} target={'_blank'}>
                      <img alt={'googlePlay'} title={'badge_android'} width={153}
                           src={'../../static/assets/img/footer/android/android.png'}/>
                    </a>
                  </Grid> : null
                }
              </Grid>
            </Grid> : null
        }
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Divider/>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.socialAndLegalContainer}>
          <Grid container item xl={6} lg={8} md={9} sm={12} xs={12} spacing={1} className={classes.legalContainer}>
            <Grid item>
              <Typography>© 2021 My Alfred,Inc.</Typography>
            </Grid>
            <Grid item>
              <span>·</span>
            </Grid>
            <Grid item>
              <Link href={'/footer/legalNotice'}>
                <Typography>Informations légales</Typography>
              </Link>
            </Grid>
            <Grid item>
              <span>·</span>
            </Grid>
            <Grid item>
              <Link href={'/cgu'}>
                <Typography>Conditions générales d'utilisation</Typography>
              </Link>
            </Grid>
          </Grid>
          <Grid container item xl={6} lg={4} md={3} sm={12} xs={12} spacing={1} className={classes.socialContainer}>
            <Grid item>
              <a href={'https://www.facebook.com/myalfred1/'} target={'_blank'}>
                <IconButton aria-label="FacebookIcon">
                  <FacebookIcon/>
                </IconButton>
              </a>
            </Grid>
            <Grid item>
              <a href={'https://www.instagram.com/my_alfred_/'} target={'_blank'}>
                <IconButton aria-label="InstagramIcon">
                  <InstagramIcon/>
                </IconButton>
              </a>
            </Grid>
            <Grid item>
              <a href={'https://www.linkedin.com/company/my-alfred/'} target={'_blank'}>
                <IconButton aria-label="LinkedInIcon">
                  <LinkedInIcon/>
                </IconButton>
              </a>
            </Grid>
            <Grid item>
              <a href={'https://twitter.com/MyAlfred2'} target={'_blank'}>
                <IconButton aria-label="TwitterIcon">
                  <TwitterIcon/>
                </IconButton>
              </a>
            </Grid>
          </Grid>
        </Grid>
        {this.dialogRegister(classes)}
      </Grid>
    );
  }
}

export default withStyles(styles)(Footer);
