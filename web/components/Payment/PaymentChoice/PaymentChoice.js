import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import DrawerBookingRecap from '../../Drawer/DrawerBookingRecap/DrawerBookingRecap'
import Topic from '../../../hoc/Topic/Topic'
import AddressService from '../../AddressService/AddressService'
import PaymentMode from '../PaymentMode/PaymentMode'
import styles from '../../../static/css/components/PaymentChoice/PaymentChoice'
import withStyles from '@material-ui/core/styles/withStyles'
import {PAYMENT_CHOICE, PAYMENT_MODE} from '../../../utils/i18n'

class PaymentChoice extends React.Component {
  constructor(props) {
    super(props)
  }

  callPay = () => {
    console.log('Pay')
    this.props.pay()
  };

  callHandlepayDirect = () => {
    this.props.payDirect()
  };

  handleCardSelected = e => {
    this.props.handleCardSelected(e)
  };

  render() {
    const{pricedPrestations, countPrestations, bookingObj, classes} = this.props

    return(
      <Grid container style={{width: '90%', marginBottom: '10vh'}}>
        <Grid item xl={7} lg={7} md={7} xs={12} sm={12}>
          <Grid className={classes.paymenChoiceMainContainer}>
            <Grid style={{backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)', paddingLeft: '10%', paddingRight: '10%', paddingTop: '5%', paddingBottom: '5%', position: 'relative'}}>
              <Topic
                titleTopic={ReactHtmlParser(this.props.t('PAYMENT_CHOICE.topic_payment_mode'))}
                titleSummary={false}
                underline={false}
              >
                <PaymentMode
                  handleCardSelected={this.handleCardSelected}
                  {...this.props}
                />
              </Topic>
              <Grid style={{position: 'absolute', bottom: '5%', right: '10%'}} onClick={this.callPay}>
                <a href={'#'}>{ReactHtmlParser(this.props.t('PAYMENT_MODE.link_paid_another_card'))}</a>
              </Grid>
            </Grid>
            <Grid style={{backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)', paddingLeft: '10%', paddingTop: '5%', paddingBottom: '5%', marginTop: '2vh'}}>
              <Topic
                titleTopic={ReactHtmlParser(this.props.t('PAYMENT_MODE.topic_postal_service'))}
                underline={false}
              >
                { bookingObj.address ?
                  <AddressService
                    {...this.props}
                  />
                  :
                  'En visio'
                }
              </Topic>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={5} lg={5} md={5} xs={12} sm={12} className={classes.paymentChoiceSecondContainer}>
          <Grid style={{
            display: 'flex',
            flexDirection: 'column',
            border: '1px solid rgba(210, 210, 210, 0.5)',
            borderRadius: 30,
            justifyContent: 'center',
            backgroundColor: 'white',
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
          <Grid style={{paddingRight: '5%', paddingLeft: '5%'}}>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
              <Typography>{ReactHtmlParser(this.props.t('PAYMENT_CHOICE.info_payment'))}<strong>{ReactHtmlParser(this.props.t('PAYMENT_CHOICE.cgv'))}</strong>{ReactHtmlParser(this.props.t('PAYMENT_CHOICE.next_part'))}<strong>{ReactHtmlParser(this.props.t('PAYMENT_CHOICE.policy'))}</strong></Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(PaymentChoice))
