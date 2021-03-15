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
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Divider from "@material-ui/core/Divider";

class IntroduceYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_particular: this.props.is_particular,
      company: this.props.company,
      is_certified: this.props.is_certified,
      cesu: null,
      cis: false,
      social_security: null,
      notice: false,
      assujettie_tva: false,
      tva_value: '',
      particular_mission: false,
      company_mission: false,
      particular_company_mission: false
    };
  }

  fireChange = () => {
    this.props.onChange(this.state.is_particular, this.state.company, this.state.is_certified, this.state.cesu, this.state.cis, this.state.social_security, this.state.assujettie_tva, this.state.tva_value);
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
    let id = event.target.id;
    let req = (id === 'particular' && checked) || (id === 'professional' && !checked);
    const company = req ? null : this.state.company;
    this.setState({is_particular: req, company: company, assujettie_tva: false},
      () => this.fireChange());

  };

  onCertifiedChanged = (event) => {
    this.setState({is_certified: event.target.checked},
      () => this.fireChange());
  };

  onCompanyChanged = (company) => {
    this.setState({company: company},
      () => this.fireChange());
  };

  assujettiTVA = (id, checked) =>{
    this.setState({assujettie_tva: checked});
  };

  handleChangeCompany = (id, checked) =>{
    this.setState({company_mission: checked}, () => this.checkHandleChange());
  };

  checkHandleChange = () =>{
    const {company_mission, particular_mission} = this.state;
    if(company_mission && particular_mission){
      this.setState({particular_company_mission: true})
    }
  };

  handleChangeParticular = (id, checked) =>{
    this.setState({particular_mission: checked}, () => this.checkHandleChange());
  };



  render() {
    const {classes} = this.props;

    const {cesu, assujettie_tva, tva_value, particular_mission ,company_mission, particular_company_mission} = this.state;

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
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12}>
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
              label={<h4 className={classes.policySizeSubtitle}>{SHOP.creation.is_particular}</h4>}
            />
          </Grid>
          <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={3} style={{margin: 0, width: '100%'}}>
            {
              this.state.is_particular ?
                <Grid container spacing={3} item  xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
                  <Grid item  xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Typography className={classes.policySizeContent}>{SHOP.creation.is_particular_description}</Typography>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    <RadioGroup name={'cesu'} value={this.state.cesu} onChange={this.onChange}>
                      <Grid container spacing={3} style={{width: '100%', margin:0}}>
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
                      <Grid container spacing={3} style={{width: '100%', margin:0}}>
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
                      <Grid container spacing={3} style={{width: '100%', margin:0}}>
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
                <h4 className={classes.policySizeSubtitle}>{SHOP.creation.is_professional}</h4>
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
                  <ButtonSwitch
                    label={<Typography className={classes.policySizeContent}>{SHOP.creation.is_professional_assujettie_tva}</Typography>}
                    onChange={this.assujettiTVA}
                    value={assujettie_tva}
                    name={'assujettie_tva'}
                    checked={assujettie_tva}/>
                </Grid>
                {
                  assujettie_tva ?
                    <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                      <TextField
                        id="outlined-basic"
                        label={SHOP.creation.textfield_ntva}
                        variant="outlined"
                        onChange={this.onChange}
                        name={'tva_value'}
                        value={tva_value}
                        InputProps={{
                          endAdornment: <InputAdornment position="end">€</InputAdornment>,
                        }}
                      />
                    </Grid> : null
                }
                <Grid  item xl={12} lg={12} sm={12} md={12} xs={12}>
                  <Divider/>
                </Grid>
                <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                  <h4 className={classes.policySizeSubtitle}>{SHOP.creation.is_profesionnal_propose_missions}</h4>
                </Grid>
                <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                  <ButtonSwitch
                    label={<Typography className={classes.policySizeContent}>{SHOP.creation.textfield_company}</Typography>}
                    onChange={this.handleChangeCompany}
                    value={company_mission}
                    name={'company_mission'}
                    checked={company_mission}
                  />
                </Grid>
                <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                  <ButtonSwitch
                    label={<Typography className={classes.policySizeContent}>{SHOP.creation.textfield_particular}</Typography>}
                    onChange={this.handleChangeParticular}
                    value={particular_mission}
                    name={'particular_mission'}
                    checked={particular_mission}
                  />
                </Grid>
                <Grid item xl={12} lg={12} sm={12} md={12} xs={12}>
                  <ButtonSwitch
                    label={<Typography className={classes.policySizeContent}>{SHOP.creation.textfield_company_and_particular}</Typography>}
                    value={particular_company_mission}
                    name={'particular&company_mission'}
                    checked={particular_company_mission}
                  />
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
