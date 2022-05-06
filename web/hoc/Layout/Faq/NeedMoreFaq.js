import {Link} from '@material-ui/core'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {makeStyles} from '@material-ui/core/styles'


const useStyles = makeStyles(theme => ({
  link: {
    fontWeight: 'bold',
    borderBottom: '1px solid black',
    '&:hover': {
      color: theme.palette.primary.main,
      borderBottom: '1px solid #84A5E0',
    },
  },
}))

function NeedMoreFaq(props) {
  const classes = useStyles()
  const {t} = props

  return (
    <Grid style={{
      display: ' flex', flexDirection: 'column', justifyContent: 'center',
    }}>
      <Grid style={{margin: '0 auto'}}>
        <h3 style={{fontWeight: 'bold'}} className={'customaddservicewantmore'}>
          {ReactHtmlParser(t('FAQ_NEED_MORE.link'))}
        </h3>
        <p>{ReactHtmlParser(t('FAQ_NEED_MORE.you_can'))}
          <Link href={'/contact'}>
            <span className={classes.link}>
              {ReactHtmlParser(t('FAQ_NEED_MORE.contact_us'))}
            </span>
          </Link>
        </p>
      </Grid>
    </Grid>
  )
}

export default withTranslation('custom')(NeedMoreFaq)
