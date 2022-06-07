const {
  clearAuthenticationToken,
  setAxiosAuthentication,
} = require('../../../utils/authentication')
const {
  getLoggedUserId,
  getRole,
  isLoggedUserAlfredPro,
  isLoggedUserRegistered,
} = require('../../../utils/context')
import CustomButton from '../../../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import BottomNavigation from '@material-ui/core/BottomNavigation'
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction'
import HomeIcon from '@material-ui/icons/Home'
import SearchIcon from '@material-ui/icons/Search'
import CalendarTodayIcon from '@material-ui/icons/CalendarToday'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import PersonIcon from '@material-ui/icons/Person'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/MobileNavbar/MobileNavbar'
import Router from 'next/router'
import axios from 'axios'
import LogIn from '../../../components/LogIn/LogIn'
import DialogContent from '@material-ui/core/DialogContent'
import Dialog from '@material-ui/core/Dialog'
import Slide from '@material-ui/core/Slide'
import MuiDialogTitle from '@material-ui/core/DialogTitle'
import Register from '../../../components/Register/Register'
import Grid from '@material-ui/core/Grid'
import {Typography} from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import GroupAddIcon from '@material-ui/icons/GroupAdd'
import TextField from '@material-ui/core/TextField'
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer'
import ClearIcon from '@material-ui/icons/Clear'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import AlgoliaPlaces from 'algolia-places-react'
import {SEARCHBAR} from '../../../utils/i18n'
import BusinessIcon from '@material-ui/icons/Business'
const {EMPLOYEE}=require('../../../utils/consts')
const {formatAddress} = require('../../../utils/text.js')


const Transition = React.forwardRef((props, ref) => {
  return <Slide direction='up' ref={ref} {...props} />
})

const DialogTitle = withStyles(styles)(props => {
  const {children, classes, onClose, ...other} = props
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})


