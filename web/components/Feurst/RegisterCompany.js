import React, {useState} from 'react'
import styled from 'styled-components'
import Address from '../Address/Address'
import {client} from '../../utils/client'
import {
  BASEPATH_EDI,
  API_PATH,
} from '../../utils/consts'
import {StyledListbox} from '../../styles/feurst/StyledComponents'
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import {Input} from './components.styles'
import {NormalButton} from './Button'

const RegisterCompany = ({onSuccess, onClose}) => {

  const submitCompany = async({companyname, address}) => {

    await client(`${API_PATH}/${endpoint}/${orderid}/validate`, {data: {}, method: 'POST'})
      .then(() => {
        snackBarSuccess('Société enregistrée')
        onSuccess && onSuccess()
        onClose && onClose()
      })
      .catch(error => {
        console.error(error)
        snackBarError(error?.response.data)
      })
  }

  const [state, setState] = useState({companyname: '', address: {}})
  const requestUpdate = items => setState({...state, ...items})

  const canRegisterCompany = state?.companyname && state?.address?.address
                    && state?.address?.zip_code && state?.address?.city && state?.address?.country
  
  return (<StyledRegisterCompany onSubmit={submitCompany({companyname: state.companyname, address: state.address})}>
    <Input
      noborder
      placeholder={'Nom de la société'}
      type="text"
      name="companyname"
      value={state.companyname || ''}
      onChange={e => setState({...state, companyname: e.target.value})} />
    <Address state={state} requestUpdate={requestUpdate} />

    <StyledListbox>
      <Listbox as={'div'} value={value} onChange={onChangeSeller}>
        <Listbox.Button>
          <span>{value?.full_name}</span><span className='icon'>▲</span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          enter="enter"
          enterFrom="opacity-0 -translate-y-25"
          enterTo="opacity-100 translate-y-0"
          leave="leave"
          leaveFrom="opacity-100 translate-y-0"
          leaveTo="opacity-0 -translate-y-25"
        >
          <Listbox.Options>
            {sellers.map(seller => (
              <Listbox.Option key={`${seller._id}`} value={seller} className={({active}) => (active ? 'active' : '')} >
                {({selected}) => (selected ? <> {seller.full_name} <span>✓</span></> : <>{seller.full_name}</>)}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </StyledListbox>

    <NormalButton
      disabled={!canRegisterCompany}
      type='submit'
      onSubmit={() => submitCompany({companyname: state.companyname, address: state.address})}
    >
      Enregistrer cette société
    </NormalButton>
  </StyledRegisterCompany>
  )
}

const StyledRegisterCompany = styled.form`
  
  display: grid;

  input {
    width: 100%;
    color: var(--black);
    margin-bottom: var(--spc-4);
  }

  button[type="submit"] {
    justify-self: center;
  }
`

export default RegisterCompany
