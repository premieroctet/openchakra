import {Grid, MenuItem, Select, Typography} from '@material-ui/core'
import React, {useState, useEffect} from 'react'
import lodash from 'lodash'
import axios from 'axios'
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import {FEURST_SALES} from '../../utils/consts'
import {API_PATH} from '../../utils/consts'
import {setAxiosAuthentication} from '../../utils/authentication'
import {NormalButton} from './Button'

const AccountLink = props => {

  const [commercials, setCommercials]=useState([])
  const [commercial, setCommercial]=useState(null)
  const [companies, setCompanies]=useState([])
  const [selCompanies, setSelCompanies]=useState([])

  useEffect(() => {
    setAxiosAuthentication()
    axios.get(`${API_PATH}/companies`)
      .then(result => {
        setCompanies(result.data)
      })
      .catch(err => console.error(err))
    axios.get(`${API_PATH}/users`)
      .then(result => {
        setCommercials(result.data.filter(u => u.roles.includes(FEURST_SALES)))
      })
      .catch(err => console.error(err))
  }, [])

  useEffect(() => {
    setSelCompanies(commercial && commercial.companies.map(c => c._id) || [])
  }, [commercial, companies])

  const linkCompanies = () => {
    axios.put(`${API_PATH}/users/${commercial._id}/companies`, {companies: selCompanies})
      .then(() => {
        snackBarSuccess('Compagnies associées')
      })
      .catch(err => {
        snackBarError(err)
      })
  }

  const enableLink = !lodash.isEmpty(selCompanies)&& !lodash.isEmpty(commercial)
  return (
    <Grid style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <Typography>Affecter </Typography>
      <Select key='commercial' name='commercial' value={commercial} onChange={ev => setCommercial(ev.target.value)}>
        {commercials.map(c =>
          <MenuItem key={c._id} value={c}>{c.full_name}</MenuItem>,
        )}
      </Select>
      <Typography> aux clients </Typography>
      <Select multiple={true} key='selCompanies' name='selCompanies' value={selCompanies} onChange={ev => setSelCompanies(ev.target.value)}>
        {companies.map(c =>
          <MenuItem key={c._id} value={c._id}>{c.name}</MenuItem>,
        )}
      </Select>
      <NormalButton disabled={!enableLink} onClick={() => linkCompanies()}>Associer</NormalButton>
    </Grid>
  )
}

module.exports=AccountLink
