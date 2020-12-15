import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import {withStyles} from "@material-ui/core/styles";
import styles from '../static/css/pages/footer/contact/contact';
import LayoutFaq from "../hoc/Layout/LayoutFaq";
import NeedMoreFaq from "../hoc/Layout/Faq/NeedMoreFaq";

class Contact extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {classes} = this.props;

    return (
      <LayoutFaq>
        <Grid container spacing={10} style={{margin: 0, width: '100%'}}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.contactContainer}>
            <Grid>
              <h3>Service client - Nos heures d'ouverture</h3>
            </Grid>
            <Grid style={{display: 'flex'}}>
              <Grid>
                <Typography>Du Lundi au Vendredi 10H - 18 H</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.contactContainer}>
            <Grid>
              <h3>Nous contacter</h3>
            </Grid>
            <Grid>
              <Typography>
                <Grid style={{display: 'flex'}}>
                  <MailOutlineIcon style={{paddingRight: '5px'}}/>
                  <a style={{
                    color: 'black',
                    borderBottom: '1 px solid black',
                  }} href={'mailto:hello@my-alfred.io'}>
                    hello@my-alfred.io
                  </a>
                </Grid>
              </Typography>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <NeedMoreFaq/>
          </Grid>
        </Grid>
      </LayoutFaq>
    )
  }
}

export default withStyles(styles)(Contact)
