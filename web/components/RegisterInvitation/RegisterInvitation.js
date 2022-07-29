import {Button, TextField, Typography} from '@material-ui/core'
import {setAxiosAuthentication} from '../../utils/authentication'
import axios from 'axios'
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import React, {useState} from 'react'
import Grid from '@material-ui/core/Grid'
import {withTranslation} from 'react-i18next'

function RegisterInvitation({className, style}) {

  const [email, setEmail] = useState('')

  const onChangeEmail = ev => {
    setEmail(ev.target.value)
  }

  const sendInvitation = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/admin/register_invitation', {email: email})
      .then(() => {
        snackBarSuccess('L\'invitation a été envoyée')
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
      })
  }

  return(
    <>
      <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography >Inviter</Typography>
        <TextField style={{margin: '0px 10px 0px 10px'}} name={'email'} value={email} onChange={onChangeEmail} placeholder={'Adresse email'} />
        <Typography>à s'inscrire pour proposer ses services</Typography>
      </Grid>
      <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
        <Button variant={'outlined'} onClick={sendInvitation}>Envoyer</Button>
      </Grid>
    </>
  )
}

export default withTranslation(null, {withRef: true})(RegisterInvitation)
