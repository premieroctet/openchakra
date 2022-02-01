const {Grid, TextField} = require('@material-ui/core')
import React, {useState} from 'react'

function Summary(props) {

  const [company, setCompany]=useState(props.company)
  return (
    <Grid style={{display: 'flex'}}>
      <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
        <h2>Société</h2>
        <TextField name='company' value={company} onChange={ev => setCompany(ev.target.value)}/>
      </Grid>
    </Grid>
  )
}

const validator = () => {
  return true
}

module.exports={Summary, summaryValidator: validator}
