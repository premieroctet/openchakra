import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles} from '@material-ui/core/styles';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import setAuthToken from "../../../utils/setAuthToken";
import Router from "next/router";
import UserAvatar from '../../../components/Avatar/UserAvatar';
import SearchInput from '../../../components/SearchInput/SearchInput';
import styles from './NavBarStyle'
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Avatar from '@material-ui/core/Avatar';

const { config } = require('../../../config/config');
const url = config.apiUrl;
const jwt = require('jsonwebtoken');


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      avatarMoreAnchorEl: null,
      logged: false,
      research: '',
      hiddingPanel : true,
      isTop: true,
      isIndex: false,
      isSearch: false,
      user:{},
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
   if(prevProps !== ""){
     this.state.user = this.props.user
   }
  }

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.setState({ logged: true });
      const token2 = localStorage.getItem('token')
        .split(' ')[1];

      axios.defaults.headers.common['Authorization'] = token;
    }
    if(Router.pathname === '/'){
      this.setState({
        hiddingPanel: false,
        isIndex: true
      })
    }
    if(Router.pathname === '/search'){
      this.setState({
        isSearch: true
      })
    }
    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 820;
      if (isTop !== this.state.isTop) {
        this.onScroll(isTop);
      }
    })
  }

  onScroll(isTop) {
    this.setState({ isTop });
  }


  logout2() {
    localStorage.removeItem('token');
    localStorage.removeItem('path');
    // Remove auth header for future requests
    setAuthToken(false);
    Router.push('/');
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
    this.handleAvatarMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleAvatarMenuOpen = event => {
    this.setState({ avatarMoreAnchorEl: event.currentTarget });
  };

  handleAvatarMenuClose = event => {
    this.setState({ avatarMoreAnchorEl: null });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };


  render() {
    const { anchorEl, mobileMoreAnchorEl, avatarMoreAnchorEl, hiddingPanel, logged, picture, user } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isAvatarMenuOpen = Boolean(avatarMoreAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const mobileavatar = picture ? <React.Fragment><IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit"><Avatar alt="Basic Avatar" src={`../../${user.picture}`} className={classes.bigAvatar} /></IconButton></React.Fragment> :  <React.Fragment><IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit"><Avatar alt="Basic Avatar" src="../../static/basicavatar.png" className={classes.bigAvatar} /></IconButton></React.Fragment>;

    const logoutMobile = [
      <MenuItem key={1} onClick={this.handleMenuClose}>
        <Typography>
          <Link href={'/profile/editProfile'}>
            <a className={classes.navbarLinkMobile}>
              Profil
            </a>
          </Link>
        </Typography>
      </MenuItem>,
      <MenuItem key={2} onClick={this.handleMenuClose}>
        <Typography>
          <Link href={'/account/notifications'}>
            <a className={classes.navbarLinkMobile}>
              Mon compte
            </a>
          </Link>
        </Typography>
      </MenuItem>,

      <MenuItem key={3} onClick={()=>this.logout2()}>
        <Typography>

          <a style={{color: "red",}} className={classes.navbarLinkMobile}>
            Déconnexion
          </a>

        </Typography>
      </MenuItem>];

    const logoutAvatar =
      [
        <MenuItem key={1} onClick={this.handleMenuClose}>
          <Typography>
            <Link href={'/profile/editProfile'}>
              <a className={classes.navbarLinkMobile}>
                Profil
              </a>
            </Link>
          </Typography>
        </MenuItem>,
        <MenuItem key={2} onClick={this.handleMenuClose}>
          <Typography>
            <Link href={'/account/notifications'}>
              <a className={classes.navbarLinkMobile}>
                Mon compte
              </a>
            </Link>
          </Typography>
        </MenuItem>,
        <MenuItem key={3} onClick={()=>this.logout2()}>
          <Typography>

            <a style={{color: "red",}} className={classes.navbarLinkMobile}>
              Déconnexion
            </a>

          </Typography>
        </MenuItem>
      ];

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

    const doublemenuitem1 = [
      <MenuItem key={1} onClick={this.handleAvatarMenuOpen}>
        <Typography>
          <Link href={'/login'}>
            <a>
              Connexion
            </a>
          </Link>
        </Typography>
      </MenuItem>,
      <MenuItem key={2} onClick={this.handleAvatarMenuOpen}>
        <Typography>
          <Link href={'/signup'}>
            <a>
              Inscription
            </a>
          </Link>
        </Typography>
      </MenuItem>
    ]

    const renderAvatarMenu = (
      <Menu
        anchorEl={avatarMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isAvatarMenuOpen}
        onClose={this.handleMenuClose}
      >
        {logged ? logoutAvatar :
          doublemenuitem1}
      </Menu>
    );

    const doublemenuitem = [
      <MenuItem key={1} onClick={this.handleMobileMenuOpen}>
        <Typography>
          <Link href={'/login'}>
            <a className={classes.navbarLinkMobile}>
              Connexion
            </a>
          </Link>
        </Typography>
      </MenuItem>,
      <MenuItem key={2} onClick={this.handleMobileMenuOpen}>
        <Typography>
          <Link href={'/signup'}>
            <a className={classes.navbarLinkMobile}>
              Inscription
            </a>
          </Link>
        </Typography>
      </MenuItem>
    ];

    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isMobileMenuOpen}
        onClose={this.handleMenuClose}
      >
        <MenuItem onClick={this.handleMobileMenuOpen}>
          {logged ?
            <Typography>
              <Link href={`/shop?id_alfred=${user._id}`}>
                <a
                  className={classes.navbarLinkMobile}>
                  Ma boutique
                </a>
              </Link>
            </Typography>
            :
            <Typography>
              <Link href={'/creaShop/creaShop'}>
                <a
                  className={classes.navbarLinkMobile}>
                  Créer ma boutique
                </a>
              </Link>
            </Typography>
          }
        </MenuItem>
        {logged ?
          <MenuItem onClick={this.handleMobileMenuOpen}>
            <Typography>
              <Link href={'/reservations/allReservations'}>
                <a className={classes.navbarLinkMobile}>
                  Mes réservations
                </a>
              </Link>
            </Typography>
          </MenuItem>: null}
        {logged ?
          <MenuItem onClick={this.handleMobileMenuOpen}>
            <Typography>
              <Link href={'/reservations/messages'}>
                <a className={classes.navbarLinkMobile}>
                  Messages
                </a>
              </Link>
            </Typography>
          </MenuItem> : null }
        <MenuItem onClick={this.handleMobileMenuOpen}>
          <Typography>
            <Link href={'/faq'}>
              <a className={classes.navbarLinkMobile}>
                Aide
              </a>
            </Link>
          </Typography>
        </MenuItem>
        {logged ? logoutMobile :
          doublemenuitem}
      </Menu>
    );


    return (
      <Grid className={classes.root}>
        <AppBar color="inherit" className={this.state.isTop && this.state.isIndex ? classes.appBarTransparent : classes.appBar} position="fixed">
          <Toolbar>
            <Grid className={classes.mainWrapper}>
              <Grid className={classes.leftContainer}>
                <Grid>
                  <Link href={'/'}>
                    <img src={this.state.isTop && this.state.isIndex ? '../../../static/assets/img/logo.png' : '../../../static/blueLogo.png'} className={classes.logoNavbar} alt={'Logo Bleu'}/>
                  </Link>
                </Grid>
                <Hidden smUp>
                  <Grid className={classes.sectionMobile}>
                    <Grid style={{border: '1px solid #e8ebeb', borderRadius : 5}}>
                      <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                        <MoreIcon className={this.state.isTop && this.state.isIndex ? classes.iconWhite : classes.iconBlack} />
                        <Grid>
                          <p className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.textBlack}>Menu</p>
                        </Grid>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Hidden>
              </Grid>
                {hiddingPanel ?
                  <Grid className={this.state.isSearch ? classes.search : classes.searchHidden}>
                    <SearchInput />
                  </Grid>: null
                }
              <Hidden xsDown>
                <Grid className={classes.sectionMobile}>
                  {logged ?
                    <Grid style={{border: '1px solid #e8ebeb', borderRadius : 5}}>
                      <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                        <MoreIcon/>
                        <Grid>
                          <p className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.textBlack}>Menu</p>
                        </Grid>
                      </IconButton>
                    </Grid>
                    :
                    null
                  }
                </Grid>
              </Hidden>
              <Grid className={classes.rightContentNavBar}>
                <Grid className={classes.sectionDesktop}>
                  {user && user.is_alfred ?
                    <Typography className={classes.navbarItem}>
                      <Link href={`/shop?id_alfred=${user._id}`} >
                        <a className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink}>
                          Ma boutique
                        </a>
                      </Link>
                    </Typography>
                    :
                    <Typography className={classes.navbarItem}>
                      <Link href={'/creaShop/creaShop'}>
                        <a className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink}>
                          Créer ma boutique
                        </a>
                      </Link>
                    </Typography>}
                  {logged ?
                    <React.Fragment>
                      <Typography className={classes.navbarItem}>
                        <Link href={'/reservations/allReservations'}>
                          <a className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink}>
                            Mes réservations
                          </a>
                        </Link>
                      </Typography>
                    </React.Fragment>
                    : null
                  }
                  {logged ?
                    <React.Fragment>
                      <Typography className={classes.navbarItem}>
                        <Link href={'/reservations/messages'}>
                          <a className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink}>
                            Mes messages
                          </a>
                        </Link>
                      </Typography>
                    </React.Fragment>
                    : null
                  }
                  <Typography className={classes.navbarItem}>
                    <Link href={'/faq'}>
                      <a className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink}>
                        Aide
                      </a>
                    </Link>
                  </Typography>
                  {logged ? null :
                    <React.Fragment>
                      <Link href={'/login'}>
                        <Button variant="outlined" color={'primary'} className={classes.buttonLogin}>
                          Connexion
                        </Button>
                      </Link>
                      <Link href={'/signup'}>
                        <Button
                          style={{ color: 'white'}}
                          variant="contained"
                          color={'primary'}
                        >
                          Inscription
                        </Button>
                      </Link>
                    </React.Fragment>}
                  {logged ?
                    <React.Fragment>
                      <React.Fragment>
                        <IconButton aria-haspopup="true" onClick={this.handleAvatarMenuOpen} color="inherit">
                          <UserAvatar user={user} className={classes.bigAvatar} />
                        </IconButton>
                      </React.Fragment>
                    </React.Fragment>
                    : null
                  }
                </Grid>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {logged ? renderAvatarMenu : null}
      </Grid>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);
