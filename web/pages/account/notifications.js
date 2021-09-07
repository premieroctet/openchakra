const {clearAuthenticationToken, setAxiosAuthentication} = require('../../utils/authentication')
import React from 'react'
import axios from 'axios'
import moment from 'moment'
import Grid from '@material-ui/core/Grid'
import Router from 'next/router'
import {withStyles} from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import {snackBarSuccess} from '../../utils/notifications'
import {Helmet} from 'react-helmet'
import styles from '../../static/css/pages/account/notifications/notifications'
import LayoutAccount from '../../hoc/Layout/LayoutAccount'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import LayoutMobile from '../../hoc/Layout/LayoutMobile'
import '../../static/assets/css/custom.css'
import {NOTIFICATIONS} from '../../utils/i18n'


moment.locale('fr')

class notifications extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {},
      messages_email: false,
      messages_push: false,
      messages_sms: false,
      rappel_email: false,
      rappel_push: false,
      rappel_sms: false,
      promotions_email: false,
      promotions_push: false,
      promotions_sms: false,
      promotions_phone: false,
      community_email: false,
      community_push: false,
      community_sms: false,
      assistance_email: true,
      assistance_push: false,
      assistance_sms: false,
    }
  }

  componentDidMount() {
    localStorage.setItem('path', Router.pathname)
    setAxiosAuthentication()
    axios
      .get('/myAlfred/api/users/current')
      .then(res => {
        let user = res.data
        this.setState({user: user})
        this.setState({
          messages_email: user.notifications_message.email,
          messages_push: user.notifications_message.push,
          messages_sms: user.notifications_message.sms,
        })
        this.setState({
          rappel_email: user.notifications_rappel.email,
          rappel_push: user.notifications_rappel.push,
          rappel_sms: user.notifications_rappel.sms,
        })
        this.setState({
          promotions_email: user.notifications_promotions.email,
          promotions_push: user.notifications_promotions.push,
          promotions_sms: user.notifications_promotions.sms,
          promotions_phone: user.notifications_promotions.phone,
        })
        this.setState({
          community_email: user.notifications_community.email,
          community_push: user.notifications_community.push,
          community_sms: user.notifications_community.sms,
        })
        this.setState({
          assistance_email: user.notifications_assistance.email,
          assistance_push: user.notifications_assistance.push,
          assistance_sms: user.notifications_assistance.sms,
        })
      })
      .catch(err => {
        if (err.response.status === 401 || err.response.status === 403) {
          clearAuthenticationToken()
          Router.push({pathname: '/'})
        }
      },
      )
  }

  handleChange = name => event => {
    this.setState({[name]: event.target.checked}, this.save)
  };

  save = () => {
    const data = {
      messages_email: this.state.messages_email,
      messages_push: this.state.messages_push,
      messages_sms: this.state.messages_sms,
      rappel_sms: this.state.rappel_sms,
      rappel_email: this.state.rappel_email,
      rappel_push: this.state.rappel_push,
      promotions_email: this.state.promotions_email,
      promotions_push: this.state.promotions_push,
      promotions_sms: this.state.promotions_sms,
      promotions_phone: this.state.promotions_phone,
      community_email: this.state.community_email,
      community_push: this.state.community_push,
      community_sms: this.state.community_sms,
      assistance_push: this.state.assistance_push,
      assistance_sms: this.state.assistance_sms,
    }

    axios.put('/myAlfred/api/users/account/notifications', data)
      .then(() => {
        snackBarSuccess(NOTIFICATIONS.snackbar_account_update)
      })
      .catch(err => console.error(err))
  };

  content = classes => {
    return(
      <Grid>
        <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
          <Grid>
            <h2 className={'customtitlenotif'}>{NOTIFICATIONS.my_notif}</h2>
          </Grid>
          <Grid>
            <Typography className={'customsubtitlenotif'}>{NOTIFICATIONS.subtitle}</Typography>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
        <Grid>
          <Grid>
            <Grid>
              <h2 className={'customnotifmessage'}>{NOTIFICATIONS.messages_title}</h2>
            </Grid>
            <Grid>
              <Typography className={'customnotifmessagesubtitle'} style={{color: 'rgba(39,37,37,35%)'}}>{NOTIFICATIONS.receive_messages}</Typography>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '5vh'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.email}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.messages_email}
                  onChange={this.handleChange('messages_email')}
                  value={'messages_email'}
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchemail ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.push_notif}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.messages_push}
                  onChange={this.handleChange('messages_push')}
                  value={'messages_push'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchpush ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.sms_notif}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.messages_sms}
                  onChange={this.handleChange('messages_sms')}
                  value={'messages_sms'}
                  color="primary"
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchsms ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
          </Grid>
          <Grid>
            <Grid>
              <h2 className={'customnotifraptitle'}>{NOTIFICATIONS.rappel_notif}</h2>
            </Grid>
            <Grid>
              <Typography className={'customnotifrapsubtitle'}>
                {NOTIFICATIONS.rappel_notif_tarif}
              </Typography>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '5vh'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.email}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.rappel_email}
                  onChange={this.handleChange('rappel_email')}
                  value={'rappel_email'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchrapemail ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.push_notif}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.rappel_push}
                  onChange={this.handleChange('rappel_push')}
                  value={'rappel_push'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchrappush ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.sms_notif}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.rappel_sms}
                  onChange={this.handleChange('rappel_sms')}
                  value={'rappel_sms'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchrapsms ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
          </Grid>
          <Grid>
            <Grid>
              <h2 className={'customnotifpromtitle'}>{NOTIFICATIONS.promo_title}</h2>
            </Grid>
            <Grid>
              <Typography className={'customnotifpromsubtitle'}>
                {NOTIFICATIONS.coupon_title}
              </Typography>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '5vh'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.email}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.promotions_email}
                  onChange={this.handleChange('promotions_email')}
                  value={'promotions_email'}
                  color="primary"
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchpromemail ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                  inputProps={{'aria-label': 'primary checkbox'}}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.push_notif}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.promotions_push}
                  onChange={this.handleChange('promotions_push')}
                  value={'promotions_push'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchprompush ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.sms_notif}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.promotions_sms}
                  onChange={this.handleChange('promotions_sms')}
                  value={'promotions_sms'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchpromsms ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.phone}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.promotions_phone}
                  onChange={this.handleChange('promotions_phone')}
                  value={'promotions_phone'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchpromphone ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
          </Grid>
          <Grid>
            <Grid>
              <h2 className={'customnotifcommutitle'}>{NOTIFICATIONS.commu_title}</h2>
            </Grid>
            <Grid>
              <Typography className={'customnotifcommusubtitle'}>
                {NOTIFICATIONS.presta_service}
              </Typography>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '5vh'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.email}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.community_email}
                  onChange={this.handleChange('community_email')}
                  value={'community_email'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchcommuemail ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.push_notif}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.community_push}
                  onChange={this.handleChange('community_push')}
                  value={'community_push'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchcommupush ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.sms_notif}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.community_sms}
                  onChange={this.handleChange('community_sms')}
                  value={'community_sms'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchcommusms ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid>
            <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
          </Grid>
          <Grid>
            <Grid>
              <h2 className={'customnotifassisttitle'}>{NOTIFICATIONS.assistance_account} </h2>
            </Grid>
            <Grid>
              <Typography className={'customnotifassistsubtitle'}>
                {NOTIFICATIONS.security_conf}
              </Typography>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row', marginTop: '5vh'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.email}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.assistance_email}
                  onChange={this.handleChange('assistance_email')}
                  value={'assistance_email'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchassistemail ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.push_notif}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.assistance_push}
                  onChange={this.handleChange('assistance_push')}
                  value={'assistance_push'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchassistpush ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
            <Grid container style={{display: 'flex', alignItems: 'center', flexDirection: 'row'}}>
              <Grid item xl={3} xs={6}>
                <Typography>{NOTIFICATIONS.sms_notif}</Typography>
              </Grid>
              <Grid item xl={3} xs={6} className={classes.iosSwitchContainer}>
                <Switch
                  focusVisibleClassName={classes.focusVisible}
                  disableRipple
                  checked={this.state.assistance_sms}
                  onChange={this.handleChange('assistance_sms')}
                  value={'assistance_sms'}
                  color="primary"
                  inputProps={{'aria-label': 'primary checkbox'}}
                  classes={{
                    root: classes.root,
                    switchBase: `customnotifswitchassistsms ${classes.switchBase}`,
                    thumb: classes.thumb,
                    track: classes.track,
                    checked: classes.checked,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Divider style={{height: 2, width: '100%', margin: '5vh 0px'}}/>
        </Grid>
      </Grid>

    )
  };

  render() {
    const {classes} = this.props
    const {user} = this.state

    if (!user) {
      return null
    }

    return (
      <React.Fragment>
        <Helmet>
          <title>Mes paramètres - Notifications - My Alfred </title>
          <meta property="description"
            content="Gérez vos notifications My Alfred depuis votre compte. Choisissez comment vous souhaitez être contacté en cas de réservation, de messages, d'annulation d'un service sur My Alfred. "/>
        </Helmet>
        <Grid className={classes.containerLayoutAccount}>
          <LayoutAccount>
            {this.content(classes)}
          </LayoutAccount>
        </Grid>
        <Grid className={classes.layoutMobileContainer}>
          <LayoutMobile>
            {this.content(classes)}
          </LayoutMobile>
        </Grid>

      </React.Fragment>
    )
  }
}

export default withStyles(styles)(notifications)
