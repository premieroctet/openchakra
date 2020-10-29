import React from 'react';
import Grid from "@material-ui/core/Grid";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import PaymentPics from "../../PaymentPics/PaymentPics";
import HttpsIcon from '@material-ui/icons/Https';

class PaymentMode extends React.Component{
  constructor(props) {
    super(props);
  }

  handleCardSelected = (e) => {
    this.props.handleCardSelected(e.target.value)
  };

  render() {
    const {cards, currentUser, id_card} = this.props;

    return(
      <Grid>
        <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
          <Grid style={{display : 'flex', flexDirection: 'row', alignItems: 'center'}}>
            <Grid>
              <HttpsIcon/>
            </Grid>
            <Grid style={{marginLeft: '2vh'}}>
              <Typography>Paiement sécurisé</Typography>
            </Grid>
          </Grid>
          <Grid>
            <PaymentPics/>
          </Grid>
        </Grid>
        <Grid style={{marginTop: '3vh', marginBottom: '3vh'}}>
          <FormControl component="fieldset" style={{width: '100%'}}>
            <RadioGroup value={id_card ? id_card : ''} onChange={this.handleCardSelected} style={{backgroundColor: 'rgba(249,249,249, 1)', borderRadius: 14,  padding: '5%'}}>
              {
                cards.map((e, index) => {
                  let experiationDate = e.ExpirationDate.slice(0,2) + "/20" + e.ExpirationDate.slice(2);
                  let cb = e.CardProvider === 'MASTERCARD' ? e.Product === 'MCC'  ? e.CardProvider : 'MSI' : e.CardProvider === 'AMEX' ? 'AMEX' :  e.CardProvider === 'CB' ? e.CardProvider : 'visa' ;
                  return(
                    <Grid container key={index} style={{display: 'flex', alignItems: 'center'}}>
                      <Grid item xl={4}>
                        <FormControlLabel value={e.Id} control={<Radio/>} label={e.Alias.replace(/X/g, '*')} style={{margin: 0}}/>
                      </Grid>
                      <Grid item xl={2} style={{display:'flex', justifyContent: 'center'}}>
                        <img src={`../../static/assets/icon/payementIcones/${cb}.png`} height={20} alt={e.CardProvider} title={e.CardProvider}/>
                      </Grid>
                      <Grid item xl={4} style={{display:'flex', justifyContent: 'center'}}>
                        <Typography>{currentUser.firstname + " " + currentUser.name}</Typography>
                      </Grid>
                      <Grid item xl={2} style={{display:'flex', justifyContent: 'center'}}>
                        <Typography>{experiationDate}</Typography>
                      </Grid>
                    </Grid>
                  )})
              }
            </RadioGroup>
          </FormControl>
        </Grid>
      </Grid>
    );
  }
}

export default PaymentMode
