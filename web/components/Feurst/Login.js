import React from 'react'
import Link from 'next/link'
import {withTranslation} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles'
import ReactHtmlParser from 'react-html-parser'
import Grid from '@material-ui/core/Grid'
import styles from '../LogIn/LogInStyle'
import CustomButton from '../CustomButton/CustomButton'
import withLogin from '../../hoc/withLogin'
import IconButton from '@material-ui/core/IconButton'
import {TextField} from '@material-ui/core'
 
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

  return <>
    <h2 className={classes.titleRegister}>{ReactHtmlParser(t('LOGIN.title'))}</h2>
    
    <form onSubmit={onSubmit} className='grid justify-center gap-y-4'>
      
      <TextField
        id="username"
        name="username"
        label={t('LOGIN.input_label')}
        variant="outlined"
        value={username}
        autoComplete="email"
        onChange={onChange}
        onBlur={checkRoles}
        error={errors.username}
      />
      <em>{errors.username}</em>

      <TextField
        id="standard-with-placeholder"
        label={ReactHtmlParser(t('LOGIN.input_password'))}
        variant="outlined"
        type={showPassword ? 'text' : 'password'}
        name="password"
        value={password}
        autoComplete="current-password"
        onChange={onChange}
        error={errors.password}
        InputProps={{
          endAdornment: (
            <IconButton
              tabIndex="-1"
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
            >
              {showPassword ? 'cacher' : 'montrer'}
            </IconButton>
          ),
        }}
      />

      <em>{errors.password}</em>
      
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

      <Link href={'/forgotPassword'}>
        <a className={`customloginforgetpassword ${classes.forgetPassword}`}>
          {ReactHtmlParser(t('LOGIN.forgotten_password'))}
        </a>
      </Link>
      
      <CustomButton type="submit" onClick={onSubmit} disabled={loginDisabled} variant="contained" classes={{root: `custombuttonlogin ${classes.buttonlogin}`}}>
        {ReactHtmlParser(t('LOGIN.button'))}
      </CustomButton>
        
      
    </form>
  </>
}


export default withLogin(withTranslation('feurst', {withRef: true})(withStyles(styles)(FeurstLogin)))
