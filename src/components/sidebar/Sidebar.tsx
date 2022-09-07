import React, { useState, ChangeEvent, memo } from 'react'
import {
  Box,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  DarkMode,
  IconButton,
  List,
  ListItem,
} from '@chakra-ui/react'
import { CloseIcon, SearchIcon } from '@chakra-ui/icons'
import DragItem from './DragItem'
import { menuItems, MenuItem } from '~componentsList'

type categoryItems = {
  [name: string]: string[]
}

const Sidebar = () => {
  const [searchTerm, setSearchTerm] = useState('')

  const groupItems: categoryItems = Object.entries(menuItems).reduce(
    (acc: categoryItems, items) => {
      const [elemName, props] = items

      if (props?.group) {
        if (acc[props.group]) {
          acc[props.group].push(elemName)
        } else {
          acc[props.group] = [elemName]
        }
      } else {
        if (acc['divers']) {
          acc['divers'].push(elemName)
        } else {
          acc['divers'] = [elemName]
        }
      }

      return acc
    },
    {},
  )

  return (
    <DarkMode>
      <Box
        maxH="calc(100vh - 3rem)"
        overflowY="auto"
        overflowX="visible"
        boxShadow="xl"
        flex="0 0 14rem"
        p={5}
        m={0}
        as="menu"
        backgroundColor="#2e3748"
        width="15rem"
      >
        <InputGroup size="sm" mb={4}>
          <Input
            value={searchTerm}
            color="gray.300"
            placeholder="Search component…"
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(event.target.value)
            }
            borderColor="rgba(255, 255, 255, 0.04)"
            bg="rgba(255, 255, 255, 0.06)"
            _hover={{
              borderColor: 'rgba(255, 255, 255, 0.08)',
            }}
            zIndex={0}
          />
          <InputRightElement zIndex={1}>
            {searchTerm ? (
              <IconButton
                color="gray.300"
                aria-label="clear"
                icon={<CloseIcon path="" />}
                size="xs"
                onClick={() => setSearchTerm('')}
              />
            ) : (
              <SearchIcon path="" color="gray.300" />
            )}
          </InputRightElement>
        </InputGroup>

        {Object.entries(groupItems).map(([catego, items]) => (
          <div key={`${catego}`}>
            <Text
              key={`${catego}text`}
              fontWeight="bold"
              fontSize="lg"
              color="whiteAlpha.600"
            >
              {catego}
            </Text>
            <List key={`${catego}list`}>
              {items
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
                      <ListItem key={`${name}Meta`}>
                        <DragItem
                          isMeta
                          soon={soon}
                          label={name}
                          type={`${name}Meta` as any}
                          id={`${name}Meta` as any}
                          rootParentType={
                            menuItems[name]?.rootParentType || name
                          }
                        >
                          {name}
                        </DragItem>
                      </ListItem>,
                      ...elements,
                    ]
                  }

                  return (
                    <ListItem key={name}>
                      <DragItem
                        soon={soon}
                        label={name}
                        type={name as any}
                        id={name as any}
                        rootParentType={menuItems[name]?.rootParentType || name}
                      >
                        {name}
                      </DragItem>
                    </ListItem>
                  )
                })}
            </List>
          </div>
        ))}
      </Box>
    </DarkMode>
  )
}

export default memo(Sidebar)
