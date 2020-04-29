import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Siret from '../../WizardForm/Siret';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from '../componentStyle';


class IntroduceYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_particular: this.props.is_particular,
      company: this.props.company,
      is_certified: this.props.is_certified
    };

    this.onStatusChanged=this.onStatusChanged.bind(this);
    this.onCertifiedChanged=this.onCertifiedChanged.bind(this);
    this.onCompanyChanged=this.onCompanyChanged.bind(this);
  }

  onStatusChanged(event, checked) {
   let id=event.target.id;
    console.log("Status changed:"+id+checked);
    console.log("State:"+JSON.stringify(this.state));
    let req = (id==='particular' && checked) || (id==='professional' && !checked);
    console.log("Is particular is "+req);
    const company=req ? null : this.state.company;
    this.setState({is_particular: req, company: company},
      () => this.props.onChange(req, this.state.company, this.state.is_certified));

  }

  onCertifiedChanged(event) {
    console.log("Certified change:"+event.target.checked);
    this.setState({is_certified: event.target.checked},
      () => this.props.onChange(this.state.is_particular, this.state.company, this.state.is_certified));
  }

  onCompanyChanged(company) {
    this.setState({company: company},
      () => this.props.onChange(this.state.is_particular, this.state.company, this.state.is_certified));
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid className={classes.contentLeft}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <Typography className={classes.policySizeTitle}>Indiquez votre message de bienvenue ! </Typography>
              </Grid>
              <Grid>
                <Grid>
                  <h3 className={classes.policySizeSubtitle}>Les utilisateurs recevront votre message lorsque vous confirmerez leur réservation. </h3>
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
                              name={"isParticular"}
                              color="primary"
                              value={this.state.is_particular}
                              onChange={this.onStatusChanged}
                              icon={<CircleUnchecked/>}
                              checkedIcon={<RadioButtonCheckedIcon />}
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
                          En tant que particulier, vous pouvez rendre des services occasionnels sur My-Alfred. Si votre activité devient régulière, un statut professionnel (micro-entrepreneur,...) s’impose. Il est également requis pour certains secteurs d’activité réglementés.
                        </p>
                      </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: 10, marginBottom: 100 }}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              id='professional'
                              checked={!this.state.is_particular}
                              name={"isProfessional"}
                              color="primary"
                              value={this.state.is_particular}
                              onChange={this.onStatusChanged}
                              icon={<CircleUnchecked/>}
                              checkedIcon={<RadioButtonCheckedIcon />}
                            />
                          }
                          label={
                            <p className={classes.policySizeSubtitle}>
                            Je suis un professionnel
                          </p>
                          }
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <p className={classes.policySizeContent}>
                          Un statut professionnel est nécessaire pour les métiers réglementés et permet une activité régulière sur My-Alfred. Seuls les professionnels peuvent proposer leurs services aux entreprises qui ont besoin d’une facture. Un statut professionnel est requis dès lors que votre activité devient régulière.
                        </p>
                        {this.state.is_particular ? null:
                          <React.Fragment><div>
                            <Siret onChange={this.onCompanyChanged} company={this.state.company} />
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
                              <p className={classes.policySizeContent}>Je certifie sur l’honneur qu’il s’agit bien de mon entreprise.</p>
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
    )
  }
}

IntroduceYou.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (IntroduceYou);
