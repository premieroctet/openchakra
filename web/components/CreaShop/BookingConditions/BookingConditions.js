import React from 'react'
import Grid from '@material-ui/core/Grid'
import styles from '../../../static/css/components/BookingConditions/BookingConditions'
import {withStyles} from '@material-ui/core/styles'
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch'
import {ALF_CONDS} from '../../../utils/consts.js'
import {CANCEL_MODE} from '../../../utils/consts'
import moment from 'moment'
import {SHOP} from '../../../utils/i18n'

class BookingConditions extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      booking_request: this.props.booking_request,
      my_alfred_conditions: this.props.my_alfred_conditions, // BASIC/PICTURE/ID_CARD/RECOMMEND
      cancel_mode: this.props.cancel_mode,
    }

    this.onAlfredConditionsChanged = this.onAlfredConditionsChanged.bind(this)
    this.onBookingChanged = this.onBookingChanged.bind(this)

    this.cancel_buttons = {}
    Object.values(CANCEL_MODE).forEach(v => this.cancel_buttons[v] = React.createRef())
    this.cancelModeChanged = this.cancelModeChanged.bind(this)

    this.booking_request = React.createRef()
    this.booking_auto = React.createRef()

    this.conditions = {}
    Object.values(ALF_CONDS).forEach(k => this.conditions[k] = React.createRef())
  }

  onBookingChanged(id, checked) {
    if (!checked) {
      return false
    }
    this.setState({booking_request: id == 'request'},
      () => this.props.onChange(this.state.booking_request, this.state.my_alfred_conditions))

  }

  onAlfredConditionsChanged(id, checked) {
    if (!checked) {
      id = (parseInt(id) - 1).toString()
    }
    id = Math.max(parseInt(id), 0).toString()
    this.setState({my_alfred_conditions: id},
      () => this.props.onChange(this.state.booking_request, this.state.my_alfred_conditions))
  }

  cancelModeChanged(mode_id) {
    this.setState({cancel_mode: mode_id}, () => this.props.onChangeLastPart(mode_id))
    Object.values(CANCEL_MODE).forEach(v => {
      this.cancel_buttons[v].current.setState({checked: mode_id === v})
    })
  }

  render() {
    const {classes} = this.props

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.titleContainer}>
          <h2 className={classes.policySizeTitle}>{SHOP.bookingCondition.title}</h2>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3 className={classes.policySizeSubtitle}>{SHOP.bookingCondition.subtitle}</h3>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h4 className={classes.policySizeSubtitle}
            style={{margin: 0}}>{SHOP.bookingCondition.title_secondSection}</h4>
        </Grid>
        <Grid container spacing={1} style={{margin: 0, width: '100%'}} item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              key={moment()}
              id={ALF_CONDS.BASIC}
              label={SHOP.bookingCondition.conditions_bacsic}
              onChange={this.onAlfredConditionsChanged}
              checked={this.state.my_alfred_conditions >= ALF_CONDS.BASIC}
              ref={this.conditions[ALF_CONDS.BASIC]}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              key={moment()}
              id={ALF_CONDS.PICTURE}
              label={SHOP.bookingCondition.conditions_picture}
              onChange={this.onAlfredConditionsChanged}
              checked={this.state.my_alfred_conditions >= ALF_CONDS.PICTURE}
              ref={this.conditions[ALF_CONDS.PICTURE]}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              key={moment()}
              id={ALF_CONDS.ID_CARD}
              label={SHOP.bookingCondition.conditions_idCard}
              onChange={this.onAlfredConditionsChanged}
              checked={this.state.my_alfred_conditions >= ALF_CONDS.ID_CARD}
              ref={this.conditions[ALF_CONDS.ID_CARD]}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              key={moment()}
              id={ALF_CONDS.RECOMMEND}
              label={SHOP.bookingCondition.conditions_recommend}
              onChange={this.onAlfredConditionsChanged}
              checked={this.state.my_alfred_conditions >= ALF_CONDS.RECOMMEND}
              ref={this.conditions[ALF_CONDS.RECOMMEND]}
            />
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h4 className={classes.policySizeSubtitle} style={{margin: 0}}>{SHOP.bookingCondition.title_thirdSection}</h4>
        </Grid>
        <Grid container spacing={1} style={{margin: 0, width: '100%'}} item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              key={moment()}
              id={CANCEL_MODE.FLEXIBLE}
              checked={this.state.cancel_mode == CANCEL_MODE.FLEXIBLE}
              label={SHOP.bookingCondition.condition_flexible}
              onChange={this.cancelModeChanged}
              ref={this.cancel_buttons[CANCEL_MODE.FLEXIBLE]}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              key={moment()}
              id={CANCEL_MODE.MODERATE}
              checked={this.state.cancel_mode == CANCEL_MODE.MODERATE}
              label={SHOP.bookingCondition.condition_moderate}
              onChange={this.cancelModeChanged}
              ref={this.cancel_buttons[CANCEL_MODE.MODERATE]}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              key={moment()}
              id={CANCEL_MODE.STRICT}
              checked={this.state.cancel_mode == CANCEL_MODE.STRICT}
              label={SHOP.bookingCondition.condition_strict}
              onChange={this.cancelModeChanged}
              ref={this.cancel_buttons[CANCEL_MODE.STRICT]}
            />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(BookingConditions)
