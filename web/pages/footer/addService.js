import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import LayoutFaq from '../../hoc/Layout/LayoutFaq'
import NeedMoreFaq from '../../hoc/Layout/Faq/NeedMoreFaq'
import styles from '../../static/css/pages/footer/addService/addService'
import Typography from '@material-ui/core/Typography'
import '../../static/assets/css/custom.css'
import {ADD_SERVICE} from '../../utils/i18n'

class AddService extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props
    return (
      <LayoutFaq>
        <Grid className={classes.mainContainerAddService}>
          <Grid style={{display: 'flex'}}>
            <Grid className={classes.hideOnMobile}>
              <h1 style={{marginRight: '25px', color: '#F8CF61'}} className={'customaddserviceone'}>1</h1>
            </Grid>
            <Grid style={{display: 'flex', flexDirection: 'column'}}>
              <Grid>
                <h3 className={`customaddserviceonetitle ${classes.titleRub}`}>{ADD_SERVICE.register_title}</h3>
              </Grid>
              <Grid>
                <Typography style={{marginTop: '5px'}} className={'customaddserviceonetext'}>{ADD_SERVICE.register_phone}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex'}}>
            <Grid className={classes.hideOnMobile}>
              <h1 style={{marginRight: '25px', color: '#84A5E0'}} className={'customaddservicetwo'}>{ADD_SERVICE.two}</h1>
            </Grid>
            <Grid style={{display: 'flex', flexDirection: 'column'}}>
              <Grid>
                <h3 className={`customaddservicetwotitle ${classes.titleRub}`}>{ADD_SERVICE.begin_your_research}</h3>
              </Grid>
              <Grid>
                <Typography style={{marginTop: '5px'}} className={'customaddservicetwotext'}>{ADD_SERVICE.begin_your_research_content}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{display: 'flex'}}>
            <Grid className={classes.hideOnMobile}>
              <h1 style={{marginRight: '25px', color: '#F36B7F'}} className={'customaddservicethree'}>{ADD_SERVICE.three}</h1>
            </Grid>
            <Grid style={{display: 'flex', flexDirection: 'column'}}>
              <Grid>
                <h3 className={`customaddservicethreetitle ${classes.titleRub}`}>{ADD_SERVICE.three_title}</h3>
              </Grid>
              <Grid>
                <Typography style={{marginTop: '5px'}} className={'customaddservicethreetext'}>{ADD_SERVICE.three_content}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid style={{marginTop: '10vh'}}>
            <NeedMoreFaq/>
          </Grid>
        </Grid>
      </LayoutFaq>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(AddService))
