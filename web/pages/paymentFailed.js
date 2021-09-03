import {withTranslation} from 'react-i18next'
const {clearAuthenticationToken, setAxiosAuthentication}=require('../utils/authentication')
import React, {Fragment} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import LayoutPayment from "../hoc/Layout/LayoutPayment";
import Typography from "@material-ui/core/Typography";
import styles from '../static/css/pages/paymentSuccess/paymentSuccess'
import {withStyles} from '@material-ui/core/styles';

class PaymentFailed extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      booking: null,
    }
  }

  static getInitialProps({query: {booking_id}}) {
    return {booking_id: booking_id}
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({user: user})
      })
      .catch(err => {
        console.error(err)
      })
    axios.get(`/myAlfred/api/booking/${this.props.booking_id}`)
      .then(res => {
        this.setState({booking: res.data})
      })
      .catch(err => {
        console.error(err)
      })
  }


  render() {
    const {classes} = this.props
    const {booking}=this.state

    if (!booking) {
      return null
    }
    const avocotes_mode = Boolean(booking.company_customer)

    const booking_link = avocotes_mode ? '/avocotes' : '/reservations/reservations'
    return (
      <React.Fragment>
        <LayoutPayment>
          <Grid style={{display: 'flex', backgroundColor: 'rgba(249,249,249, 1)', width: '100%', justifyContent: 'center', padding: '10%', minHeight: '80vh'}}>
            <Grid className={classes.containerPaymentSuccess}>
              <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Grid style={{display: 'flex', flexDirection: 'column'}}>
                  <Grid>
                    <h2>Oups !</h2>
                  </Grid>
                  <Grid>
                    <Typography>Une erreur est survenue lors du paiement.</Typography>
                  </Grid>
                </Grid>
                <Grid style={{marginTop: '5vh'}}>
                  <Grid>
                    <Button variant={'contained'} color={'primary'} style={{color: 'white'}} onClick={() => Router.push(booking_link)}>
                      Retour aux réservations
                    </Button>
                    { !avocotes_mode &&
                      <Button variant={'contained'} color={'primary'} style={{color: 'white'}} onClick={() => Router.push('/')}>
                        Retour à l'accueil
                      </Button>
                    }
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </LayoutPayment>
      </React.Fragment>
    )
  }
}


export default withTranslation()(withStyles(styles)(PaymentFailed))
