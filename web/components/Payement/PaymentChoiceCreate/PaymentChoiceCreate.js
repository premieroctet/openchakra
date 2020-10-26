import React from 'react';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import DrawerBookingRecap from "../../Drawer/DrawerBookingRecap/DrawerBookingRecap";
import Cards from 'react-credit-cards';
import Button from "@material-ui/core/Button";
import '../../../static/creditcards.css';
import WithTopic from "../../../hoc/Topic/Topic";
import AddressService from "../../AddressService/AddressService";
import PaymentPics from "../../PaymentPics/PaymentPics";

const AddressComponent = WithTopic(AddressService);


class PaymentChoiceCreate extends React.Component{
  constructor(props) {
    super(props);
  }

  callHandlepay = () =>{
    this.props.handlePay()
  };


  render() {
    const{cards, id_card, valueother, cardSelected, pricedPrestations, countPrestations, focus, name} = this.props;



    return(
      <Grid container style={{width: '90%', marginBottom: '5vh'}}>
        <Grid item xl={6}>
          <Grid style={{display: 'flex', flexDirection: 'column', paddingRight: '5%', paddingLeft: '5%'}} >
            {cards.length ?
              <Grid>
                {cards.map((e, index) => (
                  <Grid>
                    {id_card === e.Id ?
                      <Grid key={index} value={e.Id} onClick={() => this.props.handleCardSelected(e)}
                        style={{
                        width: '296px',
                        boxShadow: '0px 0px 6px lightgray',
                        border: 'rgb(79, 189, 215) solid 3px',
                        cursor: 'pointer',
                        borderRadius: '16px',
                        margin: '20px',
                        position: 'relative',
                        height: '189px',
                      }}>
                        <Cards
                          expiry={e.ExpirationDate}
                          focused={focus}
                          name={name}
                          number={e.Alias.replace(/X/g, '*')}
                          callback={this.handleCallback}
                          preview
                          cvc={'XXX'}
                        />
                      </Grid>
                      :
                      <Grid key={index} value={e.Id} onClick={() => this.props.handleCardSelected(e)} style={{
                        width: '296px',
                        boxShadow: '0px 0px 6px lightgray',
                        cursor: 'pointer',
                        borderRadius: '16px',
                        margin: '20px',
                        position: 'relative',
                        height: '186px',
                      }}>
                        <Cards
                          expiry={e.ExpirationDate}
                          focused={focus}
                          name={name}
                          number={e.Alias.replace(/X/g, '*')}
                          callback={this.handleCallback}
                          preview
                          cvc={'XXX'}
                        />
                      </Grid>
                    }
                  </Grid>

                ))}
                {id_card === valueother ?
                  <Grid value={valueother} onClick={() => this.props.handleCardSelected('other')} style={{
                    width: '296px',
                    boxShadow: '0px 0px 6px lightgray',
                    height: '40px',
                    border: 'rgb(85, 155, 215) solid 2px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    margin: '20px',
                    position: 'relative',
                    backgroundColor: '#2FBCD3',
                    color: 'white',
                  }}>
                    <p style={{
                      textAlign: 'center',
                      lineHeight: 2,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      margin: 'auto',
                    }}>Autre</p>
                  </Grid>
                  :
                  <Grid value={valueother} onClick={() => this.props.handleCardSelected('other')} style={{
                    width: '296px',
                    boxShadow: '0px 0px 6px lightgray',
                    height: '40px',
                    cursor: 'pointer',
                    borderRadius: '5px',
                    margin: '20px',
                    position: 'relative',
                    backgroundColor: '#2FBCD3',
                    color: 'white',
                  }}>
                    <p style={{
                      textAlign: 'center',
                      lineHeight: 2,
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      margin: 'auto',
                    }}>Autre</p>
                  </Grid>
                }
              </Grid>
              :
              <p>Aucun mode de paiement enregistré</p>
            }
            <Grid style={{width: '296px', height: '40px', margin: '20px', position: 'relative'}}>
              {cardSelected ?
                <Button onClick={() => this.props.payDirect()} variant="contained" style={{
                  color: 'white',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  margin: 'auto',
                  marginBottom: '30px',
                }} color="primary">
                  Payer en 1 clic
                </Button>
                :
                <Button onClick={() => this.props.pay()} variant="contained" style={{
                  color: 'white',
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  margin: 'auto',
                  marginBottom: '30px',
                }} color="primary">
                  Payer
                </Button>
              }
            </Grid>
            <Grid style={{backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)', paddingLeft: '10%', paddingTop: '5%', paddingBottom: '5%'}}>
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

export default PaymentChoiceCreate;
