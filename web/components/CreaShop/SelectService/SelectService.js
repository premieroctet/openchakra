const {setAxiosAuthentication}=require('../../../utils/authentication');
import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../static/css/components/SelectService/SelectService';
import axios from 'axios';
import Select from 'react-select'
const {matches, normalize} = require('../../../utils/text');
import {SHOP} from '../../../utils/i18n';
const {PART, PRO}=require('../../../utils/consts')

class SelectService extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      service: this.props.service || null,
      services: [],
      creation: this.props.creation,
      loading: true,
    };
  }

  componentDidMount() {
    this.setServices('');
  }

  setServices = (pattern) => {
    pattern = pattern || '%20';
    var kw_url = `/myAlfred/api/service/keyword/${pattern}`;
    setAxiosAuthentication()
    axios.get(kw_url)
      .then((response) => {
        let services = response.data;
        // exclure services
        if (this.props.excluded_services) {
          Object.keys(services).forEach( key => {
            const filtered=services[key].filter(s => !this.props.excluded_services.includes(s._id.toString()))
            services[key]=filtered
          });
        }

        this.setState({services: services, loading: false});
      }).catch(error => {
      console.error(error);
    });
  };

  onChange = (option) =>{

    const opt_id = option ? option._id : null;
    this.setState({service: opt_id});
    this.props.onChange(opt_id);
  };

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
    const {classes, professional_access, particular_access} = this.props;
    const {services, loading, service} = this.state;

    var options=[]
    if (professional_access && particular_access) {
      options=[
        {
          label: SHOP.service.section_company,
          options: services[PRO]
        },
        {
          label: SHOP.service.section_particular,
          options: services[PART]
        }
      ]
    }
    else {
      options = professional_access ? services[PRO] : services[PART]
    }

    const tabbedStyle = {
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return { ...styles, 'padding-left' : '2em', };
      },
    };

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <h2 className={classes.policySizeTitle}>{SHOP.service.title}</h2>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
            <h3 style={{color: '#696767'}}>{SHOP.service.subtitle}</h3>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
            <h4 className={classes.policySizeSubtitle}>{
              professional_access && particular_access ?
                SHOP.service.content_particular_professional
                :
                professional_access ?
                  SHOP.service.content_professional
                  :
                  SHOP.service.content_particular
            }</h4>
          </Grid>
        </Grid>
          {this.isCreation() ?
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
              <Select
                options={options}
                onChange={this.onChange}
                disabled={!this.isCreation()}
                searchable={true}
                filterOption={this.searchFn}
                isLoading={loading}
                loadingMessage={() => 'Recherche des services'}
                placeholder={SHOP.service.placeholder}
                value={(options||[]).find(o => o._id==(service||"").toString())}
                styles={professional_access && particular_access ? tabbedStyle : ''}
              />
            </Grid>
            :
            null
          }
      </Grid>
    );
  }
}

export default withStyles(styles)(SelectService);
