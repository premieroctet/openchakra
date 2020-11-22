import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
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
import Link from 'next/link';
import axios from 'axios'
import Hidden from "@material-ui/core/Hidden";
import withStyles from "@material-ui/core/styles/withStyles";
import styles from '../../../static/css/components/NavBar/NavBar';
import {Typography} from '@material-ui/core';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import ClearIcon from '@material-ui/icons/Clear';
import TuneIcon from '@material-ui/icons/Tune';
import InputLabel from '@material-ui/core/InputLabel';
import DialogActions from "@material-ui/core/DialogActions";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import {DateRangePicker} from "react-dates";


const jwt = require('jsonwebtoken');

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});


class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      anchorEl: null,
      setOpenLogin: false,
      setOpenRegister: false,
      user: null,
      activeStep: 0,
      keyword: '',
      city: undefined,
      gps: '',
      dateSelected: '',
      ifHomePage: false,
      modalMobileSearchBarInput: false,
      mobileStepSearch: 0,
      ifSearchPage: false,
      modalFilters: false,
      individualSelected: false,
      proSelected: false,
      startDate: null,
      endDate: null,
      focusedInput: null,
    }
  }

  componentDidMount() {
    if(Router.pathname === '/'){
      this.setState({ifHomePage: true})
    }
    if(Router.pathname === '/search'){
      this.setState({ifSearchPage: true})
    }
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        this.setState({ user : res.data})
      }).catch(err => console.error(err))
  }

  logout2 = () => {
    cookie.remove('token', {path: '/'});
    localStorage.removeItem('path');
    setAuthToken(null);
    Router.push('/');
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

  onSuggestions = ({query}) => {
    this.setState({city: query});
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

  statusFilterChanged = event => {
    this.setState({[event.target.name]: event.target.checked, modalFilters: false},() => this.props.filter());
  };

  onChangeInterval(startDate, endDate) {
    if (startDate) {
      startDate.hour(0).minute(0).second(0).millisecond(0);
    }

    if (endDate) {
      endDate.hour(23).minute(59).second(59).millisecond(999);
    }

    this.setState({startDate: startDate, endDate: endDate});
  }

  mobileSearchBarInput = (classes) =>{
    return(
      <Grid className={this.state.ifHomePage ? classes.navbarSearchContainer : classes.navbarSearchContainerSearchP}>
        <Paper classes={{root: this.state.ifHomePage ? classes.navbarSearch : classes.navbarSearchP}}>
          <Grid>
            <IconButton classes={{root: classes.iconButton}} aria-label="search" onClick={() => this.setState({modalMobileSearchBarInput: true})}>
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid style={{marginLeft: '2vh'}}>
            <Typography>Commencez votre recherche</Typography>
          </Grid>
        </Paper>
      </Grid>
    )
  };

  mobileSearchBarInputSearchPage = (classes) =>{
    return(
      <Grid className={classes.navbarSearchContainerSearchPage}>
        <Paper classes={{root: classes.navbarSearch}}>
          <Grid>
            <IconButton classes={{root: classes.iconButton}} aria-label="search" onClick={() => this.setState({modalMobileSearchBarInput: true})}>
              <SearchIcon />
            </IconButton>
          </Grid>
          <Grid style={{marginLeft: '2vh'}}>
            <Typography>Commencez votre recherche</Typography>
          </Grid>
          <Grid style={{height: 30}}>
            <Divider style={{width :2}} orientation="vertical" />
          </Grid>
          <IconButton color="primary" aria-label="directions" onClick={() => this.setState({modalFilters: true})}>
            <TuneIcon />
          </IconButton>
        </Paper>
      </Grid>
    )
  };

  modalMobileFilter = () =>{
    return(
      <Dialog onClose={() => this.setState({modalFilters: false})} aria-labelledby="customized-dialog-title" open={this.state.modalFilters}>
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({modalFilters: false})}>
          Filtres
        </DialogTitle>
        <DialogContent dividers>
          <Grid>
            <Grid>
              <Grid>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.proSelected}
                      onChange={e => {
                        this.statusFilterChanged(e);
                      }}
                      value={this.state.proSelected}
                      color="primary"
                      name={'proSelected'}
                    />
                  }
                  label="Pro"
                />
              </Grid>
              <Grid>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.individualSelected}
                      onChange={e => {
                        this.statusFilterChanged(e);
                      }}
                      value={this.state.individualSelected}
                      color="primary"
                      name={'individualSelected'}
                    />
                  }
                  label="Particulier"
                />
              </Grid>
            </Grid>
            <Grid>
              <Divider style={{width: '100%', marginTop: '2vh', marginBottom: '2vh'}}/>
            </Grid>
            <Grid>
              <DateRangePicker
                startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                startDatePlaceholderText={'Début'}
                endDatePlaceholderText={'Fin'}
                startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                onDatesChange={({startDate, endDate}) => this.onChangeInterval(startDate, endDate)} // PropTypes.func.isRequired,
                focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                minimumNights={0}
                numberOfMonths={1}
              />
            </Grid>

          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={() => this.setState({modalFilters: false}, () => this.props.filter())} color="primary">
            Afficher les résultats
          </Button>
        </DialogActions>
      </Dialog>
    )
  };

  modalMobileSearchBarInput = (classes) =>{
    return(
      <SwipeableDrawer
        anchor={'bottom'}
        open={this.state.modalMobileSearchBarInput}
        onOpen={() =>this.setState({modalMobileSearchBarInput: true})}
        onClose={() => this.setState({modalMobileSearchBarInput: false, mobileStepSearch: 0, keyword: null, city: undefined, gps: '' })}
        className={classes.drawerStyle}
      >
        <Grid container spacing={3}>
          <Grid item style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Grid>
              <IconButton aria-label="delete" onClick={() =>this.setState({modalMobileSearchBarInput: false, mobileStepSearch: 0, keyword: null, city: undefined, gps: ''  })}>
                <ClearIcon />
              </IconButton>
            </Grid>
            <Grid>
              <h3>{this.state.mobileStepSearch === 0 ? 'Votre Recherche' : this.state.mobileStepSearch === 1 ? 'Où' : 'Dates'}</h3>
            </Grid>
          </Grid>
          <Grid item container>
            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
              {
                this.state.mobileStepSearch === 0 ?
                  <TextField
                    value={this.state.keyword}
                    onChange={this.onChange}
                    name={'keyword'}
                    label={this.state.ifHomePage ? 'Quel service recherchez-vous ? ' : false}
                    onKeyPress={(e) => {
                      e.key === 'Enter' && e.preventDefault();
                    }}
                    variant="outlined"
                    classes={{root: classes.textFieldMobilSearchInput}}
                  />
                  :
                  <TextField
                    item
                    xs={12}
                    classes={{root: this.state.ifHomePage ? classes.navbarRootTextFieldWhere : classes.navbarRootTextFieldWhereP}}
                    value={this.state.city}
                    label={SEARCHBAR.where}
                    variant={'outlined'}
                    InputProps={{
                      inputComponent:(inputRef) => {
                        return (
                          <AlgoliaPlaces
                            {...inputRef}
                            placeholder={''}
                            className={classes.navbarAlgoliaPlace}
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
                }
            </Grid>
          </Grid>
          <Grid item xs={12} style={{display:'flex', justifyContent: 'center'}}>
            <Grid style={{width: '90%'}}>
              <Button onClick={()=> this.state.mobileStepSearch === 0 ? this.setState({mobileStepSearch: this.state.mobileStepSearch + 1}) :  this.findService()} color={'primary'} classes={{root: classes.buttonNextRoot}} variant={'contained'}>{this.state.mobileStepSearch === 0 ? 'Suivant' : 'Rechercher'}</Button>
            </Grid>
          </Grid>
          <Grid item xs={12} style={{display:'flex', justifyContent: 'center'}}>
            <Button classes={{root: classes.buttonIgnore}} onClick={() => this.setState({modalMobileSearchBarInput: false, mobileStepSearch: 0, keyword: null, city: undefined, gps: '' })}>Ignorer</Button>
          </Grid>
        </Grid>
      </SwipeableDrawer>
    )
  };

  searchBarInput = (classes) => {
    return(
      <Grid className={this.state.ifHomePage ? classes.navbarSearchContainer : classes.navbarSearchContainerSearchP}>
        <Paper classes={{root: this.state.ifHomePage ? classes.navbarSearch : classes.navbarSearchP}}>
          <Grid className={classes.navbarTextFieldService}>
            <TextField
              classes={{root: this.state.ifHomePage ? classes.navbarRootTextField : classes.navbarRootTextFieldP}}
              placeholder={SEARCHBAR.what}
              value={this.state.keyword}
              onChange={this.onChange}
              name={'keyword'}
              label={this.state.ifHomePage ? SEARCHBAR.labelWhat : false}
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
            <Divider className={classes.divider} orientation="vertical" />
          </Grid>
          {this.state.user ?
            <Grid className={classes.navbarAddressContainer}>
              <FormControl className={classes.navbarFormControlAddress}>
                {this.state.ifHomePage ?
                  <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                    L'Adresse
                  </InputLabel> : null
                }
                <Select
                  disableUnderline
                  id="outlined-select-currency"
                  value={this.props.selectedAddress ? this.props.selectedAddress : 'main'}
                  name={'selectedAddress'}
                  onChange={(e) => {
                    this.onChange(e);
                  }}
                  classes={{root: classes.selectRoot}}
                >
                  <MenuItem value={'main'}>
                    Adresse
                    principale, {' ' + this.state.user.billing_address.address} {this.state.user.billing_address.zip_code},{this.state.user.billing_address.city}
                  </MenuItem>
                  {this.state.user.service_address.map((e, index) => (
                    <MenuItem value={e._id} key={index}>
                      {e.label + ', '} {' ' + e.address},{e.zip_code} {e.city}
                    </MenuItem>
                  ))}
                  <MenuItem value={'all'}>
                    Partout, Rechercher des Alfred partout
                  </MenuItem>
                  <MenuItem value={'addAddress'}>
                    <Typography style={{color: '#2FBCD3', cursor: 'pointer'}}>
                      Ajouter une adresse
                    </Typography>
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
            :
            <Grid className={this.state.ifHomePage ? classes.navbarAlgoliaContent : classes.navbarAlgoliaContentP}>
              <TextField
                label={this.state.ifHomePage ? SEARCHBAR.labelWhere : false}
                classes={{root: this.state.ifHomePage ? classes.navbarRootTextFieldWhere : classes.navbarRootTextFieldWhereP}}
                InputLabelProps={{
                  shrink: true,
                }}
                value={this.state.city}
                InputProps={{
                  inputComponent:(inputRef) => {
                    return (
                      <AlgoliaPlaces
                        {...inputRef}
                        placeholder={SEARCHBAR.where}
                        className={classes.navbarAlgoliaPlace}
                        options={{
                          appId: 'plKATRG826CP',
                          apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                          language: 'fr',
                          countries: ['fr'],
                          type: 'city',
                        }}
                        onChange={(suggestion) => this.onChangeCity(suggestion)}
                        onClear={() => this.setState({city: '', gps: null})}
                      />)
                  },
                  disableUnderline: true
                }}
              />
            </Grid>
          }
          {
            this.state.logged === false ?
              <Grid className={classes.navbarDatePickerMain}>
                <Grid>
                  <Divider className={classes.divider} orientation="vertical" />
                </Grid>
                <Grid className={this.state.ifHomePage ? classes.navbarDatePickerContainer : classes.navbarDatePickerContainerP}>
                  <TextField
                    label={this.state.ifHomePage ? SEARCHBAR.labelWhen : false}
                    classes={{root: this.state.ifHomePage ? classes.navbarRootTextFieldWhen : classes.navbarRootTextFieldWhenP}}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      inputComponent:(inputRef) => {
                        return (
                          <DatePicker
                            {...inputRef}
                            selected={this.state.dateSelected}
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
                            className={this.state.ifHomePage ? classes.inputDatePicker : classes.inputDatePickerP}
                          />)
                      },
                      disableUnderline: true
                    }}
                  />
                </Grid>
              </Grid> : null
          }
          <Grid>
            <IconButton classes={{root: classes.iconButton}} aria-label="search" onClick={() => this.findService()}>
              <SearchIcon />
            </IconButton>
          </Grid>
        </Paper>
      </Grid>
    )
  };


  render() {
    const {user, setOpenLogin, setOpenRegister, anchorEl, ifHomePage, modalMobileSearchBarInput, ifSearchPage, modalFilters} = this.state;
    const {classes, logged} = this.props;

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
            <IconButton aria-label="close"  onClick={onClose}>
              <CloseIcon color={'secondary'}/>
            </IconButton>
        </MuiDialogTitle>
      );
    };

    return(
      <Grid className={this.state.ifHomePage ? classes.navbarMainSytle : classes.navbarMainSytleP}>
        <AppBar position={'static'} className={this.state.ifHomePage ? classes.navbarAppBar : classes.navbarAppBarP}>
          <Toolbar classes={{root: this.state.ifHomePage ? classes.navBartoolbar : classes.navBartoolbarP}}>
            <Hidden only={['xs']}>
            <Grid className={this.state.ifHomePage || this.state.ifSearchPage ? classes.navbarTopContainer : classes.navbarTopContainerP}>
              <Grid className={classes.navbarLogoContainer}>
                <p>Mon logo</p>
              </Grid>
              {
                ifHomePage ?
                  <Grid className={classes.navabarHomepageMenu}>
                    <Tabs value={false} aria-label="simple tabs example">
                      <Tab classes={{root : classes.navbarTabRoot}} label={NAVBAR_MENU.ourServices} />
                      <Tab classes={{root : classes.navbarTabRoot}} label={NAVBAR_MENU.ourTeam} />
                      <Tab classes={{root : classes.navbarTabRoot}} label={NAVBAR_MENU.contactUs}/>
                    </Tabs>
                  </Grid> : this.searchBarInput(classes)
              }
              {
                logged === true ?
                  <Grid className={classes.navbarMenuBurgerContainer}>
                    <IconButton
                      edge="start"
                      color="inherit"
                      aria-label="open drawer"
                      onClick={this.handleOpenMenuItem}
                    >
                      <MenuIcon classes={{color:'white'}}/>
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
                    { user ?
                      <Grid>
                        <Link href={`/profile/about?user=${user._id}`}>
                          <MenuItem>Mon profil</MenuItem>
                        </Link>
                        <Link href={'/account/notifications'}>
                          <MenuItem>Mon compte</MenuItem>
                        </Link>
                        {user.is_alfred ?
                          <>
                          <Link href={`/shop?id_alfred=${user._id}`}>
                            <MenuItem>Ma boutique</MenuItem>
                          </Link>
                          <Link href={`/profile/messages?user=${user._id}`}>
                            <MenuItem>Mes messages</MenuItem>
                          </Link>
                          </>
                          :
                          null
                        }
                        {user.is_admin ?
                          <Link href={`/dashboard/home`}>
                            <MenuItem>Dashboard</MenuItem>
                          </Link> : null
                        }
                        <MenuItem onClick={() => this.logout2()}>Logout</MenuItem>
                      </Grid>
                      :
                      null
                    }
                    </Menu>
                  </Grid>
                  :
                  <Grid className={classes.navbarButtonContainer}>
                    <Grid>
                      <Button className={classes.navBarlogIn} onClick={this.handleOpenLogin}>{NAVBAR_MENU.logIn}</Button>
                      <Dialog
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        className={classes.navbarModal}
                        open={setOpenLogin}
                        onClose={this.handleCloseLogin}
                        TransitionComponent={Transition}
                        classes={{paperWidthSm: classes.navbarPaperWidth}}
                        disableBackdropClick={true}
                        disableEscapeKeyDown={true}
                      >
                        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseLogin}/>
                        <DialogContent classes={{root: classes.navbarWidthLoginContent}}>
                          <div className={classes.navbarPaper}>
                            {modalLogin()}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </Grid>
                    <Grid className={classes.navbarRegisterContainer}>
                      <Button variant="outlined" classes={{root: classes.navbarSignIn}} onClick={this.handleOpenRegister}>{NAVBAR_MENU.signIn}</Button>
                      <Dialog
                        scroll={'paper'}
                        aria-labelledby="scroll-dialog-title"
                        aria-describedby="scroll-dialog-description"
                        className={classes.navbarModal}
                        open={setOpenRegister}
                        onClose={this.handleCloseRegister}
                        TransitionComponent={Transition}
                        disableBackdropClick={true}
                        disableEscapeKeyDown={true}
                      >
                        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseRegister}/>
                        <DialogContent dividers={false} className={classes.navbarMuidialogContent}>
                          <div className={classes.navbarPaper}>
                            {modalRegister()}
                          </div>
                        </DialogContent>
                      </Dialog>
                    </Grid>
                  </Grid>
              }
            </Grid>
              {
                ifHomePage ? this.searchBarInput(classes) : null
              }
          </Hidden>
          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            {ifHomePage ? this.mobileSearchBarInput(classes) : null}
            {ifSearchPage ? this.mobileSearchBarInputSearchPage(classes) : null}
          </Hidden>
          </Toolbar>
        </AppBar>
        {modalMobileSearchBarInput ? this.modalMobileSearchBarInput(classes) : null}
        {modalFilters ? this.modalMobileFilter(classes) : null}
      </Grid>
    )
  }
}

export default withStyles(styles)(NavBar);
