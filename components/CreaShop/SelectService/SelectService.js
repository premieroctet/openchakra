import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './SelectServiceStyle';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
const { config } = require('../../../config/config');
const url = config.apiUrl;

class SelectService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  setServices(pattern) {
    axios.get(`${url}myAlfred/api/service/keyword/e`)
      .then((response) => {
        let data = response.data;
        let services = []
        Object.keys(data).forEach( (k) => {
          data[k].forEach( (s) => {
            services.push({category: k, label: s.label, id: s.id});
          });
        });
        this.setState({services: services});
      }).catch(error => {
      console.log(error);
    })
  }

  componentDidMount() {
   this.setServices('e');
  }

  handleChange(value){
    console.log("OnChange:"+JSON.stringify(value));
    if(value !== undefined && value !== null){
      this.props.serviceCb(value.id);
    }
  }

  handleKeyDown(event){
    console.log("OnKeyDown:"+JSON.stringify(event.target.value));
    this.setServices(event.target.value);
  }


  render() {
    const {classes} = this.props;

    return(
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid className={classes.contentLeft}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Créez votre boutique de services</Typography>
              </Grid>
              <Grid style={{marginTop: 100}}>
                <Grid>
                  <Grid>
                    <h3 className={classes.policySizeSubtitle}>Quel service souhaitez vous réaliser ?</h3>
                  </Grid>
                  <Grid className={classes.contentTextSize} >
                    <p className={classes.policySizeContent}>Identifiez maintenant le premier service que vous souhaitez configurer dans
                      votre boutique de services. Vous pourrez en ajouter autant que vous voulez dans
                      votre boutique. Un service n’apparait pas ? Cliquez ici pour l’ajouter.
                    </p>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid className={classes.root}>
                    <Autocomplete
                      id="grouped-demo"
                      style={{ width: 500 }}
                      onChange={(event, value) =>{ this.handleChange(value) }}
                      onKeyDown={(event) =>{ this.handleKeyDown(event) }}
                      options={this.state.services}
                      groupBy={option => option.category}
                      getOptionLabel={option => option.label}
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
