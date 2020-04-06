import _ from 'lodash';
const { inspect } = require('util');
const isEmpty=require('../server/validation/is-empty');
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Layout from '../hoc/Layout/Layout';
import styles from './userServicePreview/userServicePreviewStyle'
import Grid from '@material-ui/core/Grid';
import Router from "next/router";
import axios from 'axios';
import BannerReservation from '../components/BannerReservation/BannerReservation';
import Badge from '@material-ui/core/Badge';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import UserAvatar from '../components/Avatar/UserAvatar';
import SkillsAlfred from '../components/SkillsAlfred/SkillsAlfred';
import Typography from '@material-ui/core/Typography';
import Schedule from '../components/Schedule/Schedule';
import Checkbox from '@material-ui/core/Checkbox';
import CircleUnchecked from '@material-ui/icons/RadioButtonUnchecked';
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked';
import CardCommentary from '../components/CardCommentary/CardCommentary';
import TextField from '@material-ui/core/TextField';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ButtonSwitch from '../components/ButtonSwitch/ButtonSwitch';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import MapComponent from '../components/map';
const {computeBookingReference}=require('../utils/functions');
const {COMM_CLIENT}=require('../utils/consts');
const emptyPromise = require('../utils/promise');
const {isMomentAvailable, getDeadLine} = require('../utils/dateutils');
const {computeDistanceKm}=require('../utils/functions');
import DatePicker, {registerLocale} from "react-datepicker";
import fr from 'date-fns/locale/fr';
const moment = require('moment');
moment.locale('fr');
registerLocale('fr', fr);

class UserServicesPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      shop: {},
      serviceUser: {},
      alfred:{},
      service: {},
      equipments: [],
      prestations: [],
      flexible: false,
      moderate: false,
      strict: false,
      haveOptions: false,
      languages:[],
      test:{},
      allEquipments: [],
      availabilities: [],
      mobileOpen: false,
      setMobileOpen: false,
      bottom: false,
      count:{},
      totalPrestations: 0,
      commission: 0,
      total: 0,
      location:null,
      date:null,
      time:null,
      errors:{},
    }
    this.onQtyChanged = this.onQtyChanged.bind(this);
    this.checkBook = this.checkBook.bind(this);
  }

  static getInitialProps ({ query: { id } }) {
    return { service_id: id }
  }

  componentDidMount() {
    const id = this.props.service_id;
    localStorage.setItem("path", Router.pathname);
    axios.defaults.headers.common["Authorization"] = localStorage.getItem(
      "token"
    );
    axios.get("/myAlfred/api/users/current")
      .then(res => {
        let user = res.data;
        this.setState({ user: user, });
      })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401 || err.response.status === 403) {
          localStorage.removeItem("token");
          Router.push({ pathname: "/login" });
        }
      });

    axios.get(`/myAlfred/api/serviceUser/${id}`).then(res => {
      let serviceUser = res.data;
      // Prestas booked : 0 for each
      var count = {}
      serviceUser.prestations.forEach( p => count[p._id]=0);
      // FIX : select default location ; can not be "client" if not in perimeter
      //var location = serviceUser.location.client ? "client" : serviceUser.location.alfred ? "alfred" : "visio";
      var location=null;

      this.setState({
        serviceUser: serviceUser,
        service: serviceUser.service,
        equipments: serviceUser.equipments,
        prestations: serviceUser.prestations,
        allEquipments : serviceUser.service.equipments,
        alfred: serviceUser.user,
        count: count,
        location: location,
      });
      axios.get(`/myAlfred/api/availability/userAvailabilities/${serviceUser.user._id}`)
        .then(res => {
          let availabilities = res.data;
          this.setState({ availabilities: availabilities });
        })
        .catch(err => console.log(err));
      axios.get("/myAlfred/api/shop/alfred/" + this.state.alfred._id).then(res => {
        let shop = res.data;
        this.setState({
          shop: shop,
          flexible: shop.flexible_cancel,
          moderate: shop.moderate_cancel,
          strict: shop.strict_cancel,
        });
      })
      .catch(err => console.log(err));
    }).catch(err =>{
      console.log(err)
    });

    setTimeout(this.checkBook, 3000);
  }

  checkBook = () => {
    var errors={}
    if (!this.state.total) {
      errors['prestations']='Sélectionnez au moins une prestation';
    }
    if (this.state.totalPrestations<this.state.serviceUser.minimum_basket) {
      errors['total']='Commande minimum des prestation de '+this.state.serviceUser.minimum_basket+'€ requise';
    }

    if (!errors.datetime && this.state.date==null) {
      errors['datetime']='Sélectionnez une date';
    }

    if (!errors.datetime && this.state.time==null) {
      errors['datetime']='Sélectionnez une heure';
    }
    const m2=moment(this.state.date+' '+this.state.time);
    if (!errors.datetime && m2.isValid() && !isMomentAvailable(m2, this.state.service._id, this.state.availabilities)) {
      errors['datetime']=this.state.alfred.firstname+" n'est pas disponible à cette date/heure";
    }

    const minBookingDate=getDeadLine(this.state.serviceUser.deadline_before_booking);
    if (!errors.datetime && m2.isBefore(minBookingDate)) {
      errors['datetime']="Le délai de prévenance n'est pas respecté";
    }

    if (!errors.datetime && this.state.time && this.state.time<moment()) { errors['datetime']='Réservation impossible avant maintenant'}

    if (!this.state.location) { errors['location']='Sélectionnez un lieu de prestation'}
    this.setState({errors:errors});
  }

  extractFilters() {
    var result={};
    if (this.state.prestations.length==0) {
      return result;
    }
    this.state.prestations.forEach( p => {
      var filter=p.prestation.filter_presentation;
      var key = !filter || filter.label=='Aucun' ? '' : filter.label;
      if (key in result) {
        result[key].push(p);
      }
      else {
        result[key]=[p];
      }
    });
    return result;
  }

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ ...this.state, [side]: open });
  };

  onChangeTime = tm => {
    this.onChange({target: {name:'time', value:tm}});
  }

  onChangeDate = dt => {
    this.onChange({target: {name:'date', value:dt}});
  }

  onChange = event => {
    const {name, value}=event.target;
    console.log("onChange:"+name+","+value);
    this.setState({[name]:value}, () => this.checkBook());
  }

  onLocationChanged = (id, checked) => {
    this.setState({location:id}, () => this.checkBook());
  }

  onQtyChanged = event => {
    var {name, value} = event.target;
    if (!value) { value=0}
    value = parseInt(value);
    if (!isNaN(value) && value>=0) {
      var count = this.state.count;
      count[name]=value;
      this.setState({count:count}, () => this.computeTotal());
    }
  }

  computeTotal = () => {
    var totalPrestations=0;
    var count=this.state.count;
    var su=this.state.serviceUser;
    this.state.prestations.forEach( p => {
      if (count[p._id]>0) {
        totalPrestations += count[p._id]*p.price;
      }
    });
    totalPrestations+=su.travel_tax ? parseInt(su.travel_tax) : 0;
    totalPrestations+=su.pick_tax ? parseInt(su.pick_tax) : 0;
    var commission=totalPrestations*COMM_CLIENT;
    var total=totalPrestations;
    total+=commission;
    this.setState({totalPrestations:totalPrestations, commission:commission, total:total}, () => this.checkBook())
  }

  isInPerimeter = () => {
    if (isEmpty(this.state.serviceUser)||isEmpty(this.state.user)) { return true}
    const coordSU = this.state.serviceUser.service_address.gps;
    const coordUser = this.state.user.billing_address.gps;
    const dist=computeDistanceKm(coordSU, coordUser);
    return dist<this.state.serviceUser.perimeter;
  }

  getLocationLabel = () => {
    const titles={'client': 'A mon adresse principale', 'alfred': 'Chez '+this.state.alfred.firstname, 'visio': 'En visio'};
    if (!this.state.location) {
      return '';
    } else {
      return titles[this.state.location];
    }
  }

  book = (actual) => { //actual : true=> book, false=>infos request

    const count=this.state.count;
    var prestations=[];
    this.state.prestations.forEach(p => {
      if (this.state.count[p._id]) {
        prestations.push({ price:p.price, value:count[p._id], name:p.prestation.label});
      }
    });

    var chatPromise = actual ? emptyPromise({ res: null }) : axios.post("/myAlfred/api/chatRooms/addAndConnect", { emitter: this.state.user._id, recipient: this.state.serviceUser.user._id });

    chatPromise.then( res => {
      let bookingObj = {
        reference: computeBookingReference(this.state.user, this.state.serviceUser.user),
        service: this.state.serviceUser.service.label,
        address: this.state.serviceUser.service_address,
        equipments: this.state.serviceUser.equipments,
        amount: this.state.total,
        date_prestation: moment(this.state.date).format("DD/MM/YYYY"),
        time_prestation: this.state.time,
        alfred: this.state.serviceUser.user._id,
        user: this.state.user._id,
        prestations: prestations,
        travel_tax: this.state.serviceUser.travel_tax,
        pick_tax: this.state.serviceUser.pick_tax,
        fees: this.state.commission,
        status: actual ? "En attente de confirmation" : "Demande d'infos",
        serviceUserId: this.state.serviceUser._id,
      };

      if (!actual) {
        bookingObj['chatroom']=res.data._id;
      }

      if (this.state.selectedOption !== null) {
        bookingObj.option = this.state.selectedOption;
      }

      if (actual) {
        localStorage.setItem("bookingObj", JSON.stringify(bookingObj));
        localStorage.setItem("emitter", this.state.user._id);
        localStorage.setItem("recipient", this.state.serviceUser.user._id);
        localStorage.removeItem('address');

        Router.push({
          pathname: "/confirmPayement",
          query: { id: this.props.service_id }
        })
      }
      else {
        axios.post("/myAlfred/api/booking/add", bookingObj)
          .then(response => {
            axios.put('/myAlfred/api/chatRooms/addBookingId/' + bookingObj.chatroom, { booking: response.data._id })
              .then(() => {
                localStorage.removeItem('address');
                Router.push({
                  pathname: "/reservations/messagesDetails",
                  query: { id: bookingObj.chatroom, booking:response.data._id }
                });
              })
          })
          .catch(err => console.log(err));

      }
    })
  }

  needPanel(prestations, fltr, classes, index){

    return(
      <Grid style={{width: '100%'}}>
        <ExpansionPanel expanded={index === 0}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{fltr?fltr:''}</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {this.contentPanel(prestations, classes)}
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    )
  };

  contentPanel(prestations, classes) {
    return (
      <Grid style={{width : '100%'}}>
        {prestations.map((p) => {
          return (
            <Grid style={{display: 'flex', alignItems: 'center', width: '100%'}}>
              <Grid>
                <TextField
                  id="outlined-number"
                  label="Quantité"
                  type="number"
                  className={classes.textField}
                  InputLabelProps={{ shrink: true, }}
                  margin="dense"
                  variant="outlined"
                  name={p._id}
                  value={this.state.count[p._id]}
                  onChange={this.onQtyChanged}
                />
              </Grid>
              <Grid style={{display: 'flex', width: '100%'}}>
                <Grid style={{width: '100%', marginLeft: 10}}>
                  <label>{p.prestation.label}</label>
                </Grid>
                <Grid style={{width: '30%'}}>
                  <label>{p.price}€</label>
                </Grid>
                <Grid style={{width: '30%'}}>
                  <label>{p.billing.label}</label>
                </Grid>
              </Grid>
            </Grid>
          )
        })}
      </Grid>
    )
  };

  render() {
    const {classes} = this.props;
    const {date, time, location, user, serviceUser, shop, service, equipments, userName, alfred, container, errors} = this.state;
    console.log(serviceUser, 'service')

   const filters = this.extractFilters();

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    const drawer = side => (
      <Grid className={classes.borderContentRight}>
        <Grid style={{marginBottom: 30}}>
          <Grid style={{display: 'flex', justifyContent: 'space-between' }}>
            <Grid>
              <Typography variant="h6" style={{color: '#505050', fontWeight: 'bold'}}>Date & heure</Typography>
              <em style={{color:'#f87280'}}>{errors['datetime']}</em>
            </Grid>
            <Hidden lgUp>
              <Grid>
                <IconButton aria-label="Edit" className={classes.iconButtonStyle}>
                  <CloseIcon color={'secondary'} onClick={this.toggleDrawer(side, false)} />
                </IconButton>
              </Grid>
            </Hidden>
          </Grid>
          <Grid style={{display: 'flex', marginLeft: 10, marginTop: 20}}>
            <Grid>
              <DatePicker
                 selected={this.state.date}
                 dateFormat="dd/MM/yyyy"
                 onChange={this.onChangeDate}
                 placeholderText="Date"
                 locale='fr'
                 minDate={new Date()}
              />
            </Grid>
            <Grid style={{marginLeft: 50}}>
               <DatePicker
                 selected={this.state.time}
                 onChange={this.onChangeTime}
                 showTimeSelect
                 showTimeSelectOnly
                 timeIntervals={30}
                 timeCaption="Heure"
                 placeholderText="Heure"
                 dateFormat="HH:mm"
                 locale='fr'
                 minDate={new Date()}
               />

            </Grid>
          </Grid>
        </Grid>
        <Grid style={{marginBottom: 30}}>
          <Grid>
            <Typography variant="h6" style={{color: '#505050', fontWeight: 'bold'}} error={errors.prestations}>Mes prestations</Typography>
              <em style={{color:'#f87280'}}>{errors['prestations']}</em>
          </Grid>
          <Grid style={{marginTop: 30}}>
            {/* Start filter */ }
            { Object.entries(filters).map( (entry, index) => {
              var fltr=entry[0];
              var prestations=entry[1];
              return (
                <Grid>
                  { fltr === '' ?
                    this.contentPanel(prestations, classes) :
                    this.needPanel(prestations, fltr, classes, index)
                  }
                </Grid>
              )
            })
            }
          {/* End filter */ }

          </Grid>
        </Grid>
        <Grid style={{marginBottom: 30}}>
        <Grid>
          <Typography variant={'h6'} style={{color: '#505050', fontWeight: 'bold'}}>Lieu de la prestation</Typography>
              <em style={{color:'#f87280'}}>{errors['location']}</em>
        </Grid>
        <Grid>
          { serviceUser.location && serviceUser.location.client && this.isInPerimeter() ?
          <Grid>
            <ButtonSwitch id='client' label={'A mon adresse principale'} isEditable={false} isPrice={false} isOption={false} checked={location==='client'} onChange={this.onLocationChanged}/>
          </Grid>
            :null
          }
          {
            serviceUser.location && serviceUser.location.alfred && alfred.firstname !== undefined ?
              <Grid>
                <ButtonSwitch id='alfred' label={'Chez ' + alfred.firstname} isEditable={false} isPrice={false} isOption={false} checked={location==='alfred'} onChange={this.onLocationChanged}/>
              </Grid>
              : null
          }
          {
            serviceUser.location && serviceUser.location.visio ?
              <Grid>
                <ButtonSwitch id='visio' label={'En visio'} isEditable={false} isPrice={false} isOption={false} checked={location==='visio'} onChange={this.onLocationChanged}/>
              </Grid>
              : null
          }
        </Grid>
      </Grid>
        { serviceUser.pick_tax || serviceUser.travel_tax ?
        <Grid style={{marginBottom: 30}}>
        <Grid>
          <Typography variant={'h6'} style={{color: '#505050', fontWeight: 'bold'}}>Option de la prestation</Typography>
        </Grid>
        { serviceUser.pick_tax ?
          <Grid>
            Retrait & livraison
            { serviceUser.pick_tax }
          </Grid>
          :null
        }
        { serviceUser.travel_tax ?
          <Grid>
            Frais de déplacement
            { serviceUser.travel_tax }
          </Grid>
          :null
        }
      </Grid>:null
      }
        <Grid style={{marginBottom: 30}}>
        <Grid>
          <Typography variant={'h6'} style={{color: '#505050', fontWeight: 'bold'}}>Détails de la prestation</Typography>
        </Grid>
        <Grid style={{marginTop: 20, marginLeft: 10}}>
          <Grid style={{display: 'flex', alignItems : 'center', marginBottom: 20}}>
            <Grid>
              <img style={{width: 40, height : 40}} alt={"adresse"} title={"adresse"} src={'../../static/assets/img/userServicePreview/adresse.svg'}/>
            </Grid>
            <Grid style={{marginLeft: 10}}>
              <label>{ this.getLocationLabel()}</label>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', alignItems : 'center'}}>
            <Grid>
              <img style={{width: 40, height : 40}} alt={"calendrier"} title={"calendrier"} src={'../../static/assets/img/userServicePreview/calendrier.svg'}/>
            </Grid>
            <Grid style={{marginLeft: 10}}>
              <label>Le {date?moment(date).format('DD/MM/YYYY'):''} à {time?moment(time).format('HH:mm'):''}</label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
        <Grid style={{display: 'flex', flexDirection:'column', marginLeft:15, marginRight:15, marginBottom:30}}>
        <Grid>
          { this.state.prestations.map( (p) => {
             return this.state.count[p._id]==0 ? null: (
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
            <Grid>
              <p>{p.prestation.label}</p>
            </Grid>
            <Grid>
              <p>{this.state.count[p._id]*p.price}€</p>
            </Grid>
          </Grid>
          )})
          }
          { /* Start travel tax */ }
          { serviceUser.travel_tax ?
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
            <Grid>
              <p>Frais de déplacement</p>
            </Grid>
            <Grid>
              <p>{this.state.serviceUser.travel_tax}€</p>
            </Grid>
          </Grid>:null}
          { /* End pick tax */ }
          { /* Start pick tax */ }
          { serviceUser.pick_tax ?
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
            <Grid>
              <p>Frais de livraison/enlèvement</p>
            </Grid>
            <Grid>
              <p>{this.state.serviceUser.pick_tax}€</p>
            </Grid>
          </Grid>:null}
          { /* End pick tax */ }
          { /* Start commission */ }
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
            <Grid>
              <p>Frais de service</p>
            </Grid>
            <Grid>
              <p>{this.state.commission.toFixed(2)}€</p>
            </Grid>
          </Grid>
          { /* End commission */ }
          { /* Start total */ }
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
            <Grid>
              <p>Total</p>
            </Grid>
            <Grid>
              <p>{this.state.total.toFixed(2)}€</p>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
              <em style={{color:'#f87280'}}>{errors['total']}</em>
          </Grid>
          { /* End total */ }
        </Grid>
      </Grid>
        <Grid>
        <Grid style={{display: 'flex', justifyContent: 'space-around' }}>
          <Grid>
            <Button
              variant="outlined"
              size="medium"
              color="primary"
              aria-label="add"
              className={classes.margin}
              disabled={!isEmpty(errors)}
              onClick={() => this.book(false)}
            >
              Demande d’informations
            </Button>
          </Grid>
          <Grid>
            <Button
              style={{color:'white'}}
              variant="contained"
              size="medium"
              color="secondary"
              aria-label="add"
              className={classes.margin}
              disabled={!isEmpty(errors)}
              onClick={() => this.book(true)}
            >
              Réserver
            </Button>
          </Grid>
        </Grid>
      </Grid>
        {/*<Grid>
        <Grid>
          <img alt={'castor_happy'} title={'castor_happy'} style={{height: 100}} src={'../../static/assets/img/userServicePreview/castor.svg'}/>
        </Grid>
      </Grid>*/}
    </Grid>
   );

    return (
      <Grid>
        <Layout>
          <Grid style={{width: '100%'}}>
            <BannerReservation serviceUser={service} shop={shop} user={alfred}/>
            <Grid className={classes.mainContainer}>
              <Grid className={classes.leftContainer}>
                <Grid className={classes.avatarAnDescription}>
                  <Grid className={classes.flexContentAvatarAndDescription}>
                    <Grid className={classes.marginAvatarAndDescriptionContent}>
                      <Grid>
                        <Typography variant="h6">{service.label} par {alfred.firstname}</Typography>
                      </Grid>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                      <Grid>
                        <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                          <Badge badgeContent={alfred.score} color={'primary'} className={classes.badgeStyle}>
                            <StyledRating name="read-only" value={alfred.score} readOnly className={classes.rating} />
                          </Badge>
                        </Box>
                      </Grid>
                        {
                          alfred.score < 0 ?
                          <Grid>
                            <a href={"#"}>Voir plus de commentaires</a>
                          </Grid> : null
                        }
                    </Grid>
                    <Grid className={classes.middleHr}>
                      <Grid>
                        <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid>
                        {
                          serviceUser.description !== "" ? <p>{serviceUser.description}</p> : <p>Cet utilisateur n'a pas encore de description.</p>
                        }
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.avatarContainer}>
                    <Grid item className={classes.itemAvatar}>
                      <UserAvatar classes={'avatarLetter'} user={alfred} className={classes.avatarLetter} />
                      <Typography style={{marginTop:20}} className={classes.textAvatar}>{alfred.firstname}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.responsiveListContainer}>
                  <List dense={this.state.dense} className={classes.flexPosition}>
                    <Grid className={classes.itemListContainer}>
                      <Grid className={classes.marginRight}>
                        <ListItem className={classes.noPadding}>
                          <ListItemIcon className={classes.minWidth}>
                            <img src={serviceUser.graduated && serviceUser.graduated !== "" && serviceUser.graduated !== null && serviceUser.graduated !== undefined ? '../../static/assets/img/iconCardAlfred/graduated.svg' : '../../static/assets/img/iconCardAlfred/no_graduated.svg'} alt={'Diplome'} title={'Diplome'} className={classes.imageStyle}/>
                          </ListItemIcon>
                          <ListItemText
                            classes={{primary:classes.sizeText}}
                            primary={"Diplômé(e)"}
                          />
                        </ListItem>
                      </Grid>
                      <Grid className={classes.marginRight}>
                        <ListItem className={classes.noPadding} style={{marginLeft : 5}}>
                          <ListItemIcon  className={classes.minWidth}>
                            <img src={serviceUser.is_certified && serviceUser.is_certified !== "" && serviceUser.is_certified !== null && serviceUser.is_certified !== undefined ? '../../static/assets/img/iconCardAlfred/certificate.svg' : '../../static/assets/img/iconCardAlfred/no_certificate.svg'} alt={'Certifié'} title={'Certifié'} className={classes.imageStyle}/>
                          </ListItemIcon>
                          <ListItemText
                            classes={{primary:classes.sizeText}}
                            primary="Certifié(e)"
                          />
                        </ListItem>
                      </Grid>
                      <Grid>
                        <ListItem className={classes.noPadding} style={{marginLeft : 5}}>
                          <ListItemIcon className={classes.minWidth}>
                            <img src={serviceUser.level && serviceUser.level !== "" && serviceUser.level !== null && serviceUser.level !== undefined ? '../../static/assets/img/iconCardAlfred/experience.svg' : '../../static/assets/img/iconCardAlfred/no_experience.svg'} alt={'Expérimenté'} title={'Expérimenté'} className={classes.imageStyle}/>
                          </ListItemIcon>
                          <ListItemText
                            classes={{primary:classes.sizeText}}
                            primary="Expérimenté(e)"
                          />
                        </ListItem>
                      </Grid>
                    </Grid>
                  </List>
                </Grid>
                <Grid style={{marginTop: 30}}>
                  <Grid className={classes.skillsContentContainer}>
                    <SkillsAlfred alfred={alfred} widthHr={500}/>
                  </Grid>
                </Grid>
                {equipments.length !== 0 ?
                  <Grid className={classes.equipmentsContainer}>
                    <Grid>
                      <Typography variant="h6">{alfred.firstname} fournit :</Typography>
                    </Grid>
                    <Grid className={classes.hrStyle}>
                      <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                    </Grid>
                    <Grid>
                      <Grid className={classes.textEquipments}>
                        <p>Dans le cadre de son service, votre Alfred peut fournir du matériel et des produits en fonction des prestations. Ces produits & matériels sont fournis sans surcoût. </p>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid container spacing={1}>
                        {equipments.map((result) => {
                          return (
                            <Grid key={result.id} item xl={2} lg={4} md={4} sm={4} xs={4}>
                              <img src={`../../static/equipments/${result.logo.slice(0, -4)}_Selected.svg`} height={100} width={100} alt={`${result.name_logo.slice(0, -4)}_Selected.svg`} />
                            </Grid>
                          )
                        })
                        }
                      </Grid>
                    </Grid>
                  </Grid> : null
                }
                <Grid className={classes.scheduleContainer}>
                  <Grid className={classes.scheduleContainerTitle}>
                    <Grid>
                      <Typography variant="h6">Les disponibilités de {alfred.firstname}</Typography>
                    </Grid>
                    <Grid className={classes.hrStyle}>
                      <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Schedule  availabilities={this.state.availabilities} services={[]} selectable={false} height={400}/>
                  </Grid>
                </Grid>
                <Grid className={classes.basketMinimumContainer}>
                  <Grid>
                    <Typography variant="h6">Panier minimum de réservation</Typography>
                  </Grid>
                  <Grid className={classes.hrStyle}>
                    <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                  </Grid>
                  <Grid>
                    <Grid className={classes.textContentBasket}>
                      <p>Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service. Si votre Alfred indique un montant de 10€, vous ne pourrez pas réserver ce service si la somme des prestations n’atteint pas ce montant.</p>
                    </Grid>
                  </Grid>
                  <Grid className={classes.priceBasketContent}>
                    <Grid>
                      <img style={{width: 40, height : 40}} src={'../../static/assets/img/userServicePreview/shop.svg'}/>
                    </Grid>
                    <Grid style={{fontSize: 'x-large', marginLeft: 15}}>
                      {serviceUser.minimum_basket} €
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.delayPrevenance}>
                  <Grid>
                    <Typography variant="h6">Délai de prévenance de votre Alfred</Typography>
                  </Grid>
                  <Grid className={classes.hrStyle}>
                    <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                  </Grid>
                  <Grid>
                    <Grid className={classes.textContentDelay}>
                      <p>Le délai de prévenance correspond au délai nécessaire entre la réservation et la réalisation du service. Par exemple, si votre Alfred impose un délai de 24 heures, vous pourrez réserver votre service au minimum 24 heures avant son intervention. </p>
                    </Grid>
                  </Grid>
                  <Grid className={classes.delayPrevenanceContent}>
                    <Grid>
                      <img style={{width: 40, height : 40}} src={'../../static/assets/img/userServicePreview/prevenance.svg'}/>
                    </Grid>
                    <Grid style={{fontSize: 'x-large',  marginLeft: 15}}>
                      {
                        serviceUser.deadline_before_booking
                      }
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.perimeterContent}>
                  <Grid>
                    <Typography variant="h6">Le périmètre d’intervention de votre Alfred</Typography>
                  </Grid>
                  <Grid className={classes.hrStyle}>
                    <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                  </Grid>
                  <Grid>
                    <Grid className={classes.textContentPerimeter}>
                      <p>Le périmètre d’intervention de votre Alfred est la zone dans laquelle votre Alfred accepte de se déplacer pour réaliser ses services. Par mesure de sécurité et conformément à notre politique de confidentialité, l’adresse de votre Alfred n’est pas communiquée. </p>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems:'center', marginBottom: 20}}>
                      <Grid>
                        <img style={{width: 40, height : 40}} src={'../../static/assets/img/userServicePreview/adresse.svg'}/>
                      </Grid>
                      <Grid style={{fontSize: 'x-large', marginLeft: 15}}>
                        {serviceUser.perimeter} km
                      </Grid>
                    </Grid>
                    <Grid style={{width : '100%', height:300}}>
                      { serviceUser && serviceUser.service_address?
                      <MapComponent position={[serviceUser.service_address.gps.lat, serviceUser.service_address.gps.lng]} perimeter={serviceUser.perimeter*1000} alfred={alfred.firstname}/>
                      :
                      <p>Emplacement de l'Alfred</p>
                      }
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.bookingConditionContent} >
                  <Grid className={classes.bookingConditionContentTitle}>
                    <Typography variant="h6">Les conditions d’annulation de votre Alfred</Typography>
                  </Grid>
                  <Grid className={classes.hrStyle}>
                    <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                  </Grid>
                  <Grid className={classes.listContent}>
                    <Grid className={classes.listStyle}>
                      <Grid>
                        <Checkbox
                          disabled={true}
                          checked={this.state.flexible}
                          value={this.state.flexible}
                          color="primary"
                          name={"strict_cancel"}
                          inputProps={{
                            'aria-label': 'secondary checkbox',
                          }}
                          icon={<CircleUnchecked/>}
                          checkedIcon={<RadioButtonCheckedIcon />}
                        />
                      </Grid>
                      <Grid>
                        <p>
                          Flexibles - Remboursement intégral jusqu’à un jour avant la prestation
                        </p>
                      </Grid>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
                      <Grid>
                        <Checkbox
                          disabled={true}
                          checked={this.state.moderate}
                          value={this.state.moderate}
                          color="primary"
                          name={"strict_cancel"}
                          inputProps={{
                            'aria-label': 'secondary checkbox',
                          }}
                          icon={<CircleUnchecked/>}
                          checkedIcon={<RadioButtonCheckedIcon />}
                        />
                      </Grid>
                      <Grid>
                        <p>
                          Modérées - Remboursement intégral jusqu’à 5 jours avant la prestation
                        </p>
                      </Grid>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
                      <Grid>
                        <Checkbox
                          disabled={true}
                          checked={this.state.strict}
                          value={this.state.strict}
                          color="primary"
                          name={"strict_cancel"}
                          inputProps={{
                            'aria-label': 'secondary checkbox',
                          }}
                          icon={<CircleUnchecked/>}
                          checkedIcon={<RadioButtonCheckedIcon />}
                        />
                      </Grid>
                      <Grid>
                        <p>
                          Strictes - Remboursement intégral jusqu’à 10 jours avant la prestation
                        </p>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.commentaryContent}>
                  <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Grid>
                      <Typography variant="h6">{alfred.number_of_reviews} Commentaire(s)</Typography>
                    </Grid>
                    <Grid>
                      <Grid>
                        <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                          <Badge badgeContent={0} color={'primary'} className={classes.badgeStyle}>
                            <StyledRating name="read-only" value={0} readOnly className={classes.rating} />
                          </Badge>
                        </Box>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.hrStyle} style={{marginBottom : alfred.number_of_reviews_client === 0 ? 50 : 30}}>
                    <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                  </Grid>
                  {
                    alfred.number_of_reviews_client < 0 ?
                      <Grid>
                        <Grid style={{display: 'flex', alignItems:'center', marginLeft: 15}}>
                          <label>Accueil</label>
                          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                            <StyledRating name="read-only" value={0} readOnly className={classes.rating} />
                          </Box>
                        </Grid>
                        <Grid style={{display: 'flex', alignItems:'center', marginLeft: 15}}>
                          <label>Qualité-prix</label>
                          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating} >
                            <StyledRating name="read-only" value={0} readOnly className={classes.rating} />
                          </Box>
                        </Grid>
                        <Grid style={{display: 'flex', alignItems:'center', marginLeft: 15}}>
                          <label>Communication</label>
                          <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                            <StyledRating name="read-only" value={0} readOnly className={classes.rating} />
                          </Box>
                        </Grid>
                      </Grid> :
                      <Grid>
                        <Grid>
                          <p>{alfred.firstname} n'a reçu aucun commentaire. </p>
                        </Grid>
                      </Grid>
                  }
                  {
                    alfred.number_of_reviews_client < 0 ?
                      <Grid>
                        <Grid>
                          <CardCommentary/>
                        </Grid>
                      </Grid> : null
                  }
                </Grid>
                <Hidden mdUp implementation="css">
                  <Grid className={classes.showReservation}>
                    <Button
                      style={{color:'white'}}
                      variant="contained"
                      size="medium"
                      color="secondary"
                      aria-label="add"
                      className={classes.buttonReservation}
                      onClick={this.toggleDrawer('bottom', true)}
                    >
                      Réserver
                    </Button>
                  </Grid>
                  <Drawer anchor="bottom" open={this.state.bottom} onClose={this.toggleDrawer('bottom', false)} >
                    <Grid className={classes.drawerContent}>
                      {drawer('bottom')}
                    </Grid>
                  </Drawer>
                </Hidden>
              </Grid>
              {/* ------------------------------------------------------- ici content right ---------------------------------------------------*/}
              <Hidden mdDown implementation="css">
                <Grid className={classes.contentRight}>
                  {drawer()}
                </Grid>
              </Hidden>
            </Grid>
          </Grid>
        </Layout>
      </Grid>

    )
  }
}

UserServicesPreview.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default  withStyles(styles, { withTheme: true })(UserServicesPreview);
