import React from 'react';
import Layout from '../../hoc/Layout/Layout';
import Grid from '@material-ui/core/Grid';
import styles from './creaShopStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CreaShopPresentation from '../../components/CreaShop/CreaShopPresentation/CreaShopPresentation';
import Stepper from '../../components/Stepper/Stepper'
import SelectService from '../../components/CreaShop/SelectService/SelectService';
import SelectPrestation from '../../components/CreaShop/SelectPrestation/SelectPrestation';
import SettingService from '../../components/CreaShop/SettingService/SettingService';
import BookingPreference from '../../components/CreaShop/BookingPreference/BookingPreference';
import AssetsService from '../../components/CreaShop/AssetsService/AssetsService';
import Schedule from '../../components/Schedule/Schedule';
import BookingConditions from '../../components/CreaShop/BookingConditions/BookingConditions';
import SettingShop from '../../components/CreaShop/SettingShop/SettingShop';
import IntroduceYou from '../../components/CreaShop/IntroduceYou/IntroduceYou';
import Link from 'next/link';
import Button from '@material-ui/core/Button';

class creaShop extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeStep: 0,
      availabilities: [],
      hide: false,
      shop:{
        booking_request: false,     // true/false
        my_alfred_conditions: null, // BASIC/PICTURE/ID_CARD/RECOMMEND
        welcome_message: "",
        cancel_mode: "",            // FLEXIBLE/MODERATE/STRICT
        is_particular: true,        // true/false : particulier.pro
        company: {name:null, creation_date:null, siret:null, naf_ape:null, status:null}, //
        service: null,
        prestations:{},
        equipments: [{equipement_id: "quip_id"}], // Ids des équipements
        location: {alfred:false, client:false, visio:false}, // Lieu(x) de prestation
        travel_tax: 0, // Frais de déplacement
        pick_tax: 0, // Frais de livraison/enlèvmeent
        minimum_basket: 0,
        deadline_value: 0, // Valeur de prévenance
        deadline_unit: "j", // Unité de prévenance (h:heures, j:jours, s:semaines)
        description:"", // Description de l'expertise
        experience_years: 0,
        diploma : [{name:"", year:"", picture:""}],
        certification : [{name:"", year:"", picture:""}],
        address: {address:"", city:"", zip:"", country:""}, // Adresse différente ; null si non spécifiée
        perimeter: 0,
    }
    };
    this.serviceSelected = this.serviceSelected.bind(this)
  }

  availabilityCreated(avail) {
    this.setState({availabilities: [avail, ...this.state.availabilities]});
  }

  handleNext = () => {
    this.setState({activeStep: this.state.activeStep + 1});
    if(this.state.activeStep === 1 || this.state.activeStep === 5){
      this.setState({hide: !this.state.hide})
    }else{
      this.setState({hide: false})
    }
  };

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1});
  };

  serviceSelected(service_id){
    console.log("Service selected:"+service_id);
    let shop = this.state.shop;
    shop.service = service_id;
    this.setState({shop: shop});
  }

  renderSwitch(param) {
    switch(param) {
      case 0 :
        return <CreaShopPresentation/>;
      case 1 :
        return <SelectService serviceCb={this.serviceSelected}/>;
      case 2 :
        return <SelectPrestation service={this.state.shop.service}/>;
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
      <Grid>
        <Grid className={classes.mainHeader}>
          <Grid className={classes.imageContentHeader}>
            <Link href={'/'}>
              <img src={'../../../static/logo_final_My-Alfred.svg'} style={{cursor: "pointer"}} alt={'Logo Bleu'}/>
            </Link>
          </Grid>
          <Grid className={classes.contentStepper}>
            <Stepper activeStep={this.state.activeStep}/>
          </Grid>
        </Grid>
        <Grid className={classes.marginContainer}>
          <Grid className={classes.mainContainer}>
            <Grid className={this.state.hide ? classes.mainContainerNoImg : classes.leftContentComponent }>
              {this.renderSwitch(this.state.activeStep)}
            </Grid>
            { !this.state.hide ?
              <Grid className={classes.rightContentComponent}>
                <Grid className={classes.contentRight} style={{backgroundImage: `url(../../../static/assets/img/creaShop/bgImage/etape${this.state.activeStep}.svg)`}}/>
              </Grid>
              : null
            }
          </Grid>
        </Grid>
        <Grid className={classes.footerMainContainer}>
          <Grid className={classes.footerContainer}>
            <Grid className={classes.marginHr}>
              <hr style={{color: "rgb(255, 249, 249, 0.6)", borderRadius: 10}}/>
            </Grid>
            <Grid className={classes.navButtonContent}>
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
        </Grid>
      </Grid>
    )
  }
}

creaShop.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (creaShop);
