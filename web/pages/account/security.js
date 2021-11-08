import {COMPANY_NAME, SECURITY} from '../../utils/i18n'
import CustomButton from '../../components/CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
const {clearAuthenticationToken, setAxiosAuthentication, setAuthToken}=require('../../utils/authentication')
import React, {Fragment} from 'react'
import axios from 'axios'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import {withStyles} from '@material-ui/core/styles'
import {Helmet} from 'react-helmet'
import styles from '../../static/css/pages/security/security'
import IconButton from '@material-ui/core/IconButton'
import {checkPass1, checkPass2} from '../../utils/passwords'
import LayoutAccount from '../../hoc/Layout/LayoutAccount'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import Switch from '@material-ui/core/Switch'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import Dialog from '@material-ui/core/Dialog'
import LayoutMobile from '../../hoc/Layout/LayoutMobile'
import InputAdornment from '@material-ui/core/InputAdornment'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import Input from '@material-ui/core/Input'
const {snackBarSuccess} = require('../../utils/notifications')
import '../../static/assets/css/custom.css'

moment.locale('fr')

class security extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      password: '',
      newPassword: '',
      newPassword2: '',
      check: false,
      check1: false,
      check2: false,
      wrongPassword: false,
      last_login: [],
      index_google: false,
      alfred: false,
      open: false,
      open2: false,
      showCurrentPassword: false,
      showNewPassword: false,
      showConfirmPassword: false,
    }
    this.handleClose=this.handleClose.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    this.loadData()
  }

  loadData= () => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({
          user: user,
          last_login: user.last_login,
          index_google: user.index_google,
          alfred: user.is_alfred,
          password: '',
          newPassword: '',
          newPassword2: '',
          check: false,
          check1: false,
          check2: false,
          wrongPassword: false,
          isAdmin: user.is_admin,

        })
      })
      .catch(err => {
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      })
  };

  onChange = e => {
    this.setState({[e.target.name]: e.target.value})
  };

  onChangePassword = e => {
    this.setState({[e.target.name]: e.target.value, wrongPassword: false})
    if (e.target.value !== '') {
      this.setState({check: true})

    }
    else {
      this.setState({check: false})
    }
  };

  handleChange = name => event => {
    this.setState({[name]: event.target.checked})
    const data = {index_google: !this.state.index_google}
    axios.put('/myAlfred/api/users/account/indexGoogle', data)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('SECURITY.snackbar_account_update')))
      })
      .catch(err => { console.error(err) })
  };

  deleteShop = () => {
    axios.delete('/myAlfred/api/serviceUser/current/allServices')
      .then(() => {
        axios.delete('/myAlfred/api/shop/current/delete')
          .then(() => {
            axios.put('/myAlfred/api/users/users/deleteAlfred')
              .then(() => {
                this.setState({open: false})
                axios.get('/myAlfred/api/users/token')
                  .then(() => {
                    setAuthToken()
                    this.loadData()
                  })
              })
              .catch(err => { console.error(err) })
          })
          .catch(err => { console.error(err) })
      })
      .catch(err => { console.error(err) })
    axios.delete('/myAlfred/api/availability/currentAlfred')
      .then()
      .catch(err => { console.error(err) })
  };

  deleteAccount = () => {
    if (this.state.alfred === true) {
      axios.delete('/myAlfred/api/serviceUser/current/allServices')
        .then(() => {
          axios.delete('/myAlfred/api/shop/current/delete')
            .then(() => {
              axios.put('/myAlfred/api/users/current/delete')
                .then(() => {
                  snackBarSuccess(ReactHtmlParser(this.props.t('SECURITY.snackbar_account_desactivate')))
                  this.setState({open2: false})
                  clearAuthenticationToken()
                  Router.push('/')
                })
                .catch(err => { console.error(err) })
            })
            .catch(err => { console.error(err) })
        })
        .catch(err => { console.error(err) })
      axios.delete('/myAlfred/api/availability/currentAlfred')
        .then()
        .catch(err => { console.error(err) })
    }
    else {
      axios.put('/myAlfred/api/users/current/delete')
        .then(() => {
          snackBarSuccess(ReactHtmlParser(this.props.t('SECURITY.snackbar_account_desactivate')))
          this.setState({open2: false})
          clearAuthenticationToken()
          Router.push('/')
        })
        .catch(err => { console.error(err) })
    }
  };

  onClick1 = () => {
    this.setState({
      check1: checkPass1(this.state.newPassword).check,
      check2: checkPass2(this.state.newPassword, this.state.newPassword2).check,
    })
  };

  onSubmit = e => {
    e.preventDefault()
    const data = {password: this.state.password, newPassword: this.state.newPassword}
    axios
      .put('/myAlfred/api/users/profile/editPassword', data)
      .then(() => {
        snackBarSuccess(ReactHtmlParser(this.props.t('SECURITY.snackbar_mdp_update')))
        setTimeout(this.loadData, 1000)
      })
      .catch(err => {
        console.error(err)
        if (err.response.data.wrongPassword) {
          this.setState({wrongPassword: true})
        }
      })
  };

  handleClickOpen() {
    this.setState({open: true})
  }

  handleClose() {
    this.setState({open: false})
  }

  handleClickOpen2() {
    this.setState({open2: true})
  }

  handleClose2() {
    this.setState({open2: false})
  }

  modalDeleteAccount = classes => {
    return(
      <Dialog
        open={this.state.open2}
        onClose={() => this.handleClose2()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ReactHtmlParser(this.props.t('SECURITY.dialog_delete_account_title'))}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ReactHtmlParser(this.props.t('SECURITY.dialog_delete_account_content'))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => this.handleClose2()} color="primary">
            {ReactHtmlParser(this.props.t('COMMON.btn_cancel'))}
          </CustomButton>
          <CustomButton onClick={() => this.deleteAccount()} classes={{root: classes.cancelButton}} autoFocus>
            {ReactHtmlParser(this.props.t('SECURITY.dialog_delete_account_confirm'))}
          </CustomButton>
        </DialogActions>
      </Dialog>
    )
  };

  modalDeleteShop = classes => {
    return(
      <Dialog
        open={this.state.open}
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{ReactHtmlParser(this.props.t('SECURITY.dialog_delete_shop_title'))}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {ReactHtmlParser(this.props.t('SECURITY.dialog_delete_shop_content'))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <CustomButton onClick={() => this.handleClose()} color="primary">
            {ReactHtmlParser(this.props.t('COMMON.btn_cancel'))}
          </CustomButton>
          <CustomButton onClick={() => this.deleteShop()} classes={{root: classes.cancelButton}}>
            {ReactHtmlParser(this.props.t('COMMON.btn_delete'))}
          </CustomButton>
        </DialogActions>
      </Dialog>
    )
  };

  content = classes => {
    const {showCurrentPassword, showNewPassword, showConfirmPassword}=this.state
    const checkButtonValidate = this.state.isAdmin ? this.state.check1 && this.state.check2 : this.state.check && this.state.check1 && this.state.check2

    return(
      <Grid style={{display: 'flex', flexDirection: 'column', width: '100%'}} >
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2 className={'customsecuritytitle'}>{ReactHtmlParser(this.props.t('SECURITY.title'))}</h2>
          </Grid>
          <Grid>
            <Typography className={'customsecuritysubtitle'} style={{color: 'rgba(39,37,37,35%)'}}>{ReactHtmlParser(this.props.t('SECURITY.subtitle'))}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h3 className={'customsecuritypasswordtitle'}>{ReactHtmlParser(this.props.t('SECURITY.password'))}</h3>
          </Grid>
          <Grid>
            <Typography className={'customsecuritypasswordsubtitle'} style={{color: 'rgba(39,37,37,35%)'}}>{ReactHtmlParser(this.props.t('SECURITY.update_password'))}</Typography>
          </Grid>
        </Grid>
        <Grid style={{marginTop: '10vh'}}>
          <Grid>
            <Grid style={{display: 'flex'}}>
              <form onSubmit={this.onSubmit}>
                <Grid container spacing={3}>
                  {
                    !this.state.isAdmin ?
                      <Grid item xs={12} md={4} xl={12}>
                        <Input
                          placeholder={this.state.wrongPassword ? ReactHtmlParser(this.props.t('SECURITY.placeholder_password_error')) : ReactHtmlParser(this.props.t('SECURITY.placeholder_password_actual'))}
                          type={ showCurrentPassword ? 'text' : 'password'}
                          name="password"
                          value={this.state.password}
                          onChange={this.onChangePassword}
                          variant={'outlined'}
                          classes={{root: `customsecurityinputpassadmin ${classes.textfield}`}}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                tabIndex="-1"
                                aria-label="toggle password visibility"
                                onClick={() => this.setState({showCurrentPassword: !showCurrentPassword}) }
                                onMouseDown={ ev => ev.preventDefault()}
                              >
                                {showCurrentPassword ? <Visibility /> : <VisibilityOff />}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                        <em className={`customsecurityerrorpass ${classes.cancelButton}`}>{this.state.wrongPassword ? ReactHtmlParser(this.props.t('SECURITY.placeholder_password_error')) : ''}</em>
                      </Grid> : null
                  }
                  <Grid item xs={12} md={4} xl={12}>
                    <Input
                      placeholder={ReactHtmlParser(this.props.t('SECURITY.placeholder_newpassword'))}
                      type= {showNewPassword ? 'text' : 'password' }
                      name="newPassword"
                      value={this.state.newPassword}
                      onChange={this.onChange}
                      variant={'outlined'}
                      onKeyUp={this.onClick1}
                      classes={{root: `customsecurityrepeatpass ${classes.textfield}`}}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            tabIndex="-1"
                            aria-label="toggle password visibility"
                            onClick={() => this.setState({showNewPassword: !showNewPassword}) }
                          >
                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <em className={`customsecurityrepeatnewpass ${classes.cancelButton}`}>{checkPass1(this.state.newPassword).error}</em>
                  </Grid>
                  <Grid item xs={12} md={4} xl={12}>
                    <Input
                      placeholder={ReactHtmlParser(this.props.t('SECURITY.placeholder_repeat_password'))}
                      type={showConfirmPassword ? 'text' : 'password' }
                      name="newPassword2"
                      value={this.state.newPassword2}
                      onChange={this.onChange}
                      variant={'outlined'}
                      onKeyUp={this.onClick1}
                      classes={{root: `customsecurityrepeatpass ${classes.textfield}`}}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            tabIndex="-1"
                            aria-label="toggle password visibility"
                            onClick={() => this.setState({showConfirmPassword: !showConfirmPassword}) }
                          >
                            {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <em className={`customsecurityrepeatpasserror ${classes.cancelButton}` }>{checkPass2(this.state.newPassword, this.state.newPassword2).error}</em>
                  </Grid>
                </Grid>
                <Grid item style={{display: 'flex', justifyContent: 'left', marginTop: 30}}>
                  <CustomButton disabled={!checkButtonValidate} type="submit" className={`customsecurityconfirmpass ${classes.buttonSave}`} variant="contained">
                    {ReactHtmlParser(this.props.t('COMMON.btn_validate'))}
                  </CustomButton>
                </Grid>
              </form>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <h3 className={'customsecurityaccounttitle'}>{ReactHtmlParser(this.props.t('SECURITY.my_account'))}</h3>
          </Grid>
          <Grid>
            <Typography className={'customsecurityaccountsubtitle'} style={{color: 'rgba(39,37,37,35%)'}}>{ReactHtmlParser(this.props.t('SECURITY.handle_my_account'))}</Typography>
          </Grid>
        </Grid>
        <Grid style={{marginTop: '10vh'}}>
          <Grid container style={{alignItems: 'center'}} spacing={3}>
            <Grid item xl={8} xs={6}>
              <h4 className={'customsecurityaccounth4'}>{ReactHtmlParser(this.props.t('SECURITY.index_my_account'))}</h4>
            </Grid>
            <Grid item xl={4} xs={6} style={{flexDirection: 'row-reverse', display: 'flex'}}>
              <Switch
                checked={this.state.index_google}
                onChange={this.handleChange('index_google')}
                value={'index_google'}
                color="primary"
                inputProps={{'aria-label': 'primary checkbox'}}
                focusVisibleClassName={classes.focusVisible}
                disableRipple
                classes={{
                  root: classes.root,
                  switchBase: `custombuttonswitch  ${classes.switchBase}`,
                  thumb: classes.thumb,
                  track: classes.track,
                  checked: classes.checked,
                }}
              />
            </Grid>
          </Grid>
          <Grid>
            {this.state.user.is_alfred ?
              <Grid container spacing={3} style={{alignItems: 'center'}}>
                <Grid item xl={8}>
                  <h4 className={'customsecurityaccountdelete'}>{ReactHtmlParser(this.props.t('SECURITY.delete_my_account'))}</h4>
                </Grid>
                <Grid item xl={4} style={{flexDirection: 'row-reverse', display: 'flex'}}>
                  <CustomButton
                    onClick={() => this.handleClickOpen()}
                    variant="contained"
                    classes={{root: `customsecuritybuttondelete ${classes.buttonSave}`}}
                  >
                    {ReactHtmlParser(this.props.t('COMMON.btn_delete'))}
                  </CustomButton>
                </Grid>
              </Grid>
              : null
            }
          </Grid>
          <Grid style={{marginBottom: '12vh'}}>
            <Grid container style={{alignItems: 'center'}} spacing={3}>
              <Grid item xl={8} style={{display: 'flex', flexDirection: 'column'}}>
                <Grid>
                  <h4 className={'customsecurityaccountdesactivate'}>{ReactHtmlParser(this.props.t('SECURITY.desactivate_my_account'))}</h4>
                </Grid>
                <Grid>
                  <Typography style={{color: 'rgba(39,37,37,35%)'}}>
                    {ReactHtmlParser(this.props.t('SECURITY.caution_desactivate_my_account'))}
                  </Typography>
                </Grid>
              </Grid>
              <Grid item xl={4} style={{flexDirection: 'row-reverse', display: 'flex'}}>
                <CustomButton
                  onClick={() => this.handleClickOpen2()}
                  variant="contained"
                  classes={{root: `customsecuritybuttondesactivate ${classes.buttonSave}`}}
                >
                  {ReactHtmlParser(this.props.t('SECURITY.button_desactivate_my_account'))}
                </CustomButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  };


  render() {
    const {classes, t} = this.props
    const {open, open2, user} = this.state

    if (!user) {
      return null
    }

    return (
      <Fragment>
        <Helmet>
          <title>Compte-Sécurité-{t('COMPANY_NAME')}</title>
          <meta property="description"
            content="Modifiez votre mot de passe et gérez la sécurité de votre compte My Alfred. Des milliers de particuliers et auto-entrepreneurs proches de chez vous prêts à vous rendre service ! Paiement sécurisé. Inscription 100% gratuite !"/>
        </Helmet>
        <Grid className={classes.layoutAccounContainer}>
          <LayoutAccount>
            {this.content(classes)}
          </LayoutAccount>
        </Grid>
        <Grid className={classes.layoutMobileContainer}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Grid>
        {open ? this.modalDeleteShop(classes) : null}
        {open2 ? this.modalDeleteAccount(classes) : null}
      </Fragment>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(security))
