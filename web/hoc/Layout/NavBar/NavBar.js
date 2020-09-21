import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import {withStyles} from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import setAuthToken from '../../../utils/setAuthToken';
import Router from 'next/router';
import UserAvatar from '../../../components/Avatar/UserAvatar';
import SearchInput from '../../../components/SearchInput/SearchInput';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import cookie from 'react-cookies';
import LogIn from '../../../components/LogIn/LogIn';
import Register from '../../../components/Register/Register';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Slide from '@material-ui/core/Slide';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';

import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';

import {SEARCHBAR} from '../../../utils/i18n';

const jwt = require('jsonwebtoken');

var parse = require('url-parse');

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      avatarMoreAnchorEl: null,
      logged: false,
      hiddingPanel: true,
      isTop: true,
      isIndex: false,
      isSearch: false,
      setOpenLogin: false,
      setOpenMobileLogin: false,
      setOpenRegister: false,
      setOpenMobileRegister: false,
      user: null,
      google_id: props.google_id,
      facebook_id: props.facebook_id,
      activeStep: 0,
    };

  }


  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== '') {
      this.state.user = this.props.user;
    }
  }

  componentDidMount() {
    var query = parse(window.location.href, true).query;
    if (query.google_id || query.facebook_id || query.error) {
      this.setState({
        setOpenRegister: true,
        setOpenLogin: false,
      });
    }

    if (query.signup === 'true') {
      this.setState({
        setOpenRegister: true,
        setOpenLogin: false,
      });
    }
    ;

    const token = cookie.load('token');
    if (token) {
      this.setState({logged: true});
      axios.defaults.headers.common['Authorization'] = token;
    }
    if (Router.pathname === '/') {
      this.setState({
        hiddingPanel: false,
        isIndex: true,
      });
    }
    if (Router.pathname === '/search') {
      this.setState({
        isSearch: true,
      });
    }
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 820;
      if (isTop !== this.state.isTop) {
        this.onScroll(isTop);
      }
    });
  }

  onScroll(isTop) {
    this.setState({isTop});
  }


  logout2() {
    cookie.remove('token', {path: '/'});
    localStorage.removeItem('path');
    // Remove auth header for future requests
    setAuthToken(false);
    Router.push('/?disconnect=1');
  };

  handleProfileMenuOpen = event => {
    this.setState({anchorEl: event.currentTarget});
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null});
    this.handleMobileMenuClose();
    this.handleAvatarMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({mobileMoreAnchorEl: event.currentTarget});
  };

  handleAvatarMenuOpen = event => {
    this.setState({avatarMoreAnchorEl: event.currentTarget});
  };

  handleAvatarMenuClose = event => {
    this.setState({avatarMoreAnchorEl: null});
  };

  handleMobileMenuClose = () => {
    this.setState({mobileMoreAnchorEl: null});
  };

  handleOpenLogin = (e) => {
    this.handleMenuClose();
    if (e.target.name === 'mobile') {
      this.setState({setOpenMobileLogin: true, setOpenMobileRegister: false});
    } else {
      this.setState({setOpenLogin: true, setOpenRegister: false});

    }
  };

  handleCloseLogin = () => {
    this.setState({setOpenLogin: false});
  };

  handleOpenRegister = (e) => {
    this.handleMenuClose();
    if (e.target.name === 'mobile') {
      this.setState({setOpenMobileRegister: true, setOpenMobileLogin: false});
    } else {
      this.setState({setOpenRegister: true, setOpenLogin: false});

    }
  };

  handleCloseRegister = () => {
    if (this.state.activeStep === 2) {
      this.setState({setOpenRegister: false}, () => this.componentDidMount());
    } else {
      this.setState({setOpenRegister: false});
    }
  };

  needRefresh = () => {
    this.setState({setOpenLogin: false});
    Router.push('/search');
  };

  getData = (e) => {
    this.setState({activeStep: e});
  };

  is_admin = () => {
    var is_admin = false;
    const coo = cookie.load('token');
    if (coo) {
      return jwt.decode(coo.split(' ')[1]).is_admin;
    }
    return false;
  };

  render() {
    const {mobileMoreAnchorEl, avatarMoreAnchorEl, hiddingPanel, logged, user} = this.state;
    const {style} = this.props;

    return(
      <Grid className={style.navbarMainSytle}>
        <Grid className={style.navbarLogoContainer}>
          <p>Mon logo</p>
        </Grid>
        <Grid className={style.navbarSearchContainer}>
          <Paper component="form" classes={{root: style.navbarSearch}}>
            <InputBase
              className={style.input}
              placeholder={SEARCHBAR.what}
            />
            <Divider className={style.divider} orientation="vertical" />
            <InputBase
              className={style.input}
              placeholder={SEARCHBAR.where}
            />
            <Divider className={style.divider} orientation="vertical" />
            <InputBase
              className={style.input}
              placeholder={SEARCHBAR.when}
            />
            <IconButton type="submit" classes={{root: style.iconButton}} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
        </Grid>
        <Grid className={style.navbarButtonContainer}>
          <Grid>
            <Button className={style.navBarlogIn}>Connexion</Button>
          </Grid>
          <Grid>
            <Button variant="contained" classes={{root: style.navbarSignIn}}>Inscription</Button>
          </Grid>
        </Grid>
      </Grid>
    )

  }
}

export default NavBar;
