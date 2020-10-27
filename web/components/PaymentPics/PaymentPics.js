import React from 'react';
import Grid from "@material-ui/core/Grid";

class PaymentPics extends React.Component{
  constructor(props) {
    super(props);
    this.state={
      pics:[
        {
          urlName: 'cb'
        },
        {
          urlName: 'visa',
          name: 'visa'
        },
        {
          urlName: 'MASTERCARD',
          name: 'mastercard'
        },
        {
          urlName: 'AMEX',
          name: 'AmericanExpress'
        },
        {
          urlName: 'msi',
          name: 'maestro'
        }
      ]
    }
  }

  render() {
    const {pics} = this.state;
    return(
      <Grid style={{display: 'flex', flexDirection: 'row'}}>
        {
          pics.map((res,index) => (
            <Grid key={index} style={{marginRight: 15}}>
              <img src={`../../static/assets/icon/payementIcones/${res.urlName}.png`} height={20} alt={res.urlName} title={res.urlName}/>
            </Grid>
          ))
        }
      </Grid>
    );
  }

}

export default PaymentPics;
