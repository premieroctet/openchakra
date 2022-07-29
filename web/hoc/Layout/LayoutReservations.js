import React from 'react'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styles from '../../static/css/components/Layout/LayoutReserations/LayoutReservations'
import {setAxiosAuthentication} from '../../utils/authentication'
import {LAYOUT_RESA} from '../../utils/i18n'
import Layout from './Layout'

class LayoutReservations extends React.Component {

  constructor(props) {
    super(props)
    this.state={
      reservationStatus: 0,
      reservationType: 1,
    }
  }

  componentDidMount = () => {
    setAxiosAuthentication()
  };

  render() {
    const {user} = this.state
    const {classes, children, reservationType, userInfo} = this.props

    return(
      <Layout user={user}>
        <Grid style={{display: 'flex', justifyContent: 'center'}}>
          <Grid style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
            <Grid style={{display: 'flex', justifyContent: 'center'}}>
              <h2 className={'customlayoutresatitle'}>{ReactHtmlParser(this.props.t('LAYOUT_RESA.title'))}</h2>
            </Grid>
            <Grid>
              <Tabs
                value={userInfo && !userInfo.is_alfred ? 0 : reservationType}
                onChange={userInfo && !userInfo.is_alfred ? null : this.props.onReservationTypeChanged}
                aria-label="scrollable force tabs"
                scrollButtons="on"
                classes={{indicator: `customscrollmenu ${classes.scrollMenuIndicator}`}}
              >
                {
                  userInfo && userInfo.is_alfred ?
                    <Tab label={ReactHtmlParser(this.props.t('LAYOUT_RESA.resa_alfred'))} className={`customlayoutresaalfred ${classes.scrollMenuTab}`} />
                    : null
                }
                <Tab label={ReactHtmlParser(this.props.t('LAYOUT_RESA.resa_user'))} className={`customlayoutresauser ${classes.scrollMenuTab}`} />
              </Tabs>
            </Grid>
            <Grid style={{backgroundColor: 'rgba(249,249,249, 1)', width: '100%'}}>
              <Grid className={classes.containerChildren}>
                {children}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Layout>
    )
  }
}

export default withTranslation(null, {withRef: true})(withStyles(styles)(LayoutReservations))
