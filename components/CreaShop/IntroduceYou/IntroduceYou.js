import Grid from '@material-ui/core/Grid';
import { ErrorMessage, Field } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Siret from '../../WizardForm/Siret';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import styles from './IntroduceYouStyle';


class IntroduceYou extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      is_private: false,
      is_professional: false,
      isCertified: false
    }
  }

  render() {
    const {classes} = this.props;

    return (
      <Grid className={classes.mainContainer}>
        <Grid className={classes.contentContainer}>
          <Grid className={classes.contentLeft}>
            <Grid className={classes.contentLeftTop}>
              <Grid className={classes.contentTitle}>
                <h2>Indiquez votre message de bienvenue ! </h2>
              </Grid>
              <Grid>
                <Grid>
                  <h3>Les utilisateurs recevront votre message lorsque vous confirmerez leur réservation. </h3>
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
                              checked={this.state.is_private}
                              name={"isParticular"}
                              color="primary"
                              value={this.state.is_private}
                              onChange={() => {
                                this.state.is_private = !this.state.is_private;
                              }}
                              icon={<CircleUnchecked/>}
                              checkedIcon={<RadioButtonCheckedIcon />}
                            />
                          }
                          label={<Typography variant="h6" style={{fontSize: '1rem',fontWeight: 400, marginTop: 15, marginBottom: 10}}>
                            Je suis un particulier
                          </Typography>}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography style={{marginLeft: '2.5rem',fontSize: '1rem', fontWeight:400, fontFamily:'helvetica'}}>
                          En tant que particulier, vous pouvez rendre des services occasionnels sur My-Alfred. Si votre activité devient régulière, un statut professionnel (micro-entrepreneur,...) s’impose. Il est également requis pour certains secteurs d’activité réglementés.
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid container style={{ marginTop: 10 }}>
                      <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={this.state.is_professional}
                              name={"isProfessional"}
                              color="primary"
                              value={this.state.is_professional}
                              onChange={() => {
                                this.state.is_professional = !this.state.is_professional;
                              }}
                              icon={<CircleUnchecked/>}
                              checkedIcon={<RadioButtonCheckedIcon />}
                            />
                          }
                          label={<Typography variant="h6" style={{marginBottom: '.5rem',fontSize: '1rem', fontWeight:400,}}>
                            Je suis un professionnel
                          </Typography>}
                        />
                      </Grid>
                      <Grid item xs={11}>
                        <Typography style={{marginLeft: '2.5rem',fontSize: '1rem', fontWeight:400, fontFamily:'helvetica'}}>
                          Un statut professionnel est nécessaire pour les métiers réglementés et permet une activité régulière sur My-Alfred. Seuls les professionnels peuvent proposer leurs services aux entreprises qui ont besoin d’une facture. Un statut professionnel est requis dès lors que votre activité devient régulière.
                        </Typography>
                        {this.state.is_professional ?
                          <div style={{}}>
                            <Siret formikCtx={"test"}/>
                          </div> : null
                        }
                          <FormControlLabel
                            control={
                              <Checkbox
                                checked={this.state.isCertified}
                                onChange={() => {
                                  this.state.isCertified = !this.state.isCertified;
                                }}
                                color="primary"
                                name="isCertified"
                                value={this.state.isCertified}
                              />
                            }
                            label={
                              "Je certifie sur l’honneur qu’il s’agit bien de mon entreprise."
                            }
                          />
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
