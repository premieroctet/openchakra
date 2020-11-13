import React from 'react'
import Layout from '../../hoc/Layout/Layout'
import ProfileHeader from '../../components/Profile/ProfileHeader'
import Grid from "@material-ui/core/Grid";
import ScrollMenu from '../../components/ScrollMenu/ScrollMenu';
import cookie from 'react-cookies';
import axios from 'axios'
const {getLoggedUserId}=require('../../utils/functions');
import moment from 'moment'
import Box from "../../components/Box/Box";

class ProfileLayout extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null,
      items: [
      {
        label: 'À propos',
        url: '/about'
      },
      {
        label: 'Mes services',
        url: '/services'
      },
      {
        label: 'Mes photos',
        url: '/pictures'
      },
      {
        label: 'Mes avis',
        url: '/reviews'
      },
      {
        label: 'Mon calendrier',
        url: '/calendar'
      },
      {
        label: 'Mes statistiques',
        url: '/statistics'
      }
      ]
    }
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

    return (
      <Layout user={user}>
        <Grid style={{display:'flex', justifyContent:'center'}}>
          <Grid style={{display: 'flex', justifyContent:'center', flexDirection: 'column', alignItems:'center', width: '100%'}}>
            <Grid style={{backgroundColor: 'rgba(249,249,249, 1)', width: '100%'}}>
              <Grid style={{margin:'3vh 15%', display:'flex', justifyContent:'center'}}>
                <Grid style={{
                  borderRadius: 17,
                  border: '1px solid rgba(210, 210, 210, 0.5)',
                  width: '100%',
                  backgroundColor: 'white',
                  height: '60vh',
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Grid style={{display: 'flex', justifyContent: 'center', height: '50%',
                    backgroundImage: 'url(../../assets/img/homePage/illuHeader.png)',
                    width: '100%',
                    backgroundPosition: 'center',
                    backgroundSize: 'contain',
                    borderRadius: 17}}/>
                  <Grid style={{position: 'absolute', top: '45%', left: '50%',  transform: 'translate(-49%,50%)',}}>
                    <ProfileHeader key={user} user={user}/>
                  </Grid>
                  <Grid style={{display: 'flex', justifyContent: 'center', height : '50%', alignItems: 'end'}}>
                    <ScrollMenu categories={items} mode={'profile'} indexCat={index} extraParams={{user: this.props.user}}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid style={{margin:'3vh 15%', display:'flex', justifyContent:'center'}}>
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
