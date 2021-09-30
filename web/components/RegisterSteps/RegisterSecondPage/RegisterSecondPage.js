import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import {Typography} from '@material-ui/core'
import AlgoliaPlaces from 'algolia-places-react'
import TextField from '@material-ui/core/TextField'
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'
import styles from '../../../static/css/components/RegisterSteps/RegisterSecondPage/RegisterSecondPage'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import CguContent from '../../CguContent/CguContent'
import DialogActions from '@material-ui/core/DialogActions'
const {ACCOUNT_MIN_AGE} = require('../../../utils/consts')
import '../../../static/assets/css/custom.css'
import {REGISTER_SECOND_PAGE} from '../../../utils/i18n'


function NumberFormatCustom(props) {
  const {inputref, onChange, ...other} = props

  return (
    <NumberFormat
      {...other}
      getInputRef={inputref}
      onValueChange={values => {
        onChange({
          target: {
            name: props.name,
            value: values.value,
          },
        })
      }}
      isNumericString
    />
  )
}

NumberFormatCustom.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

class RegisterSecondPage extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      open: false,
    }
  }

  dialogCgu = classes => {
    const {open} = this.state

    const handleClose = () => {
      this.setState({open: false})
    }

    return (
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle onClose={() => this.setState({open: false})}/>
        <DialogContent>
          <CguContent/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} classes={{root: classes.cancelButton}}>{ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.dialog_cgu_close'))}</Button>
        </DialogActions>
      </Dialog>
    )
  }

  handleOpenCgu = () => {
    this.setState({open: true})
  }

  render() {
    const{classes, state}= this.props

    return(
      <Grid container>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <h3 className={`customregisteradresstitle ${classes.subtitle}`}>{ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.address_title'))}</h3>
            </Grid>
            <Grid item className={classes.textStyle}>
              <Typography className={'customregisteradresssubtitle'}><em>{ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.address_subtitle'))}</em></Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item style={{width: '100%'}}>
              <form>
                <AlgoliaPlaces
                  className={classes.textFieldAlgo}
                  placeholder={ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.algolia_placeholder'))}
                  options={{
                    appId: 'plKATRG826CP',
                    apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                    language: 'fr',
                    countries: ['fr'],
                    type: 'address',

                  }}
                  onChange={suggestion => this.props.onChangeAddress(suggestion)}
                  onClear={() => this.props.onChangeAddress(null)}
                />
              </form>
              <em className={classes.cancelButton}>{state.cityError}</em>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <h3 className={`customregisterbirthdate ${classes.subtitle}`}>{ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.birthdate_title'))}</h3>
            </Grid>
            <Grid item>
              <Typography className={`customregisterbirthdatesub ${classes.textStyle}`}><em>
                {ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.minimum_age_start')) + ACCOUNT_MIN_AGE + ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.minimum_age_end'))}</em>
              </Typography>
            </Grid>
            <Grid item className={classes.datenaissance} style={{display: 'flex', alignItems: 'center'}}>
              <Grid container style={{justifyContent: 'space-between', flexWrap: 'nowrap'}}>
                <Grid item style={{width: '30%'}}>
                  <TextField
                    label={ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.textfield_day'))}
                    placeholder={ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.textfield_day_placeholder'))}
                    onChange={e => this.props.onChangeBirthdayDate(e)}
                    inputProps={{
                      maxLength: 2,
                    }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    error={state.birthdayError}
                    helperText={state.birthdayError}
                  />
                </Grid>
                <Grid item style={{width: '30%'}}>
                  <TextField
                    label={ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.textfield_month'))}
                    placeholder={ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.textfield_month_placeholder'))}
                    onChange={e => this.props.onChangeBirthdayMonth(e)}
                    inputProps={{
                      maxLength: 2,
                    }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    error={state.birthdayError}
                  />
                </Grid>
                <Grid item style={{width: '30%'}}>
                  <TextField
                    label={ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.textfield_year'))}
                    placeholder={ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.textfield_year_placeholder'))}
                    onChange={e => this.props.onChangeBirthdayYear(e)}
                    inputProps={{
                      maxLength: 4,
                    }}
                    InputProps={{
                      inputComponent: NumberFormatCustom,
                    }}
                    error={state.birthdayError}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <h3 className={`customregisterphone ${classes.subtitle}`}>{ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.phone_title'))}</h3>
            </Grid>
            <Grid item>
              <Typography className={`customregisterphonesubtitle ${classes.textStyle}`}><em>{ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.phone_subtitle'))}</em></Typography>
            </Grid>
            <Grid item container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
              <Grid item>
                <PhoneIphoneOutlinedIcon className={classes.colorIcon}/>
              </Grid>
              <Grid item style={{width: '70%'}}>
                <TextField
                  id="standard-with-placeholder"
                  label={ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.textfield_phone'))}
                  placeholder={ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.textfield_phone_placeholder'))}
                  style={{width: '100%'}}
                  type={'number'}
                  name="phone"
                  value={state.phone}
                  onChange={e => this.props.onChangePhone(e)}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid className={classes.margin}>
          <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
            <Grid item>
              <Grid container style={{marginTop: 15, alignItems: 'center'}}>
                <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>
                  <Checkbox
                    checked={state.checked}
                    onChange={e => this.props.handleChecked(e)}
                    value="checked"
                    color="primary"
                  />
                </Grid>
                <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                  <Button onClick={this.handleOpenCgu} classes={{root: classes.buttonCGU}} style={{color: '#2FBCD3'}}>{ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.button_cgu'))}</Button>
                  {this.dialogCgu(classes)}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(RegisterSecondPage))
