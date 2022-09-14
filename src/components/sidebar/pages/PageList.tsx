import React from 'react'
import { Box, Button, Image, List, ListItem } from '@chakra-ui/react'

const PageActions = () => {
  const actions = [
    {
      title: 'Edit',
      src: '/icons/edit.svg',
    },
    {
      title: 'Delete',
      src: '/icons/delete.svg',
    },
    {
      title: 'Save',
      src: '/icons/save.svg',
    },
  ]

  const buttonProps = {
    p: 0,
    w: '30px',
    h: '30px',
    minWidth: 'auto',
    minHeight: 'auto',
  }

  return (
    <>
      {actions.map((action, i) => (
        <Button key={i} {...buttonProps}>
          <Image w={'30px'} {...action} />
        </Button>
      ))}
    </>
  )
}

const PageList = () => {
  const pages = [{ name: 'index' }, { name: 'search' }]

  return (
    <List>
      {pages.map(page => (
        <ListItem
          display={'flex'}
          justifyContent={'space-between'}
          alignItems="center"
          color="black"
          paddingBlock={2}
          borderBottom={'1px solid black'}
        >
          <Box>{page.name}</Box>
          <Box display={'flex'} alignItems="center">
            <PageActions />
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

export default PageList
