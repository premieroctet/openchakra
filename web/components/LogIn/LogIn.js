import CustomButton from '../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import styles from './LogInStyle'
import Grid from '@material-ui/core/Grid'
import Link from 'next/link'
const {setAuthToken, setAxiosAuthentication}=require('../../utils/authentication')
import axios from 'axios'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import OAuth from '../OAuth/OAuth'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
const {snackBarError}=require('../../utils/notifications')
const {PROVIDERS, ROLES} = require('../../utils/consts')
const {ENABLE_GF_LOGIN} = require('../../config/config')
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined'
import {EMPLOYEE} from '../../utils/consts'
const {isB2BStyle}=require('../../utils/context')
const {checkCssClasses} = require('../../utils/functions')

import css from '../../static/assets/css/custom.css'
import {LOGIN} from '../../utils/i18n'
import {Icon} from '@material-ui/core'
import CustomIcon from '../CustomIcon/CustomIcon'

class LogIn extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      errors: {},
      showPassword: false,
      // Roles : null : pas de réposne du serveur, [] : réponse serveur pas de rôle pour l'email
      roles: null,
      selectedRole: null,
    }
  }

  onChange = e => {
    const {name, value} = e.target
    if(name === 'username') {
      // TODO aller chercher les rôles au bout d'une tepo, sinon GET /roles trop nombreux
      this.setState({roles: null})
      axios.get(`/myAlfred/api/users/roles/${e.target.value}`)
        .then(res => {
          const roles = res.data
          const filteredRoles = roles.filter(r => (isB2BStyle() ? r != EMPLOYEE : r == EMPLOYEE))
          const selectedRole = filteredRoles.length == 1 ? filteredRoles[0] : null
          console.log({roles: filteredRoles, selectedRole: selectedRole})
          this.setState({roles: filteredRoles, selectedRole: selectedRole})
        })
        .catch(err => {
          console.error(err)
          this.setState({selectedRole: null, roles: ''})
        })
    }
    this.setState({[name]: value})
  };

  onSubmit = e => {
    e.preventDefault()

    const user = {
      username: this.state.username,
      password: this.state.password,
      role: this.state.selectedRole,
      b2b_login: isB2BStyle(),
    }

    axios.post('/myAlfred/api/users/login', user)
      .then(() => {
        setAuthToken()
        setAxiosAuthentication()
        this.props.login()
      })
      .catch(err => {
        console.error(err)
        if (err.response) {
          snackBarError(err.response.data)
          this.setState({errors: err.response.data})
        }
      })
  };

   handleClickShowPassword = () => {
     this.setState({showPassword: !this.state.showPassword})
   };

  handleMouseDownPassword = event => {
    event.preventDefault()
  };

  render() {
    const {classes, callRegister} = this.props
    const {errors, username, password, showPassword, roles, selectedRole} = this.state
    const showRoles = isB2BStyle() && roles && roles.length >= 1

    const loginDisabled = roles==null || (roles.length>0 && !selectedRole) || !password

    return (
      <Grid className={classes.fullContainer}>
        <Grid style={{width: '100%'}}>
          <Grid className={classes.newContainer}>
            <Grid>
              <h2 className={classes.titleRegister}>{ReactHtmlParser(this.props.t('LOGIN.title'))}</h2>
            </Grid>
            {ENABLE_GF_LOGIN ?
              <Grid className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                  <Grid className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end" className={classes.flexContainerPics}>
                      <Grid style={{width: '100%'}}>
                        {PROVIDERS.map(provider =>
                          <OAuth
                            login={true}
                            provider={provider}
                            key={provider}
                          />,
                        )}
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.margin}>
                    <Grid container spacing={1} alignItems="flex-end" className={classes.flexContainerPics}>
                      <Grid>
                        <h3 style={{color: 'rgba(84,89,95,0.95)', fontWeight: 'bold', letterSpacing: -1}}>Ou</h3>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              :
              null
            }
            <Grid container spacing={3} className={classes.containerDialogContent}>
              <Grid item className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                  <Grid item>
                    <CustomIcon className={'customtrustalarm'} style={{height: 24, width: 24, backgroundSize: 'contain'}} materialIcon={<MailOutlineIcon className={classes.colorIcon}/>}/>
                  </Grid>
                  <Grid item className={classes.widthTextField}>
                    <Input
                      label={ReactHtmlParser(this.props.t('LOGIN.input_label'))}
                      placeholder={ReactHtmlParser(this.props.t('LOGIN.input_label'))}
                      style={{width: '100%', marginTop: 16, marginBottom: 8}}
                      name="username"
                      value={username}
                      onChange={this.onChange}
                      error={errors.username}
                    />
                    <em>{errors.username}</em>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item className={classes.margin}>
                <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                  <Grid item>
                    <CustomIcon className={'customlogopass'} style={{height: 24, width: 24, backgroundSize: 'contain'}} materialIcon={<LockOpenOutlinedIcon className={classes.colorIcon}/>}/>
                  </Grid>
                  <Grid item className={classes.widthTextField}>
                    <Input
                      id="standard-with-placeholder"
                      label={ReactHtmlParser(this.props.t('LOGIN.input_password'))}
                      placeholder={ReactHtmlParser(this.props.t('LOGIN.input_password'))}
                      style={{width: '100%', marginTop: 16, marginBottom: 8}}
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={password}
                      onChange={this.onChange}
                      error={errors.password}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            tabIndex="-1"
                            aria-label="toggle password visibility"
                            onClick={this.handleClickShowPassword}
                            onMouseDown={this.handleMouseDownPassword}
                          >
                            {showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                    <em>{errors.password}</em>
                  </Grid>
                </Grid>
              </Grid>
              {showRoles ?
                <Grid item className={classes.margin}>
                  <Grid container className={classes.genericContainer}>
                    <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                      <Grid item>
                        <GroupOutlinedIcon className={classes.colorIcon}/>
                      </Grid>
                      <Grid item className={classes.widthTextField}>
                        <FormControl className={classes.formControl}>
                          <InputLabel id="demo-simple-select-label">{ReactHtmlParser(this.props.t('LOGIN.input_role'))}</InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedRole}
                            onChange={this.onChange}
                            name={'selectedRole'}
                          >
                            {
                              Object.keys(roles).map((role, index) => (
                                <MenuItem key={index} value={roles[role]}>{ROLES[roles[role]]}</MenuItem>
                              ))
                            }
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid> : null
              }
              <Grid item className={classes.margin}>
                <Grid container className={classes.genericContainer}>
                  <CustomButton onClick={this.onSubmit} disabled={loginDisabled} variant="contained" color="primary" classes={{root: `custombuttonlogin ${classes.buttonlogin}`}}>
                    {ReactHtmlParser(this.props.t('LOGIN.button'))}
                  </CustomButton>
                </Grid>
              </Grid>
              <Grid item className={classes.margin}>
                <Grid container className={classes.genericContainer} style={{flexDirection: 'column'}}>
                  <Link href={'/forgotPassword'}><a color="primary" className={`customloginforgetpassword ${classes.forgetPassword}`}>{ReactHtmlParser(this.props.t('LOGIN.forgotten_password'))}</a></Link>
                  <a color="primary" onClick={callRegister} className={`customloginredirectionlink ${classes.redirectionSignin}` }>{ReactHtmlParser(this.props.t('LOGIN.register_yet'))}</a>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(LogIn))
