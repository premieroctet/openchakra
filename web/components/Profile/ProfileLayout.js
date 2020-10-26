import React from 'react'
import Layout from '../../hoc/Layout/Layout'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import Grid from "@material-ui/core/Grid";

function ProfileLayout({children})  {
  return (
    <Layout user={null}>
    <div style={{margin:'0 30%', display:'flex', justifyContent:'center'}}>
        <Grid container style={{justifyContent:'center'}}>
          <Grid item xs={12}>
            <ProfileHeader />
          </Grid>
          {children}
        </Grid>
      </div>
    </Layout>
  )
}

module.exports=ProfileLayout
