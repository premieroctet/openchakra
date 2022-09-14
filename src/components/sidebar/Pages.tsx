import React, { useState, ChangeEvent } from 'react'
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  DarkMode,
  IconButton,
} from '@chakra-ui/react'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'

type categoryItems = {
  [name: string]: string[]
}

const Pages = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <DarkMode>
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
      </Box>
    </DarkMode>
  )
}

export default Pages
