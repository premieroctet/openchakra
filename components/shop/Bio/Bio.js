import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import BioCard from './BioCard/BioCard';

const styles = theme => ({
  container: {
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: '5rem',
    marginBottom: '5rem',
    marginRight: 'auto',
    marginLeft: 'auto',
    width: '100%',

    // Full width for (xs, extra-small: 0px or larger) and (sm, small: 600px or larger)
    [theme.breakpoints.up('xs')]: { // medium: 960px or larger
      flexDirection: 'column',
    },
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
});

const bio = (props) => {
  // eslint-disable-next-line react/prop-types
  const { classes } = props;

  return (
    <Fragment>
      <Grid container className={classes.container} spacing={24}>
        <BioCard />
      </Grid>
    </Fragment>
  );
};

export default withStyles(styles)(bio);
