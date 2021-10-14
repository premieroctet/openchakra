import React from 'react'
import Grid from '@material-ui/core/Grid'
import SchoolIcon from '@material-ui/icons/School'
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser'
import styles from '../../static/css/components/Card/CardService/CardService'
import {withStyles} from '@material-ui/core/styles'

function ListIconsSkills(props) {
  const {data, classes} = props
  return(
    <>
      {
        data.is_certified ?
          <Grid style={{margin: 5}}>
            <img title={'certification_icon'} alt={'certification_icon'} height={20} width={20} src={'/static/assets/icon/pro_icon.svg'} className={classes.colorIconExtension} />
          </Grid> : null
      }
      {
        data.graduated ?
          <Grid style={{margin: 5}}>
            <SchoolIcon classes={{root: classes.colorIconSchool}}/>
          </Grid> : null
      }
      {
        data.rgbe ?
          <Grid style={{margin: 5}}>
            <VerifiedUserIcon classes={{root: classes.colorIconSchool}}/>
          </Grid> : null
      }
    </>
  )
}

export default withStyles(styles)(ListIconsSkills)
