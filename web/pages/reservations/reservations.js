const {setAxiosAuthentication}=require('../../utils/authentication');
import React from 'react';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import axios from 'axios';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import UserAvatar from '../../components/Avatar/UserAvatar';
import styles from '../../static/css/pages/reservations/reservations';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import BookingPreview from '../../components/BookingDetail/BookingPreview'
import BookingCancel from '../../components/BookingDetail/BookingCancel'
import BookingConfirm from '../../components/BookingDetail/BookingConfirm'
import BookingPreApprouve from "../../components/BookingDetail/BookingPreApprouve";
import Hidden from "@material-ui/core/Hidden";
import LayoutReservations from "../../hoc/Layout/LayoutReservations";
import Divider from "@material-ui/core/Divider";
import LayoutMobileReservations from "../../hoc/Layout/LayoutMobileReservations";
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import CloseIcon from '@material-ui/icons/Close';
const {BOOK_STATUS}=require('../../utils/consts');
const {getUserLabel}=require('../../utils/functions');
import Router from 'next/router';

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

moment.locale('fr');

//TODO RASSEMBLER ALLRESERVATIONS + COMINGRESERVATIONS + FINISHEDRESERVATIONS

class AllReservations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      alfredReservations: [],
      userReservations: [],
      isAlfred: false,
      userInfo: {},
      reservationType: 1,
      reservationStatus: 0,
      bookingPreview: null,
      bookingCancel: null,
      bookingConfirm: null,
      bookingPreApprouved: null
    };
  }

  static getInitialProps({query: {id}}) {
    return {
      id: id,
    };
  }

  componentDidMount() {
    setAxiosAuthentication();
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let result = res.data;
        this.setState({
          userInfo: result,
          user: result._id,
          isAlfred: result.is_alfred,
          reservationType: result.is_alfred ? 0 : 1,
        });
        this.loadBookings()
        if (this.props.id) {
          setTimeout(() => this.setState({bookingPreview: this.props.id}), 1000)
        }
      })
      .catch( err => {
        if (err.response && [401, 403].includes(err.response.status)) {
          localStorage.setItem('path', Router.asPath)
          Router.push('/');
        }
      })
  }

  loadUserLabels = bookings => {
    bookings.forEach( booking => {
      getUserLabel(booking.alfred)
        .then( res => {
          this.setState({[booking.alfred._id]: res})
        })
      getUserLabel(booking.user)
        .then( res => {
          this.setState({[booking.user._id]: res})
        })
    })
  }

  loadBookings = () => {
    axios.get('/myAlfred/api/booking/alfredBooking')
      .then(res => {
        // On n'affiche pas les résas en attente de paiement
        const alfredBookings=res.data.filter( r => r.status !== BOOK_STATUS.TO_PAY);
        this.setState({alfredReservations: alfredBookings});
        axios.get('/myAlfred/api/booking/userBooking')
          .then(res => {
            const userBookings=res.data;
            this.setState({userReservations: userBookings});
            this.loadUserLabels(alfredBookings.concat(userBookings))
          });
      });
  };

  onReservationTypeChanged = (event, newValue) => {
    this.setState({reservationType: newValue, reservationStatus: 0})
  };

  handleReservationStatusChanged = (event, newValue) => {
    this.setState({reservationStatus: newValue})
  };

  isFinished = reservation => {
    return [ BOOK_STATUS.REFUSED, BOOK_STATUS.CANCELED, BOOK_STATUS.FINISHED, BOOK_STATUS.EXPIRED].includes(reservation.status)
  };

  isComing = reservation => {
    return [ BOOK_STATUS.INFO, BOOK_STATUS.TO_CONFIRM, BOOK_STATUS.CONFIRMED, BOOK_STATUS.PREAPPROVED].includes(reservation.status)
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
    this.setState({ bookingPreview: bookingId, bookingCancel: null, bookingConfirm: null, bookingPreApprouved: null})
  };

  openBookingCancel = bookingId => {
    this.setState({ bookingPreview:null, bookingCancel: bookingId, bookingConfirm: null, bookingPreApprouved: null})
  };

  openBookingConfirm = bookingId => {
    this.setState({ bookingPreview:null, bookingCancel: null, bookingConfirm: bookingId, bookingPreApprouved: null})
  };

  openBookingPreAprouved = bookingId =>{
    this.loadBookings();
    this.setState({ bookingPreview:null, bookingCancel: null, bookingConfirm: null, bookingPreApprouved: bookingId})
  };

  onClosePreview = () => {
    this.setState({bookingPreview: null}, () => this.loadBookings())
  };

  bookingPreviewModal = (classes) => {
    const {bookingPreview}=this.state;

    return (
      <Dialog
        style={{width: '100%'}}
        open={Boolean(bookingPreview)}
        onClose={this.onClosePreview}
        classes={{paper: classes.dialogPreviewPaper}}

      >
        <DialogTitle id="customized-dialog-title" onClose={this.onClosePreview}/>
        <DialogContent>
          <BookingPreview booking_id={bookingPreview} onCancel={this.openBookingCancel} onConfirm={this.openBookingConfirm} onConfirmPreapproved={this.openBookingPreAprouved}/>
        </DialogContent>
      </Dialog>
    )
  };

  bookingCancelModal = (classes) => {
    const {bookingCancel}=this.state;

    return (
      <Dialog style={{width: '100%'}}
        open={Boolean(bookingCancel)}
        onClose={() => this.setState({bookingCancel: null})}
        classes={{paper: classes.dialogPreviewPaper}}

      >
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({bookingCancel: null})}/>
        <DialogContent>
          <BookingCancel booking_id={bookingCancel} onMaintain={this.openBookingPreview}/>
        </DialogContent>
      </Dialog>
    )
  };

  bookingConfirmModal = (classes) => {
    const {bookingConfirm}=this.state;

    return (
      <Dialog style={{width: '100%'}}
        open={Boolean(bookingConfirm)}
        onClose={() => this.setState({bookingConfirm: null})}
        classes={{paper: classes.dialogPreviewPaper}}
      >
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({bookingConfirm: null})}/>
        <DialogContent>
          <BookingConfirm booking_id={bookingConfirm} onConfirm={this.openBookingPreview}/>
        </DialogContent>
      </Dialog>
    )
  };

  bookingPreApprouved = (classes) =>{
    const {bookingPreApprouved}=this.state;

    return (
      <Dialog
        style={{width: '100%'}}
        open={Boolean(bookingPreApprouved)}
        onClose={() => this.setState({bookingPreApprouved: null})}
        classes={{paper: classes.dialogPreviewPaper}}
      >
        <DialogTitle id="customized-dialog-title" onClose={() => this.setState({bookingPreApprouved: null})}/>
        <DialogContent>
          <BookingPreApprouve booking_id={bookingPreApprouved} onConfirm={() => this.setState({bookingPreApprouved: false})}/>
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
                  <Grid container spacing={2} style={{display: 'flex', alignItems: 'center', margin: 0, width: '100%'}}>
                    <Grid item xl={2} lg={2} md={6} sm={6} xs={4}>
                      <UserAvatar user={alfredMode ? booking.user : booking.alfred}/>
                    </Grid>
                    <Grid item xl={5} lg={5} md={6} sm={6} xs={8} className={classes.descriptionContainer}>
                      <Grid className={classes.bookingNameContainer}>
                        <Typography><strong> {booking.status} - {alfredMode ? this.state[booking.user._id] : this.state[booking.alfred._id]}</strong></Typography>
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
                        <Typography className={classes.serviceName} style={{color: 'rgba(39,37,37,35%)'}}>{booking.service}</Typography>
                      </Grid>
                    </Grid>
                    <Grid item  xl={1} lg={1} md={6} sm={3} xs={4} className={classes.priceContainer}>
                        <Typography className={classes.alfredAmount}><strong>{(alfredMode ? booking.alfred_amount : booking.amount).toFixed(2)}€</strong></Typography>
                    </Grid>
                    <Grid item spacing={1} container xl={4} lg={4} md={6} sm={9} xs={8} className={classes.detailButtonContainer}>
                      <Grid item>
                        <Button
                          color={'primary'}
                          variant={'outlined'}
                          onClick={() => this.openBookingPreview(booking._id)}>
                          Détail
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant={'contained'}
                          color={'primary'}
                          classes={{root: classes.buttonResa}}
                          onClick={() => this.openBookingPreview(booking._id)}>
                          Réserver
                        </Button>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{marginTop: '5vh', marginBottom: '5vh'}}>
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
    const {reservationType, userInfo, bookingPreview, bookingCancel, bookingConfirm, bookingPreApprouved} = this.state;

    return (
      <Grid>
        <Hidden only={['xs']} implementation={'css'} className={classes.hidden}>
          <LayoutReservations reservationType={reservationType} onReservationTypeChanged={this.onReservationTypeChanged} userInfo={userInfo}>
            {this.content(classes)}
          </LayoutReservations>
        </Hidden>
        <Hidden only={['lg', 'xl',  'sm', 'md']} implementation={'css'} className={classes.hidden}>
          <LayoutMobileReservations reservationType={reservationType} currentIndex={2} onReservationTypeChanged={this.onReservationTypeChanged} userInfo={userInfo}>
            {this.content(classes)}
          </LayoutMobileReservations>
        </Hidden>
        { bookingPreview ? this.bookingPreviewModal(classes) : null}
        { bookingCancel ? this.bookingCancelModal(classes) : null}
        { bookingConfirm ? this.bookingConfirmModal(classes) : null}
        { bookingPreApprouved ? this.bookingPreApprouved(classes) : null}
      </Grid>

    );
  }
}

export default withStyles(styles)(AllReservations);
