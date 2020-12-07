import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import StepperMaterial from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Router from 'next/router';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import styles from './StepperStyle';


const ColorlibConnector = () =>{
  return(
    <ArrowForwardIosIcon style={{color:'#9E9E9E'}}/>
  )
};

class Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: props.isType === 'creaShop' ? this.getStepsCreaShop() : props.isType === 'updateService' ? this.getStepsUpdateService() : props.isType === 'confirmPaiement' ? this.getStepsPayement() :  this.getStepsAddService(),
      urlName : ''
    };
  }

  componentDidMount() {
    const url = Router.pathname;
    this.setState({urlName: url})

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
    const {urlName} = this.state;


    return (
      <Grid className={classes.root}>
        <StepperMaterial
          activeStep={activeStep}
          nonLinear
          classes={{root : classes.stepperRoot}}
          style={{
            justifyContent : urlName === '/creaShop/creaShop' ? 'space-around' : 'center'
          }}
          connector={<ColorlibConnector />}>
          {this.state.steps.map(label => (
            <Step key={label} classes={{root : classes.stepRoot}}>
              <StepLabel
                classes={{root: classes.stepLabelRoot}}
                StepIconProps={{classes: {root: classes.stepIcon},
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
