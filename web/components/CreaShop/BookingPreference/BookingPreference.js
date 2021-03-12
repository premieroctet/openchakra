import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';
import styles from '../componentStyle';
import Checkbox from "@material-ui/core/Checkbox";

// FIX : réafficher la ville de référence

class BookingPreference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline_unit: props.deadline_unit,
      deadline_value: props.deadline_value ? props.deadline_value : 1,
      minimum_basket: props.minimum_basket,
      service: null,
      selectedEquipments: props.equipments || [],
    };
    this.onEquipmentChecked = this.onEquipmentChecked.bind(this);
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
        console.error(error);
      });
  }

  onEquipmentChecked(event) {
    if (this.state.selectedEquipments.includes(event.target.name)) {
      let array = [...this.state.selectedEquipments];
      let index = array.indexOf(event.target.name);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({selectedEquipments: array}, () => this.props.onChange(this.state));
      }
    } else {
      this.setState({selectedEquipments: [...this.state.selectedEquipments, event.target.name]}, () => this.fireOnChange());
    }
  }

  render() {
    const {classes} = this.props;
    const {service} = this.state;

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>{service ? service.label : ''} : vos préférences de
                  réservation</Typography>
              </Grid>
              <Grid style={{width: '80%'}}>
                <Grid>
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>De quel délai souhaitez-vous disposer entre la
                      réservation et la réalisation du service ? </h3>
                  </Grid>
                </Grid>
                <Grid>
                  <Typography className={classes.policySizeContent}>
                    Par exemple, si vous indiquez un délai de 24 heures, un client devra réserver votre service au moins
                    24 heures avant votre intervention.
                  </Typography>
                </Grid>
                <Grid className={classes.contentTextSize}>
                  <Grid item className={classes.contentAddandRemove}>
                    <Grid className={classes.subContentAddanRemove}>
                      <Grid className={classes.buttonRemove}
                            onClick={() => this.handleChange('deadline_value', Math.max(parseInt(this.state.deadline_value) - 1, 0))}>-</Grid>
                      <Grid style={{
                        display: 'inline-block',
                        fontSize: 20,
                        lineHeight: 2.8,
                      }}>{this.state.deadline_value}</Grid>
                      <Grid className={classes.buttonAdd}
                            onClick={() => this.handleChange('deadline_value', parseInt(this.state.deadline_value) + 1)}>+</Grid>
                    </Grid>
                    <TextField
                      value={this.state.deadline_unit}
                      style={{width: '45%'}}
                      className={classes.selectDelayInputRepsonsive}
                      select
                      margin="dense"
                      variant="outlined"
                      label="Heures/jours/semaines"
                      onChange={v => this.handleChange('deadline_unit', v.target.value)}
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
                  <Grid style={{marginBottom: 30}}>
                    <Typography className={classes.policySizeContent}>
                      Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service.
                      Si vous indiquez un montant de 10€, les clients ne pourront pas réserver vos services si la somme
                      des prestations n’atteint pas ce montant.
                    </Typography>
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
                      onChange={e => this.handleChange('minimum_basket', parseInt(e.target.value))}
                      InputProps={{
                        inputProps: {
                          min: 0,
                        },
                        endAdornment: <InputAdornment position="start">€</InputAdornment>,
                      }
                      }
                    />
                  </Grid>
                </Grid>
                {service && service.equipments.length > 0 ?
                  <Grid>
                    <Grid>
                      <h3 className={classes.policySizeSubtitle}>Quel(s) produit(s) / matériel(s) fournissez-vous dans le
                        cadre de ce service ? </h3>
                    </Grid>
                    <Grid className={classes.bottomSpacer}>
                      <Grid container spacing={1}>
                        {service.equipments.map((result, index) => {
                          const selected=this.state.selectedEquipments.includes(result._id)
                          return (
                            <Grid key={index} item xl={3} lg={4} md={4} sm={4} xs={4}>
                              <label style={{cursor: 'pointer'}}>
                                <img src={`../../static/equipments/${result.logo.slice(0, -4)}.svg`}
                                     height={100} width={100} alt={`${result.name_logo.slice(0, -4)}.svg`}
                                     style={{backgroundColor: selected ? '#CEDEFC' : null}}/>
                                <Checkbox style={{display: 'none'}} color="primary" type="checkbox" name={result._id}
                                          checked={this.state.selectedEquipments.includes(result._id)}
                                          onChange={this.onEquipmentChecked}/>
                              </label>
                            </Grid>
                          );
                        })
                        }
                      </Grid>
                    </Grid>
                  </Grid> : null
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(BookingPreference);
