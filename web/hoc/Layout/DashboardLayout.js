import NavBar from './NavBar/NavBar'
import {withTranslation} from 'react-i18next'
import React from 'react'
import styles from '../../static/css/pages/layout/layoutStyle'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

class DashboardLayout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {children, classes, home, title} = this.props
    return (
      <Grid>
        <NavBar excludeSearch={true}/>
        {!home &&
          <Grid container style={{display: 'flex', alignItems: 'center'}}>
            <Grid item xs={4}>
              <a href="/dashboard"><h2>Dashboard</h2></a>
            </Grid>
            <Grid item xs={4} style={{display: 'flex', justifyContent: 'center'}}>
              <h1>{title}</h1>
            </Grid>
          </Grid>
        }
        <Grid className={classes.filterMenuDivierContainer}>
          <Divider className={classes.filterMenuDividerStyle}/>
        </Grid>
        {children}
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(DashboardLayout))
