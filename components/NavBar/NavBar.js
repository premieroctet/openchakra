import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  grow: {
    flexGrow: 1,
  },
  buttonSpace: {
    marginRight: '10px',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: '20px',
    },
    [theme.breakpoints.up('sm')]: {
      marginLeft: '20px',
      width: '30%',
    },
  },
  searchIcon: {
    width: theme.spacing(9),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    [theme.breakpoints.up('xs')]: {
      width: theme.spacing(5),
    },
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing,
    paddingRight: theme.spacing,
    paddingBottom: theme.spacing,
    paddingLeft: theme.spacing(10),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 120,
      '&:focus': {
        width: '200',
      },
    },
  },
  mobileHide: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
});

const navbar = (props) => {
  const { classes } = props;

  return (
    <AppBar color="primary" position="fixed" className={classes.grow}>
      <Toolbar>
        <Typography variant="h6">
          My Alfred
        </Typography>
        <div className={classes.search}>
          <div className={classes.searchIcon}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search..."
            classes={{
              root: classes.inputRoot,
              input: classes.inputInput,
            }}
          />
        </div>
        <div className={classes.grow} />
        <Button variant="outlined" color="default" className={classes.buttonSpace}>Connexion</Button>
        <Button variant="contained" color="default" className={classes.mobileHide}>Inscription</Button>
      </Toolbar>
    </AppBar>
  );
};

navbar.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  theme: PropTypes.objectOf(PropTypes.string).isRequired
};

export default withStyles(styles)(navbar);
