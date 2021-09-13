import {withTranslation} from 'react-i18next'
import React from 'react'
import Layout from '../../hoc/Layout/Layout'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import {LEGAL_NOTICE} from '../../utils/i18n'

const styles = theme => ({
  hideed: {
    padding: '0 300px',
    marginTop: 80,
    marginBottom: '20px',
    textAlign: 'justify',
    [theme.breakpoints.down('sm')]: {
      padding: '0 20px',
    },
  },
  a: {
    textDecoration: 'none',
    color: '#84A5E0',
  },

})

class Privacypolicy extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props

    return (
      <Layout>
        <Grid container className={classes.hideed}>
          <Grid item xs={12} style={{textAlign: 'center', marginBottom: 30}}>
            <h2>{LEGAL_NOTICE.mention_legal}</h2>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{LEGAL_NOTICE.editor}</h3>
            <p>{LEGAL_NOTICE.social}</p>
            <p>{LEGAL_NOTICE.rcs}</p>
            <p>{LEGAL_NOTICE.capital}</p>
            <p>{LEGAL_NOTICE.tva}</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{LEGAL_NOTICE.address}</h3>
            <p>{LEGAL_NOTICE.address_begin}</p>
            <p>{LEGAL_NOTICE.postal}</p>
            <p>{LEGAL_NOTICE.country}</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{LEGAL_NOTICE.ceo}</h3>
            <p>{LEGAL_NOTICE.ceo_sv}</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{LEGAL_NOTICE.host}</h3>
            <p>{LEGAL_NOTICE.aws}</p>
            <p>{LEGAL_NOTICE.aws_address}</p>
            <p>{LEGAL_NOTICE.aws_postal}</p>
            <p>{LEGAL_NOTICE.aws_contact}</p>
            <p>{LEGAL_NOTICE.aws_phone}</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{LEGAL_NOTICE.email}</h3>
            <p>{LEGAL_NOTICE.email_hello}</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{LEGAL_NOTICE.phone}</h3>
            <p>{LEGAL_NOTICE.phone_number}</p>
          </Grid>
        </Grid>
        {/* <Footer/>*/}

      </Layout>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Privacypolicy))
