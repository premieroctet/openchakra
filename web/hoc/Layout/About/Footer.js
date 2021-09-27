import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Link from '../../../components/Link/Link'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../../static/css/components/Layout/About/Footer/Footer'
import Typography from '@material-ui/core/Typography'
import '../../../static/assets/css/custom.css'
import {FOOTER} from '../../../utils/i18n'

class Footer extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const {classes}= this.props
    return (
      <Grid container className={classes.mainContainerFooter}>
        <Grid className={classes.mainContainerWidth}>
          <Grid item>
            <Link href={'/footer/apropos'}>
              <Typography>{ReactHtmlParser(this.props.t('FOOTER.about_us'))}</Typography>
            </Link>
          </Grid>
          <Grid item className={classes.rightMainContainerFooter}>
            <Grid item className={classes.marginLink}>
              <Link href={'/cgu'}>
                <Typography>{ReactHtmlParser(this.props.t('FOOTER.cgu'))}</Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Footer))
