const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react';
import axios from 'axios';
import moment from 'moment';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import {withStyles} from '@material-ui/core/styles';
import io from 'socket.io-client';
import Typography from '@material-ui/core/Typography';

import styles from '../../static/css/components/BookingCancel/BookingCancel';
import Divider from "@material-ui/core/Divider";

const _ = require('lodash');
moment.locale('fr');

class Cancel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bookingObj: null,
      currUser: null,
    };
  }

  componentDidMount() {
    const booking_id = this.props.booking_id;
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current').then(res => {
      this.setState({currUser: res.data});
    });

    axios.get('/myAlfred/api/booking/' + booking_id)
      .then(res => this.setState({bookingObj: res.data}))
      .catch();

    this.socket = io();
    this.socket.on('connect', socket => {
      this.socket.emit('booking', booking_id);
    });
  }

  changeStatus(status) {
    setAxiosAuthentication()
    axios.put('/myAlfred/api/booking/modifyBooking/' + this.props.booking_id, {
      status: status, user: this.state.currUser._id,
    })
      .then(res => {
        this.setState({bookingObj: res.data});
        setTimeout(() => this.socket.emit('changeStatus', res.data), 100);
      })

      .catch(err => console.error(err));
  }

  render() {
    const {classes} = this.props;
    const {currUser, bookingObj} = this.state;

    return (
      <Grid>
        {bookingObj === null || currUser === null ?
          null
          :
          <Grid>
            <Grid container className={classes.bigContainer}>
              <Grid container>
                <Grid item lg={12} xl={12} md={12} xs={12}>
                  <Grid container>
                    <Grid item xs={12}>
                      <h2>Annuler la réservation</h2>
                    </Grid>
                  </Grid>
                  <Grid>
                    <Grid container style={{width: '100%'}}>
                      <Grid item xs={12} style={{padding: '5%'}}>
                        <Typography>
                          Si vous annulez cette réservation, vous ferez l'objet de pénalités :
                          <br/>
                          - Le retrait du statut de super Alfred pendant 1 an
                          <br/>
                          - Un commentaire public montrant que vous avez annulé
                          <br/>
                          - Le paiement des frais d'annulation ou le blocage des périodes de la prestation sur votre
                          calendrier
                          <br/>
                          <br/>
                          Si vous avez accepté la réservation instantanée, vous n'aurez pas ces pénalités si vous avez
                          annulé moins de 3 prestations dans l'année
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid container style={{display:'flex', flexDirection: 'column', marginTop: '3vh', marginBottom: '3vh'}}>
                    <Divider/>
                  </Grid>
                  <Grid style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Grid>
                      <Button
                        color={'primary'}
                        variant={'contained'}
                        style={{
                          textTransform: 'initial',
                          color:'white'
                        }}
                        onClick={()=>this.props.onMaintain(this.props.booking_id)}
                      >
                        Maintenir
                      </Button>
                    </Grid>
                    <Grid>
                      <Button
                        color={'secondary'}
                        variant={'contained'}
                        style={{
                          textTransform: 'initial',
                        }}
                        onClick={() => {
                          this.changeStatus('Annulée');
                          this.props.onMaintain(this.props.booking_id)
                        }}
                      >
                        Annuler
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
      </Grid>
    );
  }
}

export default withStyles(styles)(Cancel);
