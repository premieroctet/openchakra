import InputAdornment from "@material-ui/core/InputAdornment";
const {setAxiosAuthentication}=require('../../../utils/authentication');
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../../../static/css/components/SettingService/SettingService';
import {withStyles} from '@material-ui/core/styles';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import axios from 'axios';
import isEmpty from '../../../server/validation/is-empty';
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";


class SettingService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: props.location || {},
      service: null,
      travel_tax: props.travel_tax || null,
      pick_tax: props.pick_tax || null,
      perimeter: props.perimeter,
    };
    this.stateButton = this.stateButton.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onOptionChanged = this.onOptionChanged.bind(this);
  }

  stateButton(e) {
    let name = e.target.name;
    this.setState({[e.target.name]: !this.state[name]});
  }

  handleChange(key, value) {
    this.setState({[key]: value}, () => this.fireOnChange());
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/service/${this.props.service}`)
      .then(response => {
        let service = response.data;
        let location = this.state.location;
        if (isEmpty(location)) {
          Object.keys(service.location).forEach(k => {
            if (service.location[k]) {
              location[k] = true;
            }
          });
        }
        this.setState({
          service: service,
          location: location,
        }, () => this.fireOnChange());
      })
      .catch(error => {
        console.error(error);
      });
  }

  onLocationChange(loc_id, checked) {
    let loc = this.state.location;
    loc[loc_id] = checked;
    this.setState({location: loc}, () => this.fireOnChange());
  }

  onOptionChanged(opt_id, checked, price) {
    this.setState({[opt_id]: checked ? price : null}, () => this.fireOnChange());
  }

  fireOnChange() {
    this.props.onChange(this.state.location, this.state.travel_tax, this.state.pick_tax, this.state.perimeter);
  }

  render() {
    const {classes} = this.props;
    const {service, location, pick_tax, travel_tax} = this.state;

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <h2 className={classes.policySizeTitle}>Paramétrage</h2>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Typography className={classes.policySizeContent}>Indiquez votre périmètre d’intervention ainsi que les options qui s’offrent à votre client quant à votre service. </Typography>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3 className={classes.policySizeSubtitle}>Quel est votre périmètre d’intervention ?</h3>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <TextField
            id="standard-start-adornment"
            variant={'outlined'}
            InputProps={{
              endAdornment: <InputAdornment position="start">Km</InputAdornment>,
            }}
          />
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3 className={classes.policySizeSubtitle}>Où acceptez-vous de réaliser votre prestation ?</h3>
        </Grid>
        <Grid container spacing={3} style={{width: '100%', margin: 0}} item xl={12} lg={12} md={12} sm={12} xs={12}>
          {'client' in this.state.location ?
            <Grid  item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ButtonSwitch
                checked={location.client === true}
                label={'A l\'adresse de mon client'}
                id='client'
                onChange={this.onLocationChange}
              />
            </Grid> : null
          }
          {'alfred' in location ?
            <Grid  item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ButtonSwitch
                checked={location.alfred === true}
                label={'A mon adresse'}
                id='alfred'
                onChange={this.onLocationChange}
              />
            </Grid> : null
          }
          {'visio' in location ?
            <Grid  item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ButtonSwitch
                checked={location.visio === true}
                label={'En visioconférence'}
                id='visio'
                onChange={this.onLocationChange}
              />
            </Grid> : null
          }
          {'ext' in location ?
            <Grid  item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ButtonSwitch
                checked={location.ext === true}
                label={'En extérieur'}
                id='ext'
                onChange={this.onLocationChange}
              />
            </Grid> : null
          }
        </Grid>
        <Grid container spacing={3} style={{width: '100%', margin: 0}} item xl={12} lg={12} md={12} sm={12} xs={12}>
          {service && (service.travel_tax || service.pick_tax) ?
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <h3 className={classes.policySizeSubtitle}>Options</h3>
            </Grid> : null
          }
          {service && service.travel_tax ? // FIX : voir pourquoi le ButtonSwitch ne se checke pas
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ButtonSwitch
                ckecked={travel_tax != null}
                price={travel_tax}
                id='travel_tax'
                label={'Appliquer un forfait déplacement de'}
                isPrice={true}
                onChange={this.onOptionChanged}
              />
            </Grid> : null
          }
          {service && service.pick_tax ?
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <ButtonSwitch
                checked={pick_tax != null}
                price={pick_tax}
                id='pick_tax'
                label={'Proposer un forfait retrait & livraison de'}
                isPrice={true}
                onChange={this.onOptionChanged}
              />
            </Grid> : null
          }
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SettingService);
