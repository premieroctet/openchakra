import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import styles from './BookingDetailStyle'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import {BOOKING_DETAIL} from '../../utils/i18n'
const {EMPLOYEE}=require('../../utils/consts')

class BookingDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      classes, prestations, count, travel_tax, pick_tax, total, alfred_fee,
      client_fee, cesu_total, mode, role, company_amount} = this.props

    return (
      <Grid>
        <Grid>
          {
            !mode ?
              Object.keys(prestations).map((k, index) => {
                return count[k] === 0 ? null : (
                  <Grid className={classes.flexContent} key={index}>
                    <Grid className={classes.labelContent}>
                      <p>{k}</p>
                    </Grid>
                    <Grid className={classes.priceContent}>
                      <p>{prestations[k].toFixed(2)}€</p>
                    </Grid>
                  </Grid>
                )
              })
              : null
          }
          { /* Start travel tax */}
          {travel_tax && !mode ?
            <Grid className={classes.flexContent}>
              <Grid className={classes.labelContent}>
                <p>{ReactHtmlParser(this.props.t('BOOKING_DETAIL.move_cost'))}</p>
              </Grid>
              <Grid>
                <p>{travel_tax.toFixed(2)}€</p>
              </Grid>
            </Grid> : null
          }

          { /* End pick tax */}
          { /* Start pick tax */}
          {pick_tax && !mode ?
            <Grid className={classes.flexContent}>
              <Grid className={classes.labelContent}>
                <p>{ReactHtmlParser(this.props.t('BOOKING_DETAIL.delivery_cost'))}</p>
              </Grid>
              <Grid className={classes.priceContent}>
                <p>{pick_tax.toFixed(2)}€</p>
              </Grid>
            </Grid> : null}
          { /* End pick tax */}
          { /* Start commission */}
          {client_fee && client_fee !== 0 && !mode ?
            <Grid className={classes.flexContent}>
              <Grid className={classes.labelContent}>
                <p>{ReactHtmlParser(this.props.t('BOOKING_DETAIL.service_cost'))}</p>
              </Grid>
              <Grid className={classes.priceContent}>
                <p>{client_fee.toFixed(2)}€</p>
              </Grid>
            </Grid> : null
          }
          {alfred_fee && !mode ?
            <Grid className={classes.flexContent}>
              <Grid className={classes.labelContent}>
                <p>{ReactHtmlParser(this.props.t('BOOKING_DETAIL.service_cost'))}</p>
              </Grid>
              <Grid className={classes.priceContent}>
                <p>-{alfred_fee.toFixed(2)}€</p>
              </Grid>
            </Grid> : null
          }
          { /* End commission */}
          { /* Start total */}
          {
            total ?
              <Grid className={classes.flexContent} style={{fontWeight: 'bold'}}>
                <Grid>
                  <p>{client_fee !== 0 ? ReactHtmlParser(this.props.t('BOOKING_DETAIL.total')) : ReactHtmlParser(this.props.t('BOOKING_DETAIL.will_total'))}</p>
                </Grid>
                <Grid>
                  <p>{total.toFixed(2)}€</p>
                </Grid>
              </Grid> : null
          }

          { /* End total */}
          { /* Start CESU */}
          {client_fee && cesu_total && !mode ?
            <Grid className={classes.flexContent} style={{marginleft: 20, fontWeight: 'bold'}}>
              <Grid>
                <p>{ReactHtmlParser(this.props.t('BOOKING_DETAIL.cesu'))}</p>
              </Grid>
              <Grid>
                <p>{cesu_total.toFixed(2)}€</p>
              </Grid>
            </Grid>
            :
            null
          }
          {role==EMPLOYEE ?
            <Grid className={classes.flexContent} style={{marginleft: 20, fontWeight: 'bold'}}>
              <Grid>
                <p>{ReactHtmlParser(this.props.t('BOOKING_DETAIL.company'))}</p>
              </Grid>
              <Grid>
                <p>{company_amount.toFixed(2)}€</p>
              </Grid>
            </Grid>
            :
            null
          }
          { /* End CESU */}
        </Grid>

      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(BookingDetail))
