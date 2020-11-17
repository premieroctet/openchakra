import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {withStyles} from '@material-ui/core/styles';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import Divider from "@material-ui/core/Divider";
import Paper from "@material-ui/core/Paper";
import styles from '../../../static/css/components/Footer/Footer'
import Hidden from "@material-ui/core/Hidden";

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;
    return (
      <Grid className={classes.footerMainStyle}>
        <Grid>
          <Grid className={classes.footerMainContainer}>
            <Hidden only={['xs']}>
              <Grid className={classes.footerSection}>
                <Grid>
                  <h3 className={classes.footerTitileSection}>À propos</h3>
                </Grid>
                <Link href={'/footer/apropos'}>
                  <Grid>
                    <Typography className={classes.footerLink}>My Alfred ?</Typography>
                  </Grid>
                </Link>
                <Link href={'/footer/ourTeam'}>
                  <Grid>
                    <Typography className={classes.footerLink}>Notre équipe</Typography>
                  </Grid>
                </Link>
                <Link href={'/footer/contact'}>
                  <Grid>
                    <Typography className={classes.footerLink}>Nous contacter</Typography>
                  </Grid>
                </Link>
              </Grid>
            </Hidden>
            <Hidden only={['xs']}>
              <Grid className={classes.footerSection}>
                <Grid>
                  <h3 className={classes.footerTitileSection}>Communauté</h3>
                </Grid>
                <Link href={'/footer/ourCommunity'}>
                  <Grid>
                    <Typography className={classes.footerLink}>Notre communauté</Typography>
                  </Grid>
                </Link>
                <Link href={'/'}>
                  <Grid>
                    <Typography className={classes.footerLink}>Le blog</Typography>
                  </Grid>
                </Link>
                <Link href={'/'}>
                  <Grid>
                    <Typography className={classes.footerLink}>Inviter un ami</Typography>
                  </Grid>
                </Link>
              </Grid>
            </Hidden>
            <Hidden only={['xs']}>
              <Grid className={classes.footerSection}>
                <Grid>
                  <h3 className={classes.footerTitileSection}>Alfred</h3>
                </Grid>
                <Link href={'/footer/becomeAlfred'}>
                  <Grid>
                    <Typography className={classes.footerLink}>Devenir Alfred</Typography>
                  </Grid>
                </Link>
                <Link href={'/faq/home'}>
                  <Grid>
                    <Typography className={classes.footerLink}>FAQ des Alfred</Typography>
                  </Grid>
                </Link>
                <Link href={'/'}>
                  <Grid>
                    <Typography className={classes.footerLink}>Centre de ressources</Typography>
                  </Grid>
                </Link>
              </Grid>
            </Hidden>
            <Grid className={classes.footerSection}>
              <Grid>
                <h3 className={classes.footerTitileSection}>Assistance</h3>
              </Grid>
              <Link href={'/footer/addService'}>
                <Grid>
                  <Typography className={classes.footerLink}>Réserver un service</Typography>
                </Grid>
              </Link>
              <Link href={'/faq/home'}>
                <Grid>
                  <Typography className={classes.footerLink}>FAQ des services</Typography>
                </Grid>
              </Link>
              <Link href={'/'}>
                <Grid>
                  <Typography className={classes.footerLink}>Parler à un humain</Typography>
                </Grid>
              </Link>
            </Grid>
          </Grid>
          <Grid className={classes.footerDividerContainer}>
            <Divider className={classes.footerDivider}/>
          </Grid>
          <Grid className={classes.footerSocialSection}>
            <Grid>
              <h3 className={classes.footerTitileSection}>Réseaux sociaux</h3>
            </Grid>
            <Grid className={classes.footerSocialContainer}>
              <Grid>
                <FacebookIcon/>
              </Grid>
              <Grid>
                <InstagramIcon/>
              </Grid>
              <Grid>
                <LinkedInIcon/>
              </Grid>
              <Grid>
                <TwitterIcon/>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.footerDividerContainer}>
            <Divider className={classes.footerDivider}/>
          </Grid>
          <Grid className={classes.footerBrandContainer}>
            <Grid className={classes.footerBrandStyle}>
              <Grid>
                <Typography className={classes.footerText}>© 2020 MY ALFRED Corporation. Tous droits réservés</Typography>
              </Grid>
                <Grid className={classes.footerRgpdButtons}>
                  <Grid>
                    <Typography className={classes.footerLink}>Sécurité</Typography>
                  </Grid>
                  <Grid>
                    <Typography className={classes.footerLink}>Informations légales</Typography>
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

export default withStyles(styles) (Footer);
