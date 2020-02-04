import React, { memo } from 'react'
import { Box, Text, Link, Badge } from '@chakra-ui/core'
import ComponentPreview from './ComponentPreview'
import { useDropComponent } from '../../hooks/useDropComponent'
import SplitPane from 'react-split-pane'
import CodePanel from '../CodePanel'
import { useSelector } from 'react-redux'
import { RootState } from '../..'
import useDispatch from '../../hooks/useDispatch'
import Overlay from './Overlay'

const Editor: React.FC = () => {
  const showCode = useSelector((state: RootState) => state.app.showCode)
  const showLayout = useSelector((state: RootState) => state.app.showLayout)
  const overlay = useSelector((state: RootState) => state.app.overlay)
  const selected = useSelector(
    (state: RootState) => state.components.present.selected,
  )
  const components = useSelector(
    (state: RootState) => state.components.present.components,
  )
  const dispatch = useDispatch()

  const { drop } = useDropComponent('root')
  const isEmpty = !components.root.children.length

  let editorBackgroundProps = {}

  if (showLayout) {
    editorBackgroundProps = {
      backgroundImage:
        'linear-gradient(to right, #d9e2e9 1px, transparent 1px),linear-gradient(to bottom, #d9e2e9 1px, transparent 1px);',
      backgroundSize: '20px 20px',
      bg: '#edf2f6',
      p: 10,
    }
  }

  const Playground = (
    <Box
      p={2}
      {...editorBackgroundProps}
      height="100%"
      width="100%"
      display={isEmpty ? 'flex' : 'block'}
      justifyContent="center"
      alignItems="center"
      overflow="auto"
      ref={drop}
      position="relative"
      flexDirection="column"
    >
      {isEmpty && (
        <Text maxWidth="md" color="gray.400" fontSize="xl" textAlign="center">
          Drag some component to start coding without code! Or load a{' '}
          <Link
            onClick={() => {
              dispatch.components.loadDemo()
            }}
            textDecoration="underline"
          >
            sample component
          </Link>
          .
        </Text>
      )}

      {components.root.children.map((name: string) => (
        <ComponentPreview key={name} componentName={name} />
      ))}

      {overlay && showLayout && (
        <Overlay rect={overlay.rect}>
          <Badge ml={1} variantColor="teal">
            {overlay.type}
          </Badge>
        </Overlay>
      )}

      {selected && selected.rect && showLayout && (
        <Overlay rect={selected.rect} />
      )}
    </Box>
  )

  if (!showCode) {
    return Playground
  }

  return (
    <SplitPane
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
