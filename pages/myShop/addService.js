import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../creaShop/creaShopStyle'
import { withStyles } from '@material-ui/core/styles';
import Stepper from '../../components/Stepper/Stepper'
import SelectService from '../../components/CreaShop/SelectService/SelectService';
import SelectPrestation from '../../components/CreaShop/SelectPrestation/SelectPrestation';
import SettingService from '../../components/CreaShop/SettingService/SettingService';
import BookingPreference from '../../components/CreaShop/BookingPreference/BookingPreference';
import AssetsService from '../../components/CreaShop/AssetsService/AssetsService';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {ALF_CONDS, CANCEL_MODE} from '../../utils/consts.js';
const {config} = require('../../config/config');
const url = config.apiUrl;
import { toast } from 'react-toastify';
import Router from "next/router";
import {creaShopPresentation, selectService, selectPrestation, settingService, assetsService, settingShop, introduceYou} from '../../utils/validationSteps/validationSteps'

class addService extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      activeStep: 0,
      user_id: null,
      shop:{
        booking_request: true,     // true/false
        my_alfred_conditions: ALF_CONDS.BASIC, // BASIC/PICTURE/ID_CARD/RECOMMEND
        welcome_message: 'Merci pour votre réservation!',
        cancel_mode: CANCEL_MODE.FLEXIBLE,            // FLEXIBLE/MODERATE/STRICT
        is_particular: true,        // true/false : particulier.pro
        company: {name:null, creation_date:null, siret:null, naf_ape:null, status:null}, //
        is_certified: false,
        service: null,
        prestations:{},
        equipments: [], // Ids des équipements
        location: null, // Lieu(x) de prestation
        travel_tax: 0, // Frais de déplacement
        pick_tax: 0, // Frais de livraison/enlèvmeent
        minimum_basket: 0,
        deadline_value: 0, // Valeur de prévenance
        deadline_unit: "jours", // Unité de prévenance (h:heures, j:jours, s:semaines)
        description:"", // Description de l'expertise
        experience_years: 0,
        diploma : [{name:"", year:"", picture:""}],
        certification : [{name:"", year:"", picture:""}],
        service_address: {address:"", city:"", zip:"", country:""}, // Adresse différente ; null si non spécifiée
        perimeter: 0,
        availabilities: [],
      },
      title: "Précisez vos disponibilités si vous le souhaitez ! ",
      subtitle : "Si aucune disponibilité n’est précisée, vos services pourront être réservés à tout moment. Si vous précisez vos disponibilités, seules les plages horaires indiquées pourront être réservées. Vous pouvez appliquer une récurrence à vos disponibilités afin de gagner du temps ! Par exemple, si vous êtes disponible tous les lundis et mardis, vous pouvez cocher la case Récurrence, et cliquer sur Lu et Ma afin de répéter votre disponibilité sur une durée que vous pouvez définir."

    };
    this.onServiceChanged = this.onServiceChanged.bind(this);
    this.prestaSelected = this.prestaSelected.bind(this);
    this.settingsChanged = this.settingsChanged.bind(this);
    this.preferencesChanged = this.preferencesChanged.bind(this);
    this.assetsChanged = this.assetsChanged.bind(this);
    this.availabilityCreated = this.availabilityCreated.bind(this);
    this.availabilityDeleted = this.availabilityDeleted.bind(this);
    this.conditionsChanged = this.conditionsChanged.bind(this);
    this.shopSettingsChanged = this.shopSettingsChanged.bind(this);
    this.introduceChanged = this.introduceChanged.bind(this);
    this.nextDisabled = this.nextDisabled.bind(this)
  }

  componentDidMount() {
    localStorage.setItem('path',Router.pathname);
    const token = localStorage.getItem('token');
    if (token === null) {
      Router.push('/login');
    }

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
    axios.get(url+'myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({user_id: user._id});
      })
      .catch(error => {
        console.log(error);
      })
  }

  nextDisabled() {
    let shop = this.state.shop;
    let pageIndex = this.state.activeStep;
    if (pageIndex===1) { return selectService(shop) }
    if (pageIndex===2) { return selectPrestation(shop) }
    if (pageIndex===3) { return settingService(shop) }
    if (pageIndex===5) { return assetsService(shop) }
    if (pageIndex===8) { return settingShop(shop) }
    if (pageIndex===9) { return introduceYou(shop) }
    return false;
  }

  availabilityCreated(avail) {
    console.log("Availability created:"+JSON.stringify(avail, null, 2));
    let shop = this.state.shop;
    shop.availabilities.push(avail);
    this.setState({shop: shop});
  }

  availabilityDeleted(avail_id) {
    console.log("Availability id deleted:"+JSON.stringify(avail_id, null, 2));
    let shop = this.state.shop;
    shop.availabilities=shop.availabilities.filter(avail => avail.ui_id !== avail_id);
    this.setState({shop: shop});
  }

  handleNext = () => {
    console.log("Handle next");
    if (this.state.activeStep<9) {
      this.setState({activeStep: this.state.activeStep + 1});
    }
    // last page => post
    else {
      axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
      axios.post(url+'myAlfred/api/shop/add', this.state.shop)
        .then(res => {
          toast.info("Boutique créée avec succès");
          Router.push(`/shop?id_alfred=${this.state.user_id}`);
        })
        .catch(err => {
          toast.error(err);
        })

    }
  };

  isRightPanelHidden() {
    return this.state.activeStep===2 || this.state.activeStep===6;
  };

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1});
  };

  onServiceChanged(service_id){
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
    let shop=this.state.shop;
    shop.location=location;
    shop.travel_tax=travel_tax;
    shop.pick_tax=pick_tax;
    shop.equipments=selectedStuff;
    this.setState({shop: shop});
  }

  preferencesChanged(state) {
    let shop=this.state.shop;

    shop.minimum_basket=state.minimum_basket;
    shop.deadline_unit=state.deadline_unit;
    shop.deadline_value=state.deadline_value;
    shop.perimeter=state.perimeter;

    this.setState({ shop: shop });
  }

  assetsChanged(state) {
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
    let shop=this.state.shop;
    shop.booking_request=book_request;
    shop.my_alfred_conditions=conditions;
    this.setState({shop: shop});
  }

  shopSettingsChanged(welcome_message, cancel_mode) {
    let shop=this.state.shop;
    shop.welcome_message=welcome_message;
    shop.cancel_mode=cancel_mode;
    this.setState({shop: shop});
  }

  introduceChanged(is_particular, company, is_certified) {
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
  }

  renderSwitch(stepIndex) {
    let shop = this.state.shop;
    switch (stepIndex) {
      case 0:
        return <SelectService onChange={this.onServiceChanged} service={shop.service}/>;
      case 1:
        return <SelectPrestation service={shop.service} onChange={this.prestaSelected}/>;
      case 2:
        return <SettingService service={shop.service} onChange={this.settingsChanged}/>;
      case 3:
        return <BookingPreference service={shop.service} onChange={this.preferencesChanged}/>;
      case 4:
        return <AssetsService data={shop} onChange={this.assetsChanged}/>;
    }
  }


  render() {

    const {classes} = this.props;
    let hideRightPanel = this.isRightPanelHidden();

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



export default withStyles(styles)(addService);

