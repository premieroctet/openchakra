import {Grid} from '@material-ui/core'

import React from 'react'

class DashboardHeader extends React.Component {

  render() {
    return(
      <Grid container style={{display: 'flex'}}>
        <a href="/dashboard/home"><h2>Dashboard</h2></a>
        <h1 style={{align: 'center'}}>{this.props.title}</h1>
      </Grid>
    )
  }
}

module.exports = DashboardHeader
