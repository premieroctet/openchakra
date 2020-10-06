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
import styles from './NavBarStyle';
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

const jwt = require('jsonwebtoken');

var parse = require('url-parse');


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const {children, classes, onClose, ...other} = props;
  return (
    <MuiDialogTitle disableTypography {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <Link href={'/'}>
          <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
            <CloseIcon color={'secondary'}/>
          </IconButton>
        </Link>
      ) : null}
    </MuiDialogTitle>
  );
});

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
    const {classes} = this.props;

    const modalLogin = () => {
      return (
        <LogIn callRegister={this.handleOpenRegister} login={this.needRefresh}/>
      );
    };

    const modalRegister = () => {
      return (
        <Register callLogin={this.handleOpenLogin} sendParentData={this.getData}/>
      );
    };


    var loggedMenu = [
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
      <MenuItem key={4} onClick={() => this.logout2()}>
        <Typography>
          <a style={{color: 'red'}} className={classes.navbarLinkMobile}>
            Déconnexion
          </a>
        </Typography>
      </MenuItem>];

    if (this.is_admin()) {
      const DASHBOARD_MENU = <Link href={'/dashboard/home'}>
        <MenuItem key={3}>
          <Typography>
            <a className={classes.navbarLinkMobile}>
              Dashboard
            </a>
          </Typography>
        </MenuItem>
      </Link>;

      loggedMenu.splice(2, 0, DASHBOARD_MENU);
    }

    const doublemenuitem = [
      <MenuItem key={1} onClick={this.handleOpenLogin}>
        <Typography>
          <a className={classes.navbarLinkMobile}>
            Connexion
          </a>
        </Typography>
        <Dialog
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          className={classes.modal}
          open={this.state.setOpenMobileLogin}
          onClose={this.handleCloseLogin}
          TransitionComponent={Transition}
          name={'mobile'}
          fullWidth={true}
          fullScreen={true}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleCloseLogin}/>
          <DialogContent>
            <div className={classes.paper}>
              {modalLogin()}
            </div>
          </DialogContent>
        </Dialog>
      </MenuItem>
      ,
      <MenuItem key={2} onClick={this.handleOpenRegister}>
        <Typography>
          <a className={classes.navbarLinkMobile}>
            Inscription
          </a>
        </Typography>
        <Dialog
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          className={classes.modal}
          name={'mobile'}
          open={this.state.setOpenMobileRegister}
          onClose={this.handleCloseRegister}
          TransitionComponent={Transition}
          disableBackdropClick={true}
          disableEscapeKeyDown={true}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleCloseRegister}/>
          <DialogContent dividers={false} className={classes.dialogContentContainer}
                         classes={{root: classes.muidialogContent}}>
            <div className={classes.paper}>
              {modalRegister()}
            </div>
          </DialogContent>
        </Dialog>
      </MenuItem>,
    ];

    const renderAvatarMenu = (
      <Menu
        anchorEl={avatarMoreAnchorEl}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
        open={Boolean(avatarMoreAnchorEl)}
        onClose={this.handleMenuClose}
      >
        {logged ? loggedMenu :
          doublemenuitem}
      </Menu>
    );


    const renderMobileMenu = (
      <Menu
        id="simple-menu"
        anchorEl={mobileMoreAnchorEl}
        open={Boolean(mobileMoreAnchorEl)}
        onClose={this.handleMenuClose}
        anchorOrigin={{vertical: 'top', horizontal: 'right'}}
        transformOrigin={{vertical: 'top', horizontal: 'right'}}
      >
        {
          user && user.is_alfred ?
            <Link href={`/shop?id_alfred=${user._id}`}>
              <MenuItem>
                <Typography>
                  <a className={classes.navbarLinkMobile}>
                    Ma boutique
                  </a>
                </Typography>
              </MenuItem>
            </Link>
            : logged ?
            <Link href={'/creaShop/creaShop'}>
              <MenuItem>
                <Typography>
                  <a className={classes.navbarLinkMobile}>
                    Proposer mes services
                  </a>
                </Typography>
              </MenuItem>
            </Link> : null

        }
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
          : null}
        <Link href={'/faq'}>
          <MenuItem>
            <Typography>
              <a className={classes.navbarLinkMobile}>Aide</a>
            </Typography>
          </MenuItem>
        </Link>
        {logged ? loggedMenu :
          doublemenuitem}
      </Menu>
    );

    return (
      <Grid className={classes.root}>
        <AppBar color="inherit"
                className={this.state.isTop && this.state.isIndex ? classes.appBarTransparent : classes.appBar}
                position="fixed">
          <Toolbar>
            <Grid className={classes.mainWrapper}>
              <Grid className={classes.leftContainer}>
                <Grid>
                  <Link href={'/'}>
                    <img
                      src={this.state.isTop && this.state.isIndex ? '../../../static/assets/img/logo.png' : '../../../static/blueLogo.png'}
                      className={classes.logoNavbar} alt={'Logo Bleu'}/>
                  </Link>
                </Grid>
                <Hidden smUp>
                  <Grid className={classes.sectionMobile}>
                    <Grid style={{border: '1px solid #e8ebeb', borderRadius: 5}}>
                      <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit"
                                  aria-controls="simple-menu">
                        <MoreIcon
                          className={this.state.isTop && this.state.isIndex ? classes.iconWhite : classes.iconBlack}/>
                        <Grid>
                          <p
                            className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.textBlack}>Menu</p>
                        </Grid>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Hidden>
              </Grid>
              {hiddingPanel ?
                <Grid className={this.state.isSearch ? classes.search : classes.searchHidden}>
                  <SearchInput searchCallback={this.props.searchCallback}/>
                </Grid> : null
              }
              <Hidden xsDown>
                <Grid className={classes.sectionMobile}>
                  {logged ?
                    <Grid style={{border: '1px solid #e8ebeb', borderRadius: 5}}>
                      <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit">
                        <MoreIcon/>
                        <Grid>
                          <p
                            className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.textBlack}>Menu</p>
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
                      <Link href={`/shop?id_alfred=${user._id}`}>
                        <a className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink}>
                          Ma boutique
                        </a>
                      </Link>
                    </Typography>
                    :
                    <Typography className={classes.navbarItem}>
                      <Link href={'/creaShop/creaShop'}>
                        <a className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink}>
                          {user && user.is_alfred == false ? `Proposer mes services` : ''}
                        </a>
                      </Link>
                    </Typography>}
                  {logged ?
                    <React.Fragment>
                      <Typography className={classes.navbarItem}>
                        <Link href={'/reservations/allReservations'}>
                          <a
                            className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink}>
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
                          <a
                            className={this.state.isTop && this.state.isIndex ? classes.textWhite : classes.navbarLink}>
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
                    <Grid container>
                      <Grid style={{marginRight: 20}}>
                        <Button color="primary" onClick={this.handleOpenLogin}>
                          Connexion
                        </Button>
                        <Dialog
                          scroll={'paper'}
                          aria-labelledby="scroll-dialog-title"
                          aria-describedby="scroll-dialog-description"
                          className={classes.modal}
                          open={this.state.setOpenLogin}
                          onClose={this.handleCloseLogin}
                          TransitionComponent={Transition}
                          classes={{paperWidthSm: classes.widthSm}}
                          disableBackdropClick={true}
                          disableEscapeKeyDown={true}
                        >
                          <DialogTitle id="customized-dialog-title" onClose={this.handleCloseLogin}/>
                          <DialogContent classes={{root: classes.widthLoginContent}}>
                            <div className={classes.paper}>
                              {modalLogin()}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </Grid>
                      <Grid>
                        <Button color="primary" variant={'contained'} onClick={this.handleOpenRegister}
                                style={{color: 'white'}}>
                          Inscription
                        </Button>
                        <Dialog
                          scroll={'paper'}
                          aria-labelledby="scroll-dialog-title"
                          aria-describedby="scroll-dialog-description"
                          className={classes.modal}
                          open={this.state.setOpenRegister}
                          onClose={this.handleCloseRegister}
                          TransitionComponent={Transition}
                          disableBackdropClick={true}
                          disableEscapeKeyDown={true}
                        >
                          <DialogTitle id="customized-dialog-title" onClose={this.handleCloseRegister}/>
                          <DialogContent dividers={false} className={classes.muidialogContent}>
                            <div className={classes.paper}>
                              {modalRegister()}
                            </div>
                          </DialogContent>
                        </Dialog>
                      </Grid>
                    </Grid>}
                  {logged ?
                    <React.Fragment>
                      <React.Fragment>
                        <IconButton aria-haspopup="true" onClick={this.handleAvatarMenuOpen} color="inherit">
                          <UserAvatar user={user} className={classes.bigAvatar} warnings={true}/>
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
};

export default withStyles(styles)(NavBar);
