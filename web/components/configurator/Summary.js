const Quotation = require('../Feurst/Quotation');
const { PDFViewer } = require('@react-pdf/renderer');
const { is_development } = require('../../config/config');
const {isPhoneOk} = require('../../utils/sms')
const {snackBarError, snackBarSuccess} = require('../../utils/notifications')
const axios = require('axios')
const {Button, Grid, TextField} = require('@material-ui/core')
const {setAxiosAuthentication} = require('../../utils/authentication')
const Validator = require('validator')
import React from 'react'
const lodash=require('lodash')

function Summary(props) {

  const sendQuotation = () => {
    // TODO Envoyer le PDF ou le générer sur le serveur
    setAxiosAuthentication()
    const data={
      firstname: props.firstname,
      name: props.name,
      company: props.company,
      email: props.email,
      phone: props.phone,
      machine: `${props.type} ${props.mark} ${props.model}`,
      precos: props.precos,
    }

    axios.post('/feurst/api/quotation', data)
      .then(() => {
        snackBarSuccess('Devis envoyé')
      })
      .catch(err => {
        console.error(err)
        snackBarError(JSON.stringify(err.response.data))
      })
  }

  return (
    <Grid style={{display: 'flex', flexDirection: 'column'}}>
      <Grid>
        <Grid style={{display: 'flex', flexDirection: 'row', marginRight: '40px'}}>
          <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
            <h3>Prénom</h3>
            <TextField name='firstname' value={props.firstname} onChange={ev => props.onFirstnameChange(ev.target.value)}/>
          </Grid>
          <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
            <h3>Nom</h3>
            <TextField name='name' value={props.name} onChange={ev => props.onNameChange(ev.target.value)}/>
          </Grid>
          <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
            <h3>Société</h3>
            <TextField name='company' value={props.company} onChange={ev => props.onCompanyChange(ev.target.value)}/>
          </Grid>
          <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
            <h3>Email</h3>
            <TextField name='email' value={props.email} onChange={ev => props.onEmailChange(ev.target.value)}/>
          </Grid>
          <Grid xs={3} style={{display: 'flex', flexDirection: 'column', marginRight: '40px'}}>
            <h3>Téléphone</h3>
            <TextField name='phone' value={props.phone} onChange={ev => props.onPhoneChange(ev.target.value)}/>
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
      <Grid>
        {lodash.get(props, 'precos.accessories') && <Button disabled={!validator(props)} onClick={sendQuotation}>Envoyer le devis</Button>}
        <Button disabled={!validator(props)} onClick={sendQuotation}>Doute? Demander une préconisation maison</Button>
      </Grid>
      {is_development() && lodash.get(props, 'precos.accessories') &&
        <Grid style={{width:'1200px', height: '800px', backgroundColor: 'red'}} >
          <PDFViewer width='1200px' height='800px'>
            <Quotation infos={props} precos={props.precos} />
          </PDFViewer>
        </Grid>
      }
    </Grid>
  )
}

const validator = state => {
  return !!state.company && !!state.name && !!state.email && Validator.isEmail(state.email)
    && !!state.phone && isPhoneOk(state.phone)
}

module.exports={Summary, summaryValidator: validator}
