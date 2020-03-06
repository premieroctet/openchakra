import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
import styles from './BannerReservationStyle'
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Chip from '@material-ui/core/Chip';

class BannerReservation extends React.Component{

  constructor(props) {
    super(props);
    this.state ={
    };
  }

  render() {
    const { classes, serviceUser, shop, user } = this.props;

    return (
      <Grid>
        <Grid container className={classes.bannerContainer} style={{ backgroundImage:  'url("../../' + serviceUser.picture + '")'}}>
          { shop.is_professional ?
            <Grid className={classes.statusMedia}>
              <Chip label="PRO" className={classes.chipStyle}/>
            </Grid>
            :null
          }
          <Grid container className={classes.darkOverlay}>
            <Grid container className={classes.container}>
              <Grid>
                <Typography className={classes.textAvatar}>{serviceUser.label}</Typography>
              </Grid>
              <Grid>
                <Fab
                  variant="extended"
                  size="medium"
                  color="primary"
                  aria-label="add"
                  className={classes.margin}
                >
                  <p style={{color: 'white'}}>Boutique de {user.firstname}</p>
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

BannerReservation.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(BannerReservation);
