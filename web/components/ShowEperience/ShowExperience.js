import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import styles from '../../static/css/components/ShowExperience/ShowExperience'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import WorkIcon from '@material-ui/icons/Work'
const {setAxiosAuthentication}=require('../../utils/authentication')
import {YEARS_RANGE} from '../../utils/consts'
import {SHOW_EXPERIENCE} from '../../utils/i18n'
import CustomIcon from '../CustomIcon/CustomIcon'


class ShowExperience extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      services: [],
    }
  }
  componentDidMount() {
    setAxiosAuthentication()

    axios.get(`/myAlfred/api/shop/alfred/${this.props.user}`)
      .then(response => {
        let shop = response.data
        this.setState({
          shop: shop,
          services: shop.services,
        })
      }).catch(err => console.error(err))
  }

  render() {
    const {classes} = this.props
    const {shop, services} = this.state

    return(
      <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Grid>
            <CustomIcon className={'customshowxpicon'} style={{backgroundSize: 'contain', height: 24, width: 24}} materialIcon={<WorkIcon classes={{root: classes.workIcon}}/>}/>
          </Grid>
          <Grid style={{marginLeft: 10}}>
            <h3>{ReactHtmlParser(this.props.t('SHOW_EXPERIENCE.title'))}</h3>
          </Grid>
        </Grid>
        <Grid container item spacing={2} xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
          {
            shop ?
              services.map(res => {
                if(res.experience_title) {
                  return(
                    <Grid container item spacing={2} xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
                      <Grid item xl={2} lg={2} md={4} sm={12} xs={12} className={classes.containerExpPics}>
                        <Grid style={{backgroundImage: `url("/${res.service.picture}")`}} className={classes.expPics}/>
                      </Grid>
                      <Grid container item xl={10} lg={10} md={8} sm={12} xs={12} style={{margin: 0, width: '100%', display: 'flex', alignItems: 'center'}}>
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Typography style={{fontSize: '16px', fontWeight: 'bold'}}>{res.experience_title.charAt(0).toUpperCase() + res.experience_title.slice(1)}</Typography>
                        </Grid>
                        {
                          res.experience_description ?
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                              <Typography>{ReactHtmlParser(this.props.t('SHOW_EXPERIENCE.description')) + res.experience_description}</Typography>
                            </Grid> :
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                              <Typography style={{fontSize: '13px', opacity: '0.5'}}><em>{ReactHtmlParser(this.props.t('SHOW_EXPERIENCE.no_description'))}</em></Typography>
                            </Grid>
                        }
                        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                          <Typography style={{fontSize: '13px', opacity: '0.5'}}><em>{res.level && res.level !== '' ? ReactHtmlParser(this.props.t('SHOW_EXPERIENCE.exp_year')) + YEARS_RANGE[res.level] : ReactHtmlParser(this.props.t('SHOW_EXPERIENCE.no_exp_year'))}</em></Typography>
                        </Grid>
                        {
                          res.experience_skills && res.experience_skills.length > 0 ?
                            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
                              {
                                res.experience_skills.map(s => {
                                  return(
                                    <Chip
                                      label={`#${s}`}
                                      classes={{root: classes.chip}}
                                    />
                                  )
                                })
                              }
                            </Grid> : null
                        }
                      </Grid>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{marginTop: '3vh'}}>
                        <Divider/>
                      </Grid>
                    </Grid>
                  )
                }
                return null
              }) : null
          }
        </Grid>
      </Grid>
    )
  }

}

export default withTranslation(null, {withRef: true})(withStyles(styles)(ShowExperience))
