import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../static/css/pages/homePage/index'
import LayoutFaq from '../../hoc/Layout/LayoutFaq'
import Typography from '@material-ui/core/Typography'

class OurTeam extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props
    return (
      <LayoutFaq>
        <Grid container spacing={4} style={{margin: 0, width: '100%'}}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
            <Grid>
              <h2>Notre équipe</h2>
            </Grid>
            <Grid>
              <Typography>Coming soon !</Typography>
            </Grid>
          </Grid>
        </Grid>
      </LayoutFaq>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(OurTeam))
