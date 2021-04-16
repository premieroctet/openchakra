import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import StepperMaterial from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import styles from './StepperStyle';


const ColorlibConnector = () =>{
  return(
    <ArrowForwardIosIcon style={{color:'#9E9E9E'}}/>
  )
};

class Stepper extends React.Component {

  render() {
    const {classes, activeStep, orientation, steps} = this.props;

    const isVertical = orientation == 'vertical'
    return (
      <Grid className={classes.root}>
        <StepperMaterial
          activeStep={activeStep}
          orientation={orientation}
          classes={{root : isVertical ? classes.stepperShop : classes.stepperRoot}}
          style={{
            justifyContent : isVertical ? 'space-around' : 'center'
          }}
          connector={isVertical ? <Grid/> : <ColorlibConnector />}>
          {steps.map(label => (
            <Step key={label} classes={{root : isVertical ? classes.stepShop : classes.stepRoot}}>
              <StepLabel
                classes={{root: orientation === 'vertical' ? classes.stepLabelShop :classes.stepLabelRoot}}
                StepIconProps={{classes: {root: isVertical ? classes.stepIconShop : classes.stepIcon},
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
