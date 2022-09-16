import React from 'react'
import { Box, Button, Image, List, ListItem } from '@chakra-ui/react'
import { useSelector } from 'react-redux'
import { getPages } from '~core/selectors/components'
import useDispatch from '~hooks/useDispatch'

const PageActions = ({ page }) => {
  const dispatch = useDispatch()

  const deleteP = async elem => {
    await new Promise(() => dispatch.components.deletePage(elem)).then(a =>
      console.log(a),
    )
  }

  const edit = async elem => {
    // await new Promise(() => dispatch.components.editPage(elem)).then(a =>
    //   console.log(a),
    // )
  }

  const buttonProps = {
    p: 0,
    w: '30px',
    h: '30px',
    minWidth: 'auto',
    minHeight: 'auto',
  }

  return (
    <>
      <Button {...buttonProps} onClick={() => edit(page)}>
        <Image w={'30px'} title='Edit' src='/icons/edit.svg' />
      </Button>
      <Button {...buttonProps} onClick={() => deleteP(page)}>
        <Image w={'30px'} title="Edit" src="/icons/delete.svg" />
      </Button>
      <Button {...buttonProps} onClick={() => console.log('Nothing yet')}>
        <Image w={'30px'} title="Save" src="/icons/save.svg" />
      </Button>
    </>
  )
}

const PageList = () => {
  const pages = useSelector(getPages)
  const dispatch = useDispatch()

  return (
    <List>
      {pages.map((page, i) => (
        <ListItem
          key={i}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems="center"
          color="black"
          paddingBlock={2}
          borderBottom={'1px solid black'}
        >
          {/* <Box>{page.name}</Box> */}
          <Button
            p={0}
            bg={'transparent'}
            color="black"
            onClick={() => dispatch.components.setActivePage(page.name)}
          >
            {page.name}
          </Button>
          <Box display={'flex'} alignItems="center">
            <PageActions page={page.name} />
          </Box>
        </ListItem>
      ))}
    </List>
  )
}

export default PageList
