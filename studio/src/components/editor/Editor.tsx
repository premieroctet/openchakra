import { Box, Text, Link } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import React, { memo, useEffect } from 'react'
import SplitPane from 'react-split-pane'
import axios from 'axios'

import { getComponents } from '~core/selectors/components'
import { getShowOverview, getShowCode, getDevice } from '~core/selectors/app'
import { useDropComponent } from '~hooks/useDropComponent'
import CodePanel from '~components/CodePanel'
import ComponentPreview from '~components/editor/ComponentPreview'
import devices from '~config/devices'
import useDispatch from '~hooks/useDispatch'

import { getWarnings } from '../../core/selectors/components'

export const gridStyles = {
  backgroundImage:
    'linear-gradient(to right, #d9e2e9 1px, transparent 1px),linear-gradient(to bottom, #d9e2e9 1px, transparent 1px);',
  backgroundSize: '20px 20px',
  bgColor: '#edf2f6',
  p: 10,
}

const Editor: React.FC = () => {
  const showCode = useSelector(getShowCode)
  const device = useSelector(getDevice)
  const warnings = useSelector(getWarnings)
  const showOverview = useSelector(getShowOverview)
  const components = useSelector(getComponents)
  const dispatch = useDispatch()

  const { drop } = useDropComponent('root')
  const isEmpty = !components.root.children.length
  const rootProps = components.root.props

  let editorBackgroundProps = {}

  const onSelectBackground = () => {
    dispatch.project.unselect()
  }

  if (showOverview) {
    editorBackgroundProps = gridStyles
  }

  editorBackgroundProps = {
    ...editorBackgroundProps,
    ...rootProps,
  }

  const adaptDevice = (device: string) => {
    return devices[device]
  }

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN}/myAlfred/api/studio/models`)
      .then(res => {
        if (!res.data) {
          throw new Error()
        }
        dispatch.dataSources.setModels(res.data)
      })
      .catch(err => {
        alert(`Could not get models from backend:${err}`)
      })
  }, [dispatch.dataSources])

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_PROJECT_TARGETDOMAIN}/myAlfred/api/studio/roles`)
      .then(res => {
        if (!res) {
          throw new Error()
        }
        dispatch.roles.setRoles(res.data)
      })
      .catch(err => {
        alert(`Could not get roles from backend:${err}`)
      })
  }, [dispatch.roles])

  const Playground = (
    <Box
      p={2}
      {...editorBackgroundProps}
      minWidth="10rem"
      margin="0 auto"
      display={isEmpty ? 'flex' : 'block'}
      justifyContent="center"
      alignItems="center"
      overflow="auto"
      ref={drop}
      position="relative"
      flexDirection="column"
      onClick={onSelectBackground}
      {...adaptDevice(device)}
    >
      {isEmpty && (
        <Text maxWidth="md" color="gray.400" fontSize="xl" textAlign="center">
          Drag some component to start coding without code! Or load{' '}
          <Link
            color="gray.500"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              dispatch.project.loadDemo('onboarding')
            }}
            textDecoration="underline"
          >
            the onboarding components
          </Link>
          .
        </Text>
      )}

      {components.root.children.map((name: string) => (
        <ComponentPreview id={name} key={name} componentName={name} />
      ))}
    </Box>
  )

  if (!showCode) {
    return Playground
  }

  return (
    <SplitPane
      style={{ overflow: 'auto' }}
      defaultSize="50%"
      resizerStyle={{
        border: '3px solid rgba(1, 22, 39, 0.21)',
        zIndex: 20,
        cursor: 'row-resize',
      }}
      split="horizontal"
    >
      {Playground}
      <CodePanel />
    </SplitPane>
  )
}

export default memo(Editor)
