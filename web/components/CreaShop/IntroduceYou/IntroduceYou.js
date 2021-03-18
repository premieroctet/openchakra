import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Siret from '../../Siret/Siret';
import {withStyles} from '@material-ui/core/styles';
import styles from '../../../static/css/components/IntroduceYou/IntroduceYou';
import {Radio, RadioGroup} from '@material-ui/core';
import ButtonSwitch from '../../../components/ButtonSwitch/ButtonSwitch';
import Information from '../../Information/Information';
import IconButton from "@material-ui/core/IconButton";
const {CESU} = require('../../../utils/consts');
const I18N = require('../../../utils/i18n');
import InfoIcon from '@material-ui/icons/Info';
import {SHOP} from '../../../utils/i18n';
import TextField from '@material-ui/core/TextField';
import Divider from "@material-ui/core/Divider";
import moment from 'moment'

class IntroduceYou extends React.Component {
  constructor(props) {
    super(props);
    const part_pro = this.props.particular_access && this.props.professional_access
    this.state = {
      is_particular: this.props.is_particular,
      company: this.props.company,
      cesu: null,
      cis: false,
      social_security: null,
      notice: false,
      particular_access: Boolean(this.props.particular_access && !part_pro),
      professional_access: Boolean(this.props.professional_access && !part_pro),
      particular_professional_access: Boolean(part_pro),
    };
    this.fireChange = this.fireChange.bind(this)
  }

  fireChange = () => {
    const st=this.state
    this.props.onChange(st.is_particular, st.company,
      st.is_certified, st.cesu, st.cis, st.social_security,
      st.particular_access || st.particular_professional_access,
      st.professional_access || st.particular_professional_access,
    );
  };

  onChange = event => {
    const {name, value} = event.target;
    this.setState({[name]: value},
      () => this.fireChange());
  };

  onCISChange = (id, checked) => {
    this.setState({cis: checked},
      () => this.fireChange());
  };

  onStatusChanged = (event, checked) => {
    if (!checked) {
      return false
    }
    let id = event.target.id;
    let is_particular = (id === 'particular' && checked) || (id === 'professional' && !checked);
    if (this.state.is_particular == is_particular) {
      return
    }
    var st={
      is_particular: is_particular,
    }
    if (is_particular) {
      st['particular_access']=true
      st['professional_access']=false
      st['particular_professional_access']=false
    }
    else {
      st['particular_access']=false
      st['professional_access']=false
      st['particular_professional_access']=true
    }
    this.setState(st, this.fireChange);

  };

  onCertifiedChanged = (event) => {
    this.setState({is_certified: event.target.checked},
      () => this.fireChange());
  };

  onCompanyChanged = (company) => {
    this.setState({company: company},
      () => this.fireChange());
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
    st[name]=true
    this.setState(st, this.fireChange)
  };



