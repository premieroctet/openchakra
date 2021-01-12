import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '../../../components/Link/Link'
import {withStyles} from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import Divider from "@material-ui/core/Divider";
import styles from '../../../static/css/components/Footer/Footer'
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.footerMainStyle}>
        <Grid>
          <Grid container className={classes.footerMainContainer}>
            <Hidden only={['xs']}>
              <Grid item xl={3} lg={3} className={classes.footerSection}>
                <Grid>
                  <h3 className={classes.footerTitileSection}>À propos</h3>
                </Grid>
                <Link href={'/footer/apropos?indexFaq=0'}>
                  <Grid style={{marginBottom: '2vh'}}>
                    <Typography className={classes.footerLink}>My Alfred</Typography>
                  </Grid>
                </Link>
                <Link href={'/footer/ourTeam?indexFaq=2'}>
                  <Grid style={{marginBottom: '2vh'}}>
                    <Typography className={classes.footerLink}>Notre équipe</Typography>
                  </Grid>
                </Link>
                <Link href={'/contact'}>
                  <Grid>
                    <Typography className={classes.footerLink}>Nous contacter</Typography>
                  </Grid>
                </Link>
              </Grid>
            </Hidden>
            <Hidden only={['xs']}>
              <Grid item xl={3} lg={3} className={classes.footerSection}>
                <Grid>
                  <h3 className={classes.footerTitileSection}>Communauté</h3>
                </Grid>
                <Link href={'/footer/ourCommunity?indexFaq=1'}>
                  <Grid style={{marginBottom: '2vh'}}>
                    <Typography className={classes.footerLink}>Notre communauté</Typography>
                  </Grid>
                </Link>
                {/*<Link href={'/'}>*/}
                {/*    <Grid style={{marginBottom: '2vh'}}>*/}
                {/*        <Typography className={classes.footerLink}>Le blog</Typography>*/}
                {/*    </Grid>*/}
                {/*</Link>*/}
                {/*<Link href={'/'}>*/}
                {/*    <Grid>*/}
                {/*        <Typography className={classes.footerLink}>Inviter un ami</Typography>*/}
                {/*    </Grid>*/}
                {/*</Link>*/}
              </Grid>
            </Hidden>
            <Hidden only={['xs']}>
              <Grid item xl={3} lg={3} className={classes.footerSection}>
                <Grid>
                  <h3 className={classes.footerTitileSection}>Alfred</h3>
                </Grid>
                <Link href={'/footer/becomeAlfred'}>
                  <Grid style={{marginBottom: '2vh'}}>
                    <Typography className={classes.footerLink}>Devenir Alfred</Typography>
                  </Grid>
                </Link>
                {true ? null :
                  <Link href={'/'}>
                    <Grid>
                      <Typography className={classes.footerLink}>Centre de ressources</Typography>
                    </Grid>
                  </Link>}

              </Grid>
            </Hidden>
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
                <Link onClick={() => Tawk_API.maximize()}>
                  <Grid style={{marginBottom: '2vh'}}>
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
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.footerDividerContainer}>
            <Divider className={classes.footerDivider}/>
          </Grid>
          <Grid className={classes.footerBrandContainer}>
            <Grid className={classes.footerBrandStyle}>
              <Grid className={classes.footerLawContainer}>
                <Typography className={classes.footerText}>© 2020 MY ALFRED Corporation. Tous droits
                  réservés</Typography>
              </Grid>
              <Grid className={classes.footerRgpdButtons}>
                {true ? null :
                  <Grid>
                    <Typography className={classes.footerLink}>Sécurité</Typography>
                  </Grid>
                }
                <Grid className={classes.footerLinkInfoContainer}>
                  <Link href={'/footer/legalNotice'}>
                    <Typography className={classes.footerLink}>Informations légales</Typography>
                  </Link>
                </Grid>
                <Grid>
                  <Link href={'/cgu'}>
                    <Typography className={classes.footerLink}>CGU</Typography>
                  </Link>
                </Grid>
                <Grid>
                  <Typography className={classes.footerLink}>Confidentialié</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Footer);
