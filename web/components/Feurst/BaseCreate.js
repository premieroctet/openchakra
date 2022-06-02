import React, {useState, useEffect} from 'react'
import {useRouter} from 'next/router'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'
import {withTranslation} from 'react-i18next'
import {
  BASEPATH_EDI,
  API_PATH,
  RELATED,
} from '../../utils/consts'

import {client} from '../../utils/client'
import withEdiRequest from '../../hoc/withEdiRequest'

const BaseCreateTable = ({
  endpoint,
  accessRights,
  wordingSection,
  t,
  createOrderId,
}) => {

  const [orderCompany, setOrderCompany] = useState(null)
  const [companies, setCompanies] = useState([])

  const router = useRouter()

  // Possibles actions
  const isFeurstSales = accessRights.getFullAction()?.visibility==RELATED


  useEffect(() => {
    
    if ((orderCompany !== null || !isFeurstSales)) {
      createOrderId({endpoint, company: orderCompany})
        .then(data => {
          router.replace(`${BASEPATH_EDI}/${endpoint}/view/${data._id}`)
        })
        .catch(e => console.error('cant create order', e))
    }
    
  }, [createOrderId, endpoint, orderCompany, isFeurstSales, router])

  /* Feurst ? => Fetch companies */
  useEffect(() => {
    if (isFeurstSales) {
      const fetchCompanies = async() => {
        const companies = await client(`${API_PATH}/companies`)
        setCompanies(companies)
      }
      fetchCompanies()
    }
  }, [isFeurstSales])

  return (<>
    {isFeurstSales && !orderCompany ?
      <div className='container-sm mb-8'>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={companies}
          value={orderCompany}
          onChange={(ev, value) => setOrderCompany(value)}
          getOptionLabel={option => option.name}
          sx={{width: 300}}
          renderInput={params => <TextField {...params} label="Nom de la société" />}
        />
      </div> :
      null
    }
  </>
  )
}

export default withTranslation('feurst', {withRef: true})(withEdiRequest(BaseCreateTable))
