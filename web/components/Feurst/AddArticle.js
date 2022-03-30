import React, {useState, useEffect, Fragment} from 'react'
import {Autocomplete} from '@material-ui/lab'
import {TextField} from '@material-ui/core'
import useAsync from '../../hooks/use-async.hook'
import {client} from '../../utils/client'
import {getPureAuthToken} from '../../utils/authentication'


const AddArticle = () => {

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

  return (<>
    {isLoading ? (<span>...</span>) : null}
    {isError ? (<span>Une erreur s'est produite</span>) : null}

    <Autocomplete
      options={data.map(p => p.description_2)}
      value={''}
      renderInput={params => (<TextField {...params} />)}
      onChange={(ev, value) => console.log(ev, value)}
      onInputChange={(ev, value) => console.log(ev, value)}
    />

  </>
  )

}

export default AddArticle
