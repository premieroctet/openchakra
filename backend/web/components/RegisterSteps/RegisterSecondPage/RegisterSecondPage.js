import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import {Typography} from '@material-ui/core'
import TextField from '@material-ui/core/TextField'
import PhoneIphoneOutlinedIcon from '@material-ui/icons/PhoneIphoneOutlined'
import Checkbox from '@material-ui/core/Checkbox'
import NumberFormat from 'react-number-format'
import PropTypes from 'prop-types'
import Grid from '@material-ui/core/Grid'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../../static/css/components/RegisterSteps/RegisterSecondPage/RegisterSecondPage'
import CustomButton from '../../CustomButton/CustomButton'
import {formatAddress} from '../../../utils/text'
import LocationSelect from '../../Geo/LocationSelect'
import CustomIcon from '../../CustomIcon/CustomIcon'
const {ACCOUNT_MIN_AGE} = require('../../../utils/consts')


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
    }
  }

  handleOpenCgu = () => {
    window.open('/static/cgu.pdf', '_blank')
  }

  render() {
    const{classes, state}= this.props

    const address_placeholder = (state.city && state.address && state.zip_code) ?
      formatAddress(state) : ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.algolia_placeholder'))
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
                <LocationSelect
                  className={classes.textFieldAlgo}
                  placeholder={address_placeholder}
                  onChange={suggestion => this.props.onChangeAddress(suggestion)}
                  onClear={() => this.props.onChangeAddress(null)}
                />
              </form>
              <em className={classes.cancelButton}>{state.errors.address}</em>
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
                    InputLabelProps={{shrink: true}}
                    error={state.errors.birthday}
                    helperText={state.errors.birthday}
                    value={state.day}
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
                    InputLabelProps={{shrink: true}}
                    error={state.birthdayError}
                    value={state.month}
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
                    InputLabelProps={{shrink: true}}
                    error={state.birthdayError}
                    value={state.year}
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
                <CustomIcon className={'customregisterphoneicon'} style={{height: 24, width: 24, backgroundSize: 'contain'}} materialIcon={<PhoneIphoneOutlinedIcon className={classes.colorIcon}/>}/>
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
                    name={'checked'}
                    onChange={this.props.onChange}
                    value="checked"
                    color={state.errors.checked ? 'red' : 'primary'}
                    error={state.errors.checked}
                  />
                </Grid>
                <Grid item xl={11} lg={11} md={11} sm={11} xs={11}>
                  <CustomButton onClick={this.handleOpenCgu} classes={{root: `customregigisterbuttoncgu ${classes.buttonCGU}`}} error={state.errors.checked}>
                    {ReactHtmlParser(this.props.t('REGISTER_SECOND_PAGE.button_cgu'))}
                  </CustomButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(RegisterSecondPage))
