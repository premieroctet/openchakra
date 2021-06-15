import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../../static/css/components/CreaShopPresentation/CreaShopPresentation'
import {SHOP} from '../../../utils/i18n'
import Divider from '@material-ui/core/Divider'


class CreaShopPresentation extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {classes, user} = this.props

    return (
      <Grid container spacing={3} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} sm={12} md={12} xs={12} className={classes.titleContainer}>
          <h2 className={classes.policySizeTitle}>{`${SHOP.bienvenue.titre } ${ user.firstname}`}</h2>
        </Grid>
        <Grid container spacing={3} item xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid>
              <h3 style={{color: '#403f3f'}}>{SHOP.bienvenue.step1}</h3>
            </Grid>
            <Grid>
              <Divider/>
            </Grid>
            <Grid>
              <Grid>
                <h4 className={classes.policySizeSubtitle}>{SHOP.bienvenue.step1_subtitle}</h4>
              </Grid>
              <Grid>
                <p className={classes.policySizeContent}>{SHOP.bienvenue.step1_text}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid>
              <h3 style={{color: '#403f3f'}}>{SHOP.bienvenue.step2}</h3>
            </Grid>
            <Grid>
              <Divider/>
            </Grid>
            <Grid>
              <Grid>
                <h4 className={classes.policySizeSubtitle}>{SHOP.bienvenue.step2_subtitle}</h4>
              </Grid>
              <Grid>
                <p>{SHOP.bienvenue.step2_text}</p>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
            <Grid>
              <h3 style={{color: '#403f3f'}}>{SHOP.bienvenue.step3}</h3>
            </Grid>
            <Grid>
              <Divider/>
            </Grid>
            <Grid>
              <Grid>
                <h4 className={classes.policySizeSubtitle}>{SHOP.bienvenue.step3_subtitle}</h4>
              </Grid>
              <Grid>
                <p>{SHOP.bienvenue.step3_text}</p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(CreaShopPresentation)
