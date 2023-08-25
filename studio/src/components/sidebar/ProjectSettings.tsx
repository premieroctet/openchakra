import { useSelector } from 'react-redux'
import { getFullComponents } from '~core/selectors/components'
import useDispatch from '~hooks/useDispatch'
import {
  Box,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Button,
  Textarea,
  Text,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { isJsonString } from '~dependencies/utils/misc'


const ProjectSettings = () => {

  const {
    settings: {
      name, 
      url, 
      description, 
      favicon32,
      metaImage,
      gaTag
    }
  } = useSelector(getFullComponents)
  
  const [projectSettings, setProjectSettings] = useState({
    name: name || process.env.NEXT_PUBLIC_PROJECT || '', 
    url,
    description,
    favicon32,
    metaImage,
    gaTag,
  })


  const dispatch = useDispatch()

  const updateProjectSettings = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> ) => {
    const { name, value }: {name: string, value: string} = e.target
    setProjectSettings({ ...projectSettings, [name]: JSON.stringify(value) })
  }

  const metaDataSlots = {
    name: {
      label: 'Project Name',
      component: Input,
      tip: 'Name',
      value: projectSettings.name
    },
    url: {
      label: 'Url',
      component: Input,
      tip: 'base url (ex: https://smartdiet.app)',
      value: projectSettings.url
    },
    description: {
      label: 'MetaDescription',
      component: Textarea,
      tip: 'Available on all pages when not specifically filled in a page',
      value: projectSettings.description
    },
    favicon32: {
      label: 'Favicon',
      component: Input,
      tip: 'format .png 32px x 32px',
      value: projectSettings.favicon32
    },
    metaImage: {
      label: 'MetaImage',
      component: Input,
      tip: 'OpenGraph image, 1200px x 600px',
      value: projectSettings.metaImage
    },
    gaTag: {
      label: 'gaTag',
      component: Input,
      tip: '(identifiant Google Analytics)',
      value: projectSettings.gaTag
    },
  }


    return (
      <Box
        overflowY="auto"
        overflowX="visible"
        boxShadow="xl"
        position="relative"
        flex="0 0 14rem"
        p={2}
        m={0}
        as="menu"
        bg="rgb(236, 236, 236)"
        w={'100%'}
        h={'100%'}
      >
        <Heading 
          as='h2' 
          color={'black'} 
          size={'md'}
          mb={'2'}
        >
          Project settings
        </Heading>

        {Object.entries(metaDataSlots).map(([formName, params]) => (
        <FormControl key={formName} mb={2}>
          <FormLabel color={'black'}  ml={2}>{params.label} <Text as="small" color={'#666'}>{params.tip}</Text></FormLabel>
          <params.component 
            p={2}
            name={formName}
            value={isJsonString(params.value) ? JSON.parse(params.value) : params.value }
            bgColor= '#ccc'
            color= '#000'
            borderRadius='3xl'
            onChange={updateProjectSettings}
          />
        </FormControl>
        ))}


        <Button
              bgColor={'var(--primary-color)'}
              paddingBlock={6}
              color="white"
              minW={'60%'}
              borderRadius={'full'}
              mb={'4'}
              onClick={() => {
                dispatch.project.editProjectSettings({...projectSettings})
              }}
                
            >
              Enregistrer
            </Button>


        <Heading 
          as='h2' 
          color={'black'} 
          size={'md'}
          mb={'2'}
        >
          Variables
        </Heading>
        
      </Box>
    )
}

export default ProjectSettings