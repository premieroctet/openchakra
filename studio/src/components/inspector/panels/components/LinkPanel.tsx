import React, { memo } from 'react'
import { Select } from '@chakra-ui/react'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import { useSelector } from 'react-redux'
import { getPages } from '~/core/selectors/components'
import { getPageUrl } from '../../../../utils/misc'

const LinkPanel = () => {
  const pages = useSelector(getPages)
  const { setValueFromEvent } = useForm()
  const href = usePropsSelector('href')

  return (
    <>
      <FormControl htmlFor={`href`} label={'Href'}>
        <Select
          id={`href`}
          size="xs"
          name={`href`}
          value={href || ''}
          onChange={setValueFromEvent}
          autoComplete="off"
        >

          {Object.values(pages).map(page => (
            <option key={page.pageId} value={page.pageId}>
            {page.pageName}
            </option>
          ))}
        </Select>
      </FormControl>
      <SwitchControl label="External" name="isExternal" />
    </>
  )
}

export default memo(LinkPanel)
