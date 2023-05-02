import { Select, Checkbox } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { memo } from 'react'
import { getPages } from '../../core/selectors/components';
import { pagesList } from '../../utils/actions';
import { useForm } from '../../hooks/useForm'
import FormControl from '../../components/inspector/controls/FormControl'
import usePropsSelector from '../../hooks/usePropsSelector'

const RedirectPanel = () => {
  const { setValueFromEvent, setValue, removeValue } = useForm()
  const autoRedirectPage = usePropsSelector('autoRedirectPage')
  const pages = useSelector(getPages)
  return (
    <>
      <FormControl htmlFor="autoRedirectPage" label="Si connecté">
        <Select
          id="autoRedirectPage"
          onChange={setValueFromEvent}
          name="autoRedirectPage"
          size="sm"
          value={autoRedirectPage || ''}
        >
          <option value={undefined}></option>
          {pagesList({pages}).map((p, i) => (
            <option key={p.key} value={p.key}>
              {p.label}
            </option>
          ))}
        </Select>
      </FormControl>
    </>
  )
}

export default memo(RedirectPanel)
