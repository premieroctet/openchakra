import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputAdornment from '@material-ui/core/InputAdornment';
import axios from 'axios';
import styles from '../../../static/css/components/BookingPreference/BookingPreference';
import Checkbox from "@material-ui/core/Checkbox";
import {SHOP} from "../../../utils/i18n";

// FIX : réafficher la ville de référence

class BookingPreference extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      deadline_unit: props.deadline_unit || 'jours',
      deadline_value: props.deadline_value || 1,
      minimum_basket: props.minimum_basket,
      equipments: props.equipments || [],
    };
    this.onEquipmentChecked = this.onEquipmentChecked.bind(this);
    this.handleChange=this.handleChange.bind(this)
  }

  handleChange = event => {
    var {name, value}=event.target
    if (['minimum_basket', 'deadline_value'].includes(name)) {
      value = parseInt(value)
      if (isNaN(value)) {
        return
      }
    }
    this.setState({[name]: value}, () => this.props.onChange(this.state));
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
    const equipment_id = event.target.name
    var equipments = this.state.equipments
    if (equipments.includes(equipment_id)) {
      equipments = equipments.filter( id => id != equipment_id)
    }
    else {
      equipments.push(equipment_id)
    }
    this.setState({equipments: equipments}, () => this.props.onChange(this.state));
  }

  render() {
    const {classes} = this.props;
    const {service} = this.state;

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <h2 className={classes.policySizeTitle}>{SHOP.preference.title}</h2>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3 style={{color: '#696767'}}>{SHOP.preference.subtitle}</h3>
        </Grid>
        <Grid  item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h4 className={classes.policySizeSubtitle} style={{margin: 0}}>{SHOP.preference.title_delay_prevenance} </h4>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}}>
          <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}}>
            <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
              <TextField
                id="standard-start-adornment"
                variant={'outlined'}
                name={'deadline_value'}
                value={this.state.deadline_value}
                label={'Délai'}
                style={{width: '100%'}}
                onChange={this.handleChange}
              />
            </Grid>
            <Grid  item xl={10} lg={10} md={10} sm={10} xs={10}>
              <TextField
                value={this.state.deadline_unit}
                name={'deadline_unit'}
                select
                variant="outlined"
                label={SHOP.preference.units_dalay_prevenance}
                onChange={this.handleChange}
                style={{width: '100%'}}
              >
                <MenuItem value="heures">{SHOP.preference.hours}</MenuItem>
                <MenuItem value="jours">{SHOP.preference.days}</MenuItem>
                <MenuItem value="semaines">{SHOP.preference.weeks}</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Grid>
        <Grid  item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h4 className={classes.policySizeSubtitle} style={{margin: 0}}>{SHOP.preference.title_minimum_basket}</h4>
        </Grid>
        <Grid  item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Typography className={classes.policySizeContent}>{SHOP.preference.subtitle_minimum_basket}</Typography>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <TextField
              type="number"
              name={'minimum_basket'}
              style={{width: '100%'}}
              value={this.state.minimum_basket}
              label={SHOP.preference.textfield_minimum_basket}
              variant="outlined"
              onChange={this.handleChange}
              InputProps={{
                inputProps: {
                  min: 0,
                },
                endAdornment: <InputAdornment position="start">{SHOP.preference.unit_minimum_basket}</InputAdornment>,
              }}
            />
          </Grid>
        </Grid>
        {service && service.equipments.length > 0 ?
          <>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <h4 className={classes.policySizeSubtitle} style={{margin: 0}}>{SHOP.preference.title_equipments}</h4>
            </Grid>
            <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}}>
              <Grid container xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}}>
                {service.equipments.map((result, index) => {
                  const selected=this.state.equipments.includes(result._id);
                  return (
                    <Grid key={index} item xl={3} lg={4} md={4} sm={4} xs={4}>
                      <label style={{cursor: 'pointer'}}>
                        <img
                          src={`/static/equipments/${result.logo}`}
                          height={100}
                          width={100}
                          alt={result.label}
                          title={result.label}
                          style={{backgroundColor: selected ? '#CEDEFC' : null}}
                        />
                        <Checkbox
                          style={{display: 'none'}}
                          color="primary"
                          type="checkbox"
                          name={result._id}
                          checked={this.state.equipments.includes(result._id)}
                          onChange={this.onEquipmentChecked}/>
                      </label>
                    </Grid>
                  );
                })}
              </Grid>
            </Grid>
          </> : null
        }
      </Grid>
    );
  }
}

export default withStyles(styles)(BookingPreference);
