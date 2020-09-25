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
        <Grid className={style.footerMainContainer}>
          <Grid className={style.footerSection}>
            <Grid>
              <h2>À propos</h2>
            </Grid>
            <Grid>
              <p>Pourquoi My Alfred ?</p>
            </Grid>
            <Grid>
              <p>Notre histoire</p>
            </Grid>
            <Grid>
              <p>Nous contacter</p>
            </Grid>
          </Grid>
          <Grid className={style.footerSection}>
            <Grid>
              <h2>Communauté</h2>
            </Grid>
            <Grid>
              <p>Notre communauté</p>
            </Grid>
            <Grid>
              <p>Inviter un ami</p>
            </Grid>
          </Grid>
          <Grid className={style.footerSection}>
            <Grid>
              <h2>Alfred</h2>
            </Grid>
            <Grid>
              <p>Devenir Alfred</p>
            </Grid>
            <Grid>
              <p>Centre de ressources</p>
            </Grid>
          </Grid>
          <Grid className={style.footerSection}>
            <Grid>
              <h2>Assistance</h2>
            </Grid>
            <Grid>
              <p>Les bases</p>
            </Grid>
            <Grid>
              <p>FAQ</p>
            </Grid>
            <Grid>
              <p>Parler à un humain</p>
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
              <p>© 2020 MY ALFRED Corporation. Tous droits réservés</p>
            </Grid>
            <Grid className={style.footerRgpdButtons}>
              <Grid>
                <p>Sécurité</p>
              </Grid>
              <Grid>
                <p>Informations légales</p>
              </Grid>
              <Grid>
                <p>Confidentialié</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Footer;
