import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import MyBestSellersCard from './MyBestSellersCard/MyBestSellersCard';

const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',

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
  title: {
    fontSize: '2.5em',
    marginTop: '2rem',
    marginBottom: '2rem',
  },
  card2: {
    display: 'flex',
    justifyContent: 'center',
    [theme.breakpoints.down('md')]: { // medium: 960px or larger
      justifyContent: 'normal',
    },
  },
  card3: {
    display: 'flex',
    justifyContent: 'flex-end',
    [theme.breakpoints.down('md')]: { // medium: 960px or larger
      justifyContent: 'normal',
    },
  },
});

const myBestSellers = (props) => {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;

  return (
    <Fragment>
      <Grid container className={classes.container}>
        <Typography variant="h5" className={classes.title}>Mes meilleurs services</Typography>
      </Grid>
      <Grid container className={classes.container} spacing={24}>
        <Grid item xs={12} sm={6} md={4}>
          <MyBestSellersCard img="../../../static/photo-1538342014732-212dc8f76863.jpeg" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.card2}>
          <MyBestSellersCard img="../../../static/photo-1538342014732-212dc8f76863.jpeg" />
        </Grid>
        <Grid item xs={12} sm={6} md={4} className={classes.card3}>
          <MyBestSellersCard img="../../../static/photo-1538342014732-212dc8f76863.jpeg" />
        </Grid>
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(myBestSellers);
