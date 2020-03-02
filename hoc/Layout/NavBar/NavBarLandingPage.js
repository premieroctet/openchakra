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
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import Link from 'next/link';
import setAuthToken from "../../../utils/setAuthToken";
import React from 'react';
const { config } = require('../../../config/config');
const url = config.apiUrl;
const jwt = require('jsonwebtoken');
import UserAvatar from '../../../components/Avatar/UserAvatar';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: 'red',
  },
  grow: {
    flexGrow: 1,
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
    paddingTop: theme.spacing,
    paddingRight: theme.spacing,
    paddingBottom: theme.spacing,
    paddingLeft: theme.spacing(10),
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
    userId: ''
  };

  componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({logged:true});
      const token2 = localStorage.getItem('token').split(' ')[1];
      const decode = jwt.decode(token2);
      this.setState({alfred: decode.is_alfred});
    }

    document.addEventListener('scroll', () => {
      const isTop = window.scrollY < 720 || window.scrollY > 2300;
      if (isTop !== this.state.isTop) {
          this.onScroll(isTop);
      }
  });

    axios.defaults.headers.common['Authorization'] = token;
    axios
        .get(url+'myAlfred/api/users/current')
        .then(res => {
            let user = res.data;
            this.setState({user:user, alfred:user.is_alfred, userId: user._id});

            if(typeof user.picture !="undefined") {
                this.setState({picture: true})
            } else {
                this.setState({picture: false})
            }
        })
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
    const logged = this.state.logged;
    const user = this.state.user;
    const maboutique = <MenuItem onClick={this.handleMenuClose}><Typography><Link href={'/myShop/services'}><a className={classes.navbarLinkMobile}>Ma boutique</a></Link></Typography></MenuItem>;
    const becomealfred = <MenuItem onClick={this.handleMobileMenuClose}><Typography><Link href={'/creaShop/creaShop'}><a className={classes.navbarLinkMobile}>Créer ma boutique</a></Link></Typography></MenuItem>;
    const picture = this.state.picture;
    const mobileavatar =
	<React.Fragment>
	  <IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit" className={classes.theavatarbutton}>
	    <UserAvatar user={user} className={classes.bigAvatar} />
	  </IconButton>
	</React.Fragment>;
    const alfred = this.state.alfred;
    const logoutMobile = <React.Fragment>
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
        {logged ? logoutAvatar : <React.Fragment>
        <MenuItem onClick={this.handleAvatarMenuOpen}>
          <Typography>
            <Link href={'/login'}>
              <a className={classes.navbarLinkAvatar}>
                Connexion
              </a>
            </Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={this.handleAvatarMenuOpen}>
          <Typography>
            <Link href={'/signup'}>
              <a className={classes.navbarLinkAvatar}>
                Inscription
              </a>
            </Link>
          </Typography>
        </MenuItem>
        </React.Fragment>}
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
        { alfred ? maboutique :
        becomealfred
        }
        {logged ?<React.Fragment>
          <MenuItem onClick={this.handleMobileMenuOpen}>
            <Typography>
                <Link href='/myShop/messages'>
                  <a className={classes.navbarLinkMobile}>
                    Messages
                  </a>
                </Link>
            </Typography>
          </MenuItem>
        </React.Fragment> : null }
          <MenuItem onClick={this.handleMobileMenuOpen}>
          <Typography>
            <Link href='/aide'>
              <a className={classes.navbarLinkMobile}>
                Aide
              </a>
            </Link>
          </Typography>
          </MenuItem>
        {logged ? logoutMobile : <React.Fragment>
        <MenuItem onClick={this.handleMobileMenuOpen}>
          <Typography>
            <Link href={'/login'}>
              <a className={classes.navbarLinkMobile}>
                Connexion
              </a>
            </Link>
          </Typography>
        </MenuItem>
        <MenuItem onClick={this.handleMobileMenuOpen}>
          <Typography>
            <Link href={'/signup'}>
              <a className={classes.navbarLinkMobile}>
                Inscription
              </a>
            </Link>
          </Typography>
        </MenuItem></React.Fragment>}
      </Menu>
    );

    return (
      <div className={classes.root}>
        <AppBar  style={{height: '8vh', backgroundColor: this.state.isTop ? 'rgba(0,0,0,.5)' : 'rgb(47, 188, 211)'}} position="fixed">
          <Toolbar>
            <Link href={'/'}>
              <img src={'../../../static/assets/img/logo.png'} style={{width: 110, cursor: "pointer"}} alt={'Logo Blanc'}/>
            </Link>
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
              {alfred ?
              <Typography className={classes.navbarItem}>
                <Link href={`/shop?id_alfred=${this.state.userId}`} >
                  <a className={classes.navbarLink}>
                    Ma boutique
                  </a>
                </Link>
              </Typography> :
              <Typography className={classes.navbarItem}>
                <Link href={'/creaShop/creaShop'}>
                  <a className={classes.navbarLink}>
                    Créer ma boutique
                  </a>
                </Link>
              </Typography>}

              {logged ?<React.Fragment><Typography className={classes.navbarItem}>
                <Link href='/myShop/messages'>
                  <a className={classes.navbarLink}>
                    Messages
                  </a>
                </Link>
              </Typography></React.Fragment> : null }
              <Typography className={classes.navbarItem}>
                <Link href='/aide'>
                  <a className={classes.navbarLink}>
                    Aide
                  </a>
                </Link>
              </Typography>
              {logged ? null : <React.Fragment><Link href={'/login'}>
                    <Button variant="outlined" color={'primary'} style={{color:this.state.isTop ? '' : 'white' , marginRight: '20px', border: '1px solid rgba(255, 255, 255, 1)' }}>
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
			  <IconButton aria-haspopup="true" onClick={this.handleAvatarMenuOpen} color="inherit" className={classes.theavatarbutton}>
			    <UserAvatar user={user} className={classes.bigAvatar} />
			  </IconButton>
                	</React.Fragment>
			:
			null
		}
            </div>
            <div className={classes.sectionMobile}>

                {logged ? mobileavatar : <React.Fragment><IconButton aria-haspopup="true" onClick={this.handleMobileMenuOpen} color="inherit" className={classes.theiconbutton}><MoreIcon className={classes.bigIcon} /></IconButton></React.Fragment>}

            </div>
          </Toolbar>
        </AppBar>
        {renderMenu}
        {renderMobileMenu}
        {logged ? renderAvatarMenu : null}
      </div>
    );
  }
}
export default withStyles(styles)(NavBar);
