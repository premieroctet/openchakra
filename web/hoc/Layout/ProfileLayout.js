import React from 'react'
import Layout from '../../hoc/Layout/Layout'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import Grid from "@material-ui/core/Grid";
import ScrollMenu from '../../components/ScrollMenu/ScrollMenu';
import cookie from 'react-cookies';
import axios from 'axios'
const {isEditableUser}=require('../../utils/functions')
import moment from 'moment'

class ProfileLayout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          user: null,
        }
        this.logged_items= [
          { label: 'À propos', url: '/about' },
          { label: 'Mes services', url: '/services' },
          { label: 'Mes photos', url: '/pictures' },
          { label: 'Mes avis', url: '/reviews' },
          { label: 'Mon calendrier', url: '/calendar' },
          { label: 'Mes statistiques', url: '/statistics'}
        ]
        this.nonlogged_items= [
          { label: 'À propos', url: '/about' },
          { label: 'Services', url: '/services' },
          { label: 'Photos', url: '/pictures' },
          { label: 'Avis', url: '/reviews' },
        ]

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
    const {items, user}=this.state;
    const {children, index}=this.props;

    if (!user) {
      return null
    }

    const menuItems = isEditableUser(this.props.user) ? this.logged_items : this.nonlogged_items
    return (
      <Layout user={user}>
      <Grid style={{display:'flex', justifyContent:'center'}}>
        <Grid style={{display: 'flex', justifyContent:'center', flexDirection: 'column', alignItems:'center', width: '100%'}}>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
            <ProfileHeader key={user} user={user}/>
          </Grid>
	              <Grid>
              <ScrollMenu categories={menuItems} mode={'profile'} indexCat={index} extraParams={{user: this.props.user}}/>
            </Grid>

          <Grid style={{backgroundColor: 'rgba(249,249,249, 1)', width: '100%'}}>
              <Grid style={{margin:'0 15%', display:'flex', justifyContent:'center', backgroundColor: 'white', borderRadius: 27, border: '1px solid rgba(210, 210, 210, 0.5)', padding: '5% 10%', marginTop : '5vh', marginBottom: '5vh'}}>
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
