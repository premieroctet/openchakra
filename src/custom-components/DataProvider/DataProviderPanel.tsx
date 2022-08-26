import { Select } from '@chakra-ui/react'
import React, { memo, useState, useEffect } from 'react'
import axios from 'axios'
import { useForm } from '../../hooks/useForm'
import FormControl from '../../components/inspector/controls/FormControl'
import usePropsSelector from '../../hooks/usePropsSelector'

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
          {models.map(mdl => (
            <option>{mdl}</option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default memo(DataProviderPanel)
