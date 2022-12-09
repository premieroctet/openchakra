import React, { memo } from 'react'
import { Input } from '@chakra-ui/react'
import SwitchControl from '~components/inspector/controls/SwitchControl'
import FormControl from '~components/inspector/controls/FormControl'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import { useSelector } from 'react-redux'
import { getPages } from '~/core/selectors/components'

const LinkPanel = () => {
  const pages = useSelector(getPages)
  const { setValueFromEvent } = useForm()
  const href = usePropsSelector('href')

  return (
    <>
      <FormControl htmlFor={`href`} label={'Href'}>
        <Input
          id={`href`}
          list={`href-flavors`}
          size="xs"
          type="text"
          name={`href`}
          value={href || ''}
          onChange={setValueFromEvent}
          autoComplete="off"
        />

        <datalist id={`href-flavors`}>
          {Object.keys(pages).map(page => (
            <option key={pages[page].pageId} value={pages[page].pageName} />
          ))}
        </datalist>
      </FormControl>
      <SwitchControl label="External" name="isExternal" />
    </>
  )
}

export default memo(LinkPanel)
