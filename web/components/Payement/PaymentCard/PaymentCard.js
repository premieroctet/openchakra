import React from "react";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";

class PaymentCard extends React.Component{
  constructor(props) {
    super(props);
  }
  render() {
    const{cards, userName, editable} = this.props;

    return(
      <Grid container>
        {cards.length ?
          cards.map((e, index) => {
            let experiationDate = e.ExpirationDate.slice(0,2) + "/20" + e.ExpirationDate.slice(2);
            let cb = e.CardProvider === 'MASTERCARD' ? e.Product === 'MCC'  ? e.CardProvider : 'MSI' : e.CardProvider === 'AMEX' ? 'AMEX' :  e.CardProvider === 'CB' ? e.CardProvider : 'visa' ;
            return(
              <Grid container key={index} style={{display: 'flex', alignItems: 'center', margin:20}}>
                {!editable ?
                  <Grid item xl={4}>
                    <FormControlLabel value={e.Id} control={<Radio/>} label={e.Alias.replace(/X/g, '*')} style={{margin: 0}}/>
                  </Grid> : null
                }
                <Grid item xl={4} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <Grid item xl={6} style={{display: 'flex', justifyContent: 'center'}}>
                    <img src={`../../static/assets/icon/payementIcones/${cb}.png`} height={20} alt={e.CardProvider} title={e.CardProvider}/>
                  </Grid>
                  <Grid item xl={6} style={{display: 'flex', flexDirection:'column'}}>
                    <Grid>
                      <Grid>
                        <Typography>{userName}</Typography>
                      </Grid>
                    </Grid>
                    <Grid>
                      <Typography style={{color:'rgba(39,37,37,35%)'}}>{e.Alias.replace(/X/g, '*')}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xl={4} style={{display:'flex', justifyContent: 'center'}}>
                  <Typography>{experiationDate}</Typography>
                </Grid>
                {
                  editable ?
                    <Grid item xl={4} style={{display: 'flex', justifyContent: 'center'}}>
                      <IconButton aria-label="delete" onClick={()=>this.props.deleteCard(e.Id)}>
                        <DeleteForeverIcon/>
                      </IconButton>
                    </Grid> : null
                }
              </Grid>
            )}) :
          <p>Aucun mode de paiement enregistré</p>
        }
      </Grid>
    );
  }
}

export default PaymentCard;
