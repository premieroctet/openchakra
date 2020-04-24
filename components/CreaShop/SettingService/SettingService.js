import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../componentStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import ButtonSwitch from '../../ButtonSwitch/ButtonSwitch';
import axios from 'axios';
import isEmpty from '../../../server/validation/is-empty';

class SettingService extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: props.location || {},
      service: null,
      travel_tax: props.travel_tax || null,
      pick_tax: props.pick_tax || null,
      selectedEquipments: props.equipments || []
    };
    this.stateButton = this.stateButton.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onOptionChanged = this.onOptionChanged.bind(this);
    this.onEquipmentChecked = this.onEquipmentChecked.bind(this);
  }

  stateButton(e){
    let name = e.target.name;
    this.setState({[e.target.name]: !this.state[name]});
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.get(`/myAlfred/api/service/${this.props.service}`)
      .then(response => {
        let service = response.data;
        let location = this.state.location;
        if (isEmpty(location)) {
          Object.keys(service.location).forEach (k => {
            if (service.location[k]) location[k]=true;
          })
        }
        this.setState({
          service: service,
          location: location,
        }, () => this.fireOnChange());
      })
      .catch(error => {
        console.log(error);
      })
  }

  onLocationChange(loc_id, checked) {
    let loc = this.state.location;
    loc[loc_id]=checked;
    this.setState({location: loc}, () => this.fireOnChange());
  }

  onOptionChanged(opt_id, checked, price) {
    this.setState({[opt_id]: checked ? price : null}, () => this.fireOnChange());
  }

  onEquipmentChecked(event){
    if(this.state.selectedEquipments.includes(event.target.name)){
      let array = [...this.state.selectedEquipments];
      let index = array.indexOf(event.target.name);
      if (index !== -1) {
        array.splice(index, 1);
        this.setState({selectedEquipments: array}, () => this.fireOnChange());
      }
    }else{
      this.setState({ selectedEquipments: [...this.state.selectedEquipments, event.target.name] }, () => this.fireOnChange())
    }
  }

  fireOnChange(){
    this.props.onChange(this.state.location, this.state.travel_tax, this.state.pick_tax, this.state.selectedEquipments)
  }

  render() {
    const {classes} = this.props;
    const {service, location, pick_tax, travel_tax} = this.state;

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>{service? service.label: ''} : paramétrage</Typography>
              </Grid>
              { service && service.equipments.length>0 ?
              <React.Fragment>
              <Grid >
                <h3 className={classes.policySizeSubtitle}>Quel(s) produit(s) / matériel(s) fournissez-vous dans le cadre de ce service ? </h3>
              </Grid>
              <Grid className={classes.bottomSpacer}>
                <Grid container spacing={1}>
                  {service.equipments.map((result) => {
                    return (
                      <Grid item xl={3} lg={4} md={4} sm={4} xs={4}>
                        <label style={{cursor: 'pointer'}}>
                          {
                            this.state.selectedEquipments.includes(result._id) ?
                            <img src={`../../static/equipments/${result.logo.slice(0, -4)}_Selected.svg`} height={100} width={100} alt={`${result.name_logo.slice(0, -4)}_Selected.svg`} />
                            :
                              <img src={`../../static/equipments/${result.logo}`} height={100} width={100} alt={result.name_logo} />}

                          <Checkbox style={{display: 'none'}} color="primary" type="checkbox" name={result._id} checked={this.state.selectedEquipments.includes(result._id)} onChange={this.onEquipmentChecked} />
                        </label>
                      </Grid>
                    )
                  })
                  }
                </Grid>
              </Grid>
              </React.Fragment>:null
              }
              <Grid>
                <Grid>
                  <h3 className={classes.policySizeSubtitle}>Où acceptez-vous de réaliser votre prestation ?</h3>
                </Grid>
                <Grid style={{marginLeft : 15}}>
                  { "client" in this.state.location ?
                    <Grid>
                      <ButtonSwitch checked={location.client===true} label={"A l'adresse de mon client"} id='client' onChange={this.onLocationChange} />
                    </Grid>:null
                  }
                  { "alfred" in location ?
                  <Grid>
                    <ButtonSwitch checked={location.alfred===true} label={"A mon adresse"} id='alfred' onChange={this.onLocationChange} />
                  </Grid>:null
                  }
                  { "visio" in location ?
                  <Grid >
                    <ButtonSwitch checked={location.visio===true} label={"En visioconférence"} id='visio' onChange={this.onLocationChange} />
                  </Grid>:null
                  }
                  { "ext" in location ?
                  <Grid>
                    <ButtonSwitch checked={location.ext===true} label={"En extérieur"} id='ext' onChange={this.onLocationChange} />
                  </Grid>:null
                  }
                </Grid>
              </Grid>
              <Grid style={{marginLeft : 15}} className={classes.options}>
                { service && (service.travel_tax||service.pick_tax)  ?
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>Options</h3>
                  </Grid> : null
                }
                { service && service.travel_tax ? // FIX : voir pourquoi le ButtonSwitch ne se checke pas
                  <Grid>
                    <ButtonSwitch ckecked={travel_tax!=null} price={travel_tax} id='travel_tax' label={"Appliquer un forfait déplacement de"} isPrice={true} onChange={this.onOptionChanged} />
                  </Grid>:null
                }
                { service && service.pick_tax ?
                  <Grid>
                    <ButtonSwitch checked={pick_tax!=null} price={pick_tax} id='pick_tax' label={"Proposer un forfait retrait & livraison de"} isPrice={true} onChange={this.onOptionChanged} />
                  </Grid>:null
                }
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
