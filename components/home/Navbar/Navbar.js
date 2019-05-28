import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = {
  grow: {
    flexGrow: 1,
  },
  buttonSpace: {
    marginRight: '10px',
  },
};

const navbar = (props) => {
  const { classes } = props;

  return (
    <AppBar color="default" position="static" className={classes.grow}>
      <Toolbar>
        <Typography variant="h6" className={classes.grow}>
          My Alfred
        </Typography>
        <Button variant="outlined" color="primary" className={classes.buttonSpace}>Connexion</Button>
        <Button variant="contained" color="primary">Inscription</Button>
      </Toolbar>
    </AppBar>
  );
};

// eslint-disable-next-line react/no-typos
navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(navbar);
