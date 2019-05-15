import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import TemptedByCard from './TemptedByCard/TemptedByCard';

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
  },
  textBox: {
    paddingRight: 15,
    paddingLeft: 15,
    marginBottom: 5,
  },
});

const TemptedBy = (props) => {
  const { classes } = props;

  return (
    <Fragment>
      <Grid container className={classes.container}>
        <Typography variant="h5" className={classes.textBox}>
          Vous serez peut-être tentés par...
        </Typography>
      </Grid>
      <Grid container className={classes.container} spacing={24} wrap="wrap">
        <Grid item xs={3}>
          <TemptedByCard img="../../static/bleumarine.png" title="image bleu marine" desc="Description de la prestation lorem ipsum lalala lalala" className={classes.media} />
        </Grid>
        <Grid item xs={3}>
          <TemptedByCard img="../../static/saumonorange.png" title="image orange saumon" desc="Description de la prestation lorem ipsum lalala lalala" className={classes.media} />
        </Grid>
        <Grid item sm={3}>
          <TemptedByCard img="../../static/bleuclair.png" title="image bleu clair" desc="Description de la prestation lorem ipsum lalala lalala" className={classes.media} />
        </Grid>
        <Grid item sm={3}>
          <TemptedByCard img="../../static/violetclair.png" title="image violet clair" desc="Description de la prestation lorem ipsum lalala lalala" className={classes.media} />
        </Grid>
      </Grid>
    </Fragment>
  );
};

TemptedBy.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(TemptedBy);
