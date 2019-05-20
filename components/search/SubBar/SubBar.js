import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-unused-vars
const styles = theme => ({
  grow: {
    flexGrow: 1,
    marginTop: 64,
  },
});

const subBar = (props) => {
  const { classes } = props;

  return (
    <AppBar color="default" position="static" className={classes.grow}>
      <Toolbar>
        <Button>Homme</Button>
        <Button>Femme</Button>
        <Button>Couleur</Button>
        <Button>Brushing</Button>
      </Toolbar>
    </AppBar>
  );
};

// eslint-disable-next-line react/no-typos
subBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(subBar);
