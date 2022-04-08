import React, {useState, useEffect} from 'react'
import {useCombobox} from 'downshift'
import useAsync from '../../hooks/use-async.hook'
import useDebounce from '../../hooks/use-debounce.hook'
import {client} from '../../utils/client'
import {PleasantButton} from './Button'
import SpinnerEllipsis from '../Spinner/SpinnerEllipsis'
import {FormAddArticle, Label, Input, Refquantity, Refcatalog} from './AddArticle.styles'

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
  const debouncedQuery = useDebounce(query, 700)


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
  } = useCombobox({
    items: data,
    itemToString: item => (item ? `${item.reference}` : ''),
    onInputValueChange: ({inputValue, selectedItem}) => {
      if (selectedItem && inputValue.trim() === selectedItem.reference) {
        return
      }
      setQuery(inputValue)
    },
    onSelectedItemChange: ({selectedItem}) => {
      setArticle({...article, item: selectedItem})
    },
  })

  useEffect(() => {
    if (debouncedQuery && query.length > 0) {
      run(client(`myAlfred/api/products?pattern=${query}`))
    }
  }
  , [debouncedQuery, query, run, selectedItem])

  return (
    <FormAddArticle>
      
      <Refcatalog>
        {isError ? <p>Les produits ne se sont pas chargés.</p> : null }
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
              setQuery('')
              setArticle({...article, item: null})
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
              key={`${item.reference}-${index}`}
              {...getItemProps({item, index})}
            >
              {item.reference} - {item.description} {item.description_2}
            </li>
          ))
          }
        </ul>
      </Refcatalog>
      
      <Refquantity>
        <Label htmlFor="articleQty">Quantité</Label>
        <Input
          type="number"
          id='articleQty'
          placeholder='Qté souhaitée'
          value={article.qty}
          onChange={ev => !isNaN(parseInt(ev.target.value)) && setArticle({...article, qty: parseInt(ev.target.value)})}
        />
      </Refquantity>
      <PleasantButton rounded={'full'} onClick={() => addProduct(article)}>Ajouter</PleasantButton>

    </FormAddArticle>
  )

}

export default AddArticle
