import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import {makeStyles} from '@material-ui/core/styles'
import '../../static/assets/css/custom.css'
import {withTranslation} from 'react-i18next'


const useStyles = makeStyles(() => ({
  titleRub: {
    fontWeight: 'bold',
  },
}))

function DisplayInformation({pics, title, text, right}) {
  const classes = useStyles()
  const img = <Grid item xs={6} style={{height: 330, minWidth: 200, backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'contain'}} className={pics}/>
  
  return(
    <Grid container spacing={3} style={{display: 'flex', width: '100%', margin: 0}}>
      {
        !right && img
      }
      <Grid item xs={6} style={{display: 'flex', flexDirection: 'column'}}>
        <Grid>
          <h3 className={`customaddserviceonetitle ${classes.titleRub}`}>{title}</h3>
        </Grid>
        <Grid>
          <Typography style={{marginTop: '5px'}} className={'customaddserviceonetext'}>{text}</Typography>
        </Grid>
      </Grid>
      {
        right && img
      }
    </Grid>
  )
}

export default withTranslation('custom')(DisplayInformation)
