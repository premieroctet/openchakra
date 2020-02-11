import React, { useState, ChangeEvent, memo } from 'react'
import {
  Box,
  Input,
  InputGroup,
  Icon,
  InputRightElement,
  DarkMode,
  IconButton,
} from '@chakra-ui/core'
import DragItem from './DragItem'

type MenuItem = {
  children?: MenuItems
  soon?: boolean
  rootParentType?: ComponentType
}

type MenuItems = Partial<
  {
    [k in ComponentType]: MenuItem
  }
>

const menuItems: MenuItems = {
  Accordion: {
    children: {
      Accordion: {},
      AccordionItem: {},
      AccordionHeader: {},
      AccordionPanel: {},
      AccordionIcon: {},
    },
  },
  Alert: {
    children: {
      Alert: {},
      AlertDescription: {},
      AlertIcon: {},
      AlertTitle: {},
    },
  },
  AspectRatioBox: {},
  AvatarGroup: {
    rootParentType: 'Avatar',
  },
  Avatar: {},
  AvatarBadge: {
    rootParentType: 'Avatar',
  },
  Badge: {},
  Box: {},
  Breadcrumb: {
    children: {
      BreadcrumbItem: {},
      BreadcrumbLink: {},
    },
  },
  Button: {},
  Checkbox: {},
  CircularProgress: {},
  CloseButton: {},
  Code: {},
  Divider: {},
  Flex: {},
  FormControl: {
    children: {
      FormControl: {},
      FormLabel: {},
      FormHelperText: {},
      FormErrorMessage: {},
    },
  },
  Grid: {},
  Heading: {},
  Icon: {},
  IconButton: {},
  Image: {},
  Input: {},
  InputGroup: {
    rootParentType: 'Input',
    children: {
      InputGroup: {},
      Input: {},
      InputLeftAddon: {},
      InputRightAddon: {},
      InputRightElement: {},
      InputLeftElement: {},
    },
  },
  Link: {},
  List: {
    children: {
      List: {},
      ListItem: {},
    },
  },
  NumberInput: {},
  Progress: {},
  Radio: {},
  RadioGroup: {
    rootParentType: 'Radio',
  },
  SimpleGrid: {},
  Spinner: {},
  Select: {},
  Stack: {},
  Switch: {},
  Tag: {},
  Text: {},
  Textarea: {},
  Menu: { soon: true },
  Tab: { soon: true },
  /*"Tabs",
  "TabList",
  "TabPanel",
  "TabPanels"*/
}

const Menu = () => {
  const [searchTerm, setSearchTerm] = useState('')

  return (
    <DarkMode>
      <Box
        maxH="calc(100vh - 3rem)"
        overflowY="auto"
        overflowX="visible"
        shadow="xl"
        flex="0 0 14rem"
        p={5}
        m={0}
        as="menu"
        backgroundColor="#2e3748"
        width="15rem"
      >
        <InputGroup size="sm" mb={4}>
          <InputRightElement>
            {searchTerm ? (
              <IconButton
                color="gray.300"
                aria-label="clear"
                icon="close"
                size="xs"
                onClick={() => setSearchTerm('')}
              >
                x
              </IconButton>
            ) : (
              <Icon name="search" color="gray.300" />
            )}
          </InputRightElement>
          )}
          <Input
            value={searchTerm}
            color="gray.300"
            placeholder="Search component…"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
          />
        </InputGroup>

        {(Object.keys(menuItems) as ComponentType[])
          .filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(name => {
            const { children, soon } = menuItems[name] as MenuItem

            if (children) {
              const elements = Object.keys(children).map(childName => (
                <DragItem
                  isChild
                  key={childName}
                  label={childName}
                  type={childName as any}
                  id={childName as any}
                  rootParentType={menuItems[name]?.rootParentType || name}
                >
                  {childName}
                </DragItem>
              ))

              return [
                <DragItem
                  isMeta
                  soon={soon}
                  key={`${name}Meta`}
                  label={name}
                  type={`${name}Meta` as any}
                  id={`${name}Meta` as any}
                  rootParentType={menuItems[name]?.rootParentType || name}
                >
                  {name}
                </DragItem>,
                ...elements,
              ]
            }

            return (
              <DragItem
                soon={soon}
                key={name}
                label={name}
                type={name as any}
                id={name as any}
                rootParentType={menuItems[name]?.rootParentType || name}
              >
                {name}
              </DragItem>
            )
          })}
      </Box>
    </DarkMode>
  )
}

export default memo(Menu)
