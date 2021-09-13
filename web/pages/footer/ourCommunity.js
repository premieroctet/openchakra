import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../static/css/pages/footer/ourCommunity/ourCommunity'
import LayoutFaq from '../../hoc/Layout/LayoutFaq'
import Typography from '@material-ui/core/Typography'
import {FAQ_OUR_COMMUNITY} from '../../utils/i18n'

class OurCommunity extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props
    return (
      <LayoutFaq>
        <Grid container spacing={4} style={{margin: 0, width: '100%'}} className={'customcommunitycont'}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 className={'customcommunitytitle'} style={{textAlign: 'center'}}>{FAQ_OUR_COMMUNITY.title}</h2>
              </Grid>
              <Grid>
                <Typography className={'customcommunitytext'} style={{textAlign: 'justify'}}>{FAQ_OUR_COMMUNITY.content}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutFaq>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(OurCommunity))
