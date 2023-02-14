import React, { memo, useState, useEffect } from 'react'
import Highlight, { defaultProps } from 'prism-react-renderer'
import { Box, Button, useClipboard } from '@chakra-ui/react'
import { generateCode } from '~utils/code'
import theme from 'prism-react-renderer/themes/nightOwl'
import { useSelector } from 'react-redux'
import {
  getComponents,
  getActivePageId,
  getPages,
} from '~core/selectors/components'
import { getModels } from '~core/selectors/dataSources'

const CodePanel = () => {
  const components = useSelector(getComponents)
  const pageId = useSelector(getActivePageId)
  const pages = useSelector(getPages)
  const [code, setCode] = useState<string | undefined>(undefined)
  const models = useSelector(getModels)

  useEffect(() => {
    const getCode = async () => {
      const code = await generateCode(pageId, pages, models)
      setCode(code)
    }

    getCode()
  }, [components, models, pageId, pages])

  const { onCopy, hasCopied } = useClipboard(code!)

  return (
    <Box
      zIndex={5}
      p={4}
      fontSize="sm"
      backgroundColor="#011627"
      overflow="auto"
      position="absolute"
      top={0}
      bottom={0}
      left={0}
      right={0}
    >
      <Button
        onClick={onCopy}
        size="sm"
        position="absolute"
        textTransform="uppercase"
        colorScheme="teal"
        fontSize="xs"
        height="24px"
        top={4}
        right="1.25em"
      >
        {hasCopied ? 'copied' : 'copy'}
      </Button>
      <Highlight
        {...defaultProps}
        theme={theme}
        code={code || '// Formatting code… please wait ✨'}
        language="jsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Box>
  )
}

export default memo(CodePanel)
