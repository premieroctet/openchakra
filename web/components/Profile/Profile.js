import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import UserAvatar from '../Avatar/UserAvatar'
import styles from '../../static/css/components/Profile/Profile'
import withStyles from '@material-ui/core/styles/withStyles'
import {PROFILE} from '../../utils/i18n'
import moment from 'moment'
moment.locale('fr')

class Profile extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {user} = this.props
    return(
      <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Grid className={'customprofileavatar'}>
          <UserAvatar user={user}/>
        </Grid>
        <Grid style={{display: 'flex', flexDirection: 'column', marginLeft: '3vh'}}>
          <Grid>
            <Typography><strong>{moment(user.creation_date).format('MMMM YYYY')}</strong></Typography>
          </Grid>
          <Grid>
            <Typography>{ReactHtmlParser(this.props.t('PROFILE.id_card'))}<strong>{ReactHtmlParser(this.props.t(user.id_confirmed ? 'PROFILE.checked':'PROFILE.no_checked'))}</strong></Typography>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Profile))
