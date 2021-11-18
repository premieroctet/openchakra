import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import styles from './BookingDetailStyle'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import {BOOKING_DETAIL} from '../../utils/i18n'
const {EMPLOYEE}=require('../../utils/consts')
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Link from 'next/link'

class BookingDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      classes, prestations, count, travel_tax, pick_tax, total, alfred_fee,
      customer_fee, cesu_total, mode, role, company_amount, alfred_pro} = this.props

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
          {customer_fee && customer_fee !== 0 && !mode || alfred_fee ?
            <Grid className={`customdisplayservicecost ${classes.flexContent}`}>
              <Grid className={classes.labelContent}>
                <p>{ReactHtmlParser(this.props.t('BOOKING_DETAIL.service_cost'))}</p>
              </Grid>
              {
                ReactHtmlParser(this.props.t('BOOKING_DETAIL.service_cost_link')) !== '' ?
                  <Grid>
                    <Link href={ReactHtmlParser(this.props.t('BOOKING_DETAIL.service_cost_link'))} >
                      <a target={'_blank'}>
                        <IconButton aria-label="InfoIcon">
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </a>
                    </Link>
                  </Grid> : null
              }
              <Grid className={classes.priceContent}>
                <p>-{alfred_fee ? alfred_fee.toFixed(2) : customer_fee.toFixed(2)}€</p>
              </Grid>
            </Grid> : null
          }
          { /* End commission */}
          { /* Start total */}
          {
            total ?
              <Grid className={`custombookingtotal ${classes.flexContent}`} style={{fontWeight: 'bold'}}>
                <Grid>
                  <p>{customer_fee !== 0 ? ReactHtmlParser(this.props.t('BOOKING_DETAIL.total')) : ReactHtmlParser(this.props.t('BOOKING_DETAIL.will_total'))}</p>
                </Grid>
                <Grid>
                  <p>{total.toFixed(2)}€</p>
                </Grid>
              </Grid> : null
          }

          { /* End total */}
          { /* Start CESU */}
          {customer_fee && cesu_total && !mode ?
            <Grid className={classes.flexContent} style={{marginleft: 20, fontWeight: 'bold'}}>
              <Grid>
                <p>{ReactHtmlParser(this.props.t(alfred_pro ? 'BOOKING_DETAIL.cis': 'BOOKING_DETAIL.cesu'))}</p>
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
