import {useTranslation, withTranslation} from 'react-i18next'
import React from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../static/css/pages/homePage/index'
import LayoutFaq from '../../hoc/Layout/LayoutFaq'
import CardTeam from '../../components/Card/CardTeam/CardTeam'


function OurTeam(props) {
  const {classes} = props
  const {t, i18n} = useTranslation('translations')
  console.log(i18n.exists("test"), t("test"))
  
  return (
    <LayoutFaq>
      <Grid container spacing={4} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
          <Grid>
            <h2>Notre équipe</h2>
          </Grid>
          <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
            {
              [...Array(10)].map((res, index) => (
                <Grid item lg={3} md={4} sm={6} xs={12}>
                  <CardTeam data={res}/>
                </Grid>
              ))
            }
          </Grid>
        </Grid>
      </Grid>
    </LayoutFaq>
  )
}

export default withTranslation('custom', {withRef: true})(withStyles(styles)(OurTeam))
