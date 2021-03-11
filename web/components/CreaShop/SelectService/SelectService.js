const {setAxiosAuthentication}=require('../../../utils/authentication');
const AUTOCOMPLETE = false;
import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../static/css/components/SelectService/SelectService';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Select from 'react-select'
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
  }

  componentDidMount() {
    this.setServices('');
  }

  setServices = (pattern) => {
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
  };

  onChange = (option) =>{
    const opt_id = option ? option.value : null
    this.setState({service: opt_id});
    this.props.onChange(opt_id);
  }
  
  isCreation = () =>{
    return this.state.creation;
  };

  searchFn = (candidate, input) => {
    if (candidate) {
      const search = normalize(input);
      const ok = matches(candidate.data.keywords, search) || matches(candidate.label, search);
      return ok
    }
    return true
  };

  render() {
    const {classes, creationBoutique, professional_access, particular_access} = this.props;
    const {service, services, loading} = this.state;

    const pro_options = services.filter( s => s.professional_access).map(s => this.service2Option(s))
    const part_options = services.filter( s => s.particular_access).map(s => this.service2Option(s))

    var options
    if (professional_access && particular_access) {
      options=[
        {
          label: 'Services au professionnels',
          options: pro_options
        },
        {
          label: 'Services au particuliers',
          options: part_options
        }
      ]
    }
    else {
      options = professional_access ? pro_options : part_options
    }

    const tabbedStyle = {
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return { ...styles, 'padding-left' : '2em', };
      },
    };

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
                        filterOption={this.searchFn}
                        isLoading={loading}
                        placeholder={'Recherche par mot-clés'}
                        styles={professional_access && particular_access ? tabbedStyle : ''}
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
