import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Chip from '@material-ui/core/Chip';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
});

const subBar = (props) => {
  const { classes } = props;

  return (
    <AppBar color="default" position="static" className={classes.grow}>
      <Toolbar>
        <Chip label="test" />
        <Button>Test</Button>
      </Toolbar>
    </AppBar>
  );
};

// eslint-disable-next-line react/no-typos
subBar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default withStyles(styles)(subBar);
