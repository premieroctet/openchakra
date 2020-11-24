import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../../hoc/Layout/Layout';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import UserAvatar from '../../components/Avatar/UserAvatar';
import NavBarShop from '../../components/NavBar/NavBarShop/NavBarShop';
import NavbarMobile from '../../components/NavbarMobile/NavbarMobile';
import styles from './reservationsStyle';
import Button from '@material-ui/core/Button';
import ResponsiveDrawer from '../../components/ResponsiveDrawer/ResponsiveDrawer';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import cookie from 'react-cookies';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Box from "../../components/Box/Box";
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import BookingPreview from '../../components/BookingDetail/BookingPreview'
import BookingCancel from '../../components/BookingDetail/BookingCancel'
import BookingConfirm from '../../components/BookingDetail/BookingConfirm'


moment.locale('fr');

//TODO RASSEMBLER ALLRESERVATIONS + COMINGRESERVATIONS + FINISHEDRESERVATIONS

class AllReservations extends React.Component {
  constructor(props) {
    super(props);
    this.child = React.createRef();
    this.state = {
      user: null,
      alfredReservations: [],
      userReservations: [],
      isAlfred: false,
      userInfo: {},
      // reservationType : 0 => Alfred, 1 => client
      reservationType: 1,
      // Tab reservationStatus : 0 => toutes, 1 => à venir, 2 => terminées
      reservationStatus: 0,
      bookingPreview: null,
      bookingCancel: null,
      bookingConfirm: null,
    };
    this.bookingPreviewModal = this.bookingPreviewModal.bind(this)
    this.bookingCancelModal = this.bookingCancelModal.bind(this)
    this.bookingConfirmModal = this.bookingConfirmModal.bind(this)
  }

  componentDidMount() {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get('/myAlfred/api/users/current').then(res => {
      let result = res.data;
      this.setState({
        userInfo: result,
        user: result._id,
        isAlfred: result.is_alfred,
        reservationType: result.is_alfred ? 0 : 1,
      });

      this.loadBookings()
    });
  }

  loadBookings = () => {
    axios.get('/myAlfred/api/booking/alfredBooking').then(res => {
      this.setState({alfredReservations: res.data});
    });

    axios.get('/myAlfred/api/booking/userBooking').then(res => {
      this.setState({userReservations: res.data});
    });
  }

  handleReservationTypeChanged = (event, newValue) => {
    this.setState({reservationType: newValue, reservationStatus: 0})
  }

  handleReservationStatusChanged = (event, newValue) => {
    this.setState({reservationStatus: newValue})
  }

  isFinished = reservation => {
    return ['Refusée', 'Annulée', 'Terminée', 'Expirée'].includes(reservation.status)
  }

  isComing = reservation => {
    return ["Demande d'infos", 'En attente de confirmation', 'Confirmée', 'Pré-approuvée'].includes(reservation.status)
  }

  filterReservations = () => {
    const {reservationType, reservationStatus, alfredReservations, userReservations}=this.state
    // Alfred/customer reservatioons
    var reservations = reservationType==0 ?  alfredReservations : userReservations
    // All/ coming/finished reservations
    if (reservationStatus==1) { reservations = reservations.filter(this.isComing)}
    if (reservationStatus==2) { reservations = reservations.filter(this.isFinished)}
    return reservations
  }

  openBookingPreview = bookingId => {
    this.loadBookings()
    this.setState({ bookingPreview: bookingId, bookingCancel: null, bookingConfirm: null})
  }

  openBookingCancel = bookingId => {
    this.setState({ bookingPreview:null, bookingCancel: bookingId, bookingConfirm: null})
  }

  openBookingConfirm = bookingId => {
    this.setState({ bookingPreview:null, bookingCancel: null, bookingConfirm: bookingId})
  }

