import React, {useState, useEffect} from 'react'
import {useCombobox} from 'downshift'
import {StyledAutocomplete} from '../Autocomplete/Autocomplete.styles'
import {API_PATH} from '../../utils/consts'
import {client} from '../../utils/client'
import {snackBarError} from '../../utils/notifications'
import useAsync from '../../hooks/use-async.hook'
import useDebounce from '../../hooks/use-debounce.hook'
import {PleasantButton} from './Button'
import {FormAddArticle, Label, Input, Refquantity} from './components.styles'
import CheckingProduct from './CheckingProduct'


const AddArticle = ({endpoint, orderid, updateTable, addProduct, wordingSection}) => {

  
  const [article, setArticle] = useState({
    item: null,
    info: null,
    quantity: null,
    showArticlePanel: false,
  })

  const {
    data,
    isLoading,
    isError,
    run,
  } = useAsync({data: []})

  const [searchTerm, setSearchTerm] = useState('')
  const debouncedQuery = useDebounce(searchTerm, 1000)
  const disabled = false

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
    itemToString: item => (item ? `${item.reference}` : ''),
    onSelectedItemChange: ({selectedItem}) => {
      setArticle({...article, item: selectedItem})
    },
  })

  useEffect(() => {
    if (debouncedQuery && searchTerm.length > 0) {
      run(client(`${API_PATH}/products?pattern=${searchTerm}`))
        .catch(e => {
          console.error(`Can't fetch data in autocomplete`, e)
        })
    }
  }, [debouncedQuery, searchTerm, run, selectedItem])


  const checkProduct = async article => {

    if (article?.item?._id) {
      await client(`${API_PATH}/${endpoint}/${orderid}/products/${article.item._id}`)
        .then(articleInfoCheck => setArticle({...article, info: articleInfoCheck, showArticlePanel: true}))
        .catch(errorMsg => {
          snackBarError(errorMsg.message)
        })
    }

  }


  const checkProductEnabled = article?.item && article?.quantity

  return (
    <>
      <FormAddArticle>

        <StyledAutocomplete>
          <label {...getLabelProps} htmlFor={`autosearchitem`}>
          Réf. catalogue
          </label>
          <div {...getComboboxProps()}>
            <input
              {...getInputProps()}
              id={`autosearchitem`}
              placeholder={'Saissisez la référence du produit'}
              disabled={disabled}
            />
            <span className='loading'>{isLoading ? '...' : null}</span>
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
              {`${item.reference} - ${item.description} ${item.description_2}`}
            </li>
          ))
            }
          </ul>
        </StyledAutocomplete>

        <Refquantity>
          <Label htmlFor="articleQty">Quantité</Label>
          <Input
            type="number"
            id='articleQty'
            placeholder='Qté souhaitée'
            value={article?.quantity || ''}
            disabled={false}
            onChange={ev => !isNaN(parseInt(ev.target.value)) && setArticle({...article, quantity: parseInt(ev.target.value)})}
          />
        </Refquantity>
        <PleasantButton disabled={!checkProductEnabled} rounded={'full'} onClick={() => checkProduct(article)}>Vérifier</PleasantButton>


      </FormAddArticle>
      {article.showArticlePanel ? <CheckingProduct endpoint={endpoint} orderid={orderid} updateTable={updateTable} article={article} setArticle={setArticle} selectItem={selectItem} addProduct={addProduct} wordingSection={wordingSection} /> : null}

    </>
  )

}

export default AddArticle
