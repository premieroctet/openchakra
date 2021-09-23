import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
const {clearAuthenticationToken, setAxiosAuthentication} = require('../../../utils/authentication')
import React, {Component} from 'react'
import Button from '@material-ui/core/Button'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import IconButton from '@material-ui/core/IconButton'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import Router from 'next/router'
import Grid from '@material-ui/core/Grid'
import MultipleSelect from 'react-select'
import moment from 'moment'
import LogIn from '../../../components/LogIn/LogIn'
import Register from '../../../components/Register/Register'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Slide from '@material-ui/core/Slide'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import CloseIcon from '@material-ui/icons/Close'
import Paper from '@material-ui/core/Paper'
import Divider from '@material-ui/core/Divider'
import MenuIcon from '@material-ui/icons/Menu'
import SearchIcon from '@material-ui/icons/Search'
import AlgoliaPlaces from 'algolia-places-react'
import {SEARCHBAR, NAVBAR_MENU} from '../../../utils/i18n'
import DatePicker from 'react-datepicker'
import TextField from '@material-ui/core/TextField'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/NavBar/NavBar'
import {Typography} from '@material-ui/core'
import TuneIcon from '@material-ui/icons/Tune'
import InputLabel from '@material-ui/core/InputLabel'
import DialogActions from '@material-ui/core/DialogActions'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'
import {DateRangePicker} from 'react-dates'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import ClearIcon from '@material-ui/icons/Clear'
import {isB2BDisabled} from '../../../config/config'
import {getLoggedUserId, isLoggedUserAlfredPro, isLoggedUserRegistered, isB2BStyle, isB2BAdmin, isB2BManager, removeStatusRegister, setStatusRegister, getRole} from '../../../utils/context'
const {emptyPromise} = require('../../../utils/promise.js')
const {formatAddress} = require('../../../utils/text.js')
import Slider from '@material-ui/core/Slider'
import '../../../static/assets/css/custom.css'
const {PRO, PART, EMPLOYEE, ACCEPT_COOKIE_NAME}=require('../../../utils/consts')
import {getCookieConsentValue, resetCookieConsentValue} from 'react-cookie-consent'

const Transition = React.forwardRef((props, ref) => {
  return <Slide direction="up" ref={ref} {...props} />
})

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon/>
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})


class NavBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      anchorElB2b: null,
      setOpenLogin: false,
      setOpenRegister: null,
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
      radius: null,
      locations: [],
      categories: [],
      allCategories: [],
      services: [],
      filteredServices: [],
      allServices: [],
      focusedInput: null,
      companyPage: false,
      allAddresses: [],
    }
    this.radius_marks=[1, 5, 10, 15, 20, 30, 50, 100, 200, 300].map(v => ({value: v, label: v>1 && v<50? '' : `${v}km`}))
  }

  componentDidMount() {
    let query = Router.query
    if (Router.pathname === '/') {
      this.setState({ifHomePage: true})
    }
    if (Router.pathname === '/company/dashboard/companyDashboard') {
      this.setState({companyPage: true})
    }
    if (Router.pathname === '/search') {
      this.setState({ifSearchPage: true})
    }
    if (query.login === 'true') {
      this.handleOpenLogin()
    }
    if (query.register && !getLoggedUserId()) {
      this.handleOpenRegister(query.register)
    }

    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        const user = res.data
        this.setState({user: user})
        const promise = isB2BAdmin(user)||isB2BManager(user) ? axios.get('/myAlfred/api/companies/current') : emptyPromise({data: user})
        promise
          .then(res => {
            let allAddresses = {'main': res.data.billing_address}
            res.data.service_address.forEach(addr => {
              allAddresses[addr._id] = addr
            })
            this.setState({
              allAddresses: allAddresses,
              selectedAddress: this.props.selectedAddress || 'main', keyword: this.props.keyword || '',
            })
          })
      })
      .catch(err => {
        console.error(err)
      })

    setAxiosAuthentication()
    axios.get(`/myAlfred/api/category/${isB2BStyle() ? PRO : PART}`)
      .then(res => {
        let categories = res.data
        this.setState({allCategories: categories.map(c => ({value: c._id, label: c.label}))})
      })
      .catch(err => {
        console.error(err)
      })
    axios.get('/myAlfred/api/service/all')
      .then(res => {
        const services=res.data.map(s => ({value: s._id, label: s.label, category: s.category._id}))
        this.setState({allServices: services, filteredServices: services})
      })
      .catch(err => {
        console.error(err)
      })

  }

  logout = () => {
    clearAuthenticationToken()
    localStorage.removeItem('path')
    removeStatusRegister()
    if (this.state.ifHomePage) {
      window.location.reload(false)
    }
    else {
      Router.push('/')
    }
  };

  handleMenuClose = () => {
    this.setState({anchorEl: null, anchorElB2b: null})
  };

  handleOpenLogin = () => {
    if (getCookieConsentValue(ACCEPT_COOKIE_NAME) !== 'true') {
      if (getCookieConsentValue(ACCEPT_COOKIE_NAME)==='false') {
        resetCookieConsentValue(ACCEPT_COOKIE_NAME)
        window.location.reload()
      }
      return
    }
    this.handleMenuClose()
    removeStatusRegister()
    this.setState({setOpenLogin: true, setOpenRegister: null})
  };

  handleCloseLogin = (event, reason) => {
    if (reason=='backdropClick') { return }
    this.setState({setOpenLogin: false})
  };

  handleOpenRegister = user_id => {
    if (getCookieConsentValue(ACCEPT_COOKIE_NAME) !== 'true') {
      if (getCookieConsentValue(ACCEPT_COOKIE_NAME)==='false') {
        resetCookieConsentValue(ACCEPT_COOKIE_NAME)
        window.location.reload()
      }
      return
    }
    this.handleMenuClose()
    this.setState({setOpenRegister: user_id, setOpenLogin: false})
  };

  handleCloseRegister = (event, reason) => {
    if (reason=='backdropClick') { return }
    if (this.state.activeStep === 2) {
      removeStatusRegister()
      this.setState({setOpenRegister: null}, () => Router.push('/search'))
    }
    else {
      removeStatusRegister()
      this.setState({setOpenRegister: null})
    }
  };

  needRefresh = () => {
    this.setState({setOpenLogin: false})
    const path = localStorage.getItem('path')
    if (path) {
      localStorage.removeItem('path')
      Router.push(path)
    }
    else if (!isLoggedUserRegistered() && getRole()==EMPLOYEE) {
      const user_id=getLoggedUserId()
      clearAuthenticationToken()
      this.handleOpenRegister(user_id)
    }
    // Alfred pro && b2b_site => on redirige vers le profil
    else if (isB2BStyle() && isLoggedUserAlfredPro()) {
      Router.push(`/profile/about?user=${getLoggedUserId()}`)
    }
    else if (isB2BAdmin()) {
      Router.push('/company/dashboard/companyDashboard')
    }
    else {
      Router.push('/search')
    }
  };

  getData = e => {
    this.setState({activeStep: e})
  };

  onSuggestions = ({query}) => {
    this.setState({city: query})
  };

  onChange = e => {
    let {name, value} = e.target
    this.setState({[name]: value})
    if (name === 'selectedAddress') {
      if (value === 'addAddress') {
        Router.push('/account/myAddresses')
      }
      else {
        this.setState({
          gps: value === 'all' ? null : value === 'main' ? this.state.allAddresses.main.gps : {
            lat: this.state.allAddresses[value].lat,
            lng: this.state.allAddresses[value].lng,
          },
        })
      }
    }
  };

  onCategoriesFilterChanged = pcategories => {
    let categories = pcategories || []
    const filteredServices=this.state.allServices.filter(s => {
      return categories.map(c => c.value).includes(s.category)
    })
    const services=this.state.services.filter(s => {
      return filteredServices.map(fs => fs.value).includes(s._id)
    })
    this.setState({categories: categories, filteredServices: filteredServices, services: services})
  };

  onServicesFilterChanged = pservices => {
    let services = pservices || []
    this.setState({services: services || []})
  };

  handleOpenMenuItem = event => {
    this.setState({anchorEl: event.currentTarget})
  };

  handleOpenMenuItemB2b = event => {
    this.setState({anchorElB2b: event.currentTarget})
  };

  handleClosenMenuItem = () => {
    this.setState({anchorEl: false})
  };

  handleClosenMenuItemB2b = () => {
    this.setState({anchorElB2b: false})
  };

  fireFilter = () => {
    let fltr={}
    if (this.state.proSelected) {
      fltr.proSelected = true
    }
    if (this.state.individualSelected) {
      fltr.individualSelected = true
    }
    if (this.state.startDate) {
      fltr.startDate=this.state.startDate
    }
    if (this.state.endDate) {
      fltr.endDate=this.state.endDate
    }
    if (this.state.radius) {
      fltr.radius=this.state.radius
    }
    if (this.state.locations.length>0) {
      fltr.locations=this.state.locations
    }
    if (this.state.services.length>0) {
      fltr.services=this.state.services.map(c => c.value)
    }
    else if (this.state.categories.length>0) {
      fltr.categories=this.state.categories.map(c => c.value)
    }

    this.props.filter(fltr)
  }

  findService = () => {
    let queryParams = {}
    if (this.state.keyword) {
      queryParams.keyword = this.state.keyword
    }

    if (this.state.city) {
      queryParams.city = this.state.city
    }

    if (this.state.gps) {
      queryParams.gps = JSON.stringify(this.state.gps)
    }

    if (this.state.selectedAddress) {
      queryParams.selectedAddress = this.state.selectedAddress
    }
    Router.push({pathname: '/search', query: queryParams})
  };

  onChangeCity({suggestion}) {
    this.setState({gps: suggestion.latlng, city: suggestion.name})
  }

  statusFilterChanged = event => {
    this.setState({[event.target.name]: event.target.checked})
  };

  onLocationFilterChanged = event => {
    const {name, checked} = event.target
    let {locations} = this.state
    if (checked) {
      locations = _.uniq(locations.concat(name))
    }
    else {
      locations = locations.filter(l => l!=name)
    }
    this.setState({locations: locations})
  };

  onChangeInterval(startDate, endDate) {
    if (startDate) {
      startDate.hour(0).minute(0).second(0).millisecond(0)
    }

    if (endDate) {
      endDate.hour(23).minute(59).second(59).millisecond(999)
    }

    this.setState({startDate: startDate, endDate: endDate})
  }

  onRadiusFilterChanged = (event, value) => {
    this.setState({radius: value})
  };

  handleModalSearchBarInput = () => {
    this.setState({modalMobileSearchBarInput: true})
  };

  mobileSearchBarInput = classes => {
    return (
      <Grid
        style={{width: '100%'}}
        onClick={this.handleModalSearchBarInput}
      >
        <Paper classes={{root: classes.navbarSearch}}>
          <Grid container style={{margin: 0, width: '100%'}}>
            <Grid item xs={2}>
              <IconButton
                classes={{root: classes.iconButton}}
                style={{backgroundColor: isB2BStyle(this.state.user) ? '#b0cdc8' : 'rgba(248, 207, 97, 1)'}}
                aria-label="search"
              >
                <SearchIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={10} style={{display: 'flex', alignItems: 'center'}}>
              <Typography style={{marginLeft: '2vh'}}>{SEARCHBAR.begin_search}</Typography>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  };

  modalMobileSearchBarInput = classes => {

    return (
      <SwipeableDrawer
        anchor={'bottom'}
        open={this.state.modalMobileSearchBarInput}
        onOpen={() => this.setState({modalMobileSearchBarInput: true})}
        onClose={() => this.setState({
          modalMobileSearchBarInput: false,
          mobileStepSearch: 0,
          keyword: null,
          city: undefined,
          gps: '',
        })}
        className={classes.drawerStyle}
      >
        <Grid container style={{height: '100%'}}>
          <Grid item style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Grid>
              <IconButton
                aria-label="delete"
                classes={{root: classes.rootIconButton}}
                onClick={() => this.setState({
                  modalMobileSearchBarInput: false,
                  mobileStepSearch: 0,
                  keyword: null,
                  city: undefined,
                  gps: '',
                })}>
                <ClearIcon/>
              </IconButton>
            </Grid>
            <Grid>
              <h3
                style={{margin: 0}}>{this.state.mobileStepSearch === 0 ? SEARCHBAR.what_service : this.state.mobileStepSearch === 1 ? SEARCHBAR.where_place : SEARCHBAR.dates}</h3>
            </Grid>
          </Grid>
          <Grid item container spacing={3} style={{margin: 0, width: '100%'}}>
            {
              this.state.mobileStepSearch === 0 ?
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                  <TextField
                    value={this.state.keyword}
                    onChange={this.onChange}
                    name={'keyword'}
                    label={ReactHtmlParser(this.props.t('SEARCHBAR.what_placeholder'))}
                    onKeyPress={e => {
                      e.key === 'Enter' && e.preventDefault()
                    }}
                    variant="outlined"
                    style={{width: '100%'}}
                  />
                </Grid>
                :
                this.state.user ?
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <FormControl variant="outlined">
                      <Select
                        id="outlined-select-currency"
                        value={this.state.selectedAddress || 'main'}
                        name={'selectedAddress'}
                        onChange={e => {
                          this.onChange(e)
                        }}
                        classes={{selectMenu: classes.fitlerMenuLogged}}
                      >
                        {Object.entries(this.state.allAddresses).map(([_id, value], index) => (
                          <MenuItem value={_id} key={index}>
                            { _id=='main' ? SEARCHBAR.main_adress : `${value.label }, `} {formatAddress(value)}
                          </MenuItem>
                        ))}
                        <MenuItem value={'all'}>
                          {SEARCHBAR.find_everywhere}
                        </MenuItem>
                        <MenuItem value={'addAddress'}>
                          <Typography style={{color: '#2FBCD3', cursor: 'pointer'}}>
                            {SEARCHBAR.find_everywhere}
                          </Typography>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  :
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} classes={{root: classes.navbarRootTextFieldWhereP}}>
                    <AlgoliaPlaces
                      placeholder={ReactHtmlParser(this.props.t('SEARCHBAR.where'))}
                      options={{
                        appId: 'plKATRG826CP',
                        apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                        language: 'fr',
                        countries: ['fr'],
                        type: 'city',
                      }}
                      onChange={suggestion => this.onChangeCity(suggestion)}
                      onClear={() => this.setState({city: '', gps: null})}
                    />
                  </Grid>
            }
          </Grid>
          <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
            <Grid style={{width: '90%'}}>
              <Button
                onClick={() => (this.state.mobileStepSearch === 0 ? this.setState({mobileStepSearch: this.state.mobileStepSearch + 1}) : this.findService())}
                color={'primary'} classes={{root: classes.buttonNextRoot}}
                variant={'contained'}>{this.state.mobileStepSearch === 0 ? SEARCHBAR.next_button : SEARCHBAR.find_button}
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </SwipeableDrawer>
    )
  };

  mobileSearchBarInputSearchPage = classes => {
    return (
      <Grid className={classes.navbarSearchContainerSearchPage}>
        <Paper classes={{root: classes.navbarSearch}}>
          <Grid container style={{margin: 0, width: '100%'}}>
            <Grid item xs={2} onClick={this.handleModalSearchBarInput}>
              <IconButton
                classes={{root: classes.iconButton}}
                style={{backgroundColor: isB2BStyle(this.state.user) ? '#b0cdc8' : 'rgba(248, 207, 97, 1)'}}
                aria-label="search"
                onClick={this.handleModalSearchBarInput}
              >
                <SearchIcon/>
              </IconButton>
            </Grid>
            <Grid item xs={8} onClick={this.handleModalSearchBarInput} style={{cursor: 'pointer', display: 'flex', alignItems: 'center'}}>
              <Typography style={{textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', marginLeft: '2vh'}}>{SEARCHBAR.begin_search}</Typography>
            </Grid>
            <Grid container item xs={2} style={{margin: 0, width: '100%'}}>
              <Grid item xs={1}>
                <Divider orientation="vertical"/>
              </Grid>
              <Grid item xs={11} style={{display: 'flex', justifyContent: 'center'}}>
                <IconButton color="primary" aria-label="directions" onClick={() => this.setState({modalFilters: true})}>
                  <TuneIcon/>
                </IconButton>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  };

    modalMobileFilter = classes => {
      const {locations, radius, categories, allCategories, services, filteredServices} = this.state
      return (
        <Dialog
          onClose={() => this.setState({modalFilters: false})}
          aria-labelledby="customized-dialog-title"
          open={this.state.modalFilters}
          classes={{paper: classes.dialogNavbarMobileFilter}}
        >
          <DialogTitle id="customized-dialog-title" onClose={() => this.setState({modalFilters: false})}>
            {SEARCHBAR.filter}
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
                          this.statusFilterChanged(e)
                        }}
                        value={this.state.proSelected}
                        color="primary"
                        name={'proSelected'}
                      />
                    }
                    label={SEARCHBAR.professional}
                  />
                </Grid>
                <Grid>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.state.individualSelected}
                        onChange={this.statusFilterChanged}
                        value={this.state.individualSelected}
                        color="primary"
                        name={'individualSelected'}
                      />
                    }
                    label={SEARCHBAR.particular}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Divider style={{width: '100%', marginTop: '2vh', marginBottom: '2vh'}}/>
              </Grid>
              <Grid>
                <DateRangePicker
                  startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                  startDatePlaceholderText={SEARCHBAR.start_date}
                  startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                  endDatePlaceholderText={SEARCHBAR.end_date}
                  endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                  endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                  onDatesChange={({startDate, endDate}) => this.onChangeInterval(startDate, endDate)} // PropTypes.func.isRequired,
                  focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                  onFocusChange={focusedInput => this.setState({focusedInput})} // PropTypes.func.isRequired,
                  minimumNights={0}
                  numberOfMonths={1}
                />
              </Grid>
              <Grid>
                <Slider
                  name="radius"
                  min={5}
                  max={300}
                  step={null}
                  value={radius}
                  valueLabelDisplay="auto"
                  marks={this.radius_marks}
                  onChange={this.onRadiusFilterChanged}
                />
              </Grid>
              <Grid>
                <FormControlLabel
                  classes={{root: classes.filterMenuControlLabel}}
                  control={
                    <Switch
                      checked={locations.includes('client')}
                      onChange={this.onLocationFilterChanged}
                      color="primary"
                      name={'client'}
                    />
                  }
                  label={SEARCHBAR.at_home}
                />
                <FormControlLabel
                  classes={{root: classes.filterMenuControlLabel}}
                  control={
                    <Switch
                      checked={locations.includes('alfred')}
                      onChange={this.onLocationFilterChanged}
                      color="primary"
                      name={'alfred'}
                    />
                  }
                  label={SEARCHBAR.alfred_home}
                />
                <FormControlLabel
                  classes={{root: classes.filterMenuControlLabel}}
                  control={
                    <Switch
                      checked={locations.includes('visio')}
                      onChange={this.onLocationFilterChanged}
                      color="primary"
                      name={'visio'}
                    />
                  }
                  label={SEARCHBAR.remote}
                />
              </Grid>
            </Grid>
            <Grid className={classes.filterMenuContentMainStyleDateFilter}>
              <MultipleSelect
                key={moment()}
                value={categories}
                onChange={this.onCategoriesFilterChanged}
                options={allCategories}
                isMulti
                isSearchable
                closeMenuOnSelect={true}
                placeholder={ReactHtmlParser(this.props.t('SEARCHBAR.labelCategory'))}
              />
            </Grid>
            <Grid className={classes.filterMenuContentMainStyleDateFilter}>
              <MultipleSelect
                key={moment()}
                value={services}
                onChange={this.onServicesFilterChanged}
                options={filteredServices}
                isMulti
                isSearchable
                closeMenuOnSelect={true}
                placeholder={ReactHtmlParser(this.props.t('SEARCHBAR.labelService'))}
              />
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button
              autoFocus
              onClick={() => {
                this.setState({modalFilters: false})
                this.fireFilter()
              }}
              color="primary"
            >
              {SEARCHBAR.display}
            </Button>
          </DialogActions>
        </Dialog>
      )
    };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  burgerMenuLogged = classes => {
    const{ifHomePage, companyPage, anchorEl, user} = this.state

    return(
      <Grid
        className={classes.navbarMenuBurgerContainer}
        item
        xl={ifHomePage ? 3 : 4}
        lg={3}
        md={ifHomePage && isB2BStyle(user) ? 10 : 2}
        sm={ifHomePage ? 11 : 1}
      >
        <IconButton
          aria-label="open drawer"
          onClick={this.handleOpenMenuItem}
        >
          <MenuIcon className={`customBurgerlogo ${companyPage ? classes.menuIconB2b : classes.menuIcon}`}/>
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={this.handleClosenMenuItem}
          getContentAnchorEl={null}
          anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
          transformOrigin={{vertical: 'top', horizontal: 'center'}}
          classes={{paper: 'customBurger'}}
        >
          {user ?
            <Grid>
              <MenuItem>{SEARCHBAR.hello + user.firstname} !</MenuItem>
              <MenuItem onClick={() => Router.push(`/profile/about?user=${user._id}`)}>{SEARCHBAR.my_profil}</MenuItem>
              <MenuItem onClick={() => Router.push(isB2BAdmin(user) ? '/account/editProfileCompany' : '/account/editProfile')}>{SEARCHBAR.my_settings}</MenuItem>
              {
                !user.is_employee ?
                  user.is_alfred ?
                    <MenuItem onClick={() => Router.push(`/profile/services?user=${user._id}`)}>{SEARCHBAR.my_services}</MenuItem>
                    :
                    <MenuItem onClick={() => Router.push('/creaShop/creaShop')}>{SEARCHBAR.create_shop}</MenuItem>
                  : null
              }
              <MenuItem onClick={() => Router.push(`/profile/messages?user=${user._id}`)}>{SEARCHBAR.my_messages}</MenuItem>
              <MenuItem onClick={() => Router.push('/reservations/reservations')}>{SEARCHBAR.my_resa}</MenuItem>
              {user.is_admin ?
                <MenuItem onClick={() => Router.push('/dashboard/home')}>{SEARCHBAR.dashboard_alfred}</MenuItem>
                : null
              }
              {isB2BAdmin(user) ?
                <MenuItem onClick={() => Router.push('/company/dashboard/companyDashboard')}>{SEARCHBAR.dashboard}</MenuItem>
                : null
              }
              <MenuItem onClick={this.logout}>{SEARCHBAR.log_out}</MenuItem>
            </Grid>
            :
            null
          }
        </Menu>
      </Grid>
    )
  }

  notLoggedButtonSection = classes => {
    const{ifHomePage, user} = this.state

    const logged = user != null

    return(
      <Grid
        item
        xl={!logged && ifHomePage ? 3 : 4}
        lg={3}
        md={!logged && !ifHomePage ? 3 : 2}
        sm={!ifHomePage ? 4 : 11}
        className={ifHomePage ? isB2BStyle(user) ? classes.navbarButtonContainerB2B : classes.navbarButtonContainer : classes.navbarButtonContainerP}
      >
        <Grid>
          <Button
            variant="outlined"
            classes={{root: isB2BStyle(user) ? classes.navbarSignInB2B : classes.navbarSignIn}}
            className={'customButtonSignin'}
            onClick={this.handleOpenRegister}>
            {ReactHtmlParser(this.props.t('NAVBAR_MENU.signIn'))}
          </Button>
        </Grid>
        <Grid className={classes.navbarRegisterContainer}>
          <Button
            classes={{root: isB2BStyle(user) ? classes.navBarlogInB2B : classes.navBarlogIn}}
            className={'customButtonLogin'}
            onClick={this.handleOpenLogin}>
            {ReactHtmlParser(this.props.t('NAVBAR_MENU.logIn'))}
          </Button>
        </Grid>
      </Grid>
    )
  }

  checkAndOpenRegister = () => {
    setStatusRegister()
    this.handleOpenRegister(true)
  };

  notLoggedButtonSectionB2b = classes => {
    const{ifHomePage, user, anchorElB2b} = this.state

    const logged = user != null

    return(
      <>
        <Grid
          className={classes.navbarMenuBurgerContainerB2B}
          item
          xl={ifHomePage ? 3 : 4}
          lg={3}
          md={ifHomePage ? 10 : 3}
          sm={ifHomePage ? 10 : 1}
        >
          <IconButton
            aria-label="open drawer"
            onClick={this.handleOpenMenuItemB2b}
          >
            <MenuIcon style={{color: 'white'}}/>
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorElB2b}
            keepMounted
            open={Boolean(anchorElB2b)}
            onClose={this.handleClosenMenuItemB2b}
            getContentAnchorEl={null}
            anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
            transformOrigin={{vertical: 'top', horizontal: 'center'}}
          >
            <MenuItem onClick={() => Router.push('/blog/elementor-211/')}>
              <Typography>{SEARCHBAR.service_company}</Typography>
            </MenuItem>
            <MenuItem onClick={() => Router.push('/blog/services-aux-collaborateurs/')}>
              <Typography>{SEARCHBAR.service_collab}</Typography>
            </MenuItem>
            <MenuItem onClick={() => Router.push('/blog/tarifs')}>
              <Typography>{SEARCHBAR.price}</Typography>
            </MenuItem>
            <Grid style={{marginTop: '2vh', marginBottom: '2vh'}}>
              <Divider/>
            </Grid>
            <MenuItem onClick={this.checkAndOpenRegister}>
              <Button variant="outlined" classes={{root: classes.buttonService}}>{SEARCHBAR.crea_service}</Button>
            </MenuItem>
            <MenuItem onClick={this.handleOpenLogin}>
              <Button variant="outlined" classes={{root: classes.buttonLoginB2b}}>{SEARCHBAR.log_in}</Button>
            </MenuItem>
            <MenuItem onClick={() => Router.push('/search')}>
              <Button variant="outlined" classes={{root: classes.buttonRegisterB2b}}>{SEARCHBAR.sign_in}</Button>
            </MenuItem>
          </Menu>
        </Grid>
        <Grid
          item
          xl={!logged && ifHomePage ? 3 : 4}
          lg={ifHomePage ? 3 : 4}
          md={!logged && !ifHomePage ? 3 : 2}
          sm={!ifHomePage ? 4 : 11}
          className={ifHomePage ? isB2BStyle(user) ? classes.navbarButtonContainerB2B : classes.navbarButtonContainer : classes.navbarButtonContainerPB2B}
        >
          <Grid className={classes.navbarRegisterContainer}>
            <Button
              variant="outlined"
              classes={{root: classes.navbarSignInB2B}}
              style={{whiteSpace: 'nowrap'}}
              onClick={this.checkAndOpenRegister}>
              {SEARCHBAR.crea_service}
            </Button>
          </Grid>
          <Grid >
            <Button
              variant="outlined"
              classes={{root: isB2BStyle(user) ? classes.navbarSignInB2BContained : classes.navbarSignIn}}
              onClick={() => Router.push('/blog/inscription-entreprise/')}>
              {ReactHtmlParser(this.props.t('NAVBAR_MENU.signIn'))}
            </Button>
          </Grid>
          <Grid>
            <Button
              classes={{root: isB2BStyle(user) ? classes.navBarlogInB2B : classes.navBarlogIn}}
              onClick={this.handleOpenLogin}>
              {ReactHtmlParser(this.props.t('NAVBAR_MENU.logIn'))}
            </Button>
          </Grid>
        </Grid>
      </>
    )
  }

  searchBarInput = classes => {
    const logged = this.state.user != null
    const {ifHomePage, user} = this.state


    return (
      <Grid className={ifHomePage ? isB2BStyle(user) ? classes.navbarSearchContainerB2B : classes.navbarSearchContainer : classes.navbarSearchContainerSearchP}>
        <Paper classes={{root: `customsearch ${classes.navbarSearch}`}}>
          <Grid container style={{margin: 0, width: '100%'}}>
            <Grid
              container
              item
              xl={!logged ? !ifHomePage ? 5 : 4 : 5}
              lg={!logged ? !ifHomePage ? 5 : 4 : 5}
              sm={!logged ? !ifHomePage ? 5 : 4 : 5}
              md={!logged ? !ifHomePage ? 5 : 4 : 5}
              xs={!logged ? !ifHomePage ? 5 : 4 : 5}
              spacing={1}
              style={{margin: 0, width: '100%'}}
            >
              <Grid item xl={11} lg={11} sm={11} md={11} xs={11} style={{display: 'flex', alignItems: 'center'}}>
                <TextField
                  placeholder={ReactHtmlParser(this.props.t('SEARCHBAR.what_placeholder'))}
                  style={{width: '100%'}}
                  value={this.state.keyword}
                  onChange={this.onChange}
                  name={'keyword'}
                  label={ifHomePage ? ReactHtmlParser(this.props.t('SEARCHBAR.labelWhat')) : ''}
                  onKeyPress={e => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      this.findService()
                    }
                  }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{disableUnderline: true}}
                />
              </Grid>
              <Grid item xl={1} lg={1} sm={1} md={1} xs={1}>
                <Divider orientation="vertical"/>
              </Grid>
            </Grid>
            {
              this.state.user ?
                <Grid item xl={6} lg={6} md={6} sm={6} xs={6}>
                  <FormControl className={classes.navbarFormControlAddress}>
                    {this.state.ifHomePage ?
                      <InputLabel shrink id="demo-simple-select-placeholder-label-label">
                        {ReactHtmlParser(this.props.t('SEARCHBAR.labelWhere'))}
                      </InputLabel> : null
                    }
                    <Select
                      disableUnderline
                      id="outlined-select-currency"
                      value={this.state.selectedAddress || 'main'}
                      name={'selectedAddress'}
                      onChange={e => {
                        this.onChange(e)
                      }}
                      style={{marginTop: this.state.ifHomePage ? 20 : 10}}
                    >
                      {Object.entries(this.state.allAddresses).map(([_id, value], index) => (
                        <MenuItem value={_id} key={index}>
                          { _id=='main' ? SEARCHBAR.main_adress : `${value.label }, `} {formatAddress(value)}
                        </MenuItem>
                      ))}
                      <MenuItem value={'all'}>
                        {SEARCHBAR.find_everywhere}
                      </MenuItem>
                      <MenuItem value={'addAddress'}>
                        <Typography style={{color: '#2FBCD3', cursor: 'pointer'}}>
                          {SEARCHBAR.add_adresses}
                        </Typography>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                :
                <Grid
                  container
                  spacing={1}
                  style={{margin: 0, width: '100%'}}
                  item
                  xl={!logged ? !ifHomePage ? 6 : 4 : 5}
                  lg={!logged ? !ifHomePage ? 6 : 4 : 5}
                  sm={!logged ? !ifHomePage ? 6 : 4 : 5}
                  md={!logged ? !ifHomePage ? 6 : 4 : 5}
                  xs={!logged ? !ifHomePage ? 6 : 4 : 5}
                >
                  <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%', display: 'flex', alignItems: 'center'}} >
                    {
                      this.state.ifHomePage ?
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <InputLabel shrink>{ReactHtmlParser(this.props.t('SEARCHBAR.labelWhere'))}</InputLabel>
                        </Grid> : null
                    }
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={'customsearch'} classes={{root: `${classes.navbarRootTextFieldWhere}`}}>
                      <AlgoliaPlaces
                        placeholder={ReactHtmlParser(this.props.t('SEARCHBAR.where'))}
                        options={{
                          appId: 'plKATRG826CP',
                          apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                          language: 'fr',
                          countries: ['fr'],
                          type: 'city',
                        }}
                        onChange={suggestion => this.onChangeCity(suggestion)}
                        onClear={() => this.setState({city: '', gps: null})}
                      />
                    </Grid>
                  </Grid>
                </Grid>
            }
            {
              logged === false && this.state.ifHomePage ?
                <Grid container item xl={3} lg={3} sm={3} md={3} xs={3} style={{margin: 0, width: '100%'}} spacing={1}>
                  <Grid item xl={1} lg={1} sm={1} md={1} xs={1}>
                    <Divider orientation="vertical"/>
                  </Grid>
                  <Grid item xl={11} lg={11} sm={11} md={11} xs={11}>
                    <TextField
                      label={this.state.ifHomePage ? ReactHtmlParser(this.props.t('SEARCHBAR.labelWhen')) : false}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        inputComponent: inputref => {
                          return (
                            <DatePicker
                              {...inputref}
                              selected={this.state.dateSelected}
                              onChange={date => {
                                this.setState({dateSelected: date})
                                if (date === null) {
                                  this.setState({dateSelected: ''})
                                }
                              }}
                              locale='fr'
                              showMonthDropdown
                              dateFormat="dd/MM/yyyy"
                              placeholderText={ReactHtmlParser(this.props.t('SEARCHBAR.when'))}
                              minDate={new Date()}
                            />)
                        },
                        disableUnderline: true,
                      }}
                    />
                  </Grid>
                </Grid> : null
            }
            <Grid item xl={1} lg={1} sm={1} md={1} xs={1} style={{display: 'flex', flexDirection: 'row-reverse', alignItems: 'center'}}>
              <IconButton
                classes={{root: classes.iconButton}}
                className={`customsearchMagnify ${isB2BStyle(this.state.user) ? classes.iconColorB2b : classes.iconColor}`}
                aria-label="search"
                onClick={() => this.findService()}>
                <SearchIcon/>
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    )
  };

  triggerLogin = () => {
    return (
      <LogIn callRegister={this.handleOpenRegister} login={this.needRefresh} id={'connect'} />
    )
  }

  logoContainer = classes => {
    const{ifHomePage, user} = this.state
    const logged = user != null

    return(
      <Grid
        className={ifHomePage ? classes.navbarLogoContainer : classes.navbarLogoContainerP}
        item
        xl={ifHomePage ? 3 : 4}
        lg={isB2BStyle(user) && ifHomePage ? 2 : isB2BStyle(user) && !ifHomePage && !logged? 2 : 3}
        md={!logged && !ifHomePage ? 3 : 2}
        sm={1}
        onClick={() => Router.push('/')}
      >
        <img alt={'logo_myAlfred'} title={'logo_myAlfred'} src={'/static/assets/icon/logo.svg'}
          className={classes.logoMyAlfred} height={64} style={{filter: 'invert(1)'}}/>
      </Grid>
    )
  };

  tabBar = classes => {
    const{user}= this.state

    return(
      <Grid
        item
        xl={6}
        lg={isB2BStyle(user) ? 7 : 6}
        md={8}
        sm={11}
        className={isB2BStyle(user) ? classes.navbarHomepageMenuB2B : classes.navabarHomepageMenu}
      >
        <Tabs value={false} aria-label="simple tabs example">
          {
            getLoggedUserId() && !isLoggedUserAlfredPro() ? null:
              isB2BStyle() ?
                <>
                  <Tab
                    classes={{root: isB2BStyle(user) ? classes.navbarTabRootB2b : classes.navbarTabRoot}}
                    label={SEARCHBAR.service_company}
                    onClick={() => Router.push('/blog/elementor-211/')}
                  />
                  <Tab
                    classes={{root: isB2BStyle(user) ? classes.navbarTabRootB2b : classes.navbarTabRoot}}
                    label={SEARCHBAR.service_collab}
                    onClick={() => Router.push('/blog/services-aux-collaborateurs/')}
                  />
                  <Tab
                    classes={{root: isB2BStyle(user) ? classes.navbarTabRootB2b : classes.navbarTabRoot}}
                    label={SEARCHBAR.price}
                    onClick={() => Router.push('/blog/tarifs')}
                  />
                </>
                :
                <>
                  <Tab
                    classes={{root: isB2BStyle(user) ? classes.navbarTabRootB2b : classes.navbarTabRoot}}
                    label={ReactHtmlParser(this.props.t('NAVBAR_MENU.ourServices'))}
                    onClick={() => Router.push('/search')}
                  />
                  {user ?
                    user.is_alfred ?
                      <Tab
                        classes={{root: isB2BStyle(user) ? classes.navbarTabRootB2b : classes.navbarTabRoot}}
                        label={ReactHtmlParser(this.props.t('NAVBAR_MENU.myServices'))}
                        onClick={() => Router.push(`/profile/services?user=${user._id}`)}
                      />
                      :
                      <Tab
                        classes={{root: isB2BStyle(user) ? classes.navbarTabRootB2b : classes.navbarTabRoot}}
                        label={ReactHtmlParser(this.props.t('NAVBAR_MENU.registerServices'))}
                        onClick={() => Router.push('/creaShop/creaShop')}
                      />
                    :
                    <>
                      <Tab
                        classes={{root: isB2BStyle(user) ? classes.navbarTabRootB2b : classes.navbarTabRoot}}
                        label={ReactHtmlParser(this.props.t('NAVBAR_MENU.registerServices'))}
                        onClick={this.handleOpenRegister}
                      />
                      <Tab
                        classes={{root: classes.navbarTabRoot}}
                        label={ReactHtmlParser(this.props.t('NAVBAR_MENU.contactUs'))}
                        onClick={() => Router.push('/contact')}
                      />
                    </>
                  }
                </>
          }
          {
            // Accès part/pro uniquement si non loggué ou loggué en Alfred pro
            getLoggedUserId() && !isLoggedUserAlfredPro()? null:
              isB2BStyle() || isB2BDisabled() ?
                null
                :
                <Tab
                  classes={{root: isB2BStyle(user) ? classes.navbarTabRootB2b : classes.navbarTabRoot}}
                  label={ReactHtmlParser(this.props.t('NAVBAR_MENU.businessSide'))}
                  onClick={() => Router.push('/professional')}
                />
          }
        </Tabs>
      </Grid>
    )
  };

  render() {
    const {user, ifHomePage, setOpenLogin, modalMobileSearchBarInput, ifSearchPage, modalFilters, companyPage, setOpenRegister} = this.state
    const {classes} = this.props
    const logged = user != null

    const dialogLogin = () => {
      return(
        <Dialog
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          className={classes.navbarModal}
          open={setOpenLogin}
          onClose={this.handleCloseLogin}
          TransitionComponent={Transition}
          classes={{paperWidthSm: classes.navbarPaperWidth}}
          disableEscapeKeyDown={true}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleCloseLogin}/>
          <DialogContent classes={{root: classes.navbarWidthLoginContent}}>
            <div className={classes.navbarPaper}>
              {this.triggerLogin()}
            </div>
          </DialogContent>
        </Dialog>
      )
    }

    const dialogRegister = () => {
      return(
        <Dialog
          scroll={'paper'}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
          className={classes.navbarModal}
          open={setOpenRegister}
          onClose={this.handleCloseRegister}
          TransitionComponent={Transition}
          disableEscapeKeyDown={true}
          classes={{paper: 'customnavbarregisterdialog'}}
        >
          <DialogTitle id="customized-dialog-title" onClose={this.handleCloseRegister}/>
          <DialogContent dividers={false} className={classes.navbarMuidialogContent}>
            <div className={classes.navbarPaper}>
              <Register
                callLogin={this.handleOpenLogin}
                sendParentData={this.getData} id={'register'}
                user_id={this.state.setOpenRegister}
              />
            </div>
          </DialogContent>
        </Dialog>
      )
    }

    return (
      <Grid className={this.state.ifHomePage ? isB2BStyle(user) ? classes.navbarMainSytleB2B : classes.navbarMainSytle : classes.navbarMainSytleP}>
        <AppBar position={'static'} className={`custombanner ${ isB2BStyle(user) && companyPage || this.state.ifHomePage ? classes.navbarAppBarNoBg : isB2BStyle(user) && !companyPage ? classes.navbarAppBarWithBg : null} ${classes.headerBackgroundcolor}`}>
          <Toolbar classes={{root: this.state.ifHomePage ? classes.navBartoolbar : classes.navBartoolbarP}}>
            <Grid className={classes.hiddenOnlyXs}>
              <Grid container style={{justifyContent: companyPage ? 'flex-end' : '', width: '100%', margin: 0}}>
                {companyPage ? null : this.logoContainer(classes)}
                {
                  companyPage ? null : ifHomePage ? this.tabBar(classes)
                    :
                    <Grid item xl={4} lg={6} md={!logged && !ifHomePage ? 6 : 8} sm={!logged && !ifHomePage && !isB2BStyle(user) ? 8 : 11}>
                      {this.searchBarInput(classes)}
                    </Grid>
                }
                {isB2BStyle(user) && !logged ? this.notLoggedButtonSectionB2b(classes) : logged === true ? this.burgerMenuLogged(classes) : this.notLoggedButtonSection(classes)}
              </Grid>
              {
                ifHomePage ? this.searchBarInput(classes) : null
              }
            </Grid>
            <Grid className={classes.hiddenOnMobile}>
              {ifHomePage ? this.mobileSearchBarInput(classes) : null}
              {ifSearchPage ? this.mobileSearchBarInputSearchPage(classes) : null}
            </Grid>
          </Toolbar>
        </AppBar>
        {modalMobileSearchBarInput ? this.modalMobileSearchBarInput(classes) : null}
        {modalFilters ? this.modalMobileFilter(classes) : null}
        {setOpenLogin ? dialogLogin() : null}
        {setOpenRegister ? dialogRegister() : null}
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(NavBar))
