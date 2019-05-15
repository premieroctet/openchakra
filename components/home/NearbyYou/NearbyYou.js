import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import NearbyYouCard from './NearbyYou/NearbyYouCard';

const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: 920,
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: 1170,
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: 1366,
    },
  },
  media: {
    height: 0,
    borderRadius: '20px',
    paddingTop: '118.25%', // 16:9
    maxWidth: 345,
  },
  textBox: {
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 5,

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('md')]: { // medium: 960px or larger
      width: 920,
    },
    [theme.breakpoints.up('lg')]: { // large: 1280px or larger
      width: 1170,
    },
    [theme.breakpoints.up('xl')]: { // extra-large: 1920px or larger
      width: 1366,
    },
  },
});

const nearbyYou = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <Grid container className={classes.container}>
        <Typography variant="h5" className={classes.textBox}>
          Nos recommandations
        </Typography>
      </Grid>
      <Grid container className={classes.container} spacing={24} wrap="wrap">
        <Grid item xs={4}>
          <NearbyYouCard img="../../../static/rachel-park-366508-unsplash.jpg" />
        </Grid>
        <Grid item xs={4}>
          <NearbyYouCard img="../../../static/rachel-park-366508-unsplash.jpg" />
        </Grid>
        <Grid item sm={4}>
          <NearbyYouCard img="../../../static/rachel-park-366508-unsplash.jpg" />
        </Grid>
        <Grid item xs={4}>
          <NearbyYouCard img="../../../static/rachel-park-366508-unsplash.jpg" />
        </Grid>
        <Grid item xs={4}>
          <NearbyYouCard img="../../../static/rachel-park-366508-unsplash.jpg" />
        </Grid>
        <Grid item sm={4}>
          <NearbyYouCard   img="../../../static/rachel-park-366508-unsplash.jpg" />
        </Grid>
      </Grid>
    </Fragment>
  );
};

nearbyYou.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(nearbyYou);
