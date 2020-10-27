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
    this.state={
      valueRadio: ''
    }
  }

  handleChange = (event) => {
    this.setState({valueRadio: event.target.value});
  };

  render() {
    const {valueRadio} = this.state;
    const {cards, name} = this.props;

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
        <Grid>
          <FormControl component="fieldset" style={{width: '100%'}}>
            <RadioGroup value={valueRadio} onChange={this.handleChange}>
              {
                cards.map((e, index) => {
                  let experiationDate = e.ExpirationDate.slice(0,2) + "/20" + e.ExpirationDate.slice(2);
                  let cb = e.CardProvider === 'MASTERCARD' ? e.Product === 'MCC'  ? e.CardProvider : 'MSI' : e.CardProvider === 'AMEX' ? 'AMEX' :  e.CardProvider === 'CB' ? e.CardProvider : 'visa' ;
                  return(
                    <Grid key={index} style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                      <Grid>
                        <FormControlLabel value={e.Id} control={<Radio/>} label={e.Alias.replace(/X/g, '*')} />
                      </Grid>
                      <Grid>
                        <img src={`../../static/assets/icon/payementIcones/${cb}.png`} height={20} alt={e.CardProvider} title={e.CardProvider}/>
                      </Grid>
                      <Grid>
                        <Typography>{name}</Typography>
                      </Grid>
                      <Grid>
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
