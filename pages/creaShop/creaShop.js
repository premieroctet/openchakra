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
import SelectPrestation from '../../components/CreaShop/SelectPrestation/SelectPrestation';
import SettingService from '../../components/CreaShop/SettingService/SettingService';
import BookingPreference from '../../components/CreaShop/BookingPreference/BookingPreference';
import AssetsService from '../../components/CreaShop/AssetsService/AssetsService';
import Schedule from '../../components/Schedule/Schedule';
import BookingConditions from '../../components/CreaShop/BookingConditions/BookingConditions';
import SettingShop from '../../components/CreaShop/SettingShop/SettingShop';
import IntroduceYou from '../../components/CreaShop/IntroduceYou/IntroduceYou';

class creaShop extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeStep: 0,
      availabilities: [],
    }
  }

  getNextStep = (step) =>{
    this.setState({activeStep: step + 1});
  };

  getPreviousStep = (step) =>{
    this.setState({activeStep: step - 1})
  };

  availabilityCreated(avail) {
    this.setState({availabilities: [avail, ...this.state.availabilities]});
  }

  renderSwitch(param) {
    switch(param) {
      case 0 :
        return <CreaShopPresentation/>;
      case 1 :
        return <SelectService/>;
      case 2 :
        return <SelectPrestation/>;
      case 3 :
        return <SettingService/>;
      case 4 :
        return <BookingPreference/>;
      case 5 :
        return <AssetsService/>;
      case 6 :
        return <Schedule availabilities={this.state.availabilities}
                         services={[]}
                         cbAvailabilityCreated={this.availabilityCreated}
        />;
      case 7 :
        return <BookingConditions/>;
      case 8 :
        return <SettingShop/>;
      case 9 :
        return <IntroduceYou/>;
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
        <Grid className={classes.footerContainer}>
          <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
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
