// @ts-check
import React, {useState, useEffect, Fragment} from 'react'
import styled from 'styled-components'
import {Combobox, Transition} from '@headlessui/react'
import {StyledCombobox} from '../../styles/feurst/StyledComponents'


const UpdateSeller = ({
  value: initialValue,
  row: {index},
  column: {id},
  cell: {row},
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)
  const [query, setQuery] = useState('')
  const [sellers, setSellers] = useState(['Bob rawos', 'John Does'])
  const filteredSellers = query === ''
    ? sellers
    : sellers.filter(seller => {
      return seller.toLowerCase().includes(query.toLowerCase())
    })


  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    if (typeof updateMyData === 'function') {
      console.log('Try to update ? In progress')
      // updateMyData({item: itemToUpdate, quantity: qty, replace: true})
    }
    else {
      console.error('React Table Data not updated. Did you forget the prop updateMyData on your table ?')
    }
  }

  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return <div className='flex items-center'>
    <StyledCombobox>
      <Combobox as={'div'} value={value} onChange={setValue}>
        <div className='comboboxinput'>
          <Combobox.Input
            onChange={event => setQuery(event.target.value)}
            placeholder='Commercial'
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
            {filteredSellers.map(seller => (
              <Combobox.Option key={seller} value={seller} className={({active}) => (active ? 'active' : '')} >
                {({selected}) => (selected ? <> {seller} <span>✓</span></> : <>{seller}</>)}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Transition>
      </Combobox>
    </StyledCombobox>
  </div>
  
}

export default UpdateSeller
