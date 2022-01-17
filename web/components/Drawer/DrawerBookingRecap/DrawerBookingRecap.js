import CustomButton from '../../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import BookingDetail from '../../BookingDetail/BookingDetail'
import Accordion from '@material-ui/core/Accordion'
import styles from '../../../static/css/components/DrawerBookingRecap/DrawerBookingRecap'
import withStyles from '@material-ui/core/styles/withStyles'
import moment from 'moment'
import Divider from '@material-ui/core/Divider'
import {DRAWER_BOOKING_RECAP} from '../../../utils/i18n'

moment.locale('fr')

const {booking_datetime_str} = require('../../../utils/dateutils')

class DrawerBookingRecap extends React.Component {
  constructor(props) {
    super(props)
  }
  handlePay = () => {
    this.props.handlePay()
  };

  render() {

    const{pricedPrestations, countPrestations, grandTotal, customer_fee, travel_tax,
      classes, pick_tax, cesu_total, mode, prestations, bookingObj,
      alfred, id_card, activeStep, pending, alfred_pro} = this.props

    return(
      <Grid>
        <Grid>
          <Grid>
            <h3>{ReactHtmlParser(this.props.t('DRAWER_BOOKING_RECAP.title'))}</h3>
          </Grid>
          <Grid>
            <Grid>
              <Typography>{bookingObj.service}
              {!bookingObj.is_service && `par ${alfred.firstname}}`}
              </Typography>
            </Grid>
            <Grid>
              <Typography><strong>{booking_datetime_str(bookingObj)}</strong></Typography>
            </Grid>
          </Grid>
        </Grid>
        {
          mode ?
            <Grid style={{marginTop: '3vh'}}>
              <Grid>
                <Divider style={{height: 2}} />
              </Grid>
            </Grid> : null
        }

        <Grid style={{marginTop: '3vh'}}>
          {
            mode === 'short' ? null :
              <Grid>
                <Accordion classes={{root: classes.userServicePreviewAccordionNoShadow}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{padding: 0}}
                  >
                    <Typography>{bookingObj.service}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{display: 'flex', flexDirection: 'column', paddingRight: 0, paddingLeft: 0}}>
                    <Grid style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      marginBottom: 20,
                    }}>
                      {prestations.map((prestation, index) => (
                        <Grid container style={{
                          display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          marginBottom: '5%',
                          justifyContent: 'space-between',
                        }} key={index}>
                          <Grid item xs={6}>
                            <Grid>
                              <Typography>{prestation.name}</Typography>
                            </Grid>
                          </Grid>
                          <Grid item xs={6} className={classes.drawerBookingRecapPrice}>
                            <Grid>
                              <Typography><strong>{prestation.price ? prestation.price.toFixed(2) : '?'}€</strong></Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                      ))}
                      {travel_tax?
                        <Grid style={{display: 'flex',
                          alignItems: 'center',
                          width: '100%',
                          marginBottom: '5%',
                          justifyContent: 'space-between'}}>
                          <Grid>
                            <Grid>
                              <Typography>{ReactHtmlParser(this.props.t('DRAWER_BOOKING_RECAP.moving_cost'))}</Typography>
                            </Grid>
                          </Grid>
                          <Grid>
                            <Grid>
                              <Typography>{travel_tax.toFixed(2)}€</Typography>
                            </Grid>
                          </Grid>
                        </Grid> : null}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
          }
          <Grid style={{marginTop: '3vh'}}>
            <BookingDetail
              prestations={pricedPrestations}
              count={countPrestations}
              total={grandTotal}
              customer_fee={customer_fee}
              travel_tax={travel_tax}
              pick_tax={pick_tax}
              cesu_total={cesu_total}
              mode={mode}
              alfred_pro={alfred_pro}
            />
          </Grid>
        </Grid>

        <Grid style={{display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '3vh'}}>
          <Grid style={{width: '100%'}}>
            <CustomButton
              classes={{root: `customdrawerbookingrecapbutton ${classes.userServicePButtonResa}`}}
              variant="contained"
              color="primary"
              aria-label="add"
              onClick={() => (activeStep === 0 ? this.props.handleStep() : this.props.handlePayDirect())}
              disabled={activeStep === 1 ? id_card === '' || pending : false}
            >
              <Typography style={{fontWeight: 'bold'}} >{mode === 'short' ? ReactHtmlParser(this.props.t('DRAWER_BOOKING_RECAP.button_pay')) : ReactHtmlParser(this.props.t('COMMON.btn_validate'))}</Typography>
            </CustomButton>
          </Grid>
        </Grid>
        {
          mode === 'short' ? null :
            <Grid style={{display: 'flex', justifyContent: 'center', marginTop: '2vh'}}>
              <Grid>
                <Typography style={{color: 'rgba(39,37,37,35%)'}}>{ReactHtmlParser(this.props.t('DRAWER_BOOKING_RECAP.method_payment'))}</Typography>
              </Grid>
            </Grid>
        }
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(DrawerBookingRecap))
