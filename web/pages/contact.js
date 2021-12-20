import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import {makeStyles} from '@material-ui/core/styles'
import LayoutFaq from '../hoc/Layout/LayoutFaq'

const useStyles = makeStyles(() => ({
  contactContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  link: {
    color: 'black',
    borderBottom: '1 px solid black',
  },
}))


function Contact(props) {
  const {classes} = useStyles()
  const {t} = props

  return (
    <LayoutFaq>
      <Grid container spacing={10} style={{margin: 0, width: '100%'}}>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.contactContainer}>
          <Grid>
            <h3>{ReactHtmlParser(t('CONTACT.tile'))}</h3>
          </Grid>
          <Grid style={{display: 'flex'}}>
            <Grid>
              <Typography>{ReactHtmlParser(t('CONTACT.day_range'))}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={classes.contactContainer}>
          <Grid>
            <h3>{ReactHtmlParser(t('CONTACT.email_title'))}</h3>
          </Grid>
          <Grid style={{display: 'flex'}}>
            <MailOutlineIcon style={{paddingRight: '5px'}}/>
            <a className={`customcontactmail ${classes.link}`} href={'mailto:hello@my-alfred.io'}>
              <Typography>{ReactHtmlParser(t('CONTACT.email'))}</Typography>
            </a>
          </Grid>
        </Grid>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={`customcontactform ${classes.contactContainer}`}>
          <Grid>
            <h3>{ReactHtmlParser(t('CONTACT.message_title'))}</h3>
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

export default withTranslation('custom')(Contact)
