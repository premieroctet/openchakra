import React, { useId, memo } from 'react'
import FormControl from '~components/inspector/controls/FormControl'
import MediaModal from '~components/inspector/inputs/MediaModal'
import { useForm } from '~hooks/useForm'
import usePropsSelector from '~hooks/usePropsSelector'
import { 
    Button,
    Input, 
    useDisclosure,
  } from '@chakra-ui/react'


const ImageControl = ({
  label,
  name,
}: {
  label: string
  name: string
}) => {
  
  const id = useId()
  const value = usePropsSelector(name)
  const { setValueFromEvent } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <FormControl label={label} htmlFor={id}>
        <Input
          id={id}
          placeholder="Image URL"
          value={value || ''}
          size="sm"
          name={name}
          onChange={setValueFromEvent}
        />
        <Button size={'xs'} onClick={onOpen}>...</Button>
      </FormControl>
      <MediaModal isOpen={isOpen} onClose={onClose} />
    </>
  )
}

export default memo(ImageControl)
