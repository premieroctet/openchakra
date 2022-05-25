// @ts-check
import React, {useState, useEffect, Fragment} from 'react'
import styled from 'styled-components'
import {Listbox, Transition} from '@headlessui/react'
import {StyledListbox} from '../../styles/feurst/StyledComponents'


const UpdateSeller = ({
  value: initialValue,
  row: {index},
  column: {id},
  cell: {row},
  updateMyData, // This is a custom function that we supplied to our table instance
  sellers,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)
  console.log(sellers)

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

  return <>
    <StyledListbox>
      <Listbox as={'div'} value={value} onChange={setValue}>
        <Listbox.Button>
          <span>{value}</span><span className='icon'>▲</span>
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
            {sellers.map((seller, i) => (
              <Listbox.Option key={`${seller._id}-${i}`} value={seller.full_name} className={({active}) => (active ? 'active' : '')} >
                {({selected}) => (selected ? <> {seller.full_name} <span>✓</span></> : <>{seller.full_name}</>)}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </Listbox>
    </StyledListbox>
  </>
  
}

export default UpdateSeller
