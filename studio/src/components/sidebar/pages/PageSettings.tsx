import React, { useState } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Checkbox,
} from '@chakra-ui/react'
import useDispatch from '~hooks/useDispatch'
import { useSelector } from 'react-redux'
import { getPages, getRootPageId } from '~core/selectors/components'

const PageSettings = ({create, page, isOpen, onClose}: {create?: boolean, page?: string,  isOpen: boolean, onClose: () => void}) => {
  
  const pages = useSelector(getPages)
  const rootPageId = useSelector(getRootPageId)
  const [asRootPage, setAsRootPage] = useState(false)
  const {pageName, metaDescription, metaImageUrl, metaTitle} = page !== undefined  ? pages[page] : {pageName: '', metaDescription: '', metaImageUrl: '', metaTitle: ''}
  const [pageSettings, setPageSettings] = useState({pageName, metaDescription, metaImageUrl, metaTitle, asRootPage:false })
  const dispatch = useDispatch()

  const updatePageSettings = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value }: {name: string, value: string} = e.target
    setPageSettings({ ...pageSettings, [name]: value })
  }

  const formCommonStyles = {
    bgColor: '#eee', 
    borderRadius: '3xl'
  }

  return (
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={'white'} borderRadius={'3xl'}>
          <ModalHeader
            marginBlockStart={'12'}
            marginBlockEnd={'6'}
            bgColor={'#5bbdc5'}
            color={'white'}
            textAlign="center"
            textTransform={'uppercase'}
          >
            {create ? 'create page' : 'edit page'}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            p={8}
            display="flex"
            flexDirection={'column'}
            alignItems={'center'}
          >
            <FormControl mb={2}>
              <FormLabel ml={2}>Name</FormLabel>
              <Input
                name="pageName"
                value={pageSettings.pageName}
                {...formCommonStyles}
                onChange={updatePageSettings}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel ml={2}>Meta Title</FormLabel>
              <Input
                value={pageSettings.metaTitle}
                name="metaTitle"
                onChange={updatePageSettings}
                {...formCommonStyles}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel ml={2}>Meta Description</FormLabel>
              <Textarea
                value={pageSettings.metaDescription}
                name="metaDescription"
                resize="none"
                onChange={updatePageSettings}
                {...formCommonStyles}
                />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel ml={2}>Top Image</FormLabel>
              <Input
                value={pageSettings.metaImageUrl}
                name="metaImageUrl"
                onChange={updatePageSettings}
                {...formCommonStyles}
              />
            </FormControl>

            {rootPageId === page 
              ? <p>Définie en tant que racine</p>
              : <FormControl display={'flex'} alignItems="baseline" >
              <FormLabel ml={2}>Définir en tant que racine</FormLabel>
              <Checkbox
                isChecked={asRootPage}
                name="rootPage" 
                onChange={() => setAsRootPage(!asRootPage)}
              />
            </FormControl>
            }  

            
          </ModalBody>

          <ModalFooter justifyContent={'center'}>
            <Button
              bgColor={'orange.200'}
              paddingBlock={6}
              color="white"
              minW={'60%'}
              borderRadius={'full'}
              _hover={{
                bgColor: 'orange.300',
              }}
              _focus={{
                bgColor: 'orange.300',
              }}
              onClick={() => {
                const settings = { ...pageSettings, pageId: page, asRootPage }
                if (create) {
                  dispatch.project.addPage(settings)
                } else {
                  dispatch.project.editPageSettings(settings)
                }
                onClose()
              }}
            >
              {create ? 'create' : 'edit'}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    
  )
}

export default PageSettings
