const Validator = require('validator')
const {Grid, TextField} = require('@material-ui/core')
import React from 'react'

function Summary(props) {

  return (
    <Grid style={{display: 'flex', flexDirection: 'column'}}>
      <Grid style={{display: 'flex', flexDirection: 'row', marginRight: '40px'}}>
        <Grid xs={4} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Société</h3>
          <TextField name='company' value={props.company} onChange={ev => props.onCompanyChange(ev.target.value)}/>
        </Grid>
        <Grid xs={4} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Nom</h3>
          <TextField name='name' value={props.name} onChange={ev => props.onNameChange(ev.target.value)}/>
        </Grid>
        <Grid xs={4} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Email</h3>
          <TextField name='name' value={props.email} onChange={ev => props.onEmailChange(ev.target.value)}/>
        </Grid>
      </Grid>
      <Grid style={{display: 'flex', flexDirection: 'row', marginRight: '40px'}}>
        <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Type</h3>
          <TextField disabled={true} value={props.type}/>
        </Grid>
        <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Marque</h3>
          <TextField disabled={true} value={props.mark}/>
        </Grid>
        <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Machine</h3>
          <TextField disabled={true} value={props.model}/>
        </Grid>
        <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Tonnage (t)</h3>
          <TextField disabled={true} value={props.weight}/>
        </Grid>
        <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Puissance(kW)</h3>
          <TextField disabled={true} value={props.power}/>
        </Grid>
        <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Terrain</h3>
          <TextField disabled={true} value={props.ground}/>
        </Grid>
      </Grid>
      <Grid style={{display: 'flex', flexDirection: 'row', marginRight: '40px'}}>
        <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Forme de lame</h3>
          <TextField disabled={true} value={props.bladeShape}/>
        </Grid>
        <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Epaisseur de lame (mm)</h3>
          <TextField disabled={true} value={props.bladeThickness}/>
        </Grid>
        <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Largeur du godet (cm)</h3>
          <TextField disabled={true} value={props.bucketWidth}/>
        </Grid>
        <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
          <h3>Fixation</h3>
          <TextField disabled={true} value={props.fixType}/>
        </Grid>
      </Grid>
    </Grid>
  )
}

const validator = state => {
  return !!state.company && !!state.name && !!state.email && Validator.isEmail(state.email)
}

module.exports={Summary, summaryValidator: validator}