class MobileNavbar extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      user: null,
      currentIndex: 0,
      anchorEl: null,
      setOpenLogin: false,
      setOpenRegister: false,
      activeStep: 0,
      modalMobileSearchBarInput: false,
      mobileStepSearch: 0,
      keyword: '',
      city: undefined,
      gps: '',
      logged: false,
      allAddresses: [],
    }
  }

  componentDidMount() {
    let query = Router.query

    if(query.login === 'true') {
      this.handleOpenLogin()
    }
    if (getLoggedUserId()) {
      this.setState({logged: true, selectedAddress: 'main'})
    }

    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        const user=res.data
        let allAddresses = {'main': user.billing_address}
        user.service_address.forEach(addr => {
          allAddresses[addr._id] = addr
        })
      })
      .catch(err => console.error(err))
  }

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
    else {
      Router.push('/search')
    }
  }

  handleMenuClose = () => {
    this.setState({anchorEl: null})
  }

  handleOpenRegister = () => {
    this.handleMenuClose()
    this.setState({setOpenRegister: true, setOpenLogin: false})
  }

  handleOpenLogin = () => {
    this.handleMenuClose()
    this.setState({setOpenLogin: true, setOpenRegister: false})
  }

  handleCloseLogin = (event, reason) => {
    if (reason=='backdropClick') { return }
    this.setState({setOpenLogin: false})
  }


  handleCloseRegister = (event, reason) => {
    if (reason=='backdropClick') { return }
    if (this.state.activeStep === 2) {
      this.setState({setOpenRegister: false}, () => this.componentDidMount())
    }
    else {
      this.setState({setOpenRegister: false})
    }
  }

  getData = e => {
    this.setState({activeStep: e})
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
  }

  modalLogin = classes => {
    return (
      <Dialog
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.navbarModal}
        open={this.state.setOpenLogin}
        onClose={this.handleCloseLogin}
        TransitionComponent={Transition}
        classes={{paperWidthSm: classes.navbarPaperWidth}}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseLogin}/>
        <DialogContent classes={{root: classes.navbarWidthLoginContent}}>
          <Grid className={classes.navbarPaper}>
            <LogIn callRegister={this.handleOpenRegister} login={this.needRefresh}/>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }


  onChangeCity({suggestion}) {
    this.setState({gps: suggestion.latlng, city: suggestion.name})
  }

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
  }


  modalRegister = classes => {
    return(
      <Dialog
        scroll={'paper'}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        className={classes.navbarModal}
        open={this.state.setOpenRegister}
        onClose={this.handleCloseRegister}
        TransitionComponent={Transition}
        disableEscapeKeyDown={true}
      >
        <DialogTitle id="customized-dialog-title" onClose={this.handleCloseRegister}/>
        <DialogContent dividers={false} className={classes.navbarMuidialogContent}>
          <Grid className={classes.navbarPaper}>
            <Register callLogin={this.handleOpenLogin} sendParentData={this.getData}/>
          </Grid>
        </DialogContent>
      </Dialog>
    )
  }

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
              <h3 style={{margin: 0}}>{this.state.mobileStepSearch === 0 ? ReactHtmlParser(this.props.t('SEARCHBAR.looking_for_service')) : this.state.mobileStepSearch === 1 ? ReactHtmlParser(this.props.t('SEARCHBAR.where')) : ReactHtmlParser(this.props.t('SEARCHBAR.dates'))}</h3>
            </Grid>
          </Grid>
          <Grid item container spacing={3} style={{margin: 0}}>
            <Grid item xs={12} style={{display: 'flex', justifyContent: 'center', paddingBottom: 0, paddingTop: 0}}>
              {
                this.state.mobileStepSearch === 0 ?
                  <TextField
                    value={this.state.keyword}
                    onChange={this.onChange}
                    name={'keyword'}
                    label={ReactHtmlParser(this.props.t('SEARCHBAR.what_placeholder'))}
                    onKeyPress={e => {
                      e.key === 'Enter' && e.preventDefault()
                    }}
                    variant="outlined"
                    classes={{root: classes.modalMobileSearchBarInputTextField}}
                  />
                  :
                  this.state.user ?
                    <Grid>
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
                              { _id=='main' ? ReactHtmlParser(this.props.t('SEARCHBAR.main_adress')) : `${value.label},${formatAddress(value)}`}
                            </MenuItem>
                          ))}                          ))}
                          <MenuItem value={'all'}>
                            {ReactHtmlParser(this.props.t('SEARCHBAR.find_everywhere'))}
                          </MenuItem>
                          <MenuItem value={'addAddress'}>
                            <Typography style={{color: '#2FBCD3', cursor: 'pointer'}}>
                              {ReactHtmlParser(this.props.t('SEARCHBAR.add_adresses'))}
                            </Typography>
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    :
                    <TextField
                      item
                      xs={12}
                      classes={{root: classes.modalMobileSearchBartTextFieldWhereP}}
                      value={this.state.city}
                      label={ReactHtmlParser(this.props.t('SEARCHBAR.where'))}
                      variant={'outlined'}
                      InputProps={{
                        inputComponent: inputref => {
                          return (
                            <AlgoliaPlaces
                              {...inputref}
                              placeholder={''}
                              className={classes.navbarAlgoliaPlace}
                              options={{
                                appId: 'plKATRG826CP',
                                apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                                language: 'fr',
                                countries: ['fr'],
                                type: 'city',
                              }}
                              onChange={suggestion => this.onChangeCity(suggestion)}
                              onClear={() => this.setState({city: '', gps: ''})}

                            />)
                        },
                        disableUnderline: true,
                      }}
                    />
              }
            </Grid>
          </Grid>
          <Grid item xs={12} style={{display: 'flex', justifyContent: 'center'}}>
            <Grid style={{width: '90%'}}>
              <CustomButton
                onClick={() => (this.state.mobileStepSearch === 0 ? this.setState({mobileStepSearch: this.state.mobileStepSearch + 1}) : this.findService())}
                color={'primary'} classes={{root: classes.buttonNextRoot}}
                variant={'contained'}>{this.state.mobileStepSearch === 0 ? ReactHtmlParser(this.props.t('SEARCHBAR.next_button')) : ReactHtmlParser(this.props.t('SEARCHBAR.find_button'))}
              </CustomButton>
            </Grid>
          </Grid>
        </Grid>
      </SwipeableDrawer>
    )
  }

  render() {
    const{classes, currentIndex} = this.props
    const{setOpenLogin, setOpenRegister, modalMobileSearchBarInput, logged} = this.state

    return(
      <BottomNavigation
        value={currentIndex}
        showLabels
        classes={{root: classes.navigationRoot}}
      >
        <BottomNavigationAction onClick={() => Router.push('/')} label={ReactHtmlParser(this.props.t('SEARCHBAR.label_mobile_home'))} classes={{root: classes.navigationActionRoot, label: classes.label}} value={0} icon={<HomeIcon/>}/>
        <BottomNavigationAction onClick={() => this.setState({modalMobileSearchBarInput: true})} label={ReactHtmlParser(this.props.t('SEARCHBAR.label_explore'))} classes={{root: classes.navigationActionRoot, label: classes.label}} value={1} icon={<SearchIcon/>}/>
        {
          logged ?
            <BottomNavigationAction onClick={() => Router.push('/reservations/reservations')} label={ReactHtmlParser(this.props.t('SEARCHBAR.label_resa'))} classes={{root: classes.navigationActionRoot, label: classes.label}} value={2} icon={<CalendarTodayIcon/>}/> : null
        }
        {
          logged ?
            <BottomNavigationAction onClick={() => Router.push(`/profile/messages?user=${this.state.user._id}`)} label={ReactHtmlParser(this.props.t('SEARCHBAR.label_message'))} classes={{root: classes.navigationActionRoot, label: classes.label}} value={3} icon={<MailOutlineIcon/>}/> : null

        }
        <BottomNavigationAction onClick={logged ? () => Router.push('/account/myProfile') : this.handleOpenLogin} label={logged ? ReactHtmlParser(this.props.t('SEARCHBAR.label_profil')) : ReactHtmlParser(this.props.t('SEARCHBAR.label_log'))} classes={{root: classes.navigationActionRoot, label: classes.label}} value={4} icon={ <PersonIcon/>}/>
        {
          !logged ?
            <BottomNavigationAction onClick={this.handleOpenRegister} label={ReactHtmlParser(this.props.t('SEARCHBAR.label_signin'))} classes={{root: classes.navigationActionRoot, label: classes.label}} value={5} icon={ <GroupAddIcon/>}/> : null
        }
        {setOpenLogin ? this.modalLogin(classes) : null}
        {setOpenRegister ? this.modalRegister(classes) : null}
        {modalMobileSearchBarInput ? this.modalMobileSearchBarInput(classes) : null}

      </BottomNavigation>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(MobileNavbar))
