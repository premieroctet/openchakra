import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import styles from './StepperStyle'

class Stepper extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeStep : 0,
      setActiveStep: 0,
      steps: this.getSteps()
    }
  }

   getSteps() {
    return ['Select master blaster campaign settings', 'Create an ad group', 'Create an ad'];
  }

   getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return 'Select campaign settings...';
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return 'This is the bit I really care about!';
      default:
        return 'Unknown stepIndex';
    }
  }


  render() {
    const {classes} = this.props;

    const handleNext = () => {
      this.state.setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
      this.state.setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const handleReset = () => {
      this.state.setActiveStep(0);
    };

    return(
      <div className={classes.root}>
        <Stepper activeStep={this.state.activeStep} alternativeLabel>
          {this.state.steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {this.state.activeStep === this.state.steps.length ? (
            <div>
              <Typography className={classes.instructions}>All steps completed</Typography>
              <Button onClick={handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Typography className={classes.instructions}>{this.getStepContent(this.state.activeStep)}</Typography>
              <div>
                <Button
                  disabled={this.state.activeStep === 0}
                  onClick={handleBack}
                  className={classes.backButton}
                >
                  Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleNext}>
                  {this.state.activeStep === this.state.steps.length - 1 ? 'Finish' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

}

Stepper.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (Stepper);
