import React, { memo, useState } from 'react'
import { 
  Button,
  Input, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton, 
  useDisclosure,
} from '@chakra-ui/react'
import { useForm } from '~hooks/useForm'
import FormControl from '~components/inspector/controls/FormControl'
import usePropsSelector from '~hooks/usePropsSelector'
import Medias from '~components/medias/Medias'



const TimerPanel = () => {

  const { setValueFromEvent } = useForm()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const src = usePropsSelector('src')
  const alt = usePropsSelector('alt')
  const htmlHeight = usePropsSelector('htmlHeight')
  const htmlWidth = usePropsSelector('htmlWidth')
  const [mediaSrc, setMediaSrc] = useState(null)

  return (
    <>
      <FormControl label="Alt" htmlFor="alt">
        <Input
          value={alt || ''}
          size="sm"
          name="alt"
          onChange={setValueFromEvent}
        />
      </FormControl>
      
    </>
  )
}

export default memo(TimerPanel)
