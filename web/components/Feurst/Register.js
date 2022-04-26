import axios from 'axios'
import React, {useState, useEffect} from 'react'
import Grid from '@material-ui/core/Grid'
import {withTranslation} from 'react-i18next'
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import {setAxiosAuthentication} from '../../utils/authentication'
const {
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
} = require('@material-ui/core')
const {Autocomplete} = require('@material-ui/lab')
const Validator = require('validator')
const {API_PATH} = require('../../utils/feurst/consts')
const {normalize} = require('../../utils/text')
const {CUSTOMER_ADMIN, ROLES, ACCOUNT, CREATE} = require('../../utils/consts')

function FeurstRegister({className, style, onSuccess}) {

  const [name, setName] = useState('')
  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [companies, setCompanies] = useState('')
  const [role, setRole] = useState('')
  const [roles, setRoles] = useState([])

  useEffect(() => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/admin/companies')
      .then(result => {
        setCompanies(result.data.map(c => c.name))
      })
      .catch(err => console.error(err))
    axios.get(`${API_PATH}/users/actions`, {params: {model: ACCOUNT, action: CREATE}})
      .then(result => {
        const rls=result.data.filter(a => a.model==ACCOUNT && a.action==CREATE).map(a => a.type)
        setRoles(rls)
      })
      .catch(err => console.error(err))
  }, [])

  const sendInvitation = () => {
    setAxiosAuthentication()
    axios.post('/myAlfred/api/admin/feurst_register', {firstname, name, email, role, company})
      .then(() => {
        snackBarSuccess('L\'invitation a été envoyée')
        onSuccess && onSuccess()
      })
      .catch(err => {
        console.error(err)
        snackBarError(err.response.data)
      })
  }

  const enableRegister = () => {
    return firstname && name && email && Validator.isEmail(email) && role && (role!=CUSTOMER_ADMIN || company)
  }
  return(
    <>
      <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <Typography >Ajouter</Typography>
        <TextField style={{margin: '0px 10px 0px 10px'}} name={'firstname'} value={firstname} onChange={ev => setFirstname(ev.target.value)} placeholder={'Prénom'} />
        <TextField style={{margin: '0px 10px 0px 10px'}} name={'name'} value={name} onChange={ev => setName(ev.target.value)} placeholder={'Nom'} />
        <TextField style={{margin: '0px 10px 0px 10px'}} name={'email'} value={email} onChange={ev => setEmail(ev.target.value)} placeholder={'Adresse email'} />
        en tant que
        <Select
          id="role"
          value={role}
          name={'role'}
          onChange={ev => setRole(ev.target.value)}
        >
          {roles.map(r => (
            <MenuItem value={r} key={r}>{ROLES[r]}</MenuItem>
          )) }
        </Select>
        { role==CUSTOMER_ADMIN &&
          <>
          pour la société
            <Autocomplete
              freeSolo
              className='w-full'
              options={companies}
              aria-labelledby='machinebrand'
              value={company}
              renderInput={params => (<TextField {...params} />)}
              filterOptions={(opts, {inputValue}) => { return opts.filter(o => normalize(o).includes(normalize(company))) }}
              onChange={(ev, value) => setCompany(value)}
              onInputChange={(ev, value) => setCompany(value)}
            />
          </>
        }
      </Grid>
      <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '10px'}}>
        <Button variant={'outlined'} disabled={!enableRegister()} onClick={sendInvitation}>Envoyer</Button>
      </Grid>
    </>
  )
}

module.exports=withTranslation('custom', {withRef: true})(FeurstRegister)
