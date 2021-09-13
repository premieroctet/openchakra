import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import LayoutFaq from '../../hoc/Layout/LayoutFaq'
import ResaService from '../../components/HomePage/ResaService/ResaService'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../static/css/pages/footer/becomeAlfred/becomeAlfred'
import Typography from '@material-ui/core/Typography'
const {ACCOUNT_MIN_AGE}=require('../../utils/consts')
import {FAQ_BECOME_ALFRED} from '../../utils/i18n'

class BecomeAlfred extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props
    return (
      <LayoutFaq>
        <Grid container style={{margin: 0, width: '100%'}}>
          <Grid container style={{margin: '0 10%', padding: '5% 10%'}} spacing={3}>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={'custombecomealfredonecont'} style={{display: 'flex', flexDirection: 'row'}}>
              <Grid className={classes.hiddenXs}>
                <Typography className={'custombecomealfredone'} style={{marginRight: '25px', color: '#F8CF61', fontSize: 34, fontWeight: 'bold'}}>{FAQ_BECOME_ALFRED.one}</Typography>
              </Grid>
              <Grid style={{display: 'flex', flexDirection: 'column'}}>
                <Grid>
                  <h3 className={'custombecomealfredtitleone'}>{FAQ_BECOME_ALFRED.one_title}</h3>
                </Grid>
                <Grid>
                  <Typography className={'custombecomealfredtextone'} style={{marginTop: '5px', textAlign: 'justify'}}>{FAQ_BECOME_ALFRED.one_content}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={'custombecomealfredtwocont'} style={{display: 'flex', flexDirection: 'row'}}>
              <Grid className={classes.hiddenXs}>
                <Typography className={'custombecomealfredtwo'} style={{marginRight: '25px', color: '#84A5E0', fontSize: 34, fontWeight: 'bold'}}>{FAQ_BECOME_ALFRED.two}</Typography>
              </Grid>
              <Grid style={{display: 'flex', flexDirection: 'column'}}>
                <Grid>
                  <h3 className={'custombecomealfredtitletwo'}>{FAQ_BECOME_ALFRED.two_title}</h3>
                </Grid>
                <Grid>
                  <Typography className={'custombecomealfredtexttwo'} style={{marginTop: '5px', textAlign: 'justify'}}>{FAQ_BECOME_ALFRED.two_content}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className={'custombecomealfredthreecont'} style={{display: 'flex', flexDirection: 'row'}}>
              <Grid className={classes.hiddenXs}>
                <Typography className={'custombecomealfredthree'} style={{marginRight: '25px', color: '#F36B7F', fontSize: 34, fontWeight: 'bold'}}>{FAQ_BECOME_ALFRED.three}</Typography>
              </Grid>
              <Grid style={{display: 'flex', flexDirection: 'column'}}>
                <Grid>
                  <h3 className={'custombecomealfredtitlethree'}>{FAQ_BECOME_ALFRED.three_title}</h3>
                </Grid>
                <Grid>
                  <Typography className={'custombecomealfredtextthree'} style={{marginTop: '5px', textAlign: 'justify'}}>{FAQ_BECOME_ALFRED.three_content}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container className={`custombecomealfredservicebanner ${classes.howItWorksComponent}`}>
            <Grid className={classes.generalWidthContainer}>
              <ResaService/>
            </Grid>
          </Grid>
          <Grid container style={{margin: '0 10%', padding: '5% 10%'}} spacing={3}>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={'custombecomealfredwhycont'}>
              <Grid>
                <h2 style={{textAlign: 'center'}} className={'custombecomealfredwhytitle'}>{FAQ_BECOME_ALFRED.why_become_alfred}</h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}} className={'custombecomealfredwhytext'}>{FAQ_BECOME_ALFRED.why_become_alfred_content}</Typography>
              </Grid>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={'custombecomealfredwhocont'}>
              <Grid>
                <h2 style={{textAlign: 'center'}} className={'custombecomealfredwhotitle'}>{FAQ_BECOME_ALFRED.who_become_alfred}</h2>
              </Grid>
              <Grid>
                <Typography style={{textAlign: 'justify'}} className={'custombecomealfredwhotext'}>
                  {FAQ_BECOME_ALFRED.who_become_alfred_content + ACCOUNT_MIN_AGE + FAQ_BECOME_ALFRED.who_become_alfred_content_end }</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container style={{margin: '0 10%', padding: '0 10%'}} spacing={3}>
            <Grid style={{width: '100%'}}>
              <h1 style={{textAlign: 'center'}} className={'custombecomealfredh1'}>{FAQ_BECOME_ALFRED.create_shop}</h1>
            </Grid>
            <Grid container spacing={3} style={{marginTop: '5vh'}}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={'custombecomealfredservicescont'}>
                <Grid>
                  <h2 style={{textAlign: 'center'}} className={'custombecomealfredservicesh2'}>{FAQ_BECOME_ALFRED.propose_service}</h2>
                </Grid>
                <Grid>
                  <Typography style={{textAlign: 'justify'}} className={'custombecomealfredservicestext'}>{FAQ_BECOME_ALFRED.propose_service_content}</Typography>
                </Grid>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={'custombecomealfredavailcont'}>
                <Grid>
                  <h2 style={{textAlign: 'center'}} className={'custombecomealfredavailtitle'}>{FAQ_BECOME_ALFRED.availibility}</h2>
                </Grid>
                <Grid>
                  <Typography style={{textAlign: 'justify'}} className={'custombecomealfredavailtext'}>{FAQ_BECOME_ALFRED.aivailibility_content}</Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={'custombecomealfredpricecont'}>
                <Grid>
                  <h2 style={{textAlign: 'center'}} className={'custombecomealfredpricetitle'}>{FAQ_BECOME_ALFRED.your_price}</h2>
                </Grid>
                <Grid>
                  <Typography style={{textAlign: 'justify'}} className={'custombecomealfredpricetext'}>{FAQ_BECOME_ALFRED.your_price_content}</Typography>
                </Grid>
              </Grid>
              <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className={'customebecomealfredrulescont'}>
                <Grid>
                  <h2 style={{textAlign: 'center'}} className={'custombecomealfredrulestitle'}>{FAQ_BECOME_ALFRED.your_rules}</h2>
                </Grid>
                <Grid>
                  <Typography style={{textAlign: 'justify'}} className={'custombecomealfredrulestext'}>{FAQ_BECOME_ALFRED.your_rules_content}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutFaq>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(BecomeAlfred))
