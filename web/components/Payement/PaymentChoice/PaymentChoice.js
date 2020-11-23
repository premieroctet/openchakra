import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DrawerBookingRecap from "../../Drawer/DrawerBookingRecap/DrawerBookingRecap";
import Topic from "../../../hoc/Topic/Topic";
import AddressService from "../../AddressService/AddressService";
import PaymentMode from "../PaymentMode/PaymentMode";
import styles from '../../../static/css/components/PaymentChoice/PaymentChoice';
import withStyles from "@material-ui/core/styles/withStyles";

class PaymentChoice extends React.Component{
  constructor(props) {
    super(props);
  }

  callPay = () =>{
    this.props.pay()
  };

  callHandlepayDirect = () =>{
    this.props.payDirect()
  };

  handleCardSelected = (e) =>{
    this.props.handleCardSelected(e)
  };

  render() {
    const{pricedPrestations, countPrestations, bookingObj, user, currentUser, classes} = this.props;

    if (currentUser && bookingObj) {
      var checkAdd = currentUser.billing_address.address === bookingObj.address.address && currentUser.billing_address.zip_code === bookingObj.address.zip_code && currentUser.billing_address.city === bookingObj.address.city;
    }


    return(
      <Grid container style={{width: '90%',  marginBottom: '10vh'}}>
        <Grid item xl={7} xs={12} sm={12}>
          <Grid className={classes.paymenChoiceMainContainer}>
            <Grid style={{backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)', paddingLeft: '10%', paddingRight: '10%', paddingTop: '5%', paddingBottom: '5%', position: 'relative'}}>
              <Topic
                titleTopic={'Mode de paiment'}
                titleSummary={false}
                underline={false}
              >
                <PaymentMode
                  handleCardSelected={this.handleCardSelected}
                  {...this.props}
                />
              </Topic>
              <Grid style={{position: 'absolute', bottom: '5%', right:  '10%'}} onClick={this.callPay}>
                <a href={'#'}>Payer avec une autre carte</a>
              </Grid>
            </Grid>
            <Grid style={{backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)',paddingLeft: '10%', paddingTop: '5%', paddingBottom: '5%', marginTop: '2vh'}}>
              <Topic
                titleTopic={'Adresse du service'}
                titleSummary={`Le service sera effectué ${bookingObj.address ?  checkAdd ? 'à votre domicile' : 'Chez' + user.firstname : 'En visio'}`}
                underline={false}
              >
                <AddressService
                  {...this.props}
                />
              </Topic>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={5} xs={12} sm={12} className={classes.paymentChoiceSecondContainer}>
          <Grid  style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(210, 210, 210, 0.5)',
            borderRadius: 30,
            justifyContent: 'center',
            backgroundColor: 'white'
          }}>
            <Grid style={{paddingLeft: '10%', paddingTop: '5%', paddingBottom: '5%', paddingRight: '10%'}}>
              <DrawerBookingRecap
                {...this.props}
                pricedPrestations={pricedPrestations}
                countPrestations={countPrestations}
                handlePayDirect={this.callHandlepayDirect}
                mode={'short'}
              />
            </Grid>
          </Grid>
          <Grid style={{ paddingRight: '5%', paddingLeft: '5%'}}>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
              <Typography>En validant votre paiement, vous acceptez nos <strong>CGV</strong> ainsi que notre <strong>politique de protection des données personnelles</strong>.</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles) (PaymentChoice);
