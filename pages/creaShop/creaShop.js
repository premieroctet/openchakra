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
import {ALF_CONDS, CANCEL_MODE} from '../../utils/consts.js';

class creaShop extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeStep: 9,
      shop:{
        booking_request: true,     // true/false
        my_alfred_conditions: ALF_CONDS.BASIC, // BASIC/PICTURE/ID_CARD/RECOMMEND
        welcome_message: "Coucou",
        cancel_mode: "",            // FLEXIBLE/MODERATE/STRICT
        is_particular: false,        // true/false : particulier.pro
        company: {name:null, creation_date:null, siret:null, naf_ape:null, status:null}, //
        is_certified: false,
        service: "5d66a0fb08b3d612bd0864f4",
        prestations:{},
        equipments: [], // Ids des équipements
        location: null, // Lieu(x) de prestation
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
        availabilities: [],
    }
    };

    this.serviceSelected = this.serviceSelected.bind(this)
    this.prestaSelected = this.prestaSelected.bind(this)
    this.settingsChanged = this.settingsChanged.bind(this)
    this.preferencesChanged = this.preferencesChanged.bind(this)
    this.assetsChanged = this.assetsChanged.bind(this)
    this.availabilityCreated = this.availabilityCreated.bind(this);
    this.conditionsChanged = this.conditionsChanged.bind(this);
    this.shopSettingsChanged = this.shopSettingsChanged.bind(this);
    this.introduceChanged = this.introduceChanged.bind(this);

    this.nextDisabled = this.nextDisabled.bind(this)
  }

  nextDisabled() {
    console.log(JSON.stringify(this.state.shop.availabilities, null, 2));
    console.log("Page:"+this.state.activeStep)
    let shop=this.state.shop;
    let pageIndex = this.state.activeStep;
    if (pageIndex==0) { return false; }
    if (pageIndex==1) { return shop.service==null}
    if (pageIndex==2) {
      console.log("Prestas:"+JSON.stringify(shop.prestations));
      if (Object.keys(shop.prestations).length==0) return "disabled";
      return Object.values(shop.prestations).every( v => {
        console.log(v.price==0);
        if (v.price==0 || v.billing==null || v.billing==undefined || Object.keys(v.billing).length==0) {
          return false;
        }
        return true;
      })? false : true;
    }
    if (pageIndex==3) {
      if (shop.location==null)  return true;
      if (Object.values(shop.location).every( v => !v)) return true;
    }
    if (pageIndex==5) {
      if (shop.diplomaName=='' && shop.diplomaYear!='') return true;
      if (shop.diplomaName!='' && shop.diplomaYear=='') return true;
      if (shop.certificationName=='' && shop.certificationYear!='') return true;
      if (shop.certificationName!='' && shop.certificationYear=='') return true;
    }
    if (pageIndex==8) {
      if (shop.cancel_mode=='' || shop.cancel_mode==null) {
        return true;
      }
    }
    if (pageIndex==9) {
      if (shop.particular==null || shop.particular==undefined) { return true }
    }
    return false;
  }

  availabilityCreated(avail) {
    let shop = this.state.shop;
    shop.availabilities.push(avail);
    this.setState({shop: shop});
  }

  handleNext = () => {
    this.setState({activeStep: this.state.activeStep + 1});
  }

  isRightPanelHidden() {
    return this.state.activeStep==2 || this.state.activeStep==6;
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

  prestaSelected(presta) {
    let shop=this.state.shop;
    shop.prestations=presta;
    this.setState({shop: shop});
  }

  settingsChanged(location, travel_tax, pick_tax, selectedStuff) {
    console.log("settingsChanged");
    let shop=this.state.shop;
    shop.location=location;
    shop.travel_tax=travel_tax;
    shop.pick_tax=pick_tax;
    shop.equipments=selectedStuff;
    this.setState({shop: shop});
  }
  
  preferencesChanged(state) {
    console.log("Prefs changed:"+JSON.stringify(state));
    let shop=this.state.shop;

    shop.minimum_basket=state.minimum_basket;
    shop.deadline_unit=state.deadline_unit;
    shop.deadline_value=state.deadline_value;
    shop.perimeter=state.perimeter;

    this.setState({ shop: shop });
  }

  assetsChanged(state) {
    console.log("Assets changed:"+JSON.stringify(state));
    let shop=this.state.shop;

    shop.description=state.description;
    shop.level=state.level;
    shop.diplomaName = state.diplomaName;
    shop.diplomaYear = state.diplomaYear;
    shop.certificationName = state.certificationName;
    shop.certificationYear = state.certificationYear;

    this.setState({shop: shop});
  }

  conditionsChanged(book_request, conditions) {
    console.log("Conditions:"+book_request+","+conditions);
    let shop=this.state.shop;
    shop.booking_request=book_request;
    shop.my_alfred_conditions=conditions;
    this.setState({shop: shop});
  }

  shopSettingsChanged(welcome_message, cancel_mode) {
    console.log("shopSettingsChanged:"+welcome_message, cancel_mode);
    let shop=this.state.shop;
    shop.welcome_message=welcome_message;
    shop.cancel_mode=cancel_mode;
    this.setState({shop: shop});
  }

  introduceChanged(is_particular, company, is_certified) {
    console.log("introduceChanged:"+is_particular, company, is_certified);
    let shop=this.state.shop;
    shop.is_particular=is_particular;
    shop.is_certified=is_certified;
    if (is_particular) {
      shop.company=null;
    }
    else {
      shop.company=company; 
    }
    this.setState({shop: shop});
    console.log("After introduceChanged:"+JSON.stringify(shop));
  }

  renderSwitch(stepIndex) {
    let shop=this.state.shop;
    switch(stepIndex) {
      case 0:
        return <CreaShopPresentation/>;
      case 1:
        return <SelectService onChange={this.serviceSelected}/>;
      case 2:
        return <SelectPrestation service={shop.service} onChange={this.prestaSelected} />;
      case 3:
        return <SettingService service={shop.service} onChange={this.settingsChanged} />;
      case 4:
        return <BookingPreference service={shop.service} onChange={this.preferencesChanged} />;
      case 5:
        return <AssetsService onChange={this.assetsChanged} />;
      case 6:
        return <Schedule availabilities={shop.availabilities} services={[]} onCreateAvailability={this.availabilityCreated} />;
      case 7:
        return <BookingConditions conditions={shop.my_alfred_conditions} booking_request={shop.booking_request}  onChange={this.conditionsChanged} />;
      case 8:
        return <SettingShop welcome_message={shop.welcome_message} cancel_mode={shop.cancel_mode} onChange={this.shopSettingsChanged}  />;
      case 9:
        return <IntroduceYou is_particular={shop.is_particular} company={shop.company} is_certified={shop.is_certified} onChange={this.introduceChanged} />;
    }
  }



  render() {
    const {classes} = this.props;

    let hideRightPanel = this.isRightPanelHidden();

    console.log("Render:"+JSON.stringify(this.state.shop));
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
            <Grid className={hideRightPanel ? classes.mainContainerNoImg : classes.leftContentComponent }>
              {this.renderSwitch(this.state.activeStep)}
            </Grid>
            { hideRightPanel ?
              null:
              <Grid className={classes.rightContentComponent}>
                <Grid className={classes.contentRight} style={{backgroundImage: `url(../../../static/assets/img/creaShop/bgImage/etape${this.state.activeStep}.svg)`}}/>
              </Grid>
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
                <Button variant="contained" color="secondary" className={classes.nextButton} onClick={this.handleNext} disabled={this.nextDisabled()}>
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
