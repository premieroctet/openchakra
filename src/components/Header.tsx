import React from "react";
import {
  Box,
  Switch,
  Button,
  Flex,
  Link,
  Stack,
  FormLabel,
  Divider,
  DarkMode
} from "@chakra-ui/core";
import { DiGithubBadge } from "react-icons/di";
import { AiFillThunderbolt } from "react-icons/ai";
import { useBuilderContext, INITIAL_STATE } from "../contexts/BuilderContext";
import { buildParameters } from "../utils/codesandbox";
import { generateCode } from "../utils/code";

const Header = () => {
  const {
    setShowLayout,
    showLayout,
    setComponents,
    components,
    showCode,
    setShowCode,
    setSelectedComponent
  } = useBuilderContext();

  return (
    <DarkMode>
      <Box bg="#1a202c" as="header" height="3rem">
        <Flex size="100%" align="center" justify="space-between">
          <Box
            height="100%"
            backgroundColor="#1a202c"
            color="white"
            pl="1rem"
            width="14rem"
            as="a"
            fontSize="xl"
            d="block"
            display="flex"
            alignItems="center"
            aria-label="Chakra UI, Back to homepage"
          >
            <Box
              fontSize="2xl"
              as={AiFillThunderbolt}
              mr={1}
              color="teal.100"
            />{" "}
            <Box fontWeight="bold">Open</Box>Chakra
          </Box>

          <Flex alignItems="center" pr="1rem" justifyContent="end">
            <Flex justify="center" align="center" mr={4}>
              <FormLabel
                color="gray.200"
                fontSize="xs"
                htmlFor="preview"
                pb={0}
              >
                Builder mode
              </FormLabel>
              <Switch
                isChecked={showLayout}
                color="teal"
                size="sm"
                onChange={() => setShowLayout(!showLayout)}
                id="preview"
              />
            </Flex>

            <Flex justify="center" align="center">
              <FormLabel color="gray.200" fontSize="xs" htmlFor="code" pb={0}>
                Code panel
              </FormLabel>
              <Switch
                id="code"
                color="teal"
                onChange={() => setShowCode(!showCode)}
                size="sm"
              />
            </Flex>
            <Divider orientation="vertical" />
            <Button
              onClick={() => {
                const code = generateCode(components);
                const parameters = buildParameters(code);

                window.open(
                  `https://codesandbox.io/api/v1/sandboxes/define?parameters=${parameters}`,
                  "_blank"
                );
              }}
              rightIcon="external-link"
              variant="ghost"
              size="xs"
            >
              Open in CodeSandbox
            </Button>
            <Divider orientation="vertical" />
            <Button
              rightIcon="small-close"
              size="xs"
              variant="ghost"
              onClick={() => {
                setSelectedComponent(undefined);
                setComponents(INITIAL_STATE);
              }}
            >
              Reset
            </Button>

            <Stack
              justifyContent="end"
              width="13rem"
              align="center"
              isInline
              spacing="3"
            >
              <Link
                isExternal
                href="https://github.com/chakra-ui/chakra-ui/tree/master/packages/chakra-ui"
              >
                <Box as={DiGithubBadge} size="8" color="gray.200" />
              </Link>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </DarkMode>
  );
};

export default Header;
