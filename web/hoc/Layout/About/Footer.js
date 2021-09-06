import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Link from '../../../components/Link/Link'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../../static/css/components/Layout/About/Footer/Footer'
import Typography from '@material-ui/core/Typography'
import '../../../static/assets/css/custom.css'

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
              <Typography>&Agrave; propos de nous</Typography>
            </Link>
          </Grid>
          <Grid item className={classes.rightMainContainerFooter}>
            <Grid item className={classes.marginLink}>
              <Link href={'/cgu'}>
                <Typography>Informations légales</Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation()(withStyles(styles)(Footer))
