import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import TextField from '@material-ui/core/TextField'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import LockOpenOutlinedIcon from '@material-ui/icons/LockOpenOutlined'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import styles from '../../../static/css/components/RegisterSteps/RegisterFirstPage/RegisterFirstPage'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import '../../../static/assets/css/custom.css'
import {REGISTER_FIRST_PAGE} from '../../../utils/i18n'

class RegisterFirstPage extends React.Component {

  render() {
    const{classes, state} = this.props

    return(
      <Grid container>
        <Grid className={`customregistercontemail ${classes.margin}`}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <MailOutlineIcon className={classes.colorIcon}/>
            </Grid>
            <Grid item className={classes.widthTextField}>
              <TextField
                id="input-with-icon-grid"
                label={ReactHtmlParser(this.props.t('COMMON.lbl_email'))}
                placeholder={ReactHtmlParser(this.props.t('COMMON.lbl_email'))}
                style={{width: '100%'}}
                type="email"
                value={state.email}
                onChange={e => this.props.onChangeEmail(e)}
                error={state.errors.email}
                helperText={state.errors.email}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid className={`customregistercontfirstname ${classes.margin}`}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <PersonOutlineIcon className={classes.colorIcon}/>
            </Grid>
            <Grid item className={classes.widthTextField}>
              <TextField
                id="standard-with-placeholder"
                label={ReactHtmlParser(this.props.t('REGISTER_FIRST_PAGE.textfield_firstname'))}
                placeholder={ReactHtmlParser(this.props.t('REGISTER_FIRST_PAGE.textfield_firstname_placeholder'))}
                style={{width: '100%'}}
                type="text"
                name="firstname"
                value={state.firstname}
                onChange={e => this.props.onChange(e)}
                error={state.errors.firstname}
              />
            </Grid>
            <em style={{color: 'red'}}>{state.errors.firstname}</em>
          </Grid>
        </Grid>
        <Grid className={`customregistercontname ${classes.margin}`}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <PersonOutlineIcon className={classes.colorIcon}/>
            </Grid>
            <Grid item className={classes.widthTextField}>
              <TextField
                label={ReactHtmlParser(this.props.t('COMMON.lbl_name'))}
                placeholder={ReactHtmlParser(this.props.t('COMMON.lbl_name'))}
                style={{width: '100%'}}
                type="text"
                name="name"
                value={state.name}
                onChange={e => this.props.onChange(e)}
                error={state.errors.name}
              />
            </Grid>
            <em style={{color: 'red'}}>{state.errors.name}</em>
          </Grid>
        </Grid>
        <Grid className={`customregistercontmdp ${classes.margin}`}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid className={classes.margin}>
              <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                <Grid item>
                  <LockOpenOutlinedIcon className={classes.colorIcon}/>
                </Grid>
                <Grid item className={classes.widthTextField}>
                  <TextField
                    label={ReactHtmlParser(this.props.t('REGISTER_FIRST_PAGE.textfield_create_password'))}
                    placeholder={ReactHtmlParser(this.props.t('REGISTER_FIRST_PAGE.textfield_create_password_placeholder'))}
                    style={{width: '100%'}}
                    type={state.showPassword ? 'text' : 'password'}
                    name="password"
                    value={state.password}
                    onChange={e => this.props.onChange(e)}
                    onKeyUp={e => this.props.onChangePassword(e)}
                    error={state.status1.error}
                    helperText={state.status1.error}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            tabIndex="-1"
                            aria-label="toggle password visibility"
                            onClick={() => this.props.handleClickShowPassword()}
                            onMouseDown={e => e.preventDefault()}
                          >
                            {state.showPassword ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid className={classes.margin}>
              <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
                <Grid item>
                  <LockOutlinedIcon className={classes.colorIcon}/>
                </Grid>
                <Grid item className={classes.widthTextField}>
                  <TextField
                    label={ReactHtmlParser(this.props.t('REGISTER_FIRST_PAGE.textfield_confirm_password'))}
                    placeholder={ReactHtmlParser(this.props.t('REGISTER_FIRST_PAGE.textfield_confirm_password_placeholder'))}
                    style={{width: '100%'}}
                    type={state.showPassword2 ? 'text' : 'password'}
                    name="password2"
                    value={state.password2}
                    onChange={e => this.props.onChange(e)}
                    onKeyUp={e => this.props.onChangePassword(e)}
                    error={state.status2.error}
                    helperText={state.status2.error}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            tabIndex="-1"
                            aria-label="toggle password visibility"
                            onClick={() => this.props.handleClickShowPassword2()}
                            onMouseDown={e => e.preventDefault()}
                          >
                            {state.showPassword2 ? <Visibility /> : <VisibilityOff />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(RegisterFirstPage))
