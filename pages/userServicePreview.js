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
import UserAvatar from '../components/avatar/UserAvatar';
import SkillsAlfred from '../components/SkillsAlfred/SkillsAlfred';
import Typography from '@material-ui/core/Typography';
import Schedule from '../components/Schedule/Schedule';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
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
import RoomIcon from '@material-ui/icons/Room';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import EditIcon from '@material-ui/icons/Edit';



const { config } = require('../config/config');
const url = config.apiUrl;

class userServices extends React.Component {
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
      bottom: false
    }
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
    axios.get(url + "myAlfred/api/users/current").then(res => {
      let user = res.data;
      this.setState({
        user: user,
      });
    })
      .catch(err => {
        console.log(err);
        if (err.response.status === 401 || err.response.status === 403) {
          localStorage.removeItem("token");
          Router.push({ pathname: "/login" });
        }
      });

    axios.get(url + `myAlfred/api/serviceUser/${id}`).then(res => {
      let serviceUser = res.data;
      this.setState({
        serviceUser: serviceUser,
        service: serviceUser.service,
        equipments: serviceUser.equipments,
        prestations: serviceUser.prestations,
        allEquipments : serviceUser.service.equipments,
        alfred: serviceUser.user
      });
      axios.get(url + "myAlfred/api/shop/alfred/" + this.state.alfred._id).then(res => {
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
  }

  toggleDrawer = (side, open) => event => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    this.setState({ ...this.state, [side]: open });
  };

  render() {
    const {classes} = this.props;
    const {user, serviceUser, shop, service, equipments, userName, alfred, container} = this.state;

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
              <Typography variant="h6" style={{color: '#505050', fontWeight: 'bold'}}>Date & Heure</Typography>
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
              <TextField
                id="date"
                label="Date"
                type="date"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid style={{marginLeft: 50}}>
              <TextField
                id="time"
                label="Heure"
                type="time"
                className={classes.textField}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid style={{marginBottom: 30}}>
          <Grid>
            <Typography variant="h6" style={{color: '#505050', fontWeight: 'bold'}}>Mes prestations</Typography>
          </Grid>
          <Grid style={{marginTop: 20}}>
            <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Homme</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid style={{display: 'flex', alignItems: 'center', width : '100%'}}>
                <Grid>
                  <TextField
                    id="outlined-number"
                    label="Quantité"
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid style={{display:'flex', justifyContent: 'space-evenly', width: '100%'}}>
                  <Grid>
                    <label>Label presta</label>
                  </Grid>
                  <Grid>
                    <label>Prix de la presta</label>
                  </Grid>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
            <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography className={classes.heading}>Femme</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid style={{display: 'flex', alignItems: 'center', width : '100%'}}>
                <Grid>
                  <TextField
                    id="outlined-number"
                    label="Quantité"
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid style={{display:'flex', justifyContent: 'space-evenly', width: '100%'}}>
                  <Grid>
                    <label>Label presta</label>
                  </Grid>
                  <Grid>
                    <label>Prix de la presta</label>
                  </Grid>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
            <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography className={classes.heading}>Enfant</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid style={{display: 'flex', alignItems: 'center', width : '100%'}}>
                <Grid>
                  <TextField
                    id="outlined-number"
                    label="Quantité"
                    type="number"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    margin="normal"
                    variant="outlined"
                  />
                </Grid>
                <Grid style={{display:'flex', justifyContent: 'space-evenly', width: '100%'}}>
                  <Grid>
                    <label>Label presta</label>
                  </Grid>
                  <Grid>
                    <label>Prix de la presta</label>
                  </Grid>
                </Grid>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          </Grid>
        </Grid>
        <Grid style={{marginBottom: 30}}>
        <Grid>
          <Typography variant={'h6'} style={{color: '#505050', fontWeight: 'bold'}}>Lieu de la prestation</Typography>
        </Grid>
        <Grid>
          <Grid>
            <ButtonSwitch label={'A mon adresse principale'} isEditable={false} isPrice={false} isOption={false}/>
          </Grid>
          <Grid>
            {
              alfred.firstname !== undefined ?
                <ButtonSwitch label={'Chez ' + alfred.firstname} isEditable={false} isPrice={false} isOption={false}/>
                : null
            }
          </Grid>
        </Grid>
      </Grid>
        <Grid style={{marginBottom: 30}}>
        <Grid>
          <Typography variant={'h6'} style={{color: '#505050', fontWeight: 'bold'}}>Option de la prestation</Typography>
        </Grid>
        <Grid>
          <ButtonSwitch label={'Retrait & livraison (5€)'} isEditable={false} isPrice={false} isOption={false}/>
        </Grid>
      </Grid>
        <Grid style={{marginBottom: 30}}>
        <Grid>
          <Typography variant={'h6'} style={{color: '#505050', fontWeight: 'bold'}}>Détails de la prestation</Typography>
        </Grid>
        <Grid style={{marginTop: 20, marginLeft: 10}}>
          <Grid style={{display: 'flex', alignItems : 'center', marginBottom: 20}}>
            <Grid>
              <RoomIcon color={'primary'}/>
            </Grid>
            <Grid style={{marginLeft: 10}}>
              <label>A mon adresse principale</label>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', alignItems : 'center'}}>
            <Grid>
              <CalendarTodayIcon color={'primary'}/>
            </Grid>
            <Grid style={{marginLeft: 10}}>
              <label>Le 23/03/2020 à 12h30</label>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
        <Grid style={{display: 'flex', flexDirection:'column', marginLeft:15, marginRight:15, marginBottom:30}}>
        <Grid>
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
            <Grid>
              <p>Presta A</p>
            </Grid>
            <Grid>
              <p>Prix</p>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
            <Grid>
              <p>Presta B</p>
            </Grid>
            <Grid>
              <p>Prix</p>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
            <Grid>
              <p>Presta C</p>
            </Grid>
            <Grid>
              <p>Prix</p>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
            <Grid>
              <p>Total (EUR)</p>
            </Grid>
            <Grid>
              <p>Prix</p>
            </Grid>
          </Grid>
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
            >
              Réserver
            </Button>
          </Grid>
        </Grid>
      </Grid>
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
                    <Grid style={{width : 400}}>
                      <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
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
                      <Grid>
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
                      <Grid>
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
                  <Grid>
                    <Grid>
                      <Grid className={classes.skillsContentContainer}>
                        <SkillsAlfred alfred={alfred} widthHr={500}/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {equipments.length !== 0 ?
                  <Grid style={{marginTop: 30}}>
                    <Grid>
                      <Typography variant="h6">{alfred.firstname} fournit :</Typography>
                    </Grid>
                    <Grid className={classes.hrStyle}>
                      <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                    </Grid>
                    <Grid>
                      <p>Dans le cadre de son service, votre Alfred peut fournir du matériel et des produits en fonction des prestations. Ces produits & matériels sont fournis sans surcoût. </p>
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
                <Grid style={{marginTop: 30}}>
                  <Grid>
                    <Typography variant="h6">Les disponibilités de {alfred.firstname}</Typography>
                  </Grid>
                  <Grid className={classes.hrStyle}>
                    <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                  </Grid>
                  <Grid>
                    <Schedule  availabilities={[]} services={[]} selectable={false} height={400}/>
                  </Grid>
                </Grid>
                <Grid style={{marginTop: 30}}>
                  <Grid>
                    <Typography variant="h6">Panier minimum de réservation</Typography>
                  </Grid>
                  <Grid className={classes.hrStyle}>
                    <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                  </Grid>
                  <Grid>
                    <p>Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service. Si votre Alfred indique un montant de 10€, vous ne pourrez pas réserver ce service si la somme des prestations n’atteint pas ce montant.</p>
                  </Grid>
                  <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Grid>
                      <ShoppingCartIcon fontSize="large"  color={'primary'}/>
                    </Grid>
                    <Grid style={{fontSize: 'x-large', marginLeft: 15}}>
                      {serviceUser.minimum_basket} €
                    </Grid>
                  </Grid>
                </Grid>
                <Grid style={{marginTop: 30}}>
                  <Grid>
                    <Typography variant="h6">Délai de prévenance de votre Alfred</Typography>
                  </Grid>
                  <Grid className={classes.hrStyle}>
                    <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                  </Grid>
                  <Grid>
                    <p>Le délai de prévenance correspond au délai nécessaire entre la réservation et la réalisation du service. Par exemple, si votre Alfred impose un délai de 24 heures, vous pourrez réserver votre service au minimum 24 heures avant son intervention. </p>
                  </Grid>
                  <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Grid>
                      <CalendarTodayIcon fontSize="large"  color={'primary'}/>
                    </Grid>
                    <Grid style={{fontSize: 'large',  marginLeft: 15}}>
                      {serviceUser.deadline_before_booking} de délai de prévenance
                    </Grid>
                  </Grid>
                </Grid>
                <Grid style={{marginTop: 30}}>
                  <Grid>
                    <Typography variant="h6">Le périmètre d’intervention de votre Alfred</Typography>
                  </Grid>
                  <Grid className={classes.hrStyle}>
                    <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                  </Grid>
                  <Grid>
                    <p>Le périmètre d’intervention de votre Alfred est la zone dans laquelle votre Alfred accepte de se déplacer pour réaliser ses services. Par mesure de sécurité et conformément à notre politique de confidentialité, l’adresse de votre Alfred n’est pas communiquée. </p>
                  </Grid>
                  <Grid>
                    {/* -------------------------------------   ICI LEAFLET ------------------------------------------------------ */}
                  </Grid>
                </Grid>
                <Grid style={{marginTop: 30}}>
                  <Grid>
                    <Typography variant="h6">Les conditions d’annulation de votre Alfred</Typography>
                  </Grid>
                  <Grid className={classes.hrStyle}>
                    <hr style={{color : 'rgb(80, 80, 80, 0.2)'}}/>
                  </Grid>
                  <Grid style={{display: 'flex', flexDirection : 'column'}}>
                    <Grid style={{display: 'flex', alignItems: 'center', flexDirection : 'row'}}>
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
                <Grid style={{marginTop: 30}}>
                  <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Grid>
                      <Typography variant="h6">{alfred.number_of_reviews} Commentaires</Typography>
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
                      </Grid> : null
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

userServices.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  container: PropTypes.instanceOf(typeof Element === 'undefined' ? Object : Element),
};

export default  withStyles(styles, { withTheme: true })(userServices);
