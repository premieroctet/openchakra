import React from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../creaShop/creaShopStyle'
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '../../components/Stepper/Stepper'
import SelectService from '../../components/CreaShop/SelectService/SelectService';
import SelectPrestation from '../../components/CreaShop/SelectPrestation/SelectPrestation';
import SettingService from '../../components/CreaShop/SettingService/SettingService';
import BookingPreference from '../../components/CreaShop/BookingPreference/BookingPreference';
import AssetsService from '../../components/CreaShop/AssetsService/AssetsService';
import Schedule from '../../components/Schedule/Schedule';
import Link from 'next/link';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import {ALF_CONDS, CANCEL_MODE} from '../../utils/consts.js';
const {config} = require('../../config/config');
const url = config.apiUrl;
import { toast } from 'react-toastify';
import Router from "next/router";
import {selectService, selectPrestation, settingService, assetsService} from '../../utils/validationSteps/validationSteps';


class services extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            activeStep: 0,
            user_id: null,
            shop:{
                service: null,
                prestations:[],
                equipments: [], // Ids des équipements
                location: null, // Lieu(x) de prestation
                travel_tax: 0, // Frais de déplacement
                pick_tax: 0, // Frais de livraison/enlèvmeent
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
        this.nextDisabled = this.nextDisabled.bind(this)
    }

    static getInitialProps ({ query: { id } }) {
        return { service_id: id }
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
          });

        axios.get(url+`myAlfred/api/serviceUser/${this.props.service_id}`)
          .then(res => {
              let resultat = res.data;
              this.setState({
                  shop: {
                      ...this.state.shop,
                      service : resultat.service._id,
                      prestations: resultat.prestations[0]._id,
                      perimeter: resultat.perimeter
                  }
              });
              console.log(resultat, "resultat")
          })
          .catch(error => {
              console.log(error);
          });
    }

    nextDisabled() {
        let shop = this.state.shop;
        let pageIndex = this.state.activeStep;
        if (pageIndex===0) { return selectService(shop) }
        if (pageIndex===1) { return selectPrestation(shop) }
        if (pageIndex===2) { return settingService(shop) }
        if (pageIndex===4) { return assetsService(shop) }
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
        if (this.state.activeStep<5) {
            this.setState({activeStep: this.state.activeStep + 1});
        }
        // last page => post
        else {
            axios.defaults.headers.common['Authorization'] = localStorage.getItem('token');
            axios.post(url+'myAlfred/api/shop/add', this.state.shop)
              .then(res => {
                  toast.info("Service créée avec succès");
                  Router.push(`/shop?id_alfred=${this.state.user_id}`);
              })
              .catch(err => {
                  toast.error(err);
              })

        }
    };

    isRightPanelHidden() {
        return this.state.activeStep===1 || this.state.activeStep===5;
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

    renderSwitch(stepIndex) {
        let shop=this.state.shop;
        switch(stepIndex) {
            case 0:
                return <SelectService onChange={this.onServiceChanged} service={shop.service} isId={false}/>;
            case 1:
                return <SelectPrestation service={shop.service} onChange={this.prestaSelected} />;
            case 2:
                return <SettingService service={shop.service} onChange={this.settingsChanged} />;
            case 3:
                return <BookingPreference service={shop.service} onChange={this.preferencesChanged} />;
            case 4:
                return <AssetsService data={shop} onChange={this.assetsChanged} />;
            case 5:
                return <Schedule availabilities={shop.availabilities} services={[]} onCreateAvailability={this.availabilityCreated} onDeleteAvailability={this.availabilityDeleted} title={this.state.title} subtitle={this.state.subtitle} />;
        }
    }

    renderSwitchUpdate(stepIndex){
        let shop = this.state.shop;
        switch(stepIndex) {
            case 0:
                return <SelectPrestation service={this.props.service_id !== undefined ? this.props.service_id :  shop.service} onChange={this.prestaSelected} />;
            case 1:
                return <SettingService service={shop.service} onChange={this.settingsChanged} />;
            case 2:
                return <BookingPreference service={shop.service} onChange={this.preferencesChanged} />;
            case 3:
                return <AssetsService data={shop} onChange={this.assetsChanged} />;
            case 4:
                return <Schedule availabilities={shop.availabilities} services={[]} onCreateAvailability={this.availabilityCreated} onDeleteAvailability={this.availabilityDeleted} title={this.state.title} subtitle={this.state.subtitle} />;
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
                      <Stepper activeStep={this.state.activeStep} isType={ this.props.service_id ? "updateService" : "addService"}/>
                  </Grid>
              </Grid>
              <Grid className={classes.marginContainer}>
                  <Grid className={classes.mainContainer}>
                      <Grid className={hideRightPanel ? classes.mainContainerNoImg : classes.leftContentComponent }>
                          { this.props.service_id ?
                            this.renderSwitchUpdate(this.state.activeStep) : this.renderSwitch(this.state.activeStep)
                          }
                      </Grid>
                      { hideRightPanel ?
                        null:
                        <Grid className={classes.rightContentComponent}>
                            <Grid className={classes.contentRight} style={{backgroundImage: `url(../../../static/assets/img/creaShop/bgImage/etape${this.state.activeStep + 1}.svg)`}}/>
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
                                  {this.state.activeStep === 5 ? 'Envoyer' : 'Suivant'}
                              </Button>
                          </Grid>
                      </Grid>
                  </Grid>
              </Grid>
          </Grid>
        )
    }
}

services.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true }) (services);
