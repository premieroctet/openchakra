const {clearAuthenticationToken}=require('../../utils/authentication')
const {setAxiosAuthentication}=require('../../utils/authentication')
import React, {Fragment} from 'react';
import Link from 'next/link';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import moment from 'moment';
import UserAvatar from '../../components/Avatar/UserAvatar';
import io from 'socket.io-client';
import styles from '../../static/css/components/BookingDetail/BookingPreview/BookingPreview';
import Button from '@material-ui/core/Button';
import BookingDetail from '../../components/BookingDetail/BookingDetail';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Router from 'next/router';



moment.locale('fr');

class BookingPreview extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      value: 4,
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
      booking_id: null,
      bookingObj: null,
      currentUser: null,
      categoryLabel: '',
      is_alfred: null,
      alfredId: null,
    };
    this.routingDetailsMessage = this.routingDetailsMessage.bind(this)
  }

  static getInitialProps({query: {id, user}}) {
    return {
      booking_id: id,
    };
  }

  componentDidMount() {
    const booking_id = this.props.booking_id;

    this.setState({booking_id: booking_id});

    setAxiosAuthentication()

    axios.get('/myAlfred/api/users/current').then(res => {
      let result = res.data;
      this.setState({currentUser: result});
      axios.get('/myAlfred/api/booking/' + booking_id).then(res => {
        this.setState(
          {
            bookingObj: res.data,
            alfredId: res.data.alfred._id,
            is_alfred: res.data.alfred._id === result._id,
          },
        );

        if (res.data.serviceUserId) {
          axios.get(`/myAlfred/api/serviceUser/${this.state.bookingObj.serviceUserId}`).then(res => {
            let resultat = res.data;
            this.setState({category: resultat.service.category}, () =>
              axios.get(`/myAlfred/api/category/${this.state.category}`).then(res => {
                this.setState({categoryLabel: res.data.label});
              }),
            );
          }).catch(error => {
            console.log(error);
          });
        }

        this.socket = io();
        this.socket.on('connect', socket => {
          this.socket.emit('booking', this.state.bookingObj._id);
        });
        this.socket.on('displayStatus', data => {
          this.setState({bookingObj: data});
        });
      })
        .catch(error => {
          console.log(error);
        });
    })
      .catch(error => {
        console.log(error);
        if (error.response && error.response.status === 401 || error.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'});
        }
      });

  }

  changeStatus(status) {
    axios
      .put(
        '/myAlfred/api/booking/modifyBooking/' + this.state.booking_id,
        {status: status},
      )
      .then(res => {
        this.setState({bookingObj: res.data});

        this.socket.emit('changeStatus', this.state.bookingObj);
      })
      .catch(err => console.error(err));
  }

  handleOpen1() {
    this.setState({modal1: true});
  }

  handleOpen2() {
    this.setState({modal2: true});
  }

  handleOpen3() {
    this.setState({modal3: true});
  }

  handleOpen4() {
    this.setState({modal4: true});
  }

  handleClose() {
    this.setState({
      modal1: false,
      modal2: false,
      modal3: false,
      modal4: false,
    });
  }

  computePricedPrestations() {
    var result = {};
    if (this.state.bookingObj) {
      this.state.bookingObj.prestations.forEach(p => {
        result[p.name] = p.price * p.value;
      });
    }
    return result;
  }

  computeCountPrestations() {
    var result = {};
    if (this.state.bookingObj) {
      this.state.bookingObj.prestations.forEach(p => {
        result[p.name] = p.value;
      });
    }
    return result;
  }

  routingDetailsMessage() {
    const {currentUser, bookingObj}=this.state
    const displayUser = currentUser._id === bookingObj.alfred._id ? bookingObj.user : bookingObj.alfred
    Router.push({
      pathname: '/profile/messages',
      query: {
        user: this.state.currentUser._id,
        relative: displayUser._id
      },
    });
  }

  callDrawer = () => {
    this.child.current.handleDrawerToggle();
  };

  render() {
    const {classes} = this.props;
    const {bookingObj, currentUser, categoryLabel, is_alfred, booking_id} = this.state;

    if (!bookingObj || !currentUser) {
      return null
    }
    const pricedPrestations = this.computePricedPrestations();
    const countPrestations = this.computeCountPrestations();

    const amount = is_alfred ? parseFloat(bookingObj.alfred_amount) : parseFloat(bookingObj.amount);
    const alfred_fee = 0;
    const client_fee = is_alfred ? 0 : bookingObj.fees;

    // Am i the service provider ?
    const amIAlfred = currentUser._id === bookingObj.alfred._id;
    const displayUser = amIAlfred ? bookingObj.user : bookingObj.alfred;

    const status=bookingObj.status;
    const paymentTitle =
      amIAlfred ?
        status === 'Refusée' ? 'Paiement non réalisé'
          : ['Terminée', 'Confirmée'].includes(status) ? 'Versement' :  'Revenus potentiels'
        :
        ['Refusée', 'Annulée', 'Expirée'].includes(status) ?
          'Paiement non réalisé'
          :
          status === 'Terminée' ?
            'Paiement'
            :
            ['Confirmée', 'Pré-approuvée', 'Demande d\'infos', 'Pré-approuvée', 'En attente de confirmation'].includes(status) ?
              'Paiement si acceptation'
              :
              'Revenus potentiels'

    const momentTitle = ['Confirmée', 'Terminée'].includes(status) ?
      `Du ${bookingObj.date_prestation} - ${moment(bookingObj.time_prestation).format('HH:mm')}
       au ${moment(bookingObj.end_date).format('DD/MM/YYYY')} à ${bookingObj.end_time}`
       :
       `Le ${bookingObj.date_prestation} - ${moment(bookingObj.time_prestation).format('HH:mm')}`;

    return (
      <Grid>
        {currentUser._id !==
        bookingObj.alfred._id && currentUser._id !== bookingObj.user._id ? (
          <Typography>Vous n'avez pas l'autorisation d'accéder à cette page</Typography>
        ) : (
          <Grid>
            <Grid container className={classes.bigContainer}>
              <Grid container>
                <Grid className={classes.Rightcontent} item xs={12} sm={12} md={12} xl={12} lg={12}>
                  <Grid container className={classes.mobilerow}>
                    <Grid item xs={2} sm={3} md={3} xl={3} lg={3}>
                      <UserAvatar user={displayUser} className={classes.avatarLetter}/>
                    </Grid>
                    <Grid item xs={9} sm={9} md={9} xl={9} lg={9}>
                      <Grid>
                        <Typography>
                            {`${displayUser.firstname} ${displayUser.name}`}
                        </Typography>
                      </Grid>
                      <Grid style={{marginTop: '2%'}}>
                        <Typography>
                          { `${bookingObj.service} le ${bookingObj.date_prestation} à ${moment(bookingObj.date).format('HH:mm')}`}
                        </Typography>
                      </Grid>
                      <Grid>
                      <h2>
                        {status === 'Pré-approuvée' && !amIAlfred ? 'Invitation à réserver' : status}
                      </h2>
                      </Grid>
                    </Grid>
                  </Grid>
                  <hr className={classes.hrSeparator}/>
                  {bookingObj === null ||
                  currentUser === null ? null : bookingObj.status ===
                  'Terminée' ? (
                    currentUser._id === bookingObj.alfred._id ? (
                      <Grid container style={{ borderBottom: '1.5px #8281813b solid', marginTop: '5%', paddingBottom: '7%'}}>
                        <Grid container>
                          <Typography style={{marginBottom: '5%', }}>
                            Commentaires
                          </Typography>
                        </Grid>
                        <div style={{display: 'flex', flexFlow: 'row'}}>
                          {bookingObj.user_evaluated ?
                            <Grid container>
                              <Grid item md={12} xs={12} style={{marginBottom: '35px'}}>
                                <Typography>
                                  Vous avez déjà évalué votre client.
                                </Typography>
                              </Grid>
                            </Grid>
                            :
                            <Grid container>
                              <Grid item md={6} xs={12}>
                                <Typography>
                                  BOOKING.MSG_EVALUATE
                                </Typography>
                              </Grid>
                              <Grid item xs={2}/>
                              <Grid item md={4} xs={12}>
                                <Link
                                  href={`/evaluateClient?booking=${bookingObj._id}&id=${bookingObj.serviceUserId}&client=${bookingObj.user._id}`}>
                                  <Button color={'secondary'} variant={'contained'} style={{color: 'white'}}>Evaluer
                                    mon client
                                  </Button>
                                </Link>
                              </Grid>
                            </Grid>}
                        </div>
                      </Grid>
                    ) : (
                      <Grid container style={{borderBottom: '1.5px #8281813b solid', marginTop: '5%', paddingBottom: '7%',}}>
                        <Grid container>
                          <Typography style={{ marginTop: '-3%', fontSize: '1.7rem', marginBottom: '5%'}}>
                            Commentaires
                          </Typography>
                        </Grid>
                        <div style={{display: 'flex', flexFlow: 'row'}}>
                          {bookingObj.alfred_evaluated ?
                            <Grid container>
                              <Grid item md={12} xs={12} style={{marginBottom: '35px'}}>
                                <Typography>
                                  Vous avez déjà évalué votre Alfred.
                                </Typography>
                              </Grid>
                            </Grid>
                            :
                            <Grid container>
                              <Grid item md={6} xs={12} style={{marginBottom: '35px'}}>
                                <Typography>
                                  Vous avez 15 jours pour évaluer votre Alfred. Une
                                  fois que votre Alfred aura rédigé son commentaire,
                                  il pourra consulter votre évaluation et vous
                                  pourrez consulter la sienne !
                                </Typography>
                              </Grid>
                              <Grid item xs={2}/>
                              <Grid item md={4} xs={12}>
                                <Link
                                  href={`/evaluate?booking=${bookingObj._id}&id=${bookingObj.serviceUserId}`}
                                >
                                  <Grid
                                    style={{
                                      textAlign: 'center',
                                      width: '200px',
                                      height: '40px',
                                      backgroundColor: '#F8727F',
                                      lineHeight: 2.5,
                                      borderRadius: '50px',
                                      cursor: 'pointer',
                                    }}
                                  >
                                    <a
                                      style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                      }}
                                    >
                                      Evaluer mon Alfred
                                    </a>
                                  </Grid>
                                </Link>
                              </Grid>
                            </Grid>}
                        </div>
                      </Grid>
                    )
                  ) : null}
                  <Grid container className={classes.mainContainerAboutResa}>
                    <Grid item xs={12} className={classes.containerTitleSectionAbout}>
                      <Typography className={classes.fontSizeTitleSectionAbout}>
                        A propos de {displayUser.firstname}
                      </Typography>
                    </Grid>
                    <Grid container  className={classes.reservationContainer}>
                      <Grid item xl={6}>
                        <Grid container>
                          <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                            <Grid item style={{paddingLeft: '3%'}}>
                              { displayUser.id_confirmed ?
                                <Typography>
                                  Pièce d'identité vérifiée
                                </Typography>
                                :
                                null
                              }
                              <Typography>
                                {`Membre depuis ${moment(displayUser.creation_date).format("MMMM YYYY")}`}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xl={6} className={classes.mainContainerAbout}>
                        <Grid item container className={classes.containerButtonGroup} spacing={3}>
                          <Grid item>
                            <Button variant={'contained'} color={'primary'} onClick={this.routingDetailsMessage} style={{textTransform: 'initial', color:'white'}}>Envoyer un message</Button>
                          </Grid>
                          {bookingObj.status === 'Confirmée' ?
                            <Grid item>
                              <Button>
                                <a
                                  href={`tel:${amIAlfred ? bookingObj.user.phone : bookingObj.alfred.phone}`}
                                  style={{textDecoration: 'none', color: 'rgba(178,204,251,1)', cursor: 'pointer'}}
                                >
                                  Appeler
                                </a>
                              </Button>
                            </Grid> : null
                          }
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container className={classes.mainContainerAboutResa}>
                    <Grid item xs={12} className={classes.containerTitleSectionAbout}>
                      <Typography className={classes.fontSizeTitleSectionAbout}>
                        A propos de votre réservation
                      </Typography>
                    </Grid>
                    <Grid className={classes.reservationContainer}>
                      <Grid item>
                        <Grid container>
                          <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                            <Grid item style={{paddingLeft: '3%'}}>
                              <Typography>
                              { bookingObj.service}
                              </Typography>
                              <Typography>
                                {momentTitle}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                            <Grid item style={{paddingLeft: '3%'}}>
                              <Typography>
                                {bookingObj.address ?
                                  `Au ${bookingObj.address.address}, ${bookingObj.address.zip_code} ${bookingObj.address.city}` : 'En visio'}
                              </Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid container className={classes.mainContainerStateResa}>
                        <Grid>
                          {status ===
                          'En attente de confirmation' ? (
                            amIAlfred ? (
                              <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                                <Grid className={classes.labelReservation}>
                                  <Typography>
                                    Votre réservation doit être confirmée avant le{' '}
                                    {moment(bookingObj.date)
                                      .add(1, 'd')
                                      .format('DD/MM/YYYY')}{' '}
                                    à {moment(bookingObj.date).format('HH:mm')}
                                  </Typography>
                                </Grid>
                                <Grid className={classes.buttonConfirmResa}>
                                  <Button variant={'contained'} className={classes.buttonConfirm}
                                  onClick={()=>this.props.onConfirm(booking_id)}>Confirmer</Button>
                                </Grid>
                                <Grid>
                                  <Button variant={'outlined'} color={'primary'}
                                          onClick={() => this.changeStatus('Refusée')}>Refuser</Button>
                                </Grid>
                              </Grid>
                            )
                            :
                            null
                          )
                          :
                          bookingObj.status === 'Demande d\'infos' && currentUser._id === bookingObj.alfred._id ? (
                            <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                              <Button onClick={()=>this.props.onConfirmPreaProuved(booking_id)} color={'primary'} variant={'contained'} style={{color: 'white', textTransform: 'initial'}}>Pré-approuver</Button>
                              <Grid style={{marginTop: '5%'}}>
                                <Button
                                  onClick={() => this.changeStatus('Refusée')}
                                  variant={'outlined'}
                                  style={{textTransform: 'initial'}}
                                  color={'primary'}>
                                  Refuser
                                </Button>
                              </Grid>
                            </Grid>
                          )
                          :
                          bookingObj.status === 'En attente de paiement' && currentUser._id === bookingObj.user._id ? (
                            <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                              <Button onClick={()=>Router.push(`/confirmPayement?booking_id=${booking_id}`)}
                                color={'primary'} variant={'contained'} style={{color: 'white', textTransform: 'initial'}}>Payer ma réservation</Button>
                            </Grid>
                          )
                          :
                          bookingObj.status === 'Demande d\'infos' && currentUser._id === bookingObj.user._id ?
                          (
                            null
                          )
                          :
                          bookingObj.status === 'Pré-approuvée' && currentUser._id === bookingObj.user._id ? (
                            <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                              <Button onClick={()=>Router.push(`/confirmPayement?booking_id=${booking_id}`)}
                                color={'primary'} variant={'contained'} style={{color: 'white', textTransform: 'initial'}}>Payer ma réservation</Button>
                            </Grid>
                          )
                          :
                          null}
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container style={{
                    borderBottom: '1.5px #8281813b solid',
                    marginTop: '5%',
                    paddingBottom: '7%',
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <Grid item className={classes.equipmentContainer}>
                      <Typography variant={'h3'} className={classes.fontSizeTitleSectionAbout}>
                        Matériel fourni
                      </Typography>
                    </Grid>
                    {bookingObj === null ? null : bookingObj.equipments
                      .length ? (
                      bookingObj.equipments.map(equipment => {
                        return (
                          <Grid item xs={1} style={{textAlign: 'center'}}>
                            <img
                              alt={equipment.logo}
                              title={equipment.logo}
                              style={{width: '98%'}}
                              src={`/static/equipments/${equipment.logo}`}
                            />
                          </Grid>
                        );
                      })
                    ) : (
                      <Grid style={{marginTop: '2%'}}>
                        <Typography>Aucun équipement fourni</Typography>
                      </Grid>

                    )}
                  </Grid>
                  <Grid container
                        style={{borderBottom: '1.5px #8281813b solid', marginTop: '5%', paddingBottom: '7%'}}>
                    <Grid item>
                      <Typography variant={'h3'} className={classes.fontSizeTitleSectionAbout}>
                        {paymentTitle}
                      </Typography>
                    </Grid>
                    <Grid container style={{display: 'flex', flexDirection: 'column'}}>
                      <Grid className={classes.bookingDetailContainer}>
                        <Grid item>
                          <BookingDetail
                            prestations={pricedPrestations}
                            count={countPrestations}
                            alfred_fee={alfred_fee}
                            client_fee={client_fee}
                            travel_tax={bookingObj.travel_tax}
                            pick_tax={bookingObj.pick_tax}
                            total={amount}
                            cesu_total={bookingObj.cesu_amount}/>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                  {(['En attente de confirmation','Demande d\'infos'].includes(status) && !amIAlfred) ||
                    status === 'Confirmée' || status === 'Pré-approuvée' ? (
                    <Grid
                      container
                      style={{
                        borderBottom: '1.5px #8281813b solid',
                        paddingBottom: '3%',
                        paddingTop: '3%',
                      }}
                    >
                        <a style={{ textDecoration: 'none', color: 'rgba(178,204,251,1)', cursor: 'pointer'}}
                          onClick={()=> this.props.onCancel(booking_id)}>
                          Annuler la réservation
                        </a>
                    </Grid>
                  ) : null}
                  <Grid
                    container
                    style={{
                      borderBottom: '1.5px #8281813b solid',
                      marginTop: '2%',
                      paddingBottom: '3%',
                    }}
                  >
                    <a
                      href="mailto:contact@myalfred.io"
                      style={{
                        textDecoration: 'none',
                        color: 'rgba(178,204,251,1)',
                      }}
                    >
                      Signaler l’utilisateur
                    </a>
                  </Grid>
                  {bookingObj === null ||
                  currentUser === null ? null : bookingObj.status ===
                  'Terminée' ? (
                    <Grid
                      container
                      style={{
                        borderBottom: '1.5px #8281813b solid',
                        marginTop: '2%',
                        paddingBottom: '3%',
                      }}
                    >
                      <a
                        href="mailto:contact@myalfred.io"
                        style={{
                          textDecoration: 'none',
                          color: 'rgb(47, 188, 211)',
                        }}
                      >
                        Réclamation
                      </a>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>

              {/*/////////////////////////////////////////////////////////////////////////////////////////*/}
            </Grid>
          </Grid>
        )}
        </Grid>
    );
  }
}

export default withStyles(styles)(BookingPreview);
