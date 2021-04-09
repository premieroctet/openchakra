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
import {is_b2b_site, is_b2b_style} from "../../../utils/context";
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
    this.state={
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
    const{setOpenRegister}= this.state;

    return(
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
      <Grid className={classes.footerMainStyle}>
        <Grid>
          <Grid container className={classes.footerMainContainer}>
            <Hidden only={['xs']}>
              <Grid item xl={3} lg={3} className={classes.footerSection}>
                <Grid>
                  <h3 className={classes.footerTitileSection}>My Alfred</h3>
                </Grid>
                <Link href={'/footer/apropos'}>
                  <Grid style={{marginBottom: '2vh'}}>
                    <Typography className={classes.footerLink}>À propos</Typography>
                  </Grid>
                </Link>
                {
                  is_b2b_site() ?
                    <>
                      <Link href={'/footer/apropos'}>
                        <Grid style={{marginBottom: '2vh'}}>
                          <Typography className={classes.footerLink}>Presse</Typography>
                        </Grid>
                      </Link>
                      <Link href={'/footer/apropos'}>
                        <Grid style={{marginBottom: '2vh'}}>
                          <Typography className={classes.footerLink}>Blog</Typography>
                        </Grid>
                      </Link>
                      <Link href={'/footer/apropos'}>
                        <Grid style={{marginBottom: '2vh'}}>
                          <Typography className={classes.footerLink}>CGU/CGV</Typography>
                        </Grid>
                      </Link>
                      <Link href={'/footer/apropos'}>
                        <Grid style={{marginBottom: '2vh'}}>
                          <Typography className={classes.footerLink}>FAQ</Typography>
                        </Grid>
                      </Link>
                      <Link href={'/footer/apropos'}>
                        <Grid style={{marginBottom: '2vh'}}>
                          <Typography className={classes.footerLink}>Informations légales</Typography>
                        </Grid>
                      </Link>
                    </>
                   : null
                }
                {
                  !is_b2b_site() ?
                    <>
                      <Link href={'/footer/ourTeam'}>
                        <Grid style={{marginBottom: '2vh'}}>
                          <Typography className={classes.footerLink}>Notre équipe</Typography>
                        </Grid>
                      </Link>
                      <Link href={'/contact'}>
                        <Grid>
                          <Typography className={classes.footerLink}>Nous contacter</Typography>
                        </Grid>
                      </Link>
                    </> : null
                }

              </Grid>
            </Hidden>
            <Hidden only={['xs']}>
              <Grid item xl={3} lg={3} className={classes.footerSection}>
                <Grid>
                  <h3 className={classes.footerTitileSection}>{is_b2b_site() ? "Entreprises" : "Communauté"}</h3>
                </Grid>
                {
                  !is_b2b_site() ?
                    <Link href={'/footer/ourCommunity'}>
                      <Grid style={{marginBottom: '2vh'}}>
                        <Typography className={classes.footerLink}>Notre communauté</Typography>
                      </Grid>
                    </Link> :
                    <>
                      <Link href={'/footer/ourCommunity'}>
                        <Grid style={{marginBottom: '2vh'}}>
                          <Typography className={classes.footerLink}>Offre et tarifs</Typography>
                        </Grid>
                      </Link>
                      <Link href={'/footer/ourCommunity'}>
                        <Grid style={{marginBottom: '2vh'}}>
                          <Typography className={classes.footerLink}>My Alfred entreprise</Typography>
                        </Grid>
                      </Link>
                      <Link href={'/footer/ourCommunity'}>
                        <Grid style={{marginBottom: '2vh'}}>
                          <Typography className={classes.footerLink}>Services aux collaborateurs</Typography>
                        </Grid>
                      </Link>
                    </>
                }

              </Grid>
            </Hidden>
            <Hidden only={['xs']}>
              <Grid item xl={3} lg={3} className={classes.footerSection}>
                <Grid>
                  <h3 className={classes.footerTitileSection}>Alfred</h3>
                </Grid>
                {
                  is_b2b_site() ? null :
                    <Link href={'/footer/becomeAlfred'}>
                      <Grid style={{marginBottom: '2vh'}}>
                        <Typography className={classes.footerLink}>Devenir Alfred</Typography>
                      </Grid>
                    </Link>
                }
                {
                  getLoggedUserId() && !isLoggedUserAlfredPro()  ? null :
                    is_b2b_site() ?
                      isLoggedUserAlfredPro()  ?
                        <Link href={'/creaShop/creaShop'}>
                          <Grid style={{marginBottom: '2vh'}}>
                            <Typography className={classes.footerLink}>Je propose mes services </Typography>
                          </Grid>
                        </Link>
                        :
                        <Grid onClick={this.handleOpenRegister} style={{cursor: 'pointer',marginBottom: '2vh'}}>
                          <Typography className={classes.footerLink}>Je propose mes services</Typography>
                        </Grid> : null
                }
                {
                  is_b2b_site() ?
                    <Link href={'/footer/becomeAlfred'}>
                      <Grid style={{marginBottom: '2vh'}}>
                        <Typography className={classes.footerLink}>Charte</Typography>
                      </Grid>
                    </Link> : null
                }
              </Grid>
            </Hidden>
            {
              is_b2b_site() ? null :
                <Grid item xl={3} lg={3} className={classes.footerSection}>
                  <Grid>
                    <h3 className={classes.footerTitileSection}>Assistance</h3>
                  </Grid>
                  <Link href={'/footer/addService'}>
                    <Grid style={{marginBottom: '2vh'}}>
                      <Typography className={classes.footerLink}>Réserver un service</Typography>
                    </Grid>
                  </Link>
                  <Hidden only={['xs']}>
                    <Link href={''}>
                      <Grid style={{marginBottom: '2vh'}} onClick={() => Tawk_API.maximize()}>
                        <Typography className={classes.footerLink}>Parler à un humain</Typography>
                      </Grid>
                    </Link>
                  </Hidden>
                  <Link href={'/faq'}>
                    <Grid>
                      <Typography className={classes.footerLink}>FAQ</Typography>
                    </Grid>
                  </Link>
                </Grid>
            }
          </Grid>
          <Hidden only={['xl', 'lg', 'md']}>
            <Grid className={classes.footerDividerContainer}>
              <Divider className={classes.footerDivider}/>
            </Grid>
          </Hidden>
          <Grid className={classes.footerSocialSection}>
            <Grid>
              <h3 className={classes.footerTitileSection}>Réseaux sociaux</h3>
            </Grid>
            <Grid className={classes.footerSocialContainer}>
              <Grid>
                <a href={'https://www.facebook.com/myalfred1/'} target={'_blank'}>
                  <IconButton aria-label="FacebookIcon" >
                    <FacebookIcon/>
                  </IconButton>
                </a>
              </Grid>
              <Grid>
                <a href={'https://www.instagram.com/my_alfred_/'} target={'_blank'}>
                  <IconButton aria-label="InstagramIcon">
                    <InstagramIcon/>
                  </IconButton>
                </a>
              </Grid>
              <Grid>
                <a href={'https://www.linkedin.com/company/my-alfred/'} target={'_blank'}>
                  <IconButton aria-label="LinkedInIcon">
                    <LinkedInIcon/>
                  </IconButton>
                </a>
              </Grid
              ><Grid>
                <a href={'https://twitter.com/MyAlfred2'} target={'_blank'}>
                  <IconButton aria-label="TwitterIcon">
                    <TwitterIcon/>
                  </IconButton>
                </a>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.footerDividerContainer}>
            <Divider className={classes.footerDivider}/>
          </Grid>
          <Grid className={classes.footerBrandContainer}>
            <Grid className={classes.footerBrandStyle}>
              <Grid className={classes.footerLawContainer}>
                <Typography>© 2020 MY ALFRED Corporation. Tous droits  réservés</Typography>
              </Grid>
              <Grid className={classes.footerRgpdButtons}>
                <Grid className={classes.footerLinkInfoContainer}>
                  <Link href={'/footer/legalNotice'}>
                    <Typography className={classes.footerLink}>Informations légales</Typography>
                  </Link>
                </Grid>
                <Grid  className={classes.footerLinkInfoContainer}>
                  <Link href={'/cgu'}>
                    <Grid>
                      <Typography className={classes.footerLink}>Conditions générales d'utilisation</Typography>
                    </Grid>
                  </Link>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {this.dialogRegister(classes)}
      </Grid>
    );
  }
}

export default withStyles(styles)(Footer);
