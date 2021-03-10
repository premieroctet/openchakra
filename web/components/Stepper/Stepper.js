import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import StepperMaterial from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Router from 'next/router';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import StepConnector from '@material-ui/core/StepConnector';

import styles from './StepperStyle';


const ColorlibConnector = () =>{
  return(
    <ArrowForwardIosIcon style={{color:'#9E9E9E'}}/>
  )
};

const PaddingConnector = () =>{
  return(
    <Grid style={{padding: 10}}/>
  )
};
class Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: props.isType === 'creaShop' ? this.getStepsCreaShop() : props.isType === 'updateService' ? this.getStepsUpdateService() : props.isType === 'confirmPaiement' ? this.getStepsPayment() :  this.getStepsAddService(),
      urlName : ''
    };
  }

  getStepsCreaShop() {
    return [
      'Bienvenue',
      'Création',
      'Prestations',
      'Paramétrage',
      'Préférences',
      'Atouts',
      'Disponibilités',
      'Conditions',
      'Profil',
      'Présentation',

    ];
  }

  getStepsAddService() {
    return [
      'Ajouter',
      'Prestations',
      'Paramétrage',
      'Préférences',
      'Atouts',
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

  getStepsPayment() {
    return [
      'ADRESSE & FACTURATION',
      'PAIEMENT'
    ]
  }

  handleReset = () => {
    this.setState({setActiveStep: 0, activeStep: 0});
  };

  render() {
    const {classes, activeStep, isType} = this.props;

    return (
      <Grid className={classes.root}>
        <StepperMaterial
          activeStep={activeStep}
          orientation={isType === 'creaShop' ? 'vertical' : 'horizontal'}
          classes={{root :   isType === 'creaShop' ? classes.stepperShop : classes.stepperRoot}}
          style={{
            justifyContent : isType === 'creaShop' ? 'space-around' : 'center'
          }}
          connector={isType === 'creaShop' ? <Grid/> : <ColorlibConnector />}>
          {this.state.steps.map(label => (
            <Step key={label} classes={{root : isType === 'creaShop' ? classes.stepShop : classes.stepRoot}}>
              <StepLabel
                classes={{root: isType === 'creaShop' ? classes.stepLabelShop :classes.stepLabelRoot}}
                StepIconProps={{classes: {root: isType === 'creaShop' ? classes.stepIconShop : classes.stepIcon},
              }}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </StepperMaterial>
      </Grid>
    );
  }
}

export default withStyles(styles)(Stepper);
