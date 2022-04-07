import React from 'react'
import Link from 'next/link'
import {withTranslation} from 'react-i18next'
import {withStyles} from '@material-ui/core/styles'
import ReactHtmlParser from 'react-html-parser'
import Grid from '@material-ui/core/Grid'
import styles from '../LogIn/LogInStyle'
import CustomButton from '../CustomButton/CustomButton'
import {PleasantButton} from './Button'
import withLogin from '../../hoc/withLogin'
import IconButton from '@material-ui/core/IconButton'
import {TextField} from '@material-ui/core'
import styled from 'styled-components'
import {screen} from '../../styles/screenWidths'

const LoginStyles = styled.div`
  color: var(--black);
  
  @media (${screen.xl}) {
    margin: 0 10%;
  }
  
  h1 {
    color: inherit;
    font-size: var(--text-xl);
    font-weight: var(--font-bold);
    text-align: center;
    margin-inline: var(--spc-8);
    margin-bottom: var(--spc-6);
  }
`
const LoginForm = styled.form`
  display: grid;
  row-gap: var(--spc-4);
  border: 1px solid var(--brand-color);
  border-radius: var(--rounded-7xl);
  padding: var(--spc-3) var(--spc-3) var(--spc-10) var(--spc-3);
  margin: 0 var(--spc-2);
  
  @media (${screen.md}) {
    padding: var(--spc-7) var(--spc-12) var(--spc-12) var(--spc-12);
  }

  h2 {
    color: inherit;
    font-size: var(--text-3xl);
    justify-self: center;
  }

  a {
    color: var(--black);
    margin-bottom: var(--spc-10);
  }
  `

const LoginInputs = styled.div`
  display: grid;
  width: 100%;
  grid-template-columns: var(--grids-cols-1);
  row-gap: var(--spc-2);

  label {
    color: var(--black) !important;
  }

  .MuiIconButton-label {
    font-size: var(--text-base);
    text-decoration: underline;
  }
`

 
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

  return <LoginStyles>
    <h1>{ReactHtmlParser(t('LOGIN.title'))}</h1>
    
    <LoginForm onSubmit={onSubmit}>
      
      <h2>Connexion</h2>
      
      <LoginInputs>
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
              {showPassword ? 'cacher' : 'afficher'}
            </IconButton>
          ),
        }}
      />

      <em>{errors.password}</em>
      
      </LoginInputs>

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
        <a>
          {ReactHtmlParser(t('LOGIN.forgotten_password'))}
        </a>
      </Link>
      
      <PleasantButton type="submit" onClick={onSubmit} disabled={loginDisabled} size="full-width">
      {ReactHtmlParser(t('LOGIN.button'))}
      </PleasantButton>
      
    </LoginForm>
  </LoginStyles>
}


export default withLogin(withTranslation('feurst', {withRef: true})(withStyles(styles)(FeurstLogin)))
