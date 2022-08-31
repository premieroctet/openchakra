import { Select } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { memo, useState, useEffect } from 'react'
import { getModelNames } from '~core/selectors/datasources'

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
  const modelNames = useSelector(getModelNames)

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
          {modelNames.map(mdl => (
            <option value={mdl}>{capitalize(mdl)}</option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default memo(DataProviderPanel)
