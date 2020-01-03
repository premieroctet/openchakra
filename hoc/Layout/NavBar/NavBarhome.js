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
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import setAuthToken from "../../../utils/setAuthToken";
import Router from "next/router";

const { config } = require('../../../config/config');
const url = config.apiUrl;

const jwt = require('jsonwebtoken');

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: 'red',
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
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    display: 'none',
  },
  searchIcon: {
    width: theme.spacing(9),
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
    paddingTop: theme.spacing(1),
    paddingRight: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    paddingLeft:theme.spacing(10),
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
    color:"white",
    marginRight: '20px',
    fontSize: '15px'
  },
  navbarLink: {
    textDecoration: 'none',
    color:"white",
  },
  navbarLinkMobile: {
    color: 'black',
    textDecoration: 'none',
  },
  navbarLinkAvatar: {
    color: 'black',
    textDecoration: 'none',
    marginTop: '8%!important',
  },
  bigAvatar: {
    width: 40,
    height: 40,
    marginTop: -10,
  },
  theavatarbutton: {
    width: 45,
    height: 45,
  },
  lemenuavatar: {
    marginTop: '2.5%!important',
    marginLeft: '1%!important',
  },
});

class NavBar extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null,
    avatarMoreAnchorEl: null,
    logged: false,
    alfred: false,
    isTop: true,
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token !== null) {
      this.setState({logged:true});
      const token2 = localStorage.getItem('token').split(' ')[1];
      const decode = jwt.decode(token2);
      this.setState({alfred: decode.is_alfred});

      axios.defaults.headers.common['Authorization'] = token;
      axios
          .get(url+'myAlfred/api/users/current')
          .then(res => {
            let user = res.data;
            this.setState({user:user, alfred:user.is_alfred});

            if(typeof user.picture !="undefined") {
              this.setState({picture: true})
            } else {
              this.setState({picture: false})
            }
          })
          .catch(err => console.log(err))
    }

    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 820;
      if (isTop !== this.state.isTop) {
          this.onScroll(isTop);
      }
  });


  }

  logout2() {
    localStorage.removeItem('token');
    localStorage.removeItem('path');
    // Remove auth header for future requests
    setAuthToken(false);
    window.location.reload();
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
    this.handleAvatarMenuClose();
  };

  onScroll(isTop) {
    this.setState({ isTop });
}

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
    const { anchorEl, mobileMoreAnchorEl, avatarMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isAvatarMenuOpen = Boolean(avatarMoreAnchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const test = this.state.logged;
    const user = this.state.user;
    const maboutique = <MenuItem onClick={this.handleMenuClose}><Typography><Link href={'/myShop/services'}><a className={classes.navbarLinkMobile}>Ma boutique</a></Link></Typography></MenuItem>;
    const becomealfred = <MenuItem onClick={this.handleMobileMenuClose}><Typography><Link href={'/becomeAlfredForm'}><a className={classes.navbarLinkMobile}>Devenir Alfred</a></Link></Typography></MenuItem>;
    const picture = this.state.picture;
    const mobileavatar = picture ? <React.Fragment><IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit" className={classes.theavatarbutton}><Avatar alt="Basic Avatar" src={`../../${user.picture}`} className={classes.bigAvatar} /></IconButton></React.Fragment> :  <React.Fragment><IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit" className={classes.theavatarbutton}><Avatar alt="Basic Avatar" src="../../static/basicavatar.png" className={classes.bigAvatar} /></IconButton></React.Fragment>;
    const alfred = this.state.alfred;
    const logout = <Button variant="outlined" color='primary' style={{ marginRight: '20px' }}
                           onClick={()=>this.logout2()}>Déconnexion</Button>;

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
    <MenuItem key={1} onClick={this.handleMenuClose}>
      <Typography>
        <Link href={'/account/notifications'}>
          <a className={classes.navbarLinkMobile}>
            Mon compte
          </a>
        </Link>
      </Typography>
    </MenuItem>,
    <MenuItem key={1} onClick={()=>this.logout2()}>
      <Typography>

          <a style={{color: "red",}} className={classes.navbarLinkMobile}>
              Déconnexion
          </a>

      </Typography>
    </MenuItem>
  ];

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
    </MenuItem>]
  ;

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
const menuitemdouble1= [<MenuItem key={1} onClick={this.handleAvatarMenuOpen}>
  <Typography>
    <Link href={'/login'}>
      <a className={classes.navbarLinkAvatar}>
        Connexion
      </a>
    </Link>
  </Typography>
</MenuItem>,
<MenuItem key={2} onClick={this.handleAvatarMenuOpen}>
  <Typography>
    <Link href={'/signup'}>
      <a className={classes.navbarLinkAvatar}>
        Inscription
      </a>
    </Link>
  </Typography>
</MenuItem>];

    const renderAvatarMenu = (
      <Menu
        className={classes.lemenuavatar}
        anchorEl={avatarMoreAnchorEl}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={isAvatarMenuOpen}
        onClose={this.handleMenuClose}
      >
        {test ? logoutAvatar : 
        menuitemdouble1
        }
      </Menu>
    );

    menuitemdouble2=[
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
        <Typography>
          <Link href={'/search'}>
            <a className={classes.navbarLinkMobile}>
              <img src={'../../static/search-solid.svg'} style={{height: '15px', margintop: '5px'}} alt="search"/>
            </a>
          </Link>
        </Typography>
      </MenuItem>
      {test ?
      <MenuItem onClick={this.handleMobileMenuOpen}>
        <Typography>
          <Link href={'/reservations/allReservations'}>
            <a className={classes.navbarLinkMobile}>
              Mes réservations
            </a>
          </Link>
        </Typography>
      </MenuItem>: null}
        { alfred ? maboutique :
        becomealfred
        }
        {test ?
        <MenuItem onClick={this.handleMobileMenuOpen}>
          <Typography>
              <Link href={'/myShop/messages'}>
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
        {test ? logoutMobile : menuitemdouble2}
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar  style={{height: '8vh', backgroundColor: this.state.isTop ? 'rgba(0,0,0,.5)' : 'rgb(255, 255, 255)', boxShadow:'inherit'}} position="fixed">
          <Toolbar>
            <Link href={'/'}>
              <img src={this.state.isTop ? '../../../static/assets/img/logo.png' : '../../../static/blueLogo.png'} style={{width: 110, cursor: "pointer"}} alt={'Logo Blanc'}/>
            </Link>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                {/*<SearchIcon />*/}
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
                <Link href={'/search'}>
                  <a className={classes.navbarLink}>
                    <img src={'../../static/search-solid1.svg'} style={{height: '15px', margintop: '5px'}} alt="search"/>
                  </a>
                </Link>
              </Typography>
              {test?
              <Typography className={classes.navbarItem}>
                <Link href={'/reservations/allReservations'}>
                  <a className={classes.navbarLink}>
                    Mes réservations
                  </a>
                </Link>
              </Typography>
              :null}
              {alfred ?
              <Typography className={classes.navbarItem}>
                <Link href={'/myShop/services'}>
                  <a className={classes.navbarLink} style={{color:this.state.isTop ? '' : '#505050' }}>
                    Ma boutique
                  </a>
                </Link>
              </Typography> :
              <Typography className={classes.navbarItem}>
                <Link href={'/becomeAlfredForm'}>
                  <a className={classes.navbarLink} style={{color:this.state.isTop ? '' : '#505050' }}>
                    Créer ma boutique
                  </a>
                </Link>
              </Typography>}

              {test ?<React.Fragment><Typography className={classes.navbarItem}>
                <Link href={'/reservations/messages'}>
                  <a className={classes.navbarLink}>
                    Messages
                  </a>
                </Link>
              </Typography></React.Fragment> : null }
              <Typography className={classes.navbarItem}>
                <Link href={'/faq'}>
                  <a className={classes.navbarLink} style={{color:this.state.isTop ? '' : '#505050' }}>
                    Aide
                  </a>
                </Link>
              </Typography>
              {test ? null : <React.Fragment><Link href={'/login'}>
                  <Button variant="outlined" color={'primary'} style={{marginRight: '20px', border:this.state.isTop ? '1px solid rgba(255, 255, 255, 1)' : '1px solid #4fbdd7'}}>
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
                {test ?<React.Fragment>

                  {picture ? <React.Fragment><IconButton aria-haspopup="true" onClick={this.handleAvatarMenuOpen} color="inherit" className={classes.theavatarbutton}><Avatar alt="Basic Avatar" src={`../../${user.picture}`} className={classes.bigAvatar} /></IconButton></React.Fragment> :  <React.Fragment><IconButton aria-haspopup="true" onClick={this.handleAvatarMenuOpen} color="inherit" className={classes.theavatarbutton}><Avatar alt="Basic Avatar" src="../../static/basicavatar.png" className={classes.bigAvatar} /></IconButton></React.Fragment>}

                </React.Fragment> : null  }
            </div>
            <div className={classes.sectionMobile}>

                {test ? mobileavatar : <React.Fragment><IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit" className={classes.theiconbutton}><MoreIcon className={classes.bigIcon} /></IconButton></React.Fragment>}

            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {test ? renderAvatarMenu : null}
      </div>
    );
  }
}

export default withStyles(styles)(NavBar);
