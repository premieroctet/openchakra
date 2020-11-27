import React, {Fragment} from 'react';
import Link from 'next/link';
import Layout from '../hoc/Layout/Layout';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
import {withStyles} from '@material-ui/core/styles';
import Footer from '../hoc/Layout/Footer/Footer';
import cookie from 'react-cookies';
import LayoutPayment from "../hoc/Layout/LayoutPayment";
import Typography from "@material-ui/core/Typography";

class PaymentFailed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},


    };

  }

  componentDidMount() {

    localStorage.setItem('path', Router.pathname);
    let bookingObj = JSON.parse(localStorage.getItem('bookingObj'));
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
                    <h2>Oups !</h2>
                  </Grid>
                  <Grid>
                    <Typography>Une erreur est survenue lors du paiement.</Typography>
                  </Grid>
                </Grid>
                <Grid style={{marginTop: '5vh'}}>
                  <Grid>
                    <Button variant={'contained'} color={'primary'} style={{color: 'white'}} onClick={()=> Router.push('/')}>Retour à
                      l'accueil</Button>
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


export default PaymentFailed;
