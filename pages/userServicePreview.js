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

const { config } = require('../../config/config');
const url = config.apiUrl;

class userServicePreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      shop: {},
      serviceUser: {},
      service: {},
      equipments: [],
      prestations: [],
      flexible: false,
      moderate: false,
      strict: false,
      haveOptions: false,
      languages:[],
      alfred:[],
      test:{},
      allEquipments: [],
      availabilities: [],
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
      });
      axios.get(url + "myAlfred/api/shop/alfred/" + this.state.serviceUser.user._id).then(res => {
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

  render() {
    const {classes} = this.props;
    const {user, serviceUser, shop, service, equipments, userName} = this.state;
    let prenom = user.firstname;
    console.log(shop, 'shop');
    console.log(serviceUser, 'serviceUser');
    console.log(user, 'user');
    console.log(service, 'service');
    console.log(equipments, 'equipments');
    console.log(prenom, 'prenom')

    const StyledRating = withStyles({
      iconFilled: {
        color: '#4fbdd7',
      },
    })(Rating);

    return (
      <Grid>
        <Layout>
          <Grid style={{width: '100%'}}>
            <BannerReservation serviceUser={service} shop={shop} user={user}/>
            <Grid className={classes.mainContainer}>
              <Grid style={{width: '50%'}}>
                <Grid style={{display: ' flex'}}>
                  <Grid style={{width: '80%'}}>
                    <Grid>
                      <Grid>
                        <Typography variant="h6">{service.label} par {user.firstname}</Typography>
                      </Grid>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems: 'center'}}>
                      <Grid>
                        <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                          <Badge badgeContent={0} color={'primary'} className={classes.badgeStyle}>
                            <StyledRating name="read-only" value={3} readOnly className={classes.rating} />
                          </Badge>
                        </Box>
                      </Grid>
                      <Grid>
                        <a href={"#"}>Voir plus de commentaires</a>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Grid>
                        <p>Coiffeuse depuis plus de 10 ans, je vous propose mes services de Coiffure à domicile pour partager ma passion pour la coiffure .
                          J’ai également suivi une formation de visagiste, me permettant de vous conseiller au mieux ! </p>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid style={{width : '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <Grid item className={classes.itemAvatar}>
                      <UserAvatar classes={'avatarLetter'} user={user} className={classes.avatarLetter} />
                      <Typography style={{marginTop:20}} className={classes.textAvatar}>{user.firstname}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid className={classes.responsiveListContainer}>
                  <List dense={this.state.dense} className={classes.flexPosition}>
                    <Grid style={{width: '100%', display: 'flex', justifyContent: 'space-between'}}>
                      <Grid>
                        <ListItem className={classes.noPadding}>
                          <ListItemIcon className={classes.minWidth}>
                            <img src={'../../static/assets/img/iconCardAlfred/graduated.svg'} alt={'Diplome'} title={'Diplome'} className={classes.imageStyle}/>
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
                            <img src={'../../static/assets/img/iconCardAlfred/certificate.svg'} alt={'Certifié'} title={'Certifié'} className={classes.imageStyle}/>
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
                            <img src={'../../static/assets/img/iconCardAlfred/experience.svg'} alt={'Expérimenté'} title={'Expérimenté'} className={classes.imageStyle}/>
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
                <Grid>
                  <Grid>
                    <Grid>
                      <Grid className={classes.skillsContentContainer}>
                        <SkillsAlfred alfred={user}/>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <Typography variant="h6">{user.firstname} fournit :</Typography>
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
                </Grid>
                <Grid>
                  <Grid>
                    <Typography variant="h6">Les disponibilités de {user.firstname}</Typography>
                  </Grid>
                  <Grid>
                    <Schedule  availabilities={[]} services={[]} selectable={false} height={400}/>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <Typography variant="h6">Panier minimum de réservation</Typography>
                  </Grid>
                  <Grid>
                    <p>Le montant minimum de réservation correspond au panier minimum requis pour réserver ce service. Si votre Alfred indique un montant de 10€, vous ne pourrez pas réserver ce service si la somme des prestations n’atteint pas ce montant.</p>
                  </Grid>
                  <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Grid>
                      <ShoppingCartIcon fontSize="large"  color={'primary'}/>
                    </Grid>
                    <Grid style={{fontSize: 'x-large'}}>
                      {serviceUser.minimum_basket} €
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <Typography variant="h6">Délai de prévenance de votre Alfred</Typography>
                  </Grid>
                  <Grid>
                    <p>Le délai de prévenance correspond au délai nécessaire entre la réservation et la réalisation du service. Par exemple, si votre Alfred impose un délai de 24 heures, vous pourrez réserver votre service au minimum 24 heures avant son intervention. </p>
                  </Grid>
                  <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Grid>
                      <CalendarTodayIcon fontSize="large"  color={'primary'}/>
                    </Grid>
                    <Grid style={{fontSize: 'large'}}>
                      {serviceUser.deadline_before_booking} de délai de prévenance
                    </Grid>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <Typography variant="h6">Le périmètre d’intervention de votre Alfred</Typography>
                  </Grid>
                  <Grid>
                    <p>Le périmètre d’intervention de votre Alfred est la zone dans laquelle votre Alfred accepte de se déplacer pour réaliser ses services. Par mesure de sécurité et conformément à notre politique de confidentialité, l’adresse de votre Alfred n’est pas communiquée. </p>
                  </Grid>
                  <Grid>
                    <img src={'../../static/assets/img/map.png'} alt={'map'} title={'map'} style={{height : 300, width: '90%'}}/>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <Typography variant="h6">Les conditions d’annulation de votre Alfred</Typography>
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
                <Grid>
                  <Grid style={{display: 'flex', alignItems: 'center'}}>
                    <Grid>
                      <Typography variant="h6">{user.number_of_reviews} Commentaires</Typography>
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
                  <Grid>
                    <Grid style={{display: 'flex', alignItems:'center'}}>
                      <label>Accueil</label>
                      <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                        <StyledRating name="read-only" value={0} readOnly className={classes.rating} />
                      </Box>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems:'center'}}>
                      <label>Qualité-prix</label>
                      <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                        <StyledRating name="read-only" value={0} readOnly className={classes.rating} />
                      </Box>
                    </Grid>
                    <Grid style={{display: 'flex', alignItems:'center'}}>
                      <label>Communication</label>
                      <Box component="fieldset" mb={3} borderColor="transparent" className={classes.boxRating}>
                        <StyledRating name="read-only" value={0} readOnly className={classes.rating} />
                      </Box>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid>
                      <CardCommentary/>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
              <Grid style={{width: '50%', display: 'flex', flexDirection: 'column'}}>
                <Grid style={{border: '2px solid #d2d2d2', borderRadius: 30, marginRight: 100, marginLeft: 100, padding: '3%'}}>
                  <Grid style={{marginBottom: 30}}>
                    <Grid>
                      <Typography variant="h6" style={{color: '#505050', fontWeight: 'bold'}}>Date & Heure</Typography>
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
                          user.firstname !== undefined ?
                            <ButtonSwitch label={'Chez ' + user.firstname} isEditable={false} isPrice={false} isOption={false}/>
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
              </Grid>
            </Grid>
          </Grid>
        </Layout>
      </Grid>

    )
  }
}

userServicePreview.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default  withStyles(styles, { withTheme: true })(userServicePreview);
