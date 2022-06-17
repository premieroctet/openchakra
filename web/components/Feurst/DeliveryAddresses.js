import React, {useEffect, Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import useAsync from '../../hooks/use-async.hook'
import {client} from '../../utils/client'
import {API_PATH} from '../../utils/consts'
import {StyledListbox} from '../../styles/feurst/StyledComponents'

const DeliveryAddresses = ({state, requestUpdate, endpoint}) => {

  const {
    data,
    isLoading,
    isError,
    error,
    run,
  } = useAsync({data: []})

  const setAddress = address => {
    requestUpdate({address: {...state.address, ...address}})
  }

  const addressPattern = address => `${address.label}: ${address.address} ${address.zip_code} ${address.city}`

  /* load addresses on start */
  useEffect(() => {
    run(client(`${API_PATH}/${endpoint}/${state.id}/addresses`))
      .catch(e => {
        console.error(`Can't fetch addresses in autocomplete ${e}`)
      })
  }, [])

  return (<>
    <StyledListbox>
      <Listbox as={'div'} value={state.address} onChange={setAddress}>
        <Listbox.Button>
          <span>{state?.address?.address ? addressPattern(state?.address) : 'Choisissez une adresse'}</span><span className='icon'>▲</span>
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
            {data.map(address => (
              <Listbox.Option key={`${data._id}`} value={address} className={({active}) => (active ? 'active' : '')} >
                {({selected}) => (selected ? <>{addressPattern(address)}<span>✓</span></> : <>{addressPattern(address)}</>)}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </StyledListbox>
    
  </>

  )


}


export default DeliveryAddresses
