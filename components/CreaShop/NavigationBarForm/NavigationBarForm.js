import React from 'react';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import styles from './NavigationBarFormStyle'

class NavigationBarForm extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeStep : 0,
    }
  }

  handleNext = () => {
    this.setState({activeStep: this.state.activeStep + 1});
    this.props.nextStep(this.state.activeStep);
  };

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1});
    this.props.previousStep(this.state.activeStep);
  };

  render() {
    const {classes} = this.props;

    return(
      <Grid className={classes.contentFooter}>
        <Grid>
          <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
        </Grid>
        <Grid style={{display: 'flex'}}>
          <Grid>
            <Button
              color="primary"
              disabled={this.state.activeStep === 0}
              onClick={this.handleBack}
            >
              Retour
            </Button>
          </Grid>
          <Grid>
            <Button variant="contained" color="secondary" className={classes.nextButton} onClick={this.handleNext}>
              {this.state.activeStep === 9 ? 'Envoyer' : 'Suivant'}
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }

}

NavigationBarForm.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (NavigationBarForm);
