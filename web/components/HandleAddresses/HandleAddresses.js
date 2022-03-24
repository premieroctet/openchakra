import CustomButton from '../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/HandleAddresses/HandleAddresses'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import AlgoliaPlaces from 'algolia-places-react'
import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import axios from 'axios'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Router from 'next/router'
import {clearAuthenticationToken, setAxiosAuthentication} from '../../utils/authentication'
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined'
import '../../static/assets/css/custom.css'
import {HANDLE_ADDRESSES} from '../../utils/i18n'

class HandleAddresses extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null,
      suggestion_current: null,
      new_label: '',
      edit_label: '',
      service_address: [],
      addNewMode: false,
      open: false,
      selected_address: null,
      delete_address_id: '',
    }
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    this.loadData()
  }

  loadData = () => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({
          user: user,
          billing_address: user.billing_address,
          service_address: user?.service_address,
          new_label: '',
          edit_label: '',
          selected_address: null,
          delete_address_id: '',
        })
        this.address_get_url = '/myAlfred/api/users/profile/address/'
        this.main_address_put_url = '/myAlfred/api/users/profile/billingAddress'
        this.service_address_put_url = '/myAlfred/api/users/profile/serviceAddress'
        this.service_address_edit_url = '/myAlfred/api/users/profile/address/'
        this.service_address_delete_url = '/myAlfred/api/users/profile/address/'
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })
  }

  onDeleteClick = id => {
    this.setState({delete_address_id: id, open: true})
  }

  handleClose = () => {
    this.setState({delete_address_id: '', open: false})
  }

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  onNewAddressChange = ({suggestion}) => {
    this.setState({suggestion_new: suggestion})
  }

  onSecondaryAddressChange =({suggestion}) => {
    this.setState({suggestion_edit: suggestion})
  }

  onMainAddressChange = ({suggestion}) => {
    this.setState({suggestion_current: suggestion})
  }

  onEditionClick = id => {
    axios.get(this.address_get_url + id)
      .then(res => {
        let result = res.data
        this.setState({
          selected_address: result,
          edit_label: result.label,
          addNewMode: false,
        })
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
      })
  };

  onSubmitMain = e => {
    e.preventDefault()
    const {suggestion_current} = this.state

    const address = {
      address: suggestion_current.name,
      city: suggestion_current.city,
      zip_code: suggestion_current.postcode,
      country: suggestion_current.country,
      gps: {
        lat: suggestion_current.latlng.lat,
        lng: suggestion_current.latlng.lng,
      },
    }
    axios
      .put(this.main_address_put_url, address)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.snackbar_addresses_update')))
        this.loadData()
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
      })
  };

  onSubmitNew = e => {
    e.preventDefault()
    const {suggestion_new} = this.state
    const newAddress = {
      address: suggestion_new.name,
      city: suggestion_new.city,
      zip_code: suggestion_new.postcode,
      country: suggestion_new.country,
      lat: suggestion_new.latlng.lat,
      lng: suggestion_new.latlng.lng,
      label: this.state.new_label,
    }
    axios.put(this.service_address_put_url, newAddress)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.snackbar_addresses_add')))
        this.setState({addNewMode: false}, () => this.loadData())
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
      })
  };

  addressLabel = addr => {
    if (!addr) {
      return ''
    }
    return `${addr.address}, ${addr.zip_code} ${addr.city}, ${addr.country || 'France'}`
  }

  onSubmitSecondary = (e, id) => {
    e.preventDefault()
    const {suggestion_edit, selected_address} = this.state
    const editAddress = suggestion_edit ?
      {
        address: suggestion_edit.name,
        city: suggestion_edit.city,
        zip_code: suggestion_edit.postcode,
        lat: suggestion_edit.latlng.lat,
        lng: suggestion_edit.latlng.lng,
        label: this.state.edit_label,
      }
      :
      {
        address: selected_address.address,
        city: selected_address.city,
        zip_code: selected_address.zip_code,
        lat: selected_address.lat,
        lng: selected_address.lng,
        label: this.state.edit_label,
      }

    axios.put(this.service_address_edit_url + id, editAddress)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.snackbar_addresses_update_success')))
        this.setState({selected_address: null}, () => this.loadData())
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
      })
  };


  deleteAddress = id => {
    axios.delete(this.service_address_delete_url + id)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.snackbar_addresses_delete')))
        this.setState({selected_address: null, open: false, delete_address_id: ''}, () => this.loadData())
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
      })
  };

  modalDeleteAddress = classes => {
    return (
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.dialog_delete_title'))}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.dialog_delete_content'))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => this.handleClose()} color="primary">
            {ReactHtmlParser(this.props.t('COMMON.btn_cancel'))}
          </CustomButton>
          <CustomButton onClick={() => this.deleteAddress(this.state.delete_address_id)} classes={{root: classes.cancelButton}}>
            {ReactHtmlParser(this.props.t('COMMON.btn_delete'))}
          </CustomButton>
        </DialogActions>
      </Dialog>
    )
  };

  render() {
    const {billing_address, selected_address, user, open}=this.state
    const {classes} = this.props

    return(
      <Grid>
        <Grid>
          <Grid>
            <Grid>
              <h3 className={'customhandleaddressestitle'}>{ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.title'))}</h3>
            </Grid>
            {this.addressLabel(billing_address)}
          </Grid>
          <Grid style={{marginTop: '5vh'}}>
            <Grid container spacing={3}>
              <Grid item xs={12} xl={12} lg={12} md={12} sm={12}>
                <AlgoliaPlaces
                  className={'customhandleaddressesalgolia'}
                  placeholder={ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.placeholder_algo'))}
                  options={{
                    appId: 'plKATRG826CP',
                    apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                    language: 'fr',
                    countries: ['fr'],
                    type: 'address',
                  }}
                  onChange={suggestion => this.onMainAddressChange(suggestion)}
                />
              </Grid>
              <Grid item xs={12} lg={12} xl={12} sm={12} md={12} style={{marginTop: '5vh'}}>
                <CustomButton disabled={!this.state.suggestion_current} size={'large'} type={'submit'} variant="contained"
                  classes={{root: `customhandleaddressessavebutton ${classes.buttonSave}`}} onClick={this.onSubmitMain}>
                  {ReactHtmlParser(this.props.t('COMMON.btn_validate'))}
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid style={{display: 'flex', alignItems: 'center'}}>
            <Grid>
              <h3 className={'customhandleaddressesbooktitle'}>{ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.book_title'))}</h3>
            </Grid>
            <Grid>
              <IconButton aria-label="AddCircleOutlineOutlinedIcon" onClick={() => this.setState({addNewMode: !this.state.addNewMode, selected_address: null})}>
                <AddCircleOutlineOutlinedIcon/>
              </IconButton>
            </Grid>
          </Grid>
          <Grid>
            <Typography className={'customhandleaddressessubtitlebook'} style={{color: 'rgba(39,37,37,35%)'}}>
              {ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.title_add_sites'))}
            </Typography>
          </Grid>
        </Grid>
        <Grid container style={{marginTop: '5vh'}}>
          {this.state?.service_address && this.state.service_address.map((e, index) => (
            <Grid key={index} style={{width: '100%'}}>
              <Grid>
                <Grid container style={{display: 'flex', alignItems: 'center'}}>
                  <Grid item xl={3} xs={6}>
                    {selected_address && selected_address._id == e._id ?
                      <TextField
                        id="standard-name"
                        value={this.state.edit_label}
                        onChange={this.onChange}
                        name={'edit_label'}
                        placeholder={ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.textfield_name_placeholder_add_sites'))}
                        variant={'outlined'}
                        label={ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.textfield_name_add_sites'))}
                        className={`customhandleaddressesname ${classes.textField}`}
                      />
                      :
                      <h4>{e.label}</h4>
                    }
                  </Grid>
                  <Grid item xl={2} xs={6} className={classes.editContainer}>
                    <Grid>
                      <IconButton aria-label="update" onClick={() => this.onEditionClick(e._id)}>
                        <EditIcon/>
                      </IconButton>
                    </Grid>
                    <Grid>
                      <IconButton aria-label="delete" onClick={() => this.onDeleteClick(e._id)}>
                        <DeleteForeverIcon/>
                      </IconButton>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>
                  {this.addressLabel(e)}
                </Typography>
                {selected_address && selected_address._id == e._id ?
                  <AlgoliaPlaces
                    className={'customhandleaddressesupdateaddresses'}
                    placeholder={ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.placeholder_algo'))}
                    options={{
                      appId: 'plKATRG826CP',
                      apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                      language: 'fr',
                      countries: ['fr'],
                      type: 'address',

                    }}
                    onChange={suggestion => this.onSecondaryAddressChange(suggestion)}
                  />
                  :
                  null
                }
              </Grid>
              {selected_address && selected_address._id == e._id ?
                <Grid item xs={12}>
                  <CustomButton variant="contained" className={`customhandleaddressesupdatebuttonsave ${classes.buttonSave}`}
                    onClick={event => this.onSubmitSecondary(event, this.state.selected_address._id)}>
                    {ReactHtmlParser(this.props.t('COMMON.btn_save'))}
                  </CustomButton>
                </Grid>
                :
                null
              }
            </Grid>
          ))}
        </Grid>
        {this.state.addNewMode ?
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                id="standard-name"
                value={this.state.new_label}
                onChange={this.onChange}
                name={'new_label'}
                placeholder={ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.textfield_name_placeholder_add_sites'))}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.textfield_name_addresses'))}
                className={`customhandleaddressesaddnewname ${classes.textField}`}
              />
            </Grid>
            <Grid item xs={12}>
              <AlgoliaPlaces
                className={'customhandleaddressesaddnewalgo'}
                placeholder={ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.algo_find_your_addresses'))}
                options={{
                  appId: 'plKATRG826CP',
                  apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                  language: 'fr',
                  countries: ['fr'],
                  type: 'address',
                }}
                onChange={suggestion => this.onNewAddressChange(suggestion)}
              />
            </Grid>
            <Grid item xs={12} style={{marginBottom: '12vh'}}>
              <CustomButton disabled={!(this.state.suggestion_new && this.state.new_label)} variant="contained"
                className={`customhandleaddressesaddnewbutton ${classes.buttonSave}`} onClick={this.onSubmitNew}>
                {ReactHtmlParser(this.props.t('HANDLE_ADDRESSES.button_add_new_adresses'))}
              </CustomButton>
            </Grid>
          </Grid>
          : null}
        <Grid>
          <Divider style={{height: 2, width: '100%', marginTop: '5vh'}}/>
        </Grid>
        {open ? this.modalDeleteAddress(classes) : null}
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(HandleAddresses))
