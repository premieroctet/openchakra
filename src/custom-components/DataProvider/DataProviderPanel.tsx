import { Select } from '@chakra-ui/react'
import React, { memo, useState, useEffect } from 'react'

import axios from 'axios'

import { useForm } from '../../hooks/useForm'
import FormControl from '../../components/inspector/controls/FormControl'
import useDispatch from '../../hooks/useDispatch'
import usePropsSelector from '../../hooks/usePropsSelector'

const capitalize = (word: string) => {
  return word.replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()))
}

const DataProviderPanel = () => {
  const { setValueFromEvent } = useForm()
  const model = usePropsSelector('model')
  const [models, setModels] = useState([])

  useEffect(() => {
    axios
      .get('https://localhost/myAlfred/api/studio/models')
      .then(res => {
        setModels(res.data)
      })
      .catch(err => {
        console.error(err)
      })
  }, [])

  return (
    <>
      <FormControl htmlFor="model" label="Model">
        <Select
          id="model"
          onChange={setValueFromEvent}
          name="model"
          size="sm"
          value={model || ''}
        >
          <option value={null}></option>
          {models.map(mdl => (
            <option value={mdl}>{capitalize(mdl)}</option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default memo(DataProviderPanel)
