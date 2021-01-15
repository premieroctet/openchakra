const {clearAuthenticationToken}=require('../utils/authentication')
const {setAxiosAuthentication}=require('../utils/authentication')
import React, {Fragment} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Router from 'next/router';
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
    setAxiosAuthentication()
    axios
      .get('/myAlfred/api/users/current')
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


  }


  render() {
    const {classes} = this.props;


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
