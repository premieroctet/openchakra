import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {PAYMENT_PICS} from '../../utils/i18n'

class PaymentPics extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      pics: [
        {
          urlName: PAYMENT_PICS.pics_cb_name,
        },
        {
          urlName: PAYMENT_PICS.pics_visa_name,
          name: PAYMENT_PICS.pics_visa_name,
        },
        {
          urlName: PAYMENT_PICS.pics_mastercard_name,
          name: PAYMENT_PICS.pics_mastercard_name,
        },
        {
          urlName: PAYMENT_PICS.pics_american_url,
          name: PAYMENT_PICS.pics_american_name,
        },
        {
          urlName: PAYMENT_PICS.pics_msi_url,
          name: PAYMENT_PICS.pics_maestro_url,
        },
      ],
    }
  }

  render() {
    const {pics} = this.state
    return(
      <Grid style={{display: 'flex', flexDirection: 'row'}}>
        {
          pics.map((res, index) => (
            <Grid key={index} style={{marginRight: 15}}>
              <img src={`/static/assets/icon/paymentIcones/${res.urlName}.png`} height={20} alt={res.urlName} title={res.urlName}/>
            </Grid>
          ))
        }
      </Grid>
    )
  }

}

export default withTranslation('custom', {withRef: true})(PaymentPics)
