import axios from 'axios';
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
import Hidden from '@material-ui/core/Hidden';
var parse = require('url-parse');

class SearchInput extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      gps:'',
      city: '',
      user: '',
      selectedAddress: null,
    };
    this.findService = this.findService.bind(this)
  }

  componentDidMount() {
    var query=parse(window.location.href, true).query;
    query['gps']='gps' in query ? JSON.parse(query.gps) : null;
    this.setState(query);
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.get('/myAlfred/api/users/current')
     .then(res => {
       let user = res.data;
       var allAddresses={'main': user.billing_address}
       user.service_address.forEach( ad => allAddresses[ad._id]=ad);
       if (!('selectedAddress' in query)) { 
         this.setState({selectedAddress: 'main', gps:user.billing_address.gps}) 
       }
       this.setState({user:user, allAddresses:allAddresses});
     })
  }

  findService(){
    var queryParams={search:1}
    if (this.state.keyword) { queryParams['keyword']=this.state.keyword};
    if (this.state.city) { queryParams['city']=this.state.city};
    if (this.state.gps) { queryParams['gps']=JSON.stringify(this.state.gps)};
    if (this.state.selectedAddress) { queryParams['selectedAddress']=this.state.selectedAddress}
    Router.push({ pathname: '/search', query: queryParams })
  }

  onChange = e => {
    let {name, value} = e.target;
    this.setState({ [e.target.name]: e.target.value });
    if (name === 'selectedAddress') {
      if (value=='addAddress') {
        Router.push('/profile/myAddresses')
      }
      else {
        this.setState({gps: value === 'all'? null : value=='main' ? this.state.allAddresses['main'].gps:{lat:this.state.allAddresses[value].lat, lng:this.state.allAddresses[value].lng}});
      }
    }
  };

  onChangeCity({suggestion}) {
    this.setState({gps:suggestion.latlng, city: suggestion.name});
  };

  render() {
    const {classes} = this.props;
    const {gps, user, city} = this.state;

    return (
      <Grid className={classes.mainContainer}>
        <Grid style={{width: '100%'}}>
          <Paper component="form" className={classes.root}>
            <Grid className={classes.contentInputService}>
              <TextField
                className={classes.input}
                placeholder="Quel service ?"
                InputProps={{disableUnderline: true}}
                onChange={this.onChange}
                value={this.state.keyword}
                name={'keyword'}
              />
              <Hidden smUp>
                <Divider className={classes.divider} orientation="vertical" />
                <IconButton className={classes.iconButton} aria-label="menu" onClick={this.findService}>
                  <Search />
                </IconButton>
              </Hidden>
            </Grid>
            <Hidden xsDown>
              <Divider className={classes.divider} orientation="vertical" />
            </Hidden>
              {user ?
                <Grid className={classes.contentInput}>
                  <Hidden mdUp smUp>
                    <Grid className={classes.contentImg}>
                      <img className={classes.imgStyle} src={'../../static/assets/img/navBar/icone.svg'}/>
                    </Grid>
                    <Hidden smUp>
                      <Divider className={classes.divider} orientation="vertical" />
                    </Hidden>
                  </Hidden>
                  <Grid className={classes.contentInputAddress}>
                    <TextField
                      id="outlined-select-currency"
                      select
                      style={{marginTop: '6px', width: '100%'}}
                      InputProps={{disableUnderline: true}}
                      value={this.state.selectedAddress}
                      name={'selectedAddress'}
                      onChange={(e) => {this.onChange(e);}}
                      margin="dense"
                    >
                      <MenuItem value={'main'}>
                        Adresse principale, <em> {' '+user.billing_address.address} {user.billing_address.zip_code},{user.billing_address.city}</em>
                      </MenuItem>
                      {user.service_address.map(e => (
                        <MenuItem value={e._id}>
                          {e.label+', '} <em> {' '+e.address},{e.zip_code} {e.city}</em>
                        </MenuItem>
                      ))}
                      <MenuItem value={'all'}>
                        Partout, Rechercher des Alfred partout
                      </MenuItem>
                      <MenuItem value={'addAddress'}>
                        <p style={{ color: '#2FBCD3',cursor:'pointer' }}>
                          Ajouter une adresse
                        </p>
                      </MenuItem>
                    </TextField>
                  </Grid>

                </Grid>
                :
                <Grid className={classes.contentInput}>
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
                      value={city}
                    />
                  </Grid>
                </Grid>
              }
            <Hidden xsDown>
              <Divider className={classes.divider} orientation="vertical" />
            </Hidden>
            <Hidden xsDown>
              <IconButton className={classes.iconButton} aria-label="menu" onClick={this.findService}>
                <Search />
              </IconButton>
            </Hidden>
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
