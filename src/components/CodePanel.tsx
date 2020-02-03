import React, { memo } from "react";
import Highlight, { defaultProps } from "prism-react-renderer";
import { Box, Button, useClipboard } from "@chakra-ui/core";
import { generateCode } from "../utils/code";
import theme from "prism-react-renderer/themes/nightOwl";
import { RootState } from "..";
import { useSelector } from "react-redux";

const CodePanel = () => {
  const components = useSelector((state: RootState) => state.app.components);
  const code = generateCode(components);

  const { onCopy, hasCopied } = useClipboard(code);

  return (
    <Box
      zIndex={40}
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
        variantColor="teal"
        fontSize="xs"
        height="24px"
        top={4}
        right="1.25em"
      >
        {hasCopied ? "copied" : "copy"}
      </Button>

      <Highlight {...defaultProps} theme={theme} code={code} language="jsx">
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre className={className} style={style}>
            {tokens.map((line, i) => (
              <div {...getLineProps({ line, key: i })}>
                {line.map((token, key) => (
                  <span {...getTokenProps({ token, key })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </Box>
  );
};

export default memo(CodePanel);
