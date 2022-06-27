import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import InfoIcon from '@material-ui/icons/Info'
import Link from 'next/link'
import styles from './BookingDetailStyle'
const {EMPLOYEE}=require('../../utils/consts')

class BookingDetail extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      classes, prestations, count, travel_tax, pick_tax, total, provider_fee,
      customer_fee, cesu_total, mode, alfred_pro, cpf_amount} = this.props

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
          {customer_fee && customer_fee !== 0 && !mode || provider_fee ?
            <Grid className={`customdisplayservicecost ${classes.flexContent}`}>
              <Grid className={classes.labelContent}>
                <p>{ReactHtmlParser(this.props.t('BOOKING_DETAIL.service_cost'))}</p>
              </Grid>
              {
                this.props.t('BOOKING_DETAIL.service_cost_link') ?
                  <Grid>
                    <a target={'_blank'} href={ReactHtmlParser(this.props.t('BOOKING_DETAIL.service_cost_link'))}>
                      <IconButton aria-label="InfoIcon">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </a>
                  </Grid> : null
              }
              <Grid className={classes.priceContent}>
                {!!customer_fee && <p>{customer_fee.toFixed(2)}€</p>}
                {!!provider_fee && <p>-{provider_fee.toFixed(2)}€</p>}
              </Grid>
            </Grid> : null
          }
          { /* End commission */}
          { /* Start total */}
          {
            cpf_amount ?
              <Grid className={`custombookingtotal ${classes.flexContent}`} style={{fontWeight: 'bold'}}>
                <Grid>
                  <p>{ReactHtmlParser(this.props.t('BOOKING_DETAIL.cpf_amount'))}</p>
                </Grid>
                <Grid>
                  <p>{-cpf_amount.toFixed(2)}€</p>
                </Grid>
              </Grid> : null
          }
          {
            total ?
              <Grid className={`custombookingtotal ${classes.flexContent}`} style={{fontWeight: 'bold'}}>
                <Grid>
                  <p>{ReactHtmlParser(this.props.t('BOOKING_DETAIL.total'))}</p>
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
          { /* End CESU */}
        </Grid>

      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(BookingDetail))
