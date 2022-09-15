import React, { useState, ChangeEvent } from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  DarkMode,
  IconButton,
  Image,
} from '@chakra-ui/react'
import useDispatch from '~hooks/useDispatch'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import PageList from './PageList'
import CreatePage from './CreatePage'

type categoryItems = {
  [name: string]: string[]
}

const Pages = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const dispatch = useDispatch()

  return (
    <DarkMode>
      <Box
        overflowY="auto"
        overflowX="visible"
        boxShadow="xl"
        position="relative"
        display="grid"
        gridTemplateRows={'auto 1fr auto'}
        p={2}
        m={0}
        as="menu"
        bg="rgb(236, 236, 236)"
        w={'100%'}
        h={'100%'}
      >
        <InputGroup position="sticky" top="5px" zIndex={1} size="sm" mb={4}>
          <Input
            value={searchTerm}
            color="black"
            placeholder="All pages"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
            borderColor="rgba(255, 255, 255, 0.04)"
            borderRadius={'15px'}
            boxShadow="md"
            bg="rgba(255, 255, 255, 1)"
            _hover={{
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
            zIndex={0}
          />
          <InputRightElement zIndex={1}>
            {searchTerm ? (
              <IconButton
                color="gray.300"
                aria-label="clear"
                icon={<CloseIcon path="" />}
                size="xs"
                onClick={() => setSearchTerm('')}
              />
            ) : (
              <SearchIcon path="" color="gray.900" />
            )}
          </InputRightElement>
        </InputGroup>
        <PageList />
        <Box
          alignSelf={'end'}
          display="flex"
          flexDirection="column"
          alignItems={'start'}
          mb={'2'}
        >
          <Image
            position={'absolute'}
            bottom="0"
            src="/images/createPage_woman.svg"
            w={'50%'}
            mb={2}
          />
          <CreatePage />
        </Box>
      </Box>
    </DarkMode>
  )
}

export default Pages
