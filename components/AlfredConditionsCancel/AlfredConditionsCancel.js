import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Checkbox from '@material-ui/core/Checkbox';
import styles from '../shop/componentStyle'
import axios from 'axios';
import { toast } from 'react-toastify';

class AlfredConditionsCancel extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      shop: [],
      alfred: [],
      stateEditButton: false,
      stateCheckbox: false,
      flexible_cancel: false,
      moderate_cancel: false,
      strict_cancel: false
    }
    this.stateButton = this.stateButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  stateButton() {
    this.setState({
      stateEditButton: !this.state.stateEditButton,
      stateCheckbox: !this.state.stateButton
    });
  }

  handleChange = e => {
    if(e.target.name === "flexible_cancel"){
      this.setState({
        flexible_cancel: true,
        moderate_cancel: false,
        strict_cancel: false
      });
    }else if(e.target.name === "moderate_cancel"){
      this.setState({
        flexible_cancel: false,
        moderate_cancel: true,
        strict_cancel: false
      });
    }else{
      this.setState({
        flexible_cancel: false,
        moderate_cancel: false,
        strict_cancel: true
      });
    }
  };

  updateState() {
    this.state.flexible_cancel = this.props.shop.flexible_cancel;
    this.state.moderate_cancel = this.props.shop.moderate_cancel;
    this.state.strict_cancel = this.props.shop.strict_cancel;

  }
    onSubmit(){
      const flexible_cancel =  this.state.flexible_cancel;
      const moderate_cancel = this.state.moderate_cancel;
      const strict_cancel = this.state.strict_cancel;

      const booking_request = this.props.shop.booking_request;
      const no_booking_request = this.props.shop.no_booking_request;
      const my_alfred_conditions = this.props.shop.my_alfred_conditions;
      const profile_picture = this.props.shop.profile_picture;
      const identity_card = this.props.shop.identity_card;
      const recommandations = this.props.shop.recommandations;
      const welcome_message = this.props.shop.welcome_message;


      axios.put('/myAlfred/api/shop/editParameters',{booking_request,no_booking_request,my_alfred_conditions,profile_picture,identity_card,
        recommandations,welcome_message,flexible_cancel,moderate_cancel,strict_cancel})
        .then(() => {
          toast.info('Paramètres modifiés');
          this.setState({stateEditButton: false});
          this.props.needRefresh();
        })
        .catch(err => console.log(err))
    };

  render(){
    const {classes, shop, alfred, userState, isOwner} = this.props;
    if(this.state.stateEditButton === false){
      this.updateState();
    }


    return (
      <Grid container>
        <Grid className={classes.mainContainer}>
          <Grid className={classes.containerPosition}>
            <Grid className={classes.contentPosition}>
              <Grid className={classes.containerBooking}>
                <Grid className={classes.containerTitle}>
                  <h3>Conditions d’annulation de {alfred.firstname}</h3>
                </Grid>
                {userState && isOwner ?
                  <Grid className={classes.editCancelButton}>
                    { this.state.stateEditButton ?
                      <Button color="primary" className={classes.button} onClick={this.onSubmit}>
                        Enregistrer
                      </Button> : null
                    }
                    <Button color="secondary" className={classes.button} onClick={this.stateButton}>
                      {this.state.stateEditButton ? "Annuler" : "Modifier"}
                    </Button>
                  </Grid>
                  : null
                }
              </Grid>
              <Grid className={classes.containerAlfred}>
                {shop.flexible_cancel  || this.state.stateEditButton ?
                  <Grid className={classes.alignCheckbox}>
                    <Grid>
                      <Checkbox
                        disabled={!(this.state.stateCheckbox && this.state.stateEditButton)}
                        checked={this.state.flexible_cancel}
                        value={this.state.flexible_cancel}
                        color="primary"
                        name={"flexible_cancel"}
                        onChange={(e) => this.handleChange(e)}
                        inputProps={{
                          'aria-label': 'secondary checkbox',
                        }}
                        icon={<CircleUnchecked/>}
                        checkedIcon={<RadioButtonCheckedIcon />}
                      />
                    </Grid>
                    <Grid>
                      <p>
                        Flexible : en cas d’annulation jusqu’à 1 jour de la prestation, {alfred.firstname} procédera au
                        remboursement intégral de la réservation.
                      </p>
                    </Grid>
                  </Grid> : null
                }
                { shop.moderate_cancel  || this.state.stateEditButton ?
                  <Grid className={classes.alignCheckbox}>
                    <Grid>
                      <Checkbox
                        disabled={!(this.state.stateCheckbox && this.state.stateEditButton)}
                        checked={this.state.moderate_cancel}
                        value={this.state.moderate_cancel}
                        color="primary"
                        name={"moderate_cancel"}
                        onChange={(e) => this.handleChange(e)}
                        inputProps={{
                          'aria-label': 'secondary checkbox',
                        }}
                        icon={<CircleUnchecked/>}
                        checkedIcon={<RadioButtonCheckedIcon />}
                      />
                    </Grid>
                    <Grid>
                      <p>
                        Modéré : en cas d’annulation jusqu’à 5 jour de la prestation, {alfred.firstname} procédera
                        au remboursement intégral de la réservation.
                      </p>
                    </Grid>
                  </Grid> : null
                }
                { shop.strict_cancel  || this.state.stateEditButton ?
                  <Grid className={classes.alignCheckbox}>
                    <Grid>
                      <Checkbox
                        disabled={!(this.state.stateCheckbox && this.state.stateEditButton)}
                        checked={this.state.strict_cancel}
                        value={this.state.strict_cancel}
                        color="primary"
                        name={"strict_cancel"}
                        inputProps={{
                          'aria-label': 'secondary checkbox',
                        }}
                        onChange={(e) => this.handleChange(e)}
                        icon={<CircleUnchecked/>}
                        checkedIcon={<RadioButtonCheckedIcon />}
                      />
                    </Grid>
                    <Grid>
                      <p>
                        Stricte: en cas d’annulation jusqu’à 10 jour de la prestation, {alfred.firstname} procédera au
                        remboursement intégral de la réservation.
                      </p>
                    </Grid>
                  </Grid> : null
                }

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

AlfredConditionsCancel.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(AlfredConditionsCancel);
