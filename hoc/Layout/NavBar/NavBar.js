import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { withStyles, MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import setAuthToken from "../../../utils/setAuthToken";
import Router from "next/router";

const styles = theme => ({
  root: {
    width: '100%',
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
    width: '100%',
  },
  inputInput: {
    paddingTop: theme.spacing.unit,
    paddingRight: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 10,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200,
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  inscription: {
    color: 'primary',
  },
  navbarItem: {
    alignSelf: 'center',
    color: 'white',
    marginRight: '20px',
    fontSize: '15px'
  },
  navbarLink: {
    textDecoration: 'none',
    color: 'white',
  },
  navbarLinkMobile: {
    color: 'black',
    textDecoration: 'none',
  },
});

class NavBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    logged: false
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({logged:true})
    }
  }

  logout2() {
    localStorage.removeItem('token');
    localStorage.removeItem('path');
    // Remove auth header for future requests
    setAuthToken(false);
    Router.push({pathname: '/'});
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const test = this.state.logged;
    const logout = <Button variant="outlined" style={{ marginRight: '20px', color: 'white', border: '1px solid rgba(255, 255, 255, 1)' }}
                           onClick={this.logout2}>Déconnexion</Button>;

    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={this.handleMenuClose}>My account</MenuItem>
      </Menu>
    );

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuClose}>
          <Typography>
            <Link href='#'>
              <a className={classes.navbarLinkMobile}>
                Devenir Alfred
              </a>
            </Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuClose}>
          <Typography>
            <Link href='#'>
              <a className={classes.navbarLinkMobile}>
                Aide
              </a>
            </Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuOpen}>
          <Typography>
            <Link href='/login'>
              <a className={classes.navbarLinkMobile}>
                Connexion
              </a>
            </Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuOpen}>
          <Typography>
            <Link href='/signup'>
              <a className={classes.navbarLinkMobile}>
                Inscription
              </a>
            </Link>
          </Typography>
        </MenuItem>
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Typography className={classes.title} variant="h6" color="inherit" noWrap>
              My Alfred
            </Typography>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
              />
            </div>
            <div className={classes.grow} />
            <div className={classes.sectionDesktop}>
              <Typography className={classes.navbarItem}>
                <Link href='/becomeAlfred'>
                  <a className={classes.navbarLink}>
                    Devenir Alfred
                  </a>
                </Link>
              </Typography>
              <Typography className={classes.navbarItem}>
                <Link href='#'>
                  <a className={classes.navbarLink}>
                    Aide
                  </a>
                </Link>
              </Typography>
              {test ? logout : <React.Fragment><Link href='/login'>
                    <Button variant="outlined" style={{ marginRight: '20px', color: 'white', border: '1px solid rgba(255, 255, 255, 1)' }}>
                      Connexion
                    </Button>
                  </Link>
                  <Link href='/signup'>
                <Button
                style={{ backgroundColor: 'white', color: '#3f51b5'}}
                variant="contained"
                >
                Inscription
                </Button>
                </Link></React.Fragment>}

            </div>
            <div className={classes.sectionMobile}>
              <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                <MoreIcon />
              </IconButton>
            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
      </div>
    );
  }
}

/*<IconButton color="inherit">
                <Badge badgeContent={4} color="secondary">
                  <MailIcon />
                </Badge>
              </IconButton>
              <IconButton color="inherit">
                <Badge badgeContent={17} color="secondary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
              <IconButton
                aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                aria-haspopup="true"
                onClick={this.handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>*/

export default withStyles(styles)(NavBar);
