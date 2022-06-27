import {Grid} from '@material-ui/core'
import {useDebouncedCallback} from 'use-debounce'
import Autocomplete from 'react-autocomplete'
import React, {useState} from 'react'
import axios from 'axios'

import {setAxiosAuthentication} from '../../utils/authentication'

const LocationSelect = props => {

  const [value, setValue] = useState(null)
  const [items, setItems] = useState([])

  const getSuggestions = query => {
    setAxiosAuthentication()

    axios.get('/myAlfred/api/users/locations', {params: {value: query, type: props.type}})
      .then(res => {
        setItems(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }

  const debouncedSuggestions = useDebouncedCallback(
    query => {
      getSuggestions(query)
    }
    , 500)

  const onChange = query => {
    setValue(query)
    query=query.trim()
    if (query) {
      debouncedSuggestions(query)
    }
    else {
      setItems([])
      props.onClear && props.onClear()
    }
  }

  const formatAddress = addr => {
    if (!addr) { return '' }
    return props.type=='city' ? `${addr.city} ${addr.postcode}` : `${addr.name}, ${addr.city} ${addr.postcode}`
  }


  const onSelect = (val, item) => {
    setValue(formatAddress(item))
    props.onChange && props.onChange({suggestion: item})
  }

  return (
    <>
      <Autocomplete
        {...props}
        wrapperStyle={{width: '100%'}}
        inputProps={{...props, placeholder: props.placeholder,
          style: {width: '100%', height: '40px', outline: 'none', fontSize: '16px', fontFamily: 'Montserrat, sans-serif'}}}
        getItemValue={item => formatAddress(item) }
        items={items}
        renderItem={(item, isHighlighted) =>
          <div style={{background: isHighlighted ? 'lightgray' : 'white'}}>
            {formatAddress(item)}
          </div>
        }
        value={value}
        onChange={ev => onChange(ev.target.value)}
        onSelect={onSelect}
      />
    </>
  )
}

export default LocationSelect
