import React from 'react'
import { Link, Button, Box, Text } from '@chakra-ui/core'
import { HotKeys } from 'react-hotkeys'
import { Global } from '@emotion/core'
import Metadata from '~components/Metadata'
import useShortcuts, { keyMap } from '~hooks/useShortcuts'
import { RiEditLine, RiGalleryLine } from 'react-icons/ri'
import { useSession } from 'next-auth/client'
import Header from '~components/Header'

const App = () => {
  const { handlers } = useShortcuts()
  const [session] = useSession()

  return (
    <HotKeys allowChanges handlers={handlers} keyMap={keyMap}>
      <Global
        styles={() => ({
          html: { minWidth: '860px', backgroundColor: '#1a202c' },
        })}
      />
      <Metadata />
      <Header session={session} projectPage={true} />

      <Box textAlign="center" paddingTop={24}>
        <Box
          borderWidth={1}
          borderColor="grey"
          p={6}
          backgroundColor="rgba(0,0,0,0.5)"
          textAlign="center"
          display="inline-block"
          marginRight={6}
        >
          <Box as={RiEditLine} size="32px" color="white" m="0 auto" />
          <Text color="white" fontSize="lg" marginTop={3}>
            Create or update your own project
          </Text>
          <Link href="/editor">
            <Button
              variantColor="gray"
              marginTop={5}
              border="1px solid white"
              _hover={{
                backgroundColor: '#1a202c',
                color: 'white',
                border: '1px solid white',
              }}
            >
              Editor
            </Button>
          </Link>
        </Box>
        <Box
          borderWidth={1}
          borderColor="grey"
          p={6}
          backgroundColor="rgba(0,0,0,0.5)"
          textAlign="center"
          display="inline-block"
          marginLeft={6}
          verticalAlign="top"
        >
          <Box as={RiGalleryLine} size="32px" color="white" m="0 auto" />
          <Text color="white" fontSize="lg" marginTop={3}>
            View the different public projects
          </Text>
          <Link href="/project/public">
            <Button
              variantColor="gray"
              marginTop={5}
              border="1px solid white"
              _hover={{
                backgroundColor: '#1a202c',
                color: 'white',
                border: '1px solid white',
              }}
            >
              Component gallery
            </Button>
          </Link>
        </Box>
      </Box>
    </HotKeys>
  )
}

export default App
