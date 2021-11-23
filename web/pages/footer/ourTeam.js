import {withTranslation} from 'react-i18next'
import React, {useEffect, useState} from 'react'
import Grid from '@material-ui/core/Grid'
import {withStyles} from '@material-ui/core/styles'
import styles from '../../static/css/pages/homePage/index'
import LayoutFaq from '../../hoc/Layout/LayoutFaq'
import CardTeam from '../../components/Card/CardTeam/CardTeam'

function OurTeam(props) {
  const {classes, t, i18n} = props
  const [array, setArray] = useState([])

  function getEmployees() {
    let newArray = []
    let i = 0
    while(i18n.exists(`EMPLOYEES.${i}.name`) || i18n.exists(`EMPLOYEES.${i}.job`) || i18n.exists(`EMPLOYEES.${i}.description`)) {
      newArray[i] = {
        ...newArray[i],
        name: t(`EMPLOYEES.${i}.name`),
        job: t(`EMPLOYEES.${i}.job`),
        description: t(`EMPLOYEES.${i}.description`),
      }
      i++
    }
    setArray(newArray)
  }

  useEffect(() => {
    getEmployees()
  }, [])

  return (
    <LayoutFaq>
      <Grid container spacing={4} style={{margin: 0, width: '100%'}}>
        <Grid item xl={12} lg={12} md={12} sm={12} xs={12} className={classes.containerApropos}>
          <Grid>
            <h2>Notre équipe</h2>
          </Grid>
          <Grid container spacing={2} style={{margin: 0, width: '100%'}}>
            {
              Object.keys(array).map((res, index) => (
                <Grid item lg={3} md={4} sm={6} xs={12} key={index}>
                  <CardTeam data={array[res]} index={index}/>
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
