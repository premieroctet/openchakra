import React, { memo, useState, useEffect } from 'react'
import { Box, Text, Link } from '@chakra-ui/react'
import { useDropComponent } from '~hooks/useDropComponent'
import SplitPane from 'react-split-pane'
import CodePanel from '~components/CodePanel'
import { useSelector } from 'react-redux'
import useDispatch from '~hooks/useDispatch'
import { generateCode, generatePreview, generatePanel } from '~utils/code'
import API from '~custom-components/api'
import { getComponents } from '~core/selectors/components'
import {
  getCustomComponents,
  getSelectedCustomComponentId,
} from '~core/selectors/customComponents'
import { getShowLayout, getShowCode } from '~core/selectors/app'
import ComponentPreview from '~components/editor/ComponentPreview'

export const gridStyles = {
  backgroundImage:
    'linear-gradient(to right, #d9e2e9 1px, transparent 1px),linear-gradient(to bottom, #d9e2e9 1px, transparent 1px);',
  backgroundSize: '20px 20px',
  bgColor: '#edf2f6',
  p: 10,
}

export const convertToPascal = (filePath: string) => {
  const fileName = filePath.split('/').slice(-1)[0]
  let fileArray = fileName.split('-')
  fileArray = fileArray.map(word => {
    return `${word.slice(0, 1).toUpperCase()}${word.slice(1)}`
  })
  return fileArray.join('')
}

const Editor: React.FC = () => {
  const showCode = useSelector(getShowCode)
  const showLayout = useSelector(getShowLayout)
  const components = useSelector(getComponents)
  const dispatch = useDispatch()

  const { drop } = useDropComponent('root')
  const isEmpty = !components.root.children.length
  const rootProps = components.root.props

  const componentsList = useSelector(getCustomComponents)
  const selectedComponent = useSelector(getSelectedCustomComponentId)
  const [code, setCode] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getCode = async () => {
      const code = await generateCode(components, componentsList)
      setCode(code)
      if (selectedComponent !== undefined) {
        let fileName = convertToPascal(componentsList[selectedComponent])
        let previewCode = generatePreview(components, fileName)
        let panelCode = generatePanel(components, fileName)
        const response = await API.post('/save-file', {
          codeBody: code,
          jsonBody: components,
          previewBody: previewCode,
          panelBody: panelCode,
          path: componentsList[selectedComponent],
        })
      }
    }

    getCode()
  }, [components, selectedComponent])

  let editorBackgroundProps = {}

  const onSelectBackground = () => {
    dispatch.components.unselect()
  }

  if (showLayout) {
    editorBackgroundProps = gridStyles
  }

  editorBackgroundProps = {
    ...editorBackgroundProps,
    ...rootProps,
  }

  const Playground = (
    <Box
      p={2}
      {...editorBackgroundProps}
      height="100%"
      minWidth="10rem"
      width="100%"
      display={isEmpty ? 'flex' : 'block'}
      justifyContent="center"
      alignItems="center"
      overflow="auto"
      ref={drop}
      position="relative"
      flexDirection="column"
      onClick={onSelectBackground}
    >
      {isEmpty && (
        <Text maxWidth="md" color="gray.400" fontSize="xl" textAlign="center">
          Create new components using the terminal to see them here. Click the edit button beside any component to load it!
          {/* Or load{' '}
          <Link
            color="gray.500"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation()
              dispatch.components.loadDemo('onboarding')
            }}
            textDecoration="underline"
          >
            the custom components
          </Link> */}
        </Text>
      )}
      {components.root.children.map((name: string) => (
        <ComponentPreview key={name} componentName={name} />
      ))}
    </Box>
  )

  if (!showCode) {
    return Playground
  }

  return (
    // @ts-ignore
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
