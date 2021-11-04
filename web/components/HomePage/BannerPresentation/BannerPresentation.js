import CustomButton from '../../CustomButton/CustomButton'
import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {BANNER_PRESENTATION, BANNER_B2B_PRESENTATION} from '../../../utils/i18n'
import Link from 'next/link'
import styles from '../../../static/css/components/BannerPresentation/BannerPresentation'
import withStyles from '@material-ui/core/styles/withStyles'
import {isB2BStyle} from '../../../utils/context.js'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
const {setAxiosAuthentication}=require('../../../utils/authentication')
import '../../../static/assets/css/custom.css'

class BannerPresentation extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      user: {},
    }
  }

  componentDidMount() {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/users/current').then(res => {
      let result = res.data
      this.setState({user: result})
    }).catch(err => console.error(err))
  }

  render() {
    const {classes} = this.props
    const {user} = this.state

    const title = isB2BStyle(user) ? ReactHtmlParser(this.props.t('BANNER_B2B_PRESENTATION.title')) : ReactHtmlParser(this.props.t('BANNER_PRESENTATION.title'))
    const subTitle = isB2BStyle(user) ? ReactHtmlParser(this.props.t('BANNER_B2B_PRESENTATION.subTitle')) : ReactHtmlParser(this.props.t('BANNER_PRESENTATION.subTitle'))
    const text = isB2BStyle(user) ? ReactHtmlParser(this.props.t('BANNER_B2B_PRESENTATION.text')) : ReactHtmlParser(this.props.t('BANNER_PRESENTATION.text'))


    return (
      <Grid container spacing={2} style={{width: '100%', margin: 0}}>
        <Grid container spacing={2} style={{width: '100%', margin: 0}} item xs={12}>
          <Grid item xs={12} className={'bannerh1'}>
            <h2 className={classes.bannerPresentationTitle}>
              <span className={`custombannerh1 ${classes.titleSpan}`}>{title}</span>
            </h2>
          </Grid>
          <Grid item xs={12} className={'bannerh2'}>
            <h2 className={classes.bannerPresentationTitle}>
              <span className={`custombannerh2 ${classes.subtitleSpan}`}>{subTitle}</span>
            </h2>
          </Grid>
          <Grid item xs={12} className={'bannercontent'}>
            <Typography className={`custombannercontent ${classes.bannerPresentationText}`}>{text}</Typography>
          </Grid>
          <Grid item xs={12} className={classes.containerLinkDiscrover}>
            <Link href={'/search'}>
              <CustomButton
                variant={'outlined' }
                classes={{root: `custombannerbutton ${classes.bannerPresentationButtonB2b}`}}>
                {ReactHtmlParser(this.props.t('BANNER_PRESENTATION.button'))}
              </CustomButton>
            </Link>
          </Grid>
        </Grid>
        {
          isB2BStyle(user) ?
            <Grid item xs={6} className={classes.illuContainer}>
              <img title={'illuB2b'} alt={'illuB2b'} src={`/static/assets/img/homePage/${isB2BStyle(user) ? 'b2bIllu.svg' : 'illuHeader.png'}`} className={classes.illuStyle}/>
            </Grid>
            : null
        }
      </Grid>
    )
  }

}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(BannerPresentation))
