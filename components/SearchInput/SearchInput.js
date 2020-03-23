import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Search from '@material-ui/icons/Search';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import styles from './SearchInputStyle'
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import Router from 'next/router';
import MenuItem from '@material-ui/core/MenuItem';
import AlgoliaPlaces from 'algolia-places-react';
import moment from 'moment';


class SearchInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      research: '',
      gps:'',
      city: '',
      user: '',
      selectedAddress: '',
      hourSelected: ''
    };
    this.findService = this.findService.bind(this)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.addressSelected !== this.props.addressSelected){
      this.setState({selectedAddress : this.props.addressSelected})
    }
  }

  keyPress(e) {
    if(e.keyCode === 13){
      this.props.search(this.state.research);
    }
  }

  findService(){
    let date;
    let dateISO;
    let day;
    let hour;
    const service = this.state.research;
    const city = this.state.city;
    const gps = JSON.stringify(this.state.gps);
    if(this.state.dateSelected !== ''){
      date = moment(this.state.dateSelected).format('DD/MM/YYYY');
      dateISO = moment(this.state.dateSelected).format();
      day = moment(this.state.dateSelected).format('dddd');
    } else {
      date = '';
      dateISO = '';
      day = '';
    }
    if(this.state.hourSelected !== ''){
      hour = moment(this.state.hourSelected).format('HH:mm');
    } else {
      hour = '';
    }
    if(Router.pathname === '/search'){
      this.props.search(this.state.research);
    }else{
      Router.push({
        pathname: '/search',
        query: { service: service,city:city,date:date,dateISO:dateISO,day:day,hour:hour,gps: gps, address: JSON.stringify(this.state.selectedAddress) }
      })
    }
  }

  onChange = e => {
    let {name, value} = e.target;
    this.setState({ [e.target.name]: e.target.value });
    if (name === 'selectedAddress') {
      this.setState({gps: value === 'all'?null: 'gps' in value ? value.gps : {'lat':value['lat'], 'lng':value['lng']}})
    }else if(name === 'myAddresses'){
      Router.push('/profile/myAddresses')
    }
  };

  onChangeCity({suggestion}) {
    this.setState({gps:suggestion.latlng, city: suggestion.name});
  };

  render() {
    const {classes , gps, user, addressSelected} = this.props;

    return (
      <Grid className={classes.mainContainer}>
        <Grid style={{width: '100%'}}>
          <Paper component="form" className={classes.root}>
            <Grid style={{display: 'flex', width: '50%'}}>
              <IconButton className={classes.iconButton} aria-label="menu" onClick={this.findService}>
                <Search />
              </IconButton>
              <Divider className={classes.divider} orientation="vertical" />
              <InputBase
                className={classes.input}
                placeholder="Quel service ?"
                inputProps={{ 'aria-label': 'search google maps' }}
                onChange={(event)=>{this.setState({research: event.target.value});}}
                onKeyDown={(e)=>this.keyPress(e)}
              />
            </Grid>
            <Divider className={classes.divider} orientation="vertical" />
              {user ?
                <Grid style={{display: 'flex', width: '50%'}}>
                  <TextField
                    id="outlined-select-currency"
                    select
                    style={{marginTop: '6px', width: '100%'}}
                    value={this.state.selectedAddress}
                    name={'selectedAddress'}
                    onChange={(e) => {this.onChange(e);}}
                    margin="dense"
                    variant="outlined"
                  >
                    <MenuItem value={this.state.selectedAddress}>
                      Adresse principale, <em> {' '+addressSelected.address} {addressSelected.zip_code},{addressSelected.city}</em>
                    </MenuItem>
                    {user.service_address.map(e => (
                      <MenuItem key={e._id} value={e}>
                        {e.label+', '} <em> {' '+e.address},{e.zip_code} {e.city}</em>
                      </MenuItem>
                    ))}
                    <MenuItem value={'all'}>
                      Partout, Rechercher des Alfred partout
                    </MenuItem>
                    <MenuItem value={'myAddresses'}>
                      <p style={{ color: '#2FBCD3',cursor:'pointer' }}>
                        Ajouter une adresse
                      </p>
                    </MenuItem>
                  </TextField>
                </Grid>
                :
                <Grid style={{display : 'flex', width:'50%'}}>
                  <Grid style={{width: '100%'}}>
                    <AlgoliaPlaces
                      placeholder='Dans quelle ville ?'
                      style={{color: '#505050'}}
                      options={{
                        appId: 'plKATRG826CP',
                        apiKey: 'dc50194119e4c4736a7c57350e9f32ec',
                        language: 'fr',
                        countries: ['fr'],
                        type: 'city',
                        useDeviceLocation: 'true'
                      }}
                      onChange={(suggestion) =>this.onChangeCity(suggestion)}
                      onClear={()=>this.setState({city:'', gps:null})}
                    />
                  </Grid>
                </Grid>
              }
          </Paper>
        </Grid>
      </Grid>
    )
  }
}
SearchInput.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles)(SearchInput);
