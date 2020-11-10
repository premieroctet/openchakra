import React from 'react'
import Layout from '../../hoc/Layout/Layout'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import Grid from "@material-ui/core/Grid";
import cookie from 'react-cookies';
import axios from 'axios'
const {getLoggedUserId}=require('../../utils/functions')

class ProfileLayout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
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
  };

  render() {
    const {user}=this.state;
    const {children}=this.props;

    if (!user) {
      return null
    }

    return (
      <Layout user={user}>
      <Grid style={{display:'flex', justifyContent:'center'}}>
        <Grid style={{display: 'flex', justifyContent:'center', flexDirection: 'column', alignItems:'center', width: '100%'}}>
          <Grid>
            <ProfileHeader key={user} user={user}/>
          </Grid>
          <Grid style={{backgroundColor: 'rgba(249,249,249, 1)', width: '100%'}}>
            <Grid style={{margin:'0 15%', display:'flex', justifyContent:'center', marginTop : '5vh', marginBottom: '5vh'}}>
              {children}
            </Grid>
          </Grid>
        </Grid>
        </Grid>
      </Layout>
    )
  }
}

export default ProfileLayout