  render() {
    const {classes} = this.props;

    const {cesu, particular_access ,professional_access, particular_professional_access} = this.state;

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <h2 className={classes.policySizeTitle}>{SHOP.creation.title}</h2>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex'}}>
          <Grid>
            <h3 style={{color: '#696767'}}>{SHOP.creation.subtitle}</h3>
          </Grid>
          <Grid>
            <IconButton aria-label="info" className={classes.margin} onClick={() => this.setState({notice: true})}>
              <InfoIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  id='particular'
                  checked={this.state.is_particular}
                  name={'isParticular'}
                  color="primary"
                  value={this.state.is_particular}
                  onChange={this.onStatusChanged}
                  icon={<CircleUnchecked/>}
                  checkedIcon={<RadioButtonCheckedIcon/>}
                />
              }
              label={<h4 className={classes.policySizeSubtitle} style={{margin: 0}}>{SHOP.creation.is_particular}</h4>}
            />
          </Grid>
          <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
            {
              this.state.is_particular ?
                <Grid container spacing={1} item  xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography className={classes.policySizeContent}>{SHOP.creation.is_particular_description}</Typography>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <RadioGroup name={'cesu'} value={this.state.cesu} onChange={this.onChange}>
                      <Grid container spacing={1} style={{width: '100%', margin:0}}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', alignItems: 'center'}}>
                          <Radio color="primary" value={CESU[0]}/>
                          <Typography className={classes.policySizeContent}>{SHOP.creation.is_particular_want_cesu}</Typography>
                        </Grid>
                        {
                          cesu == CESU[0] ?
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{marginLeft: 45}}>
                              <TextField
                                id="ss1"
                                type="number"
                                label={SHOP.creation.textfield_ss1}
                                name='social_security'
                                placeholder="N° SS (13+2 chiffres)"
                                value={this.state.social_security}
                                onChange={this.onChange}
                                errors={this.state.social_security}
                                variant={'outlined'}
                              />
                            </Grid>
                            :
                            null
                        }
                      </Grid>
                      <Grid container spacing={1} style={{width: '100%', margin:0}}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', alignItems: 'center'}}>
                          <Radio color="primary" value={CESU[1]}/>
                          <Typography className={classes.policySizeContent}>{SHOP.creation.is_particular_accept_cesu}</Typography>
                        </Grid>
                        {
                          cesu == CESU[1] ?
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{marginLeft: 45}}>
                              <TextField
                                id="ss1"
                                type="number"
                                label={SHOP.creation.textfield_ss1}
                                name='social_security'
                                placeholder="N° SS (13+2 chiffres)"
                                value={this.state.social_security}
                                onChange={this.onChange}
                                errors={this.state.social_security}
                                variant={'outlined'}
                              />
                            </Grid>
                            :
                            null
                        }
                      </Grid>
                      <Grid container spacing={1} style={{width: '100%', margin:0}}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', alignItems: 'center'}}>
                          <Radio color="primary" value={CESU[2]}/>
                          <Typography className={classes.policySizeContent}>{SHOP.creation.is_particular_decline_cesu}</Typography>
                        </Grid>
                      </Grid>
                      <Information
                        open={this.state.notice}
                        onClose={() => this.setState({notice: false})}
                        text={I18N.CESU_NOTICE}
                      />
                    </RadioGroup>
                  </Grid>
                </Grid> : null
            }
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  id='professional'
                  checked={!this.state.is_particular}
                  name={'isProfessional'}
                  color="primary"
                  value={this.state.is_particular}
                  onChange={this.onStatusChanged}
                  icon={<CircleUnchecked/>}
                  checkedIcon={<RadioButtonCheckedIcon/>}
                />
              }
              label={
                <h4 className={classes.policySizeSubtitle} style={{margin: 0}}>{SHOP.creation.is_professional}</h4>
              }
            />
          </Grid>
          <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
            {this.state.is_particular ? null
              :
              <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
                <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                  <Typography className={classes.policySizeContent}>{SHOP.creation.is_professional_description}</Typography>
                </Grid>
                <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                  <Siret onChange={this.onCompanyChanged} company={this.state.company}/>
                </Grid>
                <Grid  container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={1} style={{margin: 0, width: '100%'}}>
                  <Grid  item xl={12} lg={12} sm={12} md={12} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.cis}
                          onChange={this.onCISChange}
                          color="primary"
                          name="is_certified"
                          value={this.state.is_certified}
                        />
                      }
                      label={
                        <Typography className={classes.policySizeContent}>{SHOP.creation.is_professional_cis}</Typography>
                      }
                    />
                  </Grid>
                  <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={this.state.is_certified}
                          onChange={this.onCertifiedChanged}
                          color="primary"
                          name="is_certified"
                          value={this.state.is_certified}
                        />
                      }
                      label={
                        <Typography className={classes.policySizeContent}>{SHOP.creation.is_professional_certif}</Typography>
                      }
                    />
                  </Grid>
                </Grid>
                <Grid  item xl={12} lg={12} sm={12} md={12} xs={12}>
                  <Divider/>
                </Grid>
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
              </Grid>
            }
          </Grid>
        </Grid>
        <Information
          open={this.state.notice}
          onClose={() => this.setState({notice: false})}
          text={I18N.CESU_NOTICE}
        />
      </Grid>
    );
  }
}

export default withStyles(styles)(IntroduceYou);
