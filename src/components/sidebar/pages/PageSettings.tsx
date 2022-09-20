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
import { getPages } from '~core/selectors/components'

const PageSettings = ({create, page, isOpen, onClose}: {create?: boolean, page?: string,  isOpen: boolean, onClose: () => void}) => {
  
  const pages = useSelector(getPages)
  const {pageName, rootPage, metaDescription, metaImageUrl, metaTitle} = page !== undefined  ? pages[page] : {pageName: '', rootPage: false, metaDescription: '', metaImageUrl: '', metaTitle: ''}
  const [pageSettings, setPageSettings] = useState({pageName, rootPage, metaDescription, metaImageUrl, metaTitle })
  const dispatch = useDispatch()

  const updatePageSettings = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value }: {name: string, value: string | boolean} = e.target
    let valueToKeep = value
    if (name === 'rootPage') {
      //@ts-ignore
      valueToKeep = !pageSettings.rootPage
    }
    setPageSettings({ ...pageSettings, [name]: valueToKeep })
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
            <FormControl display={'flex'} alignItems="baseline" >
              <FormLabel ml={2}>Principale</FormLabel>
              <Checkbox 
                name="rootPage" 
                isChecked={pageSettings.rootPage} 
                onChange={updatePageSettings} 
              />
            </FormControl>
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
                if (create) {
                  dispatch.components.addPage(pageSettings)
                } else {
                  //@ts-ignore
                  dispatch.components.editPageSettings({page_id: page, payload: pageSettings})
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
