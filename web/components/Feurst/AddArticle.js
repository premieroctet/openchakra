import React, {useState, useEffect} from 'react'
import {Autocomplete} from '@material-ui/lab'
import {TextField} from '@material-ui/core'
import useAsync from '../../hooks/use-async.hook'
import useDebounce from '../../hooks/use-debounce.hook'
import {client} from '../../utils/client'
import {getPureAuthToken} from '../../utils/authentication'
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
  const debouncedSearchTerm = useDebounce(query, 1000)

  useEffect(() => {
    if (debouncedSearchTerm) {
      run(client(`myAlfred/api/products?pattern=${query}`))
    }
  }
  , [debouncedSearchTerm, query, run])

  if (isLoading) { return (<SpinnerEllipsis />) }
  if(isError) { return (<p>Les produits ne se sont pas chargés.</p>) }


  return (
    <FormAddArticle>
      <label htmlFor="articleRef">Réf. Catalogue
        <Autocomplete
          id='articleRef'
          getOptionLabel={option => `${option.reference} - ${option.description} ${option.description_2}`}
          variant="outlined"
          options={data}
          value={article.item}
          onChange={(ev, value) => setArticle({...article, item: value})}
          onInputChange={(ev, value) => setQuery(value)}
          renderInput={params => (<TextField {...params} />)}
          renderOption={option => <span>{option.reference} - {option.description} {option.description_2}</span>}
        />
      </label>

      <label htmlFor="articleQty">Quantité
        <input type="number" id='articleQty' value={article.qty} onChange={ev => setArticle({...article, qty: ev.target.value})} />
      </label>

      <PleasantButton onClick={() => addProduct(article)}>Ajouter</PleasantButton>

    </FormAddArticle>
  )

}

export default AddArticle
