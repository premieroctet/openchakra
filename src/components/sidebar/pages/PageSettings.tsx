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
  const {name, indexpage, meta_description, meta_image_url, meta_title} = page !== undefined  ? pages[page] : {name: '', indexpage: false, meta_description: '', meta_image_url: '', meta_title: ''}
  const [pageSettings, setPageSettings] = useState({name, indexpage, meta_description, meta_image_url, meta_title })
  const dispatch = useDispatch()

  const updatePageSettings = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value }: {name: string, value: string | boolean} = e.target
    let valueToKeep = value
    if (name === 'indexpage') {
      //@ts-ignore
      valueToKeep = !pageSettings.indexpage
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
                name="name"
                value={pageSettings.name}
                {...formCommonStyles}
                onChange={updatePageSettings}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel ml={2}>Meta Title</FormLabel>
              <Input
                value={pageSettings.meta_title}
                name="meta_title"
                onChange={updatePageSettings}
                {...formCommonStyles}
              />
            </FormControl>
            <FormControl mb={2}>
              <FormLabel ml={2}>Meta Description</FormLabel>
              <Textarea
                value={pageSettings.meta_description}
                name="meta_description"
                resize="none"
                onChange={updatePageSettings}
                {...formCommonStyles}
                />
            </FormControl>
            <FormControl mb={3}>
              <FormLabel ml={2}>Top Image</FormLabel>
              <Input
                value={pageSettings.meta_image_url}
                name="meta_image_url"
                onChange={updatePageSettings}
                {...formCommonStyles}
              />
            </FormControl>
            <FormControl display={'flex'} alignItems="baseline" >
              <FormLabel ml={2}>Principale</FormLabel>
              <Checkbox 
                name="indexpage" 
                isChecked={pageSettings.indexpage} 
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
