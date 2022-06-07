import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../static/css/pages/footer/apropos/apropos'
import LayoutFaq from '../../hoc/Layout/LayoutFaq'
import Typography from '@material-ui/core/Typography'

import {FAQ_ABOUT} from '../../utils/i18n'

class Apropos extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {classes} = this.props
    return (
      <LayoutFaq>
        <Grid container spacing={4} style={{margin: 0, width: '100%'}}>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={`customaproposdatecont ${classes.containerApropos}`}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 className={'customaproposdatetitle'} style={{textAlign: 'center'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.title_birth'))}</h2>
              </Grid>
              <Grid>
                <Typography className={'customaproposdatetext'} style={{textAlign: 'justify'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.content_birth'))}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={`customaproposwearecont ${classes.containerApropos}`}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 className={'customaproposwearetitle'} style={{textAlign: 'center'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.title_we_are'))}</h2>
              </Grid>
              <Grid>
                <Typography className={'customaproposwearetext'} style={{textAlign: 'justify'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.content_we_are'))}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={`customaproposwhatiscont ${classes.containerApropos}`}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 className={'customaproposwhatistitle'} style={{textAlign: 'center'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.title_is_what'))}</h2>
              </Grid>
              <Grid>
                <Typography className={'customaproposwhatistext'} style={{textAlign: 'justify'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.content_is_what'))}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={`customaproposservicescont ${classes.containerApropos}`}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 className={'customaproposservicestitle'} style={{textAlign: 'center'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.title_service'))}</h2>
              </Grid>
              <Grid>
                <Typography className={'customaproposservicestext'} style={{textAlign: 'justify'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.content_service'))}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={`customaproposmissioncont ${classes.containerApropos}`}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 className={'customaproposmissiontitle'} style={{textAlign: 'center'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.title_mission'))}</h2>
              </Grid>
              <Grid>
                <Typography className={'customaproposmissiontext'} style={{textAlign: 'justify'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.content_mission'))}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={`customaproposvisioncont ${classes.containerApropos}`}>
            <Grid className={classes.containerWidth}>
              <Grid>
                <h2 className={'customaproposvisiontitle'} style={{textAlign: 'center'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.title_vision'))}</h2>
              </Grid>
              <Grid>
                <Typography className={'customaproposvisiontext'} style={{textAlign: 'justify'}}>{ReactHtmlParser(this.props.t('FAQ_ABOUT.content_vision'))}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </LayoutFaq>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(Apropos))
