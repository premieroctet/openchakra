import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../componentStyle';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import {ALF_CONDS} from '../../../utils/consts.js';
import moment from 'moment'

class BookingConditions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      booking_request: this.props.booking_request,
      my_alfred_conditions: this.props.conditions, // BASIC/PICTURE/ID_CARD/RECOMMEND
    };

    this.onAlfredConditionsChanged = this.onAlfredConditionsChanged.bind(this);
    this.onBookingChanged = this.onBookingChanged.bind(this);

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

  render() {
    const {classes} = this.props;

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
                    <ButtonSwitch key={moment()} checked={this.state.booking_request} id='request' style={{width: '100%'}}
                                  label={'Tous les utilisateurs doivent envoyer une demande de réservation que vous devez valider dans les 24H.'}
                                  onChange={this.onBookingChanged}/>
                  </Grid>
                  <Grid>
                    <ButtonSwitch key={moment()} checked={!this.state.booking_request} id='auto'
                                  label={'Les utilisateurs peuvent réserver mes services directement sans demande de réservation.'}
                                  onChange={this.onBookingChanged}/>
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
                    <ButtonSwitch key={moment()} id={ALF_CONDS.BASIC} label={'Respecter les conditions My-Alfred (profil vérifié)'}
                                  onChange={this.onAlfredConditionsChanged}
                                  checked={this.state.my_alfred_conditions >= ALF_CONDS.BASIC}
                                  />
                  </Grid>
                  <Grid style={{marginBottom: 10}}>
                    <ButtonSwitch key={moment()} id={ALF_CONDS.PICTURE} label={'Avoir une photo de profil'}
                                  onChange={this.onAlfredConditionsChanged}
                                  checked={this.state.my_alfred_conditions >= ALF_CONDS.PICTURE}
                                  />
                  </Grid>
                  <Grid style={{marginBottom: 10}}>
                    <ButtonSwitch key={moment()} id={ALF_CONDS.ID_CARD} label={'Avoir déposé une pièce d’identité officielle'}
                                  onChange={this.onAlfredConditionsChanged}
                                  checked={this.state.my_alfred_conditions >= ALF_CONDS.ID_CARD}
                                  />
                  </Grid>
                  <Grid>
                    <ButtonSwitch key={moment()} id={ALF_CONDS.RECOMMEND} label={'Etre recommandé par d’autres Alfred'}
                                  onChange={this.onAlfredConditionsChanged}
                                  checked={this.state.my_alfred_conditions >= ALF_CONDS.RECOMMEND}
                                  />
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

export default withStyles(styles)(BookingConditions);
