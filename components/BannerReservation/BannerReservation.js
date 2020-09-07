import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import styles from './BannerReservationStyle';
import PropTypes from 'prop-types';
import Fab from '@material-ui/core/Fab';
import Chip from '@material-ui/core/Chip';
import Link from 'next/link';
import '../../static/assets/police/signatra.css';

const {frenchFormat} = require('../../utils/text');


class BannerReservation extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {classes, serviceUser, shop, user} = this.props;

    return (
      <Grid>
        <Grid container className={classes.bannerContainer}
              style={{backgroundImage: 'url("' + serviceUser.picture + '")'}}>
          {shop.is_professional ?
            <Grid className={classes.statusMedia}>
              <Chip label="PRO" className={classes.chipStyle}/>
            </Grid>
            : null
          }
          <Grid container className={classes.darkOverlay}>
            <Grid container className={classes.container}>
              <Grid>
                <p class="customPolice"
                   style={{fontSize: 70, textAlign: 'center', color: 'white'}}>{serviceUser.label}</p>
              </Grid>
              <Grid>
                <Link href={`/shop?id_alfred=${user._id}`}>
                  <Fab
                    variant="extended"
                    color="primary"
                    aria-label="add"
                    className={classes.margin}
                  >
                    <p style={{color: 'white'}}>{frenchFormat(`Les services de ${user.firstname}`)}</p>
                  </Fab>
                </Link>
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

export default withStyles(styles, {withTheme: true})(BannerReservation);
