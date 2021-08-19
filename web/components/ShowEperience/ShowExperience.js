import React from 'react'
import styles from '../../static/css/components/ShowExperience/ShowExperience'
import withStyles from '@material-ui/core/styles/withStyles'
import Grid from '@material-ui/core/Grid'
import axios from 'axios'
import Typography from '@material-ui/core/Typography'
import Chip from '@material-ui/core/Chip'
import Divider from '@material-ui/core/Divider'
import {Paper} from '@material-ui/core'
const {setAxiosAuthentication}=require('../../utils/authentication')


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
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
          <h3>Experience</h3>
        </Grid>
        <Grid container item spacing={2} xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
          {
            shop ?
              services.map(res => {
                return(
                  <Grid container item spacing={2} xl={12} lg={12} md={12} sm={12} xs={12} style={{margin: 0, width: '100%'}}>
                    <Grid item xl={2} lg={2} className={classes.containerExpPics}>
                      <Grid style={{backgroundImage: `url("/${res.service.picture}")`}} className={classes.expPics}/>
                    </Grid>
                    <Grid container item xl={10} lg={10} style={{margin: 0, width: '100%', display: 'flex', alignItems: 'center'}}>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <h3 style={{margin: 0, color: 'black'}}>{res.experience_title.charAt(0).toUpperCase() + res.experience_title.slice(1)}</h3>
                      </Grid>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography>{res.experience_description}</Typography>
                      </Grid>
                      <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <Typography style={{fontSize: '13px', opacity: '0.5'}}><em>Diplôme obtenu en {res.year}</em></Typography>
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
              }) : null
          }
        </Grid>
      </Grid>
    )
  }

}

export default withStyles(styles)(ShowExperience)
