import React, {useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import {withTranslation} from 'react-i18next'
import {Listbox, Transition} from '@headlessui/react'
import Validator from 'validator'
import styled from 'styled-components'
import {setAxiosAuthentication} from '../../utils/authentication'
import {API_PATH} from '../../utils/feurst/consts'
import {CUSTOMER_ADMIN, ROLES, ACCOUNT, CREATE} from '../../utils/consts'
import {snackBarError, snackBarSuccess} from '../../utils/notifications'
import {StyledListbox} from '../../styles/feurst/StyledComponents'
import {PleasantButton} from './Button'


const FeurstRegister = ({className, style, onSuccess, onClose}) => {

  const [name, setName] = useState('')
  const [firstname, setFirstname] = useState('')
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [companies, setCompanies] = useState('')

  const [role, setRole] = useState('')
  const [roles, setRoles] = useState([])

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

      <StyledListbox>
        <Listbox
          as={'div'}
          value={role}
          onChange={setRole}
          name="accountype"
        >
          <Listbox.Label>Type de compte</Listbox.Label>
          <Listbox.Button>
            <span>{ROLES[role] || 'Type de compte'}</span><span className='icon'>▲</span>
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
              {roles.map(role => (
                <Listbox.Option key={role} value={role} className={({active}) => (active ? 'active' : '')} >
                  {({selected}) => (selected ? <> {ROLES[role]} <span>✓</span></> : <>{ROLES[role]}</>)}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </Listbox>
      </StyledListbox>

      { role==CUSTOMER_ADMIN &&
        <StyledListbox>
          <Listbox
            as={'div'}
            value={company}
            onChange={setCompany}
            name="company"
          >
            <Listbox.Label>Société</Listbox.Label>
            <Listbox.Button>
              <span>{company || 'Société'}</span><span className='icon'>▲</span>
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
                {companies.map(company => (
                  <Listbox.Option key={company} value={company} className={({active}) => (active ? 'active' : '')} >
                    {({selected}) => (selected ? <> {company} <span>✓</span></> : <>{company}</>)}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </Listbox>
        </StyledListbox>
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
