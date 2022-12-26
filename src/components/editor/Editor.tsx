import React, { memo, useState, useEffect } from 'react'
import {
  Box,
  Text,
  Link,
  ChakraProvider,
  theme as baseTheme,
} from '@chakra-ui/react'
import { useDropComponent } from '~hooks/useDropComponent'
import SplitPane from 'react-split-pane'
import CodePanel from '~components/CodePanel'
import { useSelector } from 'react-redux'
import useDispatch from '~hooks/useDispatch'
import {
  generateCode,
  generatePreview,
  generatePanel,
  generateOcTsxCode,
  generateMainTsx,
} from '~utils/code'
import API from '~custom-components/api'
import { getComponents } from '~core/selectors/components'
import {
  getCustomComponents,
  getNewTheme,
  getSelectedCustomComponentId,
  getTheme,
} from '~core/selectors/customComponents'
import { getShowLayout, getShowCode } from '~core/selectors/app'
import ComponentPreview from '~components/editor/ComponentPreview'
import { omit } from 'lodash'
import myTheme from './myTheme'
import Fonts from '~components/Fonts'

export const themeColors: any = Object.keys(
  omit(baseTheme.colors, ['transparent', 'current', 'black', 'white']),
)

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
  const themeState = useSelector(getTheme)
  const newThemeState = useSelector(getNewTheme)
  const dispatch = useDispatch()

  const { drop } = useDropComponent('root')
  const isEmpty = !components.root.children.length
  const rootProps = components.root.props

  const customComponents = useSelector(getCustomComponents)
  const selectedComponent = useSelector(getSelectedCustomComponentId)
  const [code, setCode] = useState<string | undefined>(undefined)

  useEffect(() => {
    const getCode = async () => {
      const [code, ocTsxCode] = await Promise.all([
        generateCode(components, customComponents),
        generateOcTsxCode(components, customComponents),
      ])
      setCode(code)
      if (selectedComponent !== undefined) {
        let fileName = convertToPascal(customComponents[selectedComponent])
        const { refsCode, appCode } = generateMainTsx(
          components.root.params,
          fileName,
        )
        const [previewCode, panelCode] = await Promise.all([
          generatePreview(components, fileName, selectedComponent),
          generatePanel(components, fileName),
        ])
        await API.post('/save-file', {
          codeBody: code,
          ocTsxBody: ocTsxCode,
          jsonBody: components,
          previewBody: previewCode,
          panelBody: panelCode,
          refsBody: refsCode,
          appBody: appCode,
          path: customComponents[selectedComponent],
        })
      }
    }
    dispatch.app.toggleLoader()
    getCode()
    dispatch.app.toggleLoader()
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
    <ChakraProvider theme={myTheme(newThemeState)} resetCSS={false}>
      {/* <style>
        {`\
          @import url("https://fonts.googleapis.com/css2?family=Rubik+Gemstones&display=swap");\
          @import url("https://cdn.jsdelivr.net/npm/@fontsource/arizonia/index.css");\
        `}
      </style> */}
      <Fonts
        headingFontFamily={newThemeState.headingFontFamily}
        bodyFontFamily={newThemeState.bodyFontFamily}
      />
      <Box
        className="editor"
        bg="chakra-body-bg"
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
            Create new components using the `Create Component` button in the
            left sidebar. Click the edit button beside the component to load it!
            Or install{' '}
            <Link
              color="gray.500"
              href="https://bit.cloud/"
              onClick={(e: React.MouseEvent) => {
                e.stopPropagation()
                // dispatch.components.loadDemo('onboarding')
              }}
              textDecoration="underline"
            >
              components from bit
            </Link>
          </Text>
        )}

        {components.root.children.map((name: string) => (
          <ComponentPreview key={name} componentName={name} />
        ))}
      </Box>
    </ChakraProvider>
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
