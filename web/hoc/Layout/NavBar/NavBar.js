import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import setAuthToken from '../../../utils/setAuthToken';
import Router from 'next/router';
import Grid from '@material-ui/core/Grid';
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
import AlgoliaPlaces from 'algolia-places-react';
import {SEARCHBAR} from '../../../utils/i18n';
import moment from "moment";
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";
import TextFieldCustom from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import {withStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';

const jwt = require('jsonwebtoken');

var parse = require('url-parse');

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      mobileMoreAnchorEl: null,
      avatarMoreAnchorEl: null,
      logged: false,
      isTop: true,
      setOpenLogin: false,
      setOpenMobileLogin: false,
      setOpenRegister: false,
      setOpenMobileRegister: false,
      user: {},
      google_id: props.google_id,
      facebook_id: props.facebook_id,
      activeStep: 0,
      keyword: null,
      errors: {},
      city: null,
      gps: null,
      dateSelected: null,
      indexTabBar: 0,
      ifHomePage: false
    }


  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps !== '') {
      this.state.user = this.props.user;
    }
  }

  componentDidMount() {
    const token = cookie.load('token');
    if (token) {
      this.setState({logged: true});
      axios.defaults.headers.common['Authorization'] = token;
    }
    if(Router.pathname === '/'){
      this.setState({ifHomePage: true})
    }
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
      this.setState({setOpenLogin: true, setOpenRegister: false});
  };

  handleCloseLogin = () => {
    this.setState({setOpenLogin: false});
  };

  handleOpenRegister = (e) => {
    this.handleMenuClose();
      this.setState({setOpenRegister: true, setOpenLogin: false});
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

  onChange = e => {
    let {name, value} = e.target;
    this.setState({[name]: value});
    if (name === 'selectedAddress') {
      if (value === 'addAddress') {
        Router.push('/profile/myAddresses');
      } else {
        this.setState({
          gps: value === 'all' ? null : value === 'main' ? this.state.allAddresses['main'].gps : {
            lat: this.state.allAddresses[value].lat,
            lng: this.state.allAddresses[value].lng,
          },
        });
      }
    }
  };

  handleOpenMenuItem = (event) => {
    this.setState({anchorEl: event.currentTarget})
  };

  handleClosenMenuItem = () => {
    this.setState({anchorEl: false})
  };

  handleChangeTabBar = (event, newValue) => {
    this.setState({indexTabBar: newValue})
  };



  render() {
    const {mobileMoreAnchorEl, avatarMoreAnchorEl, hiddingPanel, logged,  setOpenLogin, setOpenRegister, keyword, errors, dateSelected, anchorEl, indexTabBar, ifHomePage} = this.state;
    const {style, user, selectedAddress} = this.props;



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

    const DialogTitle = (props) => {
      const {children, classes, onClose, ...other} = props;
      return (
        <MuiDialogTitle disableTypography {...other}>
          <h6>{children}</h6>
            <IconButton aria-label="close" className={style.navbarCloseButton} onClick={onClose}>
              <CloseIcon color={'secondary'}/>
            </IconButton>
        </MuiDialogTitle>
      );
    };


    const SearchBarInput = () => {
      return(
        <Grid className={style.navbarSearchContainer}>
          <Paper component="form" classes={{root: style.navbarSearch}}>
            <Grid style={{flex: 1}}>
              <TextField
                classes={{root: style.navbarRoot}}
                placeholder={SEARCHBAR.what}
                value={keyword}
                onChange={this.onChange}
                name={'keyword'}
                label={'Le service '}
                onKeyPress={(e) => {
                  e.key === 'Enter' && e.preventDefault();
                }}
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{disableUnderline: true}}
              />
            </Grid>
            <Grid>
              <Divider className={style.divider} orientation="vertical" />
            </Grid>
            {user ?
              <Grid className={style.navbarAddressContainer}>
                <FormControl className={style.navbarFormControlAddress}>
                  <Select
                    disableUnderline
                    id="outlined-select-currency"
                    value={selectedAddress}
                    name={'selectedAddress'}
                    onChange={(e) => {
                      this.onChange(e);
                    }}
                  >
                    <MenuItem value={'main'}>
                      Adresse
                      principale, {' ' + user.billing_address.address} {user.billing_address.zip_code},{user.billing_address.city}
                    </MenuItem>
                    {user.service_address.map(e => (
                      <MenuItem value={e._id}>
                        {e.label + ', '} {' ' + e.address},{e.zip_code} {e.city}
                      </MenuItem>
                    ))}
                    <MenuItem value={'all'}>
                      Partout, Rechercher des Alfred partout
                    </MenuItem>
                    <MenuItem value={'addAddress'}>
                      <p style={{color: '#2FBCD3', cursor: 'pointer'}}>
                        Ajouter une adresse
                      </p>
                    </MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              :
              <Grid className={style.navbarAlgoliaContent}>
                <TextField
                  label={'L’adresse'}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent:() => {
                      return (
                        <AlgoliaPlaces
                          placeholder={SEARCHBAR.where}
                          className={style.navbarAlgoliaPlace}
                          options={{
                            appId: 'plKATRG826CP',
                            apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                            language: 'fr',
                            countries: ['fr'],
                            type: 'city',
                          }}
                          onChange={(suggestion) => this.onChangeCity(suggestion)}
                          onClear={() => this.setState({city: '', gps: null})}
                          onSuggestions={this.onSuggestions}
                        />)
                    },
                    disableUnderline: true
                  }}
                />
              </Grid>
            }
            {
              !logged ?
                <Grid className={style.navbarDatePickerMain}>
                  <Grid>
                    <Divider className={style.divider} orientation="vertical" />
                  </Grid>
                  <Grid className={style.navbarDatePickerContainer}>
                    <TextField
                      label={'Les dates'}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputComponent:() => {
                          return (
                            <DatePicker
                              selected={dateSelected}
                              onChange={(date) => {
                                this.setState({dateSelected: date});
                                if (date === null) {
                                  this.setState({dateSelected: ''});
                                }
                              }}
                              locale='fr'
                              showMonthDropdown
                              dateFormat="dd/MM/yyyy"
                              placeholderText={SEARCHBAR.when}
                              minDate={new Date()}
                              className={style.inputDatePicker}
                            />)
                        },
                      }}
                    />

                  </Grid>
                </Grid> : null
            }
            <Grid>
              <IconButton type="submit" classes={{root: style.iconButton}} aria-label="search" onClick={() => this.findService()}>
                <SearchIcon />
              </IconButton>
            </Grid>
          </Paper>
        </Grid>
      )
    };

    return(
      <Grid className={style.navbarMainSytle}>
        <AppBar position={'static'} className={style.navbarAppBar}>
          <Toolbar className={style.navBartoolbar}>
            <Grid className={style.navbarTopContainer}>
              <Grid className={style.navbarLogoContainer}>
                <p>Mon logo</p>
              </Grid>
              {
                ifHomePage ?
                  <Grid>
                    <Tabs value={indexTabBar} indicatorColor={''} selectionFollowsFocus={false} onChange={this.handleChangeTabBar} aria-label="simple tabs example">
                      <Tab classes={{root : style.navbarTabRoot}} label="Nos services" />
                      <Tab classes={{root : style.navbarTabRoot}} label="Notre équipe" />
                      <Tab classes={{root : style.navbarTabRoot}} label="Nous contacter"/>
                    </Tabs>
                  </Grid> : SearchBarInput()
              }
              {
                logged ?
                  <Grid>
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      onClick={this.handleOpenMenuItem}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      onClose={this.handleClosenMenuItem}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }}
                    >
                      <MenuItem>Profile</MenuItem>
                      <MenuItem>My account</MenuItem>
                      <MenuItem onClick={() => this.logout2()}>Logout</MenuItem>
                    </Menu>
                  </Grid>
                  :
                  <Grid className={style.navbarButtonContainer}>
                    <Grid>
                      <Button className={style.navBarlogIn} onClick={this.handleOpenLogin}>Connexion</Button>
                      <Dialog
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        className={style.navbarModal}
                        open={setOpenLogin}
                        onClose={this.handleCloseLogin}
                        TransitionComponent={Transition}
                        classes={{paperWidthSm: style.navbarPaperWidth}}
                        disableBackdropClick={true}
                        disableEscapeKeyDown={true}
                      >
                        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseLogin}/>
                        <DialogContent classes={{root: style.navbarWidthLoginContent}}>
                          <div className={style.navbarPaper}>
                            {modalLogin()}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </Grid>
                    <Grid className={style.navbarRegisterContainer}>
                      <Button variant="outlined" classes={{root: style.navbarSignIn}} onClick={this.handleOpenRegister}>Inscription</Button>
                      <Dialog
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        className={style.navbarModal}
                        open={setOpenRegister}
                        onClose={this.handleCloseRegister}
                        TransitionComponent={Transition}
                        disableBackdropClick={true}
                        disableEscapeKeyDown={true}
                      >
                        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseRegister}/>
                        <DialogContent dividers={false} className={style.navbarMuidialogContent}>
                          <div className={style.navbarPaper}>
                            {modalRegister()}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </Grid>
                  </Grid>
              }
            </Grid>
            {
              ifHomePage ? SearchBarInput() : null
            }

          </Toolbar>
        </AppBar>
      </Grid>
    )

  }
}

export default NavBar;
