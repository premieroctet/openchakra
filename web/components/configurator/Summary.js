const {is_development} = require('../../config/config')
const {snackBarError, snackBarSuccess} = require('../../utils/notifications')
const axios = require('axios')
const {Button, Grid, TextField} = require('@material-ui/core')
const {setAxiosAuthentication} = require('../../utils/authentication')

import {PDFViewer} from '@react-pdf/renderer'
import Quotation from'../Feurst/Quotation'
const Validator = require('validator')
import React from 'react'
import NoSSR from 'react-no-ssr'

function Summary(props) {

  const sendQuotation = () => {
    // TODO Envoyer le PDF ou le générer sur le serveur
    setAxiosAuthentication()
    const data={
      name: props.name,
      company: props.company,
      email: props.email,
      quotation_id: 'identifiant',
      machine: `${props.type} ${props.mark} ${props.model}`,
      precos: props.precos,
    }

    axios.post('/feurst/api/quotation', data)
      .then(() => {
        snackBarSuccess('Devis envoyé')
      })
      .catch(err => {
        snackBarError(err)
      })
  }

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
      {props.precos &&
        <>
          <Button onClick={sendQuotation}>Envoyer le devis</Button>
          { is_development() && <NoSSR>
            <PDFViewer style={{height: '500px'}}>
              <Quotation precos={props.precos} infos={props}/>
            </PDFViewer>
          </NoSSR>
          }
        </>
      }
    </Grid>
  )
}

const validator = state => {
  return !!state.company && !!state.name && !!state.email && Validator.isEmail(state.email)
}

module.exports={Summary, summaryValidator: validator}
