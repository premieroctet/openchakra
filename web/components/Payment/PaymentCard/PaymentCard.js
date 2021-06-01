import React from "react";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import Typography from "@material-ui/core/Typography";
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import IconButton from "@material-ui/core/IconButton";
import styles from '../../../static/css/components/PaymentCard/PaymentCard';
import withStyles from "@material-ui/core/styles/withStyles";

class PaymentCard extends React.Component{
  constructor(props) {
    super(props);
  }

  render() {
    const{cards, userName, editable, classes} = this.props;

    return(
      <Grid container>
        {cards ?
          cards.map((e, index) => {
            let expirationDate = e.ExpirationDate.slice(0,2) + "/20" + e.ExpirationDate.slice(2);
            let cb = e.CardProvider === 'MASTERCARD' ? e.Product === 'MCC'  ? e.CardProvider : 'MSI' : e.CardProvider === 'AMEX' ? 'AMEX' :  e.CardProvider === 'CB' ? e.CardProvider : 'visa' ;
            return(
              <Grid container key={index} style={{display: 'flex', alignItems: 'center', marginTop:20, marginBottom: 20}}>
                {!editable ?
                  <Grid item xl={1} xs={2} sm={1}>
                    <Radio value={e.Id}>
                      <img src={`/static/assets/icon/paymentIcones/${cb}.png`} height={20} width={35} alt={e.CardProvider} title={e.CardProvider}/>
                    </Radio>
                  </Grid> : null
                }
                <Grid item xl={7} xs={7} sm={7} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                  <Grid className={classes.containerImg} item xl={6} sm={4}>
                    <img src={`/static/assets/icon/paymentIcones/${cb.toLowerCase()}.png`} height={20} width={35} alt={e.CardProvider} title={e.CardProvider}/>
                  </Grid>
                  <Grid item xl={6} sm={4} xs={10} style={{display: 'flex', flexDirection:'column'}}>
                    <Grid className={classes.containerNameCard}>
                      <Typography>{userName}</Typography>
                    </Grid>
                    <Grid className={classes.containerNumCard}>
                      <Typography style={{color:'rgba(39,37,37,35%)'}}>{e.Alias.replace(/X/g, '*').slice(8)}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xl={4} xs={3} sm={4} style={{display:'flex', justifyContent: 'center'}}>
                  <Typography>{expirationDate}</Typography>
                </Grid>
                {
                  editable ?
                    <Grid item xl={1} xs={2} sm={1} style={{display: 'flex', justifyContent: 'center'}}>
                      <IconButton aria-label="delete" onClick={()=>this.props.deleteCard(e.Id)}>
                        <DeleteForeverIcon/>
                      </IconButton>
                    </Grid> : null
                }
              </Grid>
            )
            })
          :
            <Typography>Aucun mode de paiement enregistré</Typography>
        }
        {
          cards && cards.length==0 ?
          <Typography>Aucun mode de paiement enregistré</Typography> : null
        }
      </Grid>
    );
  }
}

export default withStyles (styles) (PaymentCard);
