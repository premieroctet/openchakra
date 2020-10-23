import React from 'react'
import Layout from '../../hoc/Layout/Layout'
import ProfileHeader from '../../components/Profile/ProfileHeader'

function ProfileLayout({children})  {
  return (
    <Layout user={null}>
      <div style={{width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft : '10%', marginRight : '10%'}}>
        <ProfileHeader />
        {children}
      </div>
    </Layout>
  )
}

module.exports=ProfileLayout