  bookingPreviewModal = () => {
    const {bookingPreview}=this.state

    return (
      <Dialog style={{width: '100%'}}
        open={Boolean(bookingPreview)}
        onClose={() => this.setState({bookingPreview: null})}
      >
        <DialogContent>
          <BookingPreview booking_id={bookingPreview} onCancel={this.openBookingCancel} onConfirm={this.openBookingConfirm}/>
        </DialogContent>
      </Dialog>
    )
  }

  bookingCancelModal = () => {
    const {bookingCancel}=this.state

    return (
      <Dialog style={{width: '100%'}}
        open={Boolean(bookingCancel)}
        onClose={() => this.setState({bookingCancel: null})}
      >
        <DialogContent>
          <BookingCancel booking_id={bookingCancel} onMaintain={this.openBookingPreview}/>
        </DialogContent>
      </Dialog>
    )
  }

  bookingConfirmModal = () => {
    const {bookingConfirm}=this.state

    return (
      <Dialog style={{width: '100%'}}
        open={Boolean(bookingConfirm)}
        onClose={() => this.setState({bookingConfirm: null})}
      >
        <DialogContent>
          <BookingConfirm booking_id={bookingConfirm} onConfirm={this.openBookingPreview}/>
        </DialogContent>
      </Dialog>
    )
  }


