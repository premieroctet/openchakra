import React from 'react'
import Grid from '@material-ui/core/Grid'
import OAuth from '../OAuth/OAuth'

const {PROVIDERS, ROLES} = require('../../utils/consts')

const LoginGafa = props => {
  
  const {classes} = props

  return (<Grid className={classes.margin}>
    <Grid container spacing={1} alignItems="flex-end" className={classes.genericContainer}>
      <Grid className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end" className={classes.flexContainerPics}>
          <Grid style={{width: '100%'}}>
            {PROVIDERS.map(provider =>
              <OAuth
                login={true}
                provider={provider}
                key={provider}
              />,
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid className={classes.margin}>
        <Grid container spacing={1} alignItems="flex-end" className={classes.flexContainerPics}>
          <Grid>
            <h3 style={{color: 'rgba(84,89,95,0.95)', fontWeight: 'bold', letterSpacing: -1}}>Ou</h3>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  </Grid>
  )
}


export default LoginGafa
