import React, {Fragment} from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import RecommandationsCard from './RecommandationsCard/RecommandationsCard';

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
    marginBottom: 30,
    marginTop: 35,

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

const recommandations = (props) => {
  const {classes} = props;

  return (
    <Fragment>
      <Grid container className={classes.container}>
        <Typography variant="h5" className={classes.textBox}>
          Nos recommandations
        </Typography>
      </Grid>
      <Grid container className={classes.container} spacing={24} wrap="wrap">
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <RecommandationsCard img="/static/bailey-zindel-396398-unsplash.jpg"/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <RecommandationsCard img="/static/bailey-zindel-396398-unsplash.jpg"/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <RecommandationsCard img="/static/bailey-zindel-396398-unsplash.jpg"/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <RecommandationsCard img="/static/bailey-zindel-396398-unsplash.jpg"/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <RecommandationsCard img="/static/bailey-zindel-396398-unsplash.jpg"/>
        </Grid>
        <Grid item xs={12} sm={6} md={4} lg={4}>
          <RecommandationsCard img="/static/bailey-zindel-396398-unsplash.jpg"/>
        </Grid>
      </Grid>
    </Fragment>
  );
};

recommandations.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(recommandations);
