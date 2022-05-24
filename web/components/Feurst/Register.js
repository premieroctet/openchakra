import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {withTranslation} from 'react-i18next'
import {Combobox, Transition} from '@headlessui/react'
import Validator from 'validator'
import styled from 'styled-components'
import {setAxiosAuthentication} from '../../utils/authentication'
import {API_PATH} from '../../utils/feurst/consts'
import {CUSTOMER_ADMIN, ROLES, ACCOUNT, CREATE} from '../../utils/consts'
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import {StyledCombobox} from '../../styles/feurst/StyledComponents'
import {PleasantButton} from './Button'


const FeurstRegister = ({className, style, onSuccess, onClose}) => {

  const [name, setName] = useState('')
  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [companies, setCompanies] = useState('')
  
  const [role, setRole] = useState('')
  const [roles, setRoles] = useState([])
  const [query, setQuery] = useState('')
  const [queryCompany, setQueryCompany] = useState('')
  const filteredRoles =
    query === ''
      ? roles
      : roles.filter(role => {
        return ROLES[role].toLowerCase().includes(query.toLowerCase())
      })
  
  const filteredCompanies =
  queryCompany === ''
    ? companies
    : companies.filter(company => {
      return company.toLowerCase().includes(queryCompany.toLowerCase())
    })


  useEffect(() => {
    setAxiosAuthentication()
    axios.get('/myAlfred/api/companies')
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
    axios.post(`${API_PATH}/admin/feurst_register`, {firstname, name, email, role, company})
      .then(() => {
        snackBarSuccess('L\'invitation a été envoyée')
        onSuccess && onSuccess()
        onClose && onClose()
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
    <HandleAccount>
      <label htmlFor='firstname'>
        Prénom
      </label>
      <input id={'firstname'} name={'firstname'} value={firstname} onChange={ev => setFirstname(ev.target.value)} placeholder={'Prénom'} />
      
      <label htmlFor='name'>
        Nom
      </label>
      <input id={'name'} name={'name'} value={name} onChange={ev => setName(ev.target.value)} placeholder={'Nom'} />
      <label htmlFor='email'>
        email
      </label>
      <input id={'email'} name={'email'} value={email} onChange={ev => setEmail(ev.target.value)} placeholder={'Adresse email'} />
      
      <StyledCombobox>
        <Combobox as={'div'} value={role} onChange={setRole}>
          <Combobox.Label>Type de compte</Combobox.Label>
          <div className='comboboxinput'>
            <Combobox.Input
              onChange={event => setQuery(event.target.value)}
              displayValue={role => ROLES[role] || null}
              placeholder='Type de compte'
            />
            <Combobox.Button>
          ▲
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            enter="enter"
            enterFrom="opacity-0 -translate-y-25"
            enterTo="opacity-100 translate-y-0"
            leave="leave"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 -translate-y-25"
            afterLeave={() => setQuery('')}
          >
            <Combobox.Options>
              {filteredRoles.map(role => (
                <Combobox.Option key={role} value={role} className={({active}) => (active ? 'active' : '')} >
                  {({selected}) => (selected ? <> {ROLES[role]} <span>✓</span></> : <>{ROLES[role]}</>)}
                </Combobox.Option>
              ))}
            </Combobox.Options>
          </Transition>
        </Combobox>
      </StyledCombobox>
  
      { role==CUSTOMER_ADMIN &&
          <>

            <StyledCombobox>
              <Combobox as={'div'} value={company} onChange={setCompany}>
                <Combobox.Label>Société</Combobox.Label>
                <div className='comboboxinput'>
                  <Combobox.Input
                    onChange={event => setQueryCompany(event.target.value)}
                    placeholder='Société'
                  />
                  <Combobox.Button>
          ▲
                  </Combobox.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="enter"
                  enterFrom="opacity-0 -translate-y-25"
                  enterTo="opacity-100 translate-y-0"
                  leave="leave"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 -translate-y-25"
                  
                >
                  <Combobox.Options>
                    {queryCompany.length > 0 && (
                      <Combobox.Option value={queryCompany} className={({active}) => (active ? 'active' : '')}>
            Créer "{queryCompany}"
                      </Combobox.Option>
                    )}
                    {filteredCompanies.map(company => (
                      <Combobox.Option key={company} value={company} className={({active}) => (active ? 'active' : '')} >
                        {({selected}) => (selected ? <> {company} <span>✓</span></> : <>{company}</>)}
                      </Combobox.Option>
                    ))}
                  </Combobox.Options>
                </Transition>
              </Combobox>
            </StyledCombobox>
          </>
      }
      
      <PleasantButton
        size={'full-width'}
        rounded={'full'}
        disabled={!enableRegister()}
        onClick={() => sendInvitation({firstname, name, email, role, company})}
      >
        Ajouter
      </PleasantButton>
      
    </HandleAccount>
  )
}

const HandleAccount = styled.div`
  
  display: flex;
  flex-direction: column;
  row-gap: var(--spc-4);
  width: min(calc(100% - 2rem), 20rem);
  margin-inline: auto;
  font-size: var(--text-xl);

  & > button {
    margin-top: var(--spc-6);
  }

  label {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  input {
    font-size: inherit;
    position: relative;
    border: 0;
    border-bottom: 2px solid var(--stone-300);
    padding-block: var(--spc-2);
    transition: border 0.2s ease-in-out;
    outline: 0;
  }
  
  input:focus {
    border-color: var(--black);
  }

  input::placeholder {
    color: var(--black);
  }
  
  .leave {
    transition: all 0.1s ease-in;
  }
  
  .enter {
    transition: all .2s ease-out;
  }

`

export default withTranslation('custom', {withRef: true})(FeurstRegister)
