import React, {useState, useEffect} from 'react'
import {useCombobox} from 'downshift'
import useAsync from '../../hooks/use-async.hook'
import useDebounce from '../../hooks/use-debounce.hook'
import {client} from '../../utils/client'
import SpinnerEllipsis from '../Spinner/SpinnerEllipsis'
import {Label, Input} from '../Feurst/AddArticle.styles'


const Autocomplete = ({
  paramsCombobox,
  urlToFetch,
  dbSearchField,
  errorMsg,
  label,
  placeholder,
  disableFilter,
  formattingResult,
  onChange,
} = {placeholder: '…', disableFilter: false}) => {

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
      run(client(`${urlToFetch}${disableFilter ? '' : searchTerm}`))
    }
  }
  , [debouncedQuery, searchTerm, run, selectedItem, urlToFetch, disableFilter])


  return (
    <>
      {isError ? <p className='error'>{errorMsg}</p> : null }
       
      <Label {...getLabelProps} htmlFor={`auto${dbSearchField}`}>
        {label}
      </Label>
      <div {...getComboboxProps()}>
        <Input
          {...getInputProps()}
          id={`auto${dbSearchField}`}
          placeholder={placeholder}
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
          className=""
          type="button"
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
