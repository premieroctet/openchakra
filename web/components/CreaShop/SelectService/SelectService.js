const {setAxiosAuthentication}=require('../../../utils/authentication');
import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import styles from '../../../static/css/components/SelectService/SelectService';
import axios from 'axios';
import Select from 'react-select'
const {matches, normalize} = require('../../../utils/text');
import {SHOP} from '../../../utils/i18n';
const {PART, PRO, CREASHOP_MODE}=require('../../../utils/consts')
import ButtonSwitch from '../../../components/ButtonSwitch/ButtonSwitch';
import moment from 'moment'

class SelectService extends React.Component {
  constructor(props) {
    super(props);
    const part_pro = this.props.particular_access && this.props.professional_access
    this.state = {
      service: this.props.service || null,
      services: null,
      particular_access: Boolean(this.props.particular_access && !part_pro),
      professional_access: Boolean(this.props.professional_access && !part_pro),
      particular_professional_access: Boolean(part_pro),

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
    this.setState({service: opt_id}, () => this.props.onChange(this.state));
    ;
  };

  searchFn = (candidate, input) => {
    if (candidate) {
      const search = normalize(input);
      const ok = matches(candidate.data.keywords, search) || matches(candidate.label, search);
      return ok
    }
    return true
  };

  handleChangeCompany = (id, checked) =>{
    if (!checked) {
      return
    }
    this.checkHandleChange('professional_access')
  };

  handleChangeParticular = (id, checked) =>{
    if (!checked) {
      return
    }
    this.checkHandleChange('particular_access')
  };

  handleChangeBoth = (id, checked) =>{
    if (!checked) {
      return
    }
    this.checkHandleChange('particular_professional_access')
  };

  checkHandleChange = name =>{
    var st={
      particular_access: false,
      professional_access: false,
      particular_professional_access: false,
    }
    const {classes, is_particular, mode} = this.props;
    st[name]=true
    // En mode modification de service, on le conserve si la destination change
    if (mode!=CREASHOP_MODE.SERVICE_UPDATE) {
      st.service=null
    }
    this.setState(st, () => {
      this.props.onChange(this.state)
    })
  };

  getSelectedServiceAccess = () => {
    const {service, services}=this.state
    const result=[]
    if (services && Object.keys(services).length>0) {
      if (services[PRO].find(s => s._id==service)) {
        result.push(PRO)
      }
      if (services[PART].find(s => s._id==service)) {
        result.push(PART)
      }
    }
    return result
  }

  render() {

    const {classes, is_particular, mode} = this.props;
    const {services, loading, service, particular_access, professional_access, particular_professional_access} = this.state;

    if (!services) {
      return null
    }

    var options=[]
    if (particular_professional_access) {
      // Intersection services pro & part
      options = services[PRO].filter( s => services[PART].map(s => s._id).includes(s._id))
      // Union keywords part & pro versions
      options=options.map( spro => {
        const service_part = services[PART].find(spart => spart._id == spro._id)
        spro.keywords  = _.uniq(spro.keywords.split(' ').concat(service_part.keywords.split(' '))).join(' ')
        return spro
      })
    }
    else {
      options = professional_access ? services[PRO] : services[PART]
    }

    const tabbedStyle = {
      option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        return { ...styles, 'padding-left' : '2em', };
      },
    };

    // Affichage choix part pro seulement si alfred pro et (creation/ajout ou (édition et service dispo pour part et pros))
    const displayAccess = !is_particular && (mode!=CREASHOP_MODE.SERVICE_UPDATE || this.getSelectedServiceAccess().length==2)

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.titleContainer}>
          <h2 className={classes.policySizeTitle}>{SHOP.service.title}</h2>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.titleContainer}>
            <h3 style={{color: '#696767'}}>{
              mode==CREASHOP_MODE.SERVICE_UPDATE ? SHOP.service.subtitle_update : SHOP.service.subtitle
            }</h3>
          </Grid>
          { is_particular || !displayAccess ? null:
            <>
            <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
              <h4 className={classes.policySizeSubtitle} style={{margin: 0}}>{SHOP.creation.is_profesionnal_propose_missions}</h4>
            </Grid>
            <Grid item xl={12} lg={12} sm={12} md={12} xs={12} spacing={1} style={{width: '100%', margin:0}}>
              <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                <ButtonSwitch
                  key={moment()}
                  label={<Typography className={classes.policySizeContent}>{SHOP.creation.textfield_company}</Typography>}
                  onChange={this.handleChangeCompany}
                  value={professional_access}
                  name={'professional_access'}
                  checked={professional_access}
                />
              </Grid>
              <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                <ButtonSwitch
                  key={moment()}
                  label={<Typography className={classes.policySizeContent}>{SHOP.creation.textfield_particular}</Typography>}
                  onChange={this.handleChangeParticular}
                  value={particular_access}
                  name={'particular_access'}
                  checked={particular_access}
                />
              </Grid>
              <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                <ButtonSwitch
                  key={moment()}
                  label={<Typography className={classes.policySizeContent}>{SHOP.creation.textfield_company_and_particular}</Typography>}
                  onChange={this.handleChangeBoth}
                  value={particular_professional_access}
                  name={'particular_professional_access'}
                  checked={particular_professional_access}
                />
              </Grid>
            </Grid>
            </>
          }

          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.titleContainer}>
            <h4 className={classes.policySizeSubtitle}>{
              mode==CREASHOP_MODE.SERVICE_UPDATE ? null:
              particular_professional_access ?
                SHOP.service.content_particular_professional
                :
                professional_access ?
                  SHOP.service.content_professional
                  :
                  SHOP.service.content_particular
            }</h4>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Select
            native={true}
            options={options}
            onChange={this.onChange}
            isDisabled={mode==CREASHOP_MODE.SERVICE_UPDATE}
            searchable={true}
            filterOption={this.searchFn}
            isLoading={loading}
            loadingMessage={() => 'Recherche des services'}
            placeholder={SHOP.service.placeholder}
            value={(options||[]).find(o => service && o._id==service)}
            styles={professional_access && particular_access ? tabbedStyle : ''}
          />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(SelectService);
