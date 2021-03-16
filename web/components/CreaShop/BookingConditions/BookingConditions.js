import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../../../static/css/components/BookingConditions/BookingConditions';
import {withStyles} from '@material-ui/core/styles';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import {ALF_CONDS} from '../../../utils/consts.js';
import {CANCEL_MODE} from "../../../utils/consts";
import moment from 'moment'

class BookingConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booking_request: this.props.booking_request,
      my_alfred_conditions: this.props.conditions, // BASIC/PICTURE/ID_CARD/RECOMMEND
      cancel_mode: this.props.cancel_mode,

    };

    this.onAlfredConditionsChanged = this.onAlfredConditionsChanged.bind(this);
    this.onBookingChanged = this.onBookingChanged.bind(this);

    this.cancel_buttons = {};
    Object.values(CANCEL_MODE).forEach(v => this.cancel_buttons[v] = React.createRef());
    this.cancelModeChanged = this.cancelModeChanged.bind(this);

    this.booking_request = React.createRef();

    this.conditions = {};
    Object.values(ALF_CONDS).forEach(k => this.conditions[k] = React.createRef());
  }

  onBookingChanged(id, checked) {
    if (!checked) {
      return false
    }
    this.setState({booking_request: id == 'request'},
      () => this.props.onChange(this.state.booking_request, this.state.my_alfred_conditions));

  }

  onAlfredConditionsChanged(id, checked) {
    if (!checked) {
      id = (parseInt(id)-1).toString()
    }
    id = Math.max(parseInt(id), 0).toString()
    this.setState({my_alfred_conditions: id},
      () => this.props.onChange(this.state.booking_request, this.state.my_alfred_conditions));
  }

  cancelModeChanged(mode_id, checked) {
    this.setState({cancel_mode: mode_id}, () => this.props.onChangeLastPart(mode_id));
    Object.values(CANCEL_MODE).forEach(v => {
      this.cancel_buttons[v].current.setState({checked: mode_id === v});
    });
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <h2 className={classes.policySizeTitle}>Vos conditions</h2>
        </Grid>
        <Grid  item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3 className={classes.policySizeSubtitle}>Fixez vos conditions et la façon dont vous acceptez qu’un client réserve vos services.</h3>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h4>Comment les clients peuvent vous réserver? </h4>
        </Grid>
        <Grid container spacing={3} style={{margin: 0, width: '100%'}} item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              checked={this.state.booking_request}
              id='request'
              style={{width: '100%'}}
              label={'Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H.'}
              ref={this.booking_request}
              onChange={this.onBookingChanged}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              checked={!this.state.booking_request}
              id='auto'
              label={'Les utilisateurs peuvent réserver mes services directement sans demande de réservation.'}
              ref={this.booking_auto}
              onChange={this.onBookingChanged}
            />
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h4>Quelles sont les conditions pour réserver vos services ?</h4>
        </Grid>
        <Grid container spacing={3} style={{margin: 0, width: '100%'}} item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              id={ALF_CONDS.BASIC}
              label={'Respecter les conditions My-Alfred (profil vérifié)'}
              onChange={this.onAlfredConditionsChanged}
              checked={this.state.my_alfred_conditions >= ALF_CONDS.BASIC}
              ref={this.conditions[ALF_CONDS.BASIC]}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              id={ALF_CONDS.PICTURE}
              label={'Avoir une photo de profil'}
              onChange={this.onAlfredConditionsChanged}
              checked={this.state.my_alfred_conditions >= ALF_CONDS.PICTURE}
              ref={this.conditions[ALF_CONDS.PICTURE]}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              id={ALF_CONDS.ID_CARD}
              label={'Avoir déposé une pièce d’identité officielle'}
              onChange={this.onAlfredConditionsChanged}
              checked={this.state.my_alfred_conditions >= ALF_CONDS.ID_CARD}
              ref={this.conditions[ALF_CONDS.ID_CARD]}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              id={ALF_CONDS.RECOMMEND}
              label={'Etre recommandé par d’autres Alfred'}
              onChange={this.onAlfredConditionsChanged}
              checked={this.state.my_alfred_conditions >= ALF_CONDS.RECOMMEND}
              ref={this.conditions[ALF_CONDS.RECOMMEND]}
            />
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h4>Quelles sont vos conditions d’annulation ? </h4>
        </Grid>
        <Grid container spacing={3} style={{margin: 0, width: '100%'}} item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              id={CANCEL_MODE.FLEXIBLE}
              checked={this.state.cancel_mode == CANCEL_MODE.FLEXIBLE}
              label={'Flexibles: Remboursement intégral jusqu\'à 1 jour avant la prestation'}
              onChange={this.cancelModeChanged} ref={this.cancel_buttons[CANCEL_MODE.FLEXIBLE]}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              id={CANCEL_MODE.MODERATE}
              checked={this.state.cancel_mode == CANCEL_MODE.MODERATE}
              label={'Modérées: Remboursement intégral jusqu\'à 5 jours avant la prestation'}
              onChange={this.cancelModeChanged}
              ref={this.cancel_buttons[CANCEL_MODE.MODERATE]}
            />
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <ButtonSwitch
              id={CANCEL_MODE.STRICT}
              checked={this.state.cancel_mode == CANCEL_MODE.STRICT}
              label={'Strictes: Remboursement intégral jusqu’à 10 jours avant la prestation'}
              onChange={this.cancelModeChanged} ref={this.cancel_buttons[CANCEL_MODE.STRICT]}
            />
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(BookingConditions);
