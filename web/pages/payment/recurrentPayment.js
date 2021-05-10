import React from 'react'
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LayoutPayment from "../../hoc/Layout/LayoutPayment";
import Typography from "@material-ui/core/Typography";
import styles from '../../static/css/pages/confirmPayment/confirmPayment';
const {getMangopayMessage}=require('../../utils/i18n')
const {setAxiosAuthentication} = require('../../utils/authentication')
class RecurrentPayment extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      success: null,
      error: null,
    }
  }

  static getInitialProps({query: {cardId, transactionId, company_id}}) {
    return {cardId: cardId, transactionId: transactionId, company_id: company_id};
  }

  componentDidMount = () => {
    setAxiosAuthentication()
    axios.get(`/myAlfred/api/payment/payin/${this.props.transactionId}`)
      .then(result => {
        let transaction = result.data;
        if (transaction.Status === 'FAILED') {
          this.setState({error: `${getMangopayMessage(transaction.ResultCode)}`})
        }
        else {
          this.setState({success: 'Votre carte est validée pour les paiements, votre compte va être recrédité'})
          const data={
            cardId: this.props.cardId,
            company_id: this.props.company_id,
          }
          axios.post(`/myAlfred/api/payment/recurrentConfirm`, data)
            .then ( res => {
              const refundData={
                payInId: this.props.transactionId
              }
              axios.post(`/myAlfred/api/payment/refund`, refundData)
                .then( () => {
                  this.setState({success: 'Votre carte est validée pour les paiements, votre compte a été recrédité'})
                })
                .catch(err => {
                  this.setState({
                    success:null,
                    error: 'Erreur durant le remboursement'})
                })
            })
            .catch( err => {
              console.error(err)
            })
        }
      })
      .catch (err => {
        console.error(err)
      })
  }
  render() {
    const {classes} = this.props;
    const {error, success}=this.state
    return (
      <React.Fragment>
        <LayoutPayment>
          <Grid style={{display: 'flex', backgroundColor: 'rgba(249,249,249, 1)', width: '100%', justifyContent: 'center', padding: '10%', minHeight: '80vh'}}>
            <Grid className={classes.containerPaymentSuccess}>
              <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                <Grid style={{display: 'flex', flexDirection: 'column'}}>
                  <Grid>
                    <h2>Enregistrement de la carte pour les paiements récurrents </h2>
                  </Grid>
                  <Grid>
                    <Typography>{ success ? success : null}</Typography>
                    <Typography>{ error ? error : null}</Typography>
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

export default withStyles(styles)(RecurrentPayment);
