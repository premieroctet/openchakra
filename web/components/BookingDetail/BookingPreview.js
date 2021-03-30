const {clearAuthenticationToken} = require('../../utils/authentication')
const {setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react';
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
import Router from 'next/router';

const {BOOK_STATUS} = require('../../utils/consts')
import DatePicker, {registerLocale} from 'react-datepicker';
import fr from 'date-fns/locale/fr';
import Hidden from "@material-ui/core/Hidden";
import {PDFDownloadLink} from "@react-pdf/renderer";
import BillingGeneration from "../BillingGeneration/BillingGeneration";
import NoSSR from "react-no-ssr";

const {BOOKING} = require('../../utils/i18n')
registerLocale('fr', fr);
moment.locale('fr');

const Input2 = ({value, onClick}) => (
  <Button value={value} color={'inherit'} variant={'outlined'} style={{color: 'gray'}} className="example-custom-input"
          onClick={onClick}>
    {value}
  </Button>

);

class BookingPreview extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      booking_id: null,
      bookingObj: null,
      currentUser: null,
      is_alfred: null,
      end_datetime: null,
      loading: false
    };
    this.routingDetailsMessage = this.routingDetailsMessage.bind(this)
    this.getPrestationMinMoment = this.getPrestationMinMoment.bind(this)
  }

  static getInitialProps({query: {id, user}}) {
    return {
      booking_id: id,
    };
  }

  getPrestationMinMoment = () => {
    const {bookingObj} = this.state
    if (!bookingObj) {
      return null
    }
    const mini = moment(`${bookingObj.date_prestation} $${moment(bookingObj.time_prestation).format('HH:mm')}`, 'DD/MM/YYYY HH:mm').add(1, 'hours')
    return mini
  }
  setLoading = () => {
    this.setState({loading: true})

  }

  componentDidMount() {
    const booking_id = this.props.booking_id;


    axios.get(`/myAlfred/api/shop/alfred/${booking_id}`)
      .then(res => {
        this.setState({is_pro: !!res.data.is_professional})
      })
      .catch(err => {
        console.error(err)
      })


    this.setState({booking_id: booking_id});

    setAxiosAuthentication()

    axios.get('/myAlfred/api/users/current').then(res => {
      let result = res.data;
      this.setState({currentUser: result});

      axios.get(`/myAlfred/api/booking/${booking_id}`).then(res => {
        const booking = res.data
        const end_datetime = moment(`${booking.date_prestation} $${moment(booking.time_prestation).format('HH:mm')}`, 'DD/MM/YYYY HH:mm').add(1, 'hours')
        this.setState(
          {
            bookingObj: booking,
            is_alfred: booking.alfred._id === result._id,
            end_datetime: end_datetime,
          },
        );

        if (res.data.serviceUserId) {
          axios.get(`/myAlfred/api/serviceUser/${this.state.bookingObj.serviceUserId}`).then(res => {
            let resultat = res.data;
            this.setState({category: resultat.service.category})
          }).catch(error => {
            console.error(error);
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
          console.error(error);
        });
    })
      .catch(error => {
        console.error(error);
        if (error.response && error.response.status === 401 || error.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'});
        }
      });

  }

  changeStatus(status) {
    axios.put(`/myAlfred/api/booking/modifyBooking/${this.state.booking_id}`, {status: status})
      .then(res => {
        this.setState({bookingObj: res.data});
        this.socket.emit('changeStatus', this.state.bookingObj);
      })
      .catch(err => console.error(err));
  }

  onChangeEndDate = ev => {
    const m = moment(`${moment(ev).format('DD/MM/YYYY')} $${moment(this.state.end_datetime).format('HH:mm')}`, 'DD/MM/YYYY HH:mm')
    if (m.isAfter(this.getPrestationMinMoment())) {
      this.setState({end_datetime: m})
    }
  }

  onChangeEndTime = ev => {
    const m = moment(`$${moment(this.state.end_datetime).format('DD/MM/YYYY')} ${moment(ev).format('HH:mm')}`, 'DD/MM/YYYY HH:mm')
    if (m.isAfter(this.getPrestationMinMoment())) {
      this.setState({end_datetime: m})
    }
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

  onConfirm = () => {
    const {end_datetime} = this.state
    const endDate = moment(end_datetime).format('YYYY-MM-DD');
    const endHour = moment(end_datetime).format('HH:mm');
    const modifyObj = {end_date: endDate, end_time: endHour, status: BOOK_STATUS.CONFIRMED};

    axios.put('/myAlfred/api/booking/modifyBooking/' + this.state.booking_id, modifyObj)
      .then(res => {
        this.setState({bookingObj: res.data});
        setTimeout(() => this.socket.emit('changeStatus', res.data), 100);
      })
      .catch(err => console.error(err));
  }

  routingDetailsMessage() {
    const {currentUser, bookingObj} = this.state
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

  phoneDigit(str, index, chr) {
    if (index > str.length - 1) return str;
    return str.substring(0, index) + chr + str.substring(index + 1);
  }

  render() {
    const {classes} = this.props;
    const {bookingObj, currentUser, is_alfred, booking_id, end_datetime, loading, is_pro} = this.state;

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

    const status = bookingObj.status;
    const paymentTitle =
      amIAlfred ?
        status === BOOK_STATUS.REFUSED ? 'Paiement non réalisé'
          : [BOOK_STATUS.FINISHED, BOOK_STATUS.CONFIRMED].includes(status) ? 'Versement' : 'Revenus potentiels'
        :
        [BOOK_STATUS.REFUSED, BOOK_STATUS.CANCELED, BOOK_STATUS.EXPIRED].includes(status) ?
          'Paiement non réalisé'
          :
          status === BOOK_STATUS.FINISHED ?
            'Paiement'
            :
            [BOOK_STATUS.CONFIRMED, BOOK_STATUS.PREAPPROVED, BOOK_STATUS.INFO, BOOK_STATUS.TO_CONFIRM].includes(status) ?
              'Paiement si acceptation'
              :
              'Revenus potentiels'

    const momentTitle = [BOOK_STATUS.CONFIRMED, BOOK_STATUS.FINISHED].includes(status) ?
      `du ${bookingObj.date_prestation} à ${moment(bookingObj.time_prestation).format('HH:mm')}
       au ${moment(bookingObj.end_date).format('DD/MM/YYYY')} à ${bookingObj.end_time}`
      :
      `le ${bookingObj.date_prestation} à ${moment(bookingObj.time_prestation).format('HH:mm')}`;

    const phone = amIAlfred ? bookingObj.user.phone : bookingObj.alfred.phone;


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
                          {`${bookingObj.service} le ${bookingObj.date_prestation} à ${moment(bookingObj.time_prestation).format('HH:mm')}`}
                        </Typography>
                      </Grid>
                      <Grid>
                        <h2>
                          {status === BOOK_STATUS.PREAPPROVED ?
                            amIAlfred ? 'Pré-approuvée' : 'Invitation à réserver'
                            :
                            status
                          }
                        </h2>
                      </Grid>
                    </Grid>
                  </Grid>
                  {bookingObj.billing_number !== null && bookingObj.receipt_number !== null ?
                    <NoSSR>
                      <Grid style={{
                        textAlign: 'center',
                        fontSize: '20px'
                      }}>
                        {
                          loading ? "Chargement en cours..." :
                            <Grid onClick={this.setLoading}
                            >
                              <PDFDownloadLink
                                document={<BillingGeneration bookingObj={bookingObj} is_pro={is_pro}/>}
                                fileName=
                                  {
                                    is_pro ? "facture" + bookingObj.billing_number + ".pdf"
                                      : "recepisse" + bookingObj.receipt_number + ".pdf"
                                  }
                                style={{
                                  textDecoration: 'none',
                                  color: '#CCDCFB'
                                }}
                              >
                                Télécharger
                                {
                                  is_pro ? " ma facture" : " mon récépissé"
                                }
                              </PDFDownloadLink>
                            </Grid>
                        }
                      </Grid>
                    </NoSSR> : null}
                  <hr className={classes.hrSeparator}/>
                  {bookingObj === null ||
                  currentUser === null ? null : bookingObj.status ===
                  BOOK_STATUS.FINISHED ? (
                    currentUser._id === bookingObj.alfred._id ? (
                      <Grid container
                            style={{borderBottom: '1.5px #8281813b solid', marginTop: '5%', paddingBottom: '7%'}}>
                        <Grid container>
                          <Typography style={{marginBottom: '5%',}}>
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
                                  {BOOKING.MSG_EVALUATE}
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
                      <Grid container
                            style={{borderBottom: '1.5px #8281813b solid', marginTop: '5%', paddingBottom: '7%',}}>
                        <Grid container>
                          <Typography style={{marginTop: '-3%', fontSize: '1.7rem', marginBottom: '5%'}}>
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
                    <Grid container className={classes.reservationContainer}>
                      <Grid item xl={6}>
                        <Grid container>
                          <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                            <Grid item>
                              {displayUser.id_confirmed ?
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
                        <Grid item container className={classes.containerButtonGroup}>
                          <Grid item>
                            <Button variant={'contained'} color={'primary'} onClick={this.routingDetailsMessage}
                                    style={{textTransform: 'initial', color: 'white'}}>Envoyer un message</Button>
                          </Grid>
                          {bookingObj.status === BOOK_STATUS.CONFIRMED  && phone?
                            <Grid item className={classes.containerPhone}>
                              <Hidden only={['xl', 'lg', 'md', 'sm']}>
                                <Button>
                                  <a
                                    href={`tel:${phone}`}
                                    style={{textDecoration: 'none', color: 'rgba(178,204,251,1)', cursor: 'pointer'}}
                                  >
                                    Appeler
                                  </a>
                                </Button>
                              </Hidden>
                            </Grid> : null
                          }
                        </Grid>
                      </Grid>
                      {
                        bookingObj.status === BOOK_STATUS.CONFIRMED && phone?
                          <Hidden only={['xs']}>
                            <Grid item xl={6}>
                              <Grid>
                                <Typography>Numéro de téléphone :</Typography>
                              </Grid>
                            </Grid>
                            <Grid item xl={6}>
                              <Grid>
                                <Typography
                                  style={{textAlign: 'center'}}> {this.phoneDigit(phone.substring(1), 0, "0")}</Typography>
                              </Grid>
                            </Grid>
                          </Hidden> : null
                      }
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
                            <Grid item>
                              <Typography>
                                {bookingObj.service}
                              </Typography>
                              <Typography>
                                {momentTitle}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                            <Grid item>
                              <Typography>
                                {bookingObj.address ?
                                  `au ${bookingObj.address.address}, ${bookingObj.address.zip_code} ${bookingObj.address.city}` : 'en visio'}
                              </Typography>
                              <Typography>
                                {`créée le ${moment(bookingObj.date).format('DD/MM/YYYY')} à ${moment(bookingObj.date).format('HH:mm')}`}
                              </Typography>
                            </Grid>
                          </Grid>
                          {bookingObj.status === BOOK_STATUS.TO_CONFIRM && amIAlfred ?
                            <Grid className={classes.detailsReservationContainer} style={{alignItems: 'center'}}>
                              <Grid item>
                                <Typography>
                                  Date de fin:
                                </Typography>
                                <DatePicker
                                  selected={moment(end_datetime).toDate()}
                                  onChange={this.onChangeEndDate}
                                  locale='fr'
                                  showMonthDropdown
                                  dateFormat="dd/MM/yyyy"
                                  customInput={<Input2/>}
                                />
                                -
                                <DatePicker
                                  selected={moment(end_datetime).toDate()}
                                  onChange={this.onChangeEndTime}
                                  customInput={<Input2/>}
                                  showTimeSelect
                                  showTimeSelectOnly
                                  timeIntervals={15}
                                  timeCaption="Heure"
                                  dateFormat="HH:mm"
                                  locale='fr'
                                  minDate={new Date()}
                                />
                              </Grid>
                            </Grid>
                            :
                            null
                          }
                        </Grid>
                      </Grid>
                      <Grid container className={classes.mainContainerStateResa}>
                        <Grid>
                          {status === BOOK_STATUS.TO_CONFIRM ? (
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
                                              onClick={this.onConfirm}>Confirmer</Button>
                                    </Grid>
                                    <Grid>
                                      <Button variant={'outlined'} color={'primary'}
                                              onClick={() => this.changeStatus(BOOK_STATUS.REFUSED)}>Refuser</Button>
                                    </Grid>
                                  </Grid>
                                )
                                :
                                null
                            )
                            :
                            bookingObj.status === BOOK_STATUS.INFO && currentUser._id === bookingObj.alfred._id ? (
                                <Grid container className={classes.groupButtonsContainer} spacing={1}>
                                  <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
                                    <Button onClick={() => this.props.onConfirmPreapproved(booking_id)} color={'primary'}
                                            variant={'contained'}
                                            style={{color: 'white', textTransform: 'initial'}}>Pré-approuver</Button>
                                  </Grid>
                                  <Grid item xs={12} xl={12} lg={12} sm={12} md={12}>
                                    <Button
                                      onClick={() => this.changeStatus(BOOK_STATUS.REFUSED)}
                                      variant={'outlined'}
                                      style={{textTransform: 'initial'}}
                                      color={'primary'}>
                                      Refuser
                                    </Button>
                                  </Grid>
                                </Grid>
                              )
                              :
                              bookingObj.status === BOOK_STATUS.TO_PAY && currentUser._id === bookingObj.user._id ? (
                                  <Grid className={classes.groupButtonsContainer}>
                                    <Button onClick={() => Router.push(`/confirmPayment?booking_id=${booking_id}`)}
                                            color={'primary'} variant={'contained'}
                                            style={{color: 'white', textTransform: 'initial'}}>Payer ma
                                      réservation</Button>
                                  </Grid>
                                )
                                :
                                bookingObj.status === BOOK_STATUS.INFO && currentUser._id === bookingObj.user._id ?
                                  (
                                    null
                                  )
                                  :
                                  bookingObj.status === BOOK_STATUS.PREAPPROVED && currentUser._id === bookingObj.user._id ? (
                                      <Grid className={classes.groupButtonsContainer}>
                                        <Button onClick={() => Router.push(`/confirmPayment?booking_id=${booking_id}`)}
                                                color={'primary'} variant={'contained'}
                                                style={{color: 'white', textTransform: 'initial'}}>Payer ma
                                          réservation</Button>
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
                  {([BOOK_STATUS.TO_CONFIRM, BOOK_STATUS.INFO].includes(status) && !amIAlfred) ||
                  status === BOOK_STATUS.CONFIRMED || status === BOOK_STATUS.PREAPPROVED ? (
                    <Grid
                      container
                      style={{
                        borderBottom: '1.5px #8281813b solid',
                        paddingBottom: '3%',
                        paddingTop: '3%',
                      }}
                    >
                      <a style={{textDecoration: 'none', color: 'rgba(178,204,251,1)', cursor: 'pointer'}}
                         onClick={() => this.props.onCancel(booking_id)}>
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
                  BOOK_STATUS.FINISHED ? (
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
