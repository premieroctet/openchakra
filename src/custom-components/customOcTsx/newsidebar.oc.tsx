import React, { RefObject } from 'react'
import { ChakraProvider, Box, Text, Button } from '@chakra-ui/react'

type AppPropsTypes = {
  sidebarTitle: string,
  group1Name: string,
  group2Name: string,
  showTitle: boolean,
  showGroup1: boolean,
  showGroup2: boolean
}

const App = ({
  sidebarTitle = 'Sidebar',
  group1Name = 'Utilities',
  group2Name = 'Social',
  showTitle = true,
  showGroup1 = true,
  showGroup2 = true
}: AppPropsTypes) => (
  <>
    <Box width="15%" height="100%" p={5} backgroundColor="blackAlpha.100">
      {showTitle ? (
        <>
          <Box display="flex" justifyContent="center" alignItems="center">
            <Text fontWeight="semibold" fontSize="2xl">
              {sidebarTitle}
            </Text>
          </Box>
        </>
      ) : (
        <>
          <Box />
        </>
      )}
      {showGroup1 ? (
        <>
          <Box mt={10} mb={10}>
            <Text mb={2} fontSize="md" color="blackAlpha.500">
              {group1Name}
            </Text>
            {[1, 2, 3, 4].map((itemJV5, indexJV5) => (
              <Box>
                <Button
                  variant="solid"
                  size="md"
                  width="100%"
                  mt={1}
                  mb={1}
                  fontSize="sm"
                  backgroundColor="blackAlpha.100"
                >
                  {itemJV5}
                </Button>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <>
          <Box />
        </>
      )}
      {showGroup2 ? (
        <>
          <Box>
            <Text pb={2} fontSize="md" color="blackAlpha.500">
              {group2Name}
            </Text>
            {[1, 2, 3, 4].map((item1Z9, index1Z9) => (
              <Box>
                <Button
                  variant="solid"
                  size="md"
                  mt={1}
                  mb={1}
                  width="100%"
                  backgroundColor="blackAlpha.100"
                  fontSize="sm"
                >
                  {item1Z9}
                </Button>
              </Box>
            ))}
          </Box>
        </>
      ) : (
        <>
          <Box />
        </>
      )}
    </Box>
  </>
)

export default App
