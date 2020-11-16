import React from 'react'
import Layout from '../../hoc/Layout/Layout'
import Grid from "@material-ui/core/Grid";
import ScrollMenu from '../../components/ScrollMenu/ScrollMenu';
import cookie from 'react-cookies';
import axios from 'axios'
const {getLoggedUserId}=require('../../utils/functions');
import moment from 'moment'
import Box from "../../components/Box/Box";
import styles from '../../static/css/components/Layout/ProfileLayout/ProfileLayout'
import withStyles from "@material-ui/core/styles/withStyles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../../components/Avatar/UserAvatar";


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
    const {children, index, classes}=this.props;




    if (!user) {
      return null
    }

    const url = user.picture.match(/^https?:\/\//) ? user.picture : '/' + user.picture;

    return (
      <Layout user={user}>
        <Grid className={classes.profilLayoutMainContainer}>
          <Grid className={classes.profilLayoutContainer}>
            <Grid className={classes.profilLayoutBackgroundContainer}>
              <Grid className={classes.profilLayoutMargin}>
                <Grid className={classes.profilLayoutBox}>
                  <Grid className={classes.profilLayoutBannerImg}>
                    <Grid className={classes.profilLayoutAvatar}>
                      <UserAvatar alt={user.firstname} user={user} className={classes.cardPreviewLarge} />
                    </Grid>
                  </Grid>
                  <Grid style={{display: 'flex', justifyContent: 'center', height: '40%', alignItems: 'center'}}>
                    <Grid style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                      <Grid>
                        <h3>{`Je m'appelle ${user ? user.firstname : ''}`}</h3>
                      </Grid>
                      <Grid>
                        <Typography style={{color:'rgba(39,37,37,35%)'}}>et j’ai hâte de vous rencontrer !</Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid className={classes.profilLayoutScrollMenu}>
                    <ScrollMenu categories={items} mode={'profile'} indexCat={index} extraParams={{user: this.props.user}}/>
                  </Grid>
                </Grid>
              </Grid>
              <Grid className={classes.profilLayoutChildren}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

export default withStyles (styles) (ProfileLayout);
