import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './AlfredConditionsBookingStyle'
import Button from '@material-ui/core/Button';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Checkbox from '@material-ui/core/Checkbox';

class AlfredConditionsBooking extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      flexible_cancel:true,
      alfred: [],
      shop:[]
    }
  }
  render(){
    const {classes, alfred, shop} = this.props;

    return (
      <Grid container>
        <Grid className={classes.mainContainer}>
          <Grid className={classes.containerPosition}>
            <Grid className={classes.contentPosition}>
              <Grid className={classes.containerBooking}>
                <Grid>
                  <h3>Comment réserver {alfred.firstname}</h3>
                </Grid>
                <Grid>
                  <Button color="secondary" className={classes.button}>
                    Modifier
                  </Button>
                </Grid>
              </Grid>
              <Grid className={classes.containerAlfred}>
                <Grid className={classes.alignCheckbox}>
                  <Grid>
                    <Checkbox
                      checked={!!shop.booking_request}
                      value={shop.booking_request}
                      color="primary"
                      icon={<CircleUnchecked/>}
                      checkedIcon={<RadioButtonCheckedIcon />}
                    />
                  </Grid>
                  <Grid>
                    <p>{alfred.firstname} dispose de 24h pour répondre aux demandes de réservation</p>
                  </Grid>
                </Grid>
                <Grid className={classes.alignCheckbox}>
                  <Grid>
                    <Checkbox
                      checked={!shop.booking_request}
                      value={!shop.booking_request}
                      color="primary"
                      icon={<CircleUnchecked/>}
                      checkedIcon={<RadioButtonCheckedIcon />}
                    />
                  </Grid>
                  <Grid>
                    <p>Les utilisateurs peuvent réserver les services de {alfred.firstname} sans demande de réservation.</p>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

AlfredConditionsBooking.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(AlfredConditionsBooking);
