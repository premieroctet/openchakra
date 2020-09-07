const AUTOCOMPLETE=false

import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from '../componentStyle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from 'react-dropdown-select';
import cookie from 'react-cookies';

const { inspect } = require('util');
const {matches, normalize} = require('../../../utils/text')

class SelectService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: null,
      services: [],
      creation: this.props.creation,
    }
    this.onChange = this.onChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  setServices(pattern) {
    pattern = pattern || '%20';
    var kw_url = `/myAlfred/api/service/keyword/${pattern}`;
    axios.defaults.headers.common['Authorization'] = cookie.load('token')
    axios.get(kw_url)
      .then((response) => {
        let data = response.data;
        let services = [];
        Object.keys(data).forEach( (k) => {
          data[k].forEach( (s) => {
	    // FIX: passer les keyowrds autrement dans le back
            // Dont show services to exclude (i.e. already in the shop)
            if (!this.props.exclude || !this.props.exclude.includes(s.id)) {
              let srv_opt={label: `${s.label}`, value: s.id, keywords: s.keywords.map(k => normalize(k)).join(' ').toLowerCase(), };
              services.push(srv_opt);
	             if (this.state.service==null && s.id==this.props.service) {
                this.setState({service: srv_opt});
              }}
          });
        });
        this.setState({services: services});
      }).catch(error => {
      console.error(error);
    })
  }

  componentDidMount() {
   this.setServices('');
  }

  onChange(item){
    if (item.length>0) {
      this.setState({service: item ? item[0].value : null});
      if(item !== undefined && item !== null){
        this.props.onChange(item[0].value);
      }
    }
  }

  onChangeSelect(value){
    this.setState({service: value ? value : null});
    if(value !== undefined && value !== null){
      this.props.onChange(value.id);
    }
  }

  handleKeyDown(event){
    this.setServices(event.target.value);
  }

  isCreation() {
    return this.state.creation;
  }

  searchFn = st => {
    const search = normalize(st.state.search)
    const options = st.props.options
    const selected=options.filter( opt => {
      const ok= matches(opt.keywords,search) || matches(opt.label,search)
      return ok
    })
    return selected
  }

  render() {
    const {classes, creationBoutique} = this.props;
    const {service} = this.state;

    return(
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>{creationBoutique ? "Créez votre boutique de services" : this.isCreation() ? "Ajouter un service" : "Modifier un service"}</Typography>
              </Grid>
              <Grid>
                <Grid>
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>{this.isCreation() ? "Quel service souhaitez-vous réaliser ?" : `Vous allez modifier votre service "${service ? service.label : ''}"`} </h3>
                  </Grid>
                  { creationBoutique ?
                    <Grid className={classes.bottomSpacer}>
                      <p className={classes.policySizeContent}>Identifiez maintenant le premier service que vous souhaitez configurer dans
                        votre boutique de services. Vous pourrez en ajouter autant que vous voulez dans
                        votre boutique. Un service n’apparait pas ? Cliquez ici pour l’ajouter.
                      </p>
                    </Grid> : null
                  }
                </Grid>
                { this.isCreation() ?
                <Grid >
                  <Grid>
                  { AUTOCOMPLETE ?
                    <Autocomplete
                      id="grouped-demo"
                      className={classes.textFieldSelecteService}
                      onChange={this.onChange}
                      onKeyDown={(event) =>{ this.handleKeyDown(event) }}
                      options={this.state.services}
                      groupBy={option => option.category}
                      getOptionLabel={option => option.label}
                      value={this.state.service}
                      disabled={!this.isCreation()}
                      renderInput={params => (
                        <TextField {...params} label={this.isCreation() ? "Tapez votre service" : ""} variant="outlined" fullWidth />
                      )}
                      renderOption= {(option, {value}) => {
                        return (
                           <div>
                           {option ? option.label.split('/')[0] : ''}
                           </div>
                       );
                      }}
                    />
                    :
                    <Select
                      options={this.state.services}
                      onChange={ this.onChange }
                      //onKeyDown={(event) =>{ this.handleKeyDown(event) }}
                      disabled={!this.isCreation()}
                      searchable={true}
                      searchBy={'label'}
                      searchFn={this.searchFn}
                    />
                  }
                  </Grid>
                </Grid>
                :
                null
                }
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}



SelectService.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (SelectService);
