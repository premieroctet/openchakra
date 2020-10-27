import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DrawerBookingRecap from "../../Drawer/DrawerBookingRecap/DrawerBookingRecap";
import '../../../static/creditcards.css';
import WithTopic from "../../../hoc/Topic/Topic";
import AddressService from "../../AddressService/AddressService";
import PaymentMode from "../PaymentMode/PaymentMode";

const AddressComponent = WithTopic(AddressService);
const PaymentModeComponent = WithTopic(PaymentMode);


class PaymentChoice extends React.Component{
  constructor(props) {
    super(props);

  }

  callHandlepay = () =>{
    this.props.handlePay()
  };




  render() {
    const{cards, id_card, valueother, cardSelected, pricedPrestations, countPrestations, focus, name} = this.props;

    return(
      <Grid container style={{width: '90%'}}>
        <Grid item xl={6}>
          <Grid style={{display: 'flex', flexDirection: 'column', paddingRight: '5%', paddingLeft: '5%'}} >
            <Grid style={{backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)', paddingLeft: '10%', paddingRight: '10%', paddingTop: '5%', paddingBottom: '5%', position: 'relative'}}>
              <PaymentModeComponent
                titleTopic={'Mode de paiment'}
                titleSummary={false}
                underline={false}
                {...this.props}
                />
              <Grid style={{position: 'absolute', bottom: '5%', right:  '10%'}}>
                <a href={'#'}>Payer avec une autre carte</a>
              </Grid>
            </Grid>
            <Grid style={{backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)',paddingLeft: '10%', paddingTop: '5%', paddingBottom: '5%', marginTop: '2vh'}}>
              <AddressComponent
                titleTopic={'Adresse du service'}
                titleSummary={'Votre adresse'}
                underline={false}
                {...this.props}
              />

            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={6}>
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
                handlePay={this.callHandlepay}
                mode={'short'}
              />
            </Grid>
          </Grid>
          <Grid>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
              <Typography>En validant votre paiement, vous acceptez nos <strong>CGV</strong> ainsi que notre <strong>politique de protection des données personnelles</strong>.</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default PaymentChoice;
