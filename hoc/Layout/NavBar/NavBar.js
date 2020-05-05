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

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      avatarMoreAnchorEl: null,
      logged: false,
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
    const { anchorEl, mobileMoreAnchorEl, avatarMoreAnchorEl, hiddingPanel, logged, user } = this.state;
    const { classes } = this.props;

    const logoutMobile = [
      <Link href={'/profile/editProfile'}>

      <MenuItem key={1}>
        <Typography>
          <a className={classes.navbarLinkMobile}>
            Profil
          </a>
        </Typography>
      </MenuItem>
      </Link>
      ,
      <Link href={'/account/notifications'}>
      <MenuItem key={2}>
        <Typography>
          <a className={classes.navbarLinkMobile}>
            Mon compte
          </a>
        </Typography>
      </MenuItem>
      </Link>
      ,
      <MenuItem key={3} onClick={()=>this.logout2()}>
        <Typography>
          <a style={{color: "red",}} className={classes.navbarLinkMobile}>
            Déconnexion
          </a>
        </Typography>
      </MenuItem>];

    const logoutAvatar =
      [
        <Link href={'/profile/editProfile'}>
        <MenuItem key={1}>
          <Typography>
            <a className={classes.navbarLinkMobile}>
              Profil
            </a>
          </Typography>
        </MenuItem>
        </Link>
        ,
        <Link href={'/account/notifications'}>
        <MenuItem key={2}>
          <Typography>
            <a className={classes.navbarLinkMobile}>
              Mon compte
            </a>
          </Typography>
        </MenuItem>
        </Link>
        ,
        <MenuItem key={3} onClick={()=>this.logout2()}>
          <Typography>
            <a style={{color: "red",}} className={classes.navbarLinkMobile}>
              Déconnexion
            </a>
          </Typography>
        </MenuItem>
      ];

    const doublemenuitem1 = [
      <Link href={'/login'}>
        <MenuItem key={1}>
          <Typography>
            <a>Connexion</a>
          </Typography>
        </MenuItem>
      </Link>
      ,
      <Link href={'/signup'}>
        <MenuItem key={2}>
          <Typography>
            <a>Inscription</a>
          </Typography>
        </MenuItem>
      </Link>

    ]

    const renderAvatarMenu = (
      <Menu
        anchorEl={avatarMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={Boolean(avatarMoreAnchorEl)}
        onClose={this.handleMenuClose}
      >
        {logged ? logoutAvatar :
          doublemenuitem1}
      </Menu>
    );

    const doublemenuitem = [
      <Link href={'/login'}>
        <MenuItem key={1}>
          <Typography>
            <a className={classes.navbarLinkMobile}>
              Connexion
            </a>
          </Typography>
        </MenuItem>
      </Link>
      ,
      <Link href={'/signup'}>
      <MenuItem key={2}>
        <Typography>
          <a className={classes.navbarLinkMobile}>
            Inscription
          </a>
        </Typography>
      </MenuItem>
      </Link>
    ];

    const renderMobileMenu = (
      <Menu
        id="simple-menu"
        anchorEl={mobileMoreAnchorEl}
        open={Boolean(mobileMoreAnchorEl)}
        onClose={this.handleMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Link href={user && user.is_alfred ? `/shop?id_alfred=${user._id}` : '/creaShop/creaShop'}>
          <MenuItem>
            <Typography>
              <a className={classes.navbarLinkMobile}>{user && user.is_alfred ? "Ma boutique" : "Proposer mes services"}</a>
            </Typography>
          </MenuItem>
        </Link>
        {logged ?
          <Link href={'/reservations/allReservations'}>
            <MenuItem onClick={this.handleMobileMenuOpen}>
              <Typography>
                <a className={classes.navbarLinkMobile}>Mes réservations</a>
              </Typography>
            </MenuItem>
          </Link>
          : null}
        {logged ?
          <Link href={'/reservations/messages'}>
            <MenuItem>
              <Typography>
                <a className={classes.navbarLinkMobile}>Messages</a>
              </Typography>
            </MenuItem>
          </Link>
          : null }
        <Link href={'/faq'}>
        <MenuItem>
          <Typography>
            <a className={classes.navbarLinkMobile}>Aide</a>
          </Typography>
        </MenuItem>
        </Link>
        {logged ? logoutMobile :
          doublemenuitem}
      </Menu>
    );

    return (
      <Grid className={classes.root}>
        <AppBar color="inherit" className={this.state.isTop && this.state.isIndex ? classes.appBarTransparent : classes.appBar} position="fixed" >
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
                      <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit" aria-controls="simple-menu">
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
                          Proposer mes services
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
