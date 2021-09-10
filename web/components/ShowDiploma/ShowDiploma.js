import {withTranslation} from 'react-i18next'
import React from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import styles from '../../static/css/components/ShowDiploma/ShowDiploma'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import SchoolIcon from '@material-ui/icons/School'
import CloudDoneOutlinedIcon from '@material-ui/icons/CloudDoneOutlined'
import CloudOffOutlinedIcon from '@material-ui/icons/CloudOffOutlined'
const {setAxiosAuthentication}=require('../../utils/authentication')


class ShowDiploma extends React.Component {
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
    const {services} = this.state
    const diploma = services.map(res => res.diploma).filter(r => Boolean(r))
    diploma.sort((a, b) => ((a.year < b.year) ? 1 : ((b.year < a.year) ? -1 : 0)))

    return(
      <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Grid>
            <SchoolIcon classes={{root: classes.diplomaIcon}}/>
          </Grid>
          <Grid style={{marginLeft: 10}}>
            <h3>Diplômes</h3>
          </Grid>
        </Grid>
        <Grid container spacing={2} item xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
          {
            diploma ?
              diploma.map(res => {
                if(res.name) {
                  return(
                    <>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography style={{fontSize: '16px', fontWeight: 'bold'}}>{res.name.charAt(0).toUpperCase() + res.name.slice(1)}</Typography>
                      </Grid>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12} style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <Typography style={{fontSize: '13px', opacity: '0.5', marginLeft: '3px'}}><em>{res.year ? `Diplôme obtenu en : ${res.year}` : 'Date d\'obtention non renseigné'} -</em></Typography>
                        {
                          res.file ?
                            <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <Grid style={{marginLeft: '3px'}}>
                                <Typography style={{fontSize: '13px', opacity: '0.5'}}><em>Diplôme joint</em></Typography>
                              </Grid>
                              <Grid style={{marginLeft: '5px'}}>
                                <Typography style={{fontSize: '13px', opacity: '0.5'}}><em><CloudDoneOutlinedIcon/></em></Typography>
                              </Grid>
                            </Grid>
                            :
                            <Grid style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                              <Grid style={{marginLeft: '3px'}}>
                                <Typography style={{fontSize: '13px', opacity: '0.5'}}><em>Diplôme non joint</em></Typography>
                              </Grid>
                              <Grid style={{marginLeft: '5px'}}>
                                <Typography style={{fontSize: '13px', opacity: '0.5'}}><em><CloudOffOutlinedIcon/></em></Typography>
                              </Grid>
                            </Grid>
                        }
                      </Grid>
                      {
                        res.skills && res.skills.length > 0 ?
                          <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.chipsContainer}>
                            {
                              res.skills.map(s => {
                                return(
                                  <Chip
                                    classes={{root: classes.chip}}
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
                return null
              }) : null
          }
        </Grid>
      </Grid>
    )
  }
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(ShowDiploma))
