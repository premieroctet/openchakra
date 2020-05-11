import React, { Component } from 'react'
import { Box, Flex, Stack, Button } from '@chakra-ui/core'
import { FaBomb } from 'react-icons/fa'
import { gridStyles } from '../editor/Editor'
// import { bugsnagClient } from '../../utils/bugsnag'

type ErrorBoundaryState = {
  hasError: boolean
}

type ErrorBoundaryProps = {}

export default class AppErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { hasError: false }

  static getDerivedStateFromError(error: any) {
    // bugsnagClient.notify(error)
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return (
        <Flex
          {...gridStyles}
          p={0}
          alignItems="center"
          justifyContent="center"
          flex={1}
          zIndex={10}
          position="relative"
          height="100vh"
        >
          <Stack
            alignItems="center"
            isInline
            spacing={8}
            bg="white"
            px={6}
            py={6}
            shadow="sm"
            width="lg"
          >
            <Box as={FaBomb} fontSize="100px" />
            <Box>
              <b>Oups…</b>
              <br />
              Something went wrong! Clear cache and refresh.
              <Button
                onClick={() => {
                  localStorage.clear()
                  window.location.reload()
                }}
                variant="outline"
                rightIcon="check-circle"
                size="sm"
                mt={4}
                display="block"
              >
                Clear & reload
              </Button>
            </Box>
          </Stack>
        </Flex>
      )
    }

    return this.props.children
  }
}
