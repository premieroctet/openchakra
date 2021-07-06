import React from 'react'
import Grid from '@material-ui/core/Grid'
import Banner from '../components/AvoCotes/Banner/Banner'
import MainSection from '../components/AvoCotes/MainSection/MainSection'

function setupSecurityPack() {

  return(
    <Grid>
      <Grid>
        <Banner/>
      </Grid>
      <Grid>
        <MainSection/>
      </Grid>

    </Grid>
  )
}

export default setupSecurityPack
