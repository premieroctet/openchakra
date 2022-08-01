import React from 'react'
import Grid from '@material-ui/core/Grid'
import SchoolIcon from '@material-ui/icons/School'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import styles from '../../static/css/components/Card/CardServiceUser/CardServiceUser'
import {withStyles} from '@material-ui/core/styles'

function ListIconsSkills(props) {
  const {data, classes} = props

  return(
    <>
      {data.grade_text &&
          <Grid style={{margin: 5}}>
            <SchoolIcon classes={{root: classes.colorIconSchool}}/>
          </Grid>
      }
      {data.insurance_text &&
          <Grid style={{margin: 5}}>
            <VerifiedUserIcon classes={{root: classes.colorIconSchool}}/>
          </Grid>
      }
    </>
  )
}

export default withStyles(styles)(ListIconsSkills)
