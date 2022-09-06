import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ActionCreators as UndoActionCreators } from 'redux-undo'
import { Box, Flex, Stack, Button } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { FaBomb } from 'react-icons/fa'
import { gridStyles } from '~components/editor/Editor'
import { bugsnagClient } from '~utils/bugsnag'

type ErrorBoundaryState = {
  hasError: boolean
}

type ErrorBoundaryProps = {
  undo: () => void
  children?: React.ReactNode
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: any) {
    bugsnagClient.notify(error)
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      this.props.undo()

      return (
        <Flex
          {...gridStyles}
          alignItems="center"
          justifyContent="center"
          flex={1}
          position="relative"
        >
          <Stack
            alignItems="center"
            direction="row"
            spacing={8}
            bg="white"
            px={6}
            py={6}
            boxShadow="sm"
            width="lg"
          >
            <Box as={FaBomb} fontSize="100px" />
            <Box>
              <b>Oups…</b>
              <br />
              Something went wrong! We have recovered the editor to its previous
              version.
              <Button
                onClick={() => {
                  this.setState({ hasError: false })
                }}
                variant="outline"
                rightIcon={<CheckCircleIcon path="" />}
                size="sm"
                mt={4}
                display="block"
              >
                Reload
              </Button>
            </Box>
          </Stack>
        </Flex>
      )
    }
    return this.props.children
  }
}

const mapDispatchToProps = {
  undo: UndoActionCreators.undo,
}

export default connect(null, mapDispatchToProps)(ErrorBoundary)
