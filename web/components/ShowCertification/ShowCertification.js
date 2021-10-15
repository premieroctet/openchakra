import ReactHtmlParser from 'react-html-parser'
import {withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import withStyles from '@material-ui/core/styles/withStyles'
import styles from '../../static/css/components/ShowCertification/ShowCertification'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import CloudDoneOutlinedIcon from '@material-ui/icons/CloudDoneOutlined'
import CloudOffOutlinedIcon from '@material-ui/icons/CloudOffOutlined'
import {SHOW_CERTIFICATION} from '../../utils/i18n'
const {setAxiosAuthentication}=require('../../utils/authentication')

class ShowCertification extends React.Component {
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
    const {shop, services} = this.state
    const {classes} = this.props

    let certifications = services.map(a => a.certification).filter(c => Boolean(c))
    certifications.sort((a, b) => ((a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0)))


    return(
      <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Grid style={{display: 'flex'}}>
            <div className={`customcertiflogo ${classes.certificationLogo}`}/>
          </Grid>
          <Grid style={{marginLeft: 10}}>
            <h3>{ReactHtmlParser(this.props.t('SHOW_CERTIFICATION.title'))}</h3>
          </Grid>
        </Grid>
        <Grid container spacing={2} item xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
          {
            shop ?
              certifications.map(x => {
                if(x.name) {
                  return(
                    <>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography style={{fontSize: '16px', fontWeight: 'bold'}}>{x.name.charAt(0).toUpperCase() + x.name.slice(1)}</Typography>
                      </Grid>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Typography style={{fontSize: '13px', opacity: '0.5', marginLeft: '3px'}}><em>{x.year ? `${ReactHtmlParser(this.props.t('SHOW_CERTIFICATION.certif_obtain')) + x.year} -` : ReactHtmlParser(this.props.t('SHOW_CERTIFICATION.year_obtain')) } </em></Typography>
                        {
                          x.file ?
                            <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <Grid style={{marginLeft: '3px'}}>
                                <Typography style={{fontSize: '13px', opacity: '0.5'}}><em>{ReactHtmlParser(this.props.t('SHOW_CERTIFICATION.document_join'))}</em></Typography>
                              </Grid>
                              <Grid style={{marginLeft: '5px'}}>
                                <Typography style={{fontSize: '13px', opacity: '0.5'}}><em><CloudDoneOutlinedIcon/></em></Typography>
                              </Grid>
                            </Grid>
                            :
                            <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <Grid style={{marginLeft: '3px'}}>
                                <Typography style={{fontSize: '13px', opacity: '0.5'}}><em>{ReactHtmlParser(this.props.t('SHOW_CERTIFICATION.no_document'))}</em></Typography>
                              </Grid>
                              <Grid style={{marginLeft: '5px'}}>
                                <Typography style={{fontSize: '13px', opacity: '0.5'}}><em><CloudOffOutlinedIcon/></em></Typography>
                              </Grid>
                            </Grid>
                        }
                      </Grid>
                      {
                        x.skills && x.skills.length > 0 ?
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
                            {
                              x.skills.map(s => {
                                return(
                                  <Chip
                                    classes={{root: `customcertifchip ${classes.chip}`}}
                                    label={`#${s}`}
                                  />
                                )
                              })
                            }
                          </Grid> : null
                      }
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{marginTop: '3vh'}}>
                        <Divider/>
                      </Grid>
                    </>
                  )
                }
              })
              : null
          }
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(ShowCertification))
