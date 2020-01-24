import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './AlfredConditionsStyle'
import Button from '@material-ui/core/Button';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Checkbox from '@material-ui/core/Checkbox';

class AlfredConditions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      flexible_cancel:true,
      is_profilPicture:false,
      is_idCard: false,
      is_conditionMyAlfred: false,
      alfred:[]
    }
  }
  render(){
    const {classes, alfred, shop, userState, isOwner} = this.props;

    return (
      <Grid container>
        <Grid className={classes.mainContainer}>
          <hr className={classes.hrStyle}/>
          <Grid className={classes.contentPosition}>
            <Grid className={classes.containerBooking}>
              <Grid>
                <h3>Les conditions de réservation de {alfred.firstname}</h3>
              </Grid>
              {userState && isOwner ?
                <Grid>
                  <Button color="secondary" className={classes.button}>
                    Modifier
                  </Button>
                </Grid>
                : null
              }
            </Grid>
            <Grid className={classes.containerAlfred}>
              {shop.my_alfred_conditions ?
                <Grid className={classes.alignCheckbox}>
                  <Grid>
                    <Checkbox
                      checked={!!shop.my_alfred_conditions }
                      value={this.state.is_conditionMyAlfred}
                      color="primary"
                      icon={<CircleUnchecked/>}
                      checkedIcon={<RadioButtonCheckedIcon />}
                    />
                  </Grid>
                  <Grid>
                    <p>Conditions My-Alfred (adresse email & numéro de téléphone confirmés).</p>
                  </Grid>
                </Grid> : null
              }
              {shop.profile_picture?
                <Grid className={classes.alignCheckbox}>
                  <Grid>
                    <Checkbox
                      checked={!!shop.profile_picture}
                      value={this.state.is_profilPicture}
                      color="primary"
                      icon={<CircleUnchecked/>}
                      checkedIcon={<RadioButtonCheckedIcon />}
                    />
                  </Grid>
                  <Grid>
                    <p>Photo de profil.</p>
                  </Grid>
                </Grid> : null
              }
              {shop.identity_card ?
                <Grid className={classes.alignCheckbox}>
                  <Grid>
                    <Checkbox
                      checked={!!shop.identity_card}
                      value={this.state.is_idCard}
                      color="primary"
                      icon={<CircleUnchecked/>}
                      checkedIcon={<RadioButtonCheckedIcon />}
                    />
                  </Grid>
                  <Grid>
                    <p>Pièce d'identité officielle.</p>
                  </Grid>
                </Grid>: null
              }
          </Grid>
         </Grid>
        </Grid>
      </Grid>
    )
  }
}

AlfredConditions.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(AlfredConditions);
