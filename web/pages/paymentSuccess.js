const {clearAuthenticationToken}=require('../utils/authentication')
const {setAxiosAuthentication}=require('../utils/authentication')
import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import io from 'socket.io-client';
const {emptyPromise}=require('../utils/promise')

import LayoutPayment from "../hoc/Layout/LayoutPayment";
import styles from '../static/css/pages/paymentSuccess/paymentSuccess'

const {BOOK_STATUS}=require('../utils/consts')

class paymentSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      booking: null,
      success: false,
    };
  }

  static getInitialProps({query: {booking_id, transactionId}}) {
    return {booking_id: booking_id, transaction_id: transactionId};
  }

  componentDidMount() {

    localStorage.setItem('path', Router.pathname);
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({user: user});
      })
      .catch(err => {
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'});
        }
      });
    axios.get(`/myAlfred/api/booking/${this.props.booking_id}`)
      .then (res => {
        const booking = res.data
        axios.get(`/myAlfred/api/payment/payin/${booking.mangopay_payin_id}`)
          .then(result => {
            let transaction = result.data;
            if (transaction.Status === 'FAILED') {
              Router.push(`/paymentFailed?booking_id=${this.props.booking_id}`);
            } else {
              this.setState({success: true})
              const booking_id = this.props.booking_id
              this.socket = io();
              this.socket.on('connect', socket => {
                this.socket.emit('booking', booking_id);
                const newStatus = booking.status==BOOK_STATUS.PREAPPROVED ? BOOK_STATUS.CONFIRMED : BOOK_STATUS.TO_CONFIRM
                axios.put(`/myAlfred/api/booking/modifyBooking/${booking_id}`, {status: newStatus})
                  .then(res => {
                    setTimeout(() => this.socket.emit('changeStatus', res.data), 100);
                    localStorage.removeItem('booking_id');
                    setTimeout(() => Router.push('/reservations/reservations'), 4000)
                  })
                  .catch();
              });
            }
          });
      })
      .catch (err => {
        console.error(err)
      })

  }


  render() {
    const {classes} = this.props;
    const {success} = this.state

    if (!success) {
      return null
    }
    return (
      <React.Fragment>
        <LayoutPayment>
          <Grid style={{display: 'flex', backgroundColor: 'rgba(249,249,249, 1)', width: '100%', justifyContent: 'center', padding: '10%', minHeight: '80vh'}}>
            <Grid className={classes.containerPaymentSuccess}>
              <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Grid style={{display: 'flex', flexDirection: 'column'}}>
                  <Grid>
                    <h2>Votre service a été réservé avec succès !</h2>
                  </Grid>
                  <Grid>
                    <Typography>Merci de nous faire confiance.</Typography>
                  </Grid>
                </Grid>
                <Grid>
                  <Grid>
                    <Typography>Vous allez être redirigé vers votre page Mes Réservations.</Typography>
                  </Grid>
                  <Grid>
                    <Typography>Si la redirection ne fonctionne pas <a href={'/reservations/reservations'}>cliquez ici</a></Typography>
                  </Grid>
                </Grid>
              </Grid>

            </Grid>
          </Grid>
        </LayoutPayment>
      </React.Fragment>
    );
  };
}


export default withStyles(styles)(paymentSuccess);
