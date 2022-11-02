import { Select } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { memo } from 'react'
import { getModelNames } from '~core/selectors/dataSources'
import { useForm } from '../../hooks/useForm'
import FormControl from '../../components/inspector/controls/FormControl'
import usePropsSelector from '../../hooks/usePropsSelector'

const capitalize = (word: string) => {
  return word.replace(/\w\S*/g, w => w.replace(/^\w/, c => c.toUpperCase()))
}

const DataProviderPanel = () => {
  const { setValueFromEvent } = useForm()
  const model = usePropsSelector('model')
  const modelNames = useSelector(getModelNames)

  const setDataModel = event => {
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
          <option value={undefined}></option>
          {modelNames.map((mdl, i) => (
            <option key={`datm${i}`} value={mdl}>
              {capitalize(mdl)}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default memo(DataProviderPanel)
