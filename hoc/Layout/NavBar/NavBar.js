import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import axios from "axios";
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { fade } from '@material-ui/core/styles/colorManipulator';
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

const { config } = require('../../../config/config');
const url = config.apiUrl;
const jwt = require('jsonwebtoken');


class NavBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    avatarMoreAnchorEl: null,
    logged: false,
    user: null,
    research: ''
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.setState({logged:true});
      const token2 = localStorage.getItem('token').split(' ')[1];

      axios.defaults.headers.common['Authorization'] = token;
      axios
          .get(url+'myAlfred/api/users/current')
          .then(res => {
            let user = res.data;
            this.setState({user:user});
          })
          .catch(err => console.log(err))
    }
    this.getDataForSearch = this.getDataForSearch.bind(this)

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

  getDataForSearch = data =>{
    this.setState({research: data}, () => this.props.search(this.state.research))
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl, avatarMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isAvatarMenuOpen = Boolean(avatarMoreAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const logged = this.state.logged;
    const user = this.state.user;
    const maboutique = <MenuItem onClick={this.handleMenuClose}><Typography><Link href={'/myShop/services'}><a className={classes.navbarLinkMobile}>Ma boutique</a></Link></Typography></MenuItem>;
    const becomealfred = <MenuItem onClick={this.handleMobileMenuClose}><Typography><Link href={'/creaShop/creaShop'}><a className={classes.navbarLinkMobile}>Devenir Alfred</a></Link></Typography></MenuItem>;
    const mobileavatar =
      <React.Fragment>
        <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit" className={classes.theavatarbutton}>
          <UserAvatar user={user} className={classes.bigAvatar} />
        </IconButton>
      </React.Fragment>

    const logoutMobile =
      <React.Fragment>
        <Link href={'/profile/editProfile'}>
          <MenuItem onClick={this.handleMenuClose}>
            <Typography>

                <a className={classes.navbarLinkMobile}>
                  Profil
                </a>
            </Typography>
          </MenuItem>
        </Link>
        <Link href={'/account/notifications'}>
        <MenuItem onClick={this.handleMenuClose}>
          <Typography>
              <a className={classes.navbarLinkMobile}>
                Mon compte
              </a>
          </Typography>
        </MenuItem>
        </Link>
        <MenuItem onClick={()=>this.logout2()}>
          <Typography>
              <a style={{color: "red",}} className={classes.navbarLinkMobile}>
                  Déconnexion
              </a>
          </Typography>
        </MenuItem>
    </React.Fragment>;

    const logoutAvatar =
    [
    <Link href={'/profile/editProfile'}>
      <MenuItem key={1} onClick={this.handleMenuClose}>
        <Typography>
          <a className={classes.navbarLinkMobile}>
            Profil
          </a>
        </Typography>
      </MenuItem>
    </Link>,
    <Link href={'/account/notifications'}>
      <MenuItem key={2} onClick={this.handleMenuClose}>
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

    const renderAvatarMenu = (
      <Menu
        className={classes.lemenuavatar}
        anchorEl={avatarMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isAvatarMenuOpen}
        onClose={this.handleMenuClose}
      >
        {logged ? logoutAvatar :
          <React.Fragment>
            <Link href={'/login'}>
            <MenuItem onClick={this.handleAvatarMenuOpen}>
              <Typography>
                <a className={classes.navbarLinkAvatar}>
                  Connexion
                </a>
              </Typography>
            </MenuItem>
            </Link>
            <Link href={'/signup'}>
              <MenuItem onClick={this.handleAvatarMenuOpen}>
                <Typography>
                  <a className={classes.navbarLinkAvatar}>
                    Inscription
                  </a>
                </Typography>
              </MenuItem>
            </Link>
          </React.Fragment>
        }
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
        { user && user.is_alfred ? maboutique : becomealfred }
        {logged ?<React.Fragment>
          <Link href={'/myShop/messages'}>
          <MenuItem onClick={this.handleMobileMenuOpen}>
            <Typography>
              <a className={classes.navbarLinkMobile}>
                Messages
              </a>
            </Typography>
          </MenuItem>
          </Link>
        </React.Fragment> : null }
        <Link href={'/faq'}>
          <MenuItem onClick={this.handleMobileMenuOpen}>
            <Typography>
              <a className={classes.navbarLinkMobile}>
                Aide
              </a>
            </Typography>
          </MenuItem>
        </Link>
        {logged ? logoutMobile : <React.Fragment>
          <Link href={'/login'}>
            <MenuItem onClick={this.handleMobileMenuOpen}>
              <Typography>
                <a className={classes.navbarLinkMobile}>
                  Connexion
                </a>
              </Typography>
            </MenuItem>
          </Link>
          <Link href={'/signup'}>
            <MenuItem onClick={this.handleMobileMenuOpen}>
              <Typography>
                <a className={classes.navbarLinkMobile}>
                  Inscription
                </a>
              </Typography>
          </MenuItem>
          </Link>
        </React.Fragment>}
      </Menu>
    );

    return (
      <Grid className={classes.root}>
        <AppBar color="inherit" position="fixed" style={{boxShadow: 'inherit'}}>
          <Toolbar>
            <Grid style={{display: 'flex', width : '100%'}}>
              <Grid>
                <Link href={'/'}>
                  <img src={'../../../static/logo_final_My-Alfred.svg'} style={{width: 110, cursor: "pointer"}} alt={'Logo Bleu'}/>
                </Link>
              </Grid>
              <Grid style={{display: 'flex', width: '100%', justifyContent : 'end', alignItems : 'center'}}>
                <Grid className={classes.search}>
                  <SearchInput search={this.getDataForSearch}/>
                </Grid>
                <Grid className={classes.sectionDesktop}>
                  {user && user.is_alfred ?
                    <Typography className={classes.navbarItem}>
                      <Link href={`/shop?id_alfred=${user._id}`} >
                        <a className={classes.navbarLink}>
                          Ma boutique
                        </a>
                      </Link>
                    </Typography>
                    :
                    <Typography className={classes.navbarItem}>
                      <Link href={'/creaShop/creaShop'}>
                        <a className={classes.navbarLink}>
                          Créer ma boutique
                        </a>
                      </Link>
                    </Typography>}

                  {logged ?<React.Fragment><Typography className={classes.navbarItem}>
                    <Link href={'/myShop/messages'}>
                      <a className={classes.navbarLink}>
                        Messages
                      </a>
                    </Link>
                  </Typography></React.Fragment> : null }
                  <Typography className={classes.navbarItem}>
                    <Link href={'/faq'}>
                      <a className={classes.navbarLink}>
                        Aide
                      </a>
                    </Link>
                  </Typography>
                  {logged ? null :
                    <React.Fragment>
                      <Link href={'/login'}>
                        <Button variant="outlined" color={'primary'} style={{ marginRight: '20px', border: '1px solid rgba(255, 255, 255, 1)' }}>
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
                        <IconButton aria-haspopup="true" onClick={this.handleAvatarMenuOpen} color="inherit" className={classes.theavatarbutton}>
                          <UserAvatar user={user} className={classes.bigAvatar} />
                        </IconButton>
                      </React.Fragment>

                    </React.Fragment> : null  }
                </Grid>
                <Grid className={classes.sectionMobile}>
                  {logged ? mobileavatar :
                    <React.Fragment>
                      <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit" className={classes.theiconbutton}>
                        <MoreIcon className={classes.bigIcon} />
                      </IconButton>
                    </React.Fragment>}
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
