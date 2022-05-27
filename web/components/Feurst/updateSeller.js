// @ts-check
import React, {useState, useEffect, Fragment} from 'react'
import {Listbox, Transition} from '@headlessui/react'
import {StyledListbox} from '../../styles/feurst/StyledComponents'


const UpdateSeller = ({
  value: initialValue,
  cell: {row},
  updateSeller, // This is a custom function that we supplied to our table instance
  sellers,
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = useState(initialValue)
  const [assignedSeller] = sellers.filter(seller => seller._id === initialValue)


  const onChangeSeller = e => {
    updateSeller({company_id: row.original.id, user_id: e.id})
    setValue(e)
  }


  // If the initialValue is changed external, sync it up with our state
  useEffect(() => {
    setValue(assignedSeller || initialValue)
  }, [assignedSeller, initialValue])

  return <>
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
  </>
  
}

export default UpdateSeller
