import React from 'react'
import Grid from '@material-ui/core/Grid'
import Banner from '../components/AvoCotes/Banner/Banner'
import MainSection from '../components/AvoCotes/MainSection/MainSection'
import BannerContact from '../components/AvoCotes/BannerContact/BannerContact'
import OurCompany from '../components/AvoCotes/OurCompany/OurCompany'
import Footer from '../components/AvoCotes/Footer/Footer'

function setupSecurityPack() {

  return(
    <Grid>
      <Grid>
        <Banner/>
      </Grid>
      <Grid style={{marginTop: '5vh'}}>
        <MainSection/>
      </Grid>
      <Grid style={{marginTop: '5vh'}}>
        <BannerContact/>
      </Grid>
      <Grid style={{marginTop: '5vh', marginBottom: '10vh'}}>
        <OurCompany/>
      </Grid>
      <Grid style={{marginTop: '5vh'}}>
        <Footer/>
      </Grid>
    </Grid>
  )
}

export default setupSecurityPack
