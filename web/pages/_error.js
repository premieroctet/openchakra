import React from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import styles from '../static/css/pages/errorPage/errorPage'
import withStyles from '@material-ui/core/styles/withStyles'

function Custom404({classes}) {

  return (
    <Grid style={{display: 'flex', backgroundColor: 'rgba(249,249,249, 1)', width: '100%', justifyContent: 'center', padding: '10%', minHeight: '100vh'}}>
      <Grid className={classes.containerError}>
        <Grid style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          <Grid style={{display: 'flex', flexDirection: 'column'}}>
            <Grid>
              <h1>404</h1>
            </Grid>
            <Grid>
              <Typography>Oups cette page n'existe pas !</Typography>
            </Grid>
          </Grid>
          <Grid>
            <a href={'/'}><Typography>Retour a la page d'accueil ici</Typography></a>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withStyles(styles)(Custom404)
