import React, { useRef, useEffect } from 'react'
import { Input } from '@chakra-ui/core'
import FormControl from './FormControl'
import { useForm } from '../../../hooks/useForm'
import usePropsSelector from '../../../hooks/usePropsSelector'
import { useSelector } from 'react-redux'
import { getShowInputText } from '../../../core/selectors/app'

const ChildrenControl: React.FC = () => {
  const textInput = useRef<HTMLInputElement>(null)
  const focusInput = useSelector(getShowInputText)
  const { setValueFromEvent } = useForm()
  const children = usePropsSelector('children')

  useEffect(() => {
    if (focusInput && textInput.current) {
      textInput.current.focus()
    }
  }, [focusInput])

  return (
    <FormControl htmlFor="children" label="Text">
      <Input
        id="children"
        name="children"
        size="sm"
        value={children || ''}
        type="text"
        onChange={setValueFromEvent}
        ref={textInput}
      />
    </FormControl>
  )
}

export default ChildrenControl
