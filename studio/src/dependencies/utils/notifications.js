import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react'

export const Error = ({title='Erreur', message, onClose}) => {

  return (
    <AlertDialog
       motionPreset='slideInBottom'
       isOpen={true}
       onClose={onClose}
       isCentered
     >
       <AlertDialogOverlay />
       <AlertDialogContent>
         <AlertDialogHeader>{title}</AlertDialogHeader>
         <AlertDialogCloseButton />
         <AlertDialogBody>{message}</AlertDialogBody>
         <AlertDialogFooter>
           <Button colorScheme='red' ml={3} onClick={onClose}>Ok</Button>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
  )

}
