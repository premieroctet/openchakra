import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useForm } from '~hooks/useForm'
import Medias from '~components/medias/Medias'


// {isOpen: boolean, onClose: ()=> void}

const MediaModal = ({isOpen, onClose, setExternalValue}: {isOpen: boolean, onClose: ()=> void, setExternalValue?: any}) => {

    const { setValue } = useForm()

    return (<Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent minW={'60vw'} maxH={'90vh'} overflowY={'scroll'}>
          <ModalCloseButton />
          <ModalBody display={'flex'} flexDirection={'column'}>
          <Medias setMediaSrc={setExternalValue ? setExternalValue : setValue} mediaPanelClose={onClose}/>
          </ModalBody>
        </ModalContent>
        </Modal>)
}

export default MediaModal