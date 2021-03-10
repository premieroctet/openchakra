const {setAxiosAuthentication}=require('../../../utils/authentication')
const AUTOCOMPLETE = false;

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


const {inspect} = require('util');
const {matches, normalize} = require('../../../utils/text');

class SelectService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: null,
      services: [],
      creation: this.props.creation,
      loading: true,
    };
    this.onChange = this.onChange.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  setServices(pattern) {
    const pro = this.props.professional_access
    const part = this.props.particular_access
    pattern = pattern || '%20';
    var kw_url = `/myAlfred/api/service/keyword/${pattern}`;
    setAxiosAuthentication()
    axios.get(kw_url)
      .then((response) => {
        let data = response.data;
        let services = [];
        Object.keys(data).forEach((k) => {
          data[k].forEach((s) => {
            // FIX: passer les keyowrds autrement dans le back
            // Dont show services to exclude (i.e. already in the shop)
            if (!this.props.exclude || !this.props.exclude.includes(s.id)) {
              s.keywords = s.keywords.map(k => normalize(k)).join(' ').toLowerCase(),
              services.push(s);
              if (this.state.service == null && s.id == this.props.service) {
                this.setState({service: s});
              }
            }
          });
        });
        this.setState({services: services, loading: false});
      }).catch(error => {
      console.error(error);
    });
  }

  service2Option = service => {
    return {
      label: `${service.label}`,
      value: service.id,
      keywords: service.keywords,
    }
  }

  componentDidMount() {
    this.setServices('');
  }

  onChange(item) {
    if (item.length > 0) {
      this.setState({service: item ? item[0].value : null});
      if (item !== undefined && item !== null) {
        this.props.onChange(item[0].value);
      }
    }
  }

  onChangeSelect(value) {
    this.setState({service: value ? value : null});
    if (value !== undefined && value !== null) {
      this.props.onChange(value.id);
    }
  }

  handleKeyDown(event) {
    this.setServices(event.target.value);
  }

  isCreation() {
    return this.state.creation;
  }

  searchFn = st => {
    const search = normalize(st.state.search);
    const options = st.props.options;
    const selected = options.filter(opt => {
      const ok = matches(opt.keywords, search) || matches(opt.label, search);
      return ok;
    });
    return selected;
  };

  render() {
    const {classes, creationBoutique, professional_access, particular_access} = this.props;
    const {service, services, loading} = this.state;

    if (services.length==0) {
      return null
    }

    const pro = professional_access
    const part = particular_access
    const groups = pro && part

    const pro_services = services.filter( s => s.professional_access)
    const part_services = services.filter( s => s.particular_access)

    var options=[]
    if (pro) {
      if (groups) {
        options.push({label: "Services aux enterprises", disabled: true})
      }
      options = options.concat(pro_services.map(s => this.service2Option(s)))
    }
    if (part) {
      if (groups) {
        options.push({label: "Services aux particuliers", disabled: true})
      }
      options = options.concat(part_services.map(s => this.service2Option(s)))
    }

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography
                  className={classes.policySizeTitle}>{creationBoutique ? 'Créez votre boutique de services' : this.isCreation() ? 'Ajouter un service' : 'Modifier un service'}</Typography>
              </Grid>
              <Grid>
                <Grid>
                  <Grid>
                    <h3
                      className={classes.policySizeSubtitle}>{this.isCreation() ? 'Quel service souhaitez-vous réaliser ?' : `Vous allez modifier votre service "${service ? service.label : ''}"`} </h3>
                  </Grid>
                  {creationBoutique ?
                    <Grid className={classes.bottomSpacer}>
                      <Typography className={classes.policySizeContent}>Identifiez maintenant le premier service que vous
                        souhaitez configurer dans
                        votre boutique de services. Vous pourrez en ajouter autant que vous voulez dans
                        votre boutique. Un service n’apparait pas ? Cliquez ici pour l’ajouter.
                      </Typography>
                    </Grid> : null
                  }
                </Grid>
                {this.isCreation() ?
                  <Grid>
                    <Grid>
                      <Select
                        options={options}
                        onChange={this.onChange}
                        disabled={!this.isCreation()}
                        searchable={true}
                        searchBy={'label'}
                        searchFn={this.searchFn}
                        disabledLabel={''}
                        loading={loading}
                        placeholder={'Recherche par mot-clés'}
                        noDataRenderer={
                          ({ props, state, methods }) => <div>Chargement...</div>}
                      />
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

export default withStyles(styles)(SelectService);
