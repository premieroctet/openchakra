import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import styles from './../ButtonSwitch/ButtonSwitchStyle'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'
import {TRAVEL_TAX} from '../../utils/i18n'
const {roundCurrency}=require('../../utils/converters')

class TravelTax extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      tax: this.props.tax || null,
    }
  }

  onToggle = event => {
    const {name}=event.target
    let tax=null
    if (name!='none') {
      tax = {rate: 0, from: 0}
    }
    this.setState({tax: tax}, () => this.props.onChange && this.props.onChange(tax))
  }

  onChangeValue = event => {
    const {name, value}=event.target
    const tax=this.state.tax
    if (name=='rate') {
      tax[name]=roundCurrency(value)
    }
    else if (name=='from') {
      tax[name]=parseInt(value)
    }
    this.setState({tax: tax}, () => this.props.onChange && this.props.onChange(tax))
  }

  render() {
    const {classes}=this.props
    const {tax} = this.state

    const noDep = !tax
    return (
      <>
        <Grid>

          <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
              root: classes.root,
              switchBase: `custombuttonswitch ${classes.switchBase}`,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            color="primary"
            type="checkbox"
            checked={noDep}
            name={'none'}
            onChange={this.onToggle}
          /><span>{ReactHtmlParser(this.props.t('TRAVEL_TAX.no_moving_tax'))}</span>
        </Grid>
        <Grid>
          <Switch
            focusVisibleClassName={classes.focusVisible}
            disableRipple
            classes={{
              root: classes.root,
              switchBase: `custombuttonswitch ${classes.switchBase}`,
              thumb: classes.thumb,
              track: classes.track,
              checked: classes.checked,
            }}
            color="primary"
            type="checkbox"
            checked={!noDep}
            name={'tax'}
            onChange={this.onToggle}
          />
          <TextField
            value={tax && tax.rate}
            type="number"
            name='rate'
            className={classes.textField}
            disabled={noDep}
            onChange={this.onChangeValue}
            InputProps={{
              inputProps: {
                min: 0,
              },
              endAdornment: <InputAdornment position="start">€</InputAdornment>,
            }}
            error={!noDep && !tax.rate}
          />
          {ReactHtmlParser(this.props.t('TRAVEL_TAX.kilometer'))}
          <TextField
            value={tax && tax.from}
            type="number"
            name='from'
            className={classes.textField}
            disabled={noDep}
            onChange={this.onChangeValue}
            InputProps={{
              inputProps: {
                min: 0,
              },
            }}
          />
        </Grid>
      </>
    )
  }
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(TravelTax))
