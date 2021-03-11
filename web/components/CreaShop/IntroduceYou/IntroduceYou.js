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
import TextField from '@material-ui/core/TextField';
import ButtonSwitch from '../../../components/ButtonSwitch/ButtonSwitch';
import Information from '../../Information/Information';
import IconButton from "@material-ui/core/IconButton";
const {CESU} = require('../../../utils/consts');
const I18N = require('../../../utils/i18n');
import InfoIcon from '@material-ui/icons/Info';
import {SHOP} from '../../../utils/i18n';


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
    };
  }

  fireChange = () => {
    this.props.onChange(this.state.is_particular, this.state.company, this.state.is_certified, this.state.cesu, this.state.cis, this.state.social_security);
  }

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
    this.setState({is_particular: req, company: company},
      () => this.fireChange());

  }

  onCertifiedChanged = (event) => {
    this.setState({is_certified: event.target.checked},
      () => this.fireChange());
  }

  onCompanyChanged = (company) => {
    this.setState({company: company},
      () => this.fireChange());
  }

  render() {
    const {classes} = this.props;

    const {cesu} = this.state;

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', justifyContent: 'center'}}>
          <h2 className={classes.policySizeTitle}>{SHOP.creation.title}</h2>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', alignItems: 'center'}}>
          <Grid>
            <h3 className={classes.policySizeSubtitle}>{SHOP.creation.subtitle}</h3>
          </Grid>
          <Grid>
            <IconButton aria-label="info" className={classes.margin} onClick={() => this.setState({notice: true})}>
              <InfoIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
                label={<h4 className={classes.policySizeSubtitle}>Je suis un particulier</h4>}
              />
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12}>
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
                  <h4 className={classes.policySizeSubtitle}>
                    Je suis un professionnel/J'ai un numéro de SIRET
                  </h4>
                }
              />
            </Grid>
            <Grid item xs={11}>
              {this.state.is_particular ?
                <Grid>
                  <Grid item xs={11}>
                    <Typography className={classes.policySizeContent}>
                      En tant que particulier, vous pouvez rendre des services occasionnels sur My-Alfred. Si votre
                      activité devient régulière, un statut professionnel (micro-entrepreneur,...) s’impose. Il est
                      également requis pour certains secteurs d’activité réglementés.
                    </Typography>
                  </Grid>
                  <Grid style={{marginLeft: 40}}>
                    <RadioGroup name={'cesu'} value={this.state.cesu} onChange={this.onChange}>
                      <Grid>
                        <Radio color="primary" value={CESU[0]}/>Je veux être déclaré(e) en CESU
                      </Grid>
                      {
                        cesu == CESU[0] ?
                          <Grid style={{display: 'flex', marginLeft: 40}}>
                            <Grid>N° sécurité sociale</Grid>
                            &nbsp;
                            <TextField
                              id="ss1"
                              type="number"
                              name='social_security'
                              placeholder="N° SS (13+2 chiffres)"
                              value={this.state.social_security}
                              onChange={this.onChange}
                              errors={this.state.social_security}
                            />
                          </Grid>
                        :
                        null
                      }
                      <Grid>
                        <Radio color="primary" value={CESU[1]}/>J'accepte d'être déclaré en CESU
                      </Grid>
                      {
                        cesu == CESU[1] ?
                          <Grid style={{display: 'flex', marginLeft: 40}}>
                            <Grid>N° sécurité sociale</Grid>
                            &nbsp;
                            <TextField
                              id="ss1"
                              type="number"
                              name='social_security'
                              placeholder="N° SS (13+2 chiffres)"
                              value={this.state.social_security}
                              onChange={this.onChange}
                              errors={this.state.social_security}
                            />
                          </Grid>
                        :
                        null
                      }
                      <Grid>
                        <Radio color="primary" value={CESU[2]}/>Je n'accepte pas d'être déclaré(e) en CESU
                      </Grid>
                      <Information
                        open={this.state.notice}
                        onClose={() => this.setState({notice: false})}
                        text={I18N.CESU_NOTICE}
                      />
                    </RadioGroup>
                  </Grid>
                </Grid>
                :
                <Grid>
                  <Grid>
                    <Typography className={classes.policySizeContent}>
                      Un statut professionnel avec un numéro de SIRET est nécessaire pour les métiers réglementés et
                      permet une activité régulière sur My-Alfred. Seuls les professionnels peuvent proposer leurs
                      services aux entreprises qui ont besoin d’une facture. Un statut professionnel est requis dès
                      lors que votre activité devient régulière.
                    </Typography>
                  </Grid>
                  <div>
                    <ButtonSwitch label="Je suis éligible au Crédit Impôt Service" onChange={this.onCISChange}
                                  checked={this.state.cis}/>
                    <Siret onChange={this.onCompanyChanged} company={this.state.company}/>
                  </div>
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
                      <Typography className={classes.policySizeContent}>Je certifie sur l’honneur qu’il s’agit bien de
                        mon entreprise.</Typography>
                    }
                  /></Grid>
              }
            </Grid>
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
