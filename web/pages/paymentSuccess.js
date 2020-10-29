import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Typography from "@material-ui/core/Typography";
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import io from 'socket.io-client';
import cookie from 'react-cookies';
import LayoutPayment from "../hoc/Layout/LayoutPayment";
import styles from '../static/css/pages/paymentSuccess/paymentSuccess'

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
          <Grid style={{display: 'flex', backgroundColor: 'rgba(249,249,249, 1)', width: '100%', justifyContent: 'center', padding: '10%', minHeight: '80vh'}}>
            <Grid style={{display: 'flex', justifyContent: 'center', width: '50%', backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)', paddingLeft: '10%', paddingTop: '5%', paddingBottom: '5%', paddingRight: '10%', textAlign: 'center'}}>
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
                    <Typography>Si la redirection ne fonctionne pas <a href={'#'}>cliquez ici</a></Typography>
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
