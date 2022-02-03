const {Grid, MenuItem, Select} = require('@material-ui/core')

import React from 'react'

function UseCase(props) {

  return (
    <Grid style={{display: 'flex'}}>
      <Grid style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h2>Type de terrain</h2>
        <Select name='ground' value={props.ground} onChange={ev => { props.onGroundChange(ev.target.value) }}>
          {props.grounds.map(mk => (
            <MenuItem key={mk} value={mk}>{mk}</MenuItem>
          ))
          }
        </Select>
      </Grid>
    </Grid>

  )
}

const validator = state => {
  return !!state.ground
}

module.exports={UseCase, useCaseValidator: validator}
