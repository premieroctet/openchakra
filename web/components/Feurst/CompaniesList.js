import React, {useState, useEffect} from 'react'
import axios from 'axios'
import {ACCOUNT, API_PATH, LINK} from '../../utils/feurst/consts'
import {setAxiosAuthentication} from '../../utils/authentication'
import AccountLink from './AccountLink'
import {companiesColumns} from './tablestructures'
import BaseListTable from './BaseListTable'


const CompaniesList = ({accessRights}) => {
  
  const [sellers, setSellers] = useState([])

  useEffect(() => {
    setAxiosAuthentication()
    axios.get(`${API_PATH}/users/sales-representatives`)
      .then(result => {
        setSellers(result.data)
      })
      .catch(err => console.error(err))
  }, [])


  return (
    <>
      
      {accessRights.isActionAllowed(ACCOUNT, LINK) && <AccountLink />}
      <BaseListTable caption='Liste des comptes' endpoint='companies' columns={companiesColumns} sellers={sellers}/>
    </>
  )
}


export default CompaniesList
