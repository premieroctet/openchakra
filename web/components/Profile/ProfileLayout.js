import React from 'react'
import Layout from '../../hoc/Layout/Layout'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import Grid from "@material-ui/core/Grid";
import cookie from 'react-cookies';
import axios from 'axios'

class ProfileLayout extends React.Component {

  constructor(props) {
    super(props)
    this.state= {
      user: null
    }
  }

  static getInitialProps ({ query: { user } }) {
    return { user : user }
  }

  componentDidMount = () => {
    axios.defaults.headers.common['Authorization'] = cookie.load('token');
    axios.get(`/myAlfred/api/users/users/${this.props.user}`)
      .then( res => {
        this.setState( { user: res.data})
      })
      .catch (err => console.error(err))
  }

  render() {
    const {user}=this.state

    if (!user) {
      return null
    }

    return (
      <Layout user={user}>
      <div style={{margin:'0 25%', display:'flex', justifyContent:'center'}}>
          <Grid container style={{justifyContent:'center'}}>
            <Grid item xs={12}>
              <ProfileHeader key={user} user={user}/>
            </Grid>
            {this.props.children}
          </Grid>
        </div>
      </Layout>
    )
  }

}

module.exports=ProfileLayout
