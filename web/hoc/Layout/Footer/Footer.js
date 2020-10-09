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

class Footer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {style} = this.props;
    return (
      <Grid className={style.footerMainStyle}>
        <Grid>
          <Grid className={style.footerMainContainer}>
            <Grid className={style.footerSection}>
              <Grid>
                <h3 className={style.footerTitileSection}>À propos</h3>
              </Grid>
              <Grid>
                <p className={style.footerLink}>Pourquoi My Alfred ?</p>
              </Grid>
              <Grid>
                <p className={style.footerLink}>Notre histoire</p>
              </Grid>
              <Grid>
                <p className={style.footerLink}>Nous contacter</p>
              </Grid>
            </Grid>
            <Grid className={style.footerSection}>
              <Grid>
                <h3 className={style.footerTitileSection}>Communauté</h3>
              </Grid>
              <Grid>
                <p className={style.footerLink}>Notre communauté</p>
              </Grid>
              <Grid>
                <p className={style.footerLink}>Inviter un ami</p>
              </Grid>
            </Grid>
            <Grid className={style.footerSection}>
              <Grid>
                <h3 className={style.footerTitileSection}>Alfred</h3>
              </Grid>
              <Grid>
                <p className={style.footerLink}>Devenir Alfred</p>
              </Grid>
              <Grid>
                <p className={style.footerLink}>Centre de ressources</p>
              </Grid>
            </Grid>
            <Grid className={style.footerSection}>
              <Grid>
                <h3 className={style.footerTitileSection}>Assistance</h3>
              </Grid>
              <Grid>
                <p className={style.footerLink}>Les bases</p>
              </Grid>
              <Grid>
                <p className={style.footerLink}>FAQ</p>
              </Grid>
              <Grid>
                <p className={style.footerLink}>Parler à un humain</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={style.footerSocialSection}>
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
          <Grid className={style.footerDividerContainer}>
            <Divider className={style.footerDivider}/>
          </Grid>
          <Grid className={style.footerBrandContainer}>
            <Grid className={style.footerBrandStyle}>
              <Grid>
                <p className={style.footerText}>© 2020 MY ALFRED Corporation. Tous droits réservés</p>
              </Grid>
              <Grid className={style.footerRgpdButtons}>
                <Grid>
                  <p className={style.footerLink}>Sécurité</p>
                </Grid>
                <Grid>
                  <p className={style.footerLink}>Informations légales</p>
                </Grid>
                <Grid>
                  <p className={style.footerLink}>Confidentialié</p>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Footer;
