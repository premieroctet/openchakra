import React from 'react'
import axios from 'axios'
import Grid from "@material-ui/core/Grid";
import ProfileLayout from '../../hoc/Layout/ProfileLayout'
import DrawerAndSchedule from '../../components/Drawer/DrawerAndSchedule/DrawerAndSchedule'
import {withStyles} from '@material-ui/core/styles';
import styles from '../../static/css/pages/homePage/index';
const I18N=require('../../utils/i18n');
import {getLoggedUserId} from '../../utils/functions'
import Hidden from "@material-ui/core/Hidden";
import LayoutMobile from "../../hoc/Layout/LayoutMobile";
import Topic from "../../hoc/Topic/Topic";
import Box from "../../components/Box/Box";
import LayoutMobileProfile from "../../hoc/Layout/LayoutMobileProfile";


class ProfileCalendar extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      availabilities:[]
    }
  }

  static getInitialProps({query: {user, indexAccount}}) {
    return {user: user, index: indexAccount};
  }

  loadAvailabilities = () => {
    axios.get(`/myAlfred/api/availability/userAvailabilities/${this.props.user}`)
      .then(res => {
        this.setState({availabilities: res.data});
      })
      .catch(err => console.error(err));
  };

  componentDidMount() {
    this.loadAvailabilities()
  }

  content = (classes, user, readOnly) =>{
    return(
      <Grid container>
        <Grid item xs={12} xl={12}>
          <Box>
            <Topic
              titleTopic={'Ajoutez vos disponiblités '}
              titleSummary={'Votre calendrier vous permet d’ajouter vos disponibilités en précisant les tranches horaires. '}
              needBackground={false}
              underline={true}
            >
              <DrawerAndSchedule
                availabilities={this.state.availabilities}
                nbSchedule={3}
                availabilityUpdate={this.loadAvailabilities}
                availabilityCreated={this.loadAvailabilities}
                onAvailabilityChanged={this.loadAvailabilities}
                style={classes}
                selectable={!readOnly}
                ref={this.scheduleDrawer}
                readOnly={readOnly}/>
            </Topic>
          </Box>
        </Grid>
      </Grid>
    )
  };

  render() {
    const {user, classes, index}=this.props;
    const readOnly = this.props.user!==getLoggedUserId();

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Hidden only={['xs']}>
          <ProfileLayout user={user} index={index}>
            {this.content(classes, user, readOnly)}
          </ProfileLayout>
        </Hidden>
        <Hidden  only={['lg', 'xl','sm', 'md']}>
          <LayoutMobileProfile user={user} index={index} currentIndex={2}>
            {this.content(classes)}
          </LayoutMobileProfile>
        </Hidden>
      </React.Fragment>
    )
  }

}

export default withStyles(styles)(ProfileCalendar)
