import {is_production} from '../../config/config'
const {
  getLoggedUserId,
  getRole,
  isAlfredRegistering,
  isLoggedUserRegistered,
  removeAlfredRegistering,
} = require('../../utils/context')
const {isPhoneOk} = require('../../utils/sms')
import {EMPLOYEE, REGISTER_MODE} from '../../utils/consts'
import CustomButton from '../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
const {snackBarSuccess, snackBarError} = require('../../utils/notifications')
const {setAuthToken, setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import axios from 'axios'
import Grid from '@material-ui/core/Grid'
import {registerLocale} from 'react-datepicker'
import fr from 'date-fns/locale/fr'
import styles from './RegisterStyle'
import {withStyles} from '@material-ui/core/styles'
import MobileStepper from '@material-ui/core/MobileStepper'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import Router from 'next/router'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
let parse = require('url-parse')
const moment=require('moment')
const {STEPS}=require('../../utils/registerSteps')


registerLocale('fr', fr)

class Register extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      firstname: '',
      name: '',
      day: '',
      month: '',
      year: '',
      email: '',
      password: '',
      password2: '',
      address: '',
      city: '',
      zip_code: '',
      country: '',
      checked: false,
      errors: {},
      lat: '',
      lng: '',
      activeStep: 0,
      file: null,
      picture: '',
      // Avatar link coming from Google or Facebook
      avatar: null,
      value: '',
      phone: '',
      phoneOk: false,
      // Phone sendVerificationSMS
      smsCodeOpen: false, // Show/hide SMS code modal
      smsCode: '', // Typed SMS code
      smsError: null,
      phoneConfirmed: false,
      serverError: false, // Si erreur serveur pour l''envoi du SMS, continuer quand même
      errorEmailType: '',
      emailValidator: false,
      secondPageValidator: true,
      errorExistEmail: false,
      birthdayError: '',
      cityError: '',
      pending: false,
      open: false,
      showPassword: false,
      showPassword2: false,
      company: null,
    }
    this.handleChecked = this.handleChecked.bind(this)
    this.onChangeAddress = this.onChangeAddress.bind(this)
  }

  componentDidMount() {
    if (getLoggedUserId() && isLoggedUserRegistered()) {
      snackBarError(ReactHtmlParser(this.props.t('REGISTER.snackbar_already_logged')))
      window.location = '/'
    }

    let query = parse(window.location.href, true).query
    if (query.google_id) {
      this.setState({
        google_id: query.google_id,
        email: query.email,
        name: query.lastname,
        firstname: query.firstname,
        picture: query.picture,
        file: query.picture,
        avatar: query.picture,
      })
    }
    if (query.facebook_id) {
      this.setState({
        facebook_id: query.facebook_id,
        email: query.email,
        name: query.lastname,
        firstname: query.firstname,
        activeStep: 1,
        avatar: query.picture,
      })
    }
    if (this.props.user_id) {
      axios.get(`/myAlfred/api/users/users/${this.props.user_id}`)
        .then(result => {
          const user=result.data
          this.setState({
            firstname: user.firstname,
            name: user.name,
            day: moment(user.birthday).date,
            month: moment(user.birthday).month+1,
            year: moment(user.birthday).year,
            email: user.email,
            phone: user.phone,
            emailValidator: true,
          })
          if (user.billing_address) {
            const address=user.billing_address
            this.setState({
              address: address.address,
              city: address.city,
              zip_code: address.zip_code,
              country: address.country,
              lat: address.gps.lat,
              lng: address.gps.lng,
            })
          }
        })
        .catch(err => {
          console.error(err)
        })
    }
    if (query.error) {
      this.setState({errorExistEmail: true})
    }
    setTimeout(this.validate, 500)
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.activeStep !== prevState.activeStep) {
      this.props.sendParentData(this.state.activeStep)
    }
  }

  validate = () => {
    const errors=this.getValidator(this)(this)
    this.setState({errors: errors})
  }

  onChange = e => {
    const {name, value}=e.target
    this.setState({[name]: value}, this.validate)
  };

  onCompanyChange = company => {
    this.setState({company: company})
  }

  onChangePhone = e => {
    let {name, value} = e.target
    this.setState({[name]: value})
    if (name === 'phone') {
      const phoneOk = isPhoneOk(value)
      if (phoneOk && value.startsWith('0')) {
        value = `33${ value.substring(1)}`
      }
      this.setState({'phone': value, phoneOk: isPhoneOk(value)})
    }
  };

  onChangePicture = e => {
    this.setState({picture: e.target.files[0]}, this.validate)
  };

  handleChange(event) {
    this.setState({
      file:
        event.target.files[0] ? URL.createObjectURL(event.target.files[0]) : null,
    }, this.validate)
  }

  onChangeAddress(result) {
    if (result) {
      const suggestion = result.suggestion
      this.setState({
        city: suggestion.city, address: suggestion.name, zip_code: suggestion.postcode, country: suggestion.country,
        lat: suggestion.latlng.lat, lng: suggestion.latlng.lng,
      }, this.validate)
    }
    else {
      this.setState({
        city: null, address: null, zip_code: null, country: null,
        lat: null, lng: null,
      }, this.validate)
    }
  }

  handleChecked = () => {
    this.setState({checked: !this.state.checked}, () => this.validatorSecondStep())
  };

  sendSms = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/users/sendSMSVerification', {phone: this.state.phone})
      .then(res => {
        let txt = is_production() ? ReactHtmlParser(this.props.t('REGISTER.snackbar_sms_send')) : `Dev : le code est ${res.data.sms_code}`
        snackBarSuccess(txt)
        this.setState({smsCodeOpen: true})
      })
      .catch(() => {
        snackBarError(ReactHtmlParser(this.props.t('REGISTER.snackbar_sms_error')))
        this.setState({serverError: true})
      })
  };

  checkSmsCode = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/users/checkSMSVerification', {sms_code: this.state.smsCode})
      .then(res => {
        if (res.data.sms_code_ok) {
          snackBarSuccess(ReactHtmlParser(this.props.t('REGISTER.snackbar_phone_valid')))
          this.setState({smsCodeOpen: false, phoneConfirmed: true})
          if(isAlfredRegistering()) {
            removeAlfredRegistering()
            Router.push('/creaShop/creaShop')
          }
          else if (getRole() == EMPLOYEE) {
            Router.push('/search')
          }
        }
        else {
          snackBarError(ReactHtmlParser(this.props.t('REGISTER.snackbar_error_code_phone')))
        }
      })
      .catch(() => {
        snackBarError(ReactHtmlParser(this.props.t('REGISTER.snackbar_error_check_phone')))
      })
  };

  onSubmit = () => {

    const {day, month, year}=this.state
    this.setState({pending: true})
    const newUser = {
      google_id: this.state.google_id,
      facebook_id: this.state.facebook_id,
      firstname: this.state.firstname,
      name: this.state.name,
      birthday: moment().set({date: day, month: month-1, year: year}),
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
      address: this.state.address,
      zip_code: this.state.zip_code,
      city: this.state.city,
      country: this.state.country,
      lat: this.state.lat,
      lng: this.state.lng,
      company: this.state.company,
      is_alfred: isAlfredRegistering(),
    }

    const username = this.state.email
    const password = this.state.password
    const google_id = this.state.google_id
    const facebook_id = this.state.facebook_id

    this.setState({cityError: null, birthdayError: null})

    axios
      .post('/myAlfred/api/users/register', newUser)
      .then(() => {
        axios.post('/myAlfred/api/users/login', {username, password, google_id, facebook_id})
          .then(() => {
            setAuthToken()
            setAxiosAuthentication()
          })
          .catch(err => {
            this.setState({pending: false})
            console.error(err)
          })
          .then(() => {
            if(isAlfredRegistering()) {
              this.submitPhone()
            }
            else{
              this.setState({activeStep: this.state.activeStep + 1})
            }
          },
          )
          .catch(
            err => {
              console.error(err)
            },
          )
          .then(() => {
            if(!isAlfredRegistering()) {
              this.submitPhone()
            }
          },
          ).catch(
            err => {
              console.error(err)
            })
      })
      .catch(err => {
        this.setState({pending: false})
        const errors = err.response.data
        const errKeys = Object.keys(errors)
        this.setState({errors: err.response.data})
        if (errKeys.includes('email')) {
          this.setState({activeStep: this.getEmailStep()})
        }
        if (errKeys.includes('address')) {
          this.setState({cityError: errors.address, activeStep: this.getAddressStep()})
        }
        if (errKeys.includes('birthday')) {
          this.setState({birthdayError: errors.birthday, activeStep: this.getBirthdayStep()})
        }
      })
  };

  submitPhone = () => {

    if(!this.state.phone && isAlfredRegistering()) {
      Router.push('/creaShop/creaShop')
    }

    // Don't send empty phone number
    if (!this.state.phone) {
      return
    }
    if (!this.state.phoneConfirmed && !this.state.serverError) {
      this.sendSms()
    }

    const newPhone = {
      phone: this.state.phone,
      phone_confirmed: this.state.phoneConfirmed,
    }

    setAxiosAuthentication()
    axios
      .put('/myAlfred/api/users/profile/phone', newPhone)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('REGISTER.snackbar_phone_add')))
      })
      .catch(err =>
        console.error(err),
      )
  };

  onChangeBirthdayDate = e => {
    this.setState({day: e.target.value}, this.validate)
  };

  onChangeBirthdayMonth = e => {
    this.setState({month: e.target.value}, this.validate)
  };

  onChangeBirthdayYear = e => {
    this.setState({year: e.target.value}, this.validate)
  };

  onChangeCompany = comp => {
    this.setState({company: comp}, this.validate)
  }

  confirmLater = () => {
    this.setState({smsCodeOpen: false})
    if(isAlfredRegistering()) {
      removeAlfredRegistering()
      Router.push('/creaShop/creaShop')
    }
  };

  validatorSecondStep = () => {
    if (this.state.checked) {
      this.setState({secondPageValidator: false})
    }
    else {
      this.setState({secondPageValidator: true})
    }
  };

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword})
  };

  handleClickShowPassword2 = () => {
    this.setState({showPassword2: !this.state.showPassword2})
  };

  handleMouseDownPassword = event => {
    event.preventDefault()
  };

  getSteps = () => {
    let mode = isAlfredRegistering() ? REGISTER_MODE.INCOMPLETE : REGISTER_MODE.COMPLETE
    return STEPS[mode]
  }

  renderSwitch = stepIndex => {
    return this.getSteps()[stepIndex].component(this)
  }

  getPagesCount = () => {
    return this.getSteps().length
  }

  getValidator = () => {
    return this.getSteps()[this.state.activeStep].validator
  }

  getSubmitStep = () => {
    if (isAlfredRegistering()) {
      return this.getPagesCount()-1
    }
    return this.getPagesCount()-2
  }

  getEmailStep = () => {
    if (isAlfredRegistering()) {
      return 0
    }
    return 1
  }

  getBirthdayStep = () => {
    if (isAlfredRegistering()) {
      return 1
    }
    return 2
  }

  showButtons = () => {
    const {activeStep}=this.state
    if (isAlfredRegistering()) {
      return true
    }
    return activeStep < this.getPagesCount() -1
  }

  handleNext = activeStep => {
    if (activeStep === this.getSubmitStep()) {
      this.onSubmit()
    }
    else {
      this.setState({activeStep: this.state.activeStep + 1}, this.validate)
    }
  };


  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1})
  };

  dialogPhone = () => {
    return(
      <Dialog open={this.state.smsCodeOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title" className={'customregisterdialogtitle'}>{ReactHtmlParser(this.props.t('REGISTER.dialog_phone_title'))}</DialogTitle>
        <DialogContent>
          <DialogContentText className={'customregisterdialogsubtitle'}>{ReactHtmlParser(this.props.t('REGISTER.dialog_phone_content'))}</DialogContentText>
          <TextField
            autoFocus
            id="name"
            label={ReactHtmlParser(this.props.t('REGISTER.textfield_code'))}
            type="number"
            placeholder="0000"
            maxLength="4"
            name={'smsCode'}
            value={this.state.smsCode}
            onChange={e => this.onChange(e)}
            fullWidth
            errors={this.state.smsError}
          />
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => this.confirmLater()} color="primary" classes={{root: 'customregisterdialogconfirmlater'}}>
            {ReactHtmlParser(this.props.t('REGISTER.dialog_phone_confirm_later'))}
          </CustomButton>
          <CustomButton
            classes={{root: 'customregisterdialogconfirm'}}
            disabled={this.state.smsCode.length !== 4}
            onClick={() => this.checkSmsCode()}
            color="primary">
            {ReactHtmlParser(this.props.t('COMMON.btn_confirm'))}
          </CustomButton>
        </DialogActions>
      </Dialog>
    )
  }


  render() {
    const {classes, callLogin} = this.props
    const {smsCodeOpen, activeStep, pending, errors} = this.state

    const enableNext = Object.keys(errors).length==0 && !pending
    return (
      <Grid className={classes.fullContainer}>
        <Grid>
          <Grid className={classes.newContainer}>
            {
              activeStep === 0 ?
                <Grid>
                  <h2 className={`customregistertitle ${classes.titleRegister}`}>{ReactHtmlParser(this.props.t('REGISTER.title'))}</h2>
                </Grid> : null
            }
            <Grid className={classes.containerSwitch}>
              {this.renderSwitch(activeStep)}
            </Grid>
            {
              this.showButtons() &&
              <Grid style={{marginTop: 10}}>
                <hr/>
                <Grid>
                  <MobileStepper
                    variant="progress"
                    steps={2}
                    position="static"
                    activeStep={activeStep}
                    className={classes.rootStepper}
                    classes={{
                      progress: `customregisterprogress ${classes.progress}`,
                    }}
                    nextButton={
                      <CustomButton size="small" onClick={() => this.handleNext(activeStep)}
                        disabled={!enableNext}
                        classes={{root: 'customregisternavnext'}}>
                        {activeStep == this.getSubmitStep() ? ReactHtmlParser(this.props.t('REGISTER.finish_button')) : ReactHtmlParser(this.props.t('REGISTER.next_button'))}
                        <KeyboardArrowRight/>
                      </CustomButton>
                    }
                    backButton={
                      <CustomButton size="small" onClick={this.handleBack} disabled={activeStep === 0} classes={{root: 'customregisternavprev'}}>
                        <KeyboardArrowLeft/>
                        {ReactHtmlParser(this.props.t('REGISTER.previous_button'))}
                      </CustomButton>
                    }
                  />
                </Grid>
                <Grid container className={classes.bottomContainer}>
                  <Grid item>
                    <a color={'primary'} onClick={callLogin} style={{color: '#2FBCD3', cursor: 'pointer'}} className={'customregisteralreadyaccount'}>{ReactHtmlParser(this.props.t('REGISTER.link_already_account'))}</a>
                  </Grid>
                </Grid>
              </Grid>
            }
          </Grid>
        </Grid>
        {smsCodeOpen ? this.dialogPhone(classes) : null}
      </Grid>
    )
  }

}

export default withTranslation(null, {withRef: true})(withStyles(styles)(Register))
