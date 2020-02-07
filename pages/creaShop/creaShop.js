import React from 'react';
import Layout from '../../hoc/Layout/Layout';
import Grid from '@material-ui/core/Grid';
import styles from './creaShopStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreaShopPresentation from '../../components/CreaShop/CreaShopPresentation/CreaShopPresentation';
import Stepper from '../../components/Stepper/Stepper'
import NavigationBarForm from '../../components/CreaShop/NavigationBarForm/NavigationBarForm';
import SelectService from '../../components/CreaShop/SelectService/SelectService';

class creaShop extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeStep: 0
    }
  }

  getNextStep = (step) =>{
    this.setState({activeStep: step + 1});
  };

  getPreviousStep = (step) =>{
    this.setState({activeStep: step - 1})
  };

  renderSwitch(param) {
    switch(param) {
      case 0 :
        return <CreaShopPresentation/>;
      case 1 :
        return <SelectService/>;
    }
  }

  render() {
    const {classes} = this.props;

    return(
      <Layout>
        <Grid className={classes.spacer}/>
        <Grid className={classes.mainContainer}>
          <Grid className={classes.contentStepper}>
            <Stepper activeStep={this.state.activeStep}/>
          </Grid>
          <Grid>
            {this.renderSwitch(this.state.activeStep)}
          </Grid>
        </Grid>
        <Grid className={classes.mainContainer}>
          <NavigationBarForm nextStep={this.getNextStep} previousStep={this.getPreviousStep}/>
        </Grid>
      </Layout>
    )
  }

}

creaShop.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (creaShop);
