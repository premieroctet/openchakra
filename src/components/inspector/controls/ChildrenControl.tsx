import React, { useRef, useEffect } from 'react'
import { Input } from '@chakra-ui/core'
import FormControl from './FormControl'
import useDispatch from '../../../hooks/useDispatch'
import { useForm } from '../../../hooks/useForm'
import usePropsSelector from '../../../hooks/usePropsSelector'
import { useSelector } from 'react-redux'
import { getShowInputText } from '../../../core/selectors/app'

const ChildrenControl: React.FC = () => {
  const dispatch = useDispatch()
  const textInput = useRef<HTMLInputElement>(null)
  const focusInput = useSelector(getShowInputText)
  const { setValueFromEvent } = useForm()
  const children = usePropsSelector('children')
  const onKeyUp = (event: any) => {
    if (event.keyCode === 13) {
      dispatch.app.toggleInputText(false)
    }
  }
  useEffect(() => {
    if (focusInput && textInput.current) {
      textInput.current.focus()
    } else if (focusInput === false && textInput.current) {
      textInput.current.blur()
    }
  }, [focusInput])

  return (
    <FormControl htmlFor="children" label="Text">
      <Input
        id="children"
        name="children"
        size="sm"
        value={children}
        type="text"
        onChange={setValueFromEvent}
        ref={textInput}
        onKeyUp={onKeyUp}
      />
    </FormControl>
  )
}

export default ChildrenControl
