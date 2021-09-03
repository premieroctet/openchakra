import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import {withStyles} from '@material-ui/core/styles'
import styles from '../static/css/pages/footer/contact/contact'
import LayoutFaq from '../hoc/Layout/LayoutFaq'

class Contact extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props

    return (
      <LayoutFaq>
        <Grid container spacing={10} style={{margin: 0, width: '100%'}}>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.contactContainer}>
            <Grid>
              <h3>Service client - Nos heures d'ouverture</h3>
            </Grid>
            <Grid style={{display: 'flex'}}>
              <Grid>
                <Typography>Du Lundi au Vendredi 10H - 18H</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.contactContainer}>
            <Grid>
              <h3>Nous contacter</h3>
            </Grid>
            <Grid style={{display: 'flex'}}>
              <MailOutlineIcon style={{paddingRight: '5px'}}/>
              <a style={{
                color: 'black',
                borderBottom: '1 px solid black',
              }} href={'mailto:hello@my-alfred.io'}>
                <Typography>hello@my-alfred.io</Typography>
              </a>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.contactContainer}>
            <Grid>
              <h3>Nous envoyer un message</h3>
            </Grid>
            <Grid style={{display: 'flex', width: '100%'}}>
              <iframe
                src={'https://share.hsforms.com/1XiISx1soSp-8Bm743F3RPA8njno'}
                title="contact form"
                frameBorder="0"
                scrolling="no"
                style={{width: '100%', height: 550}}
              />
            </Grid>
          </Grid>
        </Grid>
      </LayoutFaq>
    )
  }
}

export default withTranslation()(withStyles(styles)(Contact))
