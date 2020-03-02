import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';
import styles from '../componentStyle'

// FIX : réafficher la ville de référence

class BookingPreference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline_unit: props.deadline_unit,
      deadline_value: props.deadline_value ? props.deadline_value : 1,
      minimum_basket: props.minimum_basket,
      perimeter: props.perimeter,
      service: null,
    }
  }

  handleChange(key, value) {
    this.setState({[key]: value}, () => this.props.onChange(this.state));
  }

  componentDidMount() {
   axios.get(`/myAlfred/api/service/${this.props.service}`)
      .then(response => {
        let service = response.data;
        this.setState({service: service});
      })
      .catch(error => {
        console.log(error);
     })
  }

  render() {
    const {classes} = this.props;
    const {service} = this.state;

    console.log("Render:"+JSON.stringify(this.state));
    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>{service ? service.label : ''} : vos préférences de réservation</Typography>
              </Grid>
              <Grid style={{width: '80%'}}>
                <Grid>
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>De quel délai souhaitez-vous disposer entre la réservation et la réalisation du service ? </h3>
                  </Grid>
                </Grid>
                <Grid>
                  <p className={classes.policySizeContent}>
                    Par exemple, si vous indiquez un délai de 24 heures, un client devra réserver votre service au moins 24 heures avant votre intervention.
                  </p>
                </Grid>
                <Grid className={classes.contentTextSize}>
                  <Grid item className={classes.contentAddandRemove}>
                    <Grid className={classes.subContentAddanRemove}>
                      <Grid className={classes.buttonRemove} onClick={ () => this.handleChange('deadline_value', Math.max(parseInt(this.state.deadline_value)-1, 0)) } >-</Grid>
                      <Grid style={{display: 'inline-block', fontSize: 20, lineHeight: 2.8}}>{this.state.deadline_value}</Grid>
                      <Grid className={classes.buttonAdd} onClick={() => this.handleChange('deadline_value', parseInt(this.state.deadline_value)+1) } >+</Grid>
                    </Grid>
                    <TextField
                      value={this.state.deadline_unit}
                      style={{width: '45%'}}
                      className={classes.selectDelayInputRepsonsive}
                      select
                      margin="dense"
                      variant="outlined"
                      label="Heures/jours/semaines"
                      onChange={ v => this.handleChange('deadline_unit', v.target.value) }
                    >
                      <MenuItem value="heures">heure(s)</MenuItem>
                      <MenuItem value="jours">jour(s)</MenuItem>
                      <MenuItem value="semaines">semaine(s)</MenuItem>
                    </TextField>
                  </Grid>
              </Grid>
              <Grid style={{marginBottom: 10}}>
                <Grid>
                  <h3 className={classes.policySizeSubtitle}>Quel est votre montant minimum de réservation ?</h3>
                </Grid>
                <Grid>
                  <p className={classes.policySizeContent}>
                    Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service.
                    Si vous indiquez un montant de 10€, les clients ne pourront pas réserver vos services si la somme des prestations n’atteint pas ce montant.
                  </p>
                </Grid>
                <Grid>
                  <TextField
                    style={{width: 200}}
                    type="number"
                    value={this.state.minimum_basket}
                    fullWidth
                    label="Panier minimum"
                    margin="dense"
                    variant="outlined"
                    onChange = { e => this.handleChange('minimum_basket', parseInt(e.target.value)) }
                    InputProps={{
                      inputProps: {
                        min: 0
                      },
                      endAdornment: <InputAdornment position="start">€</InputAdornment>,
                    }
                    }
                  />
                </Grid>
                </Grid>
                <Grid style={{marginBottom: 100}}>
                  <Grid>
                    <Grid>
                      <Grid>
                        <h3 className={classes.policySizeSubtitle}>Quel est votre périmètre d’intervention ?</h3>
                      </Grid>
                      <Grid>
                        {false ?<Grid item xs={12}>
                          <h3 style={{color: '#757575'}}>Ma ville de référence </h3>
                        </Grid>:null}
                        {false ?<Grid container className={classes.contentCityReferency}>
                          <Grid item xs={8}>
                            <p style={{paddingLeft:20}}>address (code postal)</p>
                          </Grid>
                          <Grid item xs={4} className={classes.buttonContent}>
                            <Button onClick={()=>this.setState({clickAddress: true})} color={"secondary"} variant={"contained"} className={classes.styleButton}>Modifier</Button>
                          </Grid>
                        </Grid>:null }
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.contentIntervention}>
                    <Grid>
                      <p className={classes.policySizeContent}>
                        Définissez à présent le périmètre que vous souhaitez couvrir :
                      </p>
                    </Grid>
                    <Grid className={classes.contentTextSize}>
                      <Grid item className={classes.contentAddandRemoveKm}>
                        <Grid className={classes.subContentAddanRemoveKm}>
                          <Grid className={classes.buttonRemove} onClick={() => this.handleChange('perimeter', Math.max(this.state.perimeter-1, 0))} >-</Grid>
                          <Grid style={{display: 'inline-block', fontSize: 20, lineHeight: 2.8}}>{this.state.perimeter}</Grid>
                          <Grid className={classes.buttonAdd} onClick={() => this.handleChange('perimeter', this.state.perimeter+1)} >+</Grid>
                        </Grid>
                        <Grid className={classes.contentKilometers}>
                          <p className={classes.policySizeContent}>kilomètre(s)</p>
                        </Grid>
                      </Grid>
                    </Grid>
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

BookingPreference.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (BookingPreference);
