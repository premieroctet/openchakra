import React, {useState, useEffect} from 'react'
const {Typography} = require('@material-ui/core')

const {Grid, MenuItem, Select} = require('@material-ui/core')
const lodash=require('lodash')
const axios = require('axios')
const {snackBarError, snackBarSuccess} = require('../../utils/notifications')
const {API_PATH, FEURST_SALES} = require('../../utils/feurst/consts')
const {setAxiosAuthentication} = require('../../utils/authentication')
const {PleasantButton} = require('./Button')

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
      <PleasantButton disabled={!enableLink} onClick={() => linkCompanies()}>Associer</PleasantButton>
    </Grid>
  )
}

module.exports=AccountLink
