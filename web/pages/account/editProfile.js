import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
const {snackBarSuccess, snackBarError} = require('../../utils/notifications')
const {clearAuthenticationToken, setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import axios from 'axios'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import {withStyles} from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import MenuItem from '@material-ui/core/MenuItem'
import {Helmet} from 'react-helmet'
import styles from '../../static/css/pages/profile/editProfile/editProfile'
import LayoutAccount from '../../hoc/Layout/LayoutAccount'
import LayoutMobile from '../../hoc/Layout/LayoutMobile'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
const {MAX_DESCRIPTION_LENGTH} = require('../../utils/consts')
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import DateField from '../../components/DateField/DateField'
const {is_production}=require('../../config/config')
const {isPhoneOk} = require('../../utils/sms')
const moment = require('moment')
import '../../static/assets/css/custom.css'
import {EDIT_PROFIL} from '../../utils/i18n'
moment.locale('fr')

class editProfile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      phone: '',
      languages: [],
      birthday: null,
      errors: {},
      openErrors: false,
      smsCodeOpen: false,
      smsCode: '',
      checkPhoneMessage: '',
      checkPhoneSeverity: '',
      checkPhoneState: false,
      userEmail: '',
      checkEmailSeverity: '',
      checkEmailState: false,
      checkEmailMessage: '',
    }
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    this.loadUser()
  }

  loadUser = () => {
    setAxiosAuthentication()
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({
          birthday: user.birthday,
          user: user,
          phone: user.phone,
          userEmail: user.email,
        })
      })
      .catch(err => {
        console.error(err)
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      },
      )
  };

  onChange = e => {
    const state = this.state.user
    let {name, value} = e.target

    if (name === 'phone') {
      const phoneOk = isPhoneOk(value)
      if (phoneOk && e.target.value.startsWith('0')) {
        value = `33${ value.substring(1)}`
      }
    }
    if (name === 'description') {
      value = value.slice(0, MAX_DESCRIPTION_LENGTH)
    }
    state[e.target.name] = value
    this.setState({user: state})
  };


  onChangeName = event => {
    const state = this.state.user
    let value = event.target.value

    if (!value.match(/[0-9^@.&²"#{|(`)°=+},?;:/!\]\[§*$£µ%*\\<>~¤]/)) {
      value = value.charAt(0).toUpperCase() + value.slice(1)
      state[event.target.name] = value
      this.setState({user: state})
    }
  };

  onChangePhone = event => {
    let value = event.target.value
    if (value.match(/^[0-9]*$/) && value.length < 12) {
      this.setState({phone: value})
    }
    else {
      const phoneOk = isPhoneOk(value)
      if (phoneOk && value.startsWith('0')) {
        this.setState({phone: `33${ value.substring(1)}`})
      }
    }
  };

  submitPhone = () => {
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
      .then()
      .catch(err =>
        console.error(err),
      )
  };

  sendEmail = () => {
    axios.get('/myAlfred/api/users/sendMailVerification')
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('EDIT_PROFIL.email_send')))
      })
      .catch(() => {
        snackBarError(ReactHtmlParser(this.props.t('EDIT_PROFIL.error_email')))
      })
  };

  sendSms = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/users/sendSMSVerification', {phone: this.state.phone})
      .then(res => {
        this.setState({smsCodeOpen: true}, () => this.onSubmit())
        let txt = is_production() ? ReactHtmlParser(this.props.t('EDIT_PROFIL.sms_send')) : `Dev : le code est ${res.data.sms_code}`
        snackBarSuccess(txt)
      })
      .catch(err => {
        console.error(err)
        this.setState({
          smsCodeOpen: true,
          serverError: true,
        })
        snackBarError(ReactHtmlParser(this.props.t('EDIT_PROFIL.sms_error')))
      })
  };

  checkSmsCode = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/users/checkSMSVerification', {sms_code: this.state.smsCode})
      .then(res => {
        if (res.data.sms_code_ok) {
          this.setState({
            smsCodeOpen: false,
            phoneConfirmed: true,
          }, () => this.onSubmit())
          snackBarSuccess(ReactHtmlParser(this.props.t('EDIT_PROFIL.validate_phone')))
        }
        else {
          snackBarError(ReactHtmlParser(this.props.t('EDIT_PROFIL.incorrect_code')))
        }
      })
      .catch(() =>
        snackBarError(ReactHtmlParser(this.props.t('EDIT_PROFIL.error_verif_code'))),
      )
  };

  dialogConfirmPhone = () => {
    return (
      <Dialog open={this.state.smsCodeOpen} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{ReactHtmlParser(this.props.t('EDIT_PROFIL.dialog_title_phone'))}</DialogTitle>
        <DialogContent>
          <DialogContentText>{ReactHtmlParser(this.props.t('EDIT_PROFIL.dialog_text_phone'))}</DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Code"
            type="number"
            placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.dialog_textfield_placeholder'))}
            maxLength="4"
            value={this.state.smsCode}
            onChange={e => {
              this.setState({smsCode: e.target.value})
            }}
            fullWidth
            errors={this.state.smsError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => this.setState({smsCodeOpen: false}, () => this.onSubmit())} color="primary">
            {ReactHtmlParser(this.props.t('EDIT_PROFIL.dialog_button_confirm_later'))}
          </Button>
          <Button
            disabled={this.state.smsCode.length !== 4}
            onClick={() => this.checkSmsCode()}
            color="primary">
            {ReactHtmlParser(this.props.t('COMMON.btn_confirm'))}
          </Button>
        </DialogActions>
      </Dialog>
    )
  };


  onChangeBirthday = e => {
    this.setState({birthday: e.target.value})
  };

  onSubmit = () => {
    const birthday = this.state.birthday
    const {email, name, firstname, description, gender, job, diplomes, school} = this.state.user
    const {phone} = this.state

    axios.put('/myAlfred/api/users/profile/editProfile', {
      email, name, firstname, birthday, description, gender, phone, job, diplomes, school,
    })
      .then(() => {
        snackBarSuccess(EDIT_PROFIL.snackbar_profil_update)
        this.setState({errors: {}}, () => this.loadUser())
      })
      .catch(err => {
        err.response ?
          snackBarError(err.response.data) : null
      })
  };

  content = classes => {
    const {errors, user, phone, userEmail, birthday} = this.state

    return (
      <Grid>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2>{ReactHtmlParser(this.props.t('EDIT_PROFIL.title'))}</h2>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid container spacing={3} style={{marginTop: '5vh'}}>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              classes={{root: `customeditprofiltextfield ${classes.textField}`}}
              value={user.firstname || ''}
              onChange={this.onChangeName}
              name={'firstname'}
              placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_firstname'))}
              variant={'outlined'}
              label={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_firstname'))}
              error={!!(errors && errors.firstname)}
            />
          </Grid>
          <Grid item lg={6} md={12} sm={12} xs={12}>
            <TextField
              classes={{root: `customeditprofiltextfield ${classes.textField}`}}
              value={user.name || ''}
              onChange={this.onChangeName}
              name={'name'}
              placeholder={ReactHtmlParser(this.props.t('COMMON.lbl_name'))}
              variant={'outlined'}
              label={ReactHtmlParser(this.props.t('COMMON.lbl_name'))}
              error={!!(errors && errors.name)}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={'customeditprofilabout'}>
            <TextField
              classes={{root: `customeditprofiltextfield ${classes.textField}`}}
              value={user.description || ''}
              multiline
              rows={5}
              variant={'outlined'}
              onChange={this.onChange}
              name={'description'}
              label={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_about_me'))}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}
            style={{display: 'flex', alignItems: 'flex-end', width: '100%', flexDirection: 'column'}}>
            <Typography className={'customeditprofillimit'}>{ReactHtmlParser(this.props.t('EDIT_PROFIL.char_max', {maxchars: MAX_DESCRIPTION_LENGTH}))}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h2 className={'custometiprofiltitleinfo'} style={{whiteSpace: 'nowrap'}}>{ReactHtmlParser(this.props.t('EDIT_PROFIL.personnal_info'))}</h2>
          </Grid>
          <Grid container spacing={3} style={{marginTop: '10vh'}}>
            <Grid item xl={6} lg={6} xs={12} sm={12} md={12}>
              <TextField
                classes={{root: `customeditprofiltextfield ${classes.textField}`}}
                value={user.gender || ''}
                select
                variant={'outlined'}
                onChange={this.onChange}
                name={'gender'}
                placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.gender'))}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.gender'))}
              >
                <MenuItem value={'Homme'}>
                  Homme
                </MenuItem>
                <MenuItem value={'Femme'}>
                  Femme
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xl={6} lg={6} xs={12} sm={12} md={12}>
              <DateField
                classes={{root: classes.textFieldDatePicker}}
                variant="outlined"
                value={birthday}
                onChange={this.onChangeBirthday}
                error={!!(errors && errors.birthday)}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} lg={6} md={12} sm={12} xl={6}>
              <TextField
                classes={{root: `customeditprofiltextfield ${classes.textField}`}}
                value={user.email || ''}
                onChange={this.onChange}
                name={'email'}
                placeholder={ReactHtmlParser(this.props.t('COMMON.lbl_email'))}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_email_label'))}
                error={!!(errors && errors.email)}
                InputProps={{
                  endAdornment: userEmail === user.email && user.is_confirmed === true ? <CheckCircleOutlineIcon /> : null,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6} md={12} sm={12} xl={6} style={{display: 'flex'}}>
              <Button
                variant="contained"
                color={'primary'}
                onClick={() => (user.is_confirmed ? this.onSubmit() : this.sendEmail())}
                disabled={user.email ? !!(userEmail === user.email && user.is_confirmed) : true}
                classes={{root: `customeditprofilcheckemail ${classes.buttonCheckPhone}`}}
              >
                {userEmail === user.email && user.is_confirmed === true ? ReactHtmlParser(this.props.t('EDIT_PROFIL.user_email_check')) : userEmail !== user.email ? ReactHtmlParser(this.props.t('EDIT_PROFIL.user_newemail_check')) : ReactHtmlParser(this.props.t('EDIT_PROFIL.check_your_email'))}
              </Button>
            </Grid>
            <Grid item xs={12} lg={6} md={12} sm={12} xl={6}>
              <TextField
                classes={{root: `customeditprofiltextfield ${classes.textField}`}}
                value={this.state.phone || ''}
                onChange={this.onChangePhone}
                name={'phone'}
                placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_phone'))}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_phone'))}
                InputProps={{
                  endAdornment: phone === user.phone && user.phone_confirmed === true ? <CheckCircleOutlineIcon /> : null,
                }}
              />
            </Grid>
            <Grid item xs={12} lg={6} md={12} sm={12} xl={6} style={{display: 'flex'}}>
              <Button
                variant="contained"
                color={'primary'}
                onClick={this.submitPhone}
                disabled={user.phone ? !!(phone === user.phone && user.phone_confirmed || user.phone.length !== 11) : true}
                classes={{root: `customeditprofilcheckphone ${classes.buttonCheckPhone}`}}
              >
                {phone === user.phone && user.phone_confirmed === true ? ReactHtmlParser(this.props.t('EDIT_PROFIL.user_phone_check')) : phone !== user.phone ? ReactHtmlParser(this.props.t('EDIT_PROFIL.user_newphone_check')) : ReactHtmlParser(this.props.t('EDIT_PROFIL.check_your_phone'))}
              </Button>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h2 className={'customeditprofillasttitle'}>{ReactHtmlParser(this.props.t('EDIT_PROFIL.user_info_options'))}</h2>
          </Grid>
          <Grid container style={{marginTop: '10vh'}} spacing={3}>
            <Grid item xs={12} lg={12} md={12} sm={12} className={'customeditprofildiploma'}>
              <TextField
                classes={{root: `customeditprofiltextfield ${classes.textField}`}}
                value={user.diplomes || ''}
                onChange={this.onChangeName}
                name={'diplomes'}
                placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_user_diploma'))}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_user_diploma'))}
              />
            </Grid>
            <Grid item xs={12} lg={12} md={12} sm={12} className={'customeditprofilschool'}>
              <TextField
                classes={{root: `customeditprofiltextfield ${classes.textField}`}}
                value={user.school || ''}
                onChange={this.onChangeName}
                name={'school'}
                placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_user_school'))}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_user_school'))}
              />
            </Grid>
            <Grid item xs={12} lg={12} md={12} sm={12} className={'customeditprofiljob'}>
              <TextField
                classes={{root: `customeditprofiltextfield ${classes.textField}`}}
                value={user.job || ''}
                onChange={this.onChangeName}
                name={'job'}
                placeholder={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_user_job'))}
                variant={'outlined'}
                label={ReactHtmlParser(this.props.t('EDIT_PROFIL.textfield_user_job'))}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid style={{marginBottom: '12vh'}}>
          <Grid style={{display: 'flex', justifyContent: 'flex-end', marginTop: '5vh'}}>
            <Button
              onClick={this.onSubmit}
              variant="contained"
              color="primary"
              classes={{root: `customeditprofilsave ${classes.button}`}}
            >
              {ReactHtmlParser(this.props.t('COMMON.btn_save'))}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  };

  render() {
    const {classes} = this.props
    const {user, smsCodeOpen} = this.state

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Profil - Modifier mon profil - My Alfred </title>
          <meta property="description"
            content="Plateforme d’échange de services entre particuliers. Services rémunérés à des prix justes ! Profitez des talents de nos Alfred et trouvez un Alfred bricoleur, petsitter, pâtissier, décorateur, près de chez vous dans toute la france ! Des milliers de services proposés, trouvez le vôtre !"/>
        </Helmet>
        <Grid className={classes.layoutAccountContainer}>
          <LayoutAccount>
            {this.content(classes)}
          </LayoutAccount>
        </Grid>
        <Grid className={classes.layoutMobileContainer}>
          <LayoutMobile currentIndex={4}>
            {this.content(classes)}
          </LayoutMobile>
        </Grid>
        {smsCodeOpen ? this.dialogConfirmPhone(classes) : null}
      </React.Fragment>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(editProfile))
