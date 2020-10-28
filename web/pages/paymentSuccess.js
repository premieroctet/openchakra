import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import io from 'socket.io-client';
import cookie from 'react-cookies';
import LayoutPayment from "../hoc/Layout/LayoutPayment";
import styles from ''

class paymentSuccess extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      success: false,
    };

  }

  componentDidMount() {

    localStorage.setItem('path', Router.pathname);
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data;
        this.setState({user: user});
      })
      .catch(err => {
        if (err.response.status === 401 || err.response.status === 403) {
          cookie.remove('token', {path: '/'});
          Router.push({pathname: '/'});
        }
      });
    axios.get('/myAlfred/api/payment/transactions')
      .then(result => {
        let transaction = result.data;
        if (transaction.Status === 'FAILED') {
          Router.push('/paymentFailed');
        } else {
          const booking_id = localStorage.getItem('booking_id');
          this.socket = io();
          this.socket.on('connect', socket => {
            this.socket.emit('booking', booking_id);
            axios.put('/myAlfred/api/booking/modifyBooking/' + booking_id, {status: 'Confirmée'})
              .then(res => {
                setTimeout(() => this.socket.emit('changeStatus', res.data), 100);
                localStorage.removeItem('booking_id');
              })
              .catch();
          });
        }
      });


  }


  render() {
    const {classes} = this.props;


    return (
      <React.Fragment>
        <LayoutPayment>

        </LayoutPayment>
      </React.Fragment>
    );
  };
}


export default withStyles(styles)(paymentSuccess);
