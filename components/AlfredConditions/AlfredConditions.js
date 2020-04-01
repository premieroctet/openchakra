import Grid from '@material-ui/core/Grid';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../shop/componentStyle'
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import { toast } from 'react-toastify';
const { config } = require('../../config/config');
const url = config.apiUrl;

class AlfredConditions extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      is_profilPicture:false,
      is_idCard: false,
      is_conditionMyAlfred: false,
      alfred:[],
      stateEditButton: false,
      shop: undefined,
      stateCheckbox: false
    };
    this.stateButton = this.stateButton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  stateButton() {
    this.setState({
      stateEditButton: !this.state.stateEditButton,
      stateCheckbox: !this.state.stateButton
    })
  }

  handleChange = e => {
    this.setState({[e.target.name]: e.target.checked});
  };

  updateState(){
      this.state.is_conditionMyAlfred = this.props.shop.my_alfred_conditions;
      this.state.is_profilPicture = this.props.shop.profile_picture;
      this.state.is_idCard = this.props.shop.identity_card;
  }

  onSubmit(){
    const my_alfred_conditions = this.state.is_conditionMyAlfred;
    const profile_picture = this.state.is_profilPicture;
    const identity_card = this.state.is_idCard;

    const booking_request = this.props.shop.booking_request;
    const no_booking_request = this.props.shop.no_booking_request;
    const recommandations = this.props.shop.recommandations;
    const welcome_message = this.props.shop.welcome_message;
    const flexible_cancel =  this.props.shop.flexible_cancel;
    const moderate_cancel = this.props.shop.moderate_cancel;
    const strict_cancel = this.props.shop.strict_cancel;

    axios.put(url+'myAlfred/api/shop/editParameters',{booking_request,no_booking_request,my_alfred_conditions,profile_picture,identity_card,
      recommandations,welcome_message,flexible_cancel,moderate_cancel,strict_cancel})
      .then(() => {
        toast.info('Paramètres modifiés');
        this.setState({stateEditButton: false});
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
          <hr className={classes.hrStyle}/>
          <Grid className={classes.contentPosition}>
            <Grid className={classes.containerBooking}>
              <Grid className={classes.containerTitle}>
                <h3>Les conditions de réservation de {alfred.firstname}</h3>
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
              {shop.my_alfred_conditions || this.state.stateEditButton ?
                <Grid className={classes.alignCheckbox}>
                  <Grid>
                    <Checkbox
                      disabled={!(this.state.stateCheckbox && this.state.stateEditButton)}
                      checked={this.state.is_conditionMyAlfred}
                      onChange={(e) => this.handleChange(e)}
                      name={"is_conditionMyAlfred"}
                      value={this.state.is_conditionMyAlfred}
                      color="primary"
                    />
                  </Grid>
                  <Grid>
                    <p>Conditions My-Alfred (adresse email & numéro de téléphone confirmés).</p>
                  </Grid>
                </Grid> : null
              }
              {shop.profile_picture || this.state.stateEditButton ?
                <Grid className={classes.alignCheckbox}>
                  <Grid>
                    <Checkbox
                      disabled={!(this.state.stateCheckbox && this.state.stateEditButton)}
                      checked={this.state.is_profilPicture}
                      value={this.state.is_profilPicture}
                      onChange={(e) => this.handleChange(e)}
                      name={"is_profilPicture"}
                      color="primary"
                    />
                  </Grid>
                  <Grid>
                    <p>Photo de profil.</p>
                  </Grid>
                </Grid> : null
              }
              {shop.identity_card || this.state.stateEditButton ?
                <Grid className={classes.alignCheckbox}>
                  <Grid>
                    <Checkbox
                      disabled={!(this.state.stateCheckbox && this.state.stateEditButton)}
                      checked={this.state.is_idCard}
                      value={this.state.is_idCard}
                      onChange={(e) => this.handleChange(e)}
                      name={"is_idCard"}
                      color="primary"
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
