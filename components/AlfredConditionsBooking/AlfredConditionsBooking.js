import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../shop/componentStyle'
import Button from '@material-ui/core/Button';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import { toast } from 'react-toastify';
const {frenchFormat}=require('../../utils/text')

class AlfredConditionsBooking extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      alfred: [],
      shop:[],
      stateCheckbox: false,
      stateEditButton: false,
      booking_request: false,
      no_booking_request: false,
      test:false
    };
    this.stateButton = this.stateButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  stateButton() {
    this.setState({
      stateEditButton: !this.state.stateEditButton,
      stateCheckbox: !this.state.stateButton
    });
    let data = this.state.stateEditButton;
    this.props.stateButton({stateEditButton : !data});
  }

  handleChange = e => {
    if(e.target.name === "booking_request"){
      this.setState({
        booking_request: true,
        no_booking_request: false
      });
    }else{
      this.setState({
        booking_request: false,
        no_booking_request: true
      });
    }
  };

  updateState(){
    this.state.booking_request = this.props.shop.booking_request;
    this.state.no_booking_request = this.props.shop.no_booking_request;
  }

  onSubmit(){
    let welcome_message;
    const booking_request = this.state.booking_request;
    const no_booking_request = this.state.no_booking_request;

    const my_alfred_conditions = this.props.shop.my_alfred_conditions;
    const profile_picture = this.props.shop.profile_picture;
    const identity_card = this.props.shop.identity_card;
    const recommandations = this.props.shop.recommandations;
    if(this.props.newMessage === ""){
       welcome_message = this.props.shop.welcome_message;
    }else{
      welcome_message = this.props.newMessage;
    }
    const flexible_cancel =  this.props.shop.flexible_cancel;
    const moderate_cancel = this.props.shop.moderate_cancel;
    const strict_cancel = this.props.shop.strict_cancel;

    axios.put('/myAlfred/api/shop/editParameters',{booking_request,no_booking_request,my_alfred_conditions,profile_picture,identity_card,
      recommandations,welcome_message,flexible_cancel,moderate_cancel,strict_cancel})
      .then(() => {
        toast.info('Paramètres modifiés');
        this.setState({stateEditButton: false});
        this.props.stateButton({stateEditButton : false});
        this.props.needRefresh();
      })
      .catch(err => console.log(err))
  };

  render(){
    const {classes, alfred, shop, userState, isOwner} = this.props;
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
                  <h3>Comment réserver {alfred.firstname}</h3>
                </Grid>
                {userState && isOwner?
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
                {shop.booking_request || this.state.stateEditButton ?
                  <Grid className={classes.alignCheckbox}>
                    <Grid>
                      <Checkbox
                        disabled={!(this.state.stateCheckbox && this.state.stateEditButton)}
                        checked={this.state.booking_request}
                        value={this.state.booking_request}
                        onChange={(e) => this.handleChange(e)}
                        color="primary"
                        name={"booking_request"}
                        icon={<CircleUnchecked/>}
                        checkedIcon={<RadioButtonCheckedIcon />}
                      />
                    </Grid>
                    <Grid>
                      <p>{alfred.firstname} dispose de 24h pour répondre aux demandes de réservation</p>
                    </Grid>
                  </Grid> : null
                }
                {shop.no_booking_request || this.state.stateEditButton?
                  <Grid className={classes.alignCheckbox}>
                    <Grid>
                      <Checkbox
                        disabled={!(this.state.stateCheckbox && this.state.stateEditButton)}
                        checked={this.state.no_booking_request}
                        value={this.state.no_booking_request}
                        onChange={(e) => this.handleChange(e)}
                        color="primary"
                        name={"no_booking_request"}
                        icon={<CircleUnchecked/>}
                        checkedIcon={<RadioButtonCheckedIcon />}
                      />
                    </Grid>
                    <Grid>
                      <p>{ frenchFormat(`Les utilisateurs peuvent réserver les services de ${alfred.firstname} sans demande de réservation.`) }</p>
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

AlfredConditionsBooking.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(AlfredConditionsBooking);
