import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Siret from '../../Siret/Siret';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import styles from '../componentStyle';
import {Radio, RadioGroup} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import ButtonSwitch from '../../../components/ButtonSwitch/ButtonSwitch';
import Information from '../../Information/Information';

const {CESU} = require('../../../utils/consts');
const I18N = require('../../../utils/i18n');

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

    this.onStatusChanged = this.onStatusChanged.bind(this);
    this.onCertifiedChanged = this.onCertifiedChanged.bind(this);
    this.onCompanyChanged = this.onCompanyChanged.bind(this);
  }

  fireChange() {
    this.props.onChange(this.state.is_particular, this.state.company, this.state.is_certified, this.state.cesu, this.state.cis, this.state.social_security);
  }

  onChange = event => {
    const {name, value} = event.target;
    console.log(`onChange:${name}=>${value}`);
    this.setState({[name]: value},
      () => this.fireChange());
  };

  onCISChange = (id, checked) => {
    this.setState({cis: checked},
      () => this.fireChange());
  };

  onStatusChanged(event, checked) {
    let id = event.target.id;
    let req = (id === 'particular' && checked) || (id === 'professional' && !checked);
    const company = req ? null : this.state.company;
    this.setState({is_particular: req, company: company},
      () => this.fireChange());

  }

  onCertifiedChanged(event) {
    console.log('Certified change:' + event.target.checked);
    this.setState({is_certified: event.target.checked},
      () => this.fireChange());
  }

  onCompanyChanged(company) {
    console.log(`Company changed:${JSON.stringify(company)}`);
    this.setState({company: company},
      () => this.fireChange());
  }

  render() {
    const {classes} = this.props;

    const {cesu} = this.state;
    console.log(`CESU:${this.state.cesu}`);

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid className={classes.contentLeft}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Précisez votre statut ! </Typography>
              </Grid>
              <Grid>
                <Grid style={{display: 'flex'}}>
                  <h3 className={classes.policySizeSubtitle}>
                    Indiquez si vous proposez vos services en tant que particulier ou via une entreprise
                    &nbsp;
                    <img src="/static/assets/img/info.svg" width={16} onClick={() => this.setState({notice: true})}/>
                  </h3>

                  <Information
                    open={this.state.notice}
                    onClose={() => this.setState({notice: false})}
                    text={I18N.CESU_NOTICE}
                  />
                </Grid>
              </Grid>
              <Grid>
                <Grid>
                  <Grid container className={classes.checkboxespart}>
                    <Grid container>
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
                          label={
                            <p className={classes.policySizeSubtitle}>
                              Je suis un particulier
                            </p>}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <p className={classes.policySizeContent}>
                          En tant que particulier, vous pouvez rendre des services occasionnels sur My-Alfred. Si votre
                          activité devient régulière, un statut professionnel (micro-entrepreneur,...) s’impose. Il est
                          également requis pour certains secteurs d’activité réglementés.
                        </p>
                      </Grid>
                      {this.state.is_particular ?
                        <Grid style={{marginLeft: 40}}>
                          <RadioGroup name={'cesu'} value={this.state.cesu} onChange={this.onChange}>
                            <div><Radio color="primary" value={CESU[0]}/>Je veux être déclaré(e) en CESU</div>
                            {cesu == CESU[0] ?
                              <Grid style={{display: 'flex', marginLeft: 40}}>
                                <div>N° sécurité sociale</div>
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
                              null}
                            <div><Radio color="primary" value={CESU[1]}/>J'accepte d'être déclaré en CESU</div>
                            {cesu == CESU[1] ?
                              <Grid style={{display: 'flex', marginLeft: 40}}>
                                <div>N° sécurité sociale</div>
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
                              null}
                            <div><Radio color="primary" value={CESU[2]}/>Je n'accepte pas d'être déclaré(e) en CESU
                            </div>
                            <Information
                              open={this.state.notice}
                              onClose={() => this.setState({notice: false})}
                              text={I18N.CESU_NOTICE}
                            />
                          </RadioGroup>
                        </Grid>
                        : null
                      }
                    </Grid>
                    <Grid container style={{marginTop: 10, marginBottom: 100}}>
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
                            <p className={classes.policySizeSubtitle}>
                              Je suis un professionnel/J'ai un numéro de SIRET
                            </p>
                          }
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <p className={classes.policySizeContent}>
                          Un statut professionnel avec un numéro de SIRET est nécessaire pour les métiers réglementés et
                          permet une activité régulière sur My-Alfred. Seuls les professionnels peuvent proposer leurs
                          services aux entreprises qui ont besoin d’une facture. Un statut professionnel est requis dès
                          lors que votre activité devient régulière.
                        </p>
                        {this.state.is_particular ? null :
                          <React.Fragment>
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
                                <p className={classes.policySizeContent}>Je certifie sur l’honneur qu’il s’agit bien de
                                  mon entreprise.</p>
                              }
                            /></React.Fragment>
                        }
                      </Grid>
                    </Grid>
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

IntroduceYou.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(IntroduceYou);
