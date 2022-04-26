import React, {useState, useEffect} from 'react'
import {useCombobox} from 'downshift'
import {StyledAutocomplete} from '../Autocomplete/Autocomplete.styles'
import isEmpty from '../../server/validation/is-empty'
import useAsync from '../../hooks/use-async.hook'
import useDebounce from '../../hooks/use-debounce.hook'
import {client} from '../../utils/client'
import {API_PATH} from '../../utils/consts'
import SpinnerEllipsis from '../Spinner/SpinnerEllipsis'

const DeliveryAddresses = ({state, setState}) => {
  
  const {
    data,
    isLoading,
    isError,
    run,
  } = useAsync({data: []})
  
  const [searchTerm, setSearchTerm] = useState('')
  const [labelAddress, setLabelAddress] = useState('')
  const debouncedQuery = useDebounce(searchTerm, 1000)
  
  const {
    isOpen,
    getToggleButtonProps,
    selectItem,
    getLabelProps,
    getInputProps,
    getComboboxProps,
    getItemProps,
    selectedItem,
    getMenuProps,
  } = useCombobox({
    items: data,
    onInputValueChange: ({inputValue, selectedItem}) => {

      setState({...state, address: {...state.address, label: inputValue}})
      setSearchTerm(inputValue)
    },
    itemToString: item => (item ? `${item.label}` : ''),
    onSelectedItemChange: ({selectedItem}) => {
      // setState({...state, address: {...state.address, ...selectedItem}})
    },
    // selectedItem: !isEmpty(state.address) ? state.address : null,
  })
  
      
  useEffect(() => {
    if (debouncedQuery && searchTerm.length > 0) {
      run(client(`${API_PATH}/users/addresses`))
        .catch(e => {
          console.error(`Can't fetch addresses in autocomplete`)
        })
    }
  }
  , [debouncedQuery, searchTerm, run, selectedItem])
  
  const labelAutocomplete = 'complete'
  
  return (
    <StyledAutocomplete noborder={true}>
      {isError ? <p className='error'>{errorMsg}</p> : null }
         
      <label {...getLabelProps} htmlFor={`auto${labelAutocomplete}`} className="sr-only">
        Adresse
      </label>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps()}
          id={`auto${labelAutocomplete}`}
          placeholder={`Nom de l'adresse`}
        />
        <span className='loading'>{isLoading ? <SpinnerEllipsis /> : null}</span>
        <button
          {...getToggleButtonProps()}
          type="button"
          aria-label="afficher la liste"
        >
          <span role="img">&#9661;</span>
        </button>
        <button
          type="button"
          className=""
          onClick={() => {
            selectItem(null)
            setSearchTerm('')
          }}
          aria-label="effacer"
        >
          <span role="img">✕</span>
        </button>
  
              
      </div>
  
          
      <ul
        {...getMenuProps()}
      >
        {isOpen &&
            data.map((item, index) => (
              <li
                key={`searchres-${index}`}
                {...getItemProps({item, index})}
              >
                {item => `${item.label} : ${item.address}, ${item.zip_code} ${item.city}`}
              </li>
            ))
        }
      </ul>
    </StyledAutocomplete>
      
  )
    

}


export default DeliveryAddresses
