import { Select, Checkbox } from '@chakra-ui/react'
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
  const { setValueFromEvent, setValue } = useForm()
  const model = usePropsSelector('model')
  const ignoreUrlParams = usePropsSelector('ignoreUrlParams')
  const modelNames = useSelector(getModelNames)

  const setIgnoreUrlParams = event => {
    setValue('ignoreUrlParams', event.target.checked)
  }

  const cbLabel = `Ignore '${model}' param in URL`
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
          <option value={undefined}></option>
          {modelNames.map((mdl, i) => (
            <option key={`datm${i}`} value={mdl}>
              {capitalize(mdl)}
            </option>
          ))}
        </Select>
      </FormControl>
      {model && (
        <FormControl htmlFor="ignoreUrlParams" label={cbLabel}>
          <Checkbox
            id="ignoreUrlParams"
            name="ignoreUrlParams"
            isChecked={ignoreUrlParams}
            onChange={setIgnoreUrlParams}
          ></Checkbox>
        </FormControl>
      )}
    </>
  )
}

export default memo(DataProviderPanel)
