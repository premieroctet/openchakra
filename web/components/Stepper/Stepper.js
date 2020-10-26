import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import StepperMaterial from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

import styles from './StepperStyle';


const ColorlibConnector = () =>{
  return(
    <Grid>
      <span> > </span>
    </Grid>
  )
};

class Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: props.isType === 'creaShop' ? this.getStepsCreaShop() : props.isType === 'updateService' ? this.getStepsUpdateService() : props.isType === 'confirmPaiement' ? this.getStepsPayement() :  this.getStepsAddService(),
    };
  }

  getStepsCreaShop() {
    return [
      'Bienvenue',
      'Créez votre boutique de services',
      'Indiquez vos prestations',
      'Paramétrez votre service',
      'Vos préférences de réservation',
      'Vos atouts pour ce service !',
      'Indiquez vos disponibilités',
      'Vos conditions de réservation',
      'Paramétrez votre boutique',
      'Présentez-vous !',

    ];
  }

  getStepsAddService() {
    return [
      'Ajouter un service',
      'Indiquez vos prestations',
      'Paramétrez votre service',
      'Vos préférences de réservation',
      'Vos atouts pour ce service !',
      //TODO a remettre quand les dispos seront affichés dans le schedule /'Indiquez vos disponibilités',
    ];
  }

  getStepsUpdateService() {
    return [
      'Configurez ce service',
      'Modifiez vos prestations',
      'Paramétrez votre service',
      'Vos préférences de réservation',
      'Vos atouts pour ce service !',
      //TODO a remettre quand les dispos seront affichés dans le schedule /'Indiquez vos disponibilités',
    ];
  }

  getStepsPayement() {
    return [
      'ADRESSE & FACTURATION',
      'PAIEMENT'
    ]
  }

  handleReset = () => {
    this.setState({setActiveStep: 0});
    this.setState({activeStep: 0});
  };

  render() {
    const {classes, activeStep} = this.props;

    return (
      <Grid className={classes.root}>
        <StepperMaterial activeStep={activeStep} nonLinear classes={{root : classes.stepperRoot}} connector={<ColorlibConnector />}>
          {this.state.steps.map(label => (
            <Step key={label} >
              <StepLabel StepIconProps={{
                classes: {root: classes.stepIcon},
              }}>{label}</StepLabel>
            </Step>
          ))}
        </StepperMaterial>
      </Grid>
    );
  }
}

Stepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(Stepper);
