import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styles from '../static/css/pages/errorPage/errorPage'
import withStyles from '@material-ui/core/styles/withStyles'
import {ERROR_404} from '../utils/i18n'

function Custom404({classes, t}) {

  return (
    <Grid style={{display: 'flex', backgroundColor: 'rgba(249,249,249, 1)', width: '100%', justifyContent: 'center', padding: '10%', minHeight: '100vh'}}>
      <Grid className={classes.containerError}>
        <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
            <Grid>
              <h1>{ReactHtmlParser(t('ERROR_404.title'))}</h1>
            </Grid>
            <Grid>
              <Typography>{ReactHtmlParser(t('ERROR_404.subtitle'))}</Typography>
            </Grid>
          </Grid>
          <Grid>
            <a href={'/'}><Typography>{ReactHtmlParser(t('ERROR_404.link'))}</Typography></a>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(Custom404))
