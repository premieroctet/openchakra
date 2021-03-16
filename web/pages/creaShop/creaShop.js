import CssBaseline from "@material-ui/core/CssBaseline";
import MenuIcon from '@material-ui/icons/Menu';
const {setAuthToken, setAxiosAuthentication}=require('../../utils/authentication');
import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../../static/css/pages/creaShop/creaShopStyle';
import {withStyles} from '@material-ui/core/styles';
import CreaShopPresentation from '../../components/CreaShop/CreaShopPresentation/CreaShopPresentation';
import Stepper from '../../components/Stepper/Stepper';
import SelectService from '../../components/CreaShop/SelectService/SelectService';
import SelectPrestation from '../../components/CreaShop/SelectPrestation/SelectPrestation';
import SettingService from '../../components/CreaShop/SettingService/SettingService';
import BookingPreference from '../../components/CreaShop/BookingPreference/BookingPreference';
import AssetsService from '../../components/CreaShop/AssetsService/AssetsService';
import BookingConditions from '../../components/CreaShop/BookingConditions/BookingConditions';
import IntroduceYou from '../../components/CreaShop/IntroduceYou/IntroduceYou';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {ALF_CONDS, CANCEL_MODE, GID_LEN} from '../../utils/consts.js';
import Router from 'next/router';
import {
  assetsService,
  creaShopPresentation,
  introduceYou,
  selectPrestation,
  selectService,
  settingService,
  settingShop,
  bookingPreferences,
} from '../../utils/validationSteps/validationSteps';
import DrawerAndSchedule from '../../components/Drawer/DrawerAndSchedule/DrawerAndSchedule';
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import Box from "../../components/Box/Box";
const I18N = require('../../utils/i18n');
const {getLoggedUserId}=require('../../utils/functions')
const {getDefaultAvailability}=require('../../utils/dateutils')

const PRESENTATION0=0
const INTRODUCE1=1
const SELECTSERVICE2=2
const SELECTPRESTATION3=3
const SETTINGSERVICE4=4
const BOOKINGPREFERENCE5=5
const ASSETSSERVICE6=6
const SCHEDULE7=7
const BOOKCONDITIONS8=8

const LASTSTEP=BOOKCONDITIONS8

