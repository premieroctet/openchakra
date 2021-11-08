import NavBar from './NavBar/NavBar'
import {getLoggedUserId} from '../../utils/context'
import DashboardHeader from '../../components/AlfredDashboard/DashboardHeader'
import {withTranslation} from 'react-i18next'
const {setAxiosAuthentication}=require('../../utils/authentication')
import React from 'react'
import styles from '../../static/css/pages/layout/layoutStyle'
import {withStyles} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Divider from '@material-ui/core/Divider'

class Layout extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {children, classes} = this.props

    return (
      <Grid>
        <NavBar excludeSearch={true}/>
        <DashboardHeader title={this.props.title}/>
        <Grid className={classes.filterMenuDivierContainer}>
          <Divider className={classes.filterMenuDividerStyle}/>
        </Grid>
        {children}
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Layout))
