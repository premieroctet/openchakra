import ReactHtmlParser from 'react-html-parser'
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
            <h2>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.mention_legal'))}</h2>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.editor'))}</h3>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.social'))}</p>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.rcs'))}</p>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.capital'))}</p>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.tva'))}</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.address'))}</h3>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.address_begin'))}</p>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.postal'))}</p>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.country'))}</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.ceo'))}</h3>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.ceo_sv'))}</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.host'))}</h3>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.aws'))}</p>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.aws_address'))}</p>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.aws_postal'))}</p>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.aws_contact'))}</p>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.aws_phone'))}</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.email'))}</h3>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.email_hello'))}</p>
          </Grid>
          <Grid item xs={12}>
            <h3 style={{color: '#84A5E0'}}>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.phone'))}</h3>
            <p>{ReactHtmlParser(this.props.t('LEGAL_NOTICE.phone_number'))}</p>
          </Grid>
        </Grid>
        {/* <Footer/>*/}

      </Layout>
    )
  }
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(Privacypolicy))
