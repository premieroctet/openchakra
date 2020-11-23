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
import Hidden from "@material-ui/core/Hidden";
import LayoutMessages from "../../hoc/Layout/LayoutMessages";
import LayoutMobileMessages from "../../hoc/Layout/LayoutMobileMessages";
import LayoutReservations from "../../hoc/Layout/LayoutReservations";
import Divider from "@material-ui/core/Divider";
import LayoutMobileReservations from "../../hoc/Layout/LayoutMobileReservations";


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
  };

  handleReservationTypeChanged = (event, newValue) => {
    let childState = this.child.current.state;

    this.setState({reservationType: childState.reservationType, reservationStatus: 0})
  };

  handleReservationStatusChanged = (event, newValue) => {
    this.setState({reservationStatus: newValue})
  };

  isFinished = reservation => {
    return ['Refusée', 'Annulée', 'Terminée', 'Expirée'].includes(reservation.status)
  };

  isComing = reservation => {
    return ["Demande d'infos", 'En attente de confirmation', 'Confirmée', 'Pré-approuvée'].includes(reservation.status)
  };

  filterReservations = () => {
    const {reservationType, reservationStatus, alfredReservations, userReservations}=this.state;
    // Alfred/customer reservatioons
    var reservations = reservationType===0 ?  alfredReservations : userReservations;
    // All/ coming/finished reservations
    if (reservationStatus===1) { reservations = reservations.filter(this.isComing)}
    if (reservationStatus===2) { reservations = reservations.filter(this.isFinished)}
    return reservations
  };

  openBookingPreview = bookingId => {
    this.loadBookings();
    this.setState({ bookingPreview: bookingId, bookingCancel: null, bookingConfirm: null})
  };

  openBookingCancel = bookingId => {
    this.setState({ bookingPreview:null, bookingCancel: bookingId, bookingConfirm: null})
  };

  openBookingConfirm = bookingId => {
    this.setState({ bookingPreview:null, bookingCancel: null, bookingConfirm: bookingId})
  };

  bookingPreviewModal = (classes) => {
    const {bookingPreview}=this.state;

    return (
      <Dialog
        style={{width: '100%'}}
        open={Boolean(bookingPreview)}
        onClose={() => this.setState({bookingPreview: null})}
        classes={{paper: classes.dialogPreviewPaper}}

      >
        <DialogContent>
          <BookingPreview booking_id={bookingPreview} onCancel={this.openBookingCancel} onConfirm={this.openBookingConfirm}/>
        </DialogContent>
      </Dialog>
    )
  };

  bookingCancelModal = () => {
    const {bookingCancel}=this.state;

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
  };

  bookingConfirmModal = () => {
    const {bookingConfirm}=this.state;

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
  };

  content = (classes) =>{
    const reservations = this.filterReservations();
    const alfredMode = this.state.reservationType===0;

    return(
      <Grid style={{width: '100%'}}>
        <Grid style={{display: 'flex', justifyContent :'center'}}>
          <Tabs
            orientation="horizontal"
            variant="scrollable"
            value={this.state.reservationStatus}
            onChange={this.handleReservationStatusChanged}
            aria-label="scrollable force tabs"
            scrollButtons="on"
            classes={{indicator: classes.scrollMenuIndicator}}
          >
            <Tab label={"Toutes mes réservations"} className={classes.scrollMenuTab} />
            <Tab label={"Mes réservations à venir"} className={classes.scrollMenuTab} />
            <Tab label={"Mes réservations terminées"} className={classes.scrollMenuTab} />
          </Tabs>
        </Grid>
        <Grid style={{width: '100%'}}>
          <Divider/>
        </Grid>
        <Grid container style={{marginTop: '10vh', display: 'flex', flexDirection: 'column'}}>
          {reservations.length ? (
            reservations.map(booking => {
              return (
                <Grid className={classes.reservationsMainContainer}>
                  <Grid container style={{display: 'flex', alignItems: 'center'}}>
                    <Grid item xl={3} lg={3} md={3} sm={6} xs={4} className={classes.avatarContainer}>
                      <UserAvatar
                        user={alfredMode ? booking.user : booking.alfred}
                        className={classes.cardPreviewLarge}/>
                    </Grid>
                    <Grid item  xl={3} lg={3} md={3} sm={6} xs={8} className={classes.descriptionContainer}>
                      <Grid className={classes.bookingNameContainer}>
                        <Typography><strong> {booking.status} - {alfredMode ? booking.user.firstname : booking.alfred.firstname}</strong></Typography>
                      </Grid>
                      <Grid>
                        <Typography>
                          {booking.date_prestation} -{' '}
                          {moment(booking.time_prestation).format(
                            'HH:mm',
                          )}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography style={{color: 'rgba(39,37,37,35%)'}}>{booking.service}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item   xl={3} lg={3} md={3} sm={6} xs={4} className={classes.priceContainer}>
                      <Grid>
                        <Typography>
                          {(alfredMode ? booking.alfred_amount : booking.amount).toFixed(2)}€
                        </Typography>
                      </Grid>
                    </Grid>
                    <Grid item  xl={3} lg={3} md={3} sm={6} xs={8} className={classes.detailButtonContainer}>
                      <Grid>
                        <Button
                          color={'primary'}
                          variant={'outlined'}
                          onClick={() => this.openBookingPreview(booking._id)}>
                          Détail
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid style={{marginTop: '5vh', marginBottom: '5vh'}}>
                    <Divider/>
                  </Grid>
                </Grid>
              )
            })) :
            <Typography>{ `Vous n'avez aucune réservation en tant qu'${alfredMode ? 'Alfred' : 'utilisateur'}` }</Typography>
          }
        </Grid>
      </Grid>
    )
  };


  render() {
    const {classes} = this.props;

    return (
      <React.Fragment>
        <Hidden only={['xs']}>
          <LayoutReservations ref={this.child} handleReservationTypeChanged={this.handleReservationTypeChanged}>
            {this.content(classes)}
          </LayoutReservations>
        </Hidden>
        <Hidden only={['lg', 'xl',  'sm', 'md']}>
          <LayoutMobileReservations ref={this.child} currentIndex={2} handleReservationTypeChanged={this.handleReservationTypeChanged}>
            {this.content(classes)}
          </LayoutMobileReservations>
        </Hidden>
        { this.bookingPreviewModal(classes)}
        { this.bookingCancelModal()}
        { this.bookingConfirmModal()}
      </React.Fragment>

    );
  }
}

export default withStyles(styles)(AllReservations);
