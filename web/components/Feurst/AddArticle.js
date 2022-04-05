import React, {useState, useEffect} from 'react'
import {useCombobox} from 'downshift'
import useAsync from '../../hooks/use-async.hook'
import useDebounce from '../../hooks/use-debounce.hook'
import {client} from '../../utils/client'
import {PleasantButton} from './Button'
import SpinnerEllipsis from '../Spinner/SpinnerEllipsis'
import styled from 'styled-components'
import {screen} from '../../styles/screenWidths'

const FormAddArticle = styled.form`
  display: grid;
  grid-template-columns: var(--grid-cols-1);
  align-items: center;
  justify-content: space-around;
  width: 100%;
  margin-bottom: var(--spc-10);

  @media (${screen.lg}) {
    grid-template-columns: var(--grid-cols-3);
  }

`

const AddArticle = ({addProduct, checkProduct}) => {


  const [article, setArticle] = useState({
    item: null,
    qty: 1,
  })

  const {
    data,
    isLoading,
    isError,
    run,
  } = useAsync({data: []})
 

  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query, 1000)


  const {
    isOpen,
    getToggleButtonProps,
    selectItem,
    getLabelProps,
    getInputProps,
    getComboboxProps,
    highlightedIndex,
    getItemProps,
    selectedItem,
    getMenuProps,
    reset,
  } = useCombobox({
    items: data,
    itemToString: item => (item ? `${item.reference}` : ''),
    onInputValueChange: ({inputValue, type, selectedItem}) => {
      // Si ce n'est pas un reset
      // Si on ne vient pas de taper entrée et qu'on a un item
      if (
        type !== '__function_reset__' ||
        (type !== '__input_keydown_enter__' && selectedItem !== null)
      ) {
        setQuery(inputValue)
      }
    },
    onSelectedItemChange: ({selectedItem}) => {
      setArticle({...article, item: selectedItem})
    },
  })

  useEffect(() => {

    if (debouncedQuery) {
      run(client(`myAlfred/api/products?pattern=${query}`))
    }
  }
  , [debouncedQuery, query, run, selectedItem])

  if (isLoading) { return (<SpinnerEllipsis />) }
  if(isError) { return (<p>Les produits ne se sont pas chargés.</p>) }


  return (
    <FormAddArticle>

      <div className="grid grid-cols-1">
       
        <label {...getLabelProps} htmlFor="address" className="mb-4">
          <span className="font-mono text-sm">
          Réf. Catalogue
          </span></label>
        <div {...getComboboxProps()} className="flex mt-1">
          <input
            {...getInputProps()}
            className="flex-1 inline-block h-12 border-orange-600 border-2 focus:ring-2 ring-orange-700 p-2"
            placeholder="Ex: 001357NE00…"
          />
          <button
            {...getToggleButtonProps()}
            type="button"
            aria-label="toggle menu"
          >
            &#8595;
          </button>
          <button
            className="w-12 grid place-items-center border-orange-600 border-2 focus:ring-2 ring-orange-700 hover:bg-orange-400"
            type="button"
            onClick={() => {
              selectItem(null)
              setQuery('')
              // setArticle({...article, item: null})
              // resetData()
              // reset()
            }}
            aria-label="effacer l'addresse"
          >
              x
          </button>
            
        </div>
        <div />
        <ul
          {...getMenuProps()}
          className="leading-10 divide-y-2 divide-dotted divide-orange-700"
        >
          {
            isOpen &&
          data.map((item, index) => (
            <li
              key={`${item.reference}-${index}`}
              {...getItemProps({item, index})}
              style={
                highlightedIndex === index
                  ? {background: 'rgba(239, 125, 0, 0.3)', color: 'black'}
                  : {}
              }
            >
              <span>{item.reference} {item.description}</span>
            </li>
          ))
          }
        </ul>
      </div>
        
      {/* <DropdownCombobox formLabel={'Réf. Catalogue'} items={data} query={query} setQuery={setQuery} itemToString={itemToString} selectedItem={article} clickedItem={setArticle}/> */}
      {/* <Autocomplete
          id='articleRef'
          getOptionLabel={option => `${option.reference} - ${option.description} ${option.description_2}`}
          variant="outlined"
          options={data}
          value={article.item}
          onChange={(ev, value) => setArticle({...article, item: value})}
          onInputChange={(ev, value) => setQuery(value)}
          renderInput={params => (<TextField {...params} />)}
          renderOption={option => <span>{option.reference} - {option.description} {option.description_2}</span>}
        /> */}

      <label htmlFor="articleQty">Quantité
        <input type="number" id='articleQty' value={article.qty} onChange={ev => setArticle({...article, qty: ev.target.value})} />
      </label>

      <PleasantButton onClick={() => addProduct(article)}>Ajouter</PleasantButton>

    </FormAddArticle>
  )

}

export default AddArticle
