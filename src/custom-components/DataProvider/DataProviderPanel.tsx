import { Select, useToast } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { memo, useState, useEffect } from 'react'

import { getComponents } from '~core/selectors/components'
import { getModelNames } from '~core/selectors/dataSources'
import axios from 'axios'

import { useForm } from '../../hooks/useForm'
import { validate } from '../../utils/validation'
import FormControl from '../../components/inspector/controls/FormControl'
import useDispatch from '../../hooks/useDispatch'
import usePropsSelector from '../../hooks/usePropsSelector'

const capitalize = (word: string) => {
  return word.replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()))
}

const DataProviderPanel = () => {
  const { setValueFromEvent } = useForm()
  const model = usePropsSelector('model')
  const components = useSelector(getComponents)
  const modelNames = useSelector(getModelNames)
  const toast = useToast()

  const setDataModel = event => {
    const model_id = event.target.value
    setValueFromEvent(event)
  }

  return (
    <>
      <FormControl htmlFor="model" label="Model">
        <Select
          id="model"
          onChange={setDataModel}
          name="model"
          size="sm"
          value={model || ''}
        >
          <option value={null}></option>
          {modelNames.map((mdl, i) => (
            <option key={`datm${i}`} value={mdl}>{capitalize(mdl)}</option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default memo(DataProviderPanel)
