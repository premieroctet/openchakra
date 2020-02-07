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
      <Grid className={classes.contentLeftFooter}>
        <Grid style={{display: "flex",justifyContent: "space-between"}}>
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
            <Button variant="contained" color="secondary" onClick={this.handleNext}>
              Suivant
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
