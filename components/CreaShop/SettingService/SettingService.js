import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from './SettingServiceStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import axios from 'axios';

class SettingService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {},
      service: null,
      travel_tax: null,
      pick_tax: null
    };
    this.stateButton = this.stateButton.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onOptionChange = this.onOptionChange.bind(this);
  }

  stateButton(e){
    let name = e.target.name;
    console.log(name);
    this.setState({[e.target.name]: !this.state[name]});
  }

  componentDidMount() {
    console.log("Mounted:"+this.props.service);
    axios.get(`/myAlfred/api/service/${this.props.service}`)
      .then(response => {
        let service = response.data;
        this.setState({service: service});
        let location = {};
        Object.keys(service.location).forEach (k => {
          if (service.location[k]) location[k]=false;
        });
        this.setState({location: location});
      })
      .catch(error => {
        console.log(error);
      })
  }

  onLocationChange(loc_id, checked) {
    let loc = this.state.location;
    loc[loc_id]=checked;
    this.setState({location: loc}, () => this.props.onChange(this.state.location, this.state.travel_tax, this.state.pick_tax));
  }

  onOptionChange(opt_id, checked, price) {
    this.setState({[opt_id]: checked ? price : null}, () => this.props.onChange(this.state.location, this.state.travel_tax, this.state.pick_tax));
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid className={classes.contentLeft}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Paramétrez votre service</Typography>
              </Grid>
              <Grid >
                <h3 className={classes.policySizeSubtitle}>Quel(s) produit(s) / matériel(s) fournissez-vous dans le cadre de ce service ? </h3>
              </Grid>
              <Grid className={classes.contentTextSize}>
                <Grid item xs={3} sm={3} md={2}>
                  {
                    (this.state.service? this.state.service.equipments : []).forEach( e => {
                      return ( 
                        <React.Fragment>
                        <label style={{cursor: 'pointer'}}>
                        <img src='/static/equipments/Pate_fimo.svg' height={100} width={100} alt={"test"} title={"title"}/>
                        <Checkbox style={{display: 'none'}} color="primary" type="checkbox" checked={this.state.checked} />
                        </label>
                        </React.Fragment>
                      ) 
                     })
                    }
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <h3 className={classes.policySizeSubtitle}>Où acceptez-vous de réaliser votre prestation ?</h3>
                </Grid>
                <Grid style={{marginLeft : 15}}>
                  { "client" in this.state.location ? 
                    <Grid>
                      <ButtonSwitch label={"A l'adresse de mon client"} isOption={false} isPrice={false} id='client' onChange={this.onLocationChange} />
                    </Grid>:null
                  }
                  { "alfred" in this.state.location ? 
                  <Grid>
                    <ButtonSwitch label={"A mon adresse"} isOption={false} isPrice={false} id='alfred' onChange={this.onLocationChange} />
                  </Grid>:null
                  }
                  { "visio" in this.state.location ? 
                  <Grid >
                    <ButtonSwitch label={"En visioconférence"} isOption={false} isPrice={false} id='visio' onChange={this.onLocationChange} />
                  </Grid>:null
                  }
                  { "ext" in this.state.location ? 
                  <Grid>
                    <ButtonSwitch label={"En extérieur"} isOption={false} isPrice={false} id='ext' onChange={this.onLocationChange} />
                  </Grid>:null
                  }
                </Grid>
              </Grid>
              <Grid style={{marginLeft : 15}}>
                <Grid>
                  <h3 className={classes.policySizeSubtitle}>Options</h3>
                </Grid>
                <Grid>
                  <ButtonSwitch id='travel_tax' label={"Appliquer un forfait déplacement de"} isOption={false} isPrice={true} onChange={this.onOptionChange} />
                </Grid>
                <Grid>
                  <ButtonSwitch id='pick_tax' label={"Proposer un forfait retrait & livraison de"} isOption={false} isPrice={true} onChange={this.onOptionChange} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid className={classes.contentRight}/>
        </Grid>
      </Grid>
    );
  }
}

SettingService.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (SettingService);
