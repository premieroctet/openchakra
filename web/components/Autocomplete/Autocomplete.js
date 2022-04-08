import React, {useState, useEffect} from 'react'
import {useCombobox} from 'downshift'
import useAsync from '../../hooks/use-async.hook'
import useDebounce from '../../hooks/use-debounce.hook'
import {client} from '../../utils/client'
import SpinnerEllipsis from '../Spinner/SpinnerEllipsis'
import {Label, Input} from '../Feurst/AddArticle.styles'


const Autocomplete = ({paramsCombobox, errorMsg, urlToFetch}) => {

  const {
    data,
    isLoading,
    isError,
    run,
  } = useAsync({data: []})
     

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedQuery = useDebounce(searchTerm, 700)

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
      if (selectedItem && inputValue.trim() === selectedItem.reference) {
        return
      }
      setSearchTerm(inputValue)
    },
    ...paramsCombobox,
  })
    
  useEffect(() => {
    if (debouncedQuery && searchTerm.length > 0) {
      run(client(`${urlToFetch}${searchTerm}`))
    }
  }
  , [debouncedQuery, searchTerm, run, selectedItem, urlToFetch])

  return (
    <>
      {isError ? <p>{errorMsg}</p> : null }
      {isLoading ? (<SpinnerEllipsis />) : <span className='loading'></span>}
       
      <Label {...getLabelProps} htmlFor="refcatalog">
          Réf. Catalogue
      </Label>
      <div {...getComboboxProps()}>
        <Input
          {...getInputProps()}
          id="refcatalog"
          placeholder="Ex: 001357NE00…"
        />
        <button
          {...getToggleButtonProps()}
          type="button"
          aria-label="afficher la liste des références"
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
              {item.reference} - {item.description} {item.description_2}
            </li>
          ))
        }
      </ul>
    </>
  )


}

export default Autocomplete
