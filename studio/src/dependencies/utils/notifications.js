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

// TODO configure error color in project
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
           <Button color='#DAB679' ml={3} onClick={onClose}>Ok</Button>
         </AlertDialogFooter>
       </AlertDialogContent>
     </AlertDialog>
  )

}
