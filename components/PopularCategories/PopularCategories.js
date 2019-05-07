import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

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
});

const popularCategories = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <Grid container className={classes.container} justify="center" spacing="24">
        <Grid item xs="3">
          <Card>
            Card 1
          </Card>
        </Grid>
        <Grid item xs="3">
          <Card>
            Card 2
          </Card>
        </Grid>
        <Grid item xs="3">
          <Card>
            Card 3
          </Card>
        </Grid>
        <Grid item xs="3">
          <Card>
             Card 4
          </Card>
        </Grid>
      </Grid>
    </Fragment>
  );
};

popularCategories.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(popularCategories);
