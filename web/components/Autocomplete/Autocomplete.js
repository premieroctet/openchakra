import React, {useState, useEffect} from 'react'
import {useCombobox} from 'downshift'
import useAsync from '../../hooks/use-async.hook'
import useDebounce from '../../hooks/use-debounce.hook'
import {client} from '../../utils/client'
import SpinnerEllipsis from '../Spinner/SpinnerEllipsis'
import isEmpty from '../../server/validation/is-empty'


const Autocomplete = ({
  paramsCombobox,
  urlToFetch,
  dbSearchField,
  errorMsg,
  label,
  placeholder,
  formattingResult,
  onChange,
  disabled,
} = {placeholder: '…', dbSearchField: false, disabled: false}) => {

  const {
    data,
    isLoading,
    isError,
    run,
  } = useAsync({data: []})

  const [searchTerm, setSearchTerm] = useState('')
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
      if (selectedItem && inputValue.trim() === selectedItem[dbSearchField]) {
        return
      }
      setSearchTerm(inputValue)
      onChange && onChange(inputValue)
    },
    ...paramsCombobox,
  })

    
  useEffect(() => {
    if (debouncedQuery && searchTerm.length > 0) {
      run(client(`${urlToFetch}${isEmpty(dbSearchField) ? '' : searchTerm}`))
        .catch(e => {
          console.error(`Can't fetch data in autocomplete`)
        })
    }
  }
  , [debouncedQuery, searchTerm, run, selectedItem, urlToFetch, dbSearchField, errorMsg])

  const labelAutocomplete = dbSearchField ? dbSearchField : 'complete'

  return (
    <>
      {isError ? <p className='error'>{errorMsg}</p> : null }
       
      <label {...getLabelProps} htmlFor={`auto${labelAutocomplete}`}>
        {label}
      </label>
      <div {...getComboboxProps()}>
        <input
          {...getInputProps()}
          id={`auto${labelAutocomplete}`}
          placeholder={placeholder}
          disabled={disabled}
        />
        <span className='loading'>{isLoading ? <SpinnerEllipsis /> : null}</span>
        <button
          {...getToggleButtonProps()}
          type="button"
          disabled={disabled}
          aria-label="afficher la liste"
        >
          <span role="img">&#9661;</span>
        </button>
        <button
          type="button"
          disabled={disabled}
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
              {formattingResult(item)}
            </li>
          ))
        }
      </ul>
    </>
  )


}

export default Autocomplete
