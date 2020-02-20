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
      service: this.props.service,
      services: [],
    }
    this.onChange = this.onChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  setServices(pattern) {
    pattern = pattern || '%20';
    var url = `https://localhost/myAlfred/api/service/keyword/${pattern}`;
    console.log("Getting url:"+url);
    axios.get(url)
      .then((response) => {
        let data = response.data;
        let services = [];
        Object.keys(data).forEach( (k) => {
          data[k].forEach( (s) => {
            services.push({category: k, label: s.label+"/"+s.keywords.join(' '), id: s.id});
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
    this.setState({service: value.id});
    if(value !== undefined && value !== null){
      this.props.onChange(value.id);
    }
  }

  handleKeyDown(event){
    console.log("OnKeyDown:"+JSON.stringify(event.target.value));
    this.setServices(event.target.value);
  }

  render() {
    const {classes} = this.props;
    console.log("Service:"+this.state.service);
    return(
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Créez votre boutique de services</Typography>
              </Grid>
              <Grid>
                <Grid>
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>Quel service souhaitez vous réaliser ?</h3>
                  </Grid>
                  <Grid className={classes.bottomSpacer}>
                    <p className={classes.policySizeContent}>Identifiez maintenant le premier service que vous souhaitez configurer dans
                      votre boutique de services. Vous pourrez en ajouter autant que vous voulez dans
                      votre boutique. Un service n’apparait pas ? Cliquez ici pour l’ajouter.
                    </p>
                  </Grid>
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
                      getOptionLabel={option => option.label.split('/')[0]}
                      renderInput={params => (
                        <TextField {...params} label="Tapez votre service" variant="outlined" fullWidth />
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
