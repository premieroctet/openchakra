import React, {useState, useEffect, Fragment} from 'react'
import {Autocomplete} from '@material-ui/lab'
import {TextField} from '@material-ui/core'
import useAsync from '../../hooks/use-async.hook'
import {client} from '../../utils/client'
import {getPureAuthToken} from '../../utils/authentication'
import {PleasantButton} from './Button'


const AddArticle = ({checkProduct}) => {

  const {
    data,
    setData,
    error,
    isLoading,
    isError,
    isSuccess,
    run,
  } = useAsync({data: []})

  const [query, setQuery] = useState('')

  useEffect(() => {
    run(client('myAlfred/api/products', {token: getPureAuthToken()}))
  }
  , [run, client])

  if (isLoading) { return (<span>...</span>) }

  if(isError) { return (<span>Une erreur s'est produite</span>) }

  return (<>
    <Autocomplete
      options={data.map(p => p.description_2)}
      value={''}
      renderInput={params => (<TextField {...params} />)}
      onChange={(ev, value) => console.log(ev, value)}
      onInputChange={(ev, value) => console.log(ev, value)}
    />

    <input type="number" />

    <PleasantButton onClick={e => checkProduct(e)}>Vérifier</PleasantButton>

  </>
  )

}

export default AddArticle
