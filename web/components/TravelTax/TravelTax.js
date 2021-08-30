import React from 'react'
import {withStyles} from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import TextField from '@material-ui/core/TextField'
import styles from './../ButtonSwitch/ButtonSwitchStyle'
import Grid from '@material-ui/core/Grid'
import InputAdornment from '@material-ui/core/InputAdornment'

const IOSSwitch = withStyles(theme => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: '#C7D4EE',
      '& + $track': {
        backgroundColor: 'white',

      },
    },
    '&$focusVisible $thumb': {
      color: 'white',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({classes, ...props}) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
})

class TravelTax extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      tax: this.props.tax || {rate: 0, from: 0},
    }
  }

  onToggle = event => {
    const {name, value}=event.target
    console.log(`onToggle:${event.target.name}`)
    if (name=='none') {
      this.setState({tax: null})
    }
    else {
      this.setState({tax: {rate: 0, from: 0}})
    }
  }

  onChangeValue = event => {
    const {name, value}=event.target
    console.log(`Value:${typeof value}`)
    const tax=this.state.tax
    if (name=='rate') {
      tax[name]=Math.floor(parseFloat(value)*100)/100
    }
    else if (name=='from') {
      tax[name]=parseInt(value)
    }
    this.setState({tax: tax})
  }

  render() {
    const {classes}=this.props
    const {tax} = this.state

    console.log(`Tax:${JSON.stringify(tax)}`)
    const noDep = !tax
    return (
      <><Grid>
        <IOSSwitch
          color="primary"
          type="checkbox"
          checked={noDep}
          name={'none'}
          onChange={this.onToggle}
        /><span>Pas de frais de déplacement</span>
      </Grid>
      <Grid>
        <IOSSwitch
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
        €/km à partir du kilomètre
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

export default withStyles(styles)(TravelTax)
