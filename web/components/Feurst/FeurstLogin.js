import React from 'react'
import {withTranslation} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles'
import ReactHtmlParser from 'react-html-parser'
const {ENABLE_GF_LOGIN} = require('../../config/config')
import Grid from '@material-ui/core/Grid'
import LoginGafa from '../../components/LogIn/LoginGafa'
import styles from '../../components/LogIn/LogInStyle'
import CustomIcon from '../CustomIcon/CustomIcon'
import CustomButton from '../CustomButton/CustomButton'
import withLogin from '../../hoc/withLogin'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import {Link} from '@material-ui/core'
 
const FeurstLogin = ({
  callRegister,
  t,
  classes,
  onChange,
  onSubmit,
  checkRoles,
  showRoles,
  handleClickShowPassword,
  handleMouseDownPassword,
  state,
}) => {

  const {errors, username, password, showPassword, roles, selectedRole} = state
  const loginDisabled = roles == null || (roles.length>0 && !selectedRole) || !password

  return <div>
    <h2 className={classes.titleRegister}>{ReactHtmlParser(t('LOGIN.title'))}</h2>
    {ENABLE_GF_LOGIN ?
      <LoginGafa classes={classes}/>
      :
      null
    }
    
    <Grid container spacing={3} className={classes.containerDialogContent}>
      <Grid item className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
          <Grid item>
            <CustomIcon displayName className={'customloginmailicon'} style={{height: 24, width: 24, backgroundSize: 'contain'}} materialIcon={<MailOutlineIcon className={classes.colorIcon}/>}/>
          </Grid>
          <Grid item className={classes.widthTextField}>
            <Input
              label={ReactHtmlParser(t('LOGIN.input_label'))}
              placeholder={ReactHtmlParser(t('LOGIN.input_label_placeholder'))}
              style={{width: '100%', marginTop: 16, marginBottom: 8}}
              name="username"
              value={username}
              onChange={onChange}
              onBlur={checkRoles}
              error={errors.username}
            />
            <em>{errors.username}</em>
          </Grid>
        </Grid>
      </Grid>
      <Grid item className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
          <Grid item>
            <CustomIcon className={'customloginlockicon'} style={{height: 24, width: 24, backgroundSize: 'contain'}} materialIcon={<LockOpenOutlinedIcon className={classes.colorIcon}/>}/>
          </Grid>
          <Grid item className={classes.widthTextField}>
            <Input
              id="standard-with-placeholder"
              label={ReactHtmlParser(t('LOGIN.input_password'))}
              placeholder={ReactHtmlParser(t('LOGIN.input_password_placeholder'))}
              style={{width: '100%', marginTop: 16, marginBottom: 8}}
              type={showPassword ? 'text' : 'password'}
              name="password"
              value={password}
              onChange={onChange}
              error={errors.password}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    tabIndex="-1"
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                  >
                    {showPassword ? 'cacher' : 'montrer'}
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
                  <InputLabel id="demo-simple-select-label">{ReactHtmlParser(t('LOGIN.input_role'))}</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedRole}
                    onChange={onChange}
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
          <CustomButton onClick={onSubmit} disabled={loginDisabled} variant="contained" color="primary" classes={{root: `custombuttonlogin ${classes.buttonlogin}`}}>
            {ReactHtmlParser(t('LOGIN.button'))}
          </CustomButton>
        </Grid>
      </Grid>
      <Grid item className={classes.margin}>
        <Grid container className={classes.genericContainer} style={{flexDirection: 'column'}}>
          <Link href={'/forgotPassword'}><a color="primary" className={`customloginforgetpassword ${classes.forgetPassword}`}>{ReactHtmlParser(t('LOGIN.forgotten_password'))}</a></Link>
          <a color="primary" onClick={callRegister} className={`customloginredirectionlink ${classes.redirectionSignin}` }>{ReactHtmlParser(t('LOGIN.register_yet'))}</a>
        </Grid>
      </Grid>
    </Grid>
  </div>
}


export default withLogin(withTranslation('custom', {withRef: true})(withStyles(styles)(FeurstLogin)))
