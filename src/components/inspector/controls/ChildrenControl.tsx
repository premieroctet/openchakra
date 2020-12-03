import React, { useRef, useEffect, KeyboardEvent } from 'react'
import { Input } from '@chakra-ui/react'
import useDispatch from '~hooks/useDispatch'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import { useSelector } from 'react-redux'
import { getInputTextFocused } from '~core/selectors/app'
import FormControl from './FormControl'

const ChildrenControl: React.FC = () => {
  const dispatch = useDispatch()
  const textInput = useRef<HTMLInputElement>(null)
  const focusInput = useSelector(getInputTextFocused)
  const { setValueFromEvent } = useForm()
  const children = usePropsSelector('children')
  const onKeyUp = (event: KeyboardEvent) => {
    if (event.keyCode === 13 && textInput.current) {
      textInput.current.blur()
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
        onBlur={() => {
          dispatch.app.toggleInputText(false)
        }}
      />
    </FormControl>
  )
}

export default ChildrenControl
