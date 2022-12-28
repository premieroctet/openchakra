import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  IconButton,
  useDisclosure,
} from '@chakra-ui/react'
import React, { useRef } from 'react'
import API from '~custom-components/api'
import useDispatch from '~hooks/useDispatch'
import { useSelector } from 'react-redux'
import {
  getCustomComponents,
  getInstalledComponents,
  getSelectedCustomComponentId,
} from '~core/selectors/customComponents'
import { DeleteIcon } from '@chakra-ui/icons'

const DeleteComponent = ({
  name,
  isInstalled = false,
}: {
  name: string
  isInstalled?: boolean
}) => {
  const selectedComponent = useSelector(getSelectedCustomComponentId)
  const customComponents = useSelector(getCustomComponents)
  const installedComponents = useSelector(getInstalledComponents)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const dispatch = useDispatch()
  const cancelRef = useRef<any>(null)

  const handleDeleteClick = async () => {
    dispatch.app.toggleLoader()
    if (isInstalled) {
      dispatch.customComponents.updateInstalledComponents(name, false)
      await API.post('/uninstall-component', {
        path: installedComponents[name],
      })
    } else {
      dispatch.customComponents.deleteCustomComponent(name)
      await API.post('/delete-component', {
        path: customComponents[name],
      })
    }
    dispatch.app.toggleLoader()
  }

  return (
    <>
      <IconButton
        aria-label="Delete"
        onClick={onOpen}
        disabled={name === selectedComponent}
      >
        <DeleteIcon color="red" />
      </IconButton>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent bgColor="white">
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Component
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You cannot undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} color="teal.300">
                Cancel
              </Button>
              <Button
                color="red"
                onClick={() => {
                  handleDeleteClick()
                  onClose()
                }}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

export default DeleteComponent
