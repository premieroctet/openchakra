import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios'
import {withStyles} from '@material-ui/core/styles';
import styles from './AboutStyle';
import cookie from 'react-cookies';
import ListAlfredConditions from "../ListAlfredConditions/ListAlfredConditions";
import RoomIcon from '@material-ui/icons/Room';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ChatBubbleOutlineOutlinedIcon from '@material-ui/icons/ChatBubbleOutlineOutlined';
import PersonIcon from '@material-ui/icons/Person';
import UserAvatar from '../Avatar/UserAvatar'
import Box from '../Box/Box'
const {frenchFormat} = require('../../utils/text');
const moment=require('moment');
moment.locale('fr');

class About extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
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

    const {displayTitlePicture} = this.props;
    const {user} = this.state;
    var places= user ?`${user.billing_address.city}, ${user.billing_address.country}` : '';
    if (user) {
      user.service_address.forEach( sa => {
        places+=`;${sa.city}, France`
        }
      )
    }

    const wrapperComponentProps = user ?
      [
        {
          label: 'Lieux',
          summary: places,
          IconName: user.firstname ? <RoomIcon fontSize="large"/> : ''
        },
        {
          label: 'Langues',
          summary: user.languages.join(',') || 'Français',
          IconName:  user.firstname ? <ChatBubbleOutlineOutlinedIcon fontSize="large"/> : ''
        },
        {
          label: 'Membre depuis',
          summary: moment(user.creation_date).format("MMMM YYYY"),
          IconName: user.firstname ? <PersonIcon fontSize="large"/> : ''
        },
        {
          label:  'Vérification',
          summary: user.id_card_status_text,
          IconName:  user.firstname ? <CheckCircleOutlineIcon fontSize="large"/> : ''
        },
      ]
      :
      null;

    return (
      <Grid style={{display: 'flex', flexDirection:'column'}}>
        { displayTitlePicture ?
          <h3>{frenchFormat(`A propos de ${user ? user.firstname : ''}`)}</h3>
          : null
        }
        <Grid style={{display: 'flex', flexDirection:'row'}}>
          { displayTitlePicture ?
            <Grid style={{ marginLeft: '1%', marginRight: '1%'}}>
              <UserAvatar user={user} />
            </Grid>
            : null
          }
          <ListAlfredConditions wrapperComponentProps={wrapperComponentProps} columnsXl={12} columnsSm={6} />
        </Grid>
      </Grid>
    )
  }


}

export default withStyles(styles, {withTheme: true})(About)
