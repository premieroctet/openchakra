import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../componentStyle'
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
const { config } = require('../../../config/config');
const url = config.apiUrl;
const { inspect } = require('util');
import useAutocomplete from '@material-ui/lab/useAutocomplete';

class SelectService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: null,
      services: [],
    }
    this.onChange = this.onChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  setServices(pattern) {
    pattern = pattern || '%20';
    var kw_url = `${url}myAlfred/api/service/keyword/${pattern}`;
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.get(kw_url)
      .then((response) => {
        let data = response.data;
        let services = [];
        Object.keys(data).forEach( (k) => {
          data[k].forEach( (s) => {
	    // FIX: passer les keyowrds autrement dans le back
            // Dont show services to exclude (i.e. already in the shop)
            if (!this.props.exclude || !this.props.exclude.includes(s.id)) {
              let srv_opt={category: k, name: s.label+"/"+s.keywords.join(' '), id: s.id};
              services.push(srv_opt);
              if (this.state.service==null && s.id==this.props.service) {
                console.log("Found");
                this.setState({service: srv_opt}); 
              }}
          });
        });
        this.setState({services: services});
      }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
   this.setServices('');
  }

  onChange(event, value){
    console.log("OnChange value:"+inspect(value));
    this.setState({service: value ? value : null});
    if(value !== undefined && value !== null){
      this.props.onChange(value.id);
    }
  }

  handleKeyDown(event){
    // FIX: manque ernier caractère dans target.value
    console.log("OnKeyDown:"+JSON.stringify(event.target.value));
    this.setServices(event.target.value);
  }

  render() {
    const {classes, isId} = this.props;

    console.log("Service:"+this.props.service);

    return(
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>{isId ? "Créez votre boutique de services" : this.props.service ? "Configurer un service" : "Ajouter un service"}</Typography>
              </Grid>
              <Grid>
                <Grid>
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>{this.props.service? "Ce service va être configuré" : "Quel service souhaitez-vous réaliser ?"} </h3>
                  </Grid>
                  { isId ?
                    <Grid className={classes.bottomSpacer}>
                      <p className={classes.policySizeContent}>Identifiez maintenant le premier service que vous souhaitez configurer dans
                        votre boutique de services. Vous pourrez en ajouter autant que vous voulez dans
                        votre boutique. Un service n’apparait pas ? Cliquez ici pour l’ajouter.
                      </p>
                    </Grid> : null
                  }
                </Grid>
                <Grid >
                  <Grid>
                    <Autocomplete
                      id="grouped-demo"
                      className={classes.textFieldSelecteService}
                      onChange={this.onChange}
                      onKeyDown={(event) =>{ this.handleKeyDown(event) }}
                      options={this.state.services}
                      groupBy={option => option.category}
                      getOptionLabel={option => option.name.split('/')[0]}
                      value={this.state.service}
                      disabled={this.props.service!=null}
                      renderInput={params => (
                        <TextField {...params} label={this.props.service ? "" : "Tapez votre service"} variant="outlined" fullWidth />
                      )}
                    />
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



SelectService.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (SelectService);
