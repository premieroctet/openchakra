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
  row-gap: var(--spc-2);
  margin-bottom: var(--spc-10);

  @media (${screen.lg}) {
    grid-template-columns: 2fr 2fr 1fr;
    align-items: baseline;
    column-gap: var(--spc-5)
  }
`

const Label = styled.label`
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  width: max-content;
`

const Input = styled.input`
  transition: border var(--delayIn) ease-in-out;
  padding: var(--spc-2);
  min-height: var(--minTapSize);
  outline: none;
  border: 1px solid var(--gray-800);
  width: min-content;

  &:focus {
    border-color: var(--brand-color);
  }
`

const Refquantity = styled.div`
  display: grid;
  align-items:center;
  column-gap: var(--spc-2);
  row-gap: var(--spc-2);
  grid-template-columns: 1fr;
  
  @media (${screen.sm}) {
    grid-template-columns: auto 1fr;
  }
`

const Refcatalog = styled.div`
  
  display: grid;
  align-items:center;
  column-gap: var(--spc-2);
  grid-template-columns: 1fr;
  grid-template-areas: 'downlabel' 
                       'downinput' 
                       'loading'
                       'downresults';
  position: relative;

  .loading {
    top: 0;
    position: absolute;
    grid-area: loading;
  }

  label {
    grid-area: downlabel;
  }
  
  /* Container for input */
  [role="combobox"] {
    width: min-content;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    grid-area: downinput;
    position: relative;
    & input {
      padding-right: 60px;
      color: var(--gray-800);
    }
  }

  [aria-expanded="true"] + [role="listbox"] {
    border: 1px solid var(--gray-800);
    border-top: 0;
  }
  
  [role="listbox"] {
    border-bottom-left-radius: var(--spc-2);
    border-bottom-right-radius: var(--spc-2);
    transition: all ease-in 1s;
    list-style-type: none;
    grid-area: downresults;
    max-height: 300px;
    overflow-y: scroll;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    background: var(--white);
    margin-top: 0;
    padding-inline: var(--spc-3);

    & li {
      font-size: var(--text-base);
      padding: var(--spc-2);
      border-bottom: 1px solid var(--gray-800);
    }
  }

  button {
    position: absolute;
    right: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 30px;
    min-height: var(--minTapSize);
    background: none;
    border: 0;
    font-size: var(--text-lg);
    color: var(--gray-800);
  }

  button + button {
    right: 0px;
  }

  @media (${screen.sm}) {
    grid-template-columns: max-content auto;
    grid-template-areas: 'downlabel downinput' 
    'loading downresults';
  }
  @media (${screen.lg}) {
    grid-template-columns: auto auto;
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


  console.log(getToggleButtonProps())

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
              style={
                highlightedIndex === index
                  ? {background: 'rgba(239, 125, 0, 0.3)', color: 'black'}
                  : {}
              }
            >
              <span>{item.reference} - {item.description} {item.description_2}</span>
            </li>
          ))
          }
        </ul>
      </Refcatalog>
      
      <Refquantity>
        <Label htmlFor="articleQty">Quantité</Label>
        <Input type="number" id='articleQty' value={article.qty} onChange={ev => setArticle({...article, qty: ev.target.value})} />
      </Refquantity>
      <PleasantButton onClick={() => addProduct(article)}>Ajouter</PleasantButton>

    </FormAddArticle>
  )

}

export default AddArticle
