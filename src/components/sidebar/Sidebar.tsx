import React, { useState, ChangeEvent, memo } from 'react'
import {
  Box,
  Text,
  Input,
  InputGroup,
  Grid,
  InputRightElement,
  DarkMode,
  IconButton,
  GridItem,
  AspectRatio,
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
        if (acc['Basics']) {
          acc['Basics'].push(elemName)
        } else {
          acc['Basics'] = [elemName]
        }
      }

      return acc
    },
    {},
  )

  return (
    <DarkMode>
      <Box
        overflowY="auto"
        overflowX="visible"
        boxShadow="xl"
        flex="0 0 14rem"
        p={2}
        m={0}
        as="menu"
        bg="rgb(236, 236, 236)"
        w={'100%'}
        h={'100%'}
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
            borderRadius={'15px'}
            bg="rgba(255, 255, 255, 1)"
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
              <SearchIcon path="" color="gray.900" />
            )}
          </InputRightElement>
        </InputGroup>

        {Object.entries(groupItems).map(([catego, items]) => (
          <div key={`${catego}`}>
            <Text
              key={`${catego}text`}
              fontWeight="bold"
              fontSize="sm"
              color="black"
              mb={'3'}
            >
              {catego}
            </Text>
            <Grid
              as={'ul'}
              templateColumns={'repeat(2, 1fr)'}
              templateRows={'repeat(2, 1fr)'}
              alignItems={'center'}
              gap={'0.5rem'}
              key={`${catego}list`}
            >
              {items
                .filter(c => c.toLowerCase().includes(searchTerm.toLowerCase()))
                .map(name => {
                  const { children, soon } = menuItems[name] as MenuItem

                  if (children) {
                    const elements = Object.keys(children).map(childName => (
                      <GridItem as={'li'} key={childName}>
                        <AspectRatio ratio={4 / 3}>
                          <DragItem
                            isChild
                            label={childName}
                            type={childName as any}
                            id={childName as any}
                            rootParentType={
                              menuItems[name]?.rootParentType || name
                            }
                          >
                            {childName}
                          </DragItem>
                        </AspectRatio>
                      </GridItem>
                    ))

                    return [
                      <GridItem as={'li'} key={`${name}Meta`}>
                        <AspectRatio ratio={4 / 3}>
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
                        </AspectRatio>
                      </GridItem>,
                      ...elements,
                    ]
                  }

                  return (
                    <GridItem as={'li'} key={name}>
                      <AspectRatio ratio={4 / 3}>
                        <DragItem
                          soon={soon}
                          label={name}
                          type={name as any}
                          id={name as any}
                          rootParentType={
                            menuItems[name]?.rootParentType || name
                          }
                        >
                          {name}
                        </DragItem>
                      </AspectRatio>
                    </GridItem>
                  )
                })}
            </Grid>
          </div>
        ))}
      </Box>
    </DarkMode>
  )
}

export default memo(Sidebar)
