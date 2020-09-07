import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../componentStyle';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import {ALF_CONDS} from '../../../utils/consts.js';

class BookingConditions extends React.Component {
  constructor(props) {
    super(props);
    console.log('Constructor:' + this.props.booking_request);
    this.state = {
      booking_request: this.props.booking_request,
      my_alfred_conditions: this.props.conditions, // BASIC/PICTURE/ID_CARD/RECOMMEND
    };

    this.onAlfredConditionsChanged = this.onAlfredConditionsChanged.bind(this);
    this.onBookingChanged = this.onBookingChanged.bind(this);

    this.booking_request = React.createRef();
    this.booking_auto = React.createRef();

    this.conditions = {};
    Object.values(ALF_CONDS).forEach(k => this.conditions[k] = React.createRef());
    console.log('condition buttons:' + JSON.stringify(this.conditions));
  }

  onBookingChanged(id, checked) {
    console.log('Booking changed:' + id + checked);
    let req = (id === 'request' && checked) || (id === 'auto' && !checked);
    console.log('Booking request is ' + req);
    this.setState({booking_request: req},
      () => this.props.onChange(this.state.booking_request, this.state.my_alfred_conditions));
    this.booking_request.current.setState({checked: req});
    this.booking_auto.current.setState({checked: !req});

  }

  onAlfredConditionsChanged(id, checked) {
    console.log(id + ',' + checked);
    let value = checked ? id : Math.max(id - 1, 0);
    this.setState({my_alfred_conditions: value},
      () => this.props.onChange(this.state.booking_request, this.state.my_alfred_conditions));
    Object.values(ALF_CONDS).forEach(v => this.conditions[v].current.setState({checked: v <= value}));
  }

  render() {
    const {classes} = this.props;
    console.log('Render BookingConditions:' + JSON.stringify(this.state));
    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Vos conditions de réservation</Typography>
              </Grid>
              <Grid>
                <Grid>
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>Comment les utilisateurs peuvent réserver vos services
                      ? </h3>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <ButtonSwitch checked={this.state.booking_request} id='request' style={{width: '100%'}}
                                  label={'Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H.'}
                                  ref={this.booking_request} onChange={this.onBookingChanged}/>
                  </Grid>
                  <Grid>
                    <ButtonSwitch checked={!this.state.booking_request} id='auto'
                                  label={'Les utilisateurs peuvent réserver mes services directement sans demande de réservation.'}
                                  ref={this.booking_auto} onChange={this.onBookingChanged}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={classes.bottomSpacer}>
                <Grid>
                  <h3 className={classes.policySizeSubtitle}>Pour réserver mes services, les utilisateurs doivent
                    : </h3>
                </Grid>
                <Grid>
                  <Grid style={{marginBottom: 10}}>
                    <ButtonSwitch id={ALF_CONDS.BASIC} label={'Respecter les conditions My-Alfred (profil vérifié)'}
                                  onChange={this.onAlfredConditionsChanged}
                                  checked={this.state.my_alfred_conditions >= ALF_CONDS.BASIC}
                                  ref={this.conditions[ALF_CONDS.BASIC]}/>
                  </Grid>
                  <Grid style={{marginBottom: 10}}>
                    <ButtonSwitch id={ALF_CONDS.PICTURE} label={'Avoir une photo de profil'}
                                  onChange={this.onAlfredConditionsChanged}
                                  checked={this.state.my_alfred_conditions >= ALF_CONDS.PICTURE}
                                  ref={this.conditions[ALF_CONDS.PICTURE]}/>
                  </Grid>
                  <Grid style={{marginBottom: 10}}>
                    <ButtonSwitch id={ALF_CONDS.ID_CARD} label={'Avoir déposé une pièce d’identité officielle'}
                                  onChange={this.onAlfredConditionsChanged}
                                  checked={this.state.my_alfred_conditions >= ALF_CONDS.ID_CARD}
                                  ref={this.conditions[ALF_CONDS.ID_CARD]}/>
                  </Grid>
                  <Grid>
                    <ButtonSwitch id={ALF_CONDS.RECOMMEND} label={'Etre recommandé par d’autres Alfred'}
                                  onChange={this.onAlfredConditionsChanged}
                                  checked={this.state.my_alfred_conditions >= ALF_CONDS.RECOMMEND}
                                  ref={this.conditions[ALF_CONDS.RECOMMEND]}/>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

BookingConditions.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(BookingConditions);
