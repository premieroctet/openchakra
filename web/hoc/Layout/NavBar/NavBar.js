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
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AlgoliaPlaces from 'algolia-places-react';
import {SEARCHBAR, NAVBAR_MENU} from '../../../utils/i18n';
import DatePicker from "react-datepicker";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

const jwt = require('jsonwebtoken');

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      setOpenLogin: false,
      setOpenRegister: false,
      user: {},
      activeStep: 0,
      keyword: '',
      city: undefined,
      gps: '',
      dateSelected: '',
      ifHomePage: false,
    }
  }

  componentDidMount() {
    if(Router.pathname === '/'){
      this.setState({ifHomePage: true})
    }
  }

  logout2 = () => {
    cookie.remove('token', {path: '/'});
    localStorage.removeItem('path');
    setAuthToken(false);
    Router.push('/?disconnect=1');
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null});
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

  findService = () => {
    var queryParams = {search: 1};
    if (this.state.keyword) {
      queryParams['keyword'] = this.state.keyword;
    }

    if (this.state.city) {
      queryParams['city'] = this.state.city;
    }

    if (this.state.gps) {
      queryParams['gps'] = JSON.stringify(this.state.gps);
    }

    if (this.props.selectedAddress) {
      queryParams['selectedAddress'] = this.props.selectedAddress;
    }
    Router.push({pathname: '/search', query: queryParams});
  };

  onChangeCity({suggestion}) {
    this.setState({gps: suggestion.latlng, city: suggestion.name});
  };

  render() {
    const {setOpenLogin, setOpenRegister, keyword, dateSelected, anchorEl, ifHomePage, city} = this.state;
    const {style, user, selectedAddress, logged, inputRef, ...others} = this.props;

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
                classes={{root: style.navbarRootTextField}}
                placeholder={SEARCHBAR.what}
                value={keyword}
                onChange={this.onChange}
                name={'keyword'}
                label={ifHomePage ? SEARCHBAR.labelWhat : false}
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
                    {user.service_address.map((e, index) => (
                      <MenuItem value={e._id} key={index}>
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
                  label={ifHomePage ? SEARCHBAR.labelWhere : false}
                  classes={{root: style.navbarRootTextField}}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent:() => {
                      return (
                        <AlgoliaPlaces
                          {...others}
                          placeholder={SEARCHBAR.where}
                          className={style.navbarAlgoliaPlace}
                          value={city}
                          options={{
                            appId: 'plKATRG826CP',
                            apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                            language: 'fr',
                            countries: ['fr'],
                            type: 'city',
                          }}
                          onChange={(suggestion) => this.onChangeCity(suggestion)}
                          onClear={() => this.setState({city: '', gps: ''})}
                        />)
                    },
                    disableUnderline: true
                  }}
                />
              </Grid>
            }
            {
              logged === false ?
                <Grid className={style.navbarDatePickerMain}>
                  <Grid>
                    <Divider className={style.divider} orientation="vertical" />
                  </Grid>
                  <Grid className={style.navbarDatePickerContainer}>
                    <TextField
                      label={ifHomePage ? SEARCHBAR.labelWhen : false}
                      classes={{root: style.navbarRootTextField}}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputComponent:(props) => {
                          return (
                            <DatePicker
                              {...props}
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
                        disableUnderline: true
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
                    <Tabs value={false} aria-label="simple tabs example">
                      <Tab classes={{root : style.navbarTabRoot}} label={NAVBAR_MENU.ourServices} />
                      <Tab classes={{root : style.navbarTabRoot}} label={NAVBAR_MENU.ourTeam} />
                      <Tab classes={{root : style.navbarTabRoot}} label={NAVBAR_MENU.contactUs}/>
                    </Tabs>
                  </Grid> : SearchBarInput()
              }
              {
                logged === true ?
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
                      <Button className={style.navBarlogIn} onClick={this.handleOpenLogin}>{NAVBAR_MENU.logIn}</Button>
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
                      <Button variant="outlined" classes={{root: style.navbarSignIn}} onClick={this.handleOpenRegister}>{NAVBAR_MENU.signIn}</Button>
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