class creaShop extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      mobileOpen: false,
      activeStep: 0,
      user_id: null,
      saving: false,
      availabilities: [],
      currentUser:{},
      shop: {
        particular_access: false,
        professional_access: false,
        booking_request: true,     // true/false
        my_alfred_conditions: ALF_CONDS.BASIC, // BASIC/PICTURE/ID_CARD/RECOMMEND
        welcome_message: 'Merci pour votre réservation!',
        cancel_mode: CANCEL_MODE.FLEXIBLE,            // FLEXIBLE/MODERATE/STRICT
        is_particular: true,        // true/false : particulier.pro
        company: {name: null, creation_date: null, siret: null, naf_ape: null, status: null}, //
        is_certified: false,
        service: null,
        description: '', // Description de l'expertise
        prestations: {},
        equipments: [], // Ids des équipements
        location: null, // Lieu(x) de prestation
        travel_tax: 0, // Frais de déplacement
        pick_tax: 0, // Frais de livraison/enlèvmeent
        minimum_basket: 0,
        diplomaName: null,
        diplomaYear: null,
        diplomaPicture: null,
        certificationName: null,
        certificationYear: null,
        certificationPicture: null,
        deadline_value: 1, // Valeur de prévenance
        deadline_unit: 'jours', // Unité de prévenance (h:heures, j:jours, s:semaines)
        level: '',
        service_address: null,
        perimeter: null,
        cesu: null,
        cis: false,
        social_security: null,
        vat_subject: false,
        vat_number: null,
        sideBarLabels: []
      },
    };
    this.scheduleDrawer = React.createRef()
    this.intervalId = null
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname);
    if (!getLoggedUserId()) {
      Router.push('/');
    }

    setAxiosAuthentication();
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        let shop = this.state.shop;
        shop.service_address = user.billing_address;
        this.setState({
          user_id: user._id,
          shop: shop,
          currentUser: user
        });
      })
      .catch(error => {
        console.error(error);
      });
    this.loadAvailabilities();

    this.intervalId = setInterval( () => {if (this.state.activeStep==6) this.forceUpdate()}, 200)

  }

  componentWillUnmount = () => {
    clearInterval(this.intervalId)
  }

  availabilityDeleted = (avail) => {
    let shop = this.state.shop;
    shop.availabilities = shop.availabilities.filter(av => av._id !== avail._id);
    this.setState({shop: shop});
  }

  addDefaultAvailability = () => {
    const avail=getDefaultAvailability()
    const data={
      startDate: avail.period.begin,
      endDate: avail.period.end,
      days: avail.period.days,
      available: true,
      timelapses: avail.timelapses,
    }

    setAxiosAuthentication()
    axios.post('/myAlfred/api/availability/addRecurrent', data)
      .then(res => {
        this.loadAvailabilities(false)
      })
      .catch(err => {
        console.error(err);
      });
  }

  availabilityCreated = (avail) => {
    window.alert('hop')
    if (avail._id.length === GID_LEN) {
      avail._id = null;
    }
    setAxiosAuthentication()
    axios.post('/myAlfred/api/availability/add', avail)
      .then(res => {
        this.loadAvailabilities()
      })
      .catch(err => {
        console.error(err);
      });
  };

  availabilityUpdate = (avail) => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/availability/update', avail)
      .then(res => {
        this.loadAvailabilities()
      }).catch(err => console.error(err));
  };

  loadAvailabilities = (no_default) => {
    axios.get('/myAlfred/api/availability/currentAlfred')
      .then(res => {
        if (res.data.length==0 && !no_default) {
          this.addDefaultAvailability()
        }
        else {
          this.setState({availabilities: res.data});
        }
      })
      .catch(err => console.error(err));
  };

  handleNext = () => {
    if (this.state.activeStep < LASTSTEP) {
      this.setState({activeStep: this.state.activeStep + 1});
    }
    // last page => post
    else {
      this.setState({saving: true});
      let cloned_shop = _.cloneDeep(this.state.shop);
      Object.keys(cloned_shop.prestations).forEach(key => {
        if (key < 0) {
          cloned_shop.prestations[key]._id = null;
        }
      });
      cloned_shop.prestations = JSON.stringify(cloned_shop.prestations);
      cloned_shop.equipments = JSON.stringify(cloned_shop.equipments);

      setAxiosAuthentication()
      axios.post('/myAlfred/api/shop/add', cloned_shop)
        .then(res => {

          axios.post();
          var su_id = res.data.services[0]._id;
          if (cloned_shop.diplomaPicture !== null) {
            var dpChanged = typeof (cloned_shop.diplomaPicture) == 'object';
            const formData = new FormData();
            formData.append('name', cloned_shop.diplomaName);
            formData.append('year', cloned_shop.diplomaYear);
            formData.append('file_diploma', dpChanged ? cloned_shop.diplomaPicture : null);

            axios.post('/myAlfred/api/serviceUser/addDiploma/' + su_id, formData)
              .then()
              .catch(err => console.error(err));
          }

          if (cloned_shop.certificationPicture !== null) {
            var cpChanged = typeof (cloned_shop.certificationPicture) == 'object';
            const formData = new FormData();
            formData.append('name', cloned_shop.certificationName);
            formData.append('year', cloned_shop.certificationYear);
            formData.append('file_certification', cpChanged ? cloned_shop.certificationPicture : null);

            axios.post('/myAlfred/api/serviceUser/addCertification/' + su_id, formData)
              .then()
              .catch(err => console.error(err));
          }
          Router.push(`/profile/services?user=${this.state.user_id}`)
        })
        .catch(err => {
          this.setState({saving: false});
         console.error(err);
        });

    }
  };

  handleBack = () => {
    this.setState({activeStep: this.state.activeStep - 1});
  };

  onServiceChanged = (service_id) => {
    let shop = this.state.shop;
    shop.service = service_id;
    this.setState({shop: shop});
  }

  onPrestaChanged = (prestations) =>{
    let shop = this.state.shop;
    shop.prestations = prestations;
    this.setState({shop: shop});
  }

  settingsChanged = (location, travel_tax, pick_tax, perimeter) => {
    let shop = this.state.shop;
    shop.location = location;
    shop.travel_tax = travel_tax;
    shop.pick_tax = pick_tax;
    shop.perimeter = perimeter;
    this.setState({shop: shop});
  }

  preferencesChanged = (state) =>{
    let shop = this.state.shop;

    shop.minimum_basket = state.minimum_basket;
    shop.deadline_unit = state.deadline_unit;
    shop.deadline_value = state.deadline_value;
    shop.perimeter = state.perimeter;
    shop.equipments = state.equipments;

    this.setState({shop: shop});
  }

  assetsChanged = (state, index) => {
    this.setState({
      shop: {
        ...this.state.shop,
        description: state.description,
        level: state.level,
        diplomaName: state.diplomaName,
        diplomaYear: state.diplomaYear,
        diplomaPicture: state.diplomaPicture,
        certificationName: state.certificationName,
        certificationYear: state.certificationYear,
        certificationPicture: state.certificationPicture,
      },
    });
  }

  conditionsChanged = (book_request, conditions) => {
    let shop = this.state.shop;
    shop.booking_request = book_request;
    shop.my_alfred_conditions = conditions;
    this.setState({shop: shop});
  }

  shopSettingsChanged = (cancel_mode) => {
    let shop = this.state.shop;
    shop.cancel_mode = cancel_mode;
    this.setState({shop: shop});
  }

  introduceChanged = (is_particular, company, is_certified, cesu, cis, social_security,
    particular_access, professional_access) => {
    let shop = this.state.shop;
    shop.is_particular = is_particular;
    shop.is_certified = is_certified;
    shop.particular_access = particular_access;
    shop.professional_access = professional_access;
    if (is_particular) {
      shop.company = null;
      shop.cesu = cesu;
      shop.cis = false;
      shop.social_security = social_security;
    } else {
      shop.company = company;
      shop.cesu = null;
      shop.cis = cis;
    }
    this.setState({shop: shop});
  }

  nextDisabled = () => {

    let shop = this.state.shop;

    let pageIndex = this.state.activeStep;
    if (pageIndex === PRESENTATION0) {
      return !creaShopPresentation();
    }
    if (pageIndex === INTRODUCE1) {
      return !introduceYou(shop);
    }
    if (pageIndex === SELECTSERVICE2) {
      return !selectService(shop);
    }
    if (pageIndex === SELECTPRESTATION3) {
      return !selectPrestation(shop);
    }
    if (pageIndex == SETTINGSERVICE4 ) {
      return !settingService(shop)
    }
    if (pageIndex === BOOKINGPREFERENCE5) {
      return !bookingPreferences(shop);
    }
    if (pageIndex === SCHEDULE7) {
      return this.scheduleDrawer.current && this.scheduleDrawer.current.isDirty()
    }
    if (pageIndex === BOOKCONDITIONS8) {
      return false
    }
    return false;
  };


  renderSwitch = (stepIndex) =>{
    const{shop , currentUser}= this.state;
    switch (stepIndex) {
      case PRESENTATION0:
        return <CreaShopPresentation
          user={currentUser}/>;
      case INTRODUCE1 :
        return <IntroduceYou
          is_particular={shop.is_particular}
          company={shop.company}
          is_certified={shop.is_certified}
          onChange={this.introduceChanged}/>;
      case SELECTSERVICE2:
        return <SelectService
          creation={true}
          onChange={this.onServiceChanged}
          service={shop.service}
          creationBoutique={true}
          particular_access={shop.particular_access}
          professional_access={shop.professional_access}/>;
      case SELECTPRESTATION3:
        return <SelectPrestation
          service={shop.service}
          prestations={shop.prestations}
          onChange={this.onPrestaChanged}/>;
      case SETTINGSERVICE4:
        return <SettingService
          service={shop.service}
          perimeter={shop.perimeter}
          onChange={this.settingsChanged}/>;
      case BOOKINGPREFERENCE5:
        return <BookingPreference
          service={shop.service}
          onChange={this.preferencesChanged}
          deadline_unit={shop.deadline_unit}
          deadline_value={shop.deadline_value}
          minimum_basket={shop.minimum_basket}/>;
      case ASSETSSERVICE6:
        return <AssetsService
          data={shop}
          onChange={this.assetsChanged}
          type={'creaShop'}/>;
      case SCHEDULE7:
        return <DrawerAndSchedule
          availabilities={this.state.availabilities}
          title={I18N.SCHEDULE_TITLE}
          subtitle={I18N.SCHEDULE_SUBTITLE}
          nbSchedule={3}
          availabilityUpdate={this.availabilityUpdate}
          availabilityCreated={this.availabilityCreated}
          onAvailabilityChanged={this.loadAvailabilities}
          onDateSelectionCleared={this.onDateSelectionCleared}
          selectable={true}
          ref={this.scheduleDrawer}/>;
      case BOOKCONDITIONS8:
        return <BookingConditions
          conditions={shop.my_alfred_conditions}
          booking_request={shop.booking_request}
          cancel_mode={shop.cancel_mode}
          onChangeLastPart={this.shopSettingsChanged}
          onChange={this.conditionsChanged}/>;
    }
  };

  handleDrawerToggle = () => {
    this.setState({mobileOpen: !this.state.mobileOpen})
  };

  drawer = (classes) => {
    const {activeStep} = this.state;
    return (
      <Grid style={{height: '100%'}}>
        <Grid className={classes.appBarContainer}>
          <List classes={{root: classes.paddingList}}>
            <Stepper activeStep={activeStep} isType={'creaShop'}/>
          </List>
          <Grid container style={{display:'flex', justifyContent:'center'}}>
            <Grid style={{height: '100%', display : 'flex', flexDirection: 'column-reverse'}}>
              <img
                alt={'logo_myAlfred'}
                title={'logo_myAlfred'}
                src={'../../../static/assets/icon/logo.svg'}
                height={64}
                style={{filter: 'invert(1)'}}/>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  };

  render() {

    const {classes, window} = this.props;
    const {activeStep, mobileOpen} = this.state;
    const container = window !== undefined ? () => window().document.body : undefined;

    return (
      <Grid className={classes.root}>
        <CssBaseline />
        <Grid>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={this.handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
        </Grid>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={'left'}
              open={mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              {this.drawer(classes)}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              {this.drawer(classes)}
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <Grid>
            <Box overWritteCSS={true}>
              <Grid>
                <Grid>
                  {this.renderSwitch(activeStep)}
                </Grid>
                <Grid style={{position: 'fixed', bottom: 75, right: 100}}>
                  <Grid>
                    <Button
                      variant="contained"
                      classes={{root :classes.nextButton}}
                      onClick={this.handleNext}
                      //disabled={this.nextDisabled()}
                    >
                      {activeStep === LASTSTEP ? 'Envoyer' : 'Suivant'}
                    </Button>
                  </Grid>
                </Grid>
              </Grid>

            </Box>
          </Grid>
        </main>
      </Grid>
    );
  }
}

creaShop.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default withStyles(styles)(creaShop);