  render() {
    const {userInfo, reservationType, reservationStatus} = this.state;
    const {classes} = this.props;
    const alfredMode = reservationType==0
    const reservations = this.filterReservations()

    return (
      <Fragment>
        <Layout>
          <Grid container className={classes.bigContainer}>
            <Grid container stymle={{ width: '100%'}}>
              <Grid xs={12} style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Grid >
                  <h3>Mes réservations</h3>
                </Grid>
                <Tabs
                  orientation="horizontal"
                  variant="scrollable"
                  value={reservationType}
                  onChange={this.handleReservationTypeChanged}
                  aria-label="scrollable force tabs"
                  scrollButtons="on"
                  classes={{indicator: classes.scrollMenuIndicator}}
                >
                  <Tab label={"Mes réservations d'Alfred"} className={classes.scrollMenuTab} />
                  <Tab label={"Mes réservations d'utilisateur"} className={classes.scrollMenuTab} />
                </Tabs>
              </Grid>
              <Grid className={classes.paddresp} item xs={12} style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                <Box>
                <Tabs
                  orientation="horizontal"
                  variant="scrollable"
                  value={reservationStatus}
                  onChange={this.handleReservationStatusChanged}
                  aria-label="scrollable force tabs"
                  scrollButtons="on"
                  classes={{indicator: classes.scrollMenuIndicator}}
                >
                  <Tab label={"Toutes mes réservations"} className={classes.scrollMenuTab} />
                  <Tab label={"Mes réservations à venir"} className={classes.scrollMenuTab} />
                  <Tab label={"Mes réservations terminées"} className={classes.scrollMenuTab} />
                </Tabs>

                <Grid container>
                  <Typography style={{fontSize: '0.8rem', marginBottom: '4%'}} >
                    { `Vous avez ${reservations.length} réservations` }
                  </Typography>
                </Grid>
                {/************************************************************ début en tant que user web **************************************************/}
                  <React.Fragment>
                    {reservations.length ? (
                      reservations.map(booking => {
                        return (
                          <React.Fragment>
                            {/* Web */}
                            <Grid container className={classes.webrow} >
                              <Grid item xs={2} md={1} className={classes.avatarContainer}>
                                <UserAvatar user={alfredMode ? booking.user : booking.alfred}/>
                              </Grid>
                              <Grid item xs={5} md={6} className={classes.descriptionContainer}>
                                <Grid>
                                  <Typography
                                    style={{
                                      marginTop: '2%',
                                      fontSize: '0.8rem',
                                    }}
                                  >
                                    {booking.status} - { alfredMode ? booking.user.firstname : booking.alfred.firstname}
                                  </Typography>
                                </Grid>
                                <Grid>
                                  <Typography style={{color: '#9B9B9B', fontSize: '0.8rem'}}>
                                    {booking.date_prestation} -{' '}
                                    {moment(booking.time_prestation).format(
                                      'HH:mm',
                                    )}
                                  </Typography>
                                </Grid>
                                <Grid>
                                  <Typography style={{color: '#9B9B9B', fontSize: '0.8rem'}}>
                                    {booking.service}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item xs={2} className={classes.priceContainer}>
                                <Grid>
                                  <Typography style={{color: '#4FBDD7', fontWeight: '600'}}>
                                    {(alfredMode ? booking.alfred_amount : booking.amount).toFixed(2)}€
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Grid item>
                                <Grid>
                                  <Button color={'primary'} variant={'outlined'} onClick={()=>this.openBookingPreview(booking._id)}>Détail</Button>
                                </Grid>
                              </Grid>
                              <hr className={classes.hrSeparator}/>
                            </Grid>

                            {/************************************************************ fin en tant que user web **************************************************/}

                            {/************************************************************ début en tant que user mobile **************************************************/}
                            {/* Mobile */}
                            <Grid
                              container
                              className={classes.mobilerow1}

                            >
                              <Grid
                                item
                                xs={12}
                                style={{
                                  textAlign: 'center',
                                  marginTop: '15px',
                                  display: 'flex',
                                  justifyContent: 'center',

                                }}
                              >
                                <UserAvatar user={alfredMode ? booking.user : booking.alfred}/>
                              </Grid>
                              <Grid
                                item
                                xs={12}
                                style={{
                                  textAlign: 'center',
                                  fontSize: '0.8rem',
                                }}
                              >
                                <Typography
                                  style={{
                                    marginTop: '2%',
                                    fontSize: '0.8rem',
                                  }}
                                >
                                  {booking.status} - {alfredMode ? booking.user.firstname : booking.alfred.firstname}
                                </Typography>
                                <Typography
                                  style={{
                                    color: '#9B9B9B',
                                    fontSize: '0.8rem',
                                  }}
                                >
                                  {booking.date_prestation} -{' '}
                                  {moment(booking.time_prestation).format(
                                    'HH:mm',
                                  )}
                                </Typography>
                                <Typography
                                  style={{
                                    color: '#9B9B9B',
                                    fontSize: '0.8rem',
                                  }}
                                >
                                  {booking.service}
                                </Typography>
                              </Grid>
                              <Grid item xs={12} style={{}}>
                                <Typography
                                  style={{
                                    color: '#4FBDD7',
                                    fontWeight: '600',
                                    paddingTop: '5%',
                                    textAlign: 'center',
                                  }}
                                >
                                  {(alfredMode ? booking.alfred_amount :booking.amount).toFixed(2)}€
                                </Typography>
                              </Grid>
                              <Grid item xs={12} style={{}}>
                                  <Typography
                                    className={classes.mobilevoir}
                                    style={{
                                      height: '45px',
                                      backgroundColor: '#2FBCD3',
                                      color: 'white',
                                      textAlign: 'center',
                                      cursor: 'pointer',
                                      lineHeight: '3',
                                      marginTop: '5%',
                                    }}
                                    onClick={()=>this.openBookingPreview(booking._id)}
                                  >

                                    <a
                                      style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                      }}
                                    >
                                      Détail
                                    </a>
                                  </Typography>
                              </Grid>
                            </Grid>
                          </React.Fragment>
                        );
                      })
                    ) : (
                      <p>
                        { `Vous n'avez aucune réservation en tant qu'${alfredMode ? 'Alfred' : 'utilisateur'}` }
                      </p>
                    )}
                    {/************************************************************ fin en tant que user mobile **************************************************/}

                  </React.Fragment>

                </Box>
              </Grid>
            </Grid>

            {/*/////////////////////////////////////////////////////////////////////////////////////////*/}
          </Grid>
        </Layout>
        {this.state.isAlfred ? (
          <NavbarMobile userId={this.state.user}/>
        ) : null}
        { this.bookingPreviewModal()}
        { this.bookingCancelModal()}
        { this.bookingConfirmModal()}
      </Fragment>
    );
  }
}

export default withStyles(styles)(AllReservations);
